using Microsoft.AspNetCore.Mvc;
using VRGroceryAPI.Models;

namespace VRGroceryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private static readonly List<Product> _products = new List<Product>
        {
            new Product
            {
                Id = 1,
                Name = "Apple",
                Category = "Fruits",
                Price = 0.99m,
                Description = "Fresh red apple",
                ImageUrl = "/assets/textures/apple.jpg",
                ModelUrl = "/assets/models/apple.glb"
            },
            new Product
            {
                Id = 2,
                Name = "Bread",
                Category = "Bakery",
                Price = 2.49m,
                Description = "Freshly baked whole wheat bread",
                ImageUrl = "/assets/textures/bread.jpg",
                ModelUrl = "/assets/models/bread.glb"
            },
            new Product
            {
                Id = 3,
                Name = "Milk",
                Category = "Dairy",
                Price = 3.99m,
                Description = "Fresh whole milk",
                ImageUrl = "/assets/textures/milk.jpg",
                ModelUrl = "/assets/models/milk.glb"
            },
            new Product
            {
                Id = 4,
                Name = "Eggs",
                Category = "Dairy",
                Price = 4.99m,
                Description = "Farm fresh eggs, 12 count",
                ImageUrl = "/assets/textures/eggs.jpg",
                ModelUrl = "/assets/models/eggs.glb"
            },
            new Product
            {
                Id = 5,
                Name = "Chicken",
                Category = "Meat",
                Price = 7.99m,
                Description = "Fresh chicken breast",
                ImageUrl = "/assets/textures/chicken.jpg",
                ModelUrl = "/assets/models/chicken.glb"
            }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetProducts()
        {
            return Ok(_products);
        }

        [HttpGet("{id}")]
        public ActionResult<Product> GetProduct(int id)
        {
            var product = _products.FirstOrDefault(p => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpGet("category/{category}")]
        public ActionResult<IEnumerable<Product>> GetProductsByCategory(string category)
        {
            var products = _products.Where(p => p.Category.Equals(category, StringComparison.OrdinalIgnoreCase)).ToList();
            return Ok(products);
        }
    }
} 