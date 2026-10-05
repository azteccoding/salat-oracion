// =====================================================================
//  JUṬBA DEL VIERNES  (/jutba)
//  Página escondida: no está en el menú ni en el sitemap. Se llega por el
//  botón de audífonos del inicio, que solo aparece los viernes.
//  Las juṭbas viven en MongoDB (colección "podcasts_khutbah") y se escuchan con el
//  reproductor de Google Drive.
// =====================================================================

export const JUTBA_PATH = "/jutba";

// Quién da las juṭbas, salvo que el documento de MongoDB diga otra cosa ("sheij": "…")
export const SHEIJ_JUTBA = {
  nombre: "Mullah Khalid",
  lugar: "León de los Aldama, Guanajuato",
  foto: "/img/jutba/foto_principal.jpg",
  alt: "El Mullah Khalid, sentado con libros de su biblioteca detrás.",
  link: "",
};

// El viernes se cuenta con la hora de México, sin importar dónde esté el visitante
export const ZONA = "America/Mexico_City";

const DIAS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

const partesHoy = (ahora = new Date()) => {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: ZONA,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    })
      .formatToParts(ahora)
      .map((x) => [x.type, x.value]),
  );
  return {
    y: Number(p.year),
    m: Number(p.month),
    d: Number(p.day),
    dia: DIAS[p.weekday],
  };
};

export const esViernes = (ahora = new Date()) => partesHoy(ahora).dia === 5;

// Fecha AAAA-MM-DD de hoy si es viernes, o del próximo viernes
export const viernesProximo = (ahora = new Date()) => {
  const { y, m, d, dia } = partesHoy(ahora);
  const faltan = (5 - dia + 7) % 7;
  return new Date(Date.UTC(y, m - 1, d + faltan)).toISOString().slice(0, 10);
};

// «viernes 2 de octubre de 2026»
export const fechaLarga = (iso) =>
  iso
    ? new Date(`${iso}T12:00:00Z`).toLocaleDateString("es-MX", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      })
    : "";

// Saca el ID de un link de Google Drive:
//   https://drive.google.com/file/d/ESTE_ID/view?usp=drivesdk
//   https://drive.google.com/open?id=ESTE_ID
export const idDeDrive = (link = "") => {
  const t = String(link).trim();
  const m = t.match(/\/d\/([\w-]{10,})/) || t.match(/[?&]id=([\w-]{10,})/);
  if (m) return m[1];
  return /^[\w-]{20,}$/.test(t) ? t : "";
};

// Reproductor incrustado de Google Drive
export const reproductorDrive = (id) =>
  `https://drive.google.com/file/d/${id}/preview`;
export const enlaceDrive = (id) => `https://drive.google.com/file/d/${id}/view`;
