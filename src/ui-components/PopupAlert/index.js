import React from "react";
import styles from "./PopupAlert.module.css";
import { FiX } from "react-icons/fi";
import { useState } from "react";
import { useEffect } from "react";

const PopupAlert = ({ message, onClose }) => {

    const [timer, setTimer] = useState(true);
    const duration = 5000;
  
    useEffect(() => {
      if (timer) {
        const timeoutId = setTimeout(() => {
          onClose();
        }, duration);
  
        return () => {
          clearTimeout(timeoutId);
        };
      }
    }, [timer, onClose]);
  
    const handleClose = () => {
      setTimer(false);
      onClose();
    };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <p>{message}</p>
        <button className={styles.button} onClick={onClose && handleClose}><FiX size={12}/></button>
      </div>
    </div>
  );
};

export default PopupAlert;
