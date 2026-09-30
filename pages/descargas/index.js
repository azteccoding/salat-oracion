import DownloadCard from "@/components/DownloadCard";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import { descargas } from "@/data/descargas";
import styles from "@/styles/site/Descargas.module.css";

export default function Descargas() {
  return (
    <>
      <Seo title="Descargas" description="Libros y materiales gratuitos para aprender sobre el islam." />
      <PageHero title="Libros y descargas" arabic="المكتبة" crumbs={[{ label: "Descargas" }]}>
        <p>Materiales gratuitos para estudiar en casa, compartir con tu familia o leer en la musala.</p>
      </PageHero>
      <div className={`contenedor ${styles.list}`}>
        {descargas.map((d) => (
          <DownloadCard key={d.slug} item={d} />
        ))}
      </div>
    </>
  );
}
