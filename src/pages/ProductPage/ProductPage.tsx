// import React from "react";
// import { useParams } from "react-router-dom";
// import "./ProductPage.css";
// import imageteff from "../../images/teff.jpg";
// import imagecarrot from "../../assets/DALL·E 2024-12-25 00.15.23 - A hyper-realistic image of fresh, vibrant carrots with green tops.webp";
// import imageapple from "../../assets/DALL·E 2024-12-25 00.14.06 - A realistic image of fresh, ripe apples.webp";

// const productData = [
//   {
//     id: 1,
//     name: "TEFF",
//     quality: 4,
//     store: "Daily Mart",
//     price: "120",
//     image: imageteff,
//   },
//   {
//     id: 2,
//     name: "Carrot",
//     quality: 2,
//     store: "Purpose Black",
//     price: "100",
//     image: imagecarrot,
//   },
//   {
//     id: 3,
//     name: "APPLE",
//     quality: 5,
//     store: "Marketplace",
//     price: "150",
//     image: imageapple,
//   },
// ];

// const ProductPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();

//   const productId = id ? parseInt(id) : null;
//   const product = productData.find((item) => item.id === productId);

//   if (!product) {
//     return <div className="product-page">Product not found!</div>;
//   }

//   return (
//     <div className="product-page">
//       <div className="product-image">
//         <img src={product.image} alt={product.name} />
//       </div>
//       <div className="product-details">
//         <h2>{product.name}</h2>
//         <p>Quality: {product.quality}</p>
//         <p>Store: {product.store}</p>
//         <p className="price">Br {product.price}</p>
//         <input type="number" placeholder="Qty" className="quantity" />
//         <button className="add-button">Add to Cart</button>
//         <button className="buy-button">Buy Now</button>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;
