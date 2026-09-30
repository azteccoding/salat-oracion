// =====================================================================
//  Gusl — CONTENIDO DE LA PÁGINA /gusl
//  Todo lo que se ve en la página sale de este archivo. Solo edita aquí.
// =====================================================================

export const gusl = {
  titulo: "Gusl",
  arabe: "الغسل",
  subtitulo: "El baño ritual",

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
  //  NOTAS — apartados de texto libre al final (cuándo es obligatorio, etc.)
  //    titulo:   título del apartado
  //    puntos:   lista de viñetas (opcional)
  //    parrafos: párrafos de texto (opcional)
  //    enlace:   { href, texto } — botón a otra página, p. ej. una fatwa (opcional)
  //  Si no lo necesitas, deja: notas: []
  // ---------------------------------------------------------------
  notas: [
    {
      titulo: "Cuándo es obligatorio el gusl",
      parrafos: ["✍️ Una línea de introducción…"],
      enlace: { href: "/fataawa-zahiri-fiqh/lo-que-hace-obligatorio-el-gusl-3300", texto: "¿Qué hace obligatorio el gusl? (Fatwa n.º 3300)" },
    },
    {
      titulo: "El gusl del viernes no sirve para rezar",
      parrafos: ["El gusl del viernes es por el día, no por la oración: no es válido ni suficiente para rezar."],
      enlace: { href: "/fataawa-zahiri-fiqh/el-gusl-del-viernes-3301", texto: "El gusl del viernes (Fatwa n.º 3301)" },
    },
  ],
};
