import { FATAAWA_PATH, topicOfCode } from "@/constants/fataawa";
import { filtroMongo } from "@/lib/busqueda";
import { COLECCIONES, coleccion } from "@/lib/mongodb";

// =====================================================================
//  Fatāwá desde MongoDB  (base islamic_website, colección "fataawa")
//  Cada documento es el JSON que da el editor (/editor-fataawa).
//  Solo se usa en el servidor: getStaticProps y rutas /api.
// =====================================================================

// En tu computadora (npm run dev) se ven también los borradores.
const VER_BORRADORES = process.env.NODE_ENV === "development";
const PUBLICAS = VER_BORRADORES ? {} : { borrador: { $ne: true } };

// Completa cada fatwa con su tema, su número visible y su URL final.
export const prepararFatwa = (f) => {
  const codigo = String(f.codigo);
  const { topic, sub } = topicOfCode(codigo);
  // eslint-disable-next-line no-unused-vars
  const { _id, ...resto } = f;
  return {
    ...resto,
    codigo,
    number: codigo,
    slug: `${f.slug}-${codigo}`,
    topic: topic?.slug || null,
    subtopic: sub?.slug || null,
    related: (f.related || []).map(String),
    borrador: Boolean(f.borrador),
  };
};

export const fatwaUrl = (f) => `${FATAAWA_PATH}/${f.slug}`;

// Solo la ficha (sin la respuesta): es lo que viaja a las listas
export const fichaFatwa = (f) => ({
  slug: f.slug,
  codigo: f.codigo,
  number: f.number,
  title: f.title,
  summary: f.summary || null,
  extracto: (f.question || "").slice(0, 240),
  topic: f.topic,
  subtopic: f.subtopic,
  date: f.date || null,
  borrador: f.borrador,
});

const ORDEN = { date: -1, codigo: -1 };
const CAMPOS_FICHA = { _id: 0, codigo: 1, slug: 1, title: 1, summary: 1, question: 1, date: 1, borrador: 1 };

// Todas las fichas publicables, más reciente primero
export async function listarFataawa() {
  const col = await coleccion(COLECCIONES.fataawa);
  const docs = await col.find(PUBLICAS, { projection: CAMPOS_FICHA }).sort(ORDEN).toArray();
  return docs.map(prepararFatwa).map(fichaFatwa);
}

export async function ultimasFataawa(n = 3) {
  const col = await coleccion(COLECCIONES.fataawa);
  const docs = await col.find(PUBLICAS, { projection: CAMPOS_FICHA }).sort(ORDEN).limit(n).toArray();
  return docs.map(prepararFatwa).map(fichaFatwa);
}

// Una fatwa completa por su código ("3500")
export async function fatwaPorCodigo(codigo) {
  const col = await coleccion(COLECCIONES.fataawa);
  const doc = await col.findOne({ ...PUBLICAS, codigo: String(codigo) }, { projection: { _id: 0 } });
  return doc ? prepararFatwa(doc) : null;
}

// Una fatwa completa por su dirección ("lo-que-anula-el-wudu-3500"): el código va al final
export async function fatwaPorSlug(slugCompleto = "") {
  const codigo = slugCompleto.split("-").pop();
  const f = await fatwaPorCodigo(codigo);
  return f && f.slug === slugCompleto ? f : null;
}

// Varias fatāwá por código (para «relacionadas»)
export async function fataawaPorCodigos(codigos = []) {
  if (!codigos.length) return [];
  const col = await coleccion(COLECCIONES.fataawa);
  const docs = await col.find({ ...PUBLICAS, codigo: { $in: codigos.map(String) } }, { projection: CAMPOS_FICHA }).toArray();
  const porCodigo = Object.fromEntries(docs.map((d) => [String(d.codigo), prepararFatwa(d)]));
  return codigos.map((c) => porCodigo[String(c)]).filter(Boolean);
}

// Búsqueda en el servidor: título, resumen, pregunta y texto de la respuesta
export async function buscarFataawa({ q = "", tema = "", limit = 20, skip = 0 } = {}) {
  const col = await coleccion(COLECCIONES.fataawa);
  // Sin diacríticos: «tarawih» encuentra «ṭarāwīḥ» (ver lib/busqueda.js)
  const porTexto = filtroMongo(q, ["title", "summary", "question", "codigo", "answer.text", "answer.title", "answer.items", "sources"]);
  const filtro = { ...PUBLICAS, ...porTexto };
  const docs = await col.find(filtro, { projection: CAMPOS_FICHA }).sort(ORDEN).toArray();
  const fichas = docs
    .map(prepararFatwa)
    .filter((f) => !tema || f.topic === tema || f.subtopic === tema)
    .map(fichaFatwa);
  return { total: fichas.length, resultados: fichas.slice(skip, skip + limit) };
}

// Códigos y títulos de TODAS (incluye borradores): para el editor
export async function codigosYTitulos() {
  const col = await coleccion(COLECCIONES.fataawa);
  const docs = await col.find({}, { projection: { _id: 0, codigo: 1, title: 1 } }).sort({ codigo: 1 }).toArray();
  return docs.map((d) => ({ codigo: String(d.codigo), title: d.title || "" }));
}

// Para el sitemap: las publicadas, completas
export async function fataawaParaSitemap() {
  const col = await coleccion(COLECCIONES.fataawa);
  const docs = await col.find({ borrador: { $ne: true } }, { projection: { _id: 0 } }).toArray();
  return docs.map(prepararFatwa);
}
