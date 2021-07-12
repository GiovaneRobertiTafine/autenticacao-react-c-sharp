using Autenticacao.Models;

namespace Autenticacao.DTOs
{
    public class ProductDto
    {
        public string Nome { get; set; }
        public double Preco { get; set; }
        public Deparment Departamento { get; set; }
    }
}
