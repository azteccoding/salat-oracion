import Link from "next/link";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import Secciones from "@/components/comunidad/Secciones";
import NavIbnHazm from "@/components/ibn-hazm/NavIbnHazm";
import c from "@/styles/site/Comunidad.module.css";
import ui from "@/styles/site/ui.module.css";

// Página a la que solo se llega desde el Home (no está en el menú).

// =====================================================================
//  CONTENIDO — escribe aquí a mano
// =====================================================================

const RESUMEN =
  "Poeta, visir, jurista y teólogo andalusí; el gran sistematizador del método ẓāhirī.";

// Cada sección: { titulo, parrafos: ["…", "…"], foto?: { src, alt, ancho, alto, pie } }
// Las fotos van en public/img/ibn-hazm/.
const VIDA = [
  {
    titulo: "Nacimiento y linaje en Córdoba",
    parrafos: ["✍️ Escribe aquí…"],
  },
  {
    titulo: "Juventud entre palacios y la fitna",
    parrafos: ["✍️ Escribe aquí…"],
  },
  {
    titulo: "Visir y exiliado",
    parrafos: ["✍️ Escribe aquí…"],
  },
  {
    titulo: "Del madhab šāfiʿí al método ẓāhirī",
    parrafos: ["✍️ Escribe aquí…"],
  },
  {
    titulo: "La quema de sus libros en Sevilla",
    parrafos: ["✍️ Escribe aquí…"],
  },
  {
    titulo: "Retiro y muerte en Manta Līšam",
    parrafos: ["✍️ Escribe aquí…"],
  },
];

// Ficha lateral. Revisa las fechas antes de publicar.
const DATOS = [
  { dt: "Nombre", dd: "ʿAlī ibn Aḥmad ibn Saʿīd ibn Ḥazm" },
  { dt: "Kunya", dd: "Abū Muḥammad" },
  { dt: "Nacimiento", dd: "Córdoba, 384 H / 994 e. c." },
  { dt: "Muerte", dd: "Manta Līšam (Huelva), 456 H / 1064 e. c." },
  { dt: "Escuela", dd: "Ẓāhirí" },
];

// =====================================================================

export default function ImamIbnHazm() {
  return (
    <>
      <Seo title="Imam Ibn Hazm de Córdoba" description={RESUMEN} type="profile" />

      <PageHero
        title="Imam Ibn Hazm de Córdoba"
        arabic="أبو محمد علي بن أحمد بن سعيد بن حزم الأندلسي"
        eyebrow="Nuestro imam en el fiqh"
        crumbs={[{ label: "Imam Ibn Hazm" }]}
      >
        <p>{RESUMEN}</p>
      </PageHero>

      <div className={`contenedor ${c.layout}`}>
        <div>
          <article className={c.article}>
            <Secciones secciones={VIDA} />
          </article>

          <NavIbnHazm actual="/imam-ibn-hazm" />
        </div>

        <aside className={c.aside}>
          <section className={`${ui.card} ${ui.cardPad}`}>
            <h2 className={ui.cardTitle}>
              <Icon name="book" size={18} /> Ficha
            </h2>
            <dl className={c.datos}>
              {DATOS.map((d) => (
                <div key={d.dt}>
                  <dt>{d.dt}</dt>
                  <dd>{d.dd}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className={`${ui.card} ${ui.cardPad}`}>
            <h2 className={ui.cardTitle}>
              <Icon name="scale" size={18} /> Su fiqh hoy
            </h2>
            <p className={c.asideIntro}>Nuestras fatāwá siguen su método ẓāhirī.</p>
            <Link href="/fataawa-zahiri-fiqh" className={c.asideLink}>
              Ver fatāwá <Icon name="arrow" size={16} />
            </Link>
          </section>
        </aside>
      </div>
    </>
  );
}
