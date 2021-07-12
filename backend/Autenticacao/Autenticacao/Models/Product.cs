using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Autenticacao.Models
{
    
    [Table("product")]
    public class Product
    {
        [Key]
        public string id_product { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public double Preco { get; set; }
        [Required]
        public Deparment Departamento { get; set; }
    }
}
