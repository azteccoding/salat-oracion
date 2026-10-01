import Link from "next/link";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import { conContexto, tienePendientes } from "@/lib/seo";
import Secciones from "@/components/comunidad/Secciones";
import NavIbnHazm from "@/components/ibn-hazm/NavIbnHazm";
import c from "@/styles/site/Comunidad.module.css";
import firma from "@/styles/site/Sheij.module.css";
import ui from "@/styles/site/ui.module.css";

// Página a la que solo se llega desde el Home (no está en el menú).

// =====================================================================
//  CONTENIDO
// =====================================================================

const RESUMEN =
  "Poeta, visir, jurista y teólogo andalusí; el gran sistematizador del método ẓāhirī, que pidió la prueba a todos y no se vendió a nadie.";

const NOMBRE_ARABE = "أبو محمد علي بن أحمد بن سعيد بن حزم الأندلسي";
const NOMBRE_LATINO =
  "Abū Muḥammadin ʿAlī bnu Aḥmada bni Saʿīdi bni Ḥazmin al-Andalusiyyu";

// Versos que dijo cuando quemaron sus libros en Sevilla.
const VERSOS = {
  arabe: [
    "فإن تحرقوا القرطاس لا تحرقوا الذي ... تضمّنه القرطاس بل هو في صدري",
    "يسير معي حيث استقلّت ركائبي ... وينزل إن أنزل ويُدفن في قبري",
  ],
  traduccion:
    "Si quemáis el papel, no quemaréis lo que el papel contenía: eso está en mi pecho. Va conmigo adondequiera que me lleven mis monturas; se detiene donde yo me detengo, y conmigo será enterrado.",
  fuente: "Ibn Ḥazm, ante la hoguera de sus libros en Sevilla",
};

// Cada sección: { titulo, parrafos: ["…", "…"], foto?: { src, alt, ancho, alto, pie } }
// Las fotos van en public/img/ibn-hazm/.
const VIDA = [
  {
    titulo: "Un hombre que no se dejó domesticar",
    parrafos: [
      "Hay sabios que se recuerdan por lo que concedieron y otros por lo que se negaron a conceder. Abū Muḥammadin ʿAlī bnu Aḥmada bni Saʿīdi bni Ḥazmin pertenece a los segundos. Fue poeta, visir, jurista, teólogo, historiador de las religiones y uno de los más finos observadores del amor que ha dado la literatura universal. Quizá fue la inteligencia más completa de al-Ándalus, y cada una de sus convicciones la pagó con cárcel, destierro o soledad.",
      "Nunca pidió que se le creyera por su nombre. Pedía la prueba, y se la pedía a todos: a los alfaquíes de su ciudad, a los reyes de taifas, a los sabios que llegaban de Oriente cubiertos de prestigio, y también a sí mismo. Por eso, casi mil años después, sigue siendo incómodo. Y por eso mismo sigue siendo necesario.",
    ],
  },
  {
    titulo: "Córdoba, la ciudad de los califas",
    parrafos: [
      "Nació en Córdoba la última noche de ramaḍān del año 384 H, el 7 de noviembre de 994, cuando la ciudad era la capital más brillante de Occidente. Su padre, Aḥmad, fue visir de Almanzor, y el niño creció en al-Zāhira, la ciudad palatina que el ḥāŷib había levantado junto a Córdoba.",
      "Sobre el origen de la familia hay dos noticias. Los genealogistas le atribuyeron un antepasado persa, cliente de los omeyas; varios historiadores la consideran, en cambio, una familia hispana convertida al islam, lo que en al-Ándalus se llamaba muladí. Para nosotros, musulmanes de esta otra orilla del mar, no es un detalle menor: el mayor sabio de al-Ándalus pudo ser nieto de gente de la Península que un día pronunció la šahāda, como la pronunciamos nosotros.",
      "Él mismo cuenta en El collar de la paloma que sus primeras maestras fueron las mujeres del palacio. Ellas le enseñaron el Corán, le recitaron poesía y le adiestraron en la escritura. El hombre que después sería temido por su rigor aprendió a leer en manos de mujeres, y nunca lo ocultó.",
    ],
  },
  {
    titulo: "La fitna: el fin de un mundo",
    parrafos: [
      "Tenía unos catorce años cuando estalló la fitna, la guerra civil que despedazó el califato de Córdoba. En pocos años lo perdió casi todo. Su padre murió en 402 H / 1012, la casa familiar quedó en ruinas y, por su lealtad a la causa omeya, fue desterrado a Almería en 404 H / 1013.",
      "Siguieron años de prisión, expulsiones y huidas: Aznalcázar, Valencia, una batalla en la que cayó prisionero. En Xàtiva, con poco menos de treinta años, escribió Ṭawqu l-ḥamāmati fī l-ulfati wa-l-ullāfi, El collar de la paloma, un tratado sobre el amor y los amantes. Escribió sobre la ternura en medio de la guerra, y sobre la fidelidad en un tiempo de traiciones.",
      "En 414 H / 1023 fue visir del califa ʿAbd al-Raḥmān V al-Mustaẓhir. El cargo le duró unas siete semanas: el califa fue asesinado y él volvió a la cárcel. Al salir, se apartó de la política para siempre. Había visto de cerca lo que el poder hace con los hombres y no quiso volver a servirlo.",
    ],
  },
  {
    titulo: "Un estudiante tardío",
    parrafos: [
      "Se cuenta que, ya adulto, entró en una mezquita durante un funeral y se sentó sin rezar las dos rakʿas de saludo a la mezquita. Alguien le reprendió. En otra ocasión quiso enmendarse y rezó a una hora en que no correspondía, y le volvieron a corregir. Aquel hombre de corte, que sabía de poesía, de lógica y de historia, descubrió que ignoraba lo más básico de su propia práctica. No se ofendió. Se puso a estudiar fiqh, hacia los veintiséis años de edad.",
      "Empezó en la escuela mālikí, que era la oficial en al-Ándalus. Pasó después a la šāfiʿí, atraído por su rigor en el uso de las pruebas, y terminó en el método ẓāhirī, de la mano de su maestro Masʿūd ibn Sulaymān ibn Muflit. Nadie le heredó ese camino: lo ganó preguntando, y cambió de escuela cada vez que una prueba le pareció más fuerte que su costumbre.",
      "La historiadora Maribel Fierro ha mostrado que el método ẓāhirī le permitía algo más que una técnica jurídica: le servía para defender la razón frente al carisma, para que la autoridad religiosa no dependiera del prestigio de una persona sino de lo que se puede demostrar.",
    ],
  },
  {
    titulo: "Prohibido sentarse con él",
    parrafos: [
      "Enseñó en la mezquita mayor de Córdoba, y sus clases se llenaron. Los alfaquíes mālikíes, que controlaban los cargos y las rentas religiosas, lo denunciaron ante las autoridades. Se le prohibió enseñar y se advirtió a la gente que no se sentara con él. Desde entonces vivió errante por las taifas, de corte en corte, sin hogar fijo para su saber.",
      "Hacia 430 H / 1039 se refugió en Mallorca, donde encontró un protector y discípulos. Años más tarde llegó a la isla Abū l-Walīd al-Bāŷī, que volvía de unos trece años de estudios en Oriente con toda la autoridad que daba haber estudiado allá. Los dos debatieron. Al-Bāŷī era un gran sabio, pero el prestigio de Oriente pesó más que los argumentos, e Ibn Ḥazm tuvo que dejar la isla.",
      "Aquella misma dignidad lo llevó a escribir la Risālatun fī faḍli l-Andalusi wa-ḏikri riŷālihā, su epístola sobre el mérito de al-Ándalus. Un sabio de Qayrawān había escrito que los andalusíes no tenían sabios dignos de mención. Ibn Ḥazm le respondió con una lista abrumadora de nombres y obras. No defendía una vanidad local: defendía que el conocimiento no tiene una sola patria, y que un pueblo que abrazó el islam lejos de Arabia no es menos capaz de comprenderlo.",
    ],
  },
  {
    titulo: "La hoguera de Sevilla",
    parrafos: [
      "Al-Muʿtaḍid ibn ʿAbbād, rey de la taifa de Sevilla, mandó quemar sus libros en público, con el aplauso de los alfaquíes de la ciudad. Era la manera de borrar a un hombre sin tener que refutarlo.",
      "Ibn Ḥazm respondió con los versos que abren esta página: podéis quemar el papel, pero no lo que el papel contenía, porque eso está en mi pecho, va conmigo adondequiera que vaya y será enterrado conmigo. Quien ha amado los libros entiende esos versos. Los libros pueden arder; lo que se aprendió con amor y se custodió con sacrificio no arde.",
    ],
  },
  {
    titulo: "Lo que dejó escrito",
    parrafos: [
      "Su hijo Abū Rāfiʿ al-Faḍl contó que su padre dejó unos cuatrocientos volúmenes, cerca de ochenta mil folios. Sobrevive una cuarentena de obras, y bastan para medir su alcance: un tratado de fiqh entero con sus pruebas, Al-Muḥallá bi-l-āṯāri; una teoría del método jurídico, Al-Iḥkāmu fī uṣūli l-aḥkāmi; una historia crítica de las religiones y las sectas, Al-Fiṣalu fī l-milali wa-l-ahwāʾi wa-l-niḥali; un tratado de lógica, Al-Taqrību li-ḥaddi l-manṭiqi; una ética, Al-Ajlāqu wa-l-siyaru fī mudāwāti l-nufūsi; una genealogía de los árabes, Ŷamharatu ansābi l-ʿarabi; y El collar de la paloma.",
      "Con Al-Fiṣal se le considera uno de los padres de la religión comparada. Estudió el judaísmo, el cristianismo, el zoroastrismo y las corrientes del pensamiento islámico leyendo sus textos y discutiendo sus argumentos, siglos antes de que Europa hiciera algo parecido. El gran arabista Miguel Asín Palacios le dedicó cinco volúmenes a esa obra.",
      "Su huella llegó lejos. Los almohades recogieron parte de su programa. Ibn Taymiyya e Ibn al-Qayyim lo leyeron con atención, aunque discreparan; Ibn Ḥaŷar, al-Šawkānī e Ibn Jaldūn lo citan. Y en el siglo XX lo rescataron sabios como Aḥmad Šākir, que editó Al-Muḥallá, y Muḥammad Abū Zahra, que le dedicó un estudio entero.",
    ],
  },
  {
    titulo: "Retiro y muerte en Manta Līšam",
    parrafos: [
      "Pasó sus últimos años en Manta Līšam, la finca de su familia cerca de Niebla, en la actual provincia de Huelva. Allí siguió escribiendo y enseñando a quienes se atrevían a buscarlo, entre ellos sus hijos Abū Rāfiʿ al-Faḍl, Abū Usāma Yaʿqūb y Abū Sulaymān al-Muṣʿab, que transmitieron sus libros.",
      "Murió el 28 de šaʿbān de 456 H, el 15 de agosto de 1064, a los setenta y un años, a las puertas de ramaḍān, el mes en que había nacido. Que Allah tenga misericordia de él.",
    ],
  },
];

// Lo que su vida nos enseña hoy.
const LECCIONES = [
  {
    titulo: "Un imam para nuestro tiempo",
    parrafos: [
      "Leer a Ibn Ḥazm no es un ejercicio de nostalgia andalusí. Muchos de los males que él combatió siguen entre nosotros: la religión convertida en costumbre, el sabio al servicio de quien paga, la obediencia ciega a los nombres famosos, la sospecha contra la razón. Por eso lo llamamos nuestro imam en el fiqh, y por eso su vida nos deja estas lecciones.",
    ],
  },
  {
    titulo: "La prueba antes que el prestigio",
    parrafos: [
      "Para Ibn Ḥazm el taqlīd, seguir a alguien sin conocer su prueba, es ilícito. Las fuentes de la religión son el Corán, la Sunna auténtica y el consenso de los Compañeros; ninguna opinión humana obliga por sí misma. Rechazó el qiyās, la analogía, y el juicio discrecional, porque la religión ya está completa: «Hoy os he completado vuestra religión» (al-Māʾida, 5:3).",
      "Esto no es desprecio por los sabios. Es lo contrario: tomarlos en serio, pedirles sus pruebas y aprender de ellas. El Corán ya lo enseña: «Di: traed vuestra prueba, si sois veraces» (al-Baqara, 2:111). En un tiempo en que la religión llega empaquetada con el sello de un nombre famoso o de una institución extranjera, esa pregunta, ¿cuál es tu prueba?, sigue siendo la más sana y la más incómoda. Más de uno ha sido expulsado de un círculo, o de un grupo, solo por hacerla.",
    ],
  },
  {
    titulo: "El islam no es una costumbre importada",
    parrafos: [
      "Ibn Ḥazm sostuvo que el árabe no es superior en sí mismo a las demás lenguas, y que el árabe, el hebreo y el siriaco fueron en su origen una sola lengua. Defendió la dignidad de al-Ándalus frente a quienes miraban a los andalusíes desde arriba. Es lo que la tradición llamó šuʿūbiyya: el reconocimiento de que los pueblos no árabes valen lo mismo ante Allah.",
      "Para un musulmán mexicano esto es una liberación. Aprender árabe es un acto de amor al Corán, no un disfraz. Abrazar el islam no obliga a cambiar de patria, de apellido o de cocina, ni a adoptar las costumbres de un país lejano como si fueran revelación. Lo que Allah y Su Mensajero ﷺ ordenaron es religión; todo lo demás es costumbre, respetable pero no obligatoria.",
    ],
  },
  {
    titulo: "El sabio que no se vende",
    parrafos: [
      "En Al-Taljīṣu li-wuŷūhi l-tajlīṣi criticó con dureza a los reyes de taifas y a los alfaquíes que bendecían sus abusos a cambio de cargos y rentas. Él, que había sido visir, prefirió la pobreza y el exilio antes que poner su ciencia al servicio del poder.",
      "En su libro de ética dejó escrita una frase que vale como programa de vida: no entregues tu alma sino a lo que es más alto que ella, y eso no es otra cosa que Allah. Hoy, cuando hay mezquitas y predicadores que dependen del dinero que llega de fuera y repiten la doctrina de quien paga, su ejemplo es una advertencia: el conocimiento que se compra deja de ser libre, y el que no es libre no puede ser verdadero.",
    ],
  },
  {
    titulo: "Un suelo común para una Ummah dividida",
    parrafos: [
      "El método ẓāhirī reduce lo obligatorio y lo prohibido a lo que el texto establece con claridad. Todo lo demás queda en el amplio espacio de lo permitido. «Ya os ha detallado lo que os ha prohibido» (al-Anʿām, 6:119): lo que Allah no prohibió, nadie tiene derecho a prohibirlo.",
      "Ese principio es un suelo común para musulmanes que vienen de escuelas y tradiciones distintas. Si lo obligatorio es solo lo que el texto obliga, desaparecen muchas de las razones con que hoy nos dividimos y nos excomulgamos unos a otros.",
    ],
  },
  {
    titulo: "Razón, ciencia y revelación",
    parrafos: [
      "Ibn Ḥazm enseñó que la razón y los sentidos son dones de Allah, y que despreciarlos es despreciar al que los dio. Escribió un tratado de lógica para que los juristas aprendieran a razonar bien, y en Marātibu l-ʿulūmi trazó un plan de estudios que integraba las ciencias de la religión con la gramática, la historia, la medicina y las matemáticas.",
      "Para quienes llegamos al islam con una formación de ingenieros, abogados, médicos o maestros, es una invitación clara: no hay que elegir entre la fe y la inteligencia.",
    ],
  },
  {
    titulo: "El texto por encima del prejuicio",
    parrafos: [
      "Siguiendo el texto hasta sus últimas consecuencias, Ibn Ḥazm afirmó que hubo mujeres que recibieron una forma de profecía, porque Allah les habló o les envió ángeles: María, la madre de Moisés, Sara, Eva, Āsiya y Agar. No era una concesión a las modas; era fidelidad al Corán por encima de las costumbres de su época.",
      "Con el mismo criterio juzgó la música por la intención de quien la escucha, y no por el prejuicio de quien la condena. Su rigor no era dureza contra la vida: era negarse a prohibir lo que Allah no prohibió.",
    ],
  },
  {
    titulo: "El amor al Profeta y a su Casa",
    parrafos: [
      "En su libro de ética escribió que quien quiera el bien de la otra vida y reunir todas las virtudes debe imitar a Muḥammad ﷺ. Todo su método, tan exigente, no tenía otro fin que volver a lo que el Profeta ﷺ dijo e hizo, sin añadidos.",
      "Llevaba el nombre de ʿAlī, y sobre ʿAlī ibn Abī Ṭālib, que Allah enaltezca su rostro, fue claro. En Al-Fiṣal, a partir del ḥadīṯ del Profeta ﷺ según el cual a ʿAmmār lo mataría el grupo rebelde, concluye que ʿAlī era el imam legítimo y que estaba en la verdad sin ninguna duda, y que quienes le disputaron el poder se equivocaron. Lo dijo un hombre que había sido leal a los omeyas toda su vida: la prueba pesó más que su partido.",
    ],
  },
  {
    titulo: "Tomar su método, no su aspereza",
    parrafos: [
      "Ibn Ḥazm no fue un santo de estampa. Se decía que su lengua era gemela de la espada de al-Ḥaŷŷāŷ, y él mismo atribuyó su carácter agrio a una enfermedad que padeció. Fue durísimo con los muʿtazilíes, con los ašʿaríes, con los jāriŷíes y con la šīʿa, a una parte de la cual llegó a sacar del islam. En eso no lo seguimos. Una comunidad que honra por igual a los Compañeros y a la Casa del Profeta ﷺ no puede heredar esa aspereza.",
      "Hay que decir también una verdad incómoda. En el siglo XX, una corriente que se presenta como retorno a los salaf se apropió de su rechazo del taqlīd, pero lo convirtió en un nuevo taqlīd, el de sus propios jeques, y usó su rigor textual como arma contra el tasawwuf y contra los demás musulmanes. Ibn Ḥazm no habría aceptado ese trueque. Él pedía la prueba también a quienes decían seguirlo, amaba la poesía, escribió el libro más tierno sobre el amor que dio al-Ándalus y dio la razón a ʿAlī.",
    ],
  },
  {
    titulo: "Una misma tierra",
    parrafos: [
      "Medio siglo después de su muerte nació cerca de Sevilla, la ciudad que había quemado sus libros, Abū Madyan, el maestro por el que pasan las cadenas de tantas tarīqas del Magreb. Y Muḥyī l-Dīn ibn ʿArabī, el más grande de los maestros del tasawwuf, fue ẓāhirī en el fiqh y compendió Al-Muḥallá en una obra que llamó Al-Muʿallá fī ijtiṣāri l-Muḥallá. Se cuenta que vio en sueños al Profeta ﷺ abrazar a Ibn Ḥazm. El rigor del texto y la luz del corazón no son enemigos: al-Ándalus los vio crecer en la misma tierra.",
      "Ibn Ḥazm defendió el honor de su pueblo frente a quienes lo despreciaban desde lejos. Nos toca hacer lo mismo con el nuestro: que México despierte, que sus musulmanes estudien, pregunten, pidan la prueba y no se conformen con un islam prestado. Lo que haya de acierto en estas líneas viene de Allah, y lo que haya de error es nuestro. Y Allah sabe más.",
    ],
  },
];

// Ficha lateral.
const DATOS = [
  { dt: "Nombre", dd: "ʿAlī bnu Aḥmada bni Saʿīdi bni Ḥazm" },
  { dt: "Kunya", dd: "Abū Muḥammad" },
  {
    dt: "Nacimiento",
    dd: "Córdoba, 30 de ramaḍān de 384 H / 7 de noviembre de 994",
  },
  {
    dt: "Muerte",
    dd: "Manta Līšam, cerca de Niebla (Huelva), 28 de šaʿbān de 456 H / 15 de agosto de 1064",
  },
  { dt: "Escuela", dd: "Ẓāhirí" },
  {
    dt: "Obra",
    dd: "Unos 400 volúmenes, según su hijo Abū Rāfiʿ; se conservan unas cuarenta obras",
  },
];

const OBRAS = [
  "Al-Muḥallá bi-l-āṯāri",
  "Al-Iḥkāmu fī uṣūli l-aḥkāmi",
  "Al-Fiṣalu fī l-milali wa-l-ahwāʾi wa-l-niḥali",
  "Ṭawqu l-ḥamāmati fī l-ulfati wa-l-ullāfi",
  "Al-Ajlāqu wa-l-siyaru fī mudāwāti l-nufūsi",
  "Al-Taqrību li-ḥaddi l-manṭiqi",
  "Marātibu l-ʿulūmi",
  "Ŷamharatu ansābi l-ʿarabi",
  "Al-Nubḏatu l-kāfiyatu",
  "Risālatun fī faḍli l-Andalusi wa-ḏikri riŷālihā",
  "Al-Taljīṣu li-wuŷūhi l-tajlīṣi",
];

const LECTURAS = [
  "Miguel Asín Palacios, Abenházam de Córdoba y su historia crítica de las ideas religiosas, 5 vols., Real Academia de la Historia, 1927–1932.",
  "Ibn Ḥazm, El collar de la paloma, trad. de Emilio García Gómez, con prólogo de José Ortega y Gasset (1952).",
  "Ibn Ḥazm, Los caracteres y la conducta, trad. de Miguel Asín Palacios (1916).",
  "Camilla Adang, Maribel Fierro y Sabine Schmidtke (eds.), Ibn Ḥazm of Cordoba: The Life and Works of a Controversial Thinker, Brill, 2013.",
  "Maribel Fierro, «Why Ibn Ḥazm became a Ẓāhirī: Law, Charisma and the Court».",
  "José Miguel Puerta Vílchez, «Ibn Ḥazm», en Biblioteca de al-Andalus, vol. 3.",
  "Emilio González Ferrín, «El extremismo teológico andalusí de Ibn Hazm» (2014), una lectura crítica.",
];

// =====================================================================

// Mientras la biografía tenga texto ✍️, la página no se indexa ni va al sitemap.
export const PENDIENTE = tienePendientes([VIDA, LECCIONES]);

export default function ImamIbnHazm() {
  return (
    <>
      <Seo
        title="Imam Ibn Hazm de Córdoba (Ibn Ḥazm): vida y obra"
        description={RESUMEN}
        type="profile"
        pendiente={PENDIENTE}
        jsonLd={conContexto({
          "@type": "Person",
          name: "Ibn Hazm",
          alternateName: [
            "Ibn Ḥazm",
            "Abenházam",
            "Abū Muḥammad ʿAlī ibn Aḥmad ibn Saʿīd ibn Ḥazm",
            "Ibn Hazm de Córdoba",
          ],
          birthDate: "0994-11-07",
          deathDate: "1064-08-15",
          birthPlace: { "@type": "Place", name: "Córdoba, al-Ándalus" },
          deathPlace: {
            "@type": "Place",
            name: "Manta Līšam, Niebla (Huelva), al-Ándalus",
          },
          description: RESUMEN,
          sameAs: [
            "https://es.wikipedia.org/wiki/Abenhazam",
            "https://en.wikipedia.org/wiki/Ibn_Hazm",
          ],
        })}
      />

      <PageHero
        title="Imam Ibn Hazm de Córdoba"
        arabic={NOMBRE_ARABE}
        eyebrow="Nuestro imam en el fiqh"
        crumbs={[{ label: "Imam Ibn Hazm" }]}
      >
        <p>{RESUMEN}</p>
      </PageHero>

      <section className={c.cita} style={{ marginTop: 0 }}>
        <div className="contenedor">
          <p
            className="arabe"
            lang="ar"
            dir="rtl"
            style={{
              fontSize: "clamp(22px, 2.6vw, 30px)",
              lineHeight: 2,
              margin: "0 0 18px",
            }}
          >
            {VERSOS.arabe.map((v) => (
              <span key={v} style={{ display: "block" }}>
                {v}
              </span>
            ))}
          </p>
          <p className={c.citaTexto}>«{VERSOS.traduccion}»</p>
          <p className={c.citaFuente}>{VERSOS.fuente}</p>
        </div>
      </section>

      <div className={`contenedor ${c.layout}`}>
        <div>
          <article className={c.article}>
            <Secciones secciones={VIDA} />
            <Secciones secciones={LECCIONES} />

            <footer className={firma.firma}>
              <span className={firma.firmaOrnamento} aria-hidden />
              <p className="arabe" lang="ar">
                {NOMBRE_ARABE}
              </p>
              <p className={firma.firmaLatina}>{NOMBRE_LATINO}</p>
            </footer>
          </article>

          <NavIbnHazm actual="/imam-ibn-hazm" />
        </div>

        <aside className={c.aside}>
          <section className={`${ui.card} ${ui.cardPad}`}>
            <h2 className={ui.cardTitle}>
              <Icon name="book" size={18} /> Ficha
            </h2>
            <dl className={c.datos}>
              {DATOS.map((d) => (
                <div key={d.dt}>
                  <dt>{d.dt}</dt>
                  <dd>{d.dd}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className={`${ui.card} ${ui.cardPad}`}>
            <h2 className={ui.cardTitle}>
              <Icon name="book" size={18} /> Obras principales
            </h2>
            <ul className={c.tesoros}>
              {OBRAS.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
            <Link href="/imam-ibn-hazm/obras" className={c.asideLink}>
              Ver sus obras <Icon name="arrow" size={16} />
            </Link>
          </section>

          <section className={`${ui.card} ${ui.cardPad}`}>
            <h2 className={ui.cardTitle}>
              <Icon name="scale" size={18} /> Su fiqh hoy
            </h2>
            <p className={c.asideIntro}>
              Nuestras fatāwá siguen su método ẓāhirī.
            </p>
            <Link href="/fataawa-zahiri-fiqh" className={c.asideLink}>
              Ver fatāwá <Icon name="arrow" size={16} />
            </Link>
          </section>

          <section className={`${ui.card} ${ui.cardPad}`}>
            <h2 className={ui.cardTitle}>
              <Icon name="link" size={18} /> Para seguir leyendo
            </h2>
            <ul className={c.tesoros}>
              {LECTURAS.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </>
  );
}
