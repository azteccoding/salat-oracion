import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import Enlaces from "@/components/comunidad/Enlaces";
import Secciones from "@/components/comunidad/Secciones";
import { NUESTRA_RECITACION as R } from "@/constants/content";
import c from "@/styles/site/Comunidad.module.css";
import ui from "@/styles/site/ui.module.css";

export default function NuestraRecitacion() {
  return (
    <>
      <Seo title={`${R.titulo}: ${R.subtitulo}`} description={R.resumen} />

      <PageHero
        title={`${R.titulo}: ${R.subtitulo.charAt(0).toLowerCase()}${R.subtitulo.slice(1)}`}
        arabic={R.nombreArabe}
        eyebrow="El Corán como lo recitamos"
        crumbs={[{ href: "/nuestra-tariqa", label: "Nuestra Tarīqa" }, { label: R.titulo }]}
      >
        <p>{R.resumen}</p>
      </PageHero>

      <div className="contenedor">
        <div className={c.acciones}>
          {R.enlaces.map((e) => (
            <a key={e.href} href={e.href} target="_blank" rel="noopener noreferrer" className={c.accion}>
              <span className={c.tarjetaIcono}>
                <Icon name={e.icono} size={22} />
              </span>
              <strong>{e.titulo}</strong>
              <span className={c.enlaceTexto}>{e.texto}</span>
              <span className={c.enlaceMas}>
                {e.boton} <Icon name="external" size={15} />
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className={`contenedor ${c.layout}`}>
        <div>
          <article className={c.article}>
            <Secciones secciones={R.secciones} />
          </article>
          <Enlaces actual="/nuestra-recitacion" />
        </div>

        <aside className={c.aside}>
          <section className={`${ui.card} ${ui.cardPad}`}>
            <h2 className={ui.cardTitle}>
              <Icon name="book" size={18} /> La lectura
            </h2>
            <dl className={c.datos}>
              {R.ficha.map((d) => (
                <div key={d.etiqueta}>
                  <dt>{d.etiqueta}</dt>
                  <dd>{d.valor}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className={`${ui.card} ${ui.cardPad}`}>
            <h2 className={ui.cardTitle}>
              <Icon name="scale" size={18} /> Según Ibn Hajar
            </h2>
            <p className={c.asideIntro}>Juicios de Taqrīb at-Tahḏīb sobre los dos transmisores.</p>
            <ul className={c.juicios}>
              {R.juicios.map((j) => (
                <li key={j.nombre} className={j.favorable ? c.juicioBueno : c.juicioMalo}>
                  <strong>{j.nombre}</strong>
                  <span className="arabe" lang="ar">
                    {j.arabe}
                  </span>
                  <em>{j.traduccion}</em>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </>
  );
}
