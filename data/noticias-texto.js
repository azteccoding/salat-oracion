// Quita las marcas **negritas**, ==resaltado== y [texto](enlace) para mostrar texto plano
// (tarjetas, vista previa del inicio y descripción para Google).
export const textoPlano = (s = "") =>
  (s || "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/==([^=]+)==/g, "$1")
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1");
