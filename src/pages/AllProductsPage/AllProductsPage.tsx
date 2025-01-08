import React, { useEffect, useState } from "react";
import { useLanguage } from "../../Context/LanguageContext";
import axios from "axios";
import { Link } from "react-router-dom";

interface Product {
  id: string; // UUID as a string
  name: string;
  description: string;
  category: string;
  pricePerUnit: number; // Ensure this matches your API response structure
  unit: string;
  createdAt: string; // Use string for date representation
  status: string;
  image?: string; // Optional image property
}

const AllProductsPage: React.FC = () => {
  const { language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(`http://localhost:5122/api/Product/GetAllProducts`);

        // Fetch products and images concurrently
        const productsWithImages = await Promise.all(response.data.data.map(async (product: Product) => {
          try {
            // Fetch the image for each product using its ID
            const imageResponse = await axios.post(`http://localhost:5122/api/Product/GetProductImage`, {
              id: product.id // Sending the product ID
            });
            return {
              ...product,
              image: `data:image/jpg;base64,${imageResponse.data.data}`, // Assuming the API returns just the base64 string
              createdAt: new Date(product.createdAt) // Convert ISO string to Date object if needed
            };
          } catch (imageError) {
            console.error("Image fetch error:", imageError);
            return { ...product, image: null }; // Fallback if image fetch fails
          }
        }));

        setProducts(productsWithImages);
      } catch (error) {
        console.error("Fetch error:", error); // Log fetch error details
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    
  }, []);

  if (loading) {
    return <div className="text-center text-lg">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-600">Error fetching products: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">
        {language === "en" ? "All Products" : "ሁሉም ምርቶች"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="relative m-5 flex w-full max-w-[250px] flex-col overflow-hidden rounded-lg bg-white shadow-md"> {/* Changed to max-w-[150px] */}
            <Link to={`/product/${product.id}`}>
              <img 
                className="h-48 rounded-t-lg object-cover" 
                src={product.image || 'path/to/placeholder/image.png'} 
                alt={product.name} 
              />
            </Link>
            <div className="mt-4 px-3 pb-5"> {/* Adjusted padding for a more compact look */}
              <Link to={`/product/${product.id}`}>
                <h5 className="text-lg font-semibold tracking-tight text-slate-900">{product.name}</h5>
              </Link>
              <div className="mt-2.5 mb-5 flex items-center">
                <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">5.0</span>
                {/* Star ratings */}
                {[...Array(4)].map((_, index) => (
                  <svg key={index} aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <p>
                  <span className="text-xl font-bold text-slate-900">${product.pricePerUnit.toFixed(2)}</span>
                  {/* Uncomment if you have a regular price */}
                  {/* <span className="text-sm text-slate-900 line-through">$699</span> */}
                </p>
                <Link to={`/cart`} className="flex items-center rounded-md bg-slate-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring focus:ring-blue-300">
                  Add to cart
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage;
