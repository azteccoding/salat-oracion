import PaginaPureza from "@/components/pureza/PaginaPureza";
import { gusl } from "@/data/gusl";

// El contenido de esta página se escribe en data/gusl.js
export default function Pagina() {
  return <PaginaPureza clave="gusl" datos={gusl} />;
}
