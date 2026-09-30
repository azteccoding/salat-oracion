/**
 * Fatāwá de fiqh ẓāhirī
 * ---------------------
 * Cada objeto de este arreglo se publica automáticamente en
 *   /fataawa-zahiri-fiqh/<slug>
 * y aparece en el índice de la sección y en la página de inicio.
 *
 * Campos:
 *   number   (número)   Número de la fatwa. Se muestra como "Fatwa n.º 12".
 *   slug     (texto)    Parte final de la URL. Solo minúsculas, números y guiones.
 *                       Recomendado: "<número>-<titulo-corto>", p. ej. "12-agua-usada-en-el-wudu".
 *   title    (texto)    Título de la pregunta.
 *   topic    (texto)    Slug de un tema de constants/fataawa.js (p. ej. "tahara").
 *   date     (texto)    Fecha de publicación "AAAA-MM-DD".
 *   summary  (texto)    Resumen de una o dos líneas para el índice y las vistas previas.
 *   question (texto)    La pregunta tal como se recibió. Separa párrafos con una línea en blanco.
 *   answer   (arreglo)  Bloques de la respuesta, en orden. Tipos disponibles:
 *     { type: "p", text: "Párrafo." }
 *     { type: "h", text: "Subtítulo" }
 *     { type: "list", items: ["Punto uno", "Punto dos"] }
 *     { type: "quote", text: "Cita en español", source: "Ibn Ḥazm, Al-Muḥallá, masʾala 150" }
 *     { type: "arabic", text: "نص عربي", translit: "Transliteración", translation: "Traducción", source: "Corán 2:222" }
 *   sources  (arreglo)  Opcional. Referencias bibliográficas (texto).
 *   related  (arreglo)  Opcional. Slugs de otras fatāwá relacionadas.
 *   opening  (booleano) Opcional. Pon `false` para no mostrar "Al-ḥamdu li-llāhi" al inicio de la respuesta.
 *   closing  (booleano) Opcional. Pon `false` para no mostrar "Wa-llāhu aʿlamu" al final.
 */
export const fataawa = [];

export const sortedFataawa = () =>
  [...fataawa].sort((a, b) => (b.date || "").localeCompare(a.date || "") || b.number - a.number);

export const getFatwa = (slug) => fataawa.find((f) => f.slug === slug);
