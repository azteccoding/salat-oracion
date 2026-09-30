import Link from "next/link";
import Icon from "./Icon";
import styles from "@/styles/site/Descargas.module.css";
import ui from "@/styles/site/ui.module.css";

const DownloadCard = ({ item, detailLink = true }) => (
  <article className={styles.card}>
    <div className={styles.cover} aria-hidden>
      <span className="arabe">كتاب</span>
      <span className={styles.format}>{item.format}</span>
    </div>
    <div className={styles.body}>
      <h2>{detailLink ? <Link href={`/descargas/${item.slug}`}>{item.title}</Link> : item.title}</h2>
      <p>{item.description}</p>
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
