using Autenticacao.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Logging;

namespace Autenticacao.Services
{
    public static class TokenService
    {
        private static IConfigurationBuilder builder = new ConfigurationBuilder().AddJsonFile("appsettings.json");
        public static string GenerateToken(User user)
        {
            IConfiguration configuration = builder.Build();

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(configuration.GetValue<string>("Auth:keyJWT"));
            IdentityModelEventSource.ShowPII = true;
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Name.ToString()),
                    new Claim(ClaimTypes.Role, user.Role.ToString())
                }),
                Expires = DateTime.Now.AddSeconds(configuration.GetValue<double>("Auth:expiresJWT")),
                SigningCredentials = new SigningCredentials(
                            new SymmetricSecurityKey(key),
                            SecurityAlgorithms.HmacSha256Signature
                        ),
                NotBefore = DateTime.Now
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);

        }
    }
}
