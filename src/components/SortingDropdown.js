// SortingDropdown.js

import React from 'react';
import { useDispatch } from 'react-redux';
import { sortByTimeSpent, sortByViews } from 'src/actions';

const SortingDropdown = () => {
  const dispatch = useDispatch();

  return (
    <select onChange={(e) => {
      if (e.target.value === 'views') {
        dispatch(sortByViews());
      } else if (e.target.value === 'time_spent') {
        dispatch(sortByTimeSpent());
      }
    }}>
      <option value="">Sort By</option>
      <option value="views">Most Views</option>
      <option value="time_spent">Most Time Spent</option>
    </select>
  );
};

export default SortingDropdown;
