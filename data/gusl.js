// =====================================================================
//  Gusl — CONTENIDO DE LA PÁGINA /gusl
//  Todo lo que se ve en la página sale de este archivo. Solo edita aquí.
// =====================================================================

export const gusl = {
  titulo: "Gusl",
  arabe: "الغسل",
  subtitulo: "El baño ritual",

  // Texto bajo el título de la página (uno o dos renglones)
  intro:
    "El gusl es el baño ritual que devuelve la pureza a quien está en estado de ŷanāba. Aquí lo aprendes paso a paso, tal como lo describe el Imam Ibn Ḥazm de Córdoba en el Muḥallā, distinguiendo lo obligatorio de lo recomendado.",

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
      title: "Lavar las manos",
      description: "Obligatorio si te levantas de dormir",
      instruction:
        "Lava tus manos tres veces antes de meterlas en el recipiente del agua. Si acabas de levantarte de dormir, esto es obligatorio y no puede omitirse; si es que no lo has hecho aún.",
      tripleText: [],
    },
    {
      name: "paso-2",
      title: "Lavar las partes íntimas",
      description: "Recomendado si la ŷanāba es por relación sexual",
      instruction:
        "Lava tus partes íntimas con la mano izquierda. Si el gusl es por haber tenido relaciones, este lavado es obligatorio.",
      tripleText: [],
    },
    {
      name: "paso-3",
      title: "Frotar la mano en el suelo",
      description: "Recomendado",
      instruction:
        "Después de lavarte, frota con fuerza la mano izquierda contra el suelo o la pared y luego lávala, como lo hacía el Profeta ﷺ.",
      tripleText: [],
    },
    {
      name: "paso-4",
      title: "El wuḍūʾ de la oración",
      description: "Recomendado",
      instruction:
        "Haz el wuḍūʾ como lo harías para rezar: enjuágate la boca, aspira agua por la nariz y expúlsala, tres veces cada cosa, y lava los demás miembros del wuḍūʾ. Puedes dejar el lavado de los pies para el final.",
      tripleText: [],
    },
    {
      name: "paso-5",
      title: "Mojar la raíz del cabello",
      description: "Obligatorio",
      instruction:
        "Mete la mano en el agua y pasa los dedos por la raíz de tu cabello hasta tener la certeza de que el agua mojó la piel de la cabeza.",
      tripleText: [],
    },
    {
      name: "paso-6",
      title: "Verter agua sobre la cabeza",
      description: "Obligatorio",
      instruction:
        "Vierte agua sobre tu cabeza; lo recomendado es hacerlo tres veces con la mano llena. Debe ser de modo que tengas la certeza de que el agua llegó a la piel de la cabeza y a todo tu cabello. La cabeza va antes que el resto del cuerpo.",
      tripleText: [],
    },
    {
      name: "paso-7",
      title: "Verter agua sobre todo el cuerpo",
      description: "Obligatorio",
      instruction:
        "Después de la cabeza, vierte agua sobre el resto de tu cuerpo, comenzando por el lado derecho, hasta tener la certeza de que el agua llegó a todo él. Con esto has completado lo obligatorio del gusl.",
      tripleText: [],
    },
    {
      name: "paso-8",
      title: "Lavar los pies",
      description: "Al terminar",
      instruction:
        "Si dejaste los pies para el final, apártate del lugar donde te bañaste y lávalos, como lo hizo el Profeta ﷺ según el relato de Maymūna.",
      tripleText: [],
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
      masala: "188",
      titulo: "Cómo se hace el gusl de la ŷanāba",
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
      titulo: "Lo obligatorio y lo recomendado",
      puntos: [
        "Obligatorio: lavar las manos tres veces antes de meterlas en el agua, si te levantas de dormir.",
        "Obligatorio: lavar las partes íntimas, si el gusl es por relación sexual.",
        "Obligatorio: verter agua sobre la cabeza y después sobre todo el cuerpo, con la certeza de que llegó a la piel, a todo el cabello y a todo el cuerpo.",
        "Recomendado: frotar la mano en el suelo, el wuḍūʾ previo, mojar la raíz del cabello, verter el agua tres veces sobre la cabeza y comenzar por el lado derecho.",
      ],
      parrafos: [
        "Allah dice: «Y si están en estado de ŷanāba, purifíquense» (Corán 5:6). Por eso, como dice el Imam Ibn Ḥazm, de cualquier manera que se cumpla la purificación, se ha cumplido lo que Allah ordenó.",
      ],
    },
    {
      titulo: "Las pruebas de la Sunna",
      puntos: [
        "ʿImrān ibn Ḥuṣayn relata que el Profeta ﷺ dio a un hombre en estado de ŷanāba un recipiente con agua y le dijo: «Ve y viértela sobre ti» (al-Bujārī).",
        "Maymūna relata que el Profeta ﷺ, al bañarse de la ŷanāba, lavó sus manos dos o tres veces, lavó sus partes íntimas con la izquierda, frotó esa mano con fuerza contra el suelo, hizo su wuḍūʾ de la oración, vertió sobre su cabeza tres puñados de agua, lavó el resto de su cuerpo y después, apartándose de su lugar, lavó sus pies (Muslim y al-Bujārī).",
        "A Umm Salama le dijo: «Te basta con echar agua sobre tu cabeza y luego verter el agua sobre ti, y ya quedas purificada».",
        "ʿĀʾiša relata que al Profeta ﷺ le gustaba empezar por la derecha al calzarse, al peinarse, al purificarse y en todos sus asuntos (al-Bujārī).",
      ],
    },
    {
      titulo: "A veces el gusl no basta: también hace falta el wuḍūʾ",
      parrafos: [
        "Algunas de las causas que hacen obligatorio el gusl exigen, además del baño, el wuḍūʾ. En esos casos el gusl por sí solo no basta para poder rezar: debes hacer también el wuḍūʾ.",
      ],
      enlace: { href: "/wudu", texto: "Cómo hacer el wuḍūʾ" },
    },
    {
      titulo: "Cuándo es obligatorio el gusl",
      parrafos: [
        "En esta fatwa se explican las situaciones que, además del wuḍūʾ, requieren el baño completo (gusl) para poder rezar.",
      ],
      enlace: {
        href: "/fataawa-zahiri-fiqh/lo-que-hace-obligatorio-el-gusl-3300",
        texto: "¿Qué hace obligatorio el gusl? (Fatwa n.º 3300)",
      },
    },
    {
      titulo: "El gusl del viernes no sirve para rezar",
      parrafos: [
        "El gusl del viernes es por el día, no por la oración: no es válido ni suficiente para rezar.",
      ],
      enlace: {
        href: "/fataawa-zahiri-fiqh/el-gusl-del-viernes-3301",
        texto: "El gusl del viernes (Fatwa n.º 3301)",
      },
    },
  ],
};
