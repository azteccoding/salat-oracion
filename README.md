<div align="center">

# Estudiantes del Islam en Guanajuato

**El sitio web de la comunidad: [islamguanajuato.com](https://www.islamguanajuato.com)**

Estudiantes de Guanajuato y Aguascalientes reunidos para aprender y difundir el islam de forma pacífica, tolerante y académica.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=000)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=fff)
![Vercel](https://img.shields.io/badge/Vercel-deploy-000000?logo=vercel)
![Node](https://img.shields.io/badge/Node-24-339933?logo=nodedotjs&logoColor=fff)

</div>

---

## Índice

1. [Qué hay en el sitio](#qué-hay-en-el-sitio)
2. [Arrancar el proyecto en tu computadora](#arrancar-el-proyecto-en-tu-computadora)
3. [Cómo está organizado el código](#cómo-está-organizado-el-código)
4. [¿Qué quiero cambiar? → ¿Qué archivo abro?](#qué-quiero-cambiar--qué-archivo-abro)
5. [Recetas: ejemplos para modificar el sitio](#recetas-ejemplos-para-modificar-el-sitio)
6. [Fatāwá y noticias en MongoDB](#fatāwá-y-noticias-en-mongodb)
7. [El servicio interno (`/api`)](#el-servicio-interno-api)
8. [SEO, sitemap e imágenes para redes](#seo-sitemap-e-imágenes-para-redes)
9. [Publicar en Vercel](#publicar-en-vercel)
10. [Reglas de contenido](#reglas-de-contenido)
11. [Problemas comunes](#problemas-comunes)

---

## Qué hay en el sitio

| Ruta | Página | De dónde sale el contenido |
|---|---|---|
| `/` | Inicio: horarios de oración, fecha hiŷrī, últimas fatāwá, la noticia más reciente, descargas y corridos | `pages/index.js`, `data/corridos.js`, MongoDB |
| `/salat` | Aprende a rezar el ṣalāt, paso a paso según el Muḥallá | `data/steps.js` |
| `/wudu` | El wuḍūʾ (ablución menor) | `data/wudu.js` |
| `/gusl` | El gusl (baño ritual) | `data/gusl.js` |
| `/fataawa-zahiri-fiqh` | Buscador de fatāwá según el fiqh ẓāhirī | MongoDB, colección `fataawa` |
| `/fataawa-zahiri-fiqh/<slug>-<código>` | Una fatwa | MongoDB |
| `/noticias` y `/noticias/<slug>` | Noticias de la comunidad y del mundo islámico | MongoDB, colección `noticias` |
| `/imam-ibn-hazm`, `/imam-ibn-hazm/escuela-zahiri` | El Imam Ibn Ḥazm y la escuela ẓāhirī | las propias páginas |
| `/imam-ibn-hazm/obras/<slug>` | Obras de Ibn Ḥazm | `data/ibn-hazm-obras.js` |
| `/nuestra-tariqa`, `/nuestro-maulana`, `/nuestro-sheij`, `/nuestra-recitacion` | La comunidad | las propias páginas |
| `/descargas` y `/descargas/<slug>` | PDF para descargar | `data/descargas.js` + `public/pdf/` |
| `/jutba` | La juṭba del viernes del Sheij Mudar (San Cristóbal de las Casas). No está en el menú: se llega por el botón flotante de audífonos, que aparece en todas las páginas solo los viernes (`components/Layout.jsx` → `BotonJutba`); otro día dice «Vuelve el viernes» | MongoDB, colección `podcasts_khutbah` + audios en Google Drive |
| `/editor-fataawa`, `/editor-noticias`, `/editor-jutbas` | Editores internos (no salen en el menú ni en Google) | — |
| `/sitemap.xml` | Mapa del sitio para Google, se genera solo | `pages/sitemap.xml.js` |

---

## Arrancar el proyecto en tu computadora

### Requisitos

- **Node.js 24** (lo indica `.nvmrc`; el mínimo es 22).
- Acceso a la base de datos de **MongoDB Atlas**.

### Pasos

```bash
# 1. Instalar dependencias (solo la primera vez o cuando cambie package.json)
npm install

# 2. Crear el archivo .env.local en la raíz del proyecto (ver abajo)

# 3. Levantar el sitio en modo desarrollo
npm run dev
# → http://localhost:3000
```

### El archivo `.env.local`

Va en la raíz del proyecto y **nunca se sube a GitHub** (ya está en `.gitignore`).

```ini
# Obligatoria: la dirección de MongoDB Atlas
MONGODB_URI=mongodb+srv://USUARIO:CONTRASEÑA@cluster.xxxxx.mongodb.net/

# Opcional: nombre de la base (por defecto "islamic_website")
MONGODB_DB=islamic_website

# Opcional: dominio público (por defecto https://www.islamguanajuato.com)
NEXT_PUBLIC_SITE_URL=https://www.islamguanajuato.com
```

### Comandos

| Comando | Para qué sirve |
|---|---|
| `npm run dev` | Sitio en modo desarrollo, se recarga solo al guardar. Muestra también los **borradores** de fatāwá. |
| `npm run build` | Compila el sitio como en producción. Úsalo antes de subir cambios grandes: si falla aquí, fallará en Vercel. |
| `npm start` | Sirve la versión compilada con `build`. |
| `npm run lint` | Revisa el código en busca de errores comunes. |
| `npm run subir-semilla` | Sube a MongoDB las fatāwá y noticias de respaldo de `data/semilla/` (las juṭbas no: esas se insertan a mano). Es seguro repetirlo: actualiza, no duplica. |

---

## Cómo está organizado el código

```text
salat/
├── pages/                  ← cada archivo es una ruta del sitio
│   ├── index.js            → /
│   ├── salat/index.js      → /salat
│   ├── wudu.js, gusl.js    → /wudu y /gusl (usan la plantilla PaginaPureza)
│   ├── fataawa-zahiri-fiqh/
│   ├── noticias/
│   ├── imam-ibn-hazm/
│   ├── descargas/
│   ├── editor-fataawa.js   → editor interno de fatāwá
│   ├── editor-noticias.js  → editor interno de noticias
│   ├── jutba.js            → /jutba (juṭba del viernes)
│   ├── editor-jutbas.js    → editor interno de juṭbas
│   ├── sitemap.xml.js      → /sitemap.xml
│   └── api/                ← servicio interno (consulta MongoDB)
│       ├── fataawa/        → /api/fataawa y /api/fataawa/<código>
│       ├── noticias/       → /api/noticias, /api/noticias/<slug> y /api/noticias/imagen/…
│       └── og.js           → /api/og (imagen para redes)
│
├── data/                   ← CONTENIDO editable (aquí se trabaja casi siempre)
│   ├── steps.js            → pasos del ṣalāt
│   ├── wudu.js, gusl.js    → pasos, masāʾil y notas de wuḍūʾ y gusl
│   ├── descargas.js        → PDF de /descargas
│   ├── ibn-hazm-obras.js   → obras de Ibn Ḥazm
│   ├── corridos.js         → videos de YouTube del inicio
│   └── semilla/            → respaldo en JSON de fatāwá, noticias y juṭbas
│
├── constants/              ← configuración: nombre del sitio, menú, temas
│   ├── site.js             → nombre, dominio, menú (NAV_LINKS)
│   ├── fataawa.js          → temas de las fatāwá y sus rangos de códigos
│   ├── noticias.js         → temas de las noticias
│   ├── jutbas.js           → sheij de las juṭbas, cálculo del viernes, links de Drive
│   └── api.js              → rutas del servicio interno
│
├── components/             ← piezas reutilizables (Seo, PageHero, Icon, StepCard…)
├── lib/                    ← conexión y consultas a MongoDB, utilidades de SEO
├── services/requests.js    ← peticiones del navegador a /api
├── styles/                 ← CSS (globals.css + módulos en styles/site/)
├── public/                 ← archivos tal cual: imágenes, PDF, íconos
└── scripts/subir-semilla.mjs
```

Los imports usan el alias `@/`, que apunta a la raíz del proyecto (`jsconfig.json`):

```js
import Seo from "@/components/Seo";          // = ./components/Seo
import { steps } from "@/data/steps";        // = ./data/steps
```

---

## ¿Qué quiero cambiar? → ¿Qué archivo abro?

| Quiero… | Archivo |
|---|---|
| Cambiar un paso de la oración | `data/steps.js` |
| Cambiar un paso de wuḍūʾ o gusl, o una masʾala o nota | `data/wudu.js` / `data/gusl.js` |
| Publicar una fatwa | `/editor-fataawa` → MongoDB ([ver receta](#3-publicar-una-fatwa)) |
| Publicar una noticia | `/editor-noticias` → MongoDB ([ver receta](#4-publicar-una-noticia)) |
| Publicar la juṭba del viernes | `/editor-jutbas` → MongoDB ([ver receta](#15-publicar-la-juṭba-del-viernes)) |
| Cambiar el sheij de las juṭbas o su foto | `constants/jutbas.js` → `SHEIJ_JUTBA` · `public/img/jutba/` |
| Agregar un tema de fatāwá | `constants/fataawa.js` |
| Agregar un tema de noticias | `constants/noticias.js` |
| Subir un PDF a Descargas | `public/pdf/` + `data/descargas.js` |
| Agregar una obra de Ibn Ḥazm | `data/ibn-hazm-obras.js` |
| Agregar un corrido al inicio | `data/corridos.js` |
| Cambiar el menú | `constants/site.js` → `NAV_LINKS` |
| Cambiar el nombre, la descripción o el dominio | `constants/site.js` |
| Cambiar colores, tipografía o espacios generales | `styles/globals.css` |
| Cambiar el diseño de una sola página | `styles/site/<Página>.module.css` |

---

## Recetas: ejemplos para modificar el sitio

### 1. Agregar o cambiar un paso del ṣalāt

Todos los pasos de `/salat` están en `data/steps.js`. **El número se pone solo**, según el orden en la lista, y el índice lateral «Los pasos» se actualiza solo.

```js
// data/steps.js
export const steps = [
  // …
  {
    name: "paso-9",                       // identificador único, sin espacios
    title: "La inclinación (rukūʿ)",      // título grande
    description: "Obligatorio",           // texto pequeño arriba: Obligatorio / Recomendado
    instruction:
      "Di «Allāhu akbar» e inclínate con las manos sobre las rodillas…",
    tripleText: [
      "سُبْحَانَ رَبِّيَ الْعَظِيمِ",          // 1. árabe
      "Subḥāna rabbiya l-ʿaẓīmi",          // 2. transliteración
      "Glorificado sea mi Señor, el Inmenso", // 3. traducción
    ],
  },
  // …
];
```

- Si el paso **no lleva recitación**, deja `tripleText: []` y no se muestra el recuadro.
- Para meter un paso nuevo entre dos existentes, pégalo en medio: los números de todos se recorren solos.
- Si un paso remite a otro («como en el paso 12»), revisa ese número cuando agregues o quites pasos.

### 2. Wuḍūʾ y gusl: pasos, masāʾil y notas

`/wudu` y `/gusl` comparten la plantilla `components/pureza/PaginaPureza.jsx`; **solo se edita el archivo de datos**.

```js
// data/wudu.js
export const wudu = {
  titulo: "Wuḍūʾ",
  arabe: "الوضوء",
  subtitulo: "La ablución menor",
  intro: "El wuḍūʾ es la ablución que Allah ordenó antes de la oración…",

  pasos: [
    { name: "paso-1", title: "Nombrar a Allah", description: "Recomendado",
      instruction: "Es recomendable nombrar a Allah…",
      tripleText: ["بِسْمِ اللَّهِ", "bi-smi llāhi", "En el nombre de Allah"] },
  ],

  // Traducciones del Muḥallá (deja muhalla: [] para ocultar la sección)
  muhalla: [
    { masala: "198", titulo: "Por qué el enjuague de la boca no es obligatorio",
      espanol: "En cuanto a lo que decimos del enjuague de la boca…" },
  ],

  // Apartados al final: viñetas, párrafos y un botón opcional
  notas: [
    {
      titulo: "Lo que anula el wuḍūʾ",
      parrafos: ["Hay cosas que anulan el wuḍūʾ…"],
      enlace: { href: "/fataawa-zahiri-fiqh/lo-que-anula-el-wudu-3500",
                texto: "¿Qué anula el wuḍūʾ? (Fatwa n.º 3500)" },
    },
  ],
};
```

> **Texto pendiente.** Si escribes `✍️` en cualquier texto (por ejemplo `"✍️ Escribe aquí…"`), la página se marca como pendiente: Google no la indexa y no entra al sitemap hasta que quites todos los `✍️`.

### 3. Publicar una fatwa

1. Con el sitio corriendo (`npm run dev`), abre **http://localhost:3000/editor-fataawa**.
2. Llena el formulario: código, título, pregunta, respuesta por bloques, fuentes y fatāwá relacionadas.
3. Pulsa **Copiar JSON**.
4. En MongoDB Atlas: base `islamic_website` → colección `fataawa` → **Insert Document** → pega el JSON.
5. La fatwa aparece en `/fataawa-zahiri-fiqh/<slug>-<código>`.

**El código decide el tema automáticamente** (`constants/fataawa.js`):

| Código | Tema |
|---|---|
| `1000–1999` | ʿAqīda |
| `2000–2999` | Uṣūl al-fiqh |
| `3000–3999` | Ṭahāra (`3300–3499` gusl · `3500–3699` wuḍūʾ) |
| `4000–4999` | Ṣalāt |
| `5000–5999` | Zakāt |
| `6000–6999` | Ayuno |
| `7000–7999` | Peregrinación |
| `8000–8999` | Matrimonio y divorcio |
| `9000–9999` | Sufismo |
| `an00–an99` | Asuntos novedosos |
| `ac00–ac99` | Asuntos cotidianos |

Así se ve el documento (lo genera el editor; este es solo de referencia):

```json
{
  "codigo": "4010",
  "slug": "zuhr-y-asr-en-voz-baja",
  "title": "¿El ẓuhr y el ʿaṣr se rezan en voz baja?",
  "date": "2026-10-01",
  "borrador": false,
  "summary": "Según Ibn Ḥazm, en voz baja es lo recomendado; al revés es reprobable pero vale.",
  "question": "La pregunta tal como se recibió…",
  "answer": [
    { "type": "p", "text": "Párrafo con **negritas** y ==resaltado==." },
    { "type": "h", "text": "Un subtítulo" },
    { "type": "list", "items": ["Un punto", "Otro punto"] },
    { "type": "quote", "text": "Una cita…", "source": "Su fuente" },
    { "type": "arabic", "text": "…", "translit": "…", "translation": "…", "source": "Corán …" },
    { "type": "nota", "title": "Recuadro", "text": "Aviso importante…" },
    { "type": "link", "codigo": "3500", "text": "Lo que anula el wuḍūʾ" }
  ],
  "sources": ["Ibn Ḥazm, al-Muḥallá, masʾala 446"],
  "related": ["4000"]
}
```

- `"borrador": true` → solo se ve en tu computadora con `npm run dev`; en el sitio público no aparece.
- **No repitas códigos**: en MongoDB el código es único.
- Para corregir una fatwa publicada, edita el documento en Atlas o vuelve a generarlo en el editor y reemplázalo.

### 4. Publicar una noticia

1. Abre **http://localhost:3000/editor-noticias**.
2. Si lleva foto, súbela con **Elegir foto…**: el editor la reduce y la mete dentro del JSON (base64). No se guarda nada en `public/`.
3. **Copiar JSON** → MongoDB Atlas → colección `noticias` → **Insert Document**.
4. No hace falta git push: la noticia y sus fotos viven en MongoDB.

Marcas que entiende el texto de noticias y fatāwá:

| Escribes | Se ve |
|---|---|
| `**texto**` | **negritas** |
| `==texto==` | texto resaltado |
| `[Ibn Hazm](https://es.wikipedia.org/wiki/Ibn_Hazm)` | enlace a otro sitio |
| `[nuestras fatāwá](/fataawa-zahiri-fiqh)` | enlace dentro del sitio |

Bloques del cuerpo de una noticia: `p` (párrafo), `h` (subtítulo), `list`, `quote`, `imagen` (con `src`, `alt` y `pie`) y `nota` (recuadro). El archivo `data/noticias-escritas/ejemplo_de_noticia.js` tiene un ejemplo con todas las opciones; con `"indexar": false` una noticia no sale en las listas del sitio ni en Google (sirve para pruebas).

### 5. Agregar un tema de noticias

```js
// constants/noticias.js
export const NOTICIA_TEMAS = [
  { slug: "comunidad", label: "Nuestra comunidad", arabic: "جماعتنا" },
  // …
  { slug: "dawa", label: "Daʿwa", arabic: "الدعوة" },   // ← nuevo
];
```

Después usa `"tema": "dawa"` en las noticias de ese tema.

### 6. Agregar un tema o subtema de fatāwá

```js
// constants/fataawa.js — un subtema nuevo dentro de Ṣalāt
{
  slug: "salat", label: "Oración", arabic: "الصلاة", term: "ṣalāt",
  desde: 4000, hasta: 4999,
  sub: [
    { slug: "yumua", label: "Ŷumuʿa", arabic: "الجمعة", term: "ŷumuʿa", desde: 4500, hasta: 4599 },
  ],
},
```

Toda fatwa con código entre 4500 y 4599 cae sola en «Ŷumuʿa». Con `indexado: false` el tema existe pero no tiene botón de filtro.

### 7. Subir un PDF a Descargas

1. Copia el archivo a `public/pdf/`, por ejemplo `public/pdf/sura-ijlas.pdf`.
2. Agrega su ficha:

```js
// data/descargas.js
export const descargas = [
  // …
  {
    slug: "sura-ijlas",                          // → /descargas/sura-ijlas
    title: "Sūrat al-Ijlāṣ",
    teaser: "Una línea para la tarjeta.",
    description: "Descripción completa para la página y para Google.",
    file: "/pdf/sura-ijlas.pdf",                 // ruta dentro de public/
    format: "PDF",
    size: "180 KB",
  },
];
```

La página `/descargas/sura-ijlas` y su entrada en el sitemap se crean solas.

### 8. Agregar una obra de Ibn Ḥazm

```js
// data/ibn-hazm-obras.js
{
  slug: "al-taqrib",                             // → /imam-ibn-hazm/obras/al-taqrib
  titulo: "Al-Taqrīb li-ḥadd al-manṭiq",
  arabe: "التقريب لحد المنطق",
  tema: "Lógica",
  resumen: "Su tratado de lógica.",
  secciones: [
    {
      titulo: "Sobre la obra",
      parrafos: ["Primer párrafo…", "Segundo párrafo…"],
      foto: { src: "/img/obras/taqrib.jpg", alt: "Portada", ancho: 800, alto: 1100, pie: "Edición de …" },
    },
  ],
},
```

`foto` es opcional.

### 9. Agregar un corrido al inicio

```js
// data/corridos.js — el id es lo que va después de "watch?v=" en YouTube
export const corridos = [
  { id: "NqL6QNLkKwg", titulo: "El que no se dobló (feat. Ibn Hazm)" },
  { id: "AbCdEfGhIjk", titulo: "Corrido nuevo" },   // ← nuevo
];
```

### 10. Cambiar el menú

```js
// constants/site.js
export const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/salat", label: "Aprende a rezar" },
  // Un enlace simple:
  { href: "/wudu", label: "Wuḍūʾ" },
  // Un menú desplegable:
  {
    href: "/nuestra-tariqa",
    label: "Nuestra Tarīqa",
    children: [
      { href: "/nuestro-sheij", label: "Nuestro Sheij", text: "Mullah Khalid" },
    ],
  },
];
```

### 11. Crear una página nueva

Un archivo nuevo en `pages/` es una ruta nueva. Por ejemplo, `pages/ayuno.js` → `/ayuno`:

```jsx
// pages/ayuno.js
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import CompartirNoticia from "@/components/noticias/CompartirNoticia";
import { SITE_URL } from "@/constants/site";
import styles from "@/styles/site/Salat.module.css";

export default function AyunoPage() {
  return (
    <>
      <Seo
        title="El ayuno (ṣawm) según Ibn Ḥazm"
        description="Qué rompe el ayuno, quién está obligado y cómo se recupera."
      />

      <PageHero title="El ayuno" arabic="الصوم" crumbs={[{ label: "Ayuno" }]}>
        <p>Una o dos líneas de presentación.</p>
      </PageHero>

      <div className="contenedor">
        <section className={styles.nota}>
          <h2>Quién está obligado</h2>
          <p>…</p>
        </section>

        <CompartirNoticia url={`${SITE_URL}/ayuno`} titulo="El ayuno según Ibn Ḥazm" que="esta guía" />
      </div>
    </>
  );
}
```

Luego agrégala al sitemap:

```js
// pages/sitemap.xml.js → dentro de la lista
{ ruta: "/ayuno", prioridad: "0.8", frecuencia: "monthly" },
```

### 12. Botones para compartir en redes

`components/noticias/CompartirNoticia.jsx` pone botones de Facebook, X, WhatsApp e Instagram. Ya está en noticias, fatāwá, `/salat`, `/wudu` y `/gusl`.

```jsx
<CompartirNoticia
  url={`${SITE_URL}/salat`}                       // dirección completa de la página
  titulo="Aprende a rezar el ṣalāt paso a paso"   // texto que acompaña al enlace
  que="esta guía"                                 // «Comparte esta guía»
  imagen="/og-image.png"                          // imagen que se manda a Instagram (opcional)
/>
```

### 13. Íconos

```jsx
import Icon from "@/components/Icon";

<Icon name="mihrab" size={18} />
```

Nombres disponibles: `search`, `menu`, `close`, `arrow`, `chevron`, `play`, `cart`, `external`, `arrowLeft`, `book`, `download`, `clock`, `moon`, `calendar`, `link`, `print`, `check`, `scale`, `question`, `pin`, `headphones`, `water`, `mihrab`, `star`.

Para agregar uno, añade su `<path>` en el objeto `PATHS` de `components/Icon.jsx`.

### 14. Estilos

- **Colores, tipografías y variables generales** (`--azul-700`, `--oro-500`, `--tinta`, `--radio`…): `styles/globals.css`.
- **Cada página** tiene su módulo en `styles/site/`. Las clases se importan como objeto:

```jsx
import styles from "@/styles/site/Salat.module.css";

<section className={styles.nota}>…</section>
```

- Para texto árabe usa la clase global `arabe` y `lang="ar"`:

```jsx
<p className="arabe" lang="ar">الصلاة</p>
```

### 15. Publicar la juṭba del viernes

1. El sheij manda un link de Google Drive. Debe estar compartido como **«Cualquier persona con el enlace»**.
2. Abre **http://localhost:3000/editor-jutbas**, pega el link, escribe el título y revisa la fecha (por defecto, el viernes que toca). En la vista previa ya se oye el audio.
3. **Copiar JSON** → MongoDB Atlas → colección `podcasts_khutbah` → **Insert Document**.
4. Aparece en `/jutba` en menos de un minuto. La más reciente va arriba con el reproductor abierto; las anteriores, abajo.

```json
{
  "slug": "el-derecho-del-huerfano-2026-09-25",
  "titulo": "El derecho del huérfano",
  "fecha": "2026-09-25",
  "driveId": "1z36ahFfyITfdQBRygQQWdb7flYv5gk6E",
  "enlace": "https://drive.google.com/file/d/1z36ahFfyITfdQBRygQQWdb7flYv5gk6E/view?usp=drivesdk"
}
```

- Si la da otro sheij, agrega `"sheij"` y `"lugar"`; si no, se muestra el Sheij Mudar.
- El viernes se cuenta con la hora de México (`constants/jutbas.js`). Para probar otro día en tu computadora: `http://localhost:3000/?probar=1` (botón) y `http://localhost:3000/jutba?probar=1` (página).

---

## Fatāwá y noticias en MongoDB

| | |
|---|---|
| Base de datos | `islamic_website` |
| Colecciones | `fataawa` (índice único en `codigo`) · `noticias` (índice único en `slug`) · `podcasts_khutbah` (juṭbas; sin índice creado por el proyecto) |
| Conexión | `lib/mongodb.js` (lee `MONGODB_URI`) |
| Consultas | `lib/fataawa-db.js` · `lib/noticias-db.js` · `lib/jutbas-db.js` |
| Respaldo | `data/semilla/fataawa/*.json` · `data/semilla/noticias/*.json` · `data/semilla/jutbas/*.json` |

Para restaurar el respaldo o llenar una base vacía:

```bash
npm run subir-semilla
# Listo: 3 fatāwá y 2 noticias en MongoDB.
```

---

## El servicio interno (`/api`)

| Petición | Devuelve |
|---|---|
| `GET /api/fataawa?q=wudu&tema=tahara&limit=20&skip=0` | `{ total, resultados }` con las fichas (sin la respuesta completa) |
| `GET /api/fataawa/3500` | Una fatwa completa |
| `GET /api/noticias?q=yemen&tema=mundo` | `{ total, resultados }` |
| `GET /api/noticias/<slug>` | Una noticia completa |
| `GET /api/noticias/imagen/<slug>` | La foto principal de una noticia (guardada en base64 en MongoDB) |
| `GET /api/noticias/imagen/<slug>/<bloque>` | Una foto dentro del texto (`bloque` = su posición en `cuerpo`) |
| `GET /api/og?n=3500&t=Título&tema=Purificación` | Imagen de 1200×630 para redes |

Desde el navegador se usan las funciones de `services/requests.js`, que nunca lanzan errores:

```js
import { findFataawa } from "@/services/requests";

const { hasExternalError, data, errorMessage } = await findFataawa("gusl", "tahara");
if (!hasExternalError) console.log(data.data.resultados);
```

---

## SEO, sitemap e imágenes para redes

- **`components/Seo.jsx`** pone título, descripción, URL canónica, Open Graph, Twitter y datos estructurados. Úsalo en cada página:

```jsx
<Seo
  title="Título de la página"            // se le agrega « · Islam Guanajuato»
  description="Resumen de ~150 caracteres."
  image="/og-image.png"                  // opcional
  type="article"                         // website | article | profile
  noIndex={false}                        // true = que Google no la muestre
/>
```

- **`/sitemap.xml`** se genera solo con las páginas, descargas, obras, fatāwá y noticias. Deja fuera los borradores y todo lo que tenga `✍️`.
- **`/api/og`** dibuja al vuelo la imagen que se ve al compartir una fatwa.

---

## Publicar en Vercel

1. Sube los cambios a GitHub (`git push`). Vercel publica solo.
2. En **Vercel → Settings → Environment Variables** deben existir:
   - `MONGODB_URI` (obligatoria)
   - `MONGODB_DB` (opcional)
   - `NEXT_PUBLIC_SITE_URL` (opcional)
3. Antes de un cambio grande, corre `npm run build` en tu computadora: si compila ahí, compila en Vercel.

---

## Reglas de contenido

- **Corán:** en árabe original, en la lectura de **Jalaf ʿan Ḥamza**.
- **Hadices y Muḥallá:** en traducción al español.
- **Fiqh:** según el método del Imam Ibn Ḥazm (al-Muḥallá). En las guías se distingue siempre lo **obligatorio** de lo **recomendado**.
- **Transliteración:** sistema de la Casa de Velázquez (ṯ, ŷ, j, ḏ, š, ʿ, g, ʾ; ā, ī, ū; á para alif maqṣūra), en forma completa con desinencias: *Allāhu akbaru*, *Subḥāna rabbiya l-ʿaẓīmi*.

---

## Problemas comunes

| Síntoma | Causa y solución |
|---|---|
| `Falta la variable MONGODB_URI` | No existe `.env.local` o no tiene `MONGODB_URI`. Créalo en la raíz y reinicia `npm run dev`. |
| Las fatāwá o noticias salen vacías | Revisa que en Atlas tu IP esté permitida (**Network Access**) y que la base se llame `islamic_website`. |
| Una fatwa se ve en local pero no en el sitio | Tiene `"borrador": true`. Cámbialo a `false`. |
| Una página no sale en Google | Le quedó algún `✍️` en el texto, o tiene `noIndex` / `"indexar": false`. |
| Cambié un archivo de `data/` y no se ve | Guarda el archivo y recarga. Si sigue igual, detén `npm run dev`, borra la carpeta `.next` y vuelve a arrancar. |
| Una foto de noticia no aparece | Las fotos nuevas van dentro del JSON (base64) y se sirven desde `/api/noticias/imagen/<slug>`: revisa que el documento en Atlas tenga `imagen.data`. Las noticias antiguas con `src` necesitan el archivo en `public/img/noticias/` subido a GitHub. |
| El botón de la juṭba no aparece | Solo sale los viernes, con la hora de México. Para probarlo otro día en tu computadora: `http://localhost:3000/?probar=1`. |
| Una juṭba no suena | El archivo de Google Drive debe estar compartido como «Cualquier persona con el enlace». |
| `npm run build` falla en un import | Revisa mayúsculas y minúsculas del nombre del archivo: en Vercel (Linux) `Icon.jsx` y `icon.jsx` son distintos. |

---

<div align="center">

**Estudiantes del Islam en Guanajuato** · León, Guanajuato, México

</div>
