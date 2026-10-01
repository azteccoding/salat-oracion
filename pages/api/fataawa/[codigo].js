import { fatwaPorCodigo } from "@/lib/fataawa-db";

// GET /api/fataawa/3500  →  la fatwa completa
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Solo GET" });
  try {
    const fatwa = await fatwaPorCodigo(String(req.query.codigo));
    if (!fatwa) return res.status(404).json({ error: "No existe esa fatwa." });
    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json(fatwa);
  } catch (error) {
    console.error("[api/fataawa/codigo]", error);
    return res.status(500).json({ error: "No se pudo consultar la base de datos." });
  }
}
