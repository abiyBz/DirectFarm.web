import { useState } from "react";
import React from "react";
import { useCart } from "../../Context/CartContext";
import { useLanguage } from "../../Context/LanguageContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const checkoutCart = cart.map(item => ({
    productID: item.id, // Assuming id is used as productID
    quantity: item.quantity
}));
  interface CheckoutData {
    id: string;
    customerID: string;
    details: any[];
}

const authToken = localStorage.getItem('authToken');
let customer = null;

if (authToken) {
  try {
    const parsedToken = JSON.parse(authToken); // Parse the string to JSON
    customer = parsedToken.data?.customer; // Safely access customer
  } catch (error) {
    console.error('Failed to parse authToken:', error);
  }
}

// Ensure customerID is set safely
const customerID = customer ? customer.id : ''; // Use an empty string if customer is null

const [checkoutData, setCheckoutData] = useState<CheckoutData>({
  id: '00000000-0000-0000-0000-000000000000',
  customerID: customerID, // Use the safe value here
  details: checkoutCart // Pass the existing array here
});

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id: string, value: number) => {
    if (value > 0) {
      updateQuantity(id, value);
    }
  };

  const handleCheckout = async () => {
    const saveProductResponse = await axios.post('http://localhost:5122/api/Order/PlaceOrder', checkoutData);
    const orderID = saveProductResponse.data.data.id;
    // const OrderResponse = await axios.post('http://localhost:5122/api/Order/PlaceOrder', orderID);
    console.log(orderID)
    const PaymentResponse = await axios.post(`http://localhost:5122/api/Order/IntializePayment`, {id: orderID});

    const url = PaymentResponse.data.data;
    
    window.open(url, "_blank");
    
    const PaymentVerify = await axios.post(`http://localhost:5122/api/Order/VerifyPayment?orderId=${orderID}`);
    if(PaymentVerify.data.isFailed == false){
      navigate("/");
      
    }
    };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        {language === "en" ? "Your Cart" : "የእርስዎ ቅርጫት"}
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg mb-4">
            {language === "en" ? "Cart is empty!" : "ቅርጫትዎ ባዶ ነው!"}
          </p>
          <button
            onClick={() => navigate("/all-products")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            {language === "en" ? "Back to Products" : "ወደ ምርቶች ተመለስ"}
          </button>
        </div>
      ) : (
        <>
          {/* Cart Table */}
          <div className="overflow-x-auto">
            <table className="text-gray-800 min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">{language === "en" ? "Product" : "ምርት"}</th>
                  <th className="p-3 text-center">{language === "en" ? "Quantity" : "ብዛት"}</th>
                  <th className="p-3 text-center">{language === "en" ? "Price" : "ዋጋ"}</th>
                  <th className="p-3 text-center">{language === "en" ? "Actions" : "እርምጃዎች"}</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3">{item.name}</td>
                    <td className="p-3 text-center flex items-center justify-center gap-2">
                      <button
                        className="px-2 py-1 bg-gray-700 hover:bg-gray-900 rounded-md"
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
                        className="w-12 text-center border rounded-md"
                      />
                      <button
                        className="px-2 py-1 bg-gray-700 hover:bg-gray-900 rounded-md"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </td>
                    <td className="p-3 text-center">Br {(item.price * item.quantity).toFixed(2)}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        {language === "en" ? "Remove" : "አስወግድ"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Summary */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-6 text-gray-800">
            <h2 className="text-xl font-semibold">
              {language === "en" ? "Total:" : "ጠቅላላ"} Br {totalPrice.toFixed(2)}
            </h2>
            <div className="flex gap-4">
              <button
                onClick={handleCheckout}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md"
              >
                {language === "en" ? "Proceed to Checkout" : "ወደ ክፍያ ቀጥል"}
              </button>
              <button
                onClick={clearCart}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md"
              >
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
