import Link from "next/link";
import ui from "@/styles/site/ui.module.css";

// Banda superior de cada página interior.
// crumbs: [{ href, label }] — el último elemento es la página actual (sin href).
const PageHero = ({ title, arabic, eyebrow, crumbs, children }) => (
  <section className={ui.pageHero}>
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

export default PageHero;
