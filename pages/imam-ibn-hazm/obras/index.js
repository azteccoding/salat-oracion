import Link from "next/link";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import NavIbnHazm from "@/components/ibn-hazm/NavIbnHazm";
import { obrasIbnHazm } from "@/data/ibn-hazm-obras";
import c from "@/styles/site/Comunidad.module.css";

// La lista sale de data/ibn-hazm-obras.js: edita ahí, no aquí.
export default function ObrasIbnHazm() {
  return (
    <>
      <Seo title="Obras de Ibn Hazm" description="Las obras del Imam Ibn Hazm de Córdoba." />
      <PageHero
        title="Sus obras"
        arabic="مؤلفات ابن حزم"
        crumbs={[{ href: "/imam-ibn-hazm", label: "Imam Ibn Hazm" }, { label: "Sus obras" }]}
      >
        <p>Fiqh, uṣūl, teología, ética y poesía: un legado que abarca casi todo el saber de al-Andalus.</p>
      </PageHero>

      <div className="contenedor" style={{ paddingTop: 48 }}>
        <div className={c.enlaces} style={{ marginTop: 0 }}>
          {obrasIbnHazm.map((o) => (
            <Link key={o.slug} href={`/imam-ibn-hazm/obras/${o.slug}`} className={c.enlace}>
              <span className="arabe" lang="ar">
                {o.arabe}
              </span>
              <strong>{o.titulo}</strong>
              <span className={c.enlaceTexto}>{o.resumen}</span>
              <span className={c.enlaceMas}>
                {o.tema} <Icon name="arrow" size={16} />
              </span>
            </Link>
          ))}
        </div>
        <NavIbnHazm actual="/imam-ibn-hazm/obras" />
      </div>
    </>
  );
}
