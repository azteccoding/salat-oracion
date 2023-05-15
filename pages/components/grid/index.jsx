import React from "react";
import styles from "/styles/Home.module.css";
import Link from "next/link";
import Ghusl from "/pages/components/topics/ghusl";
import Salat from "/pages/components/topics/salat";
import Wudu from "/pages/components/topics/wudu";

const Grid = () => {
  return (
    <div className={styles.grid}>
      <Link href="/salat" className={styles.card}>
        <Salat />
      </Link>
      <Link href="/wudu" className={styles.card}>
        <Wudu />
      </Link>
      <Link href="/ghusl" className={styles.card}>
        <Ghusl />
      </Link>
    </div>
  );
};

export default Grid;
