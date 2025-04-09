using Microsoft.AspNetCore.Mvc;
using VRGroceryAPI.Models;

namespace VRGroceryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private static readonly List<CartItem> _cartItems = new List<CartItem>();

        [HttpGet("{userId}")]
        public ActionResult<IEnumerable<CartItem>> GetCart(string userId)
        {
            var userCart = _cartItems.Where(c => c.UserId == userId).ToList();
            return Ok(userCart);
        }

        [HttpPost]
        public ActionResult<CartItem> AddToCart(CartItem cartItem)
        {
            // In a real application, you would validate the product exists
            // and handle the case where the item is already in the cart
            
            cartItem.Id = _cartItems.Count > 0 ? _cartItems.Max(c => c.Id) + 1 : 1;
            _cartItems.Add(cartItem);
            
            return CreatedAtAction(nameof(GetCartItem), new { id = cartItem.Id }, cartItem);
        }

        [HttpGet("item/{id}")]
        public ActionResult<CartItem> GetCartItem(int id)
        {
            var cartItem = _cartItems.FirstOrDefault(c => c.Id == id);
            if (cartItem == null)
            {
                return NotFound();
            }

            return Ok(cartItem);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateCartItem(int id, CartItem cartItem)
        {
            if (id != cartItem.Id)
            {
                return BadRequest();
            }

            var existingItem = _cartItems.FirstOrDefault(c => c.Id == id);
            if (existingItem == null)
            {
                return NotFound();
            }

            existingItem.Quantity = cartItem.Quantity;
            
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCartItem(int id)
        {
            var cartItem = _cartItems.FirstOrDefault(c => c.Id == id);
            if (cartItem == null)
            {
                return NotFound();
            }

            _cartItems.Remove(cartItem);
            
            return NoContent();
        }
    }
} 