import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageSlider.css";
import { useLanguage } from "../Context/LanguageContext";
/*
const images = [
  "/assets/Heroimage.jpg",
  "/assets/hero1.jpeg",
  "/assets/hero2.jpg",
  "/assets/hero3.jpg",
];


<div className="slide-container-text">
              <h2>
                {language === "en"
                  ? "Discover the best products at unbeatable prices."
                  : "በምንም ዋጋ እንደማታገኙት ምርቶችን አግኙ።"}
              </h2>
            </div>

*/
const images = [
  {
    image: "/assets/Heroimage.jpg",
    titleen: 'Welcome to Our Store',
    titleam: 'እንኳን ወደ ሱቃችን በሰላም መጡ',
    descriptionen: 'Discover the best products at unbelivable prices',
    descriptionam: 'በማይታመን ዋጋ ምርቶችን ያግኙ',
  },
  {
    image: "/assets/hero1.jpeg",
    titleen: 'Welcome to Our Store',
    titleam: 'እንኳን ወደ ሱቃችን በሰላም መጡ',
    descriptionen: 'Discover the best products at unbelivable prices',
    descriptionam: 'በማይታመን ዋጋ ምርቶችን ያግኙ',
  },
  {
    image: "/assets/hero2.jpg",
    titleen: 'Welcome to Our Store',
    titleam: 'እንኳን ወደ ሱቃችን በሰላም መጡ',
    descriptionen: 'Discover the best products at unbelivable prices',
    descriptionam: 'በማይታመን ዋጋ ምርቶችን ያግኙ',
  },
  {
    image: "/assets/hero3.jpg",
    titleen: 'Welcome to Our Store',
    titleam: 'እንኳን ወደ ሱቃችን በሰላም መጡ',
    descriptionen: 'Discover the best products at unbelivable prices',
    descriptionam: 'በማይታመን ዋጋ ምርቶችን ያግኙ',
  },
];

const ImageSlider: React.FC = () => {
  const { language } = useLanguage();
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, 
    arrows: false,
  };

  return (
    
      
      <Slider {...settings}>
        
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.image} alt={`Slide ${index + 1}`} className="slider-image" />
            <h2 style={{marginTop: "19px", color: "darkgreen", textAlign: "center", fontSize: "2rem", fontWeight: "bold", textShadow: "2px 2px 4px #000000"}}>
                {language === "en"
                  ? image.titleen
                  : image.titleam}
              </h2>
              <p style={{color: "darkgreen", textAlign: "center", fontSize: "2rem", fontWeight: "bold", textShadow: "2px 2px 4px #000000"}}>
                {language === "en"
                  ? image.descriptionen
                  : image.descriptionam}
              </p>
          
          </div>
        ))}
      </Slider>
    
  );
};

export default ImageSlider;
