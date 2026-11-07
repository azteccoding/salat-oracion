import { useEffect, useState, useSyncExternalStore } from "react";
import { calcularHorarios } from "@/lib/horarios-rezo";
import { CLAVE_LUGAR, aplicarTema } from "@/lib/tema-rezo";
import styles from "@/styles/site/Home.module.css";

// Recuadro con los horarios del día para la ciudad del visitante. Si no comparte
// su ubicación o no se puede consultar, muestra los del centro de la CDMX.
const TIEMPOS = [
  ["fajr", "Faŷr"],
  ["amanecer", "Salida del sol"],
  ["dhuhr", "Ẓuhr"],
  ["asr", "ʿAṣr"],
  ["maghrib", "Magrib"],
  ["isha", "ʿIšāʾ"],
];

const CDMX = { ciudad: "Ciudad de México", lat: 19.4326, lng: -99.1332, zona: "America/Mexico_City" };

const aHora = (fecha, zona) => {
  if (!fecha) return "—";
  const p = {};
  new Intl.DateTimeFormat("en-US", { timeZone: zona, hour: "numeric", minute: "2-digit", hourCycle: "h23" })
    .formatToParts(fecha)
    .forEach(({ type, value }) => (p[type] = value));
  const h = +p.hour;
  return `${h % 12 || 12}:${p.minute} ${h < 12 ? "a. m." : "p. m."}`;
};

const fechaHijri = (zona) => {
  try {
    return new Intl.DateTimeFormat("es-MX-u-ca-islamic-umalqura", {
      timeZone: zona,
      day: "numeric",
      month: "long",
      year: "numeric",
    })
      .format(new Date())
      .replace(/\s*AH$/, " H");
  } catch {
    return "";
  }
};

// Nombre de la ciudad. Solo se envían las coordenadas redondeadas a unos 1 km.
const buscarCiudad = async (lat, lng, signal) => {
  const r = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat.toFixed(2)}&longitude=${lng.toFixed(2)}&localityLanguage=es`,
    { signal },
  );
  if (!r.ok) throw new Error("Sin ciudad");
  const { city, locality } = await r.json();
  return city || locality || null;
};

const sinCambios = () => () => {};

const PrayerTimes = () => {
  const [lugar, setLugar] = useState(CDMX);
  // Las horas dependen del día del visitante: se pintan ya en el navegador.
  const listo = useSyncExternalStore(sinCambios, () => true, () => false);

  useEffect(() => {
    if (!navigator.geolocation) return undefined;

    const control = new AbortController();
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude: lat, longitude: lng } }) => {
        const zona = Intl.DateTimeFormat().resolvedOptions().timeZone;
        // El tema claro/oscuro usa el mismo lugar, redondeado a unos 1 km.
        try {
          const redondo = (x) => Math.round(x * 100) / 100;
          localStorage.setItem(CLAVE_LUGAR, JSON.stringify({ lat: redondo(lat), lng: redondo(lng), zona }));
          aplicarTema();
        } catch {}
        const ciudad = await buscarCiudad(lat, lng, control.signal).catch(() => null);
        if (!control.signal.aborted) setLugar({ ciudad: ciudad || "Tu ubicación", lat, lng, zona });
      },
      () => {},
      { timeout: 8000, maximumAge: 60 * 60 * 1000 },
    );
    return () => control.abort();
  }, []);

  const tiempos = listo ? calcularHorarios(lugar) : null;

  return (
    <div className={styles.horarios}>
      <div className={`${styles.horariosCuadro} ${styles.horariosLugar}`}>
        <p className={styles.horariosCiudad}>{lugar.ciudad}</p>
        <p className={styles.horariosFecha}>{listo ? fechaHijri(lugar.zona) : " "}</p>
      </div>
      <dl className={styles.horariosCuadro}>
        {TIEMPOS.map(([clave, nombre]) => (
          <div key={clave} className={styles.horario}>
            <dt>{nombre}</dt>
            <dd>{tiempos ? aHora(tiempos[clave], lugar.zona) : "—"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default PrayerTimes;
