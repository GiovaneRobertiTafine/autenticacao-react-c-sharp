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
using Bogus;
using Microsoft.AspNetCore.Authentication;

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
        public async Task<ActionResult<string>> Authenticated()
        {
            try
            {
                User user = this.db.Users.FirstOrDefault(u => (u.Name == User.Identity.Name));
                UserDto u = _mapper.Map<UserDto>(user);
                u.Token = await HttpContext.GetTokenAsync("access_token");
                u.Senha = null;
                return Ok(u);
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        [HttpPost]
        [Route("Generateproducts")]
        [AllowAnonymous]
        public ActionResult GenerateProducts()
        {
            try
            {
                var userGenerate = new Faker<Product>()
                    .RuleFor(p => p.Departamento, f => f.PickRandom<Deparment>())
                    .RuleFor(p => p.Nome, (f) => f.Commerce.ProductName())
                    .RuleFor(p => p.Preco, (f) => Convert.ToDouble(f.Commerce.Price()))
                    .RuleFor(u => u.id_product, f => Guid.NewGuid().ToString());

                Product pro = userGenerate.Generate();

                this.db.Product.Add(pro);
                this.db.SaveChanges();
                return Ok(new { message = "Produto gerado" });
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        [HttpGet]
        [Route("Products")]
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        [ProducesResponseType(500)]
        [Authorize(Roles = "Administrator,Employee")]
        public ActionResult GetProducts()
        {
            try
            {
                IReadOnlyList<Product> products = this.db.Product.ToList();

                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }
    }
}
