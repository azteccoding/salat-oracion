// Temas (abwāb) de la sección de fatāwá. El `slug` es lo que se guarda en
// cada fatwa (campo `topic`) y lo que aparece en la URL como ?tema=slug.
export const FATWA_TOPICS = [
  { slug: "tahara", label: "Purificación", arabic: "الطهارة", term: "ṭahāra" },
  { slug: "salat", label: "Oración", arabic: "الصلاة", term: "ṣalāt" },
  { slug: "sawm", label: "Ayuno", arabic: "الصوم", term: "ṣawm" },
  { slug: "zakat", label: "Zakāt", arabic: "الزكاة", term: "zakāt" },
  { slug: "hayy", label: "Peregrinación", arabic: "الحج", term: "ḥaŷŷ" },
  { slug: "atima", label: "Alimentos y halal", arabic: "الأطعمة", term: "aṭʿima" },
  { slug: "nikah", label: "Matrimonio y familia", arabic: "النكاح", term: "nikāḥ" },
  { slug: "muamalat", label: "Transacciones", arabic: "المعاملات", term: "muʿāmalāt" },
  { slug: "adab", label: "Ética y conducta", arabic: "الآداب", term: "ādāb" },
  { slug: "usul", label: "Metodología", arabic: "أصول الفقه", term: "uṣūl al-fiqh" },
];

export const getTopic = (slug) => FATWA_TOPICS.find((t) => t.slug === slug);

export const FATAAWA_PATH = "/fataawa-zahiri-fiqh";
