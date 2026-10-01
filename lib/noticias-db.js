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

// ---------------------------------------------------------------------
//  IMÁGENES
//  · Nuevas: vienen dentro del JSON en base64 (campo "data": "data:image/jpeg;base64,…").
//    El sitio NO manda ese texto enorme a las páginas: lo sirve como imagen normal en
//      /api/noticias/imagen/<slug>            (foto principal)
//      /api/noticias/imagen/<slug>/<bloque>   (foto dentro del texto; bloque = posición en "cuerpo")
//  · Antiguas: "src" con una ruta de public/ ("/img/noticias/x.jpg") siguen funcionando.
// ---------------------------------------------------------------------
export const IMAGEN_API = "/api/noticias/imagen";

// Ruta tolerante: "public/img/x.jpg", "img/x.jpg" o "/img/x.jpg" → "/img/x.jpg"
const rutaImagen = (src = "") => `/${String(src).trim().replace(/^\/?(public\/)?/, "")}`;

// Foto principal → { src, alt } (sin el base64)
const imagenPrincipal = (n) => {
  const img = n.imagen || (n.src ? { src: n.src, alt: n.alt } : null);
  if (!img) return null;
  const alt = img.alt || "";
  // Con base64 (o en una lista, donde el base64 no se pide): se sirve desde la API
  if (img.data || !img.src) return { src: `${IMAGEN_API}/${n.slug}`, alt };
  return { src: rutaImagen(img.src), alt };
};

export const prepararNoticia = (n) => {
  // eslint-disable-next-line no-unused-vars
  const { _id, src, alt, ...resto } = n;
  return {
    ...resto,
    imagen: imagenPrincipal(n),
    cuerpo: (n.cuerpo || []).map((b, i) => {
      if (b.type !== "imagen") return b;
      // eslint-disable-next-line no-unused-vars
      const { data, ...sinData } = b;
      // Con base64 (o sin src porque el base64 no se pidió): se sirve desde la API
      return { ...sinData, src: data || !b.src ? `${IMAGEN_API}/${n.slug}/${i}` : rutaImagen(b.src) };
    }),
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
// La noticia completa, pero sin el texto base64 de las fotos (se sirven desde la API)
const SIN_BASE64 = { _id: 0, "imagen.data": 0, "cuerpo.data": 0 };

// Las fichas nunca piden el base64 (imagen.data): solo src y alt
const CAMPOS_FICHA = {
  _id: 0,
  slug: 1,
  title: 1,
  date: 1,
  tema: 1,
  resumen: 1,
  "imagen.src": 1,
  "imagen.alt": 1,
  src: 1,
  alt: 1,
  borrador: 1,
  indexar: 1,
};

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
  const doc = await col.findOne({ ...PUBLICABLES, slug }, { projection: SIN_BASE64 });
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
  const docs = await col.find({ borrador: { $ne: true }, indexar: { $ne: false } }, { projection: SIN_BASE64 }).toArray();
  return docs.map(prepararNoticia);
}

// Devuelve { tipo, buffer } de una imagen en base64 guardada en la noticia.
// bloque = undefined → foto principal; número → foto dentro del texto.
export async function imagenBase64(slug, bloque) {
  const col = await coleccion(COLECCIONES.noticias);
  const proyeccion = bloque === undefined ? { _id: 0, "imagen.data": 1 } : { _id: 0, cuerpo: 1 };
  const doc = await col.findOne({ ...PUBLICABLES, slug }, { projection: proyeccion });
  if (!doc) return null;
  const data = bloque === undefined ? doc.imagen?.data : doc.cuerpo?.[bloque]?.data;
  const m = typeof data === "string" && data.match(/^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i);
  if (!m) return null;
  return { tipo: m[1], buffer: Buffer.from(m[2], "base64") };
}
