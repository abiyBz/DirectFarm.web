/*import React from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";

const productData = [
  { id: 1, name: "TEFF", quality: 4, store: "Daily Mart", price: "ETB 120", image: "/images/product1.jpg" },
  { id: 2, name: "Teff", quality: 2, store: "Purpose Black", price: "ETB 100", image: "/images/product2.jpg" },
  { id: 3, name: "TEFF", quality: 5, store: "Marketplace", price: "ETB 150", image: "/images/product3.jpg" },
  { id: 4, name: "Teff", quality: 3, store: "Purpose Black", price: "ETB 110", image: "/images/product4.jpg" },
];

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id) : null;
  const product = productData.find((item) => item.id === parseInt(id));

  if (!product) {
    return <div className="product-page">Product not found!</div>;
  }

  return (
    <div className="product-page">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-details">
        <h1>{product.name}</h1>
        <p>Quality: {product.quality}</p>
        <p>Store: {product.store}</p>
        <p>Price: {product.price}</p>
        <button className="buy-button">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductPage;

*/

import React from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";
import imageteff from "../images/teff.jpg"
import imagecarrot from "../assets/DALL·E 2024-12-25 00.15.23 - A hyper-realistic image of fresh, vibrant carrots with green tops, arranged in a rustic wooden crate. The carrots have rich orange color, visible soil.webp";
import imageapple from "../assets/DALL·E 2024-12-25 00.14.06 - A realistic image of fresh, ripe apples arranged in a wooden basket with a farm-themed background. The apples are vibrant red with natural shine, surr.webp";
import imageapp from "../assets/DALL·E 2024-12-25 00.14.49 - A hyper-realistic image of fresh, ripe apples arranged in a rustic wooden basket. The apples have a natural shine, detailed skin texture, and vibrant .webp";


const productData = [
  { id: 1, name: "TEFF", quality: 4, store: "Daily Mart", price: " 120", image: imageteff },
  { id: 2, name: "Carrot", quality: 2, store: "Purpose Black", price: " 100", image: imagecarrot },
  { id: 3, name: "APPLE", quality: 5, store: "Marketplace", price: " 150", image: imageapple },
  { id: 4, name: "Teff", quality: 3, store: "Purpose Black", price: " 110", image: imageteff },
  { id: 5, name: "APPLE", quality: 1, store: "Marketplace", price: " 132", image: imageapp },
];

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Ensure id is defined and convert to number
  const productId = id ? parseInt(id) : null;
  const product = productData.find((item) => item.id === productId);

  if (!product) {
    return <div className="product-page">Product not found!</div>;
  }

  return (
    <div className="product-page">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-details">
        <h2>{product.name}</h2>
        <p>Quality: {product.quality}</p>
        <p>Store: {product.store}</p>
        <p className="price">Br {product.price}</p>
        <input type="number" placeholder="Qty" className="quantity"/>
        <button className="add-button">Add to Cart</button>
        <button className="buy-button">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductPage;
