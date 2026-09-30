import PaginaPureza from "@/components/pureza/PaginaPureza";
import { wudu } from "@/data/wudu";

// El contenido de esta página se escribe en data/wudu.js
export default function Pagina() {
  return <PaginaPureza clave="wudu" datos={wudu} />;
}
