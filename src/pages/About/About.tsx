import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Welcome to our company! We are committed to providing top-quality products and exceptional customer service. 
          Our mission is to create value for our customers through innovation, integrity, and professionalism.
        </p>
      </div>
      
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {/* Our Mission */}
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-2 text-gray-600">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to deliver outstanding value to our customers by offering high-quality products and services that improve their lives.
          </p>
        </div>

        {/* Our Vision */}
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-2 text-gray-600">Our Vision</h2>
          <p className="text-gray-600">
            To be a globally recognized brand known for innovation, sustainability, and customer satisfaction.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto mt-12 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-600">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Team Member */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <img src="../../assets/IMG_0268.PNG" alt="Yonatan Teshome" className="rounded-full w-32 h-32 object-cover content-around" />
            <h3 className="text-xl font-semibold text-gray-600">Yonatan Teshome</h3>
            <p className="text-gray-600">Chief Executive Officer</p>
            <p className="text-gray-600">CEO</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <img src="../../assets/image.jpeg" alt="Abiy Bezuneh" className="rounded-full w-32 h-32 object-cover content-around" />
            <h3 className="text-xl font-semibold text-gray-600">Abiy Bezuneh</h3>
            <p className="text-gray-600">Chief Corporate Service Officer</p>
            <p className="text-gray-600">CCSO</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
          <img src="../../assets/image.jpeg" alt="Nebyou Yohannes" className="rounded-full w-32 h-32 object-cover content-around" />
            <h3 className="text-xl font-semibold text-gray-600">Nebyou Yohannes</h3>
            <p className="text-gray-600">Chief Technologies Officer</p>
            <p className="text-gray-600">CTO</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
          <img src="../../assets/1.jpg" alt="Soliyana Abraham" className="rounded-full w-32 h-32 object-cover content-around" />
            <h3 className="text-xl font-semibold text-gray-600">Soliyana Abraham</h3>
            <p className="text-gray-600">Head of Marketing</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
