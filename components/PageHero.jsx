import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { absoluta } from "./Seo";
import ui from "@/styles/site/ui.module.css";

// Migas de pan en formato schema.org, para que Google las muestre en los resultados.
export const migasJsonLd = (crumbs, pathActual) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ label: "Inicio", href: "/" }, ...crumbs].map((c, i, arr) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.label,
    item: absoluta(c.href || (i === arr.length - 1 ? pathActual : "/")),
  })),
});

// Banda superior de cada página interior.
// crumbs: [{ href, label }] — el último elemento es la página actual (sin href).
const PageHero = ({ title, arabic, eyebrow, crumbs, children }) => {
  const { asPath } = useRouter();
  const path = (asPath || "/").split(/[?#]/)[0];
  return (
    <section className={ui.pageHero}>
      {crumbs && (
        <Head>
          <script
            key="ld-migas"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(migasJsonLd(crumbs, path)).replace(/</g, "\\u003c") }}
          />
        </Head>
      )}
      <div className="contenedor">
        {crumbs && (
          <nav className={ui.crumbs} aria-label="Ruta de navegación">
            <Link href="/">Inicio</Link>
            {crumbs.map((c) => (
              <span key={c.label} style={{ display: "contents" }}>
                <span aria-hidden>›</span>
                {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <div className={ui.eyebrow}>{eyebrow}</div>}
        {arabic && (
          <p className={ui.pageHeroArabic} lang="ar">
            {arabic}
          </p>
        )}
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  );
};

export default PageHero;
