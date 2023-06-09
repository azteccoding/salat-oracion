import React from "react";
import styles from "/styles/Home.module.css";
import MainTitle from "./MainTitle";
import Grid from "./Grid";

const Content = ({ title }) => {
  return (
    <main className={styles.main}>
      <MainTitle title={title} />

      <Grid />
    </main>
  );
};

export default Content;
