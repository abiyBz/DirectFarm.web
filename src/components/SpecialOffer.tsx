import React, { useEffect, useState } from "react";
import { useLanguage } from "../Context/LanguageContext";
import axios from "axios";
import { Link } from "react-router-dom";

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

const LatestProductsPage: React.FC = () => {
  const { language } = useLanguage();
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await axios.get<Product[]>(`http://localhost:5122/api/Product/GetAllProducts`);

        const productsWithImages = await Promise.all(
          response.data.data.map(async (product: Product) => {
            try {
              const imageResponse = await axios.post(`http://localhost:5122/api/Product/GetProductImage`, { id: product.id });
              return {
                ...product,
                image: `data:image/jpg;base64,${imageResponse.data.data}`,
                createdAt: new Date(product.createdAt),
              };
            } catch (imageError) {
              console.error("Image fetch error:", imageError);
              return { ...product, image: null };
            }
          })
        );

        // Sort products by creation date (latest first) and take the top 5
        const sortedProducts = productsWithImages.sort((a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => (new Date(b.createdAt) as any) - (new Date(a.createdAt) as any));
        setLatestProducts(sortedProducts.slice(0, 5));
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  if (loading) {
    return <div className="text-center text-lg">Loading latest products...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-600">Error fetching products: {error}</div>;
  }

  return (
    <div className="px-6 py-12 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-8">{language === "en" ? "Latest Products" : "አዳዲስ ምርቶች"}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {latestProducts.map((product) => (
          <div key={product.id} className="group relative rounded-md block overflow-hidden">
            <Link to={`/product/${product.id}`}>
              <img
                className="h-32 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-36"
                src={product.image || 'path/to/placeholder/image.png'}
                alt={product.name}
              />
            </Link>
            <div className="relative border border-gray-100 bg-white p-3">
              {language === "en" ? (
                <span className="whitespace-nowrap bg-yellow-400 px-2 py-1 text-xs font-medium"> New </span>
              ) : (
                <span className="whitespace-nowrap bg-yellow-400 px-2 py-1 text-xs font-medium"> አዳዲስ </span>
              )}
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                {language === "en" ? product.name : product.nameAmharic}
              </h3>
              <p className="mt-1 text-sm text-gray-700">Br. {product.pricePerUnit.toFixed(2)}</p>
              <Link
                to={`/product/${product.id}`}
                className="block w-full mt-2 text-center bg-green-500 text-white rounded p-2 font-medium transition hover:scale-105"
              >
                {language === "en" ? "View Details" : "ዝርዝር አሳይ"}
              </Link>
            </div>
          </div>
          
        ))}
      </div>
      <div className="flex justify-center items-center">
      <Link to="/all-products"><button className="flex mt-5 text-center bg-green-500 text-white rounded p-4 font-medium transition hover:scale-105">
        {language === "en"
                   ? "View All Products"
                   : "ሁሉንም ምርቶች ይመልከቱ"}</button></Link>
      </div>{/* Divider */}
    <div className="border-t-2 border-white mt-16"></div>
    </div>
    
  );
};

export default LatestProductsPage;
