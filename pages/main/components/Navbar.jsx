import styles from "/styles/Navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link className={styles.navbarBrand} href="/">
          Logo
        </Link>
        <ul className={styles.navbarNav}>
          <li className={styles.navItem}>
            <Link className={styles.navLink} href="/">
              Inicio
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link className={styles.navLink} href="/">
              Acerca de
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link className={styles.navLink} href="/">
              Servicios
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link className={styles.navLink} href="/">
              Contacto
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
