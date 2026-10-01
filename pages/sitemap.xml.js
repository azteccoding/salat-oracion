import { FATAAWA_PATH } from "@/constants/fataawa";
import { SITE_URL } from "@/constants/site";
import { descargas } from "@/data/descargas";
import { fataawaParaSitemap } from "@/lib/fataawa-db";
import { gusl } from "@/data/gusl";
import { obrasIbnHazm } from "@/data/ibn-hazm-obras";
import { wudu } from "@/data/wudu";
import { noticiasParaSitemap } from "@/lib/noticias-db";
import { tienePendientes } from "@/lib/seo";
import { PENDIENTE as ESCUELA_PENDIENTE } from "./imam-ibn-hazm/escuela-zahiri";
import { PENDIENTE as IBN_HAZM_PENDIENTE } from "./imam-ibn-hazm/index";

// /sitemap.xml — lista de páginas para Google, generada sola a partir de los datos del sitio.
// Las páginas con texto ✍️ pendiente y los borradores de fatāwá no se incluyen.

const hoy = () => new Date().toISOString().slice(0, 10);

const paginas = ({ fataawa = [], noticias = [] }) => {
  const lista = [
    { ruta: "/", prioridad: "1.0", frecuencia: "weekly" },
    { ruta: FATAAWA_PATH, prioridad: "0.9", frecuencia: "weekly" },
    { ruta: "/salat", prioridad: "0.9", frecuencia: "monthly" },
    { ruta: "/wudu", prioridad: "0.8", frecuencia: "monthly", oculta: tienePendientes(wudu) },
    { ruta: "/gusl", prioridad: "0.8", frecuencia: "monthly", oculta: tienePendientes(gusl) },
    { ruta: "/nuestra-tariqa", prioridad: "0.6", frecuencia: "monthly" },
    { ruta: "/nuestro-maulana", prioridad: "0.6", frecuencia: "monthly" },
    { ruta: "/nuestro-sheij", prioridad: "0.6", frecuencia: "monthly" },
    { ruta: "/nuestra-recitacion", prioridad: "0.6", frecuencia: "monthly" },
    { ruta: "/imam-ibn-hazm", prioridad: "0.7", frecuencia: "monthly", oculta: IBN_HAZM_PENDIENTE },
    { ruta: "/imam-ibn-hazm/escuela-zahiri", prioridad: "0.6", frecuencia: "monthly", oculta: ESCUELA_PENDIENTE },
    { ruta: "/imam-ibn-hazm/obras", prioridad: "0.5", frecuencia: "monthly" },
    ...obrasIbnHazm.map((o) => ({
      ruta: `/imam-ibn-hazm/obras/${o.slug}`,
      prioridad: "0.5",
      frecuencia: "monthly",
      oculta: tienePendientes(o),
    })),
    { ruta: "/noticias", prioridad: "0.8", frecuencia: "daily" },
    ...noticias
      .filter((n) => !tienePendientes(n))
      .map((n) => ({ ruta: `/noticias/${n.slug}`, prioridad: "0.6", frecuencia: "yearly", fecha: n.date })),
    { ruta: "/descargas", prioridad: "0.6", frecuencia: "monthly" },
    ...descargas.map((d) => ({ ruta: `/descargas/${d.slug}`, prioridad: "0.5", frecuencia: "yearly" })),
    ...fataawa
      .filter((f) => !tienePendientes(f))
      .map((f) => ({
        ruta: `${FATAAWA_PATH}/${f.slug}`,
        prioridad: "0.8",
        frecuencia: "yearly",
        fecha: f.date,
      })),
  ];
  return lista.filter((p) => !p.oculta);
};

const escapar = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function getServerSideProps({ res }) {
  const fecha = hoy();
  let fataawa = [];
  let noticias = [];
  try {
    [fataawa, noticias] = await Promise.all([fataawaParaSitemap(), noticiasParaSitemap()]);
  } catch (error) {
    console.error("[sitemap] No se pudo leer MongoDB:", error.message);
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paginas({ fataawa, noticias })
  .map(
    (p) => `  <url>
    <loc>${escapar(`${SITE_URL}${p.ruta === "/" ? "/" : p.ruta}`)}</loc>
    <lastmod>${p.fecha || fecha}</lastmod>
    <changefreq>${p.frecuencia}</changefreq>
    <priority>${p.prioridad}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=3600");
  res.write(xml);
  res.end();
  return { props: {} };
}

export default function Sitemap() {
  return null;
}
