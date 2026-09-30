import Link from "next/link";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import Enlaces from "@/components/comunidad/Enlaces";
import Silsila from "@/components/comunidad/Silsila";
import { NUESTRO_MAULANA as M } from "@/constants/content";
import c from "@/styles/site/Comunidad.module.css";
import ui from "@/styles/site/ui.module.css";

export default function NuestroMaulana() {
  return (
    <>
      <Seo title={`${M.titulo}: ${M.nombre}`} description={M.resumen} type="profile" />

      <PageHero
        title={M.nombre}
        arabic={M.nombreArabe}
        eyebrow={M.titulo}
        crumbs={[{ href: "/nuestra-tariqa", label: "Nuestra Tarīqa" }, { label: M.titulo }]}
      >
        <p>
          <em>{M.honorifico}.</em> {M.resumen}
        </p>
      </PageHero>

      <div className={`contenedor ${c.layout}`}>
        <div>
          <article className={c.article}>
            <div className={`${c.texto} ${c.capitular}`}>
              {M.parrafos.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </article>
          <Enlaces actual="/nuestro-maulana" />
        </div>

        <aside className={c.aside}>
          <section className={`${ui.card} ${ui.cardPad}`}>
            <h2 className={ui.cardTitle}>
              <Icon name="book" size={18} /> Datos
            </h2>
            <dl className={c.datos}>
              {M.datos.map((d) => (
                <div key={d.etiqueta}>
                  <dt>{d.etiqueta}</dt>
                  <dd>{d.valor}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className={`${ui.card} ${ui.cardPad}`}>
            <h2 className={ui.cardTitle}>
              <Icon name="link" size={18} /> Silsila
            </h2>
            <Silsila resaltar="/nuestro-maulana" />
            <Link href="/nuestra-tariqa" className={c.asideLink}>
              Conocer la tarīqa <Icon name="arrow" size={16} />
            </Link>
          </section>
        </aside>
      </div>

      <section className={c.cita}>
        <div className="contenedor">
          <p className={c.citaTexto}>«{M.frase}»</p>
          <p className={c.citaFuente}>Saludo con el que maulana ʿIyad abría sus clases</p>
        </div>
      </section>
    </>
  );
}
