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
  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
  {filteredProducts.map((product) => (
    <div
      key={product.id}
      className="relative bg-white shadow-md rounded-lg overflow-hidden group hover:shadow-lg transition-shadow"
    >
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block overflow-hidden">
        <img
          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
          src={product.image || 'path/to/placeholder/image.png'}
          alt={product.name}
        />
      </Link>

      {/* Wishlist Button */}
      <button
        className="absolute top-3 right-3 bg-white rounded-full p-2 text-gray-500 hover:text-gray-800 transition"
      >
        <span className="sr-only">Add to Wishlist</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M20.8 4.6c-1.3-1.5-3.4-1.6-5 0L12 8.4l-3.8-3.8c-1.6-1.6-3.8-1.5-5 0-1.3 1.5-1.4 3.8 0 5.2l9 9 9-9c1.4-1.5 1.3-3.7 0-5.2z" />
        </svg>
      </button>

      {/* Product Details */}
      <div className="p-4">
        {/* Badge */}
        {language === "en" ? (
          <span className="text-xs font-semibold bg-yellow-300 text-yellow-800 px-2 py-1 rounded-full">
            New
          </span>
        ) : (
          <span className="text-xs font-semibold bg-yellow-300 text-yellow-800 px-2 py-1 rounded-full">
            አዳዲስ
          </span>
        )}

        {/* Product Name */}
        <h3 className="mt-2 font-semibold text-gray-900 text-lg leading-tight">
          {language === "en" ? product.name : product.nameAmharic}
        </h3>

        {/* Price */}
        <p className="mt-1 text-green-600 font-bold text-sm">
          Br. {product.pricePerUnit.toFixed(2)}
        </p>

        {/* Add to Cart Button */}
        <button
          className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 rounded transition transform hover:scale-105"
          onClick={(e) => {
            e.preventDefault();
            addToCart({
              ...product,
              price: product.pricePerUnit,
              quantity: 1,
              image: product.image || 'path/to/placeholder/image.png',
            });
          }}
        >
          {language === "en" ? "Add to Cart" : "ወደ ጋሪ አክል"}
        </button>
      </div>
    </div>
  ))}
</div>
</div>


  );
};

export default AllProductsPage;
