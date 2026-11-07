import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import TapaLibro, { varianteTapa } from "./TapaLibro";
import styles from "@/styles/site/Descargas.module.css";
import ui from "@/styles/site/ui.module.css";

const TONOS = {
  azul: styles.tonoCoran,
  verde: styles.tonoOracion,
  vino: styles.tonoFiqh,
  negro: styles.tonoNegro,
};

export const Portada = ({ item, sizes, className = "" }) => (
  <div className={`${styles.portada} ${className}`}>
    <div
      className={`${styles.libro} ${item.portada ? styles.libroApaisado : TONOS[varianteTapa(item)]}`}
    >
      {item.portada ? (
        <div className={styles.tapa}>
          <Image src={item.portada} alt="" fill sizes={sizes} />
        </div>
      ) : (
        <TapaLibro item={item} />
      )}
    </div>
  </div>
);

const DownloadCard = ({ item, compact = false }) => (
  <article className={compact ? styles.tile : styles.card}>
    {compact ? (
      <Link href={`/descargas/${item.slug}`} className={styles.enlacePortada} tabIndex={-1} aria-hidden>
        <Portada item={item} sizes="(max-width: 640px) 100vw, 400px" />
      </Link>
    ) : (
      <div className={styles.portadaGrande} aria-hidden>
        <Portada item={item} sizes="300px" />
      </div>
    )}
    <div className={styles.body}>
      {compact ? (
        <>
          <span className={styles.tag}>{item.categoria}</span>
          <h2>
            <Link href={`/descargas/${item.slug}`}>{item.title}</Link>
          </h2>
          <p>{item.teaser}</p>
        </>
      ) : (
        <>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </>
      )}
      <div className={styles.actions}>
        <a href={encodeURI(item.file)} download className={`${ui.btn} ${ui.btnPrimary}`}>
          <Icon name="download" size={18} /> Descargar {item.format}
        </a>
        <span className={styles.size}>{item.size}</span>
      </div>
    </div>
  </article>
);

export default DownloadCard;
