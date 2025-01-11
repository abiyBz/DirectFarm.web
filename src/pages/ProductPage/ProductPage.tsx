import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from '../../Context/CartContext';
import { useNavigate } from "react-router-dom";
interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  pricePerUnit: number;
  unit: string;
  createdAt: string;
  status: string;
  image?: string;
  nameAmharic: string;
  descriptionAmharic: string;
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>(); // Retrieve the product ID from the URL params
  const [product, setProduct] = useState<Product | null>(null); // Initialize state for a single product
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [prodQty, setProdQty] = useState(1);
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Number(event.target.value)); // Ensure quantity is at least 1
    setProdQty(value);
  };
  

  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch product details based on the ID from the URL
        const response = await axios.post<Product>(`http://localhost:5122/api/Product/GetProduct`, { id: id });
        const productData = response.data.data; // Assuming a single product object is returned
        console.log(productData);
        // Fetch the product image (optional, if needed)
        if (productData) {
          const imageResponse = await axios.post(`http://localhost:5122/api/Product/GetProductImage`, { id });
          const image = `data:image/jpg;base64,${imageResponse.data.data}`;

          setProduct({
            ...productData,
            image: image || null,
            createdAt: new Date(productData.createdAt).toLocaleDateString(),
          });
        }

      } catch (error) {
        console.error("Fetch error:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }

  }, [id]); // Run effect when `id` changes

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">Product not found.</div>
      </div>
    );
  }

  return (
    <div className=" max-w-10xl flex items-center justify-center min-h-screen bg-white">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> {/* Changed max-w-6xl to max-w-7xl */}
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
              <img
                className="w-full h-full object-cover"
                src={product.image}
                alt="Product Image"
              />
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-black mb-2">{product.name}</h2>
            <div>
            
              <p className="text-black text-sm mt2">
                {product.description} 
              </p>
            </div>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="text-black text-xl">Br </span>
                <span className="text-black text-4xl">{product.pricePerUnit}</span>
              </div>
            </div>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="text-black text-xl">per </span>
                <span className="text-black text-2xl">{product.unit}</span>
              </div>
            </div>
            <div className="mb-4">
              <span className="text-black text-xl">Status: </span>
              <span className="text-black text-2xl">{product.status}</span>
            </div>
            <div className="mb-4">
              <span className="text-black text-xl">Category: </span>
              <span className="text-black text-2xl">{product.category}</span>
            </div>
            <div className="mb-4">
              <input type="number" placeholder="Qty" value={prodQty} onChange={handleQuantityChange} />
            </div>
            
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <button 
                onClick={(e) => {
                  e.preventDefault(); 
                  addToCart({ 
                    ...product, 
                    price: product.pricePerUnit, 
                    quantity: prodQty, 
                    image: product.image || 'path/to/placeholder/image.png' 
                  });
                }}
                className="w-full bg-black text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">Add to Cart</button>
              </div>
              <div className="w-1/2 px-2">
                <button 
                onClick={(e) => {
                  e.preventDefault(); 
                  addToCart({ 
                    ...product, 
                    price: product.pricePerUnit, 
                    quantity: prodQty, 
                    image: product.image || 'path/to/placeholder/image.png' 
                  });
                  navigate('/cart');
                }}
                className="w-full bg-gray-200 text-black py-2 px-4 rounded-full font-bold hover:bg-gray-300">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default ProductPage;
