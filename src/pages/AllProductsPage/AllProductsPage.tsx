import React, { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../../Context/LanguageContext";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/productsSlice';
import ProductCard from '../../components/ProductCard';
import type { AppDispatch, RootState } from '../../redux/store';

const AllProductsPage: React.FC = () => {
  const { language } = useLanguage();
  const dispatch = useDispatch<AppDispatch>();
  
  // Redux state
  const { items, status, error } = useSelector((state: RootState) => state.products);

  // Filter and pagination state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Memoized derived data
  const categories = useMemo(() => 
    Array.from(new Set(items?.map(product => product.category) || [])), 
    [items]
  );

  // Update price range when items load
  useEffect(() => {
    if (items?.length) {
      const prices = items.map(p => p.pricePerUnit);
      setPriceRange({
        min: Math.min(...prices),
        max: Math.max(...prices)
      });
    }
  }, [items]);

  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    if (!items) return [];
    
    return items.filter(product => {
      const categoryMatch = selectedCategories.length === 0 || 
        selectedCategories.includes(product.category);
      const priceMatch = product.pricePerUnit >= priceRange.min && 
        product.pricePerUnit <= priceRange.max;
      
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
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => {
    const value = Number(e.target.value);
    setPriceRange(prev => ({
      min: type === "min" ? Math.min(value, prev.max) : prev.min,
      max: type === "max" ? Math.max(value, prev.min) : prev.max
    }));
  };

  const PaginationControls = () => (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-6">
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-black bg-white border rounded-md disabled:opacity-50 hover:bg-gray-50"
        >
          {language === "en" ? "Previous" : "ቀዳሚ"}
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 text-black border rounded-md ${
              currentPage === i + 1 
                ? "bg-green-500 text-white border-green-500" 
                : "bg-white hover:bg-gray-50"
            }`}
          >
            {i + 1}
          </button>
        ))}
        
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-black bg-white border rounded-md disabled:opacity-50 hover:bg-gray-50"
        >
          {language === "en" ? "Next" : "ቀጣይ"}
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm">
          {language === "en" ? "Items per page:" : "በአንድ ገጽ ያሉ እቃዎች፡"}
        </span>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="border rounded-md px-2 py-1 text-sm"
        >
          {[10, 20, 30, 40].map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
    </div>
  );

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'failed') {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {paginatedProducts.map(product => (
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
  <div className="w-72 bg-white p-4 rounded-lg shadow-sm">
    <h2 className="text-2xl font-semibold mb-4">
      {language === "en" ? "Filters" : "ማጣሪያዎች"}
    </h2>

    <CategoryFilter
      language={language}
      categories={categories}
      selectedCategories={selectedCategories}
      onCategoryChange={onCategoryChange}
    />

    <div className="border-t border-gray-200 my-6" />

    <PriceFilter
      language={language}
      priceRange={priceRange}
      onPriceChange={onPriceChange}
    />
  </div>
);

const CategoryFilter: React.FC<{
  language: string;
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
}> = ({ language, categories, selectedCategories, onCategoryChange }) => (
  <div>
    <h3 className="text-lg font-medium mb-3">
      {language === "en" ? "Categories" : "ምድቦች"}
    </h3>
    <div className="space-y-2">
      {categories.map(category => (
        <label key={category} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedCategories.includes(category)}
            onChange={() => onCategoryChange(category)}
            className="h-4 w-4 text-indigo-600 rounded border-gray-300"
          />
          <span className="text-sm">{category}</span>
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
    <h3 className="text-lg font-medium mb-3">
      {language === "en" ? "Price Range" : "የዋጋ ተመን"}
    </h3>
    <div className="space-y-4">
      <div>
        <label className="block text-sm mb-1">
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
            className="flex-1"
          />
          <span className="text-sm w-20">Br. {priceRange.min}</span>
        </div>
      </div>
      <div>
        <label className="block text-sm mb-1">
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
            className="flex-1"
          />
          <span className="text-sm w-20">Br. {priceRange.max}</span>
        </div>
      </div>
    </div>
  </div>
);

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