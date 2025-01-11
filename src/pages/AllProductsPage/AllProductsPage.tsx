import React, { useEffect, useState } from "react";
import { useLanguage } from "../../Context/LanguageContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from '../../Context/CartContext';

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

const AllProductsPage: React.FC = () => {
  const { language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Multiple categories
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 }); // Default range
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(`http://localhost:5122/api/Product/GetAllProducts`);

        const productsWithImages = await Promise.all(response.data.data.map(async (product: Product) => {
          try {
            const imageResponse = await axios.post(`http://localhost:5122/api/Product/GetProductImage`, { id: product.id });
            return {
              ...product,
              image: `data:image/jpg;base64,${imageResponse.data.data}`,
              createdAt: new Date(product.createdAt)
            };
          } catch (imageError) {
            console.error("Image fetch error:", imageError);
            return { ...product, image: null };
          }
        }));

        setProducts(productsWithImages);
        setFilteredProducts(productsWithImages);

        const uniqueCategories = Array.from(new Set<string>(productsWithImages.map(p => p.category)));
         setCategories(uniqueCategories);

      } catch (error) {
        console.error("Fetch error:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter(item => item !== category); // Remove category if already selected
      } else {
        return [...prevSelectedCategories, category]; // Add category to the list
      }
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => {
    setPriceRange((prevRange) => ({
      ...prevRange,
      [type]: Number(e.target.value),
    }));
  };

  useEffect(() => {
    const filtered = products.filter((product) => {
      const isCategoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const isPriceMatch = product.pricePerUnit >= priceRange.min && product.pricePerUnit <= priceRange.max;

      return isCategoryMatch && isPriceMatch;
    });
    setFilteredProducts(filtered);
  }, [selectedCategories, priceRange, products]);

  if (loading) {
    return <div className="text-center text-lg">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-600">Error fetching products: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-between">
  {/* Sidebar for Filters */}
  <div className="w-3/7 bg-white p-4 border-r border-gray-300 text-black">
    <h2 className="text-2xl font-semibold mb-4">{language === "en" ? "Categories" : "ምድቦች"}</h2>
    <div className="space-y-2">
      
      {categories.map((category) => (
        <div key={category}>
          <label className="flex items-center space-x-2">
            <input 
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <span>{category}</span>
          </label>
        </div>
      ))}
      <div>
        <button 
          onClick={() => setSelectedCategories([])} 
          className="w-3/4 text-center py-2 px-4 rounded-md bg-gray-600"
        >
          {language === "en" ? "Clear All" : "ሁሉንም አጽዳ"}
        </button>
      </div>
    </div>
    <div className="border-t border-gray-700 my-6"></div>
    <h2 className="text-2xl font-semibold mt-6 mb-4">{language === "en" ? "Price Range" : "የዋጋ ተመን"}</h2>
    <div className="mb-4">
      <label className="block text-sm mb-1">{language === "en" ? "Min Price" : "አነስተኛ የተመን"}</label>
      <input 
        type="range"
        min="0"
        max="1000"
        step="1"
        value={priceRange.min}
        onChange={(e) => handlePriceChange(e, "min")}
        className="w-full"
      />
      <span>{`Br. ${priceRange.min}`}</span>
    </div>
    <div className="mb-4">
      <label className="block text-sm mb-1">{language === "en" ? "Max Price" : "ከፍተኛ ተመን"}</label>
      <input 
        type="range"
        min="0"
        max="1000"
        step="1"
        value={priceRange.max}
        onChange={(e) => handlePriceChange(e, "max")}
        className="w-full"
      />
      <span>{`Br. ${priceRange.max}`}</span>
    </div>
  </div>

  {/* Gap between sidebar and products */}
  <div className="w-4 md:w-6 lg:w-8"></div>

  {/* Products Grid */}
  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-3">
    {filteredProducts.map((product) => (
      <div key={product.id} className="group relative block overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img 
            className="h-32 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-36" 
            src={product.image || 'path/to/placeholder/image.png'} 
            alt={product.name} 
          />
        </Link>

        <button
          className="absolute end-4 top-4 z-10 rounded-full bg-white p-1 text-gray-900 transition hover:text-gray-900/75"
        >
          <span className="sr-only">Wishlist</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

        <div className="relative border border-gray-100 bg-white p-3">
          {language === "en" && (
            <span className="whitespace-nowrap bg-yellow-400 px-2 py-1 text-xs font-medium"> New </span>
          )}
          {language !== "en" && (
            <span className="whitespace-nowrap bg-yellow-400 px-2 py-1 text-xs font-medium"> አዳዲስ </span>
          )}

          <h3 className="mt-2 text-lg font-medium text-gray-900">
            {language === "en" ? product.name : product.nameAmharic}
          </h3>

          <p className="mt-1 text-sm text-gray-700">Br. {product.pricePerUnit.toFixed(2)}</p>

          <form className="mt-2">
            <button
              className="block w-full rounded bg-green-500 p-2 text-sm font-medium transition hover:scale-105 text-white"
              onClick={(e) => {
                e.preventDefault(); 
                addToCart({ 
                  ...product, 
                  price: product.pricePerUnit, 
                  quantity: 1, 
                  image: product.image || 'path/to/placeholder/image.png' 
                });
              }}
            >
              {language === "en" ? "Add to Cart" : "ወደ ጋሪ አክል"}
            </button>
          </form>
        </div>
      </div>
    ))}
  </div>
</div>


  );
};

export default AllProductsPage;
