import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

const Layout = ({ children }) => (
  <>
    <a href="#contenido" className="sr-only">
      Saltar al contenido
    </a>
    <SiteHeader />
    <main id="contenido">{children}</main>
    <SiteFooter />
  </>
);

export default Layout;
