import React from 'react';
import styles from './Spinner.module.css'; // Create a CSS module for styling

const Spinner = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Spinner;
