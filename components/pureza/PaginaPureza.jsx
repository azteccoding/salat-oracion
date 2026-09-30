import Link from "next/link";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import StepCard from "@/components/salat/StepCard";
import styles from "@/styles/site/Salat.module.css";
import ui from "@/styles/site/ui.module.css";

// Plantilla compartida por /wudu y /gusl. No necesitas editar este archivo:
// el contenido vive en data/wudu.js y data/gusl.js.
const OTRA = {
  wudu: { href: "/gusl", titulo: "Gusl", texto: "El baño ritual" },
  gusl: { href: "/wudu", titulo: "Wuḍūʾ", texto: "La ablución menor" },
};

const PaginaPureza = ({ clave, datos }) => {
  const otra = OTRA[clave];
  return (
    <>
      <Seo title={`${datos.titulo}: ${datos.subtitulo.toLowerCase()}`} description={datos.intro} />

      <PageHero
        title={datos.titulo}
        arabic={datos.arabe}
        eyebrow={datos.subtitulo}
        crumbs={[{ href: "/salat", label: "Aprende a rezar" }, { label: datos.titulo }]}
      >
        <p>{datos.intro}</p>
      </PageHero>

      <div className={`contenedor ${styles.layout}`}>
        <div>
          <ol className={styles.steps}>
            {datos.pasos.map((paso, i) => (
              <StepCard key={paso.name} step={paso} number={i + 1} />
            ))}
          </ol>

          {datos.muhalla.length > 0 && (
            <section className={styles.muhalla}>
              <p className={styles.stepKicker}>Imam Ibn Ḥazm</p>
              <h2>Del Muḥallā</h2>
              {datos.muhalla.map((m, i) => (
                <article key={i} className={styles.masala}>
                  <h3>
                    {m.masala && <span className={styles.masalaNum}>Masʾala {m.masala}</span>}
                    {m.titulo}
                  </h3>
                  <p className={`arabe ${styles.masalaAr}`} lang="ar">
                    {m.arabe}
                  </p>
                  <p className={styles.masalaEs}>{m.espanol}</p>
                </article>
              ))}
            </section>
          )}

          {datos.notas.map((n) => (
            <section key={n.titulo} className={styles.nota}>
              <h2>{n.titulo}</h2>
              {n.puntos?.length > 0 && (
                <ul>
                  {n.puntos.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              )}
              {n.parrafos?.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {n.enlace && (
                <Link href={n.enlace.href} className={ui.sectionLink}>
                  {n.enlace.texto} <Icon name="arrow" size={16} />
                </Link>
              )}
            </section>
          ))}
        </div>

        <aside className={styles.aside}>
          <nav className={`${ui.card} ${ui.cardPad}`} aria-label={`Pasos del ${datos.titulo}`}>
            <h2 className={ui.cardTitle}>
              <Icon name="water" size={18} /> Los pasos
            </h2>
            <ol className={styles.index}>
              {datos.pasos.map((paso, i) => (
                <li key={paso.name}>
                  <a href={`#paso-${i + 1}`}>
                    <span>{i + 1}</span>
                    {paso.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className={`${ui.card} ${ui.cardPad} ${styles.tip}`}>
            <h2 className={ui.cardTitle}>
              <Icon name="mihrab" size={18} /> Después
            </h2>
            <p>Ya en estado de pureza, estás listo para rezar.</p>
            <Link href="/salat" className={ui.sectionLink}>
              Aprende a rezar <Icon name="arrow" size={16} />
            </Link>
            <Link href={otra.href} className={ui.sectionLink}>
              {otra.titulo} <Icon name="arrow" size={16} />
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
};

export default PaginaPureza;
