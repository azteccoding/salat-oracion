import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import EmptyFataawa from "@/components/fataawa/EmptyFataawa";
import NoticiaCard from "@/components/noticias/NoticiaCard";
import { NOTICIAS_PATH, NOTICIA_TEMAS, getNoticiaTema } from "@/constants/noticias";
import { listarNoticias } from "@/lib/noticias-db";
import { findNoticias } from "@/services/requests";
import fx from "@/styles/site/Fataawa.module.css";
import ui from "@/styles/site/ui.module.css";

// Cuántas noticias se muestran al principio y cuántas más con cada «Ver más»
const POR_TANDA = 10;

export default function Noticias({ todas }) {
  const router = useRouter();
  const temaSlug = typeof router.query.tema === "string" ? router.query.tema : "";
  const tema = getNoticiaTema(temaSlug);

  // Búsqueda en el servidor (MongoDB), con la misma lógica del buscador del diccionario
  const [searchWord, setSearchWord] = useState("");
  const [searchedWord, setSearchedWord] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [queryResult, setQueryResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [hasError, setHasError] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const palabra = searchWord.trim();
    if (!palabra) return limpiarBusqueda();

    setIsLoading(true);
    setHasError(false);
    const { data, hasExternalError } = await findNoticias(palabra);

    try {
      if (hasExternalError) {
        setHasError(true);
        setQueryResult([]);
      } else if (data?.data?.resultados?.length) {
        setQueryResult(data.data.resultados);
        setNotFound(false);
      } else {
        setQueryResult([]);
        setNotFound(true);
      }
    } catch (error) {
      console.log("==========ERROR FETCHING============");
      console.log(error);
      console.log("====================================");
    }

    setSearchedWord(palabra);
    setSearchActive(true);
    setIsLoading(false);
  }

  function limpiarBusqueda() {
    setSearchWord("");
    setSearchedWord("");
    setSearchActive(false);
    setQueryResult([]);
    setNotFound(false);
    setHasError(false);
  }

  // Lista base: resultados de la búsqueda o todas; luego el filtro de tema
  const resultados = useMemo(
    () => (searchActive ? queryResult : todas).filter((n) => !tema || n.tema === tema.slug),
    [searchActive, queryResult, todas, tema]
  );

  // «Ver más»: se reinicia al cambiar de tema o de búsqueda
  const clave = `${temaSlug}|${searchedWord}`;
  const [tanda, setTanda] = useState({ clave, n: POR_TANDA });
  if (tanda.clave !== clave) setTanda({ clave, n: POR_TANDA });
  const visibles = resultados.slice(0, tanda.clave === clave ? tanda.n : POR_TANDA);

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
          onSubmit={handleSubmit}
        >
          <Icon name="search" size={22} />
          <label htmlFor="buscar-noticia" className="sr-only">
            Buscar noticias
          </label>
          <input
            id="buscar-noticia"
            type="search"
            placeholder="Busca en titulares y en el texto de las noticias…"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            autoComplete="off"
          />
          <button type="submit" className={`${ui.btn} ${ui.btnGold}`} disabled={isLoading}>
            {isLoading ? "Buscando…" : "Buscar"}
          </button>
        </form>
      </PageHero>

      <div className="contenedor" style={{ paddingTop: 40 }}>
        <div className={`${ui.chips} ${fx.filters}`} role="group" aria-label="Filtrar por tema">
          <Link
            href={{ pathname: NOTICIAS_PATH }}
            shallow
            scroll={false}
            className={`${ui.chip} ${!tema ? ui.chipActive : ""}`}
          >
            Todas
          </Link>
          {NOTICIA_TEMAS.map((t) => (
            <Link
              key={t.slug}
              href={{ pathname: NOTICIAS_PATH, query: { tema: t.slug } }}
              shallow
              scroll={false}
              className={`${ui.chip} ${tema?.slug === t.slug ? ui.chipActive : ""}`}
            >
              {t.label}
            </Link>
          ))}
        </div>

        {searchActive && (
          <p className={fx.count}>
            {hasError
              ? "No se pudo consultar el servidor. Intenta de nuevo en un momento."
              : `Resultados para «${searchedWord}»`}{" "}
            <button type="button" className={`${ui.btn} ${ui.btnGhost}`} onClick={limpiarBusqueda}>
              Ver todas las noticias
            </button>
          </p>
        )}

        {isLoading ? (
          <p className={fx.count}>Buscando…</p>
        ) : todas.length === 0 && !searchActive ? (
          <EmptyFataawa title="Aún no hay noticias">Muy pronto, in šāʾa llāhu, publicaremos aquí las noticias.</EmptyFataawa>
        ) : resultados.length === 0 ? (
          <EmptyFataawa title="Sin resultados">
            No encontramos noticias {tema ? `en «${tema.label}» ` : ""}
            {searchActive && notFound ? `que mencionen «${searchedWord}»` : "todavía"}. Prueba con otras palabras o revisa todos los temas.
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

// Se ejecuta en el servidor (al construir y luego cada 60 s): a la lista solo llega la ficha
// de cada noticia, nunca el texto completo. La búsqueda pide al servidor con services/requests.js.
export async function getStaticProps() {
  let todas = [];
  try {
    todas = await listarNoticias();
  } catch (error) {
    console.error("[noticias] No se pudo leer MongoDB:", error.message);
  }
  return { props: { todas }, revalidate: 60 };
}
