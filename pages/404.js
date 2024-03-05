import Link from "next/link";
import styles from "/styles/Home.module.css";

const pageNotFound = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>¡Ay! No encontramos esta página :(</h1>
        <p className={styles.description}>
          Disculpa, la página que buscabas no existe
        </p>
        <div className={styles.buttonContainer}>
          <Link href="/main" className={styles.button}>
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
};

export default pageNotFound;
