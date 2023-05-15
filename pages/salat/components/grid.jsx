import React from "react";
import styles from "/styles/Home.module.css";
import Step from "/pages/salat/components/step";
import { steps } from "/data/steps";

const Grid = () => {
  const getSalatSteps = () => {
    return steps.map((step) => <Step key={step.name} data={step} />);
  };
  const salatSteps = getSalatSteps();

  return <div className={styles.grid}>{salatSteps}</div>;
};

export default Grid;
