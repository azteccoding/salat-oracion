import DownloadCard from "@/components/DownloadCard";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import { descargas } from "@/data/descargas";
import styles from "@/styles/site/Descargas.module.css";

const item = descargas.find((d) => d.slug === "talim-ul-islam-ramadan-seleccion");

export default function Downloadables() {
  return (
    <>
      <Seo title={item.title} description={item.description} />
      <PageHero title={item.title} crumbs={[{ href: "/descargas", label: "Descargas" }, { label: "Ramaḍān" }]}>
        <p>{item.description}</p>
      </PageHero>
      <div className={`contenedor ${styles.list}`}>
        <DownloadCard item={item} detailLink={false} />
      </div>
    </>
  );
}
