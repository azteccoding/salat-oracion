import React from "react";
import styles from "/styles/Home.module.css";

const Step = ({ data }) => {
  const paragraphs = data?.tripleText?.length > 0 && (
    <>
      <p>Repite:</p>
      <div>
        {data.tripleText.map((lang, index) => (
          <p key={"p" + index} className={styles.paragraph}>
            {lang}
          </p>
        ))}
      </div>
    </>
  );

  return (
    <div className={styles.card}>
      <h3>Paso {data?.id}</h3>
      <h2>{data?.title} </h2>
      <p className={styles.instruction}>{data?.instruction}</p>
      <br />
      {paragraphs}
    </div>
  );
};

export default Step;
