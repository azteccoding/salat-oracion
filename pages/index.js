import Image from "next/image";
import Link from "next/link";
import HijriDate from "@/components/HijriDate";
import Icon from "@/components/Icon";
import PrayerTimes from "@/components/PrayerTimes";
import Seo from "@/components/Seo";
import EmptyFataawa from "@/components/fataawa/EmptyFataawa";
import FatwaCard from "@/components/fataawa/FatwaCard";
import { FATAAWA_PATH, FATWA_TOPICS } from "@/constants/fataawa";
import { SITE_DESCRIPTION, SITE_NAME } from "@/constants/site";
import { sortedFataawa } from "@/data/fataawa";
import styles from "@/styles/site/Home.module.css";
import fx from "@/styles/site/Fataawa.module.css";
import ui from "@/styles/site/ui.module.css";

const QUICK = [
  { href: "/salat", icon: "mihrab", title: "Aprende a rezar", text: "El ṣalāt paso a paso, en árabe y en español" },
  { href: FATAAWA_PATH, icon: "scale", title: "Fatāwá", text: "Preguntas de fiqh según el método ẓāhirī" },
  { href: "#horarios", icon: "clock", title: "Horarios", text: "Las cinco oraciones de hoy en León" },
  { href: "/descargas", icon: "download", title: "Descargas", text: "Libros y materiales para estudiar" },
];

const ESSENTIALS = [
  {
    href: "/salat",
    arabic: "الصلاة",
    title: "Ṣalāt",
    text: "Aprende a rezar como el Profeta ﷺ: posiciones, recitaciones y su significado.",
  },
  {
    arabic: "الوضوء",
    title: "Wuḍūʾ",
    text: "La ablución o purificación menor que precede a la oración.",
  },
  {
    arabic: "الغسل",
    title: "Gusl",
    text: "El baño ritual o purificación mayor: cuándo es obligatorio y cómo se realiza.",
  },
];

export default function Home({ latest }) {
  return (
    <>
      <Seo />

      {/* ---------- Portada ---------- */}
      <section className={styles.hero}>
        <div className={`contenedor ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <p className={styles.basmala} lang="ar">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <h1>{SITE_NAME}</h1>
            <p className={styles.heroLead}>{SITE_DESCRIPTION}</p>

            <form action={FATAAWA_PATH} method="get" role="search" className={styles.heroSearch}>
              <Icon name="search" size={22} />
              <label htmlFor="buscar-inicio" className="sr-only">
                Buscar una pregunta
              </label>
              <input id="buscar-inicio" name="q" type="search" placeholder="¿Qué quieres aprender hoy?" />
              <button type="submit" className={`${ui.btn} ${ui.btnGold}`}>
                Buscar
              </button>
            </form>

            <div className={styles.heroTopics}>
              <span>Temas:</span>
              {FATWA_TOPICS.slice(0, 5).map((t) => (
                <Link key={t.slug} href={`${FATAAWA_PATH}?tema=${t.slug}`}>
                  {t.label}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.heroArt} aria-hidden>
            <div className={styles.heroHalo} />
            <Image src="/img/logo.svg" alt="" width={360} height={360} priority />
          </div>
        </div>
      </section>

      {/* ---------- Accesos rápidos ---------- */}
      <div className={`contenedor ${styles.quick}`}>
        {QUICK.map((q) => (
          <Link key={q.title} href={q.href} className={styles.quickCard}>
            <span className={styles.quickIcon}>
              <Icon name={q.icon} size={24} />
            </span>
            <span>
              <strong>{q.title}</strong>
              <span>{q.text}</span>
            </span>
          </Link>
        ))}
      </div>

      {/* ---------- Contenido principal ---------- */}
      <div className={`contenedor ${styles.mainGrid}`}>
        <div className={styles.mainCol}>
          <section>
            <div className={ui.sectionHead}>
              <h2 className={ui.sectionTitle}>Fatāwá recientes</h2>
              <Link href={FATAAWA_PATH} className={ui.sectionLink}>
                Ver todas <Icon name="arrow" size={16} />
              </Link>
            </div>
            {latest.length === 0 ? (
              <EmptyFataawa />
            ) : (
              <div className={fx.list}>
                {latest.map((f) => (
                  <FatwaCard key={f.slug} fatwa={f} />
                ))}
              </div>
            )}
          </section>

          <section id="esencial">
            <div className={ui.sectionHead}>
              <h2 className={ui.sectionTitle}>Lo esencial</h2>
            </div>
            <div className={styles.essentials}>
              {ESSENTIALS.map((e) => {
                const inner = (
                  <>
                    <span className={styles.essArabic} lang="ar">
                      {e.arabic}
                    </span>
                    <h3>{e.title}</h3>
                    <p>{e.text}</p>
                    {e.href ? (
                      <span className={styles.essLink}>
                        Comenzar <Icon name="arrow" size={16} />
                      </span>
                    ) : (
                      <span className={ui.badge}>Próximamente</span>
                    )}
                  </>
                );
                return e.href ? (
                  <Link key={e.title} href={e.href} className={styles.essCard}>
                    {inner}
                  </Link>
                ) : (
                  <div key={e.title} className={`${styles.essCard} ${styles.essSoon}`}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <aside className={styles.side}>
          <section className={`${ui.card} ${ui.cardPad} ${styles.dateCard}`}>
            <h2 className={ui.cardTitle}>
              <Icon name="moon" size={18} /> Hoy
            </h2>
            <HijriDate className={styles.dateText} stacked />
          </section>

          <section id="horarios" className={`${ui.card} ${ui.cardPad}`}>
            <h2 className={ui.cardTitle}>
              <Icon name="clock" size={18} /> Horarios de oración
            </h2>
            <PrayerTimes />
          </section>

          <section className={`${ui.card} ${ui.cardPad} ${styles.downloadCard}`}>
            <h2 className={ui.cardTitle}>
              <Icon name="download" size={18} /> Descarga gratuita
            </h2>
            <h3>Taʿlīm al-islām: selección sobre Ramaḍān</h3>
            <p>Una selección para prepararse y vivir el mes del ayuno.</p>
            <Link href="/descargas" className={`${ui.btn} ${ui.btnPrimary}`}>
              Ver descargas
            </Link>
          </section>
        </aside>
      </div>

      {/* ---------- Palabras de sabiduría ---------- */}
      <section className={styles.wisdom}>
        <div className="contenedor">
          <p className={styles.wisdomAr} lang="ar">
            قِيمَةُ كُلِّ امْرِئٍ مَا يُحْسِنُهُ
          </p>
          <p className={styles.wisdomTr}>qīmatu kulli mriʾin mā yuḥsinuhu</p>
          <p className={styles.wisdomEs}>«El valor de cada persona está en lo que sabe hacer bien.»</p>
          <p className={styles.wisdomRef}>ʿAlī ibn Abī Ṭālib (karrama llāhu waŷhahu) · Nahŷ al-balāga</p>
        </div>
      </section>

      {/* ---------- Quiénes somos ---------- */}
      <section className={`contenedor ${styles.about}`}>
        <div>
          <p className={ui.eyebrow} style={{ color: "var(--dorado)" }}>
            Quiénes somos
          </p>
          <h2>Una comunidad que estudia, pregunta y comparte</h2>
        </div>
        <div>
          <p>
            Somos estudiantes de Guanajuato y Aguascalientes reunidos para aprender y difundir el islam de forma
            pacífica, tolerante y académica. Muchos llegamos al islam desde otras tradiciones y sabemos lo que es
            empezar de cero: por eso explicamos cada término en árabe y cada práctica con sus fuentes.
          </p>
          <p>
            Nuestras fatāwá siguen el método ẓāhirī de Ibn Ḥazm de Córdoba: volver al texto del Corán y de la Sunna
            auténtica, con respeto a todas las escuelas y a la unidad de los musulmanes.
          </p>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const latest = sortedFataawa()
    .slice(0, 5)
    .map(({ slug, number, title, topic, date, summary }) => ({
      slug,
      number,
      title,
      topic,
      date: date || null,
      summary: summary || null,
    }));
  return { props: { latest } };
}
