// =====================================================================
//  Wuḍūʾ — CONTENIDO DE LA PÁGINA /wudu
//  Todo lo que se ve en la página sale de este archivo. Solo edita aquí.
// =====================================================================

export const wudu = {
  titulo: "Wuḍūʾ",
  arabe: "الوضوء",
  subtitulo: "La ablución menor",

  // Texto bajo el título de la página (uno o dos renglones)
  intro: "✍️ Escribe aquí la introducción…",

  // ---------------------------------------------------------------
  //  PASOS — uno por objeto, en orden. El número se pone solo.
  //  Para agregar un paso: copia un bloque { … }, pégalo debajo y cambia "name".
  //
  //    name:        identificador único, sin espacios (paso-1, paso-2…)
  //    title:       título del paso
  //    description: texto pequeño arriba del título
  //    instruction: la explicación del paso
  //    tripleText:  [árabe, transliteración, español] si hay algo que recitar;
  //                 déjalo como [] si el paso no lleva recitación
  // ---------------------------------------------------------------
  pasos: [
    {
      name: "paso-1",
      title: "✍️ Título del paso",
      description: "✍️ Subtítulo",
      instruction: "✍️ Explicación del paso…",
      tripleText: [],
    },
    {
      name: "paso-2",
      title: "✍️ Título del paso",
      description: "✍️ Subtítulo",
      instruction: "✍️ Explicación del paso…",
      tripleText: ["✍️ árabe", "✍️ transliteración", "✍️ español"],
    },
  ],

  // ---------------------------------------------------------------
  //  DEL MUḤALLĀ — las masāʾil que tradujiste, con el árabe original.
  //    masala:  número de la masʾala (o "" si no quieres mostrarlo)
  //    titulo:  de qué trata
  //    arabe:   texto de Ibn Ḥazm
  //    espanol: tu traducción
  //  Si todavía no quieres mostrar esta sección, deja el arreglo vacío: muhalla: []
  // ---------------------------------------------------------------
  muhalla: [
    {
      masala: "",
      titulo: "✍️ Tema de la masʾala",
      arabe: "✍️ النص العربي",
      espanol: "✍️ Tu traducción…",
    },
  ],

  // ---------------------------------------------------------------
  //  NOTAS — apartados de texto libre al final (lo que anula el wuḍūʾ, etc.)
  //    titulo:   título del apartado
  //    puntos:   lista de viñetas (opcional)
  //    parrafos: párrafos de texto (opcional)
  //    enlace:   { href, texto } — botón a otra página, p. ej. una fatwa (opcional)
  //  Si no lo necesitas, deja: notas: []
  // ---------------------------------------------------------------
  notas: [
    {
      titulo: "Lo que anula el wuḍūʾ",
      parrafos: ["Hay cosas que anulan el wuḍūʾ; si te ocurre alguna, debes repetirlo antes de rezar."],
      enlace: { href: "/fataawa-zahiri-fiqh/lo-que-anula-el-wudu-3500", texto: "¿Qué anula el wuḍūʾ? (Fatwa n.º 3500)" },
    },
  ],
};
