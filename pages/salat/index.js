import Link from "next/link";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import StepCard from "@/components/salat/StepCard";
import { steps } from "@/data/steps";
import styles from "@/styles/site/Salat.module.css";
import ui from "@/styles/site/ui.module.css";

export default function SalatPage() {
  return (
    <>
      <Seo
        title="Cómo rezar en el islam: el ṣalāt (salat) paso a paso"
        description="Guía paso a paso para rezar el ṣalāt según el Corán y la Sunna: posiciones, recitaciones en árabe, transliteración y traducción al español."
      />

      <PageHero title="Aprende a rezar el ṣalāt" arabic="الصلاة" crumbs={[{ label: "Aprende a rezar" }]}>
        <p>
          La oración es el pilar del islam y el primer acto por el que seremos preguntados. Aquí la aprendes paso a
          paso, tal como la rezaba el Profeta ﷺ, con cada recitación en árabe, su transliteración y su significado.
        </p>
      </PageHero>

      <div className={`contenedor ${styles.layout}`}>
        <div>
          {/* ---------- Condición previa: la pureza ritual ---------- */}
          <section id="pureza" className={styles.pureza}>
            <p className={styles.stepKicker}>Antes de comenzar</p>
            <h2>La pureza ritual (ṭahāra)</h2>
            <p className={styles.instruction}>
              No se puede rezar sin estar en estado de pureza. Antes de cada oración debes tener el wuḍūʾ (la ablución
              menor); y si estás en estado de impureza mayor (ŷanāba), el gusl (el baño ritual) completo. Sin ello, la
              oración no es válida.
            </p>

            <div className={styles.recitation}>
              <p className={styles.recLabel}>Corán 5:6</p>
              <p className={`arabe ${styles.recArabic}`} lang="ar">
                يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى
                الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ
              </p>
              <p className={styles.recTranslit}>
                yā ayyuhā llaḏīna āmanū iḏā qumtum ilà l-ṣalāti fa-gsilū wuŷūhakum wa-aydiyakum ilà l-marāfiqi
                wa-msaḥū bi-ruʾūsikum wa-arŷulakum ilà l-kaʿbayni
              </p>
              <p className={styles.recSpanish}>
                «¡Oh, creyentes! Cuando se dispongan a hacer la oración, lávense el rostro y los brazos hasta los codos,
                pasen las manos por la cabeza y lávense los pies hasta los tobillos.»
              </p>
            </div>

            <div className={styles.purezaLinks}>
              <Link href="/wudu" className={styles.purezaCard}>
                <span className="arabe" lang="ar">
                  الوضوء
                </span>
                <strong>Wuḍūʾ</strong>
                <span>La ablución menor, paso a paso.</span>
                <span className={styles.purezaMas}>
                  Aprender <Icon name="arrow" size={16} />
                </span>
              </Link>
              <Link href="/gusl" className={styles.purezaCard}>
                <span className="arabe" lang="ar">
                  الغسل
                </span>
                <strong>Gusl</strong>
                <span>El baño ritual: cuándo es obligatorio y cómo se hace.</span>
                <span className={styles.purezaMas}>
                  Aprender <Icon name="arrow" size={16} />
                </span>
              </Link>
            </div>
          </section>

          <ol className={styles.steps}>
            {steps.map((step, i) => (
              <StepCard key={step.name} step={step} number={i + 1} />
            ))}
          </ol>
        </div>

        <aside className={styles.aside}>
          <nav className={`${ui.card} ${ui.cardPad}`} aria-label="Pasos del ṣalāt">
            <h2 className={ui.cardTitle}>
              <Icon name="mihrab" size={18} /> Los pasos
            </h2>
            <ol className={styles.index}>
              {steps.map((step, i) => (
                <li key={step.name}>
                  <a href={`#paso-${i + 1}`}>
                    <span>{i + 1}</span>
                    {step.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className={`${ui.card} ${ui.cardPad} ${styles.tip}`}>
            <h2 className={ui.cardTitle}>
              <Icon name="water" size={18} /> Antes de rezar
            </h2>
            <p>
              Asegúrate de estar en estado de pureza (wuḍūʾ), con el cuerpo, la ropa y el lugar limpios, orientado
              hacia la qibla y con la intención (niyya) en el corazón.
            </p>
            <Link href="#pureza" className={ui.sectionLink}>
              La pureza ritual <Icon name="arrow" size={16} />
            </Link>
            <Link href="/#horarios" className={ui.sectionLink}>
              Horarios de hoy <Icon name="arrow" size={16} />
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
