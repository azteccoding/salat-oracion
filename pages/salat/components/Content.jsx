import React from "react";
import styles from "/styles/Home.module.css";
import MainTitle from "/pages/components/MainTitle";
import Grid from "/pages/salat/components/grid";

const Content = ({ title }) => {
  return (
    <main className={styles.main}>
      <MainTitle title={title} />
      <Grid />
    </main>
  );
};

export default Content;
