using Autenticacao.DTOs;
using Autenticacao.Models;
using Autenticacao.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Autenticacao.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Auth : ControllerBase
    {
        private DataContext db = new DataContext();
        private readonly IMapper _mapper;
        private AccountService account = new AccountService();

        public Auth(IMapper mapper)
        {
            _mapper = mapper;
        }

        [HttpGet]
        [Route("users")]
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        [ProducesResponseType(500)]
        [Authorize(Roles = "Administrator")]
        public IActionResult GetCities()
        {
            try
            {
                IReadOnlyList<User> users = this.db.Users.ToList();

                IReadOnlyList<UserDto> usersDto = _mapper.Map<IReadOnlyList<UserDto>>(users);

                return Ok(usersDto);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }

        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> Authenticate([FromBody] UserDto model)
        {
            try
            {
                User userModel = _mapper.Map<User>(model);
                User user = this.db.Users.FirstOrDefault(u => u.Name == userModel.Name);

                if (user == null)
                    return NotFound(new { message = "Usuário ou senha inválidos" });

                if (!this.account.AuthenticatePassword(userModel.Password, user.Password))
                    return NotFound(new { message = "Usuário ou senha inválidos" });

                var token = TokenService.GenerateToken(user);
                UserDto userDto = _mapper.Map<UserDto>(user);
                userDto.Token = token;
                userDto.Senha = null;
                return userDto;

            }
            catch (WebException ex)
            {
                return BadRequest(new { message = "Formato de dados incorretos" });
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> Register([FromBody] User model)
        {
            try
            {
                User user = this.db.Users.FirstOrDefault(u => (u.Name == model.Name));
                if (user != null)
                    return UnprocessableEntity(new { message = "Nome de usuário já utilizado" });

                model.Password = this.account.RegisterPassword(model.Password);
                model.id_user = Guid.NewGuid().ToString();
                this.db.Users.Add(model);
                this.db.SaveChanges();
                return Ok(new { message = "Usuário cadastrado" });

            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }

        }

        [HttpGet]
        [Route("Authenticated")]
        [Authorize]
        public ActionResult<string> Authenticated()
        {
            return Ok(new { message = $"Autenticado {User.Identity.Name}" });
        }
    }
}
