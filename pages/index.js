import Image from "next/image";
import Link from "next/link";
import HijriDate from "@/components/HijriDate";
import Icon from "@/components/Icon";
import PrayerTimes from "@/components/PrayerTimes";
import Seo from "@/components/Seo";
import EmptyFataawa from "@/components/fataawa/EmptyFataawa";
import FatwaCard from "@/components/fataawa/FatwaCard";
import { FATAAWA_PATH, INDEXED_TOPICS } from "@/constants/fataawa";
import { NUESTRO_SHEIJ } from "@/constants/content";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/constants/site";
import { conContexto, organizacion } from "@/lib/seo";
import { corridos } from "@/data/corridos";
import { descargas } from "@/data/descargas";
import { latestFataawa } from "@/data/fataawa";
import NoticiaPreview from "@/components/noticias/NoticiaPreview";
import { NOTICIAS_PATH } from "@/constants/noticias";
import { ultimaNoticia } from "@/data/noticias";
import styles from "@/styles/site/Home.module.css";
import fx from "@/styles/site/Fataawa.module.css";
import ui from "@/styles/site/ui.module.css";

const QUICK = [
  { href: "/salat", icon: "mihrab", title: "Aprende a rezar", text: "El ṣalāt paso a paso, en árabe y en español" },
  { href: FATAAWA_PATH, icon: "scale", title: "Fatāwá", text: "Preguntas de fiqh según el método ẓāhirī" },
  { href: "#horarios", icon: "clock", title: "Horarios", text: "Las cinco oraciones de hoy en León" },
  { href: "/descargas", icon: "download", title: "Descargas", text: "Libros y materiales para estudiar" },
];

// Tarjetas de «Lo esencial».
// Con href: tarjeta activa (enlace + «Comenzar»).
// Sin href: tarjeta «Próximamente», en gris y sin enlace (ver «proximamente card greyed out» más abajo).
const ESSENTIALS = [
  {
    href: "/salat",
    arabic: "الصلاة",
    title: "Ṣalāt",
    text: "Aprende a rezar como el Profeta ﷺ: posiciones, recitaciones y su significado.",
  },
  {
    href: "/wudu",
    arabic: "الوضوء",
    title: "Wuḍūʾ",
    text: "La ablución o purificación menor que precede a la oración.",
  },
  {
    href: "/gusl",
    arabic: "الغسل",
    title: "Gusl",
    text: "El baño ritual o purificación mayor: cuándo es obligatorio y cómo se realiza.",
  },
];

export default function Home({ latest, noticia }) {
  return (
    <>
      <Seo
        description="Aprende el islam en español desde León, Guanajuato: cómo rezar paso a paso, wudu y ghusl, fatwas de fiqh ẓāhirī (Ibn Hazm) con sus pruebas, horarios de oración y libros gratuitos."
        jsonLd={[
          conContexto(organizacion),
          conContexto({
            "@type": "WebSite",
            "@id": `${SITE_URL}/#sitio`,
            name: SITE_NAME,
            alternateName: "Islam Guanajuato",
            url: SITE_URL,
            inLanguage: "es-MX",
            publisher: { "@id": `${SITE_URL}/#organizacion` },
          }),
        ]}
      />

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
              {INDEXED_TOPICS.slice(0, 5).map((t) => (
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
          {/* ---------- Actualidad: solo la vista previa de la noticia más reciente ---------- */}
          {noticia && (
            <section>
              <div className={ui.sectionHead}>
                <h2 className={ui.sectionTitle}>Actualidad</h2>
                <Link href={NOTICIAS_PATH} className={ui.sectionLink}>
                  Todas las noticias <Icon name="arrow" size={16} />
                </Link>
              </div>
              <NoticiaPreview noticia={noticia} />
            </section>
          )}

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
                      /* proximamente card greyed out — etiqueta */
                      <span className={ui.badge}>Próximamente</span>
                    )}
                  </>
                );
                return e.href ? (
                  <Link key={e.title} href={e.href} className={styles.essCard}>
                    {inner}
                  </Link>
                ) : (
                  /* proximamente card greyed out — se usa cuando la tarjeta no tiene href */
                  <div key={e.title} className={`${styles.essCard} ${styles.essSoon}`}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </section>

          <section id="musica" className={styles.musica}>
            <p className={styles.musicaEyebrow}>¿Sabías que…?</p>
            <h2>En el fiqh ẓāhirī se puede escuchar música</h2>
            <p>
              El Imam Ibn Ḥazm revisó uno por uno los ḥadīṯ que se citan para prohibir la música y concluyó que ninguno
              es auténtico. En <em>al-Muḥallā</em> la declara permitida y enseña que su valor depende de la intención:
              «las acciones valen según las intenciones». Quien escucha para descansar el alma y fortalecerse en la
              obediencia a Allah, obra bien. Es una postura minoritaria frente a las demás escuelas, pero firme en sus
              pruebas.
            </p>
            <p>Escucha los corridos tumbados de Banda Jorgilios:</p>
            <div className={styles.videos}>
              {corridos.map((v) => (
                <figure key={v.id} className={styles.video}>
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                    title={v.titulo}
                    loading="lazy"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <figcaption>
                    <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer">
                      {v.titulo} <Icon name="external" size={14} />
                    </a>
                  </figcaption>
                </figure>
              ))}
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

          <section className={`${ui.card} ${ui.cardPad} ${styles.sheijCard}`}>
            <h2 className={ui.cardTitle}>
              <Icon name="book" size={18} /> {NUESTRO_SHEIJ.titulo}
            </h2>
            <p className={styles.sheijArabe} lang="ar">
              {NUESTRO_SHEIJ.nombreArabe}
            </p>
            <h3>{NUESTRO_SHEIJ.nombre}</h3>
            <p>{NUESTRO_SHEIJ.resumen}</p>
            <Link href="/nuestro-sheij" className={`${ui.btn} ${ui.btnPrimary}`}>
              Conocer al Sheij
            </Link>
          </section>

          <section className={`${ui.card} ${ui.cardPad} ${styles.downloadCard}`}>
            <h2 className={ui.cardTitle}>
              <Icon name="download" size={18} /> Descargas gratuitas
            </h2>
            {descargas.map((d) => (
              <div key={d.slug} className={styles.downloadItem}>
                <h3>
                  <Link href={`/descargas/${d.slug}`}>{d.title}</Link>
                </h3>
                <p>{d.teaser}</p>
              </div>
            ))}
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

      {/* ---------- Imam Ibn Hazm (esta página solo se enlaza desde aquí) ---------- */}
      <section className={`contenedor ${styles.ibnHazm}`}>
        <div className={styles.ibnHazmInner}>
          <p className={styles.ibnHazmAr} lang="ar">
            ابن حزم الأندلسي
          </p>
          <p className={ui.eyebrow} style={{ color: "var(--dorado)" }}>
            Nuestro imam en el fiqh
          </p>
          <h2>Imam Ibn Hazm de Córdoba</h2>
          <p>
            Poeta, visir, jurista y teólogo de al-Andalus. Escribió sobre el amor en <em>El Collar de la Paloma</em> y
            sobre la ley en <em>al-Muḥallā</em>, y enseñó a volver siempre al texto revelado. Te invitamos a conocer su
            vida, sus obras y su escuela.
          </p>
          <Link href="/imam-ibn-hazm" className={`${ui.btn} ${ui.btnGold}`}>
            Conocer al Imam <Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}

// Las últimas 3 fatāwá publicadas (cambia el 3 para mostrar más o menos)
export async function getStaticProps() {
  const latest = latestFataawa(3).map(({ slug, number, title, topic, subtopic, date, summary, borrador }) => ({
    slug,
    number,
    title,
    topic,
    subtopic,
    date: date || null,
    summary: summary || null,
    borrador,
  }));
  // La noticia más reciente: solo su ficha (titular, resumen, foto), nunca el texto completo
  return { props: { latest, noticia: ultimaNoticia() } };
}
