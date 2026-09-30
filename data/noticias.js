import { NOTICIAS_PATH } from "@/constants/noticias";
import { noticiasEscritas } from "./noticias-escritas/noticiasEscritasArray";

/**
 * NOTICIAS DE ACTUALIDAD
 * ======================
 * Cada noticia de esta lista se publica sola en  /noticias/<slug>
 * La más reciente aparece en la página de inicio (solo su vista previa).
 *
 * CAMPOS
 *   slug      Dirección web: minúsculas y guiones, sin acentos. Ej.: "iftar-comunitario-leon-2026".
 *   title     Titular.
 *   date      Fecha de publicación "AAAA-MM-DD". La más reciente sale primero.
 *   tema      Uno de: comunidad · eventos · mexico · mundo · palestina · cultura
 *             (la lista de temas está en constants/noticias.js).
 *   resumen   Una o dos líneas. Es lo que se ve en el inicio y en la lista.
 *   imagen    Opcional. Foto principal. Cópiala a public/img/noticias/ y escribe:
 *               imagen: { src: "/img/noticias/mi-foto.jpg", alt: "Qué se ve en la foto" },
 *   cuerpo    El texto de la noticia, en bloques (ver abajo).
 *   fuentes   Opcional. Lista de fuentes al final de la noticia:
 *               fuentes: [
 *                 { nombre: "Al Jazeera", url: "https://..." },
 *                 { nombre: "Wikipedia: Yanbu", url: "https://es.wikipedia.org/wiki/Yanbu", nota: "contexto" },
 *               ],
 *   indexar   Opcional. Con `false` la noticia se publica, pero Google no la muestra y no sale
 *             en la lista ni en el inicio: solo se llega por su enlace.
 *   borrador  Opcional. Con `true` solo se ve en tu computadora (npm run dev). No se publica.
 *
 * BLOQUES DEL CUERPO
 *   { type: "p", text: "Párrafo." }
 *   { type: "h", text: "Subtítulo" }
 *   { type: "list", items: ["Punto uno", "Punto dos"] }
 *   { type: "quote", text: "Cita textual.", source: "Quién lo dijo" }
 *   { type: "imagen", src: "/img/noticias/foto.jpg", alt: "Descripción", pie: "Texto bajo la foto" }
 *   { type: "nota", title: "Título del recuadro", text: "Recuadro destacado." }
 *
 * MARCAS DENTRO DEL TEXTO (en párrafos, listas, citas, pies de foto y resumen)
 *   **negritas**                       → negritas
 *   ==resaltado==                      → texto con fondo dorado
 *   [texto](https://sitio.com)         → enlace a otro sitio (se abre en otra pestaña)
 *   [texto](/fataawa-zahiri-fiqh)      → enlace a una página de nuestro sitio
 *
 * DÓNDE ESTÁN LAS NOTICIAS: cada una en su archivo, dentro de data/noticias-escritas/,
 * y la lista que las junta en data/noticias-escritas/noticiasEscritasArray.js.
 * La forma más fácil de escribir una noticia nueva es el editor: /editor-noticias
 *
 * Este archivo ya no se edita: solo explica los campos y prepara las noticias para el sitio.
 */
// =====================================================================
//  A partir de aquí no hace falta editar.
// =====================================================================

// En tu computadora (npm run dev) se ven también los borradores y las no indexadas.
const VER_TODO = process.env.NODE_ENV === "development";

// Ruta de imagen tolerante: "public/img/x.jpg", "img/x.jpg" o "/img/x.jpg" → "/img/x.jpg"
const rutaImagen = (src = "") => `/${String(src).trim().replace(/^\/?(public\/)?/, "")}`;
const imagenDe = (img) => (img && img.src ? { ...img, src: rutaImagen(img.src), alt: img.alt || "" } : null);

export const noticias = noticiasEscritas.map((n) => ({
  ...n,
  // Foto principal: acepta imagen: { src, alt } o, por descuido, src y alt sueltos
  imagen: imagenDe(n.imagen || (n.src ? { src: n.src, alt: n.alt } : null)),
  cuerpo: (n.cuerpo || []).map((b) => (b.type === "imagen" ? { ...b, src: rutaImagen(b.src) } : b)),
  borrador: Boolean(n.borrador),
  indexar: n.indexar !== false,
  fuentes: n.fuentes || [],
}));

const porFecha = (a, b) => (b.date || "").localeCompare(a.date || "");

// Las que tienen página: en el sitio publicado, todas menos los borradores.
export const noticiasPublicables = () =>
  noticias.filter((n) => VER_TODO || !n.borrador).sort(porFecha);

// Las que aparecen en la lista, en el inicio y en el sitemap: además, sin las «no indexadas».
export const noticiasEnListas = () =>
  noticias.filter((n) => VER_TODO || (!n.borrador && n.indexar)).sort(porFecha);

export const getNoticia = (slug) =>
  noticiasPublicables().find((n) => n.slug === slug);

export const noticiaUrl = (n) => `${NOTICIAS_PATH}/${n.slug}`;

// Solo la ficha (sin el cuerpo): es lo único que viaja a la lista y al inicio.
export const fichaNoticia = (n) => ({
  slug: n.slug,
  title: n.title,
  date: n.date || null,
  tema: n.tema || null,
  resumen: n.resumen || null,
  imagen: n.imagen || null,
  borrador: n.borrador,
  indexar: n.indexar,
});

export const ultimaNoticia = () => {
  const [n] = noticiasEnListas().filter((x) => x.indexar && !x.borrador);
  return n ? fichaNoticia(n) : null;
};
