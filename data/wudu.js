// =====================================================================
//  Wuḍūʾ — CONTENIDO DE LA PÁGINA /wudu
//  Todo lo que se ve en la página sale de este archivo. Solo edita aquí.
// =====================================================================

export const wudu = {
  titulo: "Wuḍūʾ",
  arabe: "الوضوء",
  subtitulo: "La ablución menor",

  // Texto bajo el título de la página (uno o dos renglones)
  intro:
    "El wuḍūʾ es la ablución que Allah ordenó antes de la oración. Aquí lo aprendes paso a paso, tal como lo describe el Imam Ibn Ḥazm de Córdoba en el Muḥallá, distinguiendo lo obligatorio de lo recomendado.",

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
      title: "Nombrar a Allah",
      description: "Recomendado",
      instruction:
        "Es recomendable nombrar a Allah al hacer el wuḍūʾ. Si no lo haces, tu wuḍūʾ es completo.",
      tripleText: ["بِسْمِ اللَّهِ", "bi-smi llāhi", "En el nombre de Allah"],
    },
    {
      name: "paso-2",
      title: "Lavar las manos",
      description: "Obligatorio si despiertas de dormir",
      instruction:
        "Si acabas de despertar, lava tus manos tres veces antes de meterlas en el recipiente; esto es obligatorio aunque viertas el agua sobre ellas sin meterlas en él, y aunque haya pasado tiempo desde que despertaste.",
      tripleText: [],
    },
    {
      name: "paso-3",
      title: "Enjuagar la boca",
      description: "Recomendado",
      instruction:
        "Enjuágate la boca tres veces. No es obligatorio: si lo dejas, a propósito o por olvido, tu wuḍūʾ y tu oración son válidos.",
      tripleText: [],
    },
    {
      name: "paso-4",
      title: "La intención",
      description: "Obligatorio",
      instruction:
        "Ten en tu corazón la intención de hacer el wuḍūʾ para la oración.",
      tripleText: [],
    },
    {
      name: "paso-5",
      title: "Aspirar y expulsar agua por la nariz",
      description: "Obligatorio",
      instruction:
        "Pon agua en tu nariz, aspírala con tu aliento y luego expúlsala ayudándote con los dedos. Una vez es obligatoria; hacerlo una segunda y una tercera vez es bueno. Sin esto no vale el wuḍūʾ ni la oración, ni a propósito ni por olvido. Si acabas de despertar, hazlo tres veces.",
      tripleText: [],
    },
    {
      name: "paso-6",
      title: "Lavar la cara",
      description: "Obligatorio",
      instruction:
        "Lava tu cara desde donde nace el cabello en lo alto de la frente hasta la raíz de ambas orejas y hasta donde termina la barbilla. Una vez basta; dos o tres es recomendable. No tienes que mojar la barba que cuelga debajo de la barbilla ni pasar los dedos por ella.",
      tripleText: [],
    },
    {
      name: "paso-7",
      title: "Lavar los antebrazos",
      description: "Obligatorio",
      instruction:
        "Lava tus antebrazos desde la punta de las uñas hasta el comienzo de los codos. Una vez basta; dos o tres está bien. Si llevas anillo, muévelo para tener la certeza de que el agua llega debajo de él.",
      tripleText: [],
    },
    {
      name: "paso-8",
      title: "Pasar la mano por la cabeza",
      description: "Obligatorio",
      instruction:
        "Pasa la mano mojada por tu cabeza: de cualquier forma vale, con las dos manos, con una o con un solo dedo, y aunque sea por una parte pequeña. Lo preferible es abarcar toda la cabeza. Una vez basta; dos o tres es recomendable. No tienes que tocar el cabello que cuelga más allá de donde nace.",
      tripleText: [],
    },
    {
      name: "paso-9",
      title: "Pasar la mano por las orejas",
      description: "Recomendado",
      instruction:
        "Pasa la mano por tus orejas, con la misma agua de la cabeza o con agua nueva, como prefieras. Es recomendable tomar agua nueva para cada miembro.",
      tripleText: [],
    },
    {
      name: "paso-10",
      title: "Lavar los pies",
      description: "Obligatorio",
      instruction:
        "Lava tus pies desde la punta de las uñas hasta el final de los tobillos, por el lado de la pierna. Una vez basta; dos o tres está bien.",
      tripleText: [],
    },
  ],

  // ---------------------------------------------------------------
  //  DEL MUḤALLÁ — las masāʾil que tradujiste.
  //    masala:  número de la masʾala (o "" si no quieres mostrarlo)
  //    titulo:  de qué trata
  //    espanol: tu traducción
  //  Si todavía no quieres mostrar esta sección, deja el arreglo vacío: muhalla: []
  // ---------------------------------------------------------------
  muhalla: [
    {
      masala: "198",
      titulo: "Por qué el enjuague de la boca no es obligatorio",
      espanol:
        "En cuanto a lo que decimos del enjuague de la boca: no ha llegado de forma auténtica una orden del Mensajero de Allah ﷺ al respecto; es solo algo que él hizo. Y ya explicamos que sus actos ﷺ no son obligatorios, sino que en ellos está el seguir su ejemplo, porque Allah solo nos ordenó obedecer la orden de Su Profeta, y no nos ordenó hacer lo que él hacía. Dice Allah: «Que se cuiden quienes contravienen su orden de que les alcance una prueba o un castigo doloroso» (Corán 24:63); y dice: «Ciertamente tienen en el Mensajero de Allah un hermoso ejemplo» (Corán 33:21).",
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
      titulo: "Lo obligatorio y lo recomendado",
      puntos: [
        "Obligatorio: lavar las manos tres veces, si despiertas de dormir.",
        "Obligatorio: la intención, aspirar y expulsar agua por la nariz, lavar la cara y los antebrazos, pasar la mano por la cabeza y lavar los pies.",
        "Recomendado: nombrar a Allah, enjuagar la boca, repetir dos o tres veces cada lavado, pasar la mano por las orejas y tomar agua nueva para cada miembro.",
      ],
    },
    {
      titulo: "A veces también hace falta el gusl",
      parrafos: [
        "Algunas de las causas que hacen obligatorio el gusl exigen, además del baño, el wuḍūʾ. En esos casos el gusl por sí solo no basta para poder rezar: debes hacer también el wuḍūʾ.",
      ],
      enlace: { href: "/gusl", texto: "Cómo hacer el gusl" },
    },
    {
      titulo: "Lo que anula el wuḍūʾ",
      parrafos: [
        "Hay cosas que anulan el wuḍūʾ; si te ocurre alguna, debes repetirlo antes de rezar.",
      ],
      enlace: {
        href: "/fataawa-zahiri-fiqh/lo-que-anula-el-wudu-3500",
        texto: "¿Qué anula el wuḍūʾ? (Fatwa n.º 3500)",
      },
    },
  ],
};
