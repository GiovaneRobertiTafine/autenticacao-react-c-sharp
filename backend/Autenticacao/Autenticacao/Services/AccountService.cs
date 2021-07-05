using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BC = BCrypt.Net.BCrypt;

namespace Autenticacao.Services
{
    public class AccountService
    {
        public string RegisterPassword(string password)
        {
            // hash password
            return BC.HashPassword(password);
        }

        public bool AuthenticatePassword(string passwordReq, string passwordAccount)
        {
            // check account found and verify password
            return BC.Verify(passwordReq, passwordAccount);
            
        }
    }
}
