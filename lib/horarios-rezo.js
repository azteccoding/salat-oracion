// Horarios de oración para cualquier lugar, calculados en el navegador.
// Parámetros según Ibn Ḥazm, al-Muḥallá:
// - ʿAṣr: cuando la sombra iguala al objeto, sin contar la del zawāl (masʾala 333 tris).
// - Faŷr e ʿišāʾ con un mismo ángulo, porque el tiempo del ṣubḥ iguala siempre al del
//   magrib (masʾala 337); el ʿišāʾ entra al irse el rojo, no el blanco (masʾala 338).
// - 15°: en Córdoba da el máximo de dos horas temporales que fija la masʾala 337. Los
//   grados son deducción nuestra: el texto no los da.
// - 1 minuto después del zawāl y del ocaso, porque antes no vale ninguna de las dos.
// Se redondea hacia arriba para que ningún tiempo se muestre antes de entrar; la salida
// del sol, que cierra el faŷr, hacia abajo. lib/tema-rezo.js repite este cálculo.

const RAD = Math.PI / 180;
const MINUTO = 60 * 1000;
const ANGULO_TWILIGHT = 15;
const ANGULO_HORIZONTE = 0.833; // refracción y radio del disco

const seno = (g) => Math.sin(g * RAD);
const coseno = (g) => Math.cos(g * RAD);
const fix = (a, b) => ((a % b) + b) % b;

// Declinación (grados) y ecuación del tiempo (horas) para un día juliano.
const sol = (jd) => {
  const D = jd - 2451545;
  const g = 357.529 + 0.98560028 * D;
  const q = 280.459 + 0.98564736 * D;
  const L = q + 1.915 * seno(g) + 0.02 * seno(2 * g);
  const e = 23.439 - 0.00000036 * D;
  const RA = Math.atan2(coseno(e) * seno(L), coseno(L)) / RAD / 15;
  return {
    declinacion: Math.asin(seno(e) * seno(L)) / RAD,
    ecuacion: fix(q / 15 - fix(RA, 24) + 12, 24) - 12,
  };
};

// Horas UTC del mediodía solar, por sucesivas aproximaciones.
const transito = (jd0, lng) => {
  let h = 12 - lng / 15;
  for (let i = 0; i < 3; i++) h = 12 - lng / 15 - sol(jd0 + h / 24).ecuacion;
  return h;
};

// Horas UTC en que el sol está a esa altura, antes (-1) o después (+1) del mediodía.
// altura(declinacion) da la altura en grados. Devuelve null si ese día no la alcanza.
const momento = (jd0, lat, lng, altura, lado) => {
  let h = transito(jd0, lng);
  for (let i = 0; i < 3; i++) {
    const { declinacion, ecuacion } = sol(jd0 + h / 24);
    const x =
      (seno(altura(declinacion)) - seno(declinacion) * seno(lat)) /
      (coseno(declinacion) * coseno(lat));
    if (Math.abs(x) > 1) return null;
    h = 12 - lng / 15 - ecuacion + (lado * Math.acos(x)) / RAD / 15;
  }
  return h;
};

// Fecha del calendario en esa zona horaria.
const diaEn = (zona, ahora) => {
  const p = {};
  new Intl.DateTimeFormat("en-CA", { timeZone: zona, year: "numeric", month: "2-digit", day: "2-digit" })
    .formatToParts(ahora)
    .forEach(({ type, value }) => (p[type] = +value));
  return p;
};

// Devuelve cada tiempo del día como Date, o null si ese día no ocurre en ese lugar.
export function calcularHorarios({ lat, lng, zona, ahora = new Date() }) {
  const { year, month, day } = diaEn(zona, ahora);
  const inicio = Date.UTC(year, month - 1, day);
  const jd0 = inicio / 86400000 + 2440587.5;

  const aFecha = (h, redondeo, extra = 0) =>
    h === null ? null : new Date(redondeo((inicio + h * 3600000) / MINUTO + extra) * MINUTO);

  const twilight = () => -ANGULO_TWILIGHT;
  const horizonte = () => -ANGULO_HORIZONTE;
  const asr = (declinacion) => Math.atan(1 / (1 + Math.tan(Math.abs(lat - declinacion) * RAD))) / RAD;

  return {
    fajr: aFecha(momento(jd0, lat, lng, twilight, -1), Math.ceil),
    amanecer: aFecha(momento(jd0, lat, lng, horizonte, -1), Math.floor),
    dhuhr: aFecha(transito(jd0, lng), Math.ceil, 1),
    asr: aFecha(momento(jd0, lat, lng, asr, 1), Math.ceil),
    maghrib: aFecha(momento(jd0, lat, lng, horizonte, 1), Math.ceil, 1),
    isha: aFecha(momento(jd0, lat, lng, twilight, 1), Math.ceil),
  };
}
