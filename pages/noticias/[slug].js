import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import { formatDate } from "@/components/fataawa/format";
import CompartirNoticia from "@/components/noticias/CompartirNoticia";
import FotoAmpliable from "@/components/noticias/FotoAmpliable";
import NoticiaCard from "@/components/noticias/NoticiaCard";
import TextoRico from "@/components/noticias/TextoRico";
import { NOTICIAS_PATH, getNoticiaTema } from "@/constants/noticias";
import { SITE_URL } from "@/constants/site";
import { noticiaPorSlug, relacionadasDe } from "@/lib/noticias-db";
import { textoPlano } from "@/data/noticias-texto";
import { conContexto, organizacion, tienePendientes } from "@/lib/seo";
import fx from "@/styles/site/Fataawa.module.css";
import styles from "@/styles/site/Noticias.module.css";
import ui from "@/styles/site/ui.module.css";

// Página de una noticia. El contenido se escribe en data/noticias.js.

const Bloque = ({ b }) => {
  switch (b.type) {
    case "h":
      return <h2>{b.text}</h2>;
    case "list":
      return (
        <ul>
          {b.items.map((it, i) => (
            <li key={i}>
              <TextoRico texto={it} />
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className={fx.quote}>
          <p>
            <TextoRico texto={b.text} />
          </p>
          {b.source && (
            <cite>
              — <TextoRico texto={b.source} />
            </cite>
          )}
        </blockquote>
      );
    case "imagen":
      return (
        <figure className={styles.imagenCuerpo}>
          <FotoAmpliable src={b.src} alt={b.alt || ""} pie={b.pie}>
            <Image src={b.src} alt={b.alt || ""} width={b.ancho || 1200} height={b.alto || 675} sizes="(max-width: 860px) 100vw, 760px" />
          </FotoAmpliable>
          {b.pie && (
            <figcaption>
              <TextoRico texto={b.pie} />
            </figcaption>
          )}
        </figure>
      );
    case "nota":
      return (
        <aside className={fx.nota}>
          {b.title && <strong>{b.title}</strong>}
          <p>
            <TextoRico texto={b.text} />
          </p>
        </aside>
      );
    default:
      return (
        <p>
          <TextoRico texto={b.text} />
        </p>
      );
  }
};

export default function Noticia({ noticia, relacionadas }) {
  const tema = getNoticiaTema(noticia.tema);
  return (
    <>
      <Seo
        title={noticia.title}
        description={textoPlano(noticia.resumen)}
        type="article"
        image={noticia.imagen?.src}
        imageAlt={noticia.imagen?.alt}
        publishedTime={noticia.date || undefined}
        noIndex={noticia.borrador || noticia.indexar === false}
        pendiente={tienePendientes(noticia)}
        jsonLd={conContexto({
          "@type": "NewsArticle",
          headline: noticia.title,
          description: textoPlano(noticia.resumen),
          inLanguage: "es-MX",
          datePublished: noticia.date || undefined,
          articleSection: tema?.label,
          image: noticia.imagen ? `${SITE_URL}${noticia.imagen.src}` : undefined,
          mainEntityOfPage: `${SITE_URL}${NOTICIAS_PATH}/${noticia.slug}`,
          author: organizacion,
          publisher: organizacion,
        })}
      />

      <PageHero
        title={noticia.title}
        eyebrow={noticia.borrador ? "Noticia · Borrador" : "Noticia"}
        crumbs={[
          { href: NOTICIAS_PATH, label: "Noticias" },
          ...(tema ? [{ href: `${NOTICIAS_PATH}?tema=${tema.slug}`, label: tema.label }] : []),
          { label: noticia.title },
        ]}
      >
        <div className={fx.fatwaMeta}>
          {tema && (
            <span>
              <Icon name="book" size={16} />
              <Link href={`${NOTICIAS_PATH}?tema=${tema.slug}`}>{tema.label}</Link>
            </span>
          )}
          {noticia.date && (
            <span>
              <Icon name="calendar" size={16} />
              <time dateTime={noticia.date}>{formatDate(noticia.date)}</time>
            </span>
          )}
        </div>
      </PageHero>

      <div className="contenedor" style={{ paddingTop: 40 }}>
        <article className={`${fx.article} ${styles.noticia}`}>
          {noticia.resumen && (
            <p className={styles.entradilla}>
              <TextoRico texto={noticia.resumen} />
            </p>
          )}

          {noticia.imagen && (
            <figure className={styles.imagen}>
              <FotoAmpliable src={noticia.imagen.src} alt={noticia.imagen.alt || ""} relleno>
                <Image
                  src={noticia.imagen.src}
                  alt={noticia.imagen.alt || ""}
                  fill
                  priority
                  sizes="(max-width: 860px) 100vw, 760px"
                />
              </FotoAmpliable>
            </figure>
          )}

          <div className={fx.answer}>
            {(noticia.cuerpo || []).map((b, i) => (
              <Bloque key={i} b={b} />
            ))}
          </div>

          <CompartirNoticia
            url={`${SITE_URL}${NOTICIAS_PATH}/${noticia.slug}`}
            titulo={noticia.title}
            imagen={noticia.imagen?.src}
          />

          {noticia.fuentes.length > 0 && (
            <section className={styles.fuentes}>
              <h2>Fuentes</h2>
              <ol>
                {noticia.fuentes.map((f, i) => (
                  <li key={i}>
                    <a href={f.url} target="_blank" rel="noopener noreferrer">
                      {f.nombre || f.url} <Icon name="external" size={14} />
                    </a>
                    {f.nota && <span> · {f.nota}</span>}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {relacionadas.length > 0 && (
            <section className={styles.relacionadas}>
              <div className={ui.sectionHead}>
                <h2 className={ui.sectionTitle}>Más de {tema?.label || "actualidad"}</h2>
              </div>
              <div className={fx.list}>
                {relacionadas.map((n) => (
                  <NoticiaCard key={n.slug} noticia={n} />
                ))}
              </div>
            </section>
          )}

          <p style={{ marginTop: 28 }}>
            <Link href={NOTICIAS_PATH} className={fx.backLink}>
              <Icon name="arrowLeft" size={18} /> Todas las noticias
            </Link>
          </p>
        </article>
      </div>
    </>
  );
}

// Las páginas se crean al primer visitante y se renuevan cada 60 s: una noticia nueva
// en MongoDB aparece sola, sin volver a construir el sitio.
export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const noticia = await noticiaPorSlug(params.slug);
  if (!noticia) return { notFound: true, revalidate: 60 };
  const relacionadas = noticia.indexar ? await relacionadasDe(noticia, 3) : [];
  return { props: { noticia: JSON.parse(JSON.stringify(noticia)), relacionadas }, revalidate: 60 };
}
