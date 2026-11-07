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

const VINO_NEGRA = "#5c1a22";
const ORO_NEGRA = "#d9b04c";

const bezier = ([a, b, c, d], t) => {
  const u = 1 - t;
  return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
};

const rombo = (x, y, r) => `${x},${y - r} ${x + r},${y} ${x},${y + r} ${x - r},${y}`;

// Banda de arco superior: va del costado al medallón central
const ARCO_X = [20, 52, 104, 150];
const ARCO_Y = [84, 30, 22, 62];
const ROMBOS_ARCO = Array.from({ length: 13 }, (_, i) => {
  const t = 0.06 + i * 0.075;
  return { x: +bezier(ARCO_X, t).toFixed(1), y: +(bezier(ARCO_Y, t) + 7).toFixed(1), rojo: i % 2 === 1 };
});

// Borde exterior de la franja vino en su mitad inferior: de ahí sale la celosía lateral
const BORDE_X = [45, 57, 42, 31];
const BORDE_Y = [190, 235, 300, 374];
const CELOSIA = Array.from({ length: 21 }, (_, fila) => 192 + fila * 9).flatMap((y, fila) => {
  let t = 0;
  while (t < 1 && bezier(BORDE_Y, t) < y) t += 0.02;
  const limite = bezier(BORDE_X, t) - 5;
  const celdas = [];
  for (let x = 25 + (fila % 2) * 4.5; x <= limite; x += 9) celdas.push({ x, y, rojo: (fila + Math.round(x)) % 3 === 0 });
  return celdas;
});

const MitadNegra = () => (
  <>
    <path
      d="M42 80C32 116 32 152 45 190C57 235 42 300 31 374H47C58 300 73 235 59 190C47 152 47 116 62 62Z"
      fill={VINO_NEGRA}
      stroke={ORO_NEGRA}
      strokeWidth="1.2"
    />
    <path d="M20 84C52 30 104 22 150 62" fill="none" stroke={ORO_NEGRA} strokeWidth="1.3" />
    <path d="M20 98C52 44 104 36 150 76" fill="none" stroke={ORO_NEGRA} strokeWidth="1.3" />
    {ROMBOS_ARCO.map(({ x, y, rojo }) => (
      <polygon key={x} points={rombo(x, y, 4.4)} fill={rojo ? "#7e2a2e" : ORO_NEGRA} stroke={ORO_NEGRA} strokeWidth="0.6" />
    ))}
    {CELOSIA.map(({ x, y, rojo }) => (
      <polygon key={`${x}-${y}`} points={rombo(x, y, 3.4)} fill={rojo ? "#7e2a2e" : "none"} stroke={ORO_NEGRA} strokeWidth="0.8" />
    ))}
  </>
);

const TapaNegra = () => (
  <>
    <g fill="none" stroke={ORO_NEGRA}>
      <rect x="9" y="9" width="282" height="382" rx="2" strokeWidth="2.6" />
      <rect x="14" y="14" width="272" height="372" strokeWidth="0.9" />
      <rect x="19" y="19" width="262" height="362" strokeWidth="1.4" />
    </g>
    <MitadNegra />
    <g transform="matrix(-1 0 0 1 300 0)">
      <MitadNegra />
    </g>
    <path d="M150 34C155 42 162 45 162 52C162 56 156 58 150 58C144 58 138 56 138 52C138 45 145 42 150 34Z" fill={ORO_NEGRA} fillOpacity="0.2" stroke={ORO_NEGRA} strokeWidth="1" />
    <g transform="translate(150 68)" fill="none" stroke={ORO_NEGRA} strokeWidth="1">
      <polygon points={estrella(0, 0, 15, 9.5, 8)} fill="#0d0d0e" />
      <circle r="5" />
      <circle r="1.8" fill={ORO_NEGRA} />
    </g>
    <path d="M84 338L100 320H200L216 338L200 356H100Z" fill={VINO_NEGRA} stroke={ORO_NEGRA} strokeWidth="1.6" />
    <path d="M92 338L103 325H197L208 338L197 351H103Z" fill="none" stroke={ORO_NEGRA} strokeWidth="0.8" />
    <text x="150" y="345" textAnchor="middle" fontFamily="'Aref Ruqaa', serif" fontWeight="700" fontSize="21" fill="#efd487">
      أبو حيان
    </text>
  </>
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
        {variante === "negro" ? (
          <TapaNegra />
        ) : (
          <>
            <Marco filete={FILETES[variante]} />
            <Esquinas />
            {FONDOS[variante]}
          </>
        )}
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
