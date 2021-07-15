using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Autenticacao.Models
{
    [Table("people")]
    public class People
    {
        [Key]
        public string id_people { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Pais { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]  
        public string Empresa { get; set; }
    }
}
