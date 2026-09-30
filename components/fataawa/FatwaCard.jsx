import Link from "next/link";
import { FATAAWA_PATH, getTopic } from "@/constants/fataawa";
import { formatDate } from "./format";
import styles from "@/styles/site/Fataawa.module.css";
import ui from "@/styles/site/ui.module.css";

const FatwaCard = ({ fatwa }) => {
  const topic = getTopic(fatwa.topic);
  const sub = getTopic(fatwa.subtopic);
  const etiqueta = sub || topic;
  return (
    <article className={styles.item}>
      <div className={styles.itemNum} aria-hidden>
        {fatwa.number}
      </div>
      <div className={styles.itemBody}>
        <div className={styles.itemMeta}>
          {etiqueta &&
            (etiqueta.indexado === false ? (
              <span className={styles.itemTopic}>{etiqueta.label}</span>
            ) : (
              <Link href={`${FATAAWA_PATH}?tema=${etiqueta.slug}`} className={styles.itemTopic}>
                {etiqueta.label}
              </Link>
            ))}
          {fatwa.date && <time dateTime={fatwa.date}>{formatDate(fatwa.date)}</time>}
          {fatwa.borrador && <span className={ui.badge}>Borrador</span>}
        </div>
        <h3 className={styles.itemTitle}>
          <Link href={`${FATAAWA_PATH}/${fatwa.slug}`}>{fatwa.title}</Link>
        </h3>
        {fatwa.summary && <p className={styles.itemSummary}>{fatwa.summary}</p>}
      </div>
    </article>
  );
};

export default FatwaCard;
