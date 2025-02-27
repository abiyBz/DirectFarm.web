/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../../Context/LanguageContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productsSlice"; // Adjust path if needed
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext"; // Adjust path if needed
import type { AppDispatch, RootState } from "../../redux/store";

// Product interface
interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  pricePerUnit: number;
  unit: string;
  createdAt: string;
  status: string;
  image?: string; // Base64 string or URL
  nameAmharic: string;
  descriptionAmharic: string;
  percentageDiscount?: number;
  discountedPrice?: number;
}

// CartItem type (assumed from CartContext)
interface CartItem {
  id: string;
  name: string;
  nameAmharic: string;
  price: number;
  quantity: number;
  image?: string;
}

const AllProductsPage: React.FC = () => {
  const { language } = useLanguage();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Assuming CartContext provides this

  // Redux state
  const { items, status, error } = useSelector((state: RootState) => state.products);

  // Filter and pagination state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 5000 });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);

  // Memoized derived data
  const categories = useMemo(() =>
    Array.from(new Set(items?.map((product: Product) => product.category) || [])),
    [items]
  );

  // Update price range when items load
  useEffect(() => {
    if (items?.length) {
      const prices = items.map((p: Product) => p.pricePerUnit);
      setPriceRange({
        min: Math.min(...prices),
        max: Math.max(...prices),
      });
    }
  }, [items]);

  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    if (!items) return [];

    return items.filter((product: Product) => {
      const categoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const priceMatch =
        product.pricePerUnit >= priceRange.min && product.pricePerUnit <= priceRange.max;
      return categoryMatch && priceMatch;
    });
  }, [items, selectedCategories, priceRange]);

  // Pagination calculations
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = useMemo(() =>
    Math.ceil(filteredProducts.length / itemsPerPage),
    [filteredProducts.length, itemsPerPage]
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, priceRange]);

  // Fetch products on mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => {
    const value = Number(e.target.value);
    setPriceRange((prev) => ({
      min: type === "min" ? Math.min(value, prev.max) : prev.min,
      max: type === "max" ? Math.max(value, prev.min) : prev.max,
    }));
  };

  const PaginationControls: React.FC = () => (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-6">
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-100 transition-all"
        >
          {language === "en" ? "Previous" : "ቀዳሚ"}
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 border rounded-lg transition-all ${
              currentPage === i + 1
                ? "bg-green-500 text-white border-green-500"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-100 transition-all"
        >
          {language === "en" ? "Next" : "ቀጣይ"}
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">
          {language === "en" ? "Items per page:" : "በአንድ ገጽ ያሉ እቃዎች፡"}
        </span>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded-lg px-2 py-1 text-sm text-gray-800 focus:ring-2 focus:ring-green-500"
        >
          {[10, 12, 20, 30, 40].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "failed") {
    return <ErrorDisplay message={error} />;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex gap-6">
      <FiltersSidebar
        language={language}
        categories={categories}
        selectedCategories={selectedCategories}
        priceRange={priceRange}
        onCategoryChange={handleCategoryChange}
        onPriceChange={handlePriceChange}
      />

      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {paginatedProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length > 0 && totalPages > 1 && <PaginationControls />}
      </div>
    </div>
  );
};

const FiltersSidebar: React.FC<{
  language: string;
  categories: string[];
  selectedCategories: string[];
  priceRange: { min: number; max: number };
  onCategoryChange: (category: string) => void;
  onPriceChange: (e: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => void;
}> = ({ language, categories, selectedCategories, priceRange, onCategoryChange, onPriceChange }) => (
  <div className="w-64 bg-white p-6 rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">
      {language === "en" ? "Filters" : "ማጣሪዪዎች"}
    </h2>

    <CategoryFilter
      language={language}
      categories={categories}
      selectedCategories={selectedCategories}
      onCategoryChange={onCategoryChange}
    />

    <div className="border-t border-gray-200 my-6" />

    <PriceFilter language={language} priceRange={priceRange} onPriceChange={onPriceChange} />
  </div>
);

const CategoryFilter: React.FC<{
  language: string;
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
}> = ({ language, categories, selectedCategories, onCategoryChange }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-700 mb-3">
      {language === "en" ? "Categories" : "ምድቦች"}
    </h3>
    <div className="space-y-3">
      {categories.map((category) => (
        <label key={category} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedCategories.includes(category)}
            onChange={() => onCategoryChange(category)}
            className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
          />
          <span className="text-sm text-gray-600">{category}</span>
        </label>
      ))}
    </div>
  </div>
);

const PriceFilter: React.FC<{
  language: string;
  priceRange: { min: number; max: number };
  onPriceChange: (e: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => void;
}> = ({ language, priceRange, onPriceChange }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-700 mb-3">
      {language === "en" ? "Price Range" : "የዋጋ ተመን"}
    </h3>
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-gray-600 mb-1">
          {language === "en" ? "Min Price" : "አነስተኛ የተመን"}
        </label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={priceRange.min}
            onChange={(e) => onPriceChange(e, "min")}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
          <span className="text-sm text-gray-600 w-20">Br. {priceRange.min}</span>
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">
          {language === "en" ? "Max Price" : "ከፍተኛ ተመን"}
        </label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={priceRange.max}
            onChange={(e) => onPriceChange(e, "max")}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
          <span className="text-sm text-gray-600 w-20">Br. {priceRange.max}</span>
        </div>
      </div>
    </div>
  </div>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const hasDiscount =
    product.percentageDiscount !== undefined &&
    product.discountedPrice !== undefined &&
    product.percentageDiscount > 0;

  const fallbackImage = "https://via.placeholder.com/150?text=No+Image";

  const handleAddToCart = () => {
    const price = hasDiscount ? product.discountedPrice! : product.pricePerUnit;
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      nameAmharic: product.nameAmharic,
      price,
      quantity: 50, // Assuming minimum quantity from CartPage; adjust as needed
      image: product.image,
    };
    addToCart(cartItem);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md p-3 flex flex-col gap-3 hover:shadow-lg transition-all duration-300 relative cursor-pointer"
      onClick={handleCardClick} // Navigate to single product page
    >
      {hasDiscount && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {product.percentageDiscount}% OFF
        </span>
      )}
      <img
        src={product.image || fallbackImage}
        alt={language === "en" ? product.name : product.nameAmharic}
        className="w-full h-40 object-cover rounded-lg"
        onError={(e) => {
          (e.target as HTMLImageElement).src = fallbackImage;
        }}
      />
      <h3 className="text-lg font-semibold text-gray-800">
        {language === "en" ? product.name : product.nameAmharic}
      </h3>
      <div className="mt-auto">
        {hasDiscount ? (
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-green-600">
              Br. {product.discountedPrice.toFixed(2)}
            </span>
            <span className="text-sm text-red-600 line-through">
              Br. {product.pricePerUnit.toFixed(2)}
            </span>
          </div>
        ) : (
          <span className="text-sm text-gray-800">
            Br. {product.pricePerUnit.toFixed(2)}
          </span>
        )}
        <span className="text-sm text-gray-600">/{product.unit}</span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click from triggering navigation
          handleAddToCart();
        }}
        className="mt-2 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all"
      >
        {language === "en" ? "Add to Cart" : "ወደ ጋሪ ጨምር"}
      </button>
    </div>
  );
};

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500" />
  </div>
);

const ErrorDisplay: React.FC<{ message?: string }> = ({ message }) => (
  <div className="text-red-500 p-4 text-center">
    {message || "Error loading products"}
  </div>
);

export default AllProductsPage;