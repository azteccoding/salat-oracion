import Link from "next/link";
import Icon from "../Icon";
import styles from "@/styles/site/Comunidad.module.css";

const PAGINAS = [
  { href: "/nuestra-tariqa", arabe: "طريقتنا", titulo: "Nuestra Tarīqa", texto: "La cadena de maestros y los valores que custodiamos." },
  { href: "/nuestro-maulana", arabe: "مولانا", titulo: "Nuestro Maulana", texto: "Maulana ʿIyad ibn Yusuf, vértice de nuestra tarīqa." },
  { href: "/nuestro-sheij", arabe: "شيخنا", titulo: "Nuestro Sheij", texto: "Mullah Khalid, quien hoy guía a nuestra comunidad." },
  { href: "/nuestra-recitacion", arabe: "قراءتنا", titulo: "Nuestra recitación", texto: "El Corán en la lectura de Khalaf ʿan Hamza." },
];

// Tarjetas para pasar entre las tres páginas de la comunidad.
const Enlaces = ({ actual }) => (
  <nav className={styles.enlaces} aria-label="Nuestra comunidad">
    {PAGINAS.filter((p) => p.href !== actual).map((p) => (
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

export default Enlaces;
