import React from "react";
import styles from "/styles/Home.module.css";
import Step from "./step";
import data from "../data/steps.json";

const Grid = () => {
  const getSalatSteps = () => {
    const { steps } = data;
    return steps.map((step) => <Step key={step.name} data={step} />);
  };
  const salatSteps = getSalatSteps();

  return <div className={styles.grid}>{salatSteps}</div>;
};

export default Grid;
