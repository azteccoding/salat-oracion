import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import Enlaces from "@/components/comunidad/Enlaces";
import Secciones from "@/components/comunidad/Secciones";
import Silsila from "@/components/comunidad/Silsila";
import { NUESTRA_TARIQA as T, TESOROS, VALORES } from "@/constants/content";
import c from "@/styles/site/Comunidad.module.css";
import ui from "@/styles/site/ui.module.css";

const ICONOS_PRACTICA = ["star", "scale", "book"];

export default function NuestraTariqa() {
  return (
    <>
      <Seo title={`${T.titulo}: ${T.nombre}`} description={T.resumen} />

      <PageHero title={T.titulo} arabic={T.nombreArabe} eyebrow={T.nombre} crumbs={[{ label: T.titulo }]}>
        <p>{T.resumen}</p>
      </PageHero>

      <div className={`contenedor ${c.layout}`}>
        <div>
          <article className={c.article}>
            <Secciones secciones={T.secciones} />
          </article>

          <section className={c.bloque}>
            <div className={ui.sectionHead}>
              <h2 className={ui.sectionTitle}>Lo que custodiamos</h2>
            </div>
            <div className={`${c.rejilla} ${c.rejilla2}`}>
              {VALORES.map((v) => (
                <div key={v.titulo} className={c.tarjeta}>
                  <h3>{v.titulo}</h3>
                  <p>{v.texto}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={c.bloque}>
            <div className={ui.sectionHead}>
              <h2 className={ui.sectionTitle}>Nuestra práctica</h2>
            </div>
            <div className={c.rejilla}>
              {T.practica.map((p, i) => (
                <div key={p.titulo} className={c.tarjeta}>
                  <span className={c.tarjetaIcono}>
                    <Icon name={ICONOS_PRACTICA[i % ICONOS_PRACTICA.length]} size={22} />
                  </span>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </div>
              ))}
            </div>
          </section>

          <Enlaces actual="/nuestra-tariqa" />
        </div>

        <aside className={c.aside}>
          <section className={`${ui.card} ${ui.cardPad}`}>
            <h2 className={ui.cardTitle}>
              <Icon name="link" size={18} /> Silsila
            </h2>
            <p className={c.asideIntro}>Del Profeta ﷺ hasta nuestros días, tal como nos fue narrada.</p>
            <Silsila grande />
          </section>

          <section className={`${ui.card} ${ui.cardPad}`}>
            <h2 className={ui.cardTitle}>
              <Icon name="star" size={18} /> Tesoros de la hermandad
            </h2>
            <ul className={c.tesoros}>
              {TESOROS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <section className={c.cita}>
        <div className="contenedor">
          <p className={c.citaTexto}>«{T.enseñanza.texto}»</p>
          <p className={c.citaFuente}>{T.enseñanza.fuente}</p>
        </div>
      </section>
    </>
  );
}
