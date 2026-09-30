import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import FataawaAside from "@/components/fataawa/FataawaAside";
import FatwaCard from "@/components/fataawa/FatwaCard";
import { formatDate } from "@/components/fataawa/format";
import { FATAAWA_PATH, getTopic } from "@/constants/fataawa";
import { fataawa, getFatwa } from "@/data/fataawa";
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
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className={styles.quote}>
          <p>{block.text}</p>
          {block.source && <cite>— {block.source}</cite>}
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
    default:
      return <p>{block.text}</p>;
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

export default function FatwaPage({ fatwa, related }) {
  const topic = getTopic(fatwa.topic);

  return (
    <>
      <Seo title={fatwa.title} description={fatwa.summary} type="article" />

      <PageHero
        title={fatwa.title}
        crumbs={[
          { href: FATAAWA_PATH, label: "Fatāwá" },
          ...(topic ? [{ href: `${FATAAWA_PATH}?tema=${topic.slug}`, label: topic.label }] : []),
          { label: `Fatwa n.º ${fatwa.number}` },
        ]}
        eyebrow={`Fatwa n.º ${fatwa.number}`}
      >
        <div className={styles.fatwaMeta}>
          {topic && (
            <span>
              <Icon name="book" size={16} />
              <Link href={`${FATAAWA_PATH}?tema=${topic.slug}`}>{topic.label}</Link>
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
                <p key={i}>{p}</p>
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
                  <li key={i}>{s}</li>
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
    paths: fataawa.map((f) => ({ params: { slug: f.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const fatwa = getFatwa(params.slug);
  if (!fatwa) return { notFound: true };

  const explicit = (fatwa.related || []).map(getFatwa).filter(Boolean);
  const sameTopic = fataawa.filter(
    (f) => f.slug !== fatwa.slug && f.topic === fatwa.topic && !explicit.includes(f)
  );
  const related = [...explicit, ...sameTopic].slice(0, 4).map(({ slug, number, title, topic, date, summary }) => ({
    slug,
    number,
    title,
    topic,
    date: date || null,
    summary: summary || null,
  }));

  return { props: { fatwa: JSON.parse(JSON.stringify(fatwa)), related } };
}
