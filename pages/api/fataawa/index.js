import { buscarFataawa } from "@/lib/fataawa-db";

// GET /api/fataawa?q=wudu&tema=tahara&limit=20&skip=0
// Devuelve { total, resultados } con la ficha de cada fatwa (sin la respuesta completa).
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Solo GET" });
  const { q = "", tema = "", limit = "20", skip = "0" } = req.query;
  try {
    const datos = await buscarFataawa({
      q: String(q),
      tema: String(tema),
      limit: Math.min(Number(limit) || 20, 100),
      skip: Math.max(Number(skip) || 0, 0),
    });
    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json(datos);
  } catch (error) {
    console.error("[api/fataawa]", error);
    return res.status(500).json({ error: "No se pudo consultar la base de datos." });
  }
}
