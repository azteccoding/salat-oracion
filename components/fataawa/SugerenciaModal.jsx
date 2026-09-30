import Link from "next/link";
import { forwardRef, useState } from "react";
import Icon from "../Icon";
import { FATAAWA_PATH, INDEXED_TOPICS } from "@/constants/fataawa";
import styles from "@/styles/site/Fataawa.module.css";
import ui from "@/styles/site/ui.module.css";

// Ventana que aparece cuando alguien pide ver más de 15 fatāwá en «Todos»:
// le sugiere filtrar por tema o usar el buscador.
// Usa <dialog> nativo: atrapa el foco, se cierra con Esc y oscurece el fondo.
const SugerenciaModal = forwardRef(function SugerenciaModal({ total, onBuscar }, ref) {
  const [texto, setTexto] = useState("");
  const cerrar = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      className={styles.modal}
      aria-labelledby="sugerencia-titulo"
      onClick={(e) => {
        // Clic fuera de la tarjeta (sobre el fondo oscuro) = cerrar
        if (e.target === e.currentTarget) cerrar();
      }}
    >
      <div className={styles.modalCaja}>
        <button type="button" className={styles.modalCerrar} onClick={cerrar} aria-label="Cerrar">
          <Icon name="close" size={20} />
        </button>

        <p className={styles.modalArabe} lang="ar">
          فَاسْأَلُوا أَهْلَ الذِّكْرِ
        </p>
        <p className={styles.modalAya}>«Pregunten a la gente del Recuerdo» · Corán 16:43</p>
        <h2 id="sugerencia-titulo">¿Buscas algo en particular?</h2>
        <p className={styles.modalTexto}>
          Tenemos {total} fatāwá publicadas. Quizá te resulte más fácil revisarlas por tema o buscar directamente
          la que necesitas.
        </p>

        <form
          className={styles.modalBuscar}
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            cerrar();
            onBuscar(texto);
          }}
        >
          <Icon name="search" size={20} />
          <label htmlFor="buscar-modal" className="sr-only">
            Buscar en las fatāwá
          </label>
          <input
            id="buscar-modal"
            type="search"
            placeholder="Escribe una palabra, tema o número…"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            autoComplete="off"
          />
          <button type="submit" className={`${ui.btn} ${ui.btnPrimary}`}>
            Buscar
          </button>
        </form>

        <p className={styles.modalSubtitulo}>O elige un tema</p>
        <div className={ui.chips}>
          {INDEXED_TOPICS.map((t) => (
            <Link
              key={t.slug}
              href={{ pathname: FATAAWA_PATH, query: { tema: t.slug } }}
              shallow
              scroll={false}
              className={ui.chip}
              onClick={cerrar}
            >
              {t.label}
            </Link>
          ))}
        </div>

        <button type="button" className={`${ui.btn} ${ui.btnGhost} ${styles.modalSeguir}`} onClick={cerrar}>
          Seguir viendo la lista
        </button>
      </div>
    </dialog>
  );
});

export default SugerenciaModal;
