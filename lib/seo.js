import { SITE_DESCRIPTION, SITE_LOCATION, SITE_NAME, SITE_URL } from "@/constants/site";

// Datos estructurados (schema.org) reutilizables.

export const organizacion = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organizacion`,
  name: SITE_NAME,
  alternateName: "Islam Guanajuato",
  url: SITE_URL,
  logo: `${SITE_URL}/icons/icon-512.png`,
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "León",
    addressRegion: "Guanajuato",
    addressCountry: "MX",
  },
  areaServed: SITE_LOCATION,
};

export const conContexto = (obj) => ({ "@context": "https://schema.org", ...obj });

// Quita diacríticos poco comunes (ā, ḥ, ʿ…) para textos que la gente escribe en el buscador.
export const sinDiacriticos = (s = "") =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[ʿʾ’']/g, "")
    .normalize("NFC");

// ¿Todavía tiene texto de relleno (✍️)? Esas páginas llevan "noindex" y no van al sitemap.
export const tienePendientes = (contenido) => JSON.stringify(contenido ?? "").includes("✍️");
