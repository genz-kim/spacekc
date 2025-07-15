import React from 'react';

const PricingCard = ({ className = '', children }) => {
  return (
    <div className={`bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export default PricingCard; 