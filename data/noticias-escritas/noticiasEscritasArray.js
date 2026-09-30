// =====================================================================
//  LISTA DE NOTICIAS
// ---------------------------------------------------------------------
//  Cada noticia vive en su propio archivo dentro de esta carpeta
//  (data/noticias-escritas/). Para publicar una nueva:
//
//    1. Créala en el editor:  /editor-noticias  (con npm run dev: http://localhost:3000/editor-noticias)
//    2. Descarga el archivo .js que te da el editor y guárdalo en esta carpeta.
//    3. Agrega aquí dos líneas: el import (arriba) y su nombre dentro de la lista (abajo).
//
//  El orden de la lista no importa: el sitio ordena solo por fecha.
// =====================================================================

import houthi_attacks_saudi from "./houthi_attacks_saudi";
import ejemplo_de_noticia from "./ejemplo_de_noticia";

export const noticiasEscritas = [
  houthi_attacks_saudi,
  ejemplo_de_noticia,
];
