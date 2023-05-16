import { ASSOCIATION_NAME } from "../constants/names";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <Header />

      <Content title={ASSOCIATION_NAME} />

      <Footer />
    </>
  );
}
