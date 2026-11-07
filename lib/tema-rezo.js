// =====================================================================
//  Tema del sitio según los tiempos de oración del día.
//  Claro desde el šurūq (salida del sol: fin del tiempo del fajr)
//  hasta el inicio del ʿišāʾ; oscuro el resto de la noche.
//
//  Se calcula en el navegador con los mismos parámetros que el recuadro
//  de horarios (lib/horarios-rezo.js), para el lugar que ese recuadro
//  guardó cuando el visitante compartió su ubicación; si no, el centro
//  de la CDMX.
// =====================================================================

export const CLAVE_LUGAR = "lugar-rezo";

// Aplica data-tema="claro" | "oscuro" en <html>.
// IMPORTANTE: no usa nada de fuera de la función, porque _document.js la
// copia como texto en un <script> para que el tema se ponga antes de pintar.
export function aplicarTema() {
  var lugar = { lat: 19.4326, lng: -99.1332, zona: "America/Mexico_City" };
  try {
    var g = JSON.parse(localStorage.getItem("lugar-rezo"));
    if (g && isFinite(g.lat) && isFinite(g.lng) && g.zona) lugar = g;
  } catch (e) {}

  var partes = {};
  var fecha = function (zona) {
    new Intl.DateTimeFormat("en-CA", { timeZone: zona, year: "numeric", month: "2-digit", day: "2-digit" })
      .formatToParts(new Date())
      .forEach(function (p) {
        partes[p.type] = +p.value;
      });
  };
  try {
    fecha(lugar.zona);
  } catch (e) {
    lugar = { lat: 19.4326, lng: -99.1332, zona: "America/Mexico_City" };
    fecha(lugar.zona);
  }

  var r = Math.PI / 180, lat = lugar.lat, lng = lugar.lng;
  var sin = function (x) { return Math.sin(x * r); };
  var cos = function (x) { return Math.cos(x * r); };
  var fix = function (a, b) { return ((a % b) + b) % b; };
  var inicio = Date.UTC(partes.year, partes.month - 1, partes.day);
  var jd0 = inicio / 86400000 + 2440587.5;

  // Horas UTC en que el sol baja a «angulo» grados bajo el horizonte, antes (-1) o
  // después (+1) del mediodía. null si ese día no llega a esa altura.
  var momento = function (angulo, lado) {
    var h = 12 - lng / 15;
    for (var i = 0; i < 3; i++) {
      var D = jd0 + h / 24 - 2451545;
      var gg = 357.529 + 0.98560028 * D, q = 280.459 + 0.98564736 * D;
      var L = q + 1.915 * sin(gg) + 0.02 * sin(2 * gg), e = 23.439 - 0.00000036 * D;
      var RA = Math.atan2(cos(e) * sin(L), cos(L)) / r / 15;
      var decl = Math.asin(sin(e) * sin(L)) / r;
      var mediodia = 12 - lng / 15 - (fix(q / 15 - fix(RA, 24) + 12, 24) - 12);
      var x = (-sin(angulo) - sin(decl) * sin(lat)) / (cos(decl) * cos(lat));
      if (x > 1) return null; // el sol no sube tanto ese día
      if (x < -1) return mediodia + lado * 12; // no baja tanto: medianoche solar
      h = mediodia + (lado * Math.acos(x)) / r / 15;
    }
    return h;
  };

  var amanecer = momento(0.833, -1);
  var isha = momento(15, 1);
  var ahora = Date.now();
  var tema =
    amanecer !== null &&
    ahora >= inicio + amanecer * 3600000 &&
    (isha === null || ahora < inicio + isha * 3600000)
      ? "claro"
      : "oscuro";
  if (document.documentElement.getAttribute("data-tema") !== tema) {
    document.documentElement.setAttribute("data-tema", tema);
  }
}
