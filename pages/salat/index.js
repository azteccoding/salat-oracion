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
        title="Aprende a rezar el ṣalāt"
        description="Guía paso a paso para rezar el ṣalāt según el Corán y la Sunna: posiciones, recitaciones en árabe, transliteración y traducción al español."
      />

      <PageHero title="Aprende a rezar el ṣalāt" arabic="الصلاة" crumbs={[{ label: "Aprende a rezar" }]}>
        <p>
          La oración es el pilar del islam y el primer acto por el que seremos preguntados. Aquí la aprendes paso a
          paso, tal como la rezaba el Profeta ﷺ, con cada recitación en árabe, su transliteración y su significado.
        </p>
      </PageHero>

      <div className={`contenedor ${styles.layout}`}>
        <ol className={styles.steps}>
          {steps.map((step, i) => (
            <StepCard key={step.name} step={step} number={i + 1} />
          ))}
        </ol>

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
            <Link href="/#horarios" className={ui.sectionLink}>
              Horarios de hoy <Icon name="arrow" size={16} />
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
