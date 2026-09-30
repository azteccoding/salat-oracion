import styles from "@/styles/site/Salat.module.css";

const StepCard = ({ step, number }) => {
  const [arabic, translit, spanish] = step.tripleText || [];
  return (
    <li className={styles.step} id={`paso-${number}`}>
      <div className={styles.stepNum} aria-hidden>
        {number}
      </div>
      <article className={styles.stepCard}>
        <p className={styles.stepKicker}>
          Paso {number} · {step.description}
        </p>
        <h2>{step.title}</h2>
        <p className={styles.instruction}>{step.instruction}</p>

        {arabic && (
          <div className={styles.recitation}>
            <p className={styles.recLabel}>Recita</p>
            <p className={`arabe ${styles.recArabic}`} lang="ar">
              {arabic}
            </p>
            {translit && <p className={styles.recTranslit}>{translit}</p>}
            {spanish && <p className={styles.recSpanish}>{spanish}</p>}
          </div>
        )}
      </article>
    </li>
  );
};

export default StepCard;
