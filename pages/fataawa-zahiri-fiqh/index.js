import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import EmptyFataawa from "@/components/fataawa/EmptyFataawa";
import FataawaAside from "@/components/fataawa/FataawaAside";
import FatwaCard from "@/components/fataawa/FatwaCard";
import { normalize } from "@/components/fataawa/format";
import { FATAAWA_PATH, FATWA_TOPICS, getTopic } from "@/constants/fataawa";
import { sortedFataawa } from "@/data/fataawa";
import styles from "@/styles/site/Fataawa.module.css";
import ui from "@/styles/site/ui.module.css";

const searchable = (f) =>
  normalize([f.title, f.summary, f.question, String(f.number), getTopic(f.topic)?.label].join(" "));

export default function FataawaIndex() {
  const router = useRouter();
  const urlQ = typeof router.query.q === "string" ? router.query.q : "";
  // Lo que se escribe en el buscador; si la búsqueda cambia desde la URL (p. ej. el
  // buscador del encabezado), manda la URL.
  const [draft, setDraft] = useState({ from: urlQ, value: urlQ });
  const q = draft.from === urlQ ? draft.value : urlQ;
  const setQ = (value) => setDraft({ from: urlQ, value });
  const tema = typeof router.query.tema === "string" ? router.query.tema : "";
  const activeTopic = getTopic(tema);

  const all = useMemo(() => sortedFataawa(), []);
  const results = useMemo(() => {
    const terms = normalize(q).split(/\s+/).filter(Boolean);
    return all.filter(
      (f) => (!activeTopic || f.topic === activeTopic.slug) && terms.every((t) => searchable(f).includes(t))
    );
  }, [all, q, activeTopic]);

  const updateUrl = (next) => {
    const query = { ...(tema && { tema }), ...(q && { q }), ...next };
    Object.keys(query).forEach((k) => !query[k] && delete query[k]);
    router.replace({ pathname: FATAAWA_PATH, query }, undefined, { shallow: true, scroll: false });
  };

  return (
    <>
      <Seo
        title="Fatāwá de fiqh ẓāhirī"
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
            {FATWA_TOPICS.map((t) => (
              <Link
                key={t.slug}
                href={{ pathname: FATAAWA_PATH, query: { tema: t.slug, ...(q && { q }) } }}
                shallow
                scroll={false}
                className={`${ui.chip} ${activeTopic?.slug === t.slug ? ui.chipActive : ""}`}
              >
                {t.label}
              </Link>
            ))}
          </div>

          {all.length === 0 ? (
            <EmptyFataawa />
          ) : results.length === 0 ? (
            <EmptyFataawa title="Sin resultados">
              No encontramos fatāwá {activeTopic ? `en «${activeTopic.label}» ` : ""}
              {q ? `que coincidan con «${q}»` : "todavía"}. Prueba con otras palabras o revisa todos los temas.
            </EmptyFataawa>
          ) : (
            <>
              <p className={styles.count}>
                {results.length} {results.length === 1 ? "fatwa" : "fatāwá"}
                {activeTopic ? ` en ${activeTopic.label}` : ""}
              </p>
              <div className={styles.list}>
                {results.map((f) => (
                  <FatwaCard key={f.slug} fatwa={f} />
                ))}
              </div>
            </>
          )}
        </div>

        <FataawaAside />
      </div>
    </>
  );
}
