using Autenticacao.DTOs;
using Autenticacao.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Autenticacao.Mapping
{
    public class MappingUser: Profile
    {
        public MappingUser()
        {
            CreateMap<User, UserDto>()
                .ForMember(dest => dest.Nome, map =>
                    map.MapFrom(src => src.Name))
                .ForMember(dest => dest.Senha, map =>
                    map.MapFrom(src => src.Password))
                .ForMember(dest => dest.Perfil, map =>
                    map.MapFrom(src => src.Role))
                .ReverseMap();

        }

    }
}
