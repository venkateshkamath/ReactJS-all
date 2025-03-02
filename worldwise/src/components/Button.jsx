import React from "react";
import styles from "./Button.module.css";
function Button({ type, children, onClick }) {
  return (
    <div onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </div>
  );
}

export default Button;
