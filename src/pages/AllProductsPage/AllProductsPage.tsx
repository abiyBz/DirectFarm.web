import React from "react";
import "./AllProductsPage.css";
import { useLanguage } from "../../Context/LanguageContext";
//import image from "../assets/farmer-with-hat-and-rake-logo-free-vector-removebg.png";
import image from "../../assets/DALL·E 2024-12-25 00.14.06 - A realistic image of fresh, ripe apples arranged in a wooden basket with a farm-themed background. The apples are vibrant red with natural shine, surr.webp";
import image1 from "../../assets/DALL·E 2024-12-25 00.15.23 - A hyper-realistic image of fresh, vibrant carrots with green tops, arranged in a rustic wooden crate. The carrots have rich orange color, visible soil.webp";
import image2 from "../../assets/teff.jpg";
import image3 from "../../assets/photo_2024-12-25_09-53-32.jpg";
import image4 from "../../assets/photo_2024-12-25_09-53-25 (2).jpg";
import image5 from "../../assets/photo_2024-12-25_09-53-28.jpg";
import image6 from "../../assets/photo_2024-12-25_09-53-29.jpg";
import image7 from "../../assets/photo_2024-12-25_09-53-22.jpg";
import image8 from "../../assets/photo_2024-12-25_09-53-36.jpg";
import image9 from "../../assets/photo_2024-12-25_09-53-37.jpg";
import image10 from "../../assets/photo_2024-12-25_09-53-38.jpg";
import image11 from "../../assets/photo_2024-12-25_09-53-39.jpg";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const generateProducts = (): Product[] => {
  const products: Product[] = [];
  for (let i = 1; i <= 50; i++) {
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100) + 10,
      image: image,
    });
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100) + 10,
      image: image1,
    });
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100) + 10,
      image: image2,
    });
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100) + 10,
      image: image3,
    });
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100) + 10,
      image: image4,
    });
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100) + 10,
      image: image5,
    });
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100) + 10,
      image: image6,
    });
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100) + 10,
      image: image7,
    });
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100) + 10,
      image: image8,
    });
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100) + 10,
      image: image9,
    });
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100) + 10,
      image: image10,
    });
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100) + 10,
      image: image11,
    });
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100) + 10,
      image: image3,
    });
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100) + 10,
      image: image5,
    });
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100) + 10,
      image: image7,
    });
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100) + 10,
      image: image9,
    });
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100) + 10,
      image: image11,
    });
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100) + 10,
      image: image2,
    });
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100) + 10,
      image: image4,
    });
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100) + 10,
      image: image6,
    });
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100) + 10,
      image: image8,
    });
  }
  return products;
};

const AllProductsPage: React.FC = () => {
  const { language } = useLanguage();
  const products = generateProducts();

  return (
    <div className="products-container">
      <h1>{language === "en" ? "All Products" : "ሁሉም ምርቶች"}</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card ">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>
              {language === "en"
                ? `Price: Br ${product.price}`
                : `ዋጋ፡ ${product.price} ብር`}
            </p>
            <button>{language === "en" ? "View Details" : "ዝርዝር እይ"}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage;
