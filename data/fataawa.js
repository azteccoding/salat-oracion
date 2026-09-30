import { FATAAWA_PATH, topicOfCode } from "@/constants/fataawa";
import { fatawaEscritas } from "./fataawa-escritas/fataawaEscritasArray";

/**
 * Fatāwá de fiqh ẓāhirī
 * ---------------------
 * Cada fatwa se publica automáticamente en
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
 *
 * MARCAS DENTRO DEL TEXTO (pregunta, párrafos, listas, citas y recuadros):
 *   **negritas**   ==resaltado==   [texto](https://…)   [texto](/pagina-del-sitio)
 *
 * DÓNDE ESTÁN LAS FATĀWÁ: cada una en su archivo, dentro de data/fataawa-escritas/,
 * y la lista que las junta en data/fataawa-escritas/fataawaEscritasArray.js.
 * La forma más fácil de escribir una fatwa nueva es el editor: /editor-fataawa
 *
 * Este archivo ya no se edita: solo explica los campos y prepara las fatāwá para el sitio.
 */
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

// Las que tienen página propia: en el sitio publicado, solo las que no son borrador.
export const fataawaPublicables = () => fataawa.filter((f) => VER_BORRADORES || !f.borrador);

// Las que se muestran en listas: más reciente primero; a igual fecha, código mayor primero.
export const sortedFataawa = () =>
  fataawa
    .filter((f) => VER_BORRADORES || !f.borrador)
    .sort((a, b) => (b.date || "").localeCompare(a.date || "") || b.codigo.localeCompare(a.codigo));

// Las últimas n fatāwá (para el Home)
export const latestFataawa = (n = 3) => sortedFataawa().slice(0, n);
