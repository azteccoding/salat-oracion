// =====================================================================
//  Tema del sitio según los tiempos de oración del día.
//  Claro desde el šurūq (salida del sol: fin del tiempo del fajr)
//  hasta el inicio del ʿišāʾ; oscuro el resto de la noche.
//
//  Los horarios vienen del mismo recuadro de IslamicFinder que se ve en
//  el inicio (pages/api/tiempos-rezo.js los lee y el navegador los guarda
//  por día). Mientras llegan, se usa un cálculo local con los mismos
//  ángulos (15° / 15°), que coincide con IslamicFinder por ±1 minuto.
// =====================================================================

export const CLAVE_TIEMPOS = "tiempos-rezo";

// Aplica data-tema="claro" | "oscuro" en <html> y devuelve
// { dia: "AAAA-MM-DD", deIslamicFinder: bool }.
// IMPORTANTE: no usa nada de fuera de la función, porque _document.js la
// copia como texto en un <script> para que el tema se ponga antes de pintar.
export function aplicarTema() {
  var partes = {};
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Mexico_City",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  })
    .formatToParts(new Date())
    .forEach(function (p) {
      partes[p.type] = p.value;
    });
  var y = +partes.year, m = +partes.month, d = +partes.day;
  var dia = partes.year + "-" + partes.month + "-" + partes.day;
  var ahora = +partes.hour * 60 + +partes.minute;

  var t = null;
  try {
    var g = JSON.parse(localStorage.getItem("tiempos-rezo"));
    if (g && g.dia === dia && g.amanecer > 0 && g.isha > 0) t = g;
  } catch (e) {}

  if (!t) {
    // Cálculo astronómico local (21.125 N, 101.686 O, UTC−6)
    var lat = 21.125, lng = -101.686, tz = -6, r = Math.PI / 180;
    var fix = function (a, b) { return ((a % b) + b) % b; };
    var sin = function (x) { return Math.sin(x * r); };
    var cos = function (x) { return Math.cos(x * r); };
    var yy = y, mm = m;
    if (mm <= 2) { yy -= 1; mm += 12; }
    var A = Math.floor(yy / 100), B = 2 - A + Math.floor(A / 4);
    var jd = Math.floor(365.25 * (yy + 4716)) + Math.floor(30.6001 * (mm + 1)) + d + B - 1524.5 - lng / 360;
    var hora = function (angulo, h, antes) {
      for (var i = 0; i < 2; i++) {
        var D = jd + h / 24 - 2451545;
        var gg = 357.529 + 0.98560028 * D, q = 280.459 + 0.98564736 * D;
        var L = q + 1.915 * sin(gg) + 0.02 * sin(2 * gg), e = 23.439 - 0.00000036 * D;
        var RA = Math.atan2(cos(e) * sin(L), cos(L)) / r / 15;
        var decl = Math.asin(sin(e) * sin(L)) / r;
        var mediodia = fix(12 - (q / 15 - fix(RA, 24)), 24);
        var T = Math.acos((-sin(angulo) - sin(decl) * sin(lat)) / (cos(decl) * cos(lat))) / r / 15;
        h = mediodia + (antes ? -T : T);
      }
      return Math.round((h + tz - lng / 15) * 60);
    };
    t = { amanecer: hora(0.833, 6, true), isha: hora(15, 18, false) };
  }

  var tema = ahora >= t.amanecer && ahora < t.isha ? "claro" : "oscuro";
  if (document.documentElement.getAttribute("data-tema") !== tema) {
    document.documentElement.setAttribute("data-tema", tema);
  }
  return { dia: dia, deIslamicFinder: t.fuente === "islamicfinder" };
}
