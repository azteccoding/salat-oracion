import { FATAAWA_PATH, topicOfCode } from "@/constants/fataawa";

/**
 * Fatāwá de fiqh ẓāhirī
 * ---------------------
 * Cada objeto de este arreglo se publica automáticamente en
 *   /fataawa-zahiri-fiqh/<slug>-<codigo>      p. ej. /fataawa-zahiri-fiqh/lo-que-anula-el-wudu-3500
 * y aparece en el índice de la sección y en la página de inicio.
 *
 * Campos:
 *   codigo   (texto)    Código de la fatwa. DECIDE SU TEMA (ver constants/fataawa.js):
 *                         1000 ʿaqīda · 2000 uṣūl · 3000 ṭahāra (3300 gusl, 3500 wuḍūʾ) · 4000 ṣalāt
 *                         5000 zakāt · 6000 ayuno · 7000 peregrinación · 8000 matrimonio y divorcio
 *                         9000 sufismo · ac00 asuntos cotidianos · an00 asuntos novedosos
 *                       Se muestra como "Fatwa n.º 3500". Escríbelo entre comillas: "3500", "ac01".
 *   slug     (texto)    Título corto para la URL, SIN el código (se agrega solo al final).
 *                       Solo minúsculas, números y guiones: "agua-usada-en-el-wudu".
 *   title    (texto)    Título de la pregunta.
 *   date     (texto)    Fecha de publicación "AAAA-MM-DD". Las más recientes salen primero.
 *   summary  (texto)    Resumen de una o dos líneas para el índice y las vistas previas.
 *   question (texto)    La pregunta tal como se recibió. Separa párrafos con una línea en blanco.
 *   answer   (arreglo)  Bloques de la respuesta, en orden. Tipos disponibles:
 *     { type: "p", text: "Párrafo." }
 *     { type: "h", text: "Subtítulo" }
 *     { type: "list", items: ["Punto uno", "Punto dos"] }
 *     { type: "quote", text: "Cita en español", source: "Ibn Ḥazm, Al-Muḥallá, masʾala 150" }
 *     { type: "arabic", text: "نص عربي", translit: "Transliteración", translation: "Traducción", source: "Corán 2:222" }
 *     { type: "link", codigo: "3301", text: "Texto del enlace" }   ← enlace a otra fatwa por su código
 *     { type: "nota", title: "Título opcional", text: "Recuadro destacado." }
 *   sources  (arreglo)  Opcional. Referencias bibliográficas (texto).
 *   related  (arreglo)  Opcional. CÓDIGOS de otras fatāwá relacionadas: ["3300", "3301"].
 *   opening  (booleano) Opcional. Pon `false` para no mostrar "Al-ḥamdu li-llāhi" al inicio de la respuesta.
 *   closing  (booleano) Opcional. Pon `false` para no mostrar "Wa-llāhu aʿlamu" al final.
 *   borrador (booleano) Opcional. Con `true`: en tu computadora (npm run dev) SÍ se ve, con la etiqueta
 *                       «Borrador»; en el sitio publicado NO aparece en el índice ni en el Home.
 *                       Quítalo al publicar.
 *
 * Todo lo marcado con ✍️ es texto por llenar.
 */
const fatawaEscritas = [
  // ===================================================================
  //  FATWA 3500 — Lo que anula el wuḍūʾ   (enlazada desde /wudu)
  // ===================================================================
  {
    codigo: "3500",
    slug: "lo-que-anula-el-wudu",
    title: "¿Qué anula el wuḍūʾ?",
    date: "2026-09-30",
    borrador: true,
    summary: "✍️ Resumen de una o dos líneas…",
    question: "✍️ La pregunta tal como se recibió…",
    answer: [
      { type: "p", text: "✍️ Introducción…" },

      { type: "h", text: "Lo que anula el wuḍūʾ" },
      { type: "list", items: ["✍️ Primera causa…", "✍️ Segunda causa…"] },

      { type: "h", text: "Nada más lo anula" },
      {
        type: "p",
        text: "Ninguna otra cosa, excepto las mencionadas, anula el wuḍūʾ. Por ejemplo, no lo anula el vómito ni echarse un sapo.",
      },
      { type: "list", items: ["✍️ Otro ejemplo de lo que no lo anula…"] },
    ],
    sources: ["✍️ Ibn Ḥazm, al-Muḥallā, masʾala …"],
    related: ["3300"],
  },

  // ===================================================================
  //  FATWA 3300 — Lo que hace obligatorio el gusl   (enlazada desde /gusl)
  // ===================================================================
  {
    codigo: "3300",
    slug: "lo-que-hace-obligatorio-el-gusl",
    title: "¿Qué hace obligatorio el gusl?",
    date: "2026-09-30",
    borrador: true,
    summary: "✍️ Resumen de una o dos líneas…",
    question: "✍️ La pregunta tal como se recibió…",
    answer: [
      { type: "p", text: "✍️ Introducción…" },

      { type: "h", text: "Lo que hace obligatorio el gusl" },
      { type: "list", items: ["✍️ Primera causa…", "✍️ Segunda causa…"] },

      {
        type: "nota",
        title: "El gusl del viernes no sirve para rezar",
        text: "El gusl del viernes es por el día, no por la oración. Por eso no es válido ni suficiente para rezar: la oración necesita un wuḍūʾ y gusl propios.",
      },
      {
        type: "link",
        codigo: "3301",
        text: "Lee la fatwa n.º 3301: el gusl del viernes",
      },
    ],
    sources: ["✍️ Ibn Ḥazm, al-Muḥallā, masʾala …"],
    related: ["3301", "3500"],
  },

  // ===================================================================
  //  FATWA 3301 — El gusl del viernes   (enlazada desde la fatwa 3300 y /gusl)
  // ===================================================================
  {
    codigo: "3301",
    slug: "el-gusl-del-viernes",
    title: "El gusl del viernes: ¿sirve para rezar?",
    date: "2026-09-30",
    borrador: true,
    summary: "✍️ Resumen de una o dos líneas…",
    question: "✍️ La pregunta tal como se recibió…",
    answer: [
      { type: "p", text: "✍️ Respuesta…" },
      { type: "h", text: "✍️ Subtítulo" },
      { type: "p", text: "✍️ Párrafo…" },
    ],
    sources: ["✍️ Ibn Ḥazm, al-Muḥallā, masʾala …"],
    related: ["3300"],
  },
];

// Solo las publicadas (sin borrador), para el índice y la página de inicio.
// =====================================================================
//  A partir de aquí no hace falta editar.
// =====================================================================

// En tu computadora (npm run dev) se ven también los borradores.
const VER_BORRADORES = process.env.NODE_ENV === "development";

// Completa cada fatwa con su tema, su número visible y su URL final.
export const fataawa = fatawaEscritas.map((f) => {
  const { topic, sub } = topicOfCode(f.codigo);
  return {
    ...f,
    codigo: String(f.codigo),
    number: String(f.codigo),
    slug: `${f.slug}-${f.codigo}`,
    topic: topic?.slug || null,
    subtopic: sub?.slug || null,
    related: (f.related || []).map(String),
    borrador: Boolean(f.borrador),
  };
});

export const fatwaUrl = (f) => `${FATAAWA_PATH}/${f.slug}`;

export const getFatwa = (slug) => fataawa.find((f) => f.slug === slug);
export const getFatwaByCode = (codigo) => fataawa.find((f) => f.codigo === String(codigo));

// Las que se muestran en listas: más reciente primero; a igual fecha, código mayor primero.
export const sortedFataawa = () =>
  fataawa
    .filter((f) => VER_BORRADORES || !f.borrador)
    .sort((a, b) => (b.date || "").localeCompare(a.date || "") || b.codigo.localeCompare(a.codigo));

// Las últimas n fatāwá (para el Home)
export const latestFataawa = (n = 3) => sortedFataawa().slice(0, n);
