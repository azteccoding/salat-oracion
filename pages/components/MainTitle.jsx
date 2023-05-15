import React from "react";
import styles from "/styles/Home.module.css";

const MainTitle = ({ title }) => {
  return <h1 className={styles.title}>{title}</h1>;
};

export default MainTitle;
