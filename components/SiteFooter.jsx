import Image from "next/image";
import Link from "next/link";
import { SITE_DESCRIPTION, SITE_LOCATION, SITE_NAME } from "@/constants/site";
import { FATAAWA_PATH, FATWA_TOPICS } from "@/constants/fataawa";
import Icon from "./Icon";
import styles from "@/styles/site/Footer.module.css";

const SiteFooter = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer} data-site-footer>
      <div className={styles.cenefa} aria-hidden />
      <div className={`contenedor ${styles.grid}`}>
        <div className={styles.about}>
          <Link href="/" className={styles.brand}>
            <Image src="/img/logo.svg" alt="" width={48} height={48} />
            <span>{SITE_NAME}</span>
          </Link>
          <p>{SITE_DESCRIPTION}</p>
          <p className={styles.lugar}>
            <Icon name="pin" size={16} /> {SITE_LOCATION}
          </p>
        </div>

        <div>
          <h3>Aprende</h3>
          <ul>
            <li>
              <Link href="/salat">Cómo rezar el ṣalāt</Link>
            </li>
            <li>
              <Link href="/#esencial">Wuḍūʾ y gusl</Link>
            </li>
            <li>
              <Link href="/#horarios">Horarios de oración</Link>
            </li>
            <li>
              <Link href="/descargas">Libros y descargas</Link>
            </li>
            <li>
              <Link href="/nuestra-tariqa">Nuestra Tarīqa</Link>
            </li>
            <li>
              <Link href="/nuestro-maulana">Nuestro Maulana</Link>
            </li>
            <li>
              <Link href="/nuestro-sheij">Nuestro Sheij</Link>
            </li>
            <li>
              <Link href="/nuestra-recitacion">Nuestra recitación</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Fatāwá</h3>
          <ul>
            <li>
              <Link href={FATAAWA_PATH}>Todas las preguntas</Link>
            </li>
            {FATWA_TOPICS.slice(0, 4).map((t) => (
              <li key={t.slug}>
                <Link href={`${FATAAWA_PATH}?tema=${t.slug}`}>{t.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.aya}>
          <p className="arabe" lang="ar">
            وَقُل رَّبِّ زِدْنِي عِلْمًا
          </p>
          <p className={styles.ayaEs}>«Y di: ¡Señor mío, acrecienta mi conocimiento!»</p>
          <p className={styles.ayaRef}>Corán 20:114</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`contenedor ${styles.bottomInner}`}>
          <span>
            © {year} {SITE_NAME}
          </span>
          <span>Hecho con amor en León, Guanajuato</span>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
