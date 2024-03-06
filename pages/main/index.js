import { CONGREGATION_NAME, WELCOME_PAGE_MESSAGE } from "../../constants/names";
import MainContent from "./components/MainContent";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MainTitle from "./components/MainTitle";

export default function Home() {
  return (
    <>
      <Header />
      <MainTitle title={CONGREGATION_NAME} description={WELCOME_PAGE_MESSAGE} />

      <MainContent />

      <Footer />
    </>
  );
}
