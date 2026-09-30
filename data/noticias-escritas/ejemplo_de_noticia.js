// NOTICIA DE EJEMPLO (no se indexa): úsala como modelo para ver todas las opciones.
const noticia = {
  slug: "ejemplo-de-noticia",
  title: "Noticia de ejemplo: así se escribe una noticia",
  date: "2026-09-29",
  tema: "comunidad",
  indexar: false,
  resumen:
    "Esta noticia muestra **todas** las opciones: foto, negritas, ==texto resaltado==, enlaces y fuentes.",
  imagen: {
    src: "/img/noticias/ejemplo.jpg",
    alt: "Imagen de ejemplo con el patrón del sitio",
  },
  cuerpo: [
    {
      type: "p",
      text: "Este es un párrafo normal. Aquí hay **una frase en negritas** y aquí ==una frase resaltada== para llamar la atención.",
    },
    {
      type: "p",
      text: "Un enlace a otro sitio se escribe así: [Ibn Hazm en Wikipedia](https://es.wikipedia.org/wiki/Ibn_Hazm). Y un enlace a nuestro propio sitio, así: [nuestras fatāwá](/fataawa-zahiri-fiqh).",
    },
    { type: "h", text: "Un subtítulo" },
    {
      type: "list",
      items: [
        "Un punto de la lista.",
        "Otro punto, con **negritas**.",
        "Uno más, con un [enlace](https://www.aljazeera.com).",
      ],
    },
    {
      type: "quote",
      text: "El valor de cada persona está en lo que sabe hacer bien.",
      source:
        "ʿAlī ibn Abī Ṭālib, [Nahŷ al-balāga](https://es.wikipedia.org/wiki/Nahj_al-Balagha)",
    },
    {
      type: "imagen",
      src: "/img/noticias/ejemplo.jpg",
      alt: "Imagen de ejemplo dentro del texto",
      pie: "Así se ve una foto dentro del texto, con su pie. Fuente: [nuestro sitio](/).",
    },
    {
      type: "nota",
      title: "Un recuadro destacado",
      text: "Sirve para avisos, aclaraciones o datos importantes.",
    },
  ],
  fuentes: [
    {
      nombre: "Wikipedia — Ibn Hazm",
      url: "https://es.wikipedia.org/wiki/Ibn_Hazm",
    },
    {
      nombre: "Al Jazeera",
      url: "https://www.aljazeera.com",
      nota: "ejemplo de nota corta junto a la fuente",
    },
  ],
};

export default noticia;
