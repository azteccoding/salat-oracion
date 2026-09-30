// =====================================================================
//  Temas (abwāb) de las fatāwá y sus rangos de códigos
// ---------------------------------------------------------------------
//  El CÓDIGO de cada fatwa decide su tema automáticamente:
//    1000–1999 ʿaqīda · 2000–2999 uṣūl al-fiqh · 3000–3999 ṭahāra
//    (3300–3499 gusl · 3500–3699 wuḍūʾ) · 4000 ṣalāt · 5000 zakāt
//    6000 ayuno · 7000 peregrinación · 8000 matrimonio y divorcio
//    9000 sufismo · ac00–ac99 asuntos cotidianos · an00–an99 asuntos novedosos
//
//  desde / hasta: rango numérico del tema.   prefijo: para códigos "ac00", "an00"…
//  sub:           subtemas con su propio rango dentro del tema.
//  indexado:      false = sin botón de filtro (sus fatāwá salen en «Todos» y en el buscador).
// =====================================================================
export const FATWA_TOPICS = [
  { slug: "aqida", label: "ʿAqīda", arabic: "العقيدة", term: "ʿaqīda", desde: 1000, hasta: 1999 },
  { slug: "usul", label: "Uṣūl al-fiqh", arabic: "أصول الفقه", term: "uṣūl al-fiqh", desde: 2000, hasta: 2999 },
  {
    slug: "tahara",
    label: "Purificación",
    arabic: "الطهارة",
    term: "ṭahāra",
    desde: 3000,
    hasta: 3999,
    sub: [
      { slug: "gusl", label: "Gusl", arabic: "الغسل", term: "gusl", desde: 3300, hasta: 3499 },
      { slug: "wudu", label: "Wuḍūʾ", arabic: "الوضوء", term: "wuḍūʾ", desde: 3500, hasta: 3699 },
    ],
  },
  { slug: "salat", label: "Oración", arabic: "الصلاة", term: "ṣalāt", desde: 4000, hasta: 4999 },
  { slug: "zakat", label: "Zakāt", arabic: "الزكاة", term: "zakāt", desde: 5000, hasta: 5999 },
  { slug: "sawm", label: "Ayuno", arabic: "الصوم", term: "ṣawm", desde: 6000, hasta: 6999 },
  { slug: "hayy", label: "Peregrinación", arabic: "الحج", term: "ḥaŷŷ", desde: 7000, hasta: 7999 },
  { slug: "nikah", label: "Matrimonio y divorcio", arabic: "النكاح والطلاق", term: "nikāḥ wa-ṭalāq", desde: 8000, hasta: 8999 },
  { slug: "tasawwuf", label: "Sufismo", arabic: "التصوف", term: "taṣawwuf", desde: 9000, hasta: 9999 },
  { slug: "novedosos", label: "Asuntos novedosos", arabic: "النوازل", term: "nawāzil", prefijo: "an" },
  { slug: "cotidianos", label: "Asuntos cotidianos", arabic: "شؤون يومية", term: "šuʾūn yawmiyya", prefijo: "ac", indexado: false },
];

// Temas con botón de filtro
export const INDEXED_TOPICS = FATWA_TOPICS.filter((t) => t.indexado !== false);

const ALL_TOPICS = FATWA_TOPICS.flatMap((t) => [t, ...(t.sub || []).map((s) => ({ ...s, parent: t.slug }))]);

// Busca un tema o subtema por su slug ("tahara", "wudu"…)
export const getTopic = (slug) => ALL_TOPICS.find((t) => t.slug === slug);

// "3510" → { topic: tahara, sub: wudu } · "ac04" → { topic: cotidianos, sub: null }
export const topicOfCode = (codigo = "") => {
  const c = String(codigo).toLowerCase();
  const pre = FATWA_TOPICS.find((t) => t.prefijo && new RegExp(`^${t.prefijo}\\d{2}$`).test(c));
  if (pre) return { topic: pre, sub: null };
  const n = Number(c);
  const topic = FATWA_TOPICS.find((t) => t.desde !== undefined && n >= t.desde && n <= t.hasta) || null;
  const sub = topic?.sub?.find((s) => n >= s.desde && n <= s.hasta) || null;
  return { topic, sub };
};

export const FATAAWA_PATH = "/fataawa-zahiri-fiqh";
