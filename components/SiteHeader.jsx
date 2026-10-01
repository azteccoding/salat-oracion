import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_LINKS, SITE_NAME } from "@/constants/site";
import { FATAAWA_PATH } from "@/constants/fataawa";
import HijriDate from "./HijriDate";
import Icon from "./Icon";
import styles from "@/styles/site/Header.module.css";

const isActive = (pathname, href, children) => {
  if (children) return children.some((c) => isActive(pathname, c.href));
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
};

const SearchForm = ({ className, id }) => (
  <form action={FATAAWA_PATH} method="get" role="search" className={className}>
    <label htmlFor={id} className="sr-only">
      Buscar en las fatāwá
    </label>
    <Icon name="search" size={18} />
    <input id={id} name="q" type="search" placeholder="Buscar una pregunta…" autoComplete="off" />
  </form>
);

const SiteHeader = () => {
  const { pathname, asPath } = useRouter();
  const headerRef = useRef(null);
  // El menú móvil queda abierto solo en la ruta donde se abrió: al navegar se cierra solo.
  // `closing` mantiene el panel visible mientras corre la animación de salida.
  const [menu, setMenu] = useState({ at: null, closing: false });
  const open = menu.at === asPath;
  const closing = open && menu.closing;

  const openMenu = () => {
    const bottom = headerRef.current?.getBoundingClientRect().bottom ?? 64;
    headerRef.current?.style.setProperty("--menu-top", `${Math.round(bottom)}px`);
    setMenu({ at: asPath, closing: false });
  };

  const closeMenu = useCallback(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setMenu({ at: null, closing: false });
      return;
    }
    setMenu((m) => ({ ...m, closing: true }));
    // Respaldo por si el navegador no avisa el fin de la animación
    window.setTimeout(() => setMenu((m) => (m.closing ? { at: null, closing: false } : m)), 700);
  }, []);

  // Bloquea el scroll de la página y permite cerrar con Esc mientras el menú está abierto
  useEffect(() => {
    if (!open) return undefined;
    const html = document.documentElement;
    html.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && closeMenu();
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeMenu]);

  return (
    <header ref={headerRef} className={styles.header} data-site-header>
      <div className={styles.topbar}>
        <div className={`contenedor ${styles.topbarInner}`}>
          <span className={styles.salam}>
            <span className="arabe" lang="ar">
              السلام عليكم
            </span>
            <span className={styles.salamEs}>La paz sea con ustedes</span>
          </span>
          <HijriDate className={styles.fecha} />
        </div>
      </div>

      <div className={styles.bar}>
        <div className={`contenedor ${styles.barInner}`}>
          <Link href="/" className={styles.brand} aria-label={`${SITE_NAME} — inicio`}>
            <Image src="/img/logo.svg" alt="" width={44} height={44} priority />
            <span className={styles.brandText}>
              <span className={styles.brandName}>Estudiantes del Islam</span>
              <span className={styles.brandSub}>en Guanajuato</span>
            </span>
          </Link>

          <nav className={styles.nav} aria-label="Principal">
            {NAV_LINKS.map((l) =>
              l.children ? (
                <div key={l.href} className={styles.grupo}>
                  <Link
                    href={l.href}
                    className={isActive(pathname, l.href, l.children) ? styles.activo : undefined}
                    aria-haspopup="true"
                  >
                    {l.label}
                    <Icon name="chevron" size={14} strokeWidth={2.2} />
                  </Link>
                  <div className={styles.submenu}>
                    {l.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        aria-current={pathname === c.href ? "page" : undefined}
                        className={pathname === c.href ? styles.subActivo : undefined}
                      >
                        <strong>{c.label}</strong>
                        {c.text && <span>{c.text}</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className={isActive(pathname, l.href) ? styles.activo : undefined}
                  aria-current={isActive(pathname, l.href) ? "page" : undefined}
                >
                  {l.label}
                </Link>
              )
            )}
          </nav>

          <button
            type="button"
            className={`${styles.menuBtn} ${open && !closing ? styles.menuBtnOpen : ""}`}
            aria-expanded={open && !closing}
            aria-controls="menu-movil"
            onClick={() => (open && !closing ? closeMenu() : openMenu())}
          >
            <Icon name={open && !closing ? "close" : "menu"} size={24} />
            <span className="sr-only">{open && !closing ? "Cerrar menú" : "Abrir menú"}</span>
          </button>
        </div>
      </div>

      <div
        id="menu-movil"
        className={`${styles.mobile} ${!open ? styles.mobileHidden : closing ? styles.mobileClosing : styles.mobileOpening}`}
        onAnimationEnd={(e) => {
          if (e.target === e.currentTarget && closing) setMenu({ at: null, closing: false });
        }}
      >
        <div className={`contenedor ${styles.mobileInner}`}>
          <SearchForm className={styles.searchMobile} id="buscar-movil" />
          <nav aria-label="Menú móvil" className={styles.mobileNav}>
            {NAV_LINKS.map((l) =>
              l.children ? (
                <div key={l.href} className={styles.mobileGrupo}>
                  <p className={styles.mobileGrupoTitulo}>{l.label}</p>
                  {l.children.map((c) => (
                    <Link key={c.href} href={c.href} className={pathname === c.href ? styles.activo : undefined}>
                      <span>
                        {c.label}
                        {c.text && <small>{c.text}</small>}
                      </span>
                      <Icon name="arrow" size={20} />
                    </Link>
                  ))}
                </div>
              ) : (
                <Link key={l.href} href={l.href} className={isActive(pathname, l.href) ? styles.activo : undefined}>
                  {l.label}
                  <Icon name="arrow" size={20} />
                </Link>
              )
            )}
          </nav>
          <p className={styles.mobileAya}>
            <span className="arabe" lang="ar">
              وَقُل رَّبِّ زِدْنِي عِلْمًا
            </span>
            <small>«¡Señor mío, acrecienta mi conocimiento!» · Corán 20:114</small>
          </p>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
