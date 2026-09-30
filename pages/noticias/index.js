import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import EmptyFataawa from "@/components/fataawa/EmptyFataawa";
import { normalize } from "@/components/fataawa/format";
import NoticiaCard from "@/components/noticias/NoticiaCard";
import { NOTICIAS_PATH, NOTICIA_TEMAS, getNoticiaTema } from "@/constants/noticias";
import { fichaNoticia, noticiasEnListas } from "@/data/noticias";
import fx from "@/styles/site/Fataawa.module.css";
import ui from "@/styles/site/ui.module.css";

// Cuántas noticias se muestran al principio y cuántas más con cada «Ver más»
const POR_TANDA = 10;

const buscable = (n) => normalize([n.title, n.resumen, getNoticiaTema(n.tema)?.label].join(" "));

export default function Noticias({ todas }) {
  const router = useRouter();
  const urlQ = typeof router.query.q === "string" ? router.query.q : "";
  const [borrador, setBorrador] = useState({ from: urlQ, value: urlQ });
  const q = borrador.from === urlQ ? borrador.value : urlQ;
  const setQ = (value) => setBorrador({ from: urlQ, value });
  const temaSlug = typeof router.query.tema === "string" ? router.query.tema : "";
  const tema = getNoticiaTema(temaSlug);

  const resultados = useMemo(() => {
    const terminos = normalize(q).split(/\s+/).filter(Boolean);
    return todas.filter((n) => (!tema || n.tema === tema.slug) && terminos.every((t) => buscable(n).includes(t)));
  }, [todas, q, tema]);

  // «Ver más»: se reinicia al cambiar de tema o de búsqueda
  const clave = `${temaSlug}|${q}`;
  const [tanda, setTanda] = useState({ clave, n: POR_TANDA });
  if (tanda.clave !== clave) setTanda({ clave, n: POR_TANDA });
  const visibles = resultados.slice(0, tanda.clave === clave ? tanda.n : POR_TANDA);

  const actualizarUrl = (extra) => {
    const query = { ...(temaSlug && { tema: temaSlug }), ...(q && { q }), ...extra };
    Object.keys(query).forEach((k) => !query[k] && delete query[k]);
    router.replace({ pathname: NOTICIAS_PATH, query }, undefined, { shallow: true, scroll: false });
  };

  return (
    <>
      <Seo
        title="Noticias de actualidad"
        description="Noticias de nuestra comunidad, del islam en México y del mundo islámico, desde León, Guanajuato."
      />

      <PageHero title="Noticias de actualidad" arabic="الأخبار" crumbs={[{ label: "Noticias" }]}>
        <p>Lo que pasa en nuestra comunidad, en México y en el mundo islámico.</p>
        <form
          className={fx.searchBox}
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            actualizarUrl({ q });
          }}
        >
          <Icon name="search" size={22} />
          <label htmlFor="buscar-noticia" className="sr-only">
            Buscar noticias
          </label>
          <input
            id="buscar-noticia"
            type="search"
            placeholder="Busca por palabra o tema…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoComplete="off"
          />
          <button type="submit" className={`${ui.btn} ${ui.btnGold}`}>
            Buscar
          </button>
        </form>
      </PageHero>

      <div className="contenedor" style={{ paddingTop: 40 }}>
        <div className={`${ui.chips} ${fx.filters}`} role="group" aria-label="Filtrar por tema">
          <Link
            href={{ pathname: NOTICIAS_PATH, query: q ? { q } : {} }}
            shallow
            scroll={false}
            className={`${ui.chip} ${!tema ? ui.chipActive : ""}`}
          >
            Todas
          </Link>
          {NOTICIA_TEMAS.map((t) => (
            <Link
              key={t.slug}
              href={{ pathname: NOTICIAS_PATH, query: { tema: t.slug, ...(q && { q }) } }}
              shallow
              scroll={false}
              className={`${ui.chip} ${tema?.slug === t.slug ? ui.chipActive : ""}`}
            >
              {t.label}
            </Link>
          ))}
        </div>

        {todas.length === 0 ? (
          <EmptyFataawa title="Aún no hay noticias">Muy pronto, in šāʾa llāhu, publicaremos aquí las noticias.</EmptyFataawa>
        ) : resultados.length === 0 ? (
          <EmptyFataawa title="Sin resultados">
            No encontramos noticias {tema ? `en «${tema.label}» ` : ""}
            {q ? `que coincidan con «${q}»` : "todavía"}. Prueba con otras palabras o revisa todos los temas.
          </EmptyFataawa>
        ) : (
          <>
            <p className={fx.count}>
              {visibles.length < resultados.length ? `Mostrando ${visibles.length} de ` : ""}
              {resultados.length} {resultados.length === 1 ? "noticia" : "noticias"}
              {tema ? ` en ${tema.label}` : ""}
            </p>
            <div className={fx.list}>
              {visibles.map((n) => (
                <NoticiaCard key={n.slug} noticia={n} />
              ))}
            </div>
            {visibles.length < resultados.length && (
              <div className={fx.verMas}>
                <button
                  type="button"
                  className={`${ui.btn} ${ui.btnGhost}`}
                  onClick={() => setTanda({ clave, n: visibles.length + POR_TANDA })}
                >
                  Ver más <Icon name="chevron" size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

// Se ejecuta al construir el sitio: a la lista solo llega la ficha de cada noticia, nunca el texto completo.
export async function getStaticProps() {
  return { props: { todas: noticiasEnListas().map(fichaNoticia) } };
}
