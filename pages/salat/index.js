import Content from "/pages/salat/components/Content";
import Footer from "/pages/components/Footer";
import Header from "/pages/components/Header";

export default function Home() {
  return (
    <>
      <Header
        data={{
          title: "Rezar el salat",
          content: "Rezar el salat según el Corán y la Sunna",
          icon: "/favicon.ico",
        }}
      />

      <Content title="Salat del Profeta &#65018;" />

      <Footer />
    </>
  );
}
