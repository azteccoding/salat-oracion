import { useEffect, useState } from "react";
import styles from "@/styles/site/Home.module.css";

// Recuadro propio con los horarios del día (los da /api/tiempos-rezo).
const TIEMPOS = [
  ["fajr", "Faŷr"],
  ["amanecer", "Šurūq"],
  ["dhuhr", "Ẓuhr"],
  ["asr", "ʿAṣr"],
  ["maghrib", "Magrib"],
  ["isha", "ʿIšāʾ"],
];

const aHora = (minutos) => {
  const h = Math.floor(minutos / 60);
  const m = String(minutos % 60).padStart(2, "0");
  return `${h % 12 || 12}:${m} ${h < 12 ? "a. m." : "p. m."}`;
};

const PrayerTimes = () => {
  const [tiempos, setTiempos] = useState(null);
  const [fallo, setFallo] = useState(false);

  useEffect(() => {
    let activo = true;
    fetch("/api/tiempos-rezo")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((t) => activo && setTiempos(t))
      .catch(() => activo && setFallo(true));
    return () => {
      activo = false;
    };
  }, []);

  if (fallo) return <p className={styles.horariosAviso}>Los horarios no están disponibles por ahora.</p>;

  return (
    <dl className={styles.horarios}>
      {TIEMPOS.map(([clave, nombre]) => (
        <div key={clave} className={styles.horario}>
          <dt>{nombre}</dt>
          <dd>{tiempos ? aHora(tiempos[clave]) : "—"}</dd>
        </div>
      ))}
    </dl>
  );
};

export default PrayerTimes;
