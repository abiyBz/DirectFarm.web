import React, { useState } from 'react';
import { useCart, CartItem } from "../../Context/CartContext";
import { useLanguage } from "../../Context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess } from "../../redux/authSlice";
import { RootState } from "../../redux/store";

// Define types for clarity
type DeliveryOption = 'pickup' | 'delivery';

const MIN_QUANTITY = 50;

interface APIResponse {
  data: {
    id?: string;
    data?: any;
  };
}

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [verified, setVerified] = useState<string | null>(null);
  const [urlSent, setUrlSent] = useState<boolean>(false);
  const [newOrder, setNewOrder] = useState<string | null>(null);
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>('');

  interface CheckoutItem {
    productID: string;
    quantity: number;
  }

  const checkoutCart: CheckoutItem[] = cart.map((item: CartItem) => ({
    productID: item.id,
    quantity: item.quantity,
  }));

  interface CheckoutData {
    id: string;
    customerID: string;
    details: CheckoutItem[];
  }

  const authToken = sessionStorage.getItem("authToken");
  let customer = null;

  if (authToken) {
    try {
      const parsedToken = JSON.parse(authToken);
      customer = parsedToken.data?.object;
    } catch (error) {
      console.error("Failed to parse authToken:", error);
    }
  }

  const customerID = customer ? customer.id : "";

  const [checkoutData] = useState<CheckoutData>({
    id: "00000000-0000-0000-0000-000000000000",
    customerID: customerID,
    details: checkoutCart,
  });

  const totalPrice = cart.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id: string, value: number) => {
    const newQuantity = Math.max(value, MIN_QUANTITY);
    updateQuantity(id, newQuantity);
  };

  const handleCheckout = async () => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    // Check if any product's quantity is below the minimum limit
    const belowMinQuantityItems = cart.filter((item: CartItem) => item.quantity < MIN_QUANTITY);
    
    if (belowMinQuantityItems.length > 0) {
      const itemNames = belowMinQuantityItems.map(item => language === "en" ? item.name : item.nameAmharic).join(', ');
      alert(language === "en" 
        ? `The following products are below the minimum quantity of ${MIN_QUANTITY}: ${itemNames}` 
        : `የሚከተሉት ምርቶች በብዛት ከሚፈቀደው ${MIN_QUANTITY} በታች ናቸው: ${itemNames}`
      );
      return;
    }

    if (deliveryOption === "pickup") {
      try {
        console.log(checkoutData);
        const saveProductResponse = await axios.post<APIResponse>(
          "http://localhost:5122/api/Order/PlaceOrder",
          checkoutData
        );
        const orderId = saveProductResponse.data.data.id;
        setNewOrder(orderId);
        console.log(newOrder);
        const paymentResponse = await axios.post<APIResponse>(
          `http://localhost:5122/api/Order/IntializePayment`,
          { id: orderId }
        );
        const url = paymentResponse.data.data;
        setUrlSent(true);
        window.open(url, "_blank");
      } catch (error) {
        console.error("Error during checkout:", error);
        alert(language === "en" ? "An error occurred during checkout." : "በመክፈል ላይ ስህተት አካባቢ እንደገና");
      }
    } else {
      alert(
        language === "en"
          ? "Please select a delivery option."
          : "እባክዎን የመረከቢያ አማራጭ ይምረጡ።"
      );
    }
  };

  const handleVerification = async () => {
    if (!newOrder) {
      console.error("No order ID available for verification.");
      return;
    }

    try {
      const verificationResponse = await axios.post<APIResponse>(
        `http://localhost:5122/api/Order/VerifyPayment`,
        { id: newOrder }
      );
      if (verificationResponse.data.data) setVerified("verified");
      setNewOrder(null);
    } catch (error) {
      console.error("Error verifying payment:", error);
    }
  };

  return (
    <div className="bg-gray-100 h-screen py-8 text-black">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">
          {language === "en" ? "Shopping Cart" : "የእርስዎ ቅርጫት"}
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
              {language === "en" ? "Go to Products" : "ወደ ምርቶች ይሂዱ"}
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4 flow-root">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">{language === "en" ? "Product" : "ምርት"}</th>
                      <th className="text-left font-semibold">{language === "en" ? "Price" : "ዋጋ"}</th>
                      <th className="text-left font-semibold">{language === "en" ? "Quantity" : "ብዛት"}</th>
                      <th className="text-left font-semibold">{language === "en" ? "Total" : "ጠቅላላ"}</th>
                      <th className="text-left font-semibold">{language === "en" ? "Actions" : "እርምጃዎች"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item: CartItem) => (
                      <tr key={item.id}>
                        <td className="py-4">
                          <div className="flex items-center">
                            <img className="h-16 w-16 mr-4" src={item.image || "https://via.placeholder.com/150"} alt={item.name} />
                            <span className="font-semibold">{language === "en" ? item.name : item.nameAmharic}</span>
                          </div>
                        </td>
                        <td className="py-4">Br. {item.price.toFixed(2)}</td>
                        <td className="py-4">
                          <div className="flex items-center">
                            <button
                              className="border rounded-md py-2 px-4 mr-2"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= MIN_QUANTITY}
                            >
                              -
                            </button>
                            <span className="text-center w-8">{item.quantity}</span>
                            <button
                              className="border rounded-md py-2 px-4 ml-2"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-4">Br. {(item.price * item.quantity).toFixed(2)}</td>
                        <td className="py-4 text-center">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                          >
                            {language === "en" ? "Remove" : "አስወግድ"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button
                  onClick={clearCart}
                  className="flex mt-4 bg-red-500 text-white outline hover:bg-white hover:text-red-600 rounded p-4 font-medium transition hover:scale-105 float-right"
                >
                  {language === "en" ? "Clear Cart" : "ጋሪን አጽዳ"}
                </button>
              </div>
            </div>

            {/* Summary Section */}
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">
                  {language === "en" ? "Summary" : "አጠቃላይ"}
                </h2>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">
                    {language === "en" ? "Delivery Option:" : "የማስረጃ ዝርዝር:"}
                  </label>
                  <div className="flex flex-col">
                    <label>
                      <input
                        type="radio"
                        name="deliveryOption"
                        value="pickup"
                        onChange={() => setDeliveryOption("pickup")}
                        checked={deliveryOption === "pickup"}
                        className="mr-2"
                      />
                      {language === "en" ? "Pick Up" : "ማንሳት"}
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="deliveryOption"
                        value="delivery"
                        onChange={() => setDeliveryOption("delivery")}
                        checked={deliveryOption === "delivery"}
                        className="mr-2"
                        disabled
                      />
                      <span className="line-through">
                        {language === "en" ? "Delivery" : "ማድረስ"}
                      </span>
                    </label>
                  </div>
                </div>
                <div className="flex justify-between mb-2">
                  <span>{language === "en" ? "Subtotal" : "እንደ አጠቃላይ"}:</span>
                  <span>
                    Br. {cart.reduce((total, item: CartItem) => total + item.price * item.quantity, 0).toFixed(2)}
                  </span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">
                    {language === "en" ? "Total" : "ጠቅላላ"}:
                  </span>
                  <span className="font-semibold">
                    Br. {totalPrice.toFixed(2)}
                  </span>
                </div>
                <h2 className="text-center text-red-500">
                  {language === "en"
                    ? "Please don't forget to download your receipt"
                    : "እባክዎን ደረሰኝዎን ማውረድዎን አይርሱ"}
                </h2>

                <button
                  onClick={handleCheckout}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                >
                  {language === "en" ? "Checkout" : "ወደ ክፍያ"}
                </button>

                {urlSent ? (
                  <button
                    className="text-white hover:text-blue-600 py-2 px-4 rounded-lg mt-4 w-full"
                    onClick={handleVerification}
                  >
                    {language === "en" ? "Verify Payment" : "ክፍያዎትን ያረጋግጡ"}
                  </button>
                ) : (
                  <p></p>
                )}
                {verified === null ? null : verified === "verified" ? (
                  <div className="p-4 text-green-600">
                    {language === "en" ? "VERIFIED" : "ክፍያዎትን ተረጋግጧል"}
                  </div>
                ) : (
                  <div className="p-4 text-red-500">
                    {language === "en" ? "NOT VERIFIED" : "ክፍያዎት አልተከፈለም"}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;