import React from 'react';
import './SpecialOffer.css';
import { useLanguage } from "../Context/LanguageContext";
import image6 from "../assets/photo_2024-12-25_09-53-29.jpg";
import image7 from "../assets/photo_2024-12-25_09-53-22.jpg";
import image8 from "../assets/photo_2024-12-25_09-53-36.jpg";
import image9 from "../assets/photo_2024-12-25_09-53-37.jpg";
import image10 from "../assets/photo_2024-12-25_09-53-39.jpg";
import { Link } from 'react-router-dom';

interface Offer {
  id: number;
  title: string;
  quality: number;
  source: string;
  image: string;
}

const specialOffers: Offer[] = [
  { id: 1, title: "TOMATO", quality: 4, source: "Daily Mart", image: image10 },
  { id: 2, title: "APPLE", quality: 2, source: "Purpose Black", image: image6 },
  { id: 3, title: "COFFEE", quality: 5, source: "Marketplace", image: image7 },
  { id: 4, title: "TEFF", quality: 3, source: "Purpose Black", image: image8 },
  { id: 5, title: "JAL", quality: 1, source: "Marketplace",  image: image9},
];


interface Offer_amh {
  id: number;
  titleamh: string;
  quality: number;
  sourceam: string;
  image: string;
}

const specialOffers_amh: Offer_amh[] = [
  { id: 1, titleamh: "ጤፍ", quality: 4, sourceam: "ዴዴይሊ-ማርት", image: image10 },
  { id: 2, titleamh: "ካሮት", quality: 2, sourceam: "ፐርፐዝ-ብላክ", image: image6 },
  { id: 3, titleamh: "አፕል", quality: 5, sourceam: "ማርኬት-ፕሌስ", image: image7 },
  { id: 4, titleamh: "ጤፍ", quality: 3, sourceam: "ፐርፐዝ-ብላክ", image: image8 },
  { id: 5, titleamh: "አፕል", quality: 1, sourceam: "ማርኬት-ፕሌስ",  image: image9},
];






const SpecialOffers: React.FC = () => {
  const { language } = useLanguage();


  return (
    <section className="special-offers">
      <h1>{language === "en"
                  ? "Special Offers"
                  : "ምርጥ ምርጡን ለናንተ"}</h1>

      <ul className="offers-grid">
        {specialOffers.map((offer, index) => (
          <li className="offer-card" key={index}>
            <Link to={`/product/${offer.id}`} >
              <img src={offer.image} alt={offer.title} />
              <h3>{language === "en"
                  ? offer.title
                  : specialOffers_amh[index].titleamh}</h3>
              <p>{language === "en"
                  ? `Quality: ${offer.quality}`
                  : specialOffers_amh[index].quality}</p>
              <span>{language === "en"
                  ? `Source: ${offer.source}`
                  : specialOffers_amh[index].sourceam}</span>
              <br />
              <button>{language === "en"
                  ? "View Details..."
                  : "ምርቱን ይመልከቱ"}</button>
            </Link>
          </li>
        ))}
        
      </ul>
      <Link to="/all-products"><button className ="btn-all-product">{language === "en"
                  ? "View All Products"
                  : "ሁሉንም ምርቶች ይመልከቱ"}</button></Link>
    </section>
  );
};

export default SpecialOffers;