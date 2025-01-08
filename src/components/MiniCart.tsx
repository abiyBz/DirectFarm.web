import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import './MiniCart.css';

const MiniCart: React.FC = () => {
  const { cart, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const cartRef = useRef<HTMLDivElement>(null); // Reference for Mini Cart

  const toggleCart = () => setIsOpen(!isOpen);

  // Close cart when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="mini-cart" ref={cartRef}>
      <div className="mini-cart-icon" onClick={toggleCart}>
        🛒 <span className="mini-cart-count">{cart.length}</span>
      </div>
      {isOpen && (
        <div className="mini-cart-dropdown">
          <h4>Cart Preview</h4>
          {cart.map((item) => (
            <div key={item.id} className="mini-cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <p>{item.name}</p>
                <p>{item.price} ETB</p>
              </div>
              <button onClick={() => removeFromCart(item.id)}>❌</button>
            </div>
          ))}
          <button onClick={() => navigate('/cart')}>View Cart</button>
        </div>
      )}
    </div>
  );
};

export default MiniCart;
