import React, { useState } from 'react';

const VisitorFilter = ({ onFilterChange }) => {
  const [selectedOption, setSelectedOption] = useState(30);

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onFilterChange(selectedValue);
  };

  return (
    <div>
      <select value={selectedOption} onChange={handleOptionChange} style={{
        padding: "5px",
        borderRadius: "10px"
        }}>
        <option value="7">7 days</option>
        <option value="15">15 days</option>
        <option value="30">30 days</option>
      </select>
    </div>
  );
};

export default VisitorFilter;
