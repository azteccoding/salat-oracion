import Link from "next/link";
import Icon from "../Icon";
import styles from "@/styles/site/Comunidad.module.css";

// Páginas de la sección «Imam Ibn Hazm de Córdoba».
// Para agregar una página nueva, añade un objeto aquí y crea su archivo en pages/imam-ibn-hazm/.
export const PAGINAS_IBN_HAZM = [
  { href: "/imam-ibn-hazm", arabe: "حياته", titulo: "Su vida", texto: "De los palacios de Córdoba al retiro en Manta Līšam." },
  { href: "/imam-ibn-hazm/obras", arabe: "مؤلفاته", titulo: "Sus obras", texto: "Fiqh, uṣūl, teología, ética y el amor cortés." },
  { href: "/imam-ibn-hazm/escuela-zahiri", arabe: "الظاهرية", titulo: "Su escuela", texto: "El método ẓāhirī: volver al texto revelado." },
];

// Tarjetas para moverse entre las páginas de la sección (omite la actual).
const NavIbnHazm = ({ actual }) => (
  <nav className={styles.enlaces} aria-label="Imam Ibn Hazm de Córdoba">
    {PAGINAS_IBN_HAZM.filter((p) => p.href !== actual).map((p) => (
      <Link key={p.href} href={p.href} className={styles.enlace}>
        <span className="arabe" lang="ar">
          {p.arabe}
        </span>
        <strong>{p.titulo}</strong>
        <span className={styles.enlaceTexto}>{p.texto}</span>
        <span className={styles.enlaceMas}>
          Leer <Icon name="arrow" size={16} />
        </span>
      </Link>
    ))}
  </nav>
);

export default NavIbnHazm;
