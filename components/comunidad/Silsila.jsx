import Link from "next/link";
import { SILSILA } from "@/constants/content";
import styles from "@/styles/site/Comunidad.module.css";

// Cadena de maestros. `grande` la muestra con más aire (página de la tarīqa).
const Silsila = ({ grande = false, resaltar }) => (
  <ol className={`${styles.silsila} ${grande ? styles.silsilaGrande : ""}`}>
    {SILSILA.map((n) => {
      const activo = resaltar ? n.href === resaltar : n.actual;
      return (
        <li key={n.nombre} className={activo ? styles.actual : undefined}>
          <span className={styles.nodo} aria-hidden />
          <span className={styles.nodoNombre}>
            {n.href && !activo ? <Link href={n.href}>{n.nombre}</Link> : n.nombre}
          </span>
          {n.nota && <span className={styles.nodoNota}>{n.nota}</span>}
        </li>
      );
    })}
  </ol>
);

export default Silsila;
