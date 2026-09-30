// =====================================================================
//  LISTA DE FATĀWÁ
// ---------------------------------------------------------------------
//  Cada fatwa vive en su propio archivo dentro de esta carpeta
//  (data/fataawa-escritas/). Para publicar una nueva:
//
//    1. Créala en el editor:  /editor-fataawa  (con npm run dev: http://localhost:3000/editor-fataawa)
//    2. Descarga (o copia) el archivo .js que te da el editor y guárdalo en esta carpeta.
//    3. Agrega aquí dos líneas: el import (arriba) y su nombre dentro de la lista (abajo).
//
//  El orden no importa: el sitio ordena solo (fecha más reciente primero).
//  No repitas un código: cada fatwa debe tener el suyo.
// =====================================================================

import lo_que_anula_el_wudu_3500 from "./lo_que_anula_el_wudu_3500";
import lo_que_hace_obligatorio_el_gusl_3300 from "./lo_que_hace_obligatorio_el_gusl_3300";
import el_gusl_del_viernes_3301 from "./el_gusl_del_viernes_3301";

export const fatawaEscritas = [
  lo_que_anula_el_wudu_3500,
  lo_que_hace_obligatorio_el_gusl_3300,
  el_gusl_del_viernes_3301,
];
