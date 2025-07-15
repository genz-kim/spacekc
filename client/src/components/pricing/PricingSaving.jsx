import React from 'react';

const PricingSaving = () => {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex bg-white rounded-lg shadow px-2 py-1 gap-1">
        <button className="px-4 py-2 text-sm font-medium text-secondary hover:text-accent transition-colors">
          Weekly <span className="text-accent">• Save 50%</span>
        </button>
        <button className="px-4 py-2 text-sm font-medium bg-accent text-white rounded shadow">
          Monthly <span className="text-white/90">• Save 83%</span>
        </button>
        <button className="px-4 py-2 text-sm font-medium text-secondary hover:text-accent transition-colors">
          Yearly <span className="text-accent">• Save 95%</span>
        </button>
      </div>
    </div>
  );
};

export default PricingSaving; 