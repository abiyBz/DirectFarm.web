import { useState } from "react";
import React from "react";
import { useCart } from "../../Context/CartContext";
import { useLanguage } from "../../Context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess } from "../../redux/authSlice";
import { RootState } from '../../redux/store';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const checkoutCart = cart.map(item => ({
    productID: item.id,
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
      const parsedToken = JSON.parse(authToken);
      customer = parsedToken.data?.customer;
    } catch (error) {
      console.error('Failed to parse authToken:', error);
    }
  }

  const customerID = customer ? customer.id : '';

  const [checkoutData] = useState<CheckoutData>({
    id: '00000000-0000-0000-0000-000000000000',
    customerID: customerID,
    details: checkoutCart
  });

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // State to track payment status
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const handleQuantityChange = (id: string, value: number) => {
    if (value > 0) {
      updateQuantity(id, value);
    }
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        navigate("/login");
    } else {
        try {
            // Step 1: Place order and get order ID
            const saveProductResponse = await axios.post('http://localhost:5122/api/Order/PlaceOrder', checkoutData);
            const orderID = saveProductResponse.data.data.id;

            // Step 2: Initialize payment and get payment URL
            const paymentResponse = await axios.post(`http://localhost:5122/api/Order/IntializePayment`, { id: orderID });
            const url = paymentResponse.data.data;

            // Step 3: Open the payment URL in a new tab
            window.open(url, "_blank");

            // Step 4: Wait for a specified time before verifying payment
            setTimeout(async () => {
                try {
                    // Verify payment status using order ID
                    const paymentVerifyResponse = await axios.post(`http://localhost:5122/api/Order/VerifyPayment?orderId=${orderID}`);
                    if (!paymentVerifyResponse.data.isFailed) {
                        setPaymentStatus("success"); // Set status to success
                        navigate("/");
                    } else {
                        setPaymentStatus("failed"); // Set status to failed
                        console.error('Payment verification failed:', paymentVerifyResponse.data.message);
                    }
                } catch (verificationError) {
                    console.error('Error verifying payment:', verificationError);
                    setPaymentStatus("failed"); // Set status to failed on error
                }
            }, 10000); // Wait for 10 seconds

        } catch (error) {
            console.error('Error during checkout:', error);
        }
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

          {/* Order Status Section */}
          {/* Displaying payment status */}
          {paymentStatus && (
            <div className={`mt-4 font-semibold ${paymentStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {paymentStatus === 'success' 
                ? (language === 'en' ? 'Payment Successful!' : 'ክፍያ ተከናውኗል!')
                : (language === 'en' ? 'Payment Failed!' : 'ክፍያ ተቋርጧል!')}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CartPage;
