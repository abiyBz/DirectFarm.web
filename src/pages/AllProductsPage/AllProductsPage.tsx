// // import React, { useEffect, useState } from "react";
// // import { useLanguage } from "../../Context/LanguageContext";
// // import axios from "axios";
// // import { Link } from "react-router-dom";
// // import { useCart } from '../../Context/CartContext';

// // interface Product {
// //   id: string;
// //   name: string;
// //   description: string;
// //   category: string;
// //   pricePerUnit: number;
// //   unit: string;
// //   createdAt: string;
// //   status: string;
// //   image?: string;
// //   nameAmharic: string;
// //   descriptionAmharic: string;
// // }

// // const AllProductsPage: React.FC = () => {
// //   const { language } = useLanguage();
// //   const [products, setProducts] = useState<Product[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Used for filtered products
// //   const [categories, setCategories] = useState<string[]>([]);
// //   const [selectedCategory, setSelectedCategory] = useState<string>("All");
// //   const [error, setError] = useState<string | null>(null);
// //   const { addToCart } = useCart();

// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       try {
// //         const response = await axios.get<Product[]>(`http://localhost:5122/api/Product/GetAllProducts`);

// //         const productsWithImages = await Promise.all(response.data.data.map(async (product: Product) => {
// //           try {
// //             const imageResponse = await axios.post(`http://localhost:5122/api/Product/GetProductImage`, { id: product.id });
// //             return {
// //               ...product,
// //               image: `data:image/jpg;base64,${imageResponse.data.data}`,
// //               createdAt: new Date(product.createdAt)
// //             };
// //           } catch (imageError) {
// //             console.error("Image fetch error:", imageError);
// //             return { ...product, image: null };
// //           }
// //         }));

// //         setProducts(productsWithImages);
// //         setFilteredProducts(productsWithImages); // Set filtered products initially

// //         const uniqueCategories = Array.from(new Set<string>(productsWithImages.map(p => p.category)));
// //         setCategories(uniqueCategories);

// //       } catch (error) {
// //         console.error("Fetch error:", error);
// //         setError(error instanceof Error ? error.message : "An error occurred");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProducts();

// //   }, []);

// //   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// //     const category = e.target.value;
// //     setSelectedCategory(category);

// //     if (category === "All") {
// //       setFilteredProducts(products);
// //     } else {
// //       setFilteredProducts(products.filter(product => product.category === category));
// //     }
// //   };

// //   if (loading) {
// //     return <div className="text-center text-lg">Loading products...</div>;
// //   }

// //   if (error) {
// //     return <div className="text-center text-lg text-red-600">Error fetching products: {error}</div>;
// //   }

// //   return (
// //     <div className="p-6 bg-gray-100 min-h-screen">
// //       <h1 className="text-3xl font-bold text-center mb-6">
// //         {language === "en" ? "All Products" : "ሁሉም ምርቶች"}
// //       </h1>

// //       {/* Category Filter Dropdown */}
// //       <div className="filter-container mb-4">
// //         <label htmlFor="categoryFilter" className="block text-lg font-medium text-gray-700">
// //           {language === "en" ? "Filter by Category:" : "በምድብ አሳይ፦"}
// //         </label>
// //         <select 
// //           id="categoryFilter" 
// //           value={selectedCategory} 
// //           onChange={handleCategoryChange} 
// //           className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
// //         >
// //           <option value="All">{language === "en" ? "All" : "ሁሉም"}</option>
// //           {categories.map(category => (
// //             <option key={category} value={category}>
// //               {category}
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //         {/* Render filtered products */}
// //         {filteredProducts.map((product) => (
// //           <div key={product.id} className="relative m-5 flex w-full max-w-[250px] flex-col overflow-hidden rounded-lg bg-white shadow-md">
// //             <Link to={`/product/${product.id}`}>
// //               <img 
// //                 className="h-48 rounded-t-lg object-cover" 
// //                 src={product.image || 'path/to/placeholder/image.png'} 
// //                 alt={product.name} 
// //               />
// //             </Link>
// //             <div className="mt-4 px-3 pb-5">
// //               <Link to={`/product/${product.id}`}>
// //                 <h5 className="text-lg font-semibold tracking-tight text-slate-900">{language === "en" ? product.name : product.nameAmharic}</h5>
// //               </Link>
// //               <div className="mt-2.5 mb-5 flex items-center">
// //                 <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">5.0</span>
// //               </div>
// //               <div className="flex items-center justify-between">
// //                 <p>
// //                   <span className="text-xl font-bold text-slate-900">Br. {product.pricePerUnit.toFixed(2)}</span>
// //                 </p>
// //                 <button className="flex items-center rounded-md bg-slate-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:ring focus:ring-blue-300"
// //                   onClick={(e) => {
// //                     e.preventDefault(); 
// //                     addToCart({ 
// //                       ...product, 
// //                       price: product.pricePerUnit, 
// //                       quantity: 1, 
// //                       image: product.image || 'path/to/placeholder/image.png' 
// //                     });
// //                   }}
// //                 >
// //                   {language === "en" ? "Add to Cart" : "ወደ ጋሪ አክል"}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AllProductsPage;



// import React, { useEffect, useState } from "react";
// import { useLanguage } from "../../Context/LanguageContext";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useCart } from '../../Context/CartContext';

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   category: string;
//   pricePerUnit: number;
//   unit: string;
//   createdAt: string;
//   status: string;
//   image?: string;
//   nameAmharic: string;
//   descriptionAmharic: string;
// }

// const AllProductsPage: React.FC = () => {
//   const { language } = useLanguage();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<string[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string>("All");
//   const [error, setError] = useState<string | null>(null);
//   const { addToCart } = useCart();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get<Product[]>(`http://localhost:5122/api/Product/GetAllProducts`);

//         const productsWithImages = await Promise.all(response.data.data.map(async (product: Product) => {
//           try {
//             const imageResponse = await axios.post(`http://localhost:5122/api/Product/GetProductImage`, { id: product.id });
//             return {
//               ...product,
//               image: `data:image/jpg;base64,${imageResponse.data.data}`,
//               createdAt: new Date(product.createdAt)
//             };
//           } catch (imageError) {
//             console.error("Image fetch error:", imageError);
//             return { ...product, image: null };
//           }
//         }));

//         setProducts(productsWithImages);
//         setFilteredProducts(productsWithImages);

//         const uniqueCategories = Array.from(new Set(productsWithImages.map(p => p.category)));
//         setCategories(uniqueCategories);

//       } catch (error) {
//         console.error("Fetch error:", error);
//         setError(error instanceof Error ? error.message : "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();

//   }, []);

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);

//     if (category === "All") {
//       setFilteredProducts(products);
//     } else {
//       setFilteredProducts(products.filter(product => product.category === category));
//     }
//   };

//   if (loading) {
//     return <div className="text-center text-lg">Loading products...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-lg text-red-600">Error fetching products: {error}</div>;
//   }

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen flex">
//       {/* Sidebar for Category Filters */}
//       <div className="w-1/6 bg-white p-4 border-r border-gray-300">
//         <h2 className="text-2xl font-semibold mb-4">{language === "en" ? "Categories" : "ምድቦች"}</h2>
//         <ul className="space-y-2">
//           <li>
//             <button 
//               onClick={() => handleCategoryChange("All")}
//               className={`w-full text-left py-2 px-4 rounded-md ${selectedCategory === "All" ? "bg-gray-200" : "hover:bg-gray-100"}`}
//             >
//               {language === "en" ? "All" : "ሁሉም"}
//             </button>
//           </li>
//           {categories.map((category) => (
//             <li key={category}>
//               <button 
//                 onClick={() => handleCategoryChange(category)}
//                 className={`w-full text-left py-2 px-4 rounded-md ${selectedCategory === category ? "bg-gray-200" : "hover:bg-gray-100"}`}
//               >
//                 {category}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Products Grid */}
//       <div className="w-3/4 p-4">
//         <h1 className="text-3xl font-bold text-center mb-6">
//           {language === "en" ? "All Products" : "ሁሉም ምርቶች"}
//         </h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filteredProducts.map((product) => (
//             <div key={product.id} className="relative m-5 flex w-full max-w-[250px] flex-col overflow-hidden rounded-lg bg-white shadow-md">
//               <Link to={`/product/${product.id}`}>
//                 <img 
//                   className="h-48 rounded-t-lg object-cover" 
//                   src={product.image || 'path/to/placeholder/image.png'} 
//                   alt={product.name} 
//                 />
//               </Link>
//               <div className="mt-4 px-3 pb-5">
//                 <Link to={`/product/${product.id}`}>
//                   <h5 className="text-lg font-semibold tracking-tight text-slate-900">{language === "en" ? product.name : product.nameAmharic}</h5>
//                 </Link>
//                 <div className="mt-2.5 mb-5 flex items-center">
//                   <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">5.0</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <p>
//                     <span className="text-xl font-bold text-slate-900">Br. {product.pricePerUnit.toFixed(2)}</span>
//                   </p>
//                   <button className="flex items-center rounded-md bg-slate-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:ring focus:ring-blue-300"
//                     onClick={(e) => {
//                       e.preventDefault(); 
//                       addToCart({ 
//                         ...product, 
//                         price: product.pricePerUnit, 
//                         quantity: 1, 
//                         image: product.image || 'path/to/placeholder/image.png' 
//                       });
//                     }}
//                   >
//                     {language === "en" ? "Add to Cart" : "ወደ ጋሪ አክል"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllProductsPage;





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
    <div className="p-6 bg-gray-100 min-h-screen flex">
      {/* Sidebar for Filters */}
      <div className="w-1/7 bg-white p-4 border-r border-gray-300 text-black">
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

      {/* Products Grid */}
      <div className="w-3/4 p-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          {language === "en" ? "All Products" : "ሁሉም ምርቶች"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="relative m-5 flex w-full max-w-[250px] flex-col overflow-hidden rounded-lg bg-white shadow-md">
              <Link to={`/product/${product.id}`}>
                <img 
                  className="h-48 rounded-t-lg object-cover" 
                  src={product.image || 'path/to/placeholder/image.png'} 
                  alt={product.name} 
                />
              </Link>
              <div className="mt-4 px-3 pb-5">
                <Link to={`/product/${product.id}`}>
                  <h5 className="text-lg font-semibold tracking-tight text-slate-900">{language === "en" ? product.name : product.nameAmharic}</h5>
                </Link>
                <div className="mt-2.5 mb-5 flex items-center">
                  <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">5.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <p>
                    <span className="text-xl font-bold text-slate-900">Br. {product.pricePerUnit.toFixed(2)}</span>
                  </p>
                  <button className="flex items-center rounded-md bg-slate-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:ring focus:ring-blue-300"
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;
