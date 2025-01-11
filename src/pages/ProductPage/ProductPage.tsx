// // // import React from "react";
// // // import { useParams } from "react-router-dom";
// // // import "./ProductPage.css";
// // // import imageteff from "../../images/teff.jpg";
// // // import imagecarrot from "../../assets/DALL·E 2024-12-25 00.15.23 - A hyper-realistic image of fresh, vibrant carrots with green tops.webp";
// // // import imageapple from "../../assets/DALL·E 2024-12-25 00.14.06 - A realistic image of fresh, ripe apples.webp";

// // // const productData = [
// // //   {
// // //     id: 1,
// // //     name: "TEFF",
// // //     quality: 4,
// // //     store: "Daily Mart",
// // //     price: "120",
// // //     image: imageteff,
// // //   },
// // //   {
// // //     id: 2,
// // //     name: "Carrot",
// // //     quality: 2,
// // //     store: "Purpose Black",
// // //     price: "100",
// // //     image: imagecarrot,
// // //   },
// // //   {
// // //     id: 3,
// // //     name: "APPLE",
// // //     quality: 5,
// // //     store: "Marketplace",
// // //     price: "150",
// // //     image: imageapple,
// // //   },
// // // ];

// // // const ProductPage: React.FC = () => {
// // //   const { id } = useParams<{ id: string }>();

// // //   const productId = id ? parseInt(id) : null;
// // //   const product = productData.find((item) => item.id === productId);

// // //   if (!product) {
// // //     return <div className="product-page">Product not found!</div>;
// // //   }

// // //   return (
// // //     <div className="product-page">
// // //       <div className="product-image">
// // //         <img src={product.image} alt={product.name} />
// // //       </div>
// // //       <div className="product-details">
// // //         <h2>{product.name}</h2>
// // //         <p>Quality: {product.quality}</p>
// // //         <p>Store: {product.store}</p>
// // //         <p className="price">Br {product.price}</p>
// // //         <input type="number" placeholder="Qty" className="quantity" />
// // //         <button className="add-button">Add to Cart</button>
// // //         <button className="buy-button">Buy Now</button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ProductPage;














// // import { useEffect, useState } from "react";

// // type Product = {
// //   id: string;
// //   name: string;
// //   description: string;
// //   category: string;
// //   pricePerUnit: number;
// //   unit: string;
// //   createdAt: string;
// //   status: string;
// //   nameAmharic: string;
// //   descriptionAmharic: string;
// // };

// // const ProductPage = () => {
// //   const [product, setProduct] = useState<Product | null>(null);
// //   const [loading, setLoading] = useState<boolean>(true);

// //   useEffect(() => {
// //     const fetchProduct = async () => {
// //       try {
// //         const response = await fetch("http://localhost:5122/api/Product/GetProduct");
// //         const data = await response.json();
// //         if (data && data.data) {
// //           setProduct(data.data);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching product data:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProduct();
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         <div className="text-xl text-gray-500">Loading...</div>
// //       </div>
// //     );
// //   }

// //   if (!product) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         <div className="text-xl text-red-500">Product not found.</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
// //       <div className="flex flex-col lg:flex-row items-center">
// //         {/* Image Section (Placeholder for now) */}
// //         <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
// //           <img
// //             src="https://via.placeholder.com/300"
// //             alt={product.name}
// //             className="w-full h-full object-cover rounded-lg shadow-md"
// //           />
// //         </div>
        
// //         {/* Product Details Section */}
// //         <div className="w-full lg:w-2/3 lg:pl-12">
// //           <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
// //           <p className="text-lg text-gray-500 mb-4">{product.category}</p>
// //           <p className="text-md text-gray-700 mb-6">{product.description}</p>

// //           <div className="flex items-center justify-between mb-6">
// //             <span className="text-2xl font-semibold text-gray-900">
// //               ${product.pricePerUnit} / {product.unit}
// //             </span>
// //             <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
// //               Add to Cart
// //             </button>
// //           </div>

// //           <div className="flex flex-col space-y-3">
// //             <div>
// //               <span className="font-semibold text-gray-700">Amharic Name: </span>
// //               <span className="text-gray-500">{product.nameAmharic}</span>
// //             </div>
// //             <div>
// //               <span className="font-semibold text-gray-700">Amharic Description: </span>
// //               <span className="text-gray-500">{product.descriptionAmharic}</span>
// //             </div>
// //             <div>
// //               <span className="font-semibold text-gray-700">Created At: </span>
// //               <span className="text-gray-500">{new Date(product.createdAt).toLocaleDateString()}</span>
// //             </div>
// //             <div>
// //               <span className="font-semibold text-gray-700">Status: </span>
// //               <span className="text-green-500">{product.status}</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductPage;






















// import React, { useEffect, useState } from "react";
// import { useLanguage } from "../../Context/LanguageContext";
// import axios from "axios";
// import { Link, useParams } from "react-router-dom";
// import { useCart } from '../../Context/CartContext';

// interface Product11 {
//     id: string;
//     name: string;
//     description: string;
//     category: string;
//     pricePerUnit: number;
//     unit: string;
//     createdAt: string;
//     status: string;
//     image?: string;
//     nameAmharic: string;
//     descriptionAmharic: string;
//   }

// const ProductPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const { language } = useLanguage();
//   const [product1, setProducts] = useState<Product11[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.post<Product11[]>(`http://localhost:5122/api/Product/GetProduct`, {id: product1.id});
//         const productsWithImages = await Promise.all(response.data.data.map(async (product1: Product11) => {
//           try {
//             const imageResponse = await axios.post(`http://localhost:5122/api/Product/GetProductImage`, { id: product1.id });
//             return {
//               ...product1,
//               image: `data:image/jpg;base64,${imageResponse.data.data}`,
//               createdAt: new Date(product1.createdAt)
//             };
//           } catch (imageError) {
//             console.error("Image fetch error:", imageError);
//             return { ...product1, image: null };
//           }
//         }));

//         setProducts(productsWithImages);

//       } catch (error) {
//         console.error("Fetch error:", error);
//         setError(error instanceof Error ? error.message : "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();

//   }, []);

//   return (
//         <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
//           <div className="flex flex-col lg:flex-row items-center">
//             {/* Image Section (Placeholder for now) */}
//             <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
//               <img 
//                   className="w-full h-full object-cover rounded-lg shadow-md" 
//                   src={product1.image || 'path/to/placeholder/image.png'} 
//                   alt={product1.name} 
//                 />
//             </div>
            
//             {/* Product Details Section */}
//             <div className="w-full lg:w-2/3 lg:pl-12">
//               <h1 className="text-3xl font-bold text-gray-800">{product1.name}</h1>
//               <p className="text-lg text-gray-500 mb-4">{product1.category}</p>
//               <p className="text-md text-gray-700 mb-6">{product1.description}</p>
    
//               <div className="flex items-center justify-between mb-6">
//                 <span className="text-2xl font-semibold text-gray-900">
//                   ${product1.pricePerUnit} / {product1.unit}
//                 </span>
//                 <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
//                   Add to Cart
//                 </button>
//               </div>
    
//               <div className="flex flex-col space-y-3">
//                 <div>
//                   <span className="font-semibold text-gray-700">Amharic Name: </span>
//                   <span className="text-gray-500">{product1.nameAmharic}</span>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-gray-700">Amharic Description: </span>
//                   <span className="text-gray-500">{product1.descriptionAmharic}</span>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-gray-700">Created At: </span>
//                   <span className="text-gray-500">{new Date(product1.createdAt).toLocaleDateString()}</span>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-gray-700">Status: </span>
//                   <span className="text-green-500">{product1.status}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       );
// }

// export default ProductPage;












































import { useEffect, useState } from "react";
import axios from "axios";
import {  useParams } from "react-router-dom";
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
