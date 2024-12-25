import React from 'react';
import './Newsletter.css';

const Newsletter: React.FC = () => {
  return (
    <section className="newsletter">
      <h2>Subscribe to receive Latest Offers & Updates</h2>
      <p>Join our newsletter for exclusive deals and updates straight to your inbox!</p>
      <form>
        <input type="email" placeholder="Enter your mail address" />
        <button type="submit">Subscribe</button>
      </form>
    </section>
  );
};

export default Newsletter;
