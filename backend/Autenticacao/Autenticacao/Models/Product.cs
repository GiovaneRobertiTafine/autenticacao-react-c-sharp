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
        public string Name { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public Deparment Deparment { get; set; }
    }
}
