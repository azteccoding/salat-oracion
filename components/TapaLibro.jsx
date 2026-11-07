import styles from "@/styles/site/Descargas.module.css";

const ORO = "#d8b35a";

const VARIANTE_POR_CATEGORIA = {
  "Corán y tafsīr": "azul",
  Oración: "verde",
  Fiqh: "vino",
};

const estrella = (cx, cy, r1, r2, puntas) =>
  Array.from({ length: puntas * 2 }, (_, i) => {
    const r = i % 2 ? r2 : r1;
    const a = (Math.PI * i) / puntas - Math.PI / 2;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

const Roseta = ({ x, y, r = 12 }) => (
  <g transform={`translate(${x} ${y})`} fill="none" stroke={ORO} strokeWidth="1">
    <polygon points={estrella(0, 0, r, r * 0.62, 8)} fill={ORO} fillOpacity="0.16" />
    <circle r={r * 0.34} />
    <circle r={r * 0.12} fill={ORO} />
  </g>
);

const ESPEJOS = [
  "",
  "matrix(-1 0 0 1 300 0)",
  "matrix(1 0 0 -1 0 400)",
  "matrix(-1 0 0 -1 300 400)",
];

const Esquinas = () =>
  ESPEJOS.map((t) => (
    <g key={t} transform={t} stroke={ORO} fill="none">
      <path
        d="M40 40H112C86 46 50 82 40 124Z"
        fill={ORO}
        fillOpacity="0.14"
        strokeWidth="1.3"
      />
      <path d="M48 104C54 80 80 54 98 48" strokeWidth="0.9" />
      <circle cx="60" cy="60" r="6" strokeWidth="1" />
      <circle cx="60" cy="60" r="1.8" fill={ORO} />
    </g>
  ));

const Marco = ({ filete }) => (
  <g fill="none" stroke={ORO}>
    <rect x="10" y="10" width="280" height="380" rx="3" strokeWidth="2.6" />
    <rect x="15" y="15" width="270" height="370" strokeWidth="0.9" />
    <rect x="21" y="21" width="258" height="358" strokeWidth="3.4" strokeDasharray="0.1 7.4" strokeLinecap="round" />
    <rect x="27" y="27" width="246" height="346" strokeWidth="0.9" />
    <rect x="31" y="31" width="238" height="338" strokeWidth="1.6" stroke={filete} />
    <rect x="35" y="35" width="230" height="330" strokeWidth="1.1" />
  </g>
);

const FONDOS = {
  azul: (
    <>
      <polygon points={estrella(150, 165, 112, 92, 12)} fill="#0a1a2e" fillOpacity="0.55" stroke={ORO} strokeWidth="1.4" />
      <circle cx="150" cy="165" r="84" fill="none" stroke={ORO} strokeWidth="1" />
      <circle cx="150" cy="165" r="79" fill="none" stroke="#b5392f" strokeWidth="1.2" />
    </>
  ),
  verde: (
    <>
      <path
        d="M66 318V128C66 96 112 92 150 58C188 92 234 96 234 128V318Z"
        fill="#08231d"
        fillOpacity="0.28"
        stroke={ORO}
        strokeWidth="1.3"
      />
      <path
        d="M72 312V130C72 102 116 98 150 67C184 98 228 102 228 130V312Z"
        fill="none"
        stroke="#a8392e"
        strokeWidth="1"
      />
      <Roseta x={150} y={338} r={11} />
    </>
  ),
  vino: (
    <>
      <Roseta x={150} y={88} r={15} />
      <rect x="50" y="118" width="200" height="92" rx="10" fill="#120c0c" stroke={ORO} strokeWidth="1.6" />
      <rect x="55" y="123" width="190" height="82" rx="7" fill="none" stroke={ORO} strokeWidth="0.8" />
      <Roseta x={150} y={332} r={13} />
    </>
  ),
};

const FILETES = { azul: "#b5392f", verde: "#a8392e", vino: "#120c0c" };

export const varianteTapa = (item) => item.tono || VARIANTE_POR_CATEGORIA[item.categoria] || "azul";

const TapaLibro = ({ item }) => {
  const variante = varianteTapa(item);
  return (
    <div className={`${styles.tapa} ${styles.tapaTexto}`}>
      <svg className={styles.ornamento} viewBox="0 0 300 400" preserveAspectRatio="none" aria-hidden>
        <Marco filete={FILETES[variante]} />
        <Esquinas />
        {FONDOS[variante]}
      </svg>
      <span className={`arabe ${styles.tituloArabe}`}>{item.arabe}</span>
      <div className={styles.bloqueEspanol}>
        <span className={styles.tituloEspanol}>{item.tituloCorto}</span>
        {item.subtitulo && <span className={styles.subtituloTapa}>{item.subtitulo}</span>}
      </div>
    </div>
  );
};

export default TapaLibro;
