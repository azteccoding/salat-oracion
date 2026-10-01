import { COLECCIONES, coleccion } from "@/lib/mongodb";
import { SHEIJ_JUTBA, idDeDrive } from "@/constants/jutbas";

// =====================================================================
//  Juṭbas desde MongoDB  (base islamic_website, colección "podcasts_khutbah")
//  Cada documento es el JSON que da el editor (/editor-jutbas).
//  Solo se usa en el servidor (getStaticProps).
// =====================================================================

// En tu computadora (npm run dev) también se ven los borradores
const PUBLICAS = process.env.NODE_ENV === "development" ? {} : { borrador: { $ne: true } };

const prepararJutba = (j) => ({
  slug: j.slug || null,
  titulo: j.titulo || "Juṭba del viernes",
  fecha: j.fecha || null,
  sheij: j.sheij || SHEIJ_JUTBA.nombre,
  lugar: j.lugar || (j.sheij && j.sheij !== SHEIJ_JUTBA.nombre ? null : SHEIJ_JUTBA.lugar),
  resumen: j.resumen || null,
  // Se acepta el ID ya separado o el link completo de Drive
  driveId: j.driveId || idDeDrive(j.enlace),
  borrador: Boolean(j.borrador),
});

// Todas, de la más reciente a la más antigua
export async function listarJutbas() {
  const c = await coleccion(COLECCIONES.jutbas);
  const docs = await c.find(PUBLICAS, { projection: { _id: 0 } }).sort({ fecha: -1 }).toArray();
  return docs.map(prepararJutba).filter((j) => j.driveId);
}
