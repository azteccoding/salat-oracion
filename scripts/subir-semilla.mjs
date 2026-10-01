// =====================================================================
//  Sube a MongoDB las fatāwá y noticias que ya estaban escritas en el proyecto
//  (un archivo JSON por fatwa en data/semilla/fataawa/ y uno por noticia en
//  data/semilla/noticias/). Cada archivo se vuelve UN documento. Crea los índices.
//
//  Uso (una sola vez, desde la carpeta del proyecto):
//      node scripts/subir-semilla.mjs
//
//  Es seguro repetirlo: actualiza por código (fatāwá) o por slug (noticias),
//  no duplica.
// =====================================================================
import fs from "node:fs";
import { MongoClient } from "mongodb";

// Lee MONGODB_URI de .env.local (o de la variable de entorno)
const leerEnv = () => {
  try {
    for (const linea of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
      const m = linea.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {
    /* sin .env.local */
  }
};
leerEnv();

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Falta MONGODB_URI en .env.local");
  process.exit(1);
}

const cliente = new MongoClient(uri);
try {
  await cliente.connect();
  const db = cliente.db(process.env.MONGODB_DB || "islamic_website");

  const leerCarpeta = (dir) =>
    fs
      .readdirSync(dir)
      .filter((n) => n.endsWith(".json"))
      .map((n) => JSON.parse(fs.readFileSync(`${dir}/${n}`, "utf8")));
  const fataawa = leerCarpeta("data/semilla/fataawa");
  const noticias = leerCarpeta("data/semilla/noticias");

  await db.collection("fataawa").createIndex({ codigo: 1 }, { unique: true });
  await db.collection("noticias").createIndex({ slug: 1 }, { unique: true });

  for (const f of fataawa) {
    await db.collection("fataawa").replaceOne({ codigo: String(f.codigo) }, { ...f, codigo: String(f.codigo) }, { upsert: true });
  }
  for (const n of noticias) {
    await db.collection("noticias").replaceOne({ slug: n.slug }, n, { upsert: true });
  }
  console.log(`Listo: ${fataawa.length} fatāwá y ${noticias.length} noticias en MongoDB.`);
} catch (error) {
  console.error("Error:", error.message);
  process.exitCode = 1;
} finally {
  await cliente.close();
}
