
import React, { useState } from 'react';

function SidebarFilter({ brands, onFilterChange }) {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleBrandChange = (brand) => {
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];

    setSelectedBrands(updatedBrands);
    onFilterChange({ brands: updatedBrands, priceRange });
  };

  const handlePriceChange = (e) => {
    const updatedPrice = e.target.value;
    setPriceRange([0, updatedPrice]);
    onFilterChange({ brands: selectedBrands, priceRange: [0, updatedPrice] });
  };

  return (
    <div className="sidebar-filter">
      <h4>Filter by Brand</h4>
      {brands.map(brand => (
        <div key={brand}>
          <input
            type="checkbox"
            id={brand}
            checked={selectedBrands.includes(brand)}
            onChange={() => handleBrandChange(brand)}
          />
          <label htmlFor={brand}>{brand}</label>
        </div>
      ))}

      <h4>Filter by Price</h4>
      <input
        type="range"
        min="0"
        max="2000"
        value={priceRange[1]}
        onChange={handlePriceChange}
      />
      <span>Up to ${priceRange[1]}</span>
    </div>
  );
}

export default SidebarFilter;
