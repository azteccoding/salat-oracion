import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/components/fataawa/format";
import { NOTICIAS_PATH, getNoticiaTema } from "@/constants/noticias";
import { textoPlano } from "@/data/noticias-texto";
import fx from "@/styles/site/Fataawa.module.css";
import styles from "@/styles/site/Noticias.module.css";
import ui from "@/styles/site/ui.module.css";

// Ficha de una noticia en la lista de /noticias
const NoticiaCard = ({ noticia }) => {
  const tema = getNoticiaTema(noticia.tema);
  return (
    <article className={`${fx.item} ${styles.item}`}>
      {noticia.imagen && (
        <div className={styles.miniatura}>
          <Image src={noticia.imagen.src} alt={noticia.imagen.alt || ""} fill sizes="120px" />
        </div>
      )}
      <div className={fx.itemBody}>
        <div className={fx.itemMeta}>
          {tema && (
            <Link href={`${NOTICIAS_PATH}?tema=${tema.slug}`} className={fx.itemTopic}>
              {tema.label}
            </Link>
          )}
          {noticia.date && <time dateTime={noticia.date}>{formatDate(noticia.date)}</time>}
          {noticia.borrador && <span className={ui.badge}>Borrador</span>}
          {noticia.indexar === false && <span className={ui.badge}>No indexada</span>}
        </div>
        <h3 className={fx.itemTitle}>
          <Link href={`${NOTICIAS_PATH}/${noticia.slug}`}>{noticia.title}</Link>
        </h3>
        {noticia.resumen && <p className={fx.itemSummary}>{textoPlano(noticia.resumen)}</p>}
      </div>
    </article>
  );
};

export default NoticiaCard;
