// =====================================================================
//  Temas de las noticias de actualidad
//  Para agregar un tema, copia una línea y cambia slug, label y arabic.
//  El `slug` es lo que escribes en el campo `tema` de cada noticia.
// =====================================================================
export const NOTICIA_TEMAS = [
  { slug: "comunidad", label: "Nuestra comunidad", arabic: "جماعتنا" },
  { slug: "eventos", label: "Eventos y actividades", arabic: "الأنشطة" },
  { slug: "mexico", label: "Islam en México", arabic: "الإسلام في المكسيك" },
  { slug: "mundo", label: "Mundo islámico", arabic: "العالم الإسلامي" },
  { slug: "palestina", label: "Palestina", arabic: "فلسطين" },
  { slug: "cultura", label: "Ciencia y cultura", arabic: "العلم والثقافة" },
];

export const getNoticiaTema = (slug) => NOTICIA_TEMAS.find((t) => t.slug === slug);

export const NOTICIAS_PATH = "/noticias";
