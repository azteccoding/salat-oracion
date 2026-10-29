import { ISLAMICFINDER_WIDGET_URL } from "@/constants/api";

// GET /api/tiempos-rezo → los seis tiempos del día tal como los muestra el
// recuadro de IslamicFinder del inicio (misma ciudad y configuración).
// Responde { fuente, dia, fajr, amanecer, dhuhr, asr, maghrib, isha },
// con cada tiempo en minutos desde la medianoche (hora de México).

const NOMBRES = { Fajr: "fajr", Sunrise: "amanecer", Dhuhr: "dhuhr", Asr: "asr", Maghrib: "maghrib", Isha: "isha" };
const MESES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const aMinutos = (texto) => {
  const [, h, m, ap] = texto.match(/(\d{1,2}):(\d{2})\s*([AP]M)/i);
  return ((+h % 12) + (ap.toUpperCase() === "PM" ? 12 : 0)) * 60 + +m;
};

export default async function handler(req, res) {
  try {
    const r = await fetch(ISLAMICFINDER_WIDGET_URL, {
      headers: { "User-Agent": "Mozilla/5.0 (islamguanajuato.com)" },
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) throw new Error(`IslamicFinder respondió ${r.status}`);
    const html = await r.text();

    const tiempos = {};
    const re = /<p>\s*(Fajr|Sunrise|Dhuhr|Asr|Maghrib|Isha)\s*<\/p>[\s\S]*?(\d{1,2}:\d{2}\s*[AP]M)/gi;
    for (const [, nombre, hora] of html.matchAll(re)) {
      const clave = NOMBRES[nombre[0].toUpperCase() + nombre.slice(1).toLowerCase()];
      if (clave && !(clave in tiempos)) tiempos[clave] = aMinutos(hora);
    }
    if (!("amanecer" in tiempos) || !("isha" in tiempos)) throw new Error("No se encontraron los horarios");

    // Fecha del recuadro, p. ej. «Wednesday, Oct 21, 2026»
    const f = html.match(/\b([A-Z][a-z]{2})[a-z]*\.? (\d{1,2}), (\d{4})\b/);
    const mes = f ? MESES.indexOf(f[1]) + 1 : 0;
    const dia = mes
      ? `${f[3]}-${String(mes).padStart(2, "0")}-${String(f[2]).padStart(2, "0")}`
      : new Intl.DateTimeFormat("en-CA", { timeZone: "America/Mexico_City" }).format(new Date());

    res.setHeader("Cache-Control", "public, s-maxage=900, stale-while-revalidate=3600");
    return res.status(200).json({ fuente: "islamicfinder", dia, ...tiempos });
  } catch (error) {
    res.setHeader("Cache-Control", "no-store");
    return res.status(502).json({ fuente: null, error: error.message });
  }
}
