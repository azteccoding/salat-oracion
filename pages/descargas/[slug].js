import DownloadCard from "@/components/DownloadCard";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import { descargas } from "@/data/descargas";
import styles from "@/styles/site/Descargas.module.css";

export default function Descarga({ item }) {
  return (
    <>
      <Seo title={item.title} description={item.description} />
      <PageHero title={item.title} crumbs={[{ href: "/descargas", label: "Descargas" }, { label: item.title }]}>
        <p>{item.description}</p>
      </PageHero>
      <div className={`contenedor ${styles.list}`}>
        <DownloadCard item={item} detailLink={false} />
      </div>
    </>
  );
}

export function getStaticPaths() {
  return {
    paths: descargas.map((d) => ({ params: { slug: d.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const item = descargas.find((d) => d.slug === params.slug);
  return { props: { item } };
}
