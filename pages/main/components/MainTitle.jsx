import React from "react";
import styles from "/styles/MainTitle.module.css";

const MainTitle = ({ title, description }) => {
  return (
    <header className={styles.upperHeader}>
      <h1 className={styles.header}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </header>
  );
};

export default MainTitle;
