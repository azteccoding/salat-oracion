// Contenido de las páginas "Nuestra Tarīqa", "Nuestro Maulana" y "Nuestro Sheij".
// Edita aquí los textos; las páginas se actualizan solas.
// En `secciones`, cada elemento es { titulo?, parrafos: [...] } y, opcionalmente, `foto` para
// mostrar una imagen después de esa sección.

// ---------------------------------------------------------------------------
// Cadena de transmisión (silsila), del Profeta ﷺ hasta nuestro sheij.
// `nota` es opcional. `href` enlaza el nombre con su página dentro del sitio.
// ---------------------------------------------------------------------------
export const SILSILA = [
  { nombre: "Rasulullah ﷺ", nota: "Sello de la Profecía" },
  { nombre: "Imam Ali ibn Abu Talib", nota: "Emir de los Creyentes" },
  { nombre: "Imam Hussein ibn Ali" },
  { nombre: "Abu Madyan de Sevilla" },
  { nombre: "Abdus-Salam ibn Mashish" },
  { nombre: "Abu al-Hasan ash-Shadili" },
  { nombre: "Ibn Ata’illah al-Iskandari" },
  {
    nombre: "Abu Abdullah Muhammad ad-Darqáwi",
    nota: "Nuestro nodo máximo más reciente",
  },
  { nombre: "Muhammad Abd al-Qadir al-Basha" },
  { nombre: "Ibn al-Habib al-Buzidi" },
  {
    nombre: "Ahmad ibn Mustafa al-Alawi",
    nota: "Por medio de sus estudiantes",
  },
  {
    nombre: "Hasan ibn Abd al-Aziz · Abu Musa · Abdul-Wahid Yahya",
    nota: "Este último, estudiante de Abdul Hadi al-Aqili",
  },
  { nombre: "Hamud al-Faransi" },
  {
    nombre: "Abd al-Haqq ʿIyad ibn Yusuf",
    nota: "Nuestro vértice y guía",
    href: "/nuestro-maulana",
  },
  { nombre: "Yahya al-Kanadi", nota: "Junto con el sheij Shalik" },
  {
    nombre: "Mullah Khalid",
    nota: "Nuestro sheij",
    href: "/nuestro-sheij",
    actual: true,
  },
];

// Valores que custodiamos
export const VALORES = [
  {
    titulo: "Independencia",
    texto:
      "Ningún financiador condiciona nuestras enseñanzas ni nuestras decisiones.",
  },
  {
    titulo: "Libertad de conciencia",
    texto: "Cada hermano camina con plena libertad de conciencia.",
  },
  {
    titulo: "Shuʿūbiyya",
    texto: "Respeto por la cultura y la identidad de los pueblos no árabes.",
  },
  {
    titulo: "Sobriedad",
    texto: "Moderación en las prácticas del ʿirfān (sufismo).",
  },
];

// Tesoros de la hermandad
export const TESOROS = [
  "Un dhikr escrito de puño y letra del sheij Ahmad ibn Mustafa al-Alawi.",
  "Manuscritos de un opúsculo de dhikr en árabe, con su traducción al francés, dictado por el sheij Abu Musa y conseguido en un viaje.",
  "Monedas de oro y plata de la herencia de maulana ʿIyad, repartidas entre sus alumnos para la compra de libros.",
  "Manuscrito del Corán proveniente del Imperio Otomano siglo XVIII",
];

// ---------------------------------------------------------------------------
// Nuestra Tarīqa
// ---------------------------------------------------------------------------
export const NUESTRA_TARIQA = {
  titulo: "Nuestra Tarīqa",
  nombre: "Shadili-Darqawi-ʿIyadiya",
  nombreArabe: "الطريقة الشاذلية الدرقاوية العياضية",
  resumen:
    "Una rama pequeña y sobria del gran árbol šāḏilī, que echó raíces en Guanajuato con maulana ʿIyad ibn Yusuf y hoy se sigue transmitiendo aquí.",
  secciones: [
    {
      titulo: "Un camino que cruzó el océano",
      parrafos: [
        "Nuestros maestros enseñan que el origen de nuestra tradición en América está en el viejo continente: en Abu Madyan de Sevilla, que Allah tenga misericordia de él, y, antes de él, a través de sus maestros, en Sayyiduna Imam Hussein y en su padre, el Emir de los Creyentes Imam Ali ibn Abu Talib, que Allah esté complacido con ellos y con su familia, quien la recibió directamente del Sello de la Profecía, Rasulullah ﷺ.",
        "El camino tomó su forma con el sheij Abdus-Salam ibn Mashish y con su discípulo, el gran maulana Abu al-Hasan ash-Shadili. Por el sheij Ibn Ata’illah al-Iskandari conservamos aforismos y enseñanzas que todavía repetimos, y desde él la cadena desciende sin interrupción hasta maulana Abu Abdullah Muhammad ad-Darqáwi.",
      ],
    },
    {
      titulo: "Ramas que vuelven a encontrarse",
      parrafos: [
        "Después del sheij ad-Darqáwi el camino se abrió en muchas ramas gracias a la multitud de sus estudiantes, y varias de ellas volvieron a unirse en los maestros de nuestros maestros. Entre los eslabones de nuestra línea recordamos al maestro Muhammad Abd al-Qadir al-Basha y, por medio de sus discípulos, a maulana Ibn al-Habib al-Buzidi.",
        "Ninguno de nosotros conoció en persona al gran sheij Ahmad ibn Mustafa al-Alawi, pero nos llegó abundantemente su bendición por sus estudiantes, como el sheij Hasan ibn Abd al-Aziz y el sheij Abu Musa. Del maestro Abdul Hadi al-Aqili nos llegó por su discípulo, el sheij Abdul-Wahid Yahya. Los tres fueron maestros del sheij Hamud al-Faransi, quien formó a maulana ʿIyad ibn Yusuf, el vértice de nuestra tarīqa, que falleció en Guanajuato en el año 2001.",
      ],
    },
    {
      titulo: "Una hermandad independiente",
      parrafos: [
        "Hoy la tarīqa se transmite por medio de maulana Yahya al-Kanadi, discípulo de maulana ʿIyad, y de sus alumnos. Nuestro sheij, Mullah Khalid, y su hermano por Allah, Habib el Kashlán, han recibido tres invitaciones distintas para integrarse a las tarīqas establecidas en México, y las tres veces las han declinado.",
        "La razón es sencilla: queremos mantener vivos, mientras Allah nos conceda vida, los valores que nos inculcaron nuestros maestros. Somos pocos: una hermandad pequeña, sin financiadores, fiel a lo que recibió.",
      ],
    },
  ],
  enseñanza: {
    texto:
      "Cada ser y cada instante son reflejos del Rostro de Allah. El mundo no es tierra de corrupción, sino un campo infinito de signos que invitan a recordar y amar al Creador.",
    fuente: "Enseñanza de maulana ʿIyad ibn Yusuf",
  },
  practica: [
    {
      titulo: "Dhikr",
      texto:
        "El recuerdo de Allah es el corazón del camino, practicado con constancia y sin estridencias.",
    },
    {
      titulo: "Fiqh ẓāhirī",
      texto:
        "Maulana ʿIyad adoptó el madhhab de Ibn Ḥazm: el texto manifiesto del Corán y la Sunna.",
    },
    {
      titulo: "Estudio",
      texto:
        "Libros, manuscritos y maestros: el conocimiento se busca, se estudia y se comparte.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Nuestro Maulana
// ---------------------------------------------------------------------------
export const NUESTRO_MAULANA = {
  titulo: "Nuestro Maulana",
  nombre: "Maulana Abd al-Haqq ʿIyad ibn Yusuf",
  nombreArabe: "مولانا",
  honorifico: "Que Allah tenga misericordia de él",
  resumen:
    "Vértice de nuestra tarīqa shadili-darqawi-ʿiyadiya, maestro de maulana Yahya al-Kanadi. Falleció en Guanajuato, México, en el año 2001.",
  parrafos: [
    "Aunque los detalles precisos de su vida se han perdido en el tiempo, el testimonio de sus enseñanzas y el eco de su sabiduría siguen iluminando el sendero espiritual de nuestra tariqa shadili-darqawi-ʿiyadiya. Nacido en una tradición que se remonta a los grandes maestros del dhikr, desde Ibn Ata’illah al-Iskandari hasta Abu Abdullah Muhammad ad-Darqáwi, Maulana Abd al-Haqq ʿIyad ibn Yusuf (que Allah tenga misericordia de él) se erigió como un nodo fundamental en la cadena ininterrumpida de la sabiduría sufí. Fue maestro de mi maestro, Maulana Yahya al-Kanadi, y su influencia se extendió más allá de las fronteras de su país, marcando a tres generaciones de buscadores.",
    "Maulana ʿIyad forjó su camino en los Estados Unidos, un territorio que le brindó el escenario para cultivar y difundir las enseñanzas del sufismo, alejándose de las ataduras materiales (a pesar de que él y su familia estaban bien acomodados) para dedicarse por completo a la transmisión del conocimiento espiritual. Se cuenta que, hacia el ocaso de su vida, recibió una herencia sorprendente en monedas de oro y plata de sus padres no musulmanes. En lugar de sucumbir al brillo pasajero de la fortuna, eligió invertir en el bien supremo: la adquisición y diseminación de libros del din del Islam, que abrían puertas al recuerdo divino.",
    "Durante su travesía espiritual, recorrió variados senderos, participando en círculos de conocimiento en Francia, Marruecos, Egipto y Makkah, y absorbiendo enseñanzas profundas en su tierra de acogida, Estados Unidos. Además, se formó como discípulo del influyente sheij Hamud al-Faransi, cuya tradición fue transmitida por maestros como Sheij Hasan ibn Abd al-Aziz y Sheij Abdul Wahid Yahya (más conocido por su anterior nombre René Guénon), ellos dos a su vez estudiantes de Sheij Ahmad ibn Mustafa al-Alawi y Sheij Abdul Hadi al-Aqili (antes llamado Iván Aguéli), respectivamente. Que Allah tenga misericordia de todos ellos.",
    "Sin embargo, el destino quiso que su viaje final se cerrara en un lugar lleno de historia y cultura: Guanajuato, México. Allí, rodeado de la belleza de la arquitectura colonial y de un minúsculo grupo de seguidores, falleció en el año 2001, dejando un legado imborrable que sigue guiando a los poquísimos discípulos que buscan la esencia del Islam en nuestra tariqa.",
    "Maulana ʿIyad adoptó, hacia el final de su vida, el madhhab Zahirí tras estudiar las obras de Ibn Hazm, y con ello reafirmó su compromiso con una senda de independencia espiritual, libertad de conciencia y sobriedad en la práctica del irfán (sufismo). En sus enseñanzas se fundían la profundidad del dhikr, el respeto por la cultura y la identidad de los no árabes, y la inquebrantable fe en que cada ser y cada instante son reflejos del Rostro de Allah. Para él, el mundo, lejos de ser una tierra de corrupción, se revela como un campo infinito de signos que invitan a recordar y amar al Creador.",
    "Hoy, al evocar la vida de maulana ʿIyad, sentimos que su espíritu continúa vivo en los corazones de sus pocos pero firmes seguidores que se esfuerzan por transformar lo mundano en bendito. Su historia, forjada en tierras lejanas y consumada en las enseñanzas que dejó, nos invita a perseverar en el camino del dhikr y a honrar la cadena de maestros que nos han legado la luz del conocimiento.",
    "Maulana ʿIyad solía iniciar el día rezando las sunnas de la oración del alba (fajr) en su terraza de una pequeña casa en San Miguel de Allende, mientras su asistente llamaba a la oración (adhan), después algunos alumnos llegaban (entre ellos mi maestro Yahya) y él les decía antes de comenzar la clase de ese día: ¡Oh viajero del camino, que tus pasos sean una eterna oración y que encuentres en cada latido el reflejo del Rostro de Allah! Bismillahi r-Rahmani r-Rahim y luego comenzaba.",
  ],
  // Frase con la que abría sus clases (se destaca al final de la página)
  frase:
    "¡Oh viajero del camino, que tus pasos sean una eterna oración y que encuentres en cada latido el reflejo del Rostro de Allah!",
  datos: [
    { etiqueta: "Tarīqa", valor: "Shadili-Darqawi-ʿIyadiya" },
    { etiqueta: "Su maestro", valor: "Sheij Hamud al-Faransi" },
    { etiqueta: "Su discípulo", valor: "Maulana Yahya al-Kanadi" },
    { etiqueta: "Madhhab", valor: "Ẓāhirī, hacia el final de su vida" },
    {
      etiqueta: "Viajes de estudio",
      valor: "Francia, Marruecos, Egipto, Makkah y Estados Unidos",
    },
    { etiqueta: "Falleció", valor: "2001, Guanajuato, México" },
  ],
};

// ---------------------------------------------------------------------------
// Nuestro Sheij
// ---------------------------------------------------------------------------
export const NUESTRO_SHEIJ = {
  titulo: "Nuestro Sheij",
  nombre: "Mullah Khalid",
  nombreCompleto: "Mullah Abdulhafez Khalid Jorge",
  nombreArabe: "عبد الحفيظ خالد بن خورخه العياضي المكسيكي",
  resumen:
    "Maestro de Estudiantes del Islam en Guanajuato, discípulo de maulana Yahya al-Kanadi y autor de «Luz sobre Luz».",

  fotoPrincipal: {
    src: "/img/sheij/foto_principal.jpg",
    alt: "Mullah Khalid frente a su biblioteca de obras clásicas en árabe",
    ancho: 1000,
    alto: 1777,
  },

  secciones: [
    {
      titulo: "Heredero de una cadena viva",
      parrafos: [
        "Mullah Abdulhafez Khalid Jorge —Mullah Khalid para sus hermanos— guía a los Estudiantes del Islam en Guanajuato. Recibió el camino de la tarīqa shadili-darqawi-ʿiyadiya, una línea que, eslabón por eslabón, se remonta a Abu Madyan de Sevilla, al Imam Ali ibn Abu Talib y, por él, a Rasulullah ﷺ.",
        "Su maestro directo es maulana Yahya al-Kanadi, que Allah le alargue la vida, discípulo a su vez de maulana ʿIyad ibn Yusuf, el vértice de nuestra tarīqa, que falleció en Guanajuato en 2001. También considera maestro suyo al sheij Shalik, quien guía a su hermano por Allah, Habib el Kashlán.",
      ],
    },
    {
      titulo: "Sus maestros",
      parrafos: [
        "Maulana Yahya estudió con numerosos maestros del camino en Estados Unidos, Omán y Makkah: sobre todo con maulana ʿIyad, el discípulo predilecto del sheij Hamud al-Faransi, y con Faysal Khan, de los Emiratos, quien lo socorrió cuando, por decreto de Allah, necesitó un boleto de regreso a América.",
        "En sus largas temporadas con su familia en la Ciudad de México y en León, Guanajuato —pausas de meses en medio de viajes que parecían no terminar—, maulana Yahya enseñó a Mullah Khalid con paciencia y esmero. Con el tiempo, Mullah Khalid se ha sentado también con otros maestros en San Cristóbal de las Casas, Chiapas, y en línea, y por la gracia de Allah ha alcanzado fluidez en inglés y comprensión lectora del árabe.",
      ],
    },
    {
      titulo: "Un amante de los libros",
      parrafos: [
        "Mullah Khalid se considera, ante todo, un amante de los libros, que reúne en su casa en gran número y con entusiasmo. La hermandad conserva además verdaderos tesoros, como un dhikr escrito de puño y letra del sheij Ahmad ibn Mustafa al-Alawi y manuscritos de un opúsculo de dhikr en árabe y francés dictado por el sheij Abu Musa.",
        "De maulana ʿIyad llegó además un tesoro más terrenal: las monedas de oro y plata que heredó de sus padres no musulmanes. Casi todas se repartieron en vida del maulana; el resto pasó a maulana Yahya, quien lo distribuyó entre sus alumnos. A Mullah Khalid le correspondieron cerca de cinco kilogramos de plata, recibidos con una sola condición: que se convirtieran en libros.",
      ],
      foto: {
        src: "/img/sheij/foto_secundaria.jpg",
        alt: "Mullah Khalid sosteniendo un manuscrito antiguo del Corán ante su biblioteca",
        pie: "Muṣḥaf (manuscrito) del Corán otomano del siglo XVIII",
        ancho: 1100,
        alto: 1467,
      },
    },
    {
      titulo: "Fiel a lo recibido",
      parrafos: [
        "Junto con su hermano Habib, Mullah Khalid ha declinado tres invitaciones para integrarse a las tarīqas establecidas en México. Lo hicieron por fidelidad a lo que recibieron de sus maestros. La independencia frente a cualquier financiador, la libertad de conciencia, la shuʿūbiyya —el respeto por la cultura y la identidad de los pueblos no árabes— y la sobriedad en el ʿirfān son valores que quieren conservar intactos mientras Allah les dé vida.",
      ],
    },
    {
      titulo: "Luz sobre Luz",
      parrafos: [
        "Para que esas enseñanzas no se perdieran con el paso de los años, Mullah Khalid las puso por escrito en su libro «Luz sobre Luz», con la esperanza de transmitirlas algún día a sus hijos, si Allah así lo quiere. Habib el Kashlán, que vive en Chiapas entregado al ascetismo y al ayuno constante, lo revisó y corrigió sin aceptar nada a cambio.",
        "Como él mismo dice: si en su obra hay algún beneficio, es por la bendición de Allah; y si hay algún error, es suyo, y por él pide perdón de antemano.",
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Nuestra recitación: qirāʾat Khalaf ʿan Hamza
// ---------------------------------------------------------------------------
export const NUESTRA_RECITACION = {
  titulo: "Nuestra recitación",
  subtitulo: "Qirāʾat Khalaf ʿan Hamza",
  nombreArabe: "قِرَاءَةُ خَلَفٍ عَنْ حَمْزَةَ",
  resumen:
    "En nuestra comunidad recitamos el Corán según la transmisión del imam Khalaf ibn Hisham de la lectura del imam Hamza de Kufa, una de las diez lecturas auténticas.",

  enlaces: [
    {
      icono: "book",
      titulo: "Léela",
      texto:
        "El muṣḥaf completo en la riwāya de Khalaf ʿan Hamza, en línea y gratuito.",
      boton: "Abrir en Internet Archive",
      href: "https://archive.org/details/khalaf-an-hamza/page/n311/mode/2up",
    },
    {
      icono: "play",
      titulo: "Escúchala",
      texto:
        "El Corán completo recitado por el sheij Abdur-Rashid Sufi en esta lectura.",
      boton: "Escuchar en QuranicAudio",
      href: "https://quranicaudio.com/quran/62",
    },
    {
      icono: "cart",
      titulo: "Tenla en físico",
      texto:
        "Un muṣḥaf impreso en la narración de Khalaf ʿan Hamza, por unos 27 dólares.",
      boton: "Comprar en EasyQuran",
      href: "https://easyquran.com/en/khalaf-an-hamzah-narration/",
    },
  ],

  secciones: [
    {
      titulo: "Una recitación que viene del Profeta ﷺ",
      parrafos: [
        "Las lecturas auténticas del Corán (qirāʾāt) no son estilos ni interpretaciones: llegan hasta nosotros por cadenas masivas e ininterrumpidas de maestros (tawātur) que se remontan al Profeta ﷺ. Con ellas no solo se transmiten las palabras, sino la manera exacta en que él las pronunciaba: dónde se detenía, cuánto alargaba cada vocal (madd) y los matices propios de su voz.",
        "Recitar según una qirāʾa es, por eso, repetir el Corán tal como salió de los labios de Rasulullah ﷺ, con el mismo ritmo y el mismo aliento.",
      ],
    },
    {
      titulo: "Una lectura en varias dimensiones",
      parrafos: [
        "La lectura de Hamza es célebre por la riqueza de sus reglas. Una de las más bellas es el ishmām: en algunos casos es un gesto de los labios, que se redondean para indicar una vocal sin llegar a pronunciarla, de modo que la recitación también se ve; en otros, como en aṣ-ṣirāṭ, la letra ṣād se tiñe con el sonido de la zāy.",
        "A esto se suman sus reglas propias para detenerse sobre la hamza, que obligan al recitador a estar atento a cada pausa. Es una lectura que se escucha, se ve y se medita.",
      ],
    },
    {
      titulo: "¿Por qué no la lectura de Hafs?",
      parrafos: [
        "La lectura de Hafs an Asim es hoy la más extendida en el mundo, en buena parte gracias al muṣḥaf impreso en El Cairo en 1924, que se reprodujo masivamente y se convirtió en el modelo de casi todas las ediciones modernas.",
        "Sin embargo, su transmisor, Hafs ibn Sulayman, tiene una particularidad llamativa: el gran ḥāfiẓ Ibn Hajar al-Asqalani lo califica en su Taqrīb at-Tahḏīb como «matrūk al-ḥadīṯ», es decir, alguien cuyos hadices se rechazan, aunque reconoce su maestría en la recitación. Los sabios aceptan su lectura del Corán, pero no su transmisión de hadices.",
        "Esto no afect a la validez de la lectura de Hafs, que es aceptada por consenso. Pero con el imam Khalaf esa paradoja simplemente no existe.",
      ],
    },
    {
      titulo: "El imam Khalaf",
      parrafos: [
        "Khalaf ibn Hisham al-Bazzar (150–229 H), de Bagdad, aprendió la lectura de Hamza de su discípulo Sulaym ibn Isa. Fue un hombre íntegro y de excelente reputación. Además, él mismo es contado entre los diez grandes lectores del Corán.",
        "Ibn Hajar lo califica de «ṯiqa», digno de confianza, y le reconoce una lectura propia en las qirāʾāt. Su recitación y su palabra son igualmente aceptadas.",
      ],
    },
  ],

  ficha: [
    {
      etiqueta: "Imam de la lectura",
      valor: "Hamza ibn Habib az-Zayyat (80–156 H), Kufa",
    },
    {
      etiqueta: "Transmisor (rāwī)",
      valor: "Khalaf ibn Hisham al-Bazzar (150–229 H), Bagdad",
    },
    { etiqueta: "Cadena", valor: "Khalaf ← Sulaym ibn Isa ← Hamza" },
    {
      etiqueta: "Lugar entre las lecturas",
      valor: "Una de las siete de Ibn Mujahid y de las diez canónicas",
    },
  ],

  // Juicios de Ibn Hajar en Taqrīb at-Tahḏīb
  juicios: [
    {
      nombre: "Khalaf ibn Hisham",
      arabe: "ثقة، له اختيار في القراءات",
      traduccion:
        "Digno de confianza; tiene una lectura propia en las qirāʾāt.",
      favorable: true,
    },
    {
      nombre: "Hafs ibn Sulayman",
      arabe: "متروك الحديث مع إمامته في القراءة",
      traduccion: "Rechazado en el hadiz, aunque es un imam en la recitación.",
      favorable: false,
    },
  ],
};
