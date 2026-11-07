import { useMemo, useState } from "react";
import DownloadCard from "@/components/DownloadCard";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import { categoriasDescargas, descargas } from "@/data/descargas";
import styles from "@/styles/site/Descargas.module.css";
import fx from "@/styles/site/Fataawa.module.css";

// Sin acentos ni puntos diacríticos: «tafsir» encuentra «tafsīr».
const normalizar = (texto) =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[ʿʾ\u0027\u2019]/g, "")
    .toLowerCase();

// Primero los destacados (campo `orden`); despues, de lo mas reciente a lo mas antiguo.
const recientes = [...descargas].sort(
  (a, b) => (a.orden ?? Infinity) - (b.orden ?? Infinity) || b.fecha.localeCompare(a.fecha),
);

export default function Descargas() {
  const [categoria, setCategoria] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");

  const visibles = useMemo(() => {
    const q = normalizar(busqueda.trim());
    return recientes.filter(
      (d) =>
        (categoria === "Todas" || d.categoria === categoria) &&
        (!q || normalizar(`${d.title} ${d.teaser} ${d.description}`).includes(q)),
    );
  }, [categoria, busqueda]);

  return (
    <>
      <Seo
        title="Descargas"
        description="Libros y materiales gratuitos para aprender sobre el islam."
      />
      <PageHero
        title="Libros y descargas"
        arabic="المكتبة"
        crumbs={[{ label: "Descargas" }]}
      >
        <p>
          Materiales gratuitos para estudiar en casa, compartir con tu familia o
          leer en la musala.
        </p>
      </PageHero>
      <div className={`contenedor ${styles.biblioteca}`}>
        <div className={styles.filtros}>
          <input
            type="search"
            className={styles.buscador}
            placeholder="Buscar por título o tema"
            aria-label="Buscar en las descargas"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <div className={styles.chips}>
            {["Todas", ...categoriasDescargas].map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={categoria === c}
                className={categoria === c ? styles.chipActivo : styles.chip}
                onClick={() => setCategoria(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <p className={fx.count}>
          {visibles.length} {visibles.length === 1 ? "archivo" : "archivos"}
        </p>
        {visibles.length ? (
          <div className={styles.grid}>
            {visibles.map((d) => (
              <DownloadCard key={d.slug} item={d} compact />
            ))}
          </div>
        ) : (
          <p className={styles.vacio}>No encontramos descargas con esa búsqueda.</p>
        )}
      </div>
    </>
  );
}
