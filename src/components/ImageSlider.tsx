import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLanguage } from "../Context/LanguageContext";

const images = [
      {
        image: "/assets/Heroimage.jpg",
        titleen: 'Welcome to Our Store',
        titleam: 'እንኳን ወደ ሱቃችን በሰላም መጡ',
        descriptionen: 'Discover the best products at unbelievable prices',
        descriptionam: 'በማይታመን ዋጋ ምርቶችን ያግኙ',
      },
      {
        image: "/assets/hero1.jpeg",
        titleen: 'Welcome to Our Store',
        titleam: 'እንኳን ወደ ሱቃችን በሰላም መጡ',
        descriptionen: 'Discover the best products at unbelievable prices',
        descriptionam: 'በማይታመን ዋጋ ምርቶችን ያግኙ',
      },
      {
        image: "/assets/hero2.jpg",
        titleen: 'Welcome to Our Store',
        titleam: 'እንኳን ወደ ሱቃችን በሰላም መጡ',
        descriptionen: 'Discover the best products at unbelievable prices',
        descriptionam: 'በማይታመን ዋጋ ምርቶችን ያግኙ',
      },
      {
        image: "/assets/hero3.jpg",
        titleen: 'Welcome to Our Store',
        titleam: 'እንኳን ወደ ሱቃችን በሰላም መጡ',
        descriptionen: 'Discover the best products at unbelievable prices',
        descriptionam: 'በማይታመን ዋጋ ምርቶችን ያግኙ',
      },
];

const ImageSlider: React.FC = () => {
  const { language } = useLanguage();

  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    className: "center",
    centerMode: true,
    centerPadding: "0",
    adaptiveHeight: true,
  };

  return (
    <Slider {...settings} className="w-full">
      {images.map((image, index) => (
        <div key={index} className="h-96 md:h-[70vh] relative">
          <img 
            src={image.image} 
            alt={`Slide ${index + 1}`} 
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 transition-all duration-500 hover:scale-105">
              {language === "en" ? image.titleen : image.titleam}
            </h2>
            <p className="text-xl md:text-2xl font-medium transition-all duration-500 hover:scale-105">
              {language === "en" ? image.descriptionen : image.descriptionam}
            </p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;