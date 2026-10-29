import BotonJutba from "./BotonJutba";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import TemaSegunRezo from "./TemaSegunRezo";

const Layout = ({ children }) => (
  <>
    <a href="#contenido" className="sr-only">
      Saltar al contenido
    </a>
    <SiteHeader />
    <main id="contenido">{children}</main>
    <SiteFooter />
    {/* Botón flotante de la juṭba: en todas las páginas, solo los viernes (hora de México) */}
    <BotonJutba />
    {/* Tema claro del fin del fajr (šurūq) al ʿišāʾ; oscuro el resto de la noche */}
    <TemaSegunRezo />
  </>
);

export default Layout;
