import Head from "next/head";
import { useRouter } from "next/router";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/constants/site";

const Seo = ({ title, description = SITE_DESCRIPTION, type = "website", noIndex = false }) => {
  const { asPath } = useRouter();
  const fullTitle = title ? `${title} · ${SITE_NAME}` : SITE_NAME;
  const path = (asPath || "/").split(/[?#]/)[0];
  const url = SITE_URL ? `${SITE_URL}${path}` : undefined;
  const image = `${SITE_URL}/og-image.png`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {url && <link rel="canonical" href={url} />}
      {noIndex && <meta name="robots" content="noindex" />}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="es_MX" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title || SITE_NAME} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={SITE_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default Seo;
