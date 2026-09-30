import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import Seo from "@/components/Seo";
import Enlaces from "@/components/comunidad/Enlaces";
import Secciones from "@/components/comunidad/Secciones";
import Silsila from "@/components/comunidad/Silsila";
import { NUESTRO_SHEIJ as S } from "@/constants/content";
import c from "@/styles/site/Comunidad.module.css";
import styles from "@/styles/site/Sheij.module.css";
import ui from "@/styles/site/ui.module.css";

export default function NuestroSheij() {
  return (
    <>
      <Seo title={`${S.titulo}: ${S.nombre}`} description={S.resumen} type="profile" />

      <section className={styles.hero}>
        <div className={`contenedor ${styles.heroInner}`}>
          <div className={styles.arco}>
            <div className={styles.arcoInterior}>
              <Image
                src={S.fotoPrincipal.src}
                alt={S.fotoPrincipal.alt}
                fill
                priority
                sizes="(max-width: 860px) 78vw, 340px"
              />
            </div>
          </div>

          <div className={styles.heroTexto}>
            <nav className={styles.crumbs} aria-label="Ruta de navegación">
              <Link href="/">Inicio</Link>
              <span aria-hidden>›</span>
              <Link href="/nuestra-tariqa">Nuestra Tarīqa</Link>
              <span aria-hidden>›</span>
              <span aria-current="page">{S.titulo}</span>
            </nav>
            <p className={styles.eyebrow}>{S.titulo}</p>
            <p className={styles.nombreArabe} lang="ar">
              {S.nombreArabe}
            </p>
            <h1>{S.nombre}</h1>
            <p className={styles.nombreCompleto}>{S.nombreCompleto}</p>
            <p className={styles.resumen}>{S.resumen}</p>
            <div className={styles.chips}>
              <Link href="/nuestra-tariqa">Nuestra Tarīqa</Link>
              <Link href="/nuestro-maulana">Nuestro Maulana</Link>
            </div>
          </div>
        </div>
      </section>

      <div className={`contenedor ${c.layout}`}>
        <div>
          <article className={c.article}>
            <Secciones secciones={S.secciones} />

            <footer className={styles.firma}>
              <span className={styles.firmaOrnamento} aria-hidden />
              <p className="arabe" lang="ar">
                {S.nombreArabe}
              </p>
              <p className={styles.firmaLatina}>{S.nombreCompleto}</p>
            </footer>
          </article>

          <Enlaces actual="/nuestro-sheij" />
        </div>

        <aside className={c.aside}>
          <section className={`${ui.card} ${ui.cardPad}`}>
            <h2 className={ui.cardTitle}>
              <Icon name="book" size={18} /> Sus maestros
            </h2>
            <ul className={styles.maestros}>
              <li>
                <strong>Maulana Yahya al-Kanadi</strong>
                <span>Discípulo de maulana ʿIyad ibn Yusuf</span>
              </li>
              <li>
                <strong>Sheij Shalik</strong>
                <span>Maestro de su hermano por Allah, Habib el Kashlán</span>
              </li>
            </ul>
          </section>

          <section className={`${ui.card} ${ui.cardPad}`}>
            <h2 className={ui.cardTitle}>
              <Icon name="link" size={18} /> Silsila
            </h2>
            <p className={c.asideIntro}>La cadena de maestros, tal como nos fue narrada.</p>
            <Silsila />
            <Link href="/nuestra-tariqa" className={c.asideLink}>
              Conocer la tarīqa <Icon name="arrow" size={16} />
            </Link>
          </section>
        </aside>
      </div>
    </>
  );
}
