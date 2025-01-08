import React from "react";
import { useCart } from "../../Context/CartContext";
import { useLanguage } from "../../Context/LanguageContext";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id: string, value: number) => {
    if (value > 0) {
      updateQuantity(id, value);
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-page-text">{language === "en" ? "Your Cart" : "የእርስዎ ጋሪ"}</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>{language === "en" ? "Cart is empty!" : "ጋሪዎ ባዶ ነው!"}</p>
          <button onClick={() => navigate("/all-products")} className="back-to-products">
            {language === "en" ? "Back to Products" : "ወደ ምርቶች ተመለስ"}
          </button>
        </div>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>{language === "en" ? "Product" : "ምርት"}</th>
                <th>{language === "en" ? "Quantity" : "ብዛት"}</th>
                <th>{language === "en" ? "Price" : "ዋጋ"}</th>
                <th>{language === "en" ? "Actions" : "እርምጃዎች"}</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td className="quantity-control">
                    <button 
                      className="quantity-btn" 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                    />
                    <button 
                      className="quantity-btn" 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </td>
                  <td>Br {(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                      {language === "en" ? "Remove" : "አስወግድ"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <h2>
              {language === "en" ? "Total:" : "ጠቅላላ"} Br {totalPrice.toFixed(2)}
            </h2>
            <div className="cart-actions">
              <button onClick={() => navigate("/checkout")} className="checkout-btn">
                {language === "en" ? "Proceed to Checkout" : "ወደ ክፍያ ቀጥል"}
              </button>
              <button onClick={clearCart} className="clear-cart">
                {language === "en" ? "Clear Cart" : "ጋሪን አጽዳ"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
