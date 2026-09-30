import Image from "next/image";
import ui from "@/styles/site/ui.module.css";

const EmptyFataawa = ({ title = "Las primeras fatāwá están en preparación", children }) => (
  <div className={ui.empty}>
    <Image src="/img/logo.svg" alt="" width={64} height={64} className={ui.emptyIcon} />
    <h3>{title}</h3>
    <p>
      {children ||
        "Muy pronto, in šāʾa llāhu, publicaremos aquí respuestas de fiqh según el método ẓāhirī, con sus pruebas del Corán, la Sunna y el consenso."}
    </p>
  </div>
);

export default EmptyFataawa;
