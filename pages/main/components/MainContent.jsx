import React from "react";
import styles from "/styles/Main.module.css";
import { WELCOME_PAGE_CARDS } from "../../../constants/names";
import LinkCard from "./LinkCard";

const MainContent = () => {
  const welcomeCards = WELCOME_PAGE_CARDS.map((cardInfo, index) => (
    <LinkCard key={"welcard-" + index} cardInfo={cardInfo} />
  ));

  return (
    <div className={styles.main}>
      <section className={styles.container}>
        <div className={styles.grid}>{welcomeCards}</div>
      </section>
    </div>
  );
};

export default MainContent;
