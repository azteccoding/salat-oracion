// =====================================================================
//  Ṣalāt — PASOS DE LA PÁGINA /salat
//  Según el Muḥallá del Imam Ibn Ḥazm. Solo edita aquí.
//
//    name:        identificador único, sin espacios
//    title:       título del paso
//    description: texto pequeño arriba del título (Obligatorio / Recomendado)
//    instruction: la explicación del paso
//    tripleText:  [árabe, transliteración, español] si hay algo que recitar;
//                 déjalo como [] si el paso no lleva recitación
// =====================================================================

export const steps = [
  {
    name: "paso-1",
    title: "La intención",
    description: "Obligatorio",
    instruction:
      "De pie y mirando a la qibla, ten en tu corazón la intención de rezar esa oración en concreto (el ṣubḥ, el ẓuhr…). La intención va justo antes del takbīr, unida a él, sin separación.",
    tripleText: [],
  },
  {
    name: "paso-2",
    title: "El takbīr de entrada",
    description: "Obligatorio",
    instruction:
      "Di «Allāhu akbar» alzando las manos hasta la altura de las orejas o de los hombros. Alzar las manos en este primer takbīr es obligatorio: sin ello la oración no vale.",
    tripleText: ["اللَّهُ أَكْبَرُ", "Allāhu akbaru", "Allah es el más grande"],
  },
  {
    name: "paso-3",
    title: "Las manos",
    description: "Recomendado",
    instruction:
      "Durante todo el tiempo que estés de pie, pon tu mano derecha sobre la muñeca de la izquierda. Ibn Ḥazm no fija la altura: no dice si van sobre el pecho o bajo el ombligo. Ibn Arabí dice que se pueden dejar colgando a los lados o sujetarlas frente al cuerpo: ambas opciones son válidas.",
    tripleText: [],
  },
  {
    name: "paso-4",
    title: "La invocación de apertura",
    description: "Recomendado (para el imam y quien reza solo)",
    instruction:
      "Después del takbīr puedes decir una invocación de apertura. Esta es una de las que enseñó el Profeta ﷺ.",
    tripleText: [
      "اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ، اللَّهُمَّ نَقِّنِي مِنْ خَطَايَايَ كَمَا يُنَقَّى الثَّوْبُ الْأَبْيَضُ مِنَ الدَّنَسِ، اللَّهُمَّ اغْسِلْنِي مِنْ خَطَايَايَ بِالثَّلْجِ وَالْمَاءِ وَالْبَرَدِ",
      "Allāhumma bāʿid baynī wa-bayna jaṭāyāya kamā bāʿadta bayna l-mašriqi wa-l-magribi, Allāhumma naqqinī min jaṭāyāya kamā yunaqqá l-ṯawbu l-abyaḍu mina l-danasi, Allāhumma gsilnī min jaṭāyāya bi-l-ṯalŷi wa-l-māʾi wa-l-baradi",
      "Oh Allah, aleja de mí mis faltas como alejaste el oriente del occidente. Oh Allah, límpiame de mis faltas como se limpia de la suciedad la ropa blanca. Oh Allah, lava mis faltas con nieve, agua y granizo.",
    ],
  },
  {
    name: "paso-5",
    title: "Pedir refugio",
    description: "Obligatorio en cada rakʿa",
    instruction:
      "Antes de recitar, pide refugio en Allah. Se dice en cada rakʿa.",
    tripleText: [
      "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
      "Aʿūḏu bi-llāhi mina l-šayṭāni l-raŷīmi",
      "Me refugio en Allah del demonio maldito",
    ],
  },
  {
    name: "paso-6",
    title: "La Fātiḥa",
    description: "Obligatorio en cada rakʿa",
    instruction:
      "Recita la Fātiḥa en cada rakʿa, empezando por la basmala, que en nuestra lectura (Jalaf ʿan Ḥamza) es la primera aleya. Es obligatoria para todos, también para quien reza detrás del imam, que la lee en voz baja aunque el imam recite en voz alta. Solo vale en árabe.",
    tripleText: [
      "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ ﴿١﴾ ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ ﴿٢﴾ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ ﴿٣﴾ مَلِكِ يَوۡمِ ٱلدِّينِ ﴿٤﴾ إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ ﴿٥﴾ ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ ﴿٦﴾ صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهُمۡ غَيۡرِ ٱلۡمَغۡضُوبِ عَلَيۡهُمۡ وَلَا ٱلضَّآلِّينَ ﴿٧﴾",
      "Bi-smi llāhi l-raḥmāni l-raḥīm. Al-ḥamdu li-llāhi rabbi l-ʿālamīn. Al-raḥmāni l-raḥīm. Maliki yawmi l-dīn. Iyyāka naʿbudu wa-iyyāka nastaʿīn. Ihdinā l-ṣirāṭa l-mustaqīm. Ṣirāṭa llaḏīna anʿamta ʿalayhum gayri l-magḍūbi ʿalayhum wa-lā l-ḍāllīn",
      "En el nombre de Allah, el Compasivo, el Misericordioso. Todas las alabanzas son para Allah, Señor de los mundos, el Compasivo, el Misericordioso, Rey del Día del Juicio. Solo a Ti adoramos y solo a Ti pedimos ayuda. Guíanos por el camino recto, el camino de aquellos a quienes has favorecido, no el de los que incurrieron en la ira ni el de los extraviados.",
    ],
  },
  {
    name: "paso-7",
    title: "Āmīn",
    description: "Obligatorio para quien reza detrás del imam",
    instruction:
      "Al terminar la Fātiḥa se dice «āmīn» en voz alta. Para quien reza detrás del imam es obligatorio; para el imam y para quien reza solo es recomendado.",
    tripleText: ["آمِينَ", "Āmīna", "Así sea"],
  },
  {
    name: "paso-8",
    title: "Otra sura",
    description: "Recomendado",
    instruction:
      "Después de la Fātiḥa puedes recitar más Corán, por ejemplo la sura al-Ijlāṣ (112), aquí en la lectura de Jalaf ʿan Ḥamza. Solo la Fātiḥa es obligatoria. Quien reza detrás del imam no recita nada más que la Fātiḥa.",
    tripleText: [
      "قُلۡ هُوَ ٱللَّهُ أَحَدٌ ﴿١﴾ ٱللَّهُ ٱلصَّمَدُ ﴿٢﴾ لَمۡ يَلِدۡ وَلَمۡ يُولَدۡ ﴿٣﴾ وَلَمۡ يَكُن لَّهُۥ كُفۡؤًا أَحَدٌۢ ﴿٤﴾",
      "Qul huwa llāhu aḥad. Allāhu l-ṣamad. Lam yalid wa-lam yūlad. Wa-lam yakun lahu kufʾan aḥad",
      "Di: Él es Allah, Uno. Allah, el Absoluto. No engendró ni fue engendrado, y no hay nadie que se le asemeje.",
    ],
  },
  {
    name: "paso-9",
    title: "La inclinación (rukūʿ)",
    description: "Obligatorio",
    instruction:
      "Di «Allāhu akbar» e inclínate con las manos sobre las rodillas, la espalda recta y la cabeza a la altura de la espalda. Quédate quieto hasta que todo tu cuerpo se asiente y di:",
    tripleText: [
      "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
      "Subḥāna rabbiya l-ʿaẓīmi",
      "Glorificado sea mi Señor, el Inmenso",
    ],
  },
  {
    name: "paso-10",
    title: "Levantarse",
    description: "Obligatorio",
    instruction:
      "Levántate hasta quedar recto de pie diciendo «samiʿa llāhu li-man ḥamidahu» (todos lo dicen, también quien reza detrás del imam). Luego quien reza detrás del imam debe decir «rabbanā wa-laka l-ḥamdu»; para el imam y quien reza solo es recomendado.",
    tripleText: [
      "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ ۞ رَبَّنَا وَلَكَ الْحَمْدُ",
      "Samiʿa llāhu li-man ḥamidahu — Rabbanā wa-laka l-ḥamdu",
      "Allah escucha a quien Le alaba — Señor nuestro, a Ti la alabanza",
    ],
  },
  {
    name: "paso-11",
    title: "Bajar a la postración",
    description: "Obligatorio",
    instruction:
      "Di «Allāhu akbar» y baja poniendo primero las manos en el suelo y después las rodillas, no al revés.",
    tripleText: [],
  },
  {
    name: "paso-12",
    title: "La postración (suŷūd)",
    description: "Obligatorio",
    instruction:
      "Apoya en el suelo la frente y la nariz (descubiertas), las manos, las rodillas y las puntas de los pies. Separa los brazos del cuerpo y no los extiendas en el suelo. Quédate quieto y di lo siguiente. Después puedes suplicar a Allah con lo que quieras, pero no recites Corán en la postración ni en la inclinación.",
    tripleText: [
      "سُبْحَانَ رَبِّيَ الْأَعْلَى",
      "Subḥāna rabbiya l-aʿlá",
      "Glorificado sea mi Señor, el Altísimo",
    ],
  },
  {
    name: "paso-13",
    title: "Sentarse entre las dos postraciones",
    description: "Obligatorio",
    instruction:
      "Di «Allāhu akbar» y siéntate sobre tu pie izquierdo extendido, con el derecho erguido sobre los dedos. Quédate quieto un momento.",
    tripleText: [],
  },
  {
    name: "paso-14",
    title: "La segunda postración",
    description: "Obligatorio",
    instruction:
      "Di «Allāhu akbar» y postérnate de nuevo como en el paso 12. Con esto termina la rakʿa.",
    tripleText: [],
  },
  {
    name: "paso-15",
    title: "La siguiente rakʿa",
    description: "Pedir refugio y Fātiḥa otra vez",
    instruction:
      "Es recomendable sentarte un momento antes de levantarte. Ponte de pie diciendo «Allāhu akbar» y repite desde el paso 5 (pedir refugio) hasta el 14.",
    tripleText: [],
  },
  {
    name: "paso-16",
    title: "La sentada y el tašahhud",
    description: "Obligatorio",
    instruction:
      "Tras la segunda rakʿa siéntate sobre tu pie izquierdo, con el derecho erguido, y recita el tašahhud. Esta sentada y el tašahhud son obligatorios.",
    tripleText: [
      "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
      "Al-taḥiyyātu li-llāhi wa-l-ṣalawātu wa-l-ṭayyibātu, al-salāmu ʿalayka ayyuhā l-nabiyyu wa-raḥmatu llāhi wa-barakātuhu, al-salāmu ʿalaynā wa-ʿalá ʿibādi llāhi l-ṣāliḥīna, ašhadu an lā ilāha illā llāhu, wa-ašhadu anna Muḥammadan ʿabduhu wa-rasūluhu",
      "Los saludos, las oraciones y las cosas buenas son para Allah. La paz sea contigo, oh Profeta, y la misericordia de Allah y Sus bendiciones. La paz sea con nosotros y con los siervos rectos de Allah. Atestiguo que no hay dios sino Allah y atestiguo que Muḥammad es Su siervo y Su mensajero.",
    ],
  },
  {
    name: "paso-17",
    title: "Pedir refugio de cuatro cosas",
    description: "Obligatorio en cada tašahhud",
    instruction:
      "Después del tašahhud, en la primera sentada y en la última, di:",
    tripleText: [
      "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ، وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ",
      "Allāhumma innī aʿūḏu bika min ʿaḏābi ŷahannama, wa-aʿūḏu bika min ʿaḏābi l-qabri, wa-min fitnati l-maḥyā wa-l-mamāti, wa-min šarri fitnati l-masīḥi l-daŷŷāli",
      "Oh Allah, me refugio en Ti del castigo del Infierno, me refugio en Ti del castigo de la tumba, de la prueba de la vida y de la muerte, y del mal de la prueba del Falso Mesías.",
    ],
  },
  {
    name: "paso-18",
    title: "La bendición sobre el Profeta ﷺ",
    description: "Recomendado en cada tašahhud",
    instruction:
      "Es recomendable bendecir al Profeta ﷺ después del tašahhud, en ambas sentadas. Si la dejas, tu oración es válida.",
    tripleText: [
      "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ وَعَلَى أَزْوَاجِهِ وَذُرِّيَّتِهِ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ، وَبَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ وَعَلَى أَزْوَاجِهِ وَذُرِّيَّتِهِ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ فِي الْعَالَمِينَ، إِنَّكَ حَمِيدٌ مَجِيدٌ",
      "Allāhumma ṣalli ʿalá Muḥammadin wa-ʿalá āli Muḥammadin wa-ʿalá azwāŷihi wa-ḏurriyyatihi, kamā ṣallayta ʿalá Ibrāhīma wa-ʿalá āli Ibrāhīma, innaka ḥamīdun maŷīdun, wa-bārik ʿalá Muḥammadin wa-ʿalá āli Muḥammadin wa-ʿalá azwāŷihi wa-ḏurriyyatihi, kamā bārakta ʿalá Ibrāhīma wa-ʿalá āli Ibrāhīma fī l-ʿālamīna, innaka ḥamīdun maŷīdun",
      "Oh Allah, bendice a Muḥammad, a la familia de Muḥammad, a sus esposas y a su descendencia, como bendijiste a Abraham y a la familia de Abraham; Tú eres el Alabado, el Glorioso. Y colma de bendición a Muḥammad, a la familia de Muḥammad, a sus esposas y a su descendencia, como colmaste a Abraham y a la familia de Abraham entre todos los mundos; Tú eres el Alabado, el Glorioso.",
    ],
  },
  {
    name: "paso-19",
    title: "Tercera y cuarta rakʿa",
    description: "Si la oración las tiene",
    instruction:
      "El ṣubḥ tiene 2 rakʿas; el maġrib, 3; el ẓuhr, el ʿaṣr y el ʿišāʾ, 4. Si tu oración tiene más de dos, levántate diciendo «Allāhu akbar» y reza las que faltan como en los pasos 5 al 14.",
    tripleText: [],
  },
  {
    name: "paso-20",
    title: "La sentada final",
    description: "Obligatorio",
    instruction:
      "En la última rakʿa siéntate con las asentaderas en el suelo, el pie derecho erguido y el izquierdo tendido. Recita el tašahhud, pide refugio de las cuatro cosas y, si quieres, bendice al Profeta ﷺ (pasos 16 a 18).",
    tripleText: [],
  },
  {
    name: "paso-21",
    title: "El salām",
    description: "Obligatorio",
    instruction:
      "Saluda volviendo el rostro a la derecha; este primer salām es obligatorio y con él sales de la oración. El segundo, a la izquierda, es recomendado.",
    tripleText: [
      "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
      "Al-salāmu ʿalaykum wa-raḥmatu llāhi",
      "La paz sea con ustedes y la misericordia de Allah",
    ],
  },
];
