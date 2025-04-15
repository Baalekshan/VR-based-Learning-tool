import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product, products } from './data/products';
import { submitScore } from '../utils/submitScore';
import useAuth from '../utils/UseAuth';

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
}

const VRGroceryShopping: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(true);
  const [cartTotal, setCartTotal] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);
  const [completedShopping, setCompletedShopping] = useState<boolean>(false);
  const userEmail = useAuth();

  // Load completed status from localStorage on mount
  useEffect(() => {
    const userProgressKey = `groceryShoppingCompleted_${userEmail}`;
    const savedCompletedStatus = localStorage.getItem(userProgressKey);
    if (savedCompletedStatus === 'true') {
      setCompletedShopping(true);
    }
  }, [userEmail]);

  // Calculate cart total whenever cart items change
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
    setCartTotal(total);
  }, [cartItems]);

  // Get unique categories from products
  const categories = [...new Set(products.map(product => product.category))];

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.productId === product.id);
    
    if (existingItem) {
      handleUpdateQuantity(existingItem, existingItem.quantity + 1);
    } else {
      const newCartItem: CartItem = {
        id: Date.now(), // Use timestamp as a simple unique ID
        productId: product.id,
        quantity: 1
      };
      setCartItems([...cartItems, newCartItem]);
    }
    setSelectedProduct(null);
    
    // Show notification
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(null), 2000);
  };

  const handleUpdateQuantity = (cartItem: CartItem, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveFromCart(cartItem.id);
    } else {
      setCartItems(cartItems.map(item => 
        item.id === cartItem.id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const handleRemoveFromCart = (cartItemId: number) => {
    setCartItems(cartItems.filter(item => item.id !== cartItemId));
  };

  const handleBackToLanding = () => {
    navigate('/vr-grocery');
  };

  const updateProgress = () => {
    try {
      const userProgressKey = `groceryShoppingCompleted_${userEmail}`;
      const isAlreadyCompleted = localStorage.getItem(userProgressKey) === 'true';
      
      if (!isAlreadyCompleted) {
        // Mark as completed in localStorage
        localStorage.setItem(userProgressKey, 'true');
        setCompletedShopping(true);
        
        // If user is logged in, submit score to server
        if (userEmail) {
          // Submit a score of 1 to indicate completion
          submitScore('grocery-shopping', 1, userEmail)
            .then(result => {
              console.log('Grocery shopping progress saved:', result);
            })
            .catch(err => {
              console.error('Failed to save grocery shopping progress:', err);
              // If the backend save fails, remove the localStorage entry
              localStorage.removeItem(userProgressKey);
              setCompletedShopping(false);
            });
        }
        
        console.log('Grocery shopping activity completed');
      }
    } catch (error) {
      console.error('Error updating grocery shopping progress:', error);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setNotification('Your cart is empty!');
      return;
    }
    
    // Update progress when checkout is successfully done
    updateProgress();
    
    setNotification(`Thank you for your purchase! ${completedShopping ? '(Already completed)' : '(Marked as completed)'}`);
    setCartItems([]);
    setTimeout(() => {
      setNotification(null);
      navigate('/vr-grocery');
    }, 2000);
  };

  return (
    <div className="vr-grocery-shopping">
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
      
      <div className="vr-header">
        <h1>VR Grocery Shopping</h1>
        <div className="header-controls">
          {completedShopping && (
            <div className="completion-badge">
              Completed ✓
            </div>
          )}
          <button className="cart-toggle" onClick={() => setShowCart(!showCart)}>
            {showCart ? 'Hide Cart' : 'Show Cart'} ({cartItems.length})
          </button>
          <button className="back-button" onClick={handleBackToLanding}>
            Back to Landing
          </button>
        </div>
      </div>

      <div className="vr-content">
        <div className="vr-store">
          <div className="store-controls">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="category-filters">
              <button 
                className={`category-btn ${!selectedCategory ? 'active' : ''}`}
                onClick={() => setSelectedCategory(null)}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <h2>Grocery Store</h2>
          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div 
                  key={product.id} 
                  className={`product-card ${selectedProduct?.id === product.id ? 'selected' : ''}`}
                  onClick={() => handleProductSelect(product)}
                >
                  <div className="product-image">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/products/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="price">${product.price.toFixed(2)}</p>
                    <p className="category">{product.category}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No products found matching your criteria</p>
              </div>
            )}
          </div>
        </div>

        {showCart && (
          <div className="vr-cart">
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is empty</p>
                <p className="empty-cart-message">Add some products to get started!</p>
              </div>
            ) : (
              <div className="cart-items">
                {cartItems.map(cartItem => {
                  const product = products.find(p => p.id === cartItem.productId);
                  if (!product) return null;
                  
                  return (
                    <div key={cartItem.id} className="cart-item">
                      <div className="cart-item-image">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/products/placeholder.jpg';
                          }}
                        />
                      </div>
                      <div className="cart-item-details">
                        <h3>{product.name}</h3>
                        <p className="price">${product.price.toFixed(2)}</p>
                        <div className="quantity-controls">
                          <button 
                            onClick={() => handleUpdateQuantity(cartItem, Math.max(0, cartItem.quantity - 1))}
                            disabled={cartItem.quantity <= 0}
                            className="quantity-btn"
                          >
                            -
                          </button>
                          <span className="quantity">{cartItem.quantity}</span>
                          <button 
                            onClick={() => handleUpdateQuantity(cartItem, cartItem.quantity + 1)}
                            className="quantity-btn"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button 
                        className="remove-button"
                        onClick={() => handleRemoveFromCart(cartItem.id)}
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            
            <div className="cart-summary">
              <div className="cart-total">
                <h3>Total: ${cartTotal.toFixed(2)}</h3>
              </div>
              <button 
                className="checkout-button"
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
              >
                Checkout
              </button>
            </div>
          </div>
        )}

        {selectedProduct && (
          <div className="product-details">
            <div className="product-details-content">
              <button 
                className="close-button"
                onClick={() => setSelectedProduct(null)}
              >
                ×
              </button>
              <h2>{selectedProduct.name}</h2>
              <div className="product-details-image">
                <img src={selectedProduct.imageUrl} alt={selectedProduct.name} />
              </div>
              <p className="description">{selectedProduct.description}</p>
              <p className="price">${selectedProduct.price.toFixed(2)}</p>
              <p className="category">{selectedProduct.category}</p>
              <button 
                className="add-to-cart-button"
                onClick={() => handleAddToCart(selectedProduct)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .vr-grocery-shopping {
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 20px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: auto;
        }
        
        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #4CAF50;
          color: white;
          padding: 15px 25px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          animation: slideIn 0.3s ease-out, fadeOut 0.3s ease-in 1.7s forwards;
        }
        
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        .vr-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .header-controls {
          display: flex;
          gap: 10px;
        }
        
        .vr-content {
          display: flex;
          flex: 1;
          gap: 20px;
          position: relative;
        }
        
        .vr-store, .vr-cart, .product-details {
          background: white;
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .vr-store {
          flex: 2;
        }
        
        .vr-cart {
          flex: 1;
          max-width: 400px;
          display: flex;
          flex-direction: column;
        }
        
        .store-controls {
          margin-bottom: 20px;
        }
        
        .search-container {
          margin-bottom: 15px;
        }
        
        .search-input {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.3s;
        }
        
        .search-input:focus {
          border-color: #4CAF50;
          outline: none;
        }
        
        .category-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 15px;
        }
        
        .category-btn {
          padding: 8px 15px;
          border: 1px solid #ddd;
          border-radius: 20px;
          background: white;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .category-btn:hover {
          background: #f0f0f0;
        }
        
        .category-btn.active {
          background: #4CAF50;
          color: white;
          border-color: #4CAF50;
        }
        
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }
        
        .product-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 15px;
          margin: 10px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          background: white;
          width: 200px;
        }
        
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .product-card.selected {
          border: 2px solid #4CAF50;
        }
        
        .product-image {
          width: 100%;
          height: 150px;
          overflow: hidden;
          border-radius: 4px;
          margin-bottom: 10px;
        }
        
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .product-info {
          flex: 1;
        }
        
        .product-info h3 {
          margin: 0 0 5px 0;
          font-size: 1.1em;
        }
        
        .price {
          color: #2c5282;
          font-weight: bold;
          margin: 5px 0;
        }
        
        .category {
          color: #666;
          font-size: 0.9em;
          margin: 5px 0;
        }
        
        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 15px;
          flex: 1;
          overflow-y: auto;
          max-height: 400px;
          padding-right: 5px;
        }
        
        .cart-item {
          display: flex;
          align-items: center;
          padding: 10px;
          border-bottom: 1px solid #eee;
        }
        
        .cart-item-image {
          width: 60px;
          height: 60px;
          margin-right: 15px;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .cart-item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .cart-item-details {
          flex: 1;
        }
        
        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 5px;
        }
        
        .quantity-btn {
          width: 30px;
          height: 30px;
          border: none;
          border-radius: 50%;
          background: #4CAF50;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition: background 0.3s;
        }
        
        .quantity-btn:hover {
          background: #3e8e41;
        }
        
        .quantity-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        
        .quantity {
          font-weight: bold;
          min-width: 20px;
          text-align: center;
        }
        
        .remove-button {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 24px;
          height: 24px;
          border: none;
          border-radius: 50%;
          background: #f44336;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          transition: background 0.3s;
        }
        
        .remove-button:hover {
          background: #d32f2f;
        }
        
        .cart-summary {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }
        
        .cart-total {
          margin-bottom: 15px;
        }
        
        .checkout-button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 8px;
          background: #4CAF50;
          color: white;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .checkout-button:hover {
          background: #3e8e41;
        }
        
        .checkout-button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        
        .empty-cart {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px 0;
          color: #666;
        }
        
        .empty-cart-message {
          font-size: 14px;
          margin-top: 10px;
        }
        
        .product-details {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }
        
        .product-details-content {
          background: white;
          border-radius: 15px;
          padding: 30px;
          max-width: 500px;
          width: 90%;
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        .close-button {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 30px;
          height: 30px;
          border: none;
          border-radius: 50%;
          background: #f44336;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
        
        .product-details-image {
          width: 100%;
          height: 250px;
          border-radius: 10px;
          overflow: hidden;
          margin: 20px 0;
        }
        
        .product-details-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .description {
          margin: 15px 0;
          line-height: 1.6;
          color: #333;
        }
        
        .add-to-cart-button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 8px;
          background: #4CAF50;
          color: white;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
          margin-top: 20px;
        }
        
        .add-to-cart-button:hover {
          background: #3e8e41;
        }
        
        .cart-toggle {
          padding: 8px 15px;
          border: none;
          border-radius: 8px;
          background: #2196F3;
          color: white;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .cart-toggle:hover {
          background: #0b7dda;
        }
        
        .back-button {
          padding: 8px 15px;
          border: none;
          border-radius: 8px;
          background: #f44336;
          color: white;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .back-button:hover {
          background: #d32f2f;
        }
        
        .no-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: 30px;
          color: #666;
        }
        
        @media (max-width: 768px) {
          .vr-content {
            flex-direction: column;
          }
          
          .vr-cart {
            max-width: 100%;
          }
          
          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          }
          
          .header-controls {
            flex-direction: column;
          }
          
          .product-details-content {
            width: 95%;
            padding: 20px;
          }
        }
        
        .completion-badge {
          background-color: #4CAF50;
          color: white;
          padding: 5px 10px;
          border-radius: 4px;
          margin-right: 10px;
          font-weight: bold;
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default VRGroceryShopping; 