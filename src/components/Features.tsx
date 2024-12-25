import React from 'react';
import './Features.css';

const Features: React.FC = () => {
  return (
    <section className="features">
      <div>
        <h3>High Quality Products</h3>
        <p>Grown with care</p>
      </div>
      <div>
        <h3>Optional Partnership</h3>
        <p>Over 2 years</p>
      </div>
      <div>
        <h3>Low-Budget Shipping</h3>
        <p>Order over ETB 10,999</p>
      </div>
      <div>
        <h3>24/7 Support</h3>
        <p>Dedicated support</p>
      </div>
    </section>
  );
};

export default Features;
