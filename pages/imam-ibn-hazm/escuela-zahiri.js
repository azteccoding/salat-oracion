import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import Secciones from "@/components/comunidad/Secciones";
import NavIbnHazm from "@/components/ibn-hazm/NavIbnHazm";
import c from "@/styles/site/Comunidad.module.css";

// =====================================================================
//  CONTENIDO — escribe aquí a mano
// =====================================================================

const RESUMEN = "El madhab ẓāhirī: Corán, Sunna auténtica e iŷmāʿ, sin qiyās ni opinión.";

const ESCUELA = [
  { titulo: "Dāwūd al-Ẓāhirī, el fundador", parrafos: ["✍️ Escribe aquí…"] },
  { titulo: "Las fuentes: texto, consenso y dalīl", parrafos: ["✍️ Escribe aquí…"] },
  { titulo: "El rechazo del qiyās y del taqlīd", parrafos: ["✍️ Escribe aquí…"] },
  { titulo: "Ibn Ḥazm, sistematizador de la escuela", parrafos: ["✍️ Escribe aquí…"] },
  { titulo: "Los ẓāhiríes después de Ibn Ḥazm", parrafos: ["✍️ Escribe aquí…"] },
  { titulo: "Por qué seguimos este método", parrafos: ["✍️ Escribe aquí…"] },
];

// =====================================================================

export default function EscuelaZahiri() {
  return (
    <>
      <Seo title="La escuela ẓāhirī" description={RESUMEN} />
      <PageHero
        title="La escuela ẓāhirī"
        arabic="المذهب الظاهري"
        crumbs={[{ href: "/imam-ibn-hazm", label: "Imam Ibn Hazm" }, { label: "Su escuela" }]}
      >
        <p>{RESUMEN}</p>
      </PageHero>

      <div className="contenedor" style={{ paddingTop: 48 }}>
        <article className={c.article}>
          <Secciones secciones={ESCUELA} />
        </article>
        <NavIbnHazm actual="/imam-ibn-hazm/escuela-zahiri" />
      </div>
    </>
  );
}
