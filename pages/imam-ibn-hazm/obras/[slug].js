import Link from "next/link";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import { tienePendientes } from "@/lib/seo";
import Secciones from "@/components/comunidad/Secciones";
import { obrasIbnHazm } from "@/data/ibn-hazm-obras";
import c from "@/styles/site/Comunidad.module.css";

// Una página por obra. El contenido se escribe en data/ibn-hazm-obras.js.
export default function Obra({ obra }) {
  return (
    <>
      <Seo title={`${obra.titulo} · Ibn Hazm`} description={obra.resumen} pendiente={tienePendientes(obra)} />
      <PageHero
        title={obra.titulo}
        arabic={obra.arabe}
        eyebrow={obra.tema}
        crumbs={[
          { href: "/imam-ibn-hazm", label: "Imam Ibn Hazm" },
          { href: "/imam-ibn-hazm/obras", label: "Sus obras" },
          { label: obra.titulo },
        ]}
      >
        <p>{obra.resumen}</p>
      </PageHero>

      <div className="contenedor" style={{ paddingTop: 48 }}>
        <article className={c.article}>
          <Secciones secciones={obra.secciones} />
        </article>
        <p style={{ marginTop: 32 }}>
          <Link href="/imam-ibn-hazm/obras" className={c.asideLink}>
            Ver todas sus obras <Icon name="arrow" size={16} />
          </Link>
        </p>
      </div>
    </>
  );
}

export function getStaticPaths() {
  return { paths: obrasIbnHazm.map((o) => ({ params: { slug: o.slug } })), fallback: false };
}

export function getStaticProps({ params }) {
  return { props: { obra: obrasIbnHazm.find((o) => o.slug === params.slug) } };
}
