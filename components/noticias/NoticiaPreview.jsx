import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { formatDate } from "@/components/fataawa/format";
import { NOTICIAS_PATH, getNoticiaTema } from "@/constants/noticias";
import { textoPlano } from "@/data/noticias-texto";
import styles from "@/styles/site/Noticias.module.css";
import ui from "@/styles/site/ui.module.css";

// Vista previa de la noticia más reciente (página de inicio)
const NoticiaPreview = ({ noticia }) => {
  const tema = getNoticiaTema(noticia.tema);
  return (
    <article className={styles.preview}>
      {noticia.imagen && (
        <div className={styles.previewImagen}>
          <Image src={noticia.imagen.src} alt={noticia.imagen.alt || ""} fill sizes="(max-width: 860px) 100vw, 320px" />
        </div>
      )}
      <div className={styles.previewTexto}>
        <p className={styles.previewMeta}>
          {tema && <span className={styles.previewTema}>{tema.label}</span>}
          {noticia.date && <time dateTime={noticia.date}>{formatDate(noticia.date)}</time>}
          {noticia.borrador && <span className={ui.badge}>Borrador</span>}
        </p>
        <h3>
          <Link href={`${NOTICIAS_PATH}/${noticia.slug}`}>{noticia.title}</Link>
        </h3>
        {noticia.resumen && <p>{textoPlano(noticia.resumen)}</p>}
        <Link href={`${NOTICIAS_PATH}/${noticia.slug}`} className={ui.sectionLink}>
          Leer la noticia <Icon name="arrow" size={16} />
        </Link>
      </div>
    </article>
  );
};

export default NoticiaPreview;
