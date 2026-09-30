import Head from "next/head";
import { useRouter } from "next/router";
import { SITE_DESCRIPTION, SITE_NAME, SITE_SHORT_NAME, SITE_URL } from "@/constants/site";

// Texto de relleno que todavía no se ha escrito (✍️): esas páginas no se indexan.
const esBorrador = (t = "") => t.includes("✍️");

export const absoluta = (ruta = "/") => (/^https?:\/\//.test(ruta) ? ruta : `${SITE_URL}${ruta.startsWith("/") ? "" : "/"}${ruta}`);

/**
 * Etiquetas para buscadores y redes sociales.
 *   title       Título de la página (se le agrega " · Islam Guanajuato").
 *   description Resumen de ~150 caracteres para Google.
 *   image       Imagen para compartir (ruta o URL). Por defecto /og-image.png.
 *   type        website | article | profile
 *   jsonLd      Objeto (o arreglo) de datos estructurados schema.org.
 *   noIndex     true = que Google no la muestre.
 *   pendiente   true = la página aún tiene texto ✍️ por escribir (tampoco se indexa).
 */
const Seo = ({
  title,
  description = SITE_DESCRIPTION,
  image = "/og-image.png",
  imageAlt,
  type = "website",
  jsonLd,
  noIndex = false,
  pendiente: pendienteProp = false,
  publishedTime,
}) => {
  const { asPath } = useRouter();
  const pendiente = pendienteProp || esBorrador(title) || esBorrador(description);
  const desc = esBorrador(description) ? SITE_DESCRIPTION : description;
  const fullTitle = title ? `${title} · ${SITE_SHORT_NAME}` : `${SITE_NAME} · Islam en Guanajuato, México`;
  const path = (asPath || "/").split(/[?#]/)[0];
  const url = absoluta(path);
  const img = absoluta(image);
  // La imagen general y las de /api/og miden 1200×630; las fotos pueden medir otra cosa
  const tamanoEstandar = image === "/og-image.png" || image.startsWith("/api/og");
  const bloques = [jsonLd].flat().filter(Boolean);

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={url} />
      {(noIndex || pendiente) && <meta name="robots" content="noindex, follow" />}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="es_MX" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title || SITE_NAME} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      {tamanoEstandar && <meta property="og:image:width" content="1200" />}
      {tamanoEstandar && <meta property="og:image:height" content="630" />}
      <meta property="og:image:alt" content={imageAlt || title || SITE_NAME} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || SITE_NAME} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />

      {bloques.map((b, i) => (
        <script
          key={`ld-${i}`}
          type="application/ld+json"
          // JSON seguro: se escapan "<" para que no pueda cerrar la etiqueta
          dangerouslySetInnerHTML={{ __html: JSON.stringify(b).replace(/</g, "\\u003c") }}
        />
      ))}
    </Head>
  );
};

export default Seo;
