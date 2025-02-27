import React, { useState, ChangeEvent, useCallback } from "react";
import { useCart, CartItem } from "../../Context/CartContext";
import { useLanguage } from "../../Context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess } from "../../redux/authSlice";
import { RootState } from "../../redux/store";
import debounce from "lodash/debounce";

// Define types
type DeliveryOption = "pickup" | "delivery";

const MIN_QUANTITY = 50;

interface APIResponse {
  data: {
    id?: string;
    data?: string | any; // Adjust based on actual API response
  };
}

interface CheckoutItem {
  productID: string;
  quantity: number;
}

interface CheckoutData {
  id: string;
  customerID: string;
  details: CheckoutItem[];
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
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>("");
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Parse auth token
  const authToken = sessionStorage.getItem("authToken");
  let customer: { id: string } | null = null;
  if (authToken) {
    try {
      const parsedToken = JSON.parse(authToken) as { data?: { object?: { id: string } } };
      customer = parsedToken.data?.object || null;
    } catch (error) {
      console.error("Failed to parse authToken:", error);
    }
  }
  const customerID = customer?.id ?? "";

  // Update checkoutData whenever cart changes
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    id: "00000000-0000-0000-0000-000000000000",
    customerID,
    details: cart.map((item: CartItem) => ({
      productID: item.id,
      quantity: item.quantity,
    })),
  });

  React.useEffect(() => {
    setCheckoutData({
      id: "00000000-0000-0000-0000-000000000000",
      customerID,
      details: cart.map((item: CartItem) => ({
        productID: item.id,
        quantity: item.quantity,
      })),
    });
  }, [cart, customerID]);

  const totalPrice = cart.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  const validateQuantity = (value: string): number => {
    const num = parseInt(value, 10);
    if (isNaN(num)) return MIN_QUANTITY;
    return Math.max(num, MIN_QUANTITY);
  };

  const handleQuantityChange = useCallback(
    (id: string, value: number | string) => {
      const newQuantity = validateQuantity(value.toString());
      updateQuantity(id, newQuantity);
    },
    [updateQuantity]
  );

  const debouncedQuantityChange = useCallback(
    debounce((id: string, value: string) => {
      handleQuantityChange(id, value);
    }, 300),
    [handleQuantityChange]
  );

  const handleCheckout = async () => {
    setErrorMessage(null);
    setIsCheckingOut(true);

    const token = sessionStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      setIsCheckingOut(false);
      return;
    }

    const belowMinQuantityItems = cart.filter(
      (item: CartItem) => item.quantity < MIN_QUANTITY
    );
    if (belowMinQuantityItems.length > 0) {
      const itemNames = belowMinQuantityItems
        .map((item) => (language === "en" ? item.name : item.nameAmharic))
        .join(", ");
      setErrorMessage(
        language === "en"
          ? `The following products are below the minimum quantity of ${MIN_QUANTITY}: ${itemNames}`
          : `የሚከተሉት ምርቶች በብዛት ከሚፈቀደው ${MIN_QUANTITY} በታች ናቸው: ${itemNames}`
      );
      setIsCheckingOut(false);
      return;
    }

    if (!deliveryOption) {
      setErrorMessage(
        language === "en"
          ? "Please select a delivery option."
          : "እባክዎን የመረከቢያ አማራጭ ይምረጡ።"
      );
      setIsCheckingOut(false);
      return;
    }

    if (deliveryOption === "pickup") {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        console.log("Sending checkoutData:", checkoutData);
        const saveProductResponse = await axios.post<APIResponse>(
          "http://localhost:5122/api/Order/PlaceOrder",
          checkoutData,
          config
        );
        console.log("PlaceOrder response:", saveProductResponse.data);
        const orderId = saveProductResponse.data?.data?.id;
        if (!orderId) {
          throw new Error("Order ID not returned from PlaceOrder API");
        }
        setNewOrder(orderId);

        const paymentResponse = await axios.post<APIResponse>(
          "http://localhost:5122/api/Order/IntializePayment",
          { id: orderId },
          config
        );
        console.log("IntializePayment response:", paymentResponse.data);
        const url = paymentResponse.data?.data;
        if (!url || typeof url !== "string") {
          throw new Error("Payment URL not returned or invalid from IntializePayment API");
        }
        setUrlSent(true);
        window.open(url, "_blank");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Checkout error:", {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
          });
          setErrorMessage(
            language === "en"
              ? `Checkout failed: ${error.response?.data?.message || error.message}`
              : `በመክፈል ላይ ስህተት: ${error.response?.data?.message || error.message}`
          );
        } else {
          console.error("Unexpected error:", error);
          setErrorMessage(
            language === "en"
              ? "An unexpected error occurred during checkout."
              : "በመክፈል ላይ ያልተጠበቀ ስህተት ተከስቷል።"
          );
        }
      } finally {
        setIsCheckingOut(false);
      }
    }
  };

  const handleVerification = async () => {
    if (!newOrder) {
      setErrorMessage(
        language === "en"
          ? "No order available to verify."
          : "ለመረጋገጥ ምንም ትዕዛዝ የለም።"
      );
      return;
    }

    setIsVerifying(true);
    setErrorMessage(null);

    const token = sessionStorage.getItem("authToken");
    if (!token) {
      setErrorMessage(
        language === "en"
          ? "Authentication token missing."
          : "የማረጋገጫ ተማሪ የለም።"
      );
      setIsVerifying(false);
      return;
    }

    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const verificationResponse = await axios.post<APIResponse>(
        "http://localhost:5122/api/Order/VerifyPayment",
        { id: newOrder },
        config
      );
      console.log("VerifyPayment response:", verificationResponse.data);
      if (verificationResponse.data?.data) {
        setVerified("verified");
        clearCart();
      } else {
        setVerified("failed");
      }
      setNewOrder(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Verification error:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
      } else {
        console.error("Unexpected verification error:", error);
      }
      setErrorMessage(
        language === "en"
          ? "Payment verification failed. Please try again."
          : "የክፍያ ማረጋገጫ አልተሳካም። እባክዎ እንደገና ይሞክሩ።"
      );
      setVerified("failed");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClearCart = () => {
    if (
      window.confirm(
        language === "en"
          ? "Are you sure you want to clear your cart?"
          : "ቅርጫትዎን ማጽዳት እንደሚፈልጉ እርግጠኛ ነዎት?"
      )
    ) {
      clearCart();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 text-black">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-6">
          {language === "en" ? "Shopping Cart" : "የእርስዎ ቅርጫት"}
        </h1>

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errorMessage}
          </div>
        )}

        {cart.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 text-lg mb-4">
              {language === "en" ? "Your cart is empty!" : "ቅርጫትዎ ባዶ ነው!"}
            </p>
            <button
              onClick={() => navigate("/all-products")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition duration-300"
            >
              {language === "en" ? "Shop Now" : "አሁን ይግዙ"}
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="py-3 font-semibold">
                        {language === "en" ? "Product" : "ምርት"}
                      </th>
                      <th className="py-3 font-semibold">
                        {language === "en" ? "Price" : "ዋጋ"}
                      </th>
                      <th className="py-3 font-semibold">
                        {language === "en" ? "Quantity" : "ብዛት"}
                      </th>
                      <th className="py-3 font-semibold">
                        {language === "en" ? "Total" : "ጠቅላላ"}
                      </th>
                      <th className="py-3 font-semibold">
                        {language === "en" ? "Actions" : "እርምጃዎች"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item: CartItem) => (
                      <tr
                        key={item.id}
                        className="border-b last:border-b-0 hover:bg-gray-50"
                      >
                        <td className="py-4">
                          <div className="flex items-center">
                            <img
                              className="h-16 w-16 mr-4 rounded object-cover"
                              src={
                                item.image || "https://via.placeholder.com/150"
                              }
                              alt={
                                language === "en" ? item.name : item.nameAmharic
                              }
                            />
                            <span className="font-medium">
                              {language === "en" ? item.name : item.nameAmharic}
                            </span>
                          </div>
                        </td>
                        <td className="py-4">Br. {item.price.toFixed(2)}</td>
                        <td className="py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              className="border rounded-md py-1 px-2 hover:bg-gray-200 disabled:opacity-50 transition"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= MIN_QUANTITY}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min={MIN_QUANTITY}
                              value={item.quantity}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                debouncedQuantityChange(item.id, e.target.value)
                              }
                              className="w-16 text-center border rounded py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                              className="border rounded-md py-1 px-2 hover:bg-gray-200 transition"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-4">
                          Br. {(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="py-4">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md transition duration-300"
                          >
                            {language === "en" ? "Remove" : "አስወግድ"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button
                  onClick={handleClearCart}
                  className="mt-10 bg-red-500 text-white hover:bg-red-600 rounded-md px-6 py-2 float-right transition duration-300"
                >
                  {language === "en" ? "Clear Cart" : "ጋሪን አጽዳ"}
                </button>
              </div>
            </div>

            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-lg font-semibold mb-4">
                  {language === "en" ? "Order Summary" : "የትዕዛዝ አጠቃላይ"}
                </h2>

                <div className="mb-4">
                  <label className="block mb-2 font-semibold">
                    {language === "en" ? "Delivery Option:" : "የማስረጃ ዝርዝር:"}
                  </label>
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center">
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
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="deliveryOption"
                        value="delivery"
                        onChange={() => setDeliveryOption("delivery")}
                        checked={deliveryOption === "delivery"}
                        className="mr-2"
                        disabled
                      />
                      <span className="line-through text-gray-400">
                        {language === "en" ? "Delivery" : "ማድረስ"}
                      </span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>{language === "en" ? "Subtotal" : "እንደ አጠቃላይ"}</span>
                    <span>Br. {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>{language === "en" ? "Total" : "ጠቅላላ"}</span>
                    <span>Br. {totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full transition duration-300 disabled:opacity-50 flex items-center justify-center"
                  disabled={!deliveryOption || isCheckingOut}
                >
                  {isCheckingOut ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      {language === "en" ? "Processing..." : "በሂደት ላይ..."}
                    </span>
                  ) : language === "en" ? (
                    "Proceed to Checkout"
                  ) : (
                    "ወደ ክፍያ ይቀጥሉ"
                  )}
                </button>

                {urlSent && (
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg mt-4 w-full transition duration-300 disabled:opacity-50 flex items-center justify-center"
                    onClick={handleVerification}
                    disabled={isVerifying}
                  >
                    {isVerifying ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-2"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        {language === "en" ? "Verifying..." : "በማረጋገጥ ላይ..."}
                      </span>
                    ) : language === "en" ? (
                      "Verify Payment"
                    ) : (
                      "ክፍያዎትን ያረጋግጡ"
                    )}
                  </button>
                )}

                {verified && (
                  <div
                    className={`mt-4 p-3 rounded text-center ${
                      verified === "verified"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {verified === "verified"
                      ? language === "en"
                        ? "Payment Verified ✓"
                        : "ክፍያ ተረጋግጧል ✓"
                      : language === "en"
                      ? "Verification Failed ✗"
                      : "ማረጋገጥ አልተሳካም ✗"}
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