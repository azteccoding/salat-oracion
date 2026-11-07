// Direcciones del servicio interno (pages/api/*). Mismo sitio: rutas relativas.
export const FATAAWA_API_URI = "/api/fataawa";
export const NOTICIAS_API_URI = "/api/noticias";

// Recuadro de IslamicFinder del que se leen los horarios (ciudad 3998655, ʿaṣr ḥanafī,
// método 5, ángulos de fajr e ʿišāʾ 15° / 15°). Lo usan el recuadro del inicio
// (components/PrayerTimes.jsx) y el cambio de tema (pages/api/tiempos-rezo.js).
export const ISLAMICFINDER_WIDGET_URL = "https://www.islamicfinder.org/prayer-widget/3998655/hanfi/5/0/15.0/15.0/";
