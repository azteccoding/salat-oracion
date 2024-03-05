import styles from "/styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <a className={styles.navbarBrand} href="/">
          Logo
        </a>
        <ul className={styles.navbarNav}>
          <li className={styles.navItem}>
            <a className={styles.navLink} href="/">
              Inicio
            </a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navLink} href="/">
              Acerca de
            </a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navLink} href="/">
              Servicios
            </a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navLink} href="/">
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
