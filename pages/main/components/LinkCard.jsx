import React from "react";
import Link from "next/link";
import styles from "/styles/Main.module.css";

const LinkCard = ({ cardInfo: { title, description, url } }) => {
  return (
    <Link href={url} className={styles.card}>
      <h2>{title}</h2>
      <p className={styles.paragraphs}>{description}</p>
      <p className={styles.more}>Ver más</p>
    </Link>
  );
};

export default LinkCard;
