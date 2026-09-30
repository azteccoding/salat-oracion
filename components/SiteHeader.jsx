import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { NAV_LINKS, SITE_NAME } from "@/constants/site";
import { FATAAWA_PATH } from "@/constants/fataawa";
import HijriDate from "./HijriDate";
import Icon from "./Icon";
import styles from "@/styles/site/Header.module.css";

const isActive = (pathname, href) => {
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
  // El menú móvil queda abierto solo en la ruta donde se abrió: al navegar se cierra solo.
  const [openAt, setOpenAt] = useState(null);
  const open = openAt === asPath;
  const setOpen = (fn) => setOpenAt(fn(open) ? asPath : null);

  return (
    <header className={styles.header} data-site-header>
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
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={isActive(pathname, l.href) ? styles.activo : undefined}
                aria-current={isActive(pathname, l.href) ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <SearchForm className={styles.search} id="buscar-header" />

          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} size={24} />
            <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          </button>
        </div>
      </div>

      <div id="menu-movil" className={`${styles.mobile} ${open ? styles.mobileOpen : ""}`}>
        <div className="contenedor">
          <SearchForm className={styles.searchMobile} id="buscar-movil" />
          <nav aria-label="Menú móvil">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={isActive(pathname, l.href) ? styles.activo : undefined}>
                {l.label}
                <Icon name="arrow" size={18} />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
