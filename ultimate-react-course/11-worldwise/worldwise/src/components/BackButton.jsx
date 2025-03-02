import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./BackButton.module.css";
const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.btnWidth}>
      <Button
        type="back"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        &larr; Back
      </Button>
    </div>
  );
};

export default BackButton;
