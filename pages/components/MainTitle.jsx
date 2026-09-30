import React from "react";
import styles from "@/styles/MainTitle.module.css";

const MainTitle = ({ title }) => {
  return (
    <header>
      <h1 className={styles.header}>{title}</h1>
    </header>
  );
};

export default MainTitle;
