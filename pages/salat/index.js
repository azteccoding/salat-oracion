import Link from "next/link";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import CompartirNoticia from "@/components/noticias/CompartirNoticia";
import StepCard from "@/components/salat/StepCard";
import { steps } from "@/data/steps";
import { SITE_URL } from "@/constants/site";
import styles from "@/styles/site/Salat.module.css";
import ui from "@/styles/site/ui.module.css";

export default function SalatPage() {
  return (
    <>
      <Seo
        title="Cómo rezar en el islam: el ṣalāt (salat) paso a paso"
        description="Guía paso a paso para rezar el ṣalāt según el Muḥallā del Imam Ibn Ḥazm: lo obligatorio y lo recomendado, las recitaciones en árabe, su transliteración y su traducción al español."
      />

      <PageHero title="Aprende a rezar el ṣalāt" arabic="الصلاة" crumbs={[{ label: "Aprende a rezar" }]}>
        <p>
          La oración es el pilar del islam y el primer acto por el que seremos preguntados. Aquí la aprendes paso a
          paso, tal como la describe el Imam Ibn Ḥazm de Córdoba en el Muḥallā, distinguiendo lo obligatorio de lo
          recomendado, con cada recitación en árabe, su transliteración y su significado.
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

          {/* ---------- Notas ---------- */}
          <section className={styles.nota}>
            <h2>¿En voz alta o en voz baja?</h2>
            <ul>
              <li>En voz alta: las dos rakʿas del ṣubḥ, las dos primeras del maġrib y del ʿišāʾ, y las del ŷumuʿa.</li>
              <li>En voz baja: todo el ẓuhr, todo el ʿaṣr, la tercera del maġrib y las dos últimas del ʿišāʾ.</li>
              <li>
                Esto es lo recomendado para el imam y para quien reza solo: si lo hace al revés, es reprobable pero su
                oración vale.
              </li>
              <li>
                Quien reza detrás del imam lee su Fātiḥa siempre en voz baja; si la lee en voz alta, su oración no es
                válida.
              </li>
            </ul>
          </section>

          <section className={styles.nota}>
            <h2>La oración de la mujer</h2>
            <p>
              La mujer reza igual que el hombre: la misma recitación, las mismas posturas en la inclinación y en la
              postración, y el mismo salām. Las diferencias son estas:
            </p>
            <ul>
              <li>Cubre todo su cuerpo salvo el rostro y las manos.</li>
              <li>Si necesita advertir al imam de algo, aplaude con las manos (si dice «subḥāna llāhi», también está bien).</li>
              <li>La oración en congregación no le es obligatoria; si va a la mezquita, nadie puede impedírselo.</li>
              <li>No debe ir perfumada a la mezquita: si lo hace, su oración no es válida.</li>
              <li>Reza detrás de los hombres. Puede dirigir la oración de otras mujeres, pero no la de los hombres.</li>
            </ul>
          </section>

          <CompartirNoticia
            url={`${SITE_URL}/salat`}
            titulo="Aprende a rezar el ṣalāt paso a paso"
            que="esta guía"
            imagen="/og-image.png"
          />
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
