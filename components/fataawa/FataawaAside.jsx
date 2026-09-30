import Link from "next/link";
import { FATAAWA_PATH, FATWA_TOPICS } from "@/constants/fataawa";
import Icon from "../Icon";
import styles from "@/styles/site/Fataawa.module.css";
import ui from "@/styles/site/ui.module.css";

const FataawaAside = ({ showMethod = true }) => (
  <aside className={styles.aside}>
    <section className={`${ui.card} ${ui.cardPad}`}>
      <h2 className={ui.cardTitle}>
        <Icon name="book" size={18} /> Temas
      </h2>
      <ul className={styles.topicList}>
        {FATWA_TOPICS.map((t) => (
          <li key={t.slug}>
            <Link href={`${FATAAWA_PATH}?tema=${t.slug}`}>
              <span>{t.label}</span>
              <span className={styles.topicAr} lang="ar">
                {t.arabic}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>

    {showMethod && (
      <section className={`${ui.card} ${ui.cardPad} ${styles.method}`}>
        <h2 className={ui.cardTitle}>
          <Icon name="scale" size={18} /> El método ẓāhirī
        </h2>
        <p>
          La escuela ẓāhirī, fundada por Dāwūd ibn ʿAlī al-Iṣfahānī y sistematizada en al-Ándalus por Ibn Ḥazm de
          Córdoba, se atiene al sentido manifiesto (ẓāhir) del Corán y de la Sunna auténtica.
        </p>
        <p>
          Acepta el consenso (iŷmāʿ) cierto y rechaza la analogía (qiyās), el istiḥsān y la imitación ciega
          (taqlīd): toda norma debe apoyarse en una prueba textual.
        </p>
      </section>
    )}

    <section className={`${ui.card} ${ui.cardPad}`}>
      <h2 className={ui.cardTitle}>
        <Icon name="star" size={18} /> Obras de referencia
      </h2>
      <ul className={styles.sourcesMini}>
        <li>
          <em>Al-Muḥallá bi-l-āṯār</em>
          <span>Ibn Ḥazm · fiqh con sus pruebas</span>
        </li>
        <li>
          <em>Al-Iḥkām fī uṣūl al-aḥkām</em>
          <span>Ibn Ḥazm · uṣūl al-fiqh</span>
        </li>
        <li>
          <em>Marātib al-iŷmāʿ</em>
          <span>Ibn Ḥazm · cuestiones de consenso</span>
        </li>
      </ul>
    </section>
  </aside>
);

export default FataawaAside;
