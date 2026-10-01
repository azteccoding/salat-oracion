import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useRef, useState } from "react";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import EmptyFataawa from "@/components/fataawa/EmptyFataawa";
import BusquedaEnRespuestas from "@/components/fataawa/BusquedaEnRespuestas";
import FataawaAside from "@/components/fataawa/FataawaAside";
import FatwaCard from "@/components/fataawa/FatwaCard";
import SugerenciaModal from "@/components/fataawa/SugerenciaModal";
import { FATAAWA_PATH, INDEXED_TOPICS, getTopic } from "@/constants/fataawa";
import { coincide, preparar } from "@/lib/busqueda";
import { listarFataawa } from "@/lib/fataawa-db";
import styles from "@/styles/site/Fataawa.module.css";
import ui from "@/styles/site/ui.module.css";

// Texto de cada ficha ya sin diacríticos ni letras dobles (ver lib/busqueda.js)
const searchable = (f) =>
  preparar(
    [f.title, f.summary, f.extracto, f.codigo, getTopic(f.topic)?.label, getTopic(f.subtopic)?.label].join(" ")
  );

// En «Todos» (sin tema ni búsqueda) la lista se muestra por tandas:
// primero 5; con «Ver más», hasta 15; si se pide más, se sugiere filtrar o buscar.
const TANDAS = [5, 15];

// ¿La fatwa pertenece al tema (o subtema) elegido?
const enTema = (f, t) => !t || f.topic === t.slug || f.subtopic === t.slug;

export default function FataawaIndex({ all }) {
  const router = useRouter();
  const urlQ = typeof router.query.q === "string" ? router.query.q : "";
  // Lo que se escribe en el buscador; si la búsqueda cambia desde la URL (p. ej. el
  // buscador del encabezado), manda la URL.
  const [draft, setDraft] = useState({ from: urlQ, value: urlQ });
  const q = draft.from === urlQ ? draft.value : urlQ;
  const setQ = (value) => setDraft({ from: urlQ, value });
  const tema = typeof router.query.tema === "string" ? router.query.tema : "";
  const activeTopic = getTopic(tema);
  // Tema principal activo (si se eligió un subtema, su tema padre) para mostrar los subtemas
  const activeMain = activeTopic?.parent ? getTopic(activeTopic.parent) : activeTopic;

  // El texto buscable de cada ficha se prepara una sola vez
  const indice = useMemo(() => all.map((f) => [f, searchable(f)]), [all]);

  const results = useMemo(
    () => indice.filter(([f, texto]) => enTema(f, activeTopic) && coincide(texto, q)).map(([f]) => f),
    [indice, q, activeTopic]
  );

  // Tanda visible en «Todos». Se reinicia sola al cambiar de tema o de búsqueda.
  const modalRef = useRef(null);
  const clave = `${tema}|${q}`;
  const [tanda, setTanda] = useState({ clave, nivel: 0 });
  if (tanda.clave !== clave) setTanda({ clave, nivel: 0 }); // al volver a «Todos» se empieza de nuevo en 5
  const nivel = tanda.clave === clave ? tanda.nivel : 0;
  const enTodos = !activeTopic && !q.trim();
  const tope = enTodos ? TANDAS[nivel] : Infinity;
  const visibles = results.slice(0, tope);
  const hayMas = results.length > visibles.length;

  const verMas = () => {
    if (nivel < TANDAS.length - 1) setTanda({ clave, nivel: nivel + 1 });
    else modalRef.current?.showModal();
  };

  const updateUrl = (next) => {
    const query = { ...(tema && { tema }), ...(q && { q }), ...next };
    Object.keys(query).forEach((k) => !query[k] && delete query[k]);
    router.replace({ pathname: FATAAWA_PATH, query }, undefined, { shallow: true, scroll: false });
  };

  return (
    <>
      <Seo
        title="Fatwas de fiqh ẓāhirī (zahiri): preguntas y respuestas"
        description="Preguntas y respuestas de jurisprudencia islámica según el método ẓāhirī de Ibn Ḥazm: el Corán, la Sunna auténtica y el consenso."
      />

      <PageHero
        title="Fatāwá de fiqh ẓāhirī"
        arabic="فتاوى في الفقه الظاهري"
        crumbs={[{ label: "Fatāwá" }]}
      >
        <p>
          Respuestas a preguntas de jurisprudencia islámica según el método de Ibn Ḥazm de Córdoba: el texto
          manifiesto del Corán, la Sunna auténtica y el consenso, con sus pruebas a la vista.
        </p>
        <form
          className={styles.searchBox}
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            updateUrl({ q });
          }}
        >
          <Icon name="search" size={22} />
          <label htmlFor="buscar-fatwa" className="sr-only">
            Buscar en las fatāwá
          </label>
          <input
            id="buscar-fatwa"
            type="search"
            placeholder="Busca por tema, palabra o número de fatwa…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoComplete="off"
          />
          <button type="submit" className={`${ui.btn} ${ui.btnGold}`}>
            Buscar
          </button>
        </form>
      </PageHero>

      <div className={`contenedor ${styles.layout}`}>
        <div>
          <div className={`${ui.chips} ${styles.filters}`} role="group" aria-label="Filtrar por tema">
            <Link
              href={{ pathname: FATAAWA_PATH, query: q ? { q } : {} }}
              shallow
              scroll={false}
              className={`${ui.chip} ${!activeTopic ? ui.chipActive : ""}`}
            >
              Todos
            </Link>
            {INDEXED_TOPICS.map((t) => (
              <Link
                key={t.slug}
                href={{ pathname: FATAAWA_PATH, query: { tema: t.slug, ...(q && { q }) } }}
                shallow
                scroll={false}
                className={`${ui.chip} ${activeMain?.slug === t.slug ? ui.chipActive : ""}`}
              >
                {t.label}
              </Link>
            ))}
          </div>

          {activeMain?.sub && (
            <div className={`${ui.chips} ${styles.filters} ${styles.subFilters}`} role="group" aria-label="Subtemas">
              {activeMain.sub.map((s) => (
                <Link
                  key={s.slug}
                  href={{ pathname: FATAAWA_PATH, query: { tema: s.slug, ...(q && { q }) } }}
                  shallow
                  scroll={false}
                  className={`${ui.chip} ${activeTopic?.slug === s.slug ? ui.chipActive : ""}`}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          )}

          {all.length === 0 ? (
            <EmptyFataawa />
          ) : results.length === 0 ? (
            <>
            <EmptyFataawa title="Sin resultados">
              No encontramos fatāwá {activeTopic ? `en «${activeTopic.label}» ` : ""}
              {q ? `que coincidan con «${q}»` : "todavía"}. Prueba con otras palabras o revisa todos los temas.
            </EmptyFataawa>
            <BusquedaEnRespuestas q={q} tema={activeTopic?.slug || ""} />
            </>
          ) : (
            <>
              <p className={styles.count}>
                {hayMas ? `Mostrando ${visibles.length} de ` : ""}
                {results.length} {results.length === 1 ? "fatwa" : "fatāwá"}
                {activeTopic ? ` en ${activeTopic.label}` : ""}
              </p>
              <div className={styles.list}>
                {visibles.map((f) => (
                  <FatwaCard key={f.slug} fatwa={f} />
                ))}
              </div>
              {hayMas && (
                <div className={styles.verMas}>
                  <button type="button" className={`${ui.btn} ${ui.btnGhost}`} onClick={verMas}>
                    Ver más <Icon name="chevron" size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <FataawaAside />
      </div>

      <SugerenciaModal ref={modalRef} total={results.length} onBuscar={(texto) => updateUrl({ q: texto.trim() })} />
    </>
  );
}

// Se ejecuta en el servidor (al construir y luego cada 60 s): al visitante solo le llega
// la ficha de cada fatwa (título, resumen, código…), nunca las respuestas completas.
export async function getStaticProps() {
  let all = [];
  try {
    all = await listarFataawa();
  } catch (error) {
    console.error("[fataawa] No se pudo leer MongoDB:", error.message);
  }
  return { props: { all }, revalidate: 60 };
}
