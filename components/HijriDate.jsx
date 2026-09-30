import { useEffect, useRef, useSyncExternalStore } from "react";
import m from "@/styles/site/HijriDate.module.css";

// Fecha hiŷrī (calendario Umm al-Qurà) y gregoriana, calculadas en el navegador
// para que siempre correspondan al día del visitante.
const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

const readDates = () => {
  const now = new Date();
  let hijri = "";
  try {
    hijri = new Intl.DateTimeFormat("es-MX-u-ca-islamic-umalqura", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
      .format(now)
      .replace(/\s*AH$/, " H");
  } catch {
    hijri = "";
  }
  const gregorian = cap(
    new Intl.DateTimeFormat("es-MX", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(now),
  );
  return `${hijri}|${gregorian}`;
};

const subscribe = () => () => {};

// Velocidad constante del letrero, en píxeles por segundo, en cualquier pantalla
const VELOCIDAD = 45;
// Milisegundos que la fecha se queda quieta al cargar la página
const PAUSA_INICIAL = 1000;

// stacked: fecha hiŷrī arriba y gregoriana abajo (tarjeta "Hoy" de la portada).
// Sin stacked: letrero corrido (barra superior del sitio). La fecha entra por la derecha,
// cruza el carril, se oculta en su orilla izquierda —detrás del saludo— y vuelve a empezar.
const HijriDate = ({ className, showGregorian = true, stacked = false }) => {
  const snapshot = useSyncExternalStore(subscribe, readDates, () => null);
  const [hijri, gregorian] = snapshot ? snapshot.split("|") : [];
  const pistaRef = useRef(null);

  // Ajusta la duración al recorrido real (ancho del carril + ancho de la fecha) y, en la
  // primera carga, coloca la fecha ya visible y quieta unos segundos antes de que empiece a correr.
  useEffect(() => {
    const pista = pistaRef.current;
    if (!pista) return undefined;
    const carril = pista.parentElement;
    const texto = pista.lastElementChild;

    const duracionDe = () => Math.max(8, pista.offsetWidth / VELOCIDAD);

    // Punto de partida: si la fecha cabe, alineada a la derecha; si no, su inicio en la orilla izquierda
    const dur = duracionDe();
    const anchoCarril = carril.clientWidth;
    const anchoTexto = texto.offsetWidth;
    const recorrido = anchoCarril + anchoTexto;
    const avance = anchoTexto <= anchoCarril ? anchoTexto : anchoCarril;
    pista.style.setProperty("--duracion", `${dur.toFixed(2)}s`);
    pista.style.setProperty(
      "--retraso",
      `${(-(avance / recorrido) * dur).toFixed(2)}s`,
    );

    const arranque = window.setTimeout(
      () => pista.classList.remove(m.quieta),
      PAUSA_INICIAL,
    );

    const ro = new ResizeObserver(() =>
      pista.style.setProperty("--duracion", `${duracionDe().toFixed(2)}s`),
    );
    ro.observe(carril);
    return () => {
      window.clearTimeout(arranque);
      ro.disconnect();
    };
  }, [snapshot, stacked]);

  if (!snapshot) return <span className={className}>{" "}</span>;

  if (stacked) {
    return (
      <span className={className}>
        <span data-hijri>{hijri}</span>
        {showGregorian && <span data-gregorian>{gregorian}</span>}
      </span>
    );
  }

  const texto = [hijri, showGregorian && gregorian].filter(Boolean).join(" · ");
  return (
    <span className={`${className || ""} ${m.carril}`} title={texto}>
      <span className="sr-only">{texto}</span>
      <span ref={pistaRef} className={`${m.pista} ${m.quieta}`} aria-hidden>
        <span>{texto}</span>
      </span>
    </span>
  );
};

export default HijriDate;
