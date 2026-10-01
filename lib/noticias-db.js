import { COLECCIONES, coleccion } from "@/lib/mongodb";

// =====================================================================
//  Noticias desde MongoDB  (base islamic_website, colección "noticias")
//  Cada documento es el JSON que da el editor (/editor-noticias).
//  Solo se usa en el servidor: getStaticProps y rutas /api.
// =====================================================================

const VER_TODO = process.env.NODE_ENV === "development";
const PUBLICABLES = VER_TODO ? {} : { borrador: { $ne: true } };
const EN_LISTAS = VER_TODO ? {} : { borrador: { $ne: true }, indexar: { $ne: false } };

const escaparRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Ruta de imagen tolerante: "public/img/x.jpg", "img/x.jpg" o "/img/x.jpg" → "/img/x.jpg"
const rutaImagen = (src = "") => `/${String(src).trim().replace(/^\/?(public\/)?/, "")}`;
const imagenDe = (img) => (img && img.src ? { ...img, src: rutaImagen(img.src), alt: img.alt || "" } : null);

export const prepararNoticia = (n) => {
  // eslint-disable-next-line no-unused-vars
  const { _id, src, alt, ...resto } = n;
  return {
    ...resto,
    imagen: imagenDe(n.imagen || (src ? { src, alt } : null)),
    cuerpo: (n.cuerpo || []).map((b) => (b.type === "imagen" ? { ...b, src: rutaImagen(b.src) } : b)),
    borrador: Boolean(n.borrador),
    indexar: n.indexar !== false,
    fuentes: n.fuentes || [],
  };
};

// Solo la ficha (sin el cuerpo): es lo único que viaja a las listas y al inicio
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

const ORDEN = { date: -1 };
const CAMPOS_FICHA = { _id: 0, slug: 1, title: 1, date: 1, tema: 1, resumen: 1, imagen: 1, src: 1, alt: 1, borrador: 1, indexar: 1 };

export async function listarNoticias() {
  const col = await coleccion(COLECCIONES.noticias);
  const docs = await col.find(EN_LISTAS, { projection: CAMPOS_FICHA }).sort(ORDEN).toArray();
  return docs.map(prepararNoticia).map(fichaNoticia);
}

export async function ultimaNoticia() {
  const col = await coleccion(COLECCIONES.noticias);
  const doc = await col.findOne({ borrador: { $ne: true }, indexar: { $ne: false } }, { projection: CAMPOS_FICHA, sort: ORDEN });
  return doc ? fichaNoticia(prepararNoticia(doc)) : null;
}

export async function noticiaPorSlug(slug) {
  const col = await coleccion(COLECCIONES.noticias);
  const doc = await col.findOne({ ...PUBLICABLES, slug }, { projection: { _id: 0 } });
  return doc ? prepararNoticia(doc) : null;
}

export async function relacionadasDe(noticia, n = 3) {
  const col = await coleccion(COLECCIONES.noticias);
  const docs = await col
    .find({ ...EN_LISTAS, tema: noticia.tema, slug: { $ne: noticia.slug } }, { projection: CAMPOS_FICHA })
    .sort(ORDEN)
    .limit(n)
    .toArray();
  return docs.map(prepararNoticia).map(fichaNoticia);
}

// Búsqueda en el servidor: titular, resumen y todo el texto de la noticia
export async function buscarNoticias({ q = "", tema = "", limit = 20, skip = 0 } = {}) {
  const col = await coleccion(COLECCIONES.noticias);
  const filtro = { ...EN_LISTAS };
  if (tema) filtro.tema = tema;
  const texto = q.trim();
  if (texto) {
    const re = { $regex: escaparRegex(texto), $options: "i" };
    filtro.$or = [{ title: re }, { resumen: re }, { "cuerpo.text": re }, { "cuerpo.items": re }];
  }
  const total = await col.countDocuments(filtro);
  const docs = await col.find(filtro, { projection: CAMPOS_FICHA }).sort(ORDEN).skip(skip).limit(limit).toArray();
  return { total, resultados: docs.map(prepararNoticia).map(fichaNoticia) };
}

export async function noticiasParaSitemap() {
  const col = await coleccion(COLECCIONES.noticias);
  const docs = await col.find({ borrador: { $ne: true }, indexar: { $ne: false } }, { projection: { _id: 0 } }).toArray();
  return docs.map(prepararNoticia);
}
