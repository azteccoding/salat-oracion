import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import FataawaAside from "@/components/fataawa/FataawaAside";
import FatwaCard from "@/components/fataawa/FatwaCard";
import TextoRico from "@/components/noticias/TextoRico";
import { formatDate } from "@/components/fataawa/format";
import { FATAAWA_PATH, getTopic } from "@/constants/fataawa";
import { fataawa, fataawaPublicables, fatwaUrl, getFatwa, getFatwaByCode } from "@/data/fataawa";
import { conContexto, organizacion, tienePendientes } from "@/lib/seo";
import { SITE_URL } from "@/constants/site";
// Nota: data/fataawa solo se usa en getStaticPaths/getStaticProps (al construir el sitio),
// así que no llega al navegador del visitante.
import styles from "@/styles/site/Fataawa.module.css";
import ui from "@/styles/site/ui.module.css";

const paragraphs = (text = "") =>
  text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

const AnswerBlock = ({ block }) => {
  switch (block.type) {
    case "h":
      return <h2>{block.text}</h2>;
    case "list":
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>
              <TextoRico texto={item} />
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className={styles.quote}>
          <p>
            <TextoRico texto={block.text} />
          </p>
          {block.source && (
            <cite>
              — <TextoRico texto={block.source} />
            </cite>
          )}
        </blockquote>
      );
    case "arabic":
      return (
        <figure className={styles.arabicBlock}>
          <p className="arabe" lang="ar">
            {block.text}
          </p>
          {block.translit && <p className={styles.translit}>{block.translit}</p>}
          {block.translation && <p className={styles.translation}>{block.translation}</p>}
          {block.source && <cite>{block.source}</cite>}
        </figure>
      );
    case "link":
      // El href ya viene resuelto desde getStaticProps (también cuando se usa { codigo: "3301" })
      return (
        <p>
          <Link href={block.href || FATAAWA_PATH} className={styles.backLink}>
            {block.text} <Icon name="arrow" size={18} />
          </Link>
        </p>
      );
    case "nota":
      return (
        <aside className={styles.nota}>
          {block.title && <strong>{block.title}</strong>}
          <p>
            <TextoRico texto={block.text} />
          </p>
        </aside>
      );
    default:
      return (
        <p>
          <TextoRico texto={block.text} />
        </p>
      );
  }
};

const CopyLinkButton = () => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return (
    <button type="button" onClick={copy} className={`${ui.btn} ${ui.btnGhost}`}>
      <Icon name={copied ? "check" : "link"} size={18} />
      {copied ? "Enlace copiado" : "Copiar enlace"}
    </button>
  );
};

// Imagen para compartir en redes, generada al vuelo con el número y título de la fatwa
const ogImagen = (fatwa, topic, sub) =>
  `/api/og?${new URLSearchParams({
    n: fatwa.number,
    t: fatwa.title,
    tema: [topic?.label, sub?.label].filter(Boolean).join(" · "),
  }).toString()}`;

export default function FatwaPage({ fatwa, related }) {
  const topic = getTopic(fatwa.topic);
  const sub = getTopic(fatwa.subtopic);

  return (
    <>
      <Seo
        title={`${fatwa.title} · Fatwa ${fatwa.number}`}
        description={fatwa.summary}
        type="article"
        image={ogImagen(fatwa, topic, sub)}
        imageAlt={`Fatwa n.º ${fatwa.number}: ${fatwa.title}`}
        publishedTime={fatwa.date || undefined}
        noIndex={fatwa.borrador}
        pendiente={tienePendientes(fatwa)}
        jsonLd={conContexto({
          "@type": "Article",
          headline: fatwa.title,
          description: fatwa.summary,
          inLanguage: "es-MX",
          datePublished: fatwa.date || undefined,
          articleSection: [topic?.label, sub?.label].filter(Boolean).join(" · ") || undefined,
          image: `${SITE_URL}${ogImagen(fatwa, topic, sub)}`,
          mainEntityOfPage: `${SITE_URL}${FATAAWA_PATH}/${fatwa.slug}`,
          author: organizacion,
          publisher: organizacion,
        })}
      />

      <PageHero
        title={fatwa.title}
        crumbs={[
          { href: FATAAWA_PATH, label: "Fatāwá" },
          ...(topic && topic.indexado !== false ? [{ href: `${FATAAWA_PATH}?tema=${topic.slug}`, label: topic.label }] : []),
          ...(sub ? [{ href: `${FATAAWA_PATH}?tema=${sub.slug}`, label: sub.label }] : []),
          { label: `Fatwa n.º ${fatwa.number}` },
        ]}
        eyebrow={`Fatwa n.º ${fatwa.number}${fatwa.borrador ? " · Borrador" : ""}`}
      >
        <div className={styles.fatwaMeta}>
          {topic && (
            <span>
              <Icon name="book" size={16} />
              {topic.indexado === false ? (
                <span>{topic.label}</span>
              ) : (
                <Link href={`${FATAAWA_PATH}?tema=${(sub || topic).slug}`}>{sub ? `${topic.label} · ${sub.label}` : topic.label}</Link>
              )}
            </span>
          )}
          {fatwa.date && (
            <span>
              <Icon name="calendar" size={16} />
              <time dateTime={fatwa.date}>{formatDate(fatwa.date)}</time>
            </span>
          )}
        </div>
      </PageHero>

      <div className={`contenedor ${styles.layout}`}>
        <article className={styles.article}>
          <div className={styles.actions} data-no-print>
            <CopyLinkButton />
            <button type="button" onClick={() => window.print()} className={`${ui.btn} ${ui.btnGhost}`}>
              <Icon name="print" size={18} /> Imprimir
            </button>
          </div>

          <section className={styles.block}>
            <h2 className={styles.blockLabel}>
              <Icon name="question" size={18} /> Pregunta
            </h2>
            <div className={styles.question}>
              {paragraphs(fatwa.question).map((p, i) => (
                <p key={i}>
                  <TextoRico texto={p} />
                </p>
              ))}
            </div>
          </section>

          <section className={styles.block}>
            <h2 className={styles.blockLabel}>
              <Icon name="scale" size={18} /> Respuesta
            </h2>
            <div className={styles.answer}>
              {fatwa.opening !== false && (
                <p className={styles.opening}>
                  <span className="arabe" lang="ar">
                    الحمد لله
                  </span>
                  <em>Al-ḥamdu li-llāhi — Alabado sea Allah.</em>
                </p>
              )}

              {(fatwa.answer || []).map((block, i) => (
                <AnswerBlock key={i} block={block} />
              ))}

              {fatwa.closing !== false && (
                <p className={styles.closing}>
                  <span className="arabe" lang="ar">
                    والله أعلم
                  </span>
                  <em>Wa-llāhu aʿlamu — Y Allah sabe más.</em>
                </p>
              )}
            </div>
          </section>

          {fatwa.sources?.length > 0 && (
            <section className={styles.block}>
              <h2 className={styles.blockLabel}>
                <Icon name="book" size={18} /> Fuentes
              </h2>
              <ol className={styles.sources}>
                {fatwa.sources.map((s, i) => (
                  <li key={i}>
                    <TextoRico texto={s} />
                  </li>
                ))}
              </ol>
            </section>
          )}

          {related.length > 0 && (
            <section data-no-print>
              <div className={ui.sectionHead}>
                <h2 className={ui.sectionTitle}>Fatāwá relacionadas</h2>
              </div>
              <div className={styles.list}>
                {related.map((f) => (
                  <FatwaCard key={f.slug} fatwa={f} />
                ))}
              </div>
            </section>
          )}

          <p style={{ marginTop: 28 }} data-no-print>
            <Link href={FATAAWA_PATH} className={styles.backLink}>
              <Icon name="arrowLeft" size={18} /> Volver a todas las fatāwá
            </Link>
          </p>
        </article>

        <FataawaAside showMethod={false} />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return {
    // Los borradores no tienen página en el sitio publicado (solo en `npm run dev`)
    paths: fataawaPublicables().map((f) => ({ params: { slug: f.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const fatwa = getFatwa(params.slug);
  if (!fatwa) return { notFound: true };

  const publicables = fataawaPublicables();
  const explicit = (fatwa.related || []).map(getFatwaByCode).filter((f) => f && publicables.includes(f));
  const sameTopic = fataawa.filter(
    (f) => f.slug !== fatwa.slug && f.topic === fatwa.topic && !f.borrador && !explicit.includes(f)
  );
  const related = [...explicit, ...sameTopic].slice(0, 4).map(({ slug, number, title, topic, subtopic, date, summary, borrador }) => ({
    slug,
    number,
    title,
    topic,
    subtopic,
    date: date || null,
    summary: summary || null,
    borrador,
  }));

  // Los enlaces por código se convierten aquí en direcciones, en el servidor
  const answer = (fatwa.answer || []).map((b) => {
    if (b.type !== "link" || !b.codigo) return b;
    const destino = getFatwaByCode(b.codigo);
    return { ...b, href: destino ? fatwaUrl(destino) : FATAAWA_PATH };
  });

  return { props: { fatwa: JSON.parse(JSON.stringify({ ...fatwa, answer })), related } };
}
