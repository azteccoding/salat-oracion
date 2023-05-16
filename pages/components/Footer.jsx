import React from "react";
import styles from "/styles/Home.module.css";
import Image from "next/image";
import { ASSOCIATION_NAME } from "../../constants/names";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a href="#" rel="noopener noreferrer">
        {ASSOCIATION_NAME + " "}
        <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  );
};

export default Footer;
