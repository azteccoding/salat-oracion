import { noticiaPorSlug } from "@/lib/noticias-db";

// GET /api/noticias/yemen-responde-en-yanbu-bombardeos-saudies  →  la noticia completa
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Solo GET" });
  try {
    const noticia = await noticiaPorSlug(String(req.query.slug));
    if (!noticia) return res.status(404).json({ error: "No existe esa noticia." });
    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json(noticia);
  } catch (error) {
    console.error("[api/noticias/slug]", error);
    return res.status(500).json({ error: "No se pudo consultar la base de datos." });
  }
}
