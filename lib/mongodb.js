import { MongoClient } from "mongodb";

// =====================================================================
//  Conexión a MongoDB (solo del lado del servidor)
// ---------------------------------------------------------------------
//  La dirección de la base de datos se lee de la variable MONGODB_URI:
//    · En tu computadora: archivo .env.local en la raíz del proyecto.
//    · En Vercel: Settings → Environment Variables → MONGODB_URI.
//  Nunca la escribas directamente en el código: el código se sube a GitHub.
// =====================================================================

const DB_NAME = process.env.MONGODB_DB || "islamic_website";

export const COLECCIONES = {
  fataawa: "fataawa",
  noticias: "noticias",
};

// Una sola conexión reutilizada (en desarrollo, Next recarga los módulos a cada rato)
let promesa = globalThis.__mongoClientPromise;

export async function getDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Falta la variable MONGODB_URI (ponla en .env.local o en Vercel).");
  if (!promesa) {
    promesa = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 }).connect();
    globalThis.__mongoClientPromise = promesa;
  }
  try {
    const cliente = await promesa;
    return cliente.db(DB_NAME);
  } catch (error) {
    // Si falla, se intentará conectar de nuevo en la próxima petición
    promesa = undefined;
    globalThis.__mongoClientPromise = undefined;
    throw error;
  }
}

export const coleccion = async (nombre) => (await getDb()).collection(nombre);
