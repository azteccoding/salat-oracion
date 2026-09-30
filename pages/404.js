import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import Seo from "@/components/Seo";
import ui from "@/styles/site/ui.module.css";

const PageNotFound = () => (
  <>
    <Seo title="Página no encontrada" noIndex />
    <section className="contenedor" style={{ textAlign: "center", padding: "80px 20px 0" }}>
      <Image src="/img/logo.svg" alt="" width={96} height={96} style={{ margin: "0 auto 20px" }} />
      <p className="arabe" lang="ar" style={{ fontSize: 30, color: "var(--dorado)", margin: 0 }}>
        سبحان الله
      </p>
      <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)" }}>No encontramos esta página</h1>
      <p style={{ color: "var(--tenue)", maxWidth: "46ch", margin: "0 auto 28px", fontSize: 18 }}>
        Es posible que la dirección haya cambiado o que el contenido todavía no se haya publicado.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <Link href="/" className={`${ui.btn} ${ui.btnPrimary}`}>
          <Icon name="arrowLeft" size={18} /> Volver al inicio
        </Link>
        <Link href="/fataawa-zahiri-fiqh" className={`${ui.btn} ${ui.btnGhost}`}>
          Ver las fatāwá
        </Link>
      </div>
    </section>
  </>
);

export default PageNotFound;
