// FATWA 3300 — Lo que hace obligatorio el gusl   (enlazada desde /gusl)
const fatwa = {
  codigo: "3300",
  slug: "lo-que-hace-obligatorio-el-gusl",
  title: "¿Qué hace obligatorio el gusl?",
  date: "2026-09-30",
  borrador: true,
  summary: "✍️ Resumen de una o dos líneas…",
  question: "✍️ La pregunta tal como se recibió…",
  answer: [
    { type: "p", text: "✍️ Introducción…" },

    { type: "h", text: "Lo que hace obligatorio el gusl" },
    { type: "list", items: ["✍️ Primera causa…", "✍️ Segunda causa…"] },

    {
      type: "nota",
      title: "El gusl del viernes no sirve para rezar",
      text: "El gusl del viernes es por el día, no por la oración. Por eso no es válido ni suficiente para rezar: la oración necesita un wuḍūʾ y gusl propios.",
    },
    {
      type: "link",
      codigo: "3301",
      text: "Lee la fatwa n.º 3301: el gusl del viernes",
    },
  ],
  sources: ["✍️ Ibn Ḥazm, al-Muḥallā, masʾala …"],
  related: ["3301", "3500"],
};

export default fatwa;
