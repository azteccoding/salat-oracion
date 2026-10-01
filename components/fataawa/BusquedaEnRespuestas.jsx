import { useState } from "react";
import FatwaCard from "@/components/fataawa/FatwaCard";
import { findFataawa } from "@/services/requests";
import styles from "@/styles/site/Fataawa.module.css";
import ui from "@/styles/site/ui.module.css";

// Cuando la búsqueda rápida (títulos y resúmenes) no encuentra nada, este botón
// pregunta al servidor, que busca también DENTRO de las respuestas en MongoDB.
// Misma lógica que el buscador del diccionario: isLoading, resultado o «no encontrado».
const BusquedaEnRespuestas = ({ q, tema }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [queryResult, setQueryResult] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [buscado, setBuscado] = useState("");

  // Si cambia lo que se busca, se olvida el resultado anterior
  const clave = `${q}|${tema}`;
  if (searchActive && buscado !== clave) {
    setSearchActive(false);
    setQueryResult([]);
    setNotFound(false);
    setHasError(false);
  }

  async function handleSearch() {
    if (!q.trim()) return;
    setIsLoading(true);
    setHasError(false);

    const { data, hasExternalError } = await findFataawa(q.trim(), tema);

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

    setBuscado(clave);
    setSearchActive(true);
    setIsLoading(false);
  }

  if (!q.trim()) return null;

  return (
    <div className={styles.busquedaProfunda}>
      {!searchActive && (
        <button type="button" className={`${ui.btn} ${ui.btnPrimary}`} onClick={handleSearch} disabled={isLoading}>
          {isLoading ? "Buscando…" : `Buscar «${q.trim()}» dentro de las respuestas`}
        </button>
      )}

      {searchActive && hasError && <p className={styles.count}>No se pudo consultar el servidor. Intenta de nuevo en un momento.</p>}

      {searchActive && notFound && !hasError && (
        <p className={styles.count}>Tampoco aparece dentro de las respuestas.</p>
      )}

      {searchActive && queryResult.length > 0 && (
        <>
          <p className={styles.count}>
            {queryResult.length} {queryResult.length === 1 ? "fatwa menciona" : "fatāwá mencionan"} «{q.trim()}» en su respuesta
          </p>
          <div className={styles.list}>
            {queryResult.map((f) => (
              <FatwaCard key={f.slug} fatwa={f} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BusquedaEnRespuestas;
