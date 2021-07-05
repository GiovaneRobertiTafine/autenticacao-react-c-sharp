using Autenticacao.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Autenticacao.DTOs
{
    public class UserDto
    {
        public string Nome { get; set; }
        public string Senha { get; set; }
        public Role Perfil { get; set; }
        public string Token { get; set; }
    }
}
