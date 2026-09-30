// "2026-10-01" → "1 de octubre de 2026" (sin desfases de zona horaria)
export const formatDate = (iso) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
};

// Minúsculas y sin diacríticos, para buscar "tahara" y encontrar "ṭahāra".
export const normalize = (s = "") =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯʾʿʼ’']/g, "")
    .toLowerCase();
