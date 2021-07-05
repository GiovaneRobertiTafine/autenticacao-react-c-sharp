using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Autenticacao.Models
{
    [Table("user")]
    public class User
    {
        [Key]
        public string id_user { get; set; }
        [MinLength(5)]
        public string Name { get; set; }
        [MinLength(5)]
        public string Password { get; set; }
        [Required]
        public Role Role { get; set; }
    }
}
