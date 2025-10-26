import React from 'react';
import { assets } from '../assets/assets';
import '../css/Sponsored.css';

const Sponsored = () => {
  return (
    <div className="sponsored-card">
      <h3 className="sponsored-title">Sponsored</h3>
      
      <div className="sponsored-image-container">
        <img 
          src={assets.sponsored_img} 
          alt="Email marketing" 
          className="sponsored-image"
        />
      </div>
      
      <div className="sponsored-content">
        <h4 className="sponsored-category">Email marketing</h4>
        <p className="sponsored-description">
          Supercharge your marketing with a powerful, easy-to-use platform built for results.
        </p>
      </div>
    </div>
  );
};

export default Sponsored;
