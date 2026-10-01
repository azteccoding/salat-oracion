import { imagenBase64 } from "@/lib/noticias-db";

// GET /api/noticias/imagen/<slug>            → foto principal de la noticia
// GET /api/noticias/imagen/<slug>/<bloque>   → foto dentro del texto (posición en "cuerpo")
// Convierte el base64 guardado en MongoDB en una imagen normal, con caché.
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  const [slug, bloque] = [].concat(req.query.ruta || []);
  const indice = bloque === undefined ? undefined : Number(bloque);
  if (!slug || (bloque !== undefined && !Number.isInteger(indice))) return res.status(400).end();
  try {
    const img = await imagenBase64(String(slug), indice);
    if (!img) return res.status(404).end();
    res.setHeader("Content-Type", img.tipo);
    res.setHeader("Content-Length", img.buffer.length);
    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800");
    return res.status(200).send(img.buffer);
  } catch (error) {
    console.error("[api/noticias/imagen]", error);
    return res.status(500).end();
  }
}

// Las imágenes pueden pesar más que el límite por defecto de las respuestas de la API
export const config = { api: { responseLimit: "8mb" } };
