// =====================================================================
//  Búsqueda tolerante a la transliteración
//  Sirve en el navegador (filtro rápido) y en el servidor (regex de MongoDB).
//
//  Quien busca rara vez escribe la transliteración de la Casa de Velázquez:
//  escribe «tarawih» y el texto dice «tarāwīḥ». Para que se encuentren:
//    1. Se quitan diacríticos (ā ī ū á ṭ ḥ ḍ ṣ ẓ ṯ ḏ ŷ š…), ʿayn, hamza y apóstrofos.
//    2. Se pasa a minúsculas.
//    3. Las letras dobles cuentan como una (muhamad = muḥammad, sala = ṣalla).
//    4. Se prueba además la grafía «a la inglesa»: sh→s, th→t, dh→d, kh→j,
//       gh→g, j→y, ee→i, oo→u (janaza → yanaza = ŷanāza, khutba → jutba = juṭba).
//    5. La «h» final de tāʾ marbūṭa sobra: jumuah = jumua, taharah = tahara.
//    6. Los términos comunes con grafías muy distintas («namaz» = ṣalāt,
//       «zikr» = ḏikr, «juma» = ŷumuʿa) se resuelven con lib/sinonimos.js.
// =====================================================================

import SINONIMOS from "./sinonimos";

const MARCAS = /[̀-ͯ]/g; // acentos, puntos, macrones… ya separados con NFD
const APOSTROFOS = /[ʾʿʼʻ’‘'`´]/g; // hamza, ʿayn y sus sustitutos habituales
const MARCAS_CLASE = "̀-ͯʾʿʼʻ’‘'`´"; // lo mismo, para meterlo en una clase [ ]

// "Ṭarāwīḥ" → "tarawih"
export const normalizar = (s = "") =>
  String(s ?? "")
    .normalize("NFD")
    .replace(MARCAS, "")
    .replace(APOSTROFOS, "")
    .toLowerCase();

// "muhammad" → "muhamad" (solo letras; los números de fatwa no se tocan).
// La «y» doble se respeta para no confundir ḥaŷŷ («hayy») con el español «hay».
const colapsar = (s) => s.replace(/([a-xz])\1+/g, "$1");

// Texto listo para comparar: normalizado y sin letras dobles
export const preparar = (s = "") => colapsar(normalizar(s));

const INGLES = { kh: "j", sh: "s", th: "t", dh: "d", gh: "g", j: "y", ee: "i", oo: "u" };
const aLaInglesa = (s) => s.replace(/kh|sh|th|dh|gh|ee|oo|j/g, (m) => INGLES[m]);

// "jumuah" → "jumua" (solo si queda una palabra de 5 letras o más, para que
// «salah» no termine encontrando «sala» o «salario»)
const sinHFinal = (s) => {
  const r = s.replace(/([aiu])h$/, "$1");
  return r !== s && r.length >= 5 ? r : null;
};

// Formas propias de un término, sin consultar sinónimos
const formas = (texto) => {
  const n = normalizar(texto);
  const base = colapsar(n);
  const alt = colapsar(aLaInglesa(n));
  return [base, alt, sinHFinal(base), sinHFinal(alt)].filter(Boolean);
};

// Índice de sinónimos: cada forma conocida → todas las formas de su grupo
const GRUPOS = new Map();
for (const grupo of SINONIMOS) {
  const todas = [...new Set(grupo.flatMap(formas))];
  for (const f of todas) GRUPOS.set(f, [...new Set([...(GRUPOS.get(f) || []), ...todas])]);
}

// Las formas derivadas muy cortas («yu», «as») darían falsos positivos
const MINIMO_DERIVADA = 4;

// Formas en que se puede buscar un término: tal cual, «a la inglesa»,
// sin «h» final y todas las de su grupo de sinónimos
export const variantes = (termino = "") => {
  const [base, ...propias] = formas(termino);
  if (!base) return [];
  const sinonimas = [base, ...propias].flatMap((f) => GRUPOS.get(f) || []);
  const derivadas = [...propias, ...sinonimas].filter((v) => v.length >= MINIMO_DERIVADA);
  return [...new Set([base, ...derivadas])];
};

// "  salat  al-juma " → ["salat", "al-juma"]
export const terminos = (q = "") => normalizar(q).split(/\s+/).filter(Boolean);

// ¿El texto (ya pasado por preparar) contiene TODOS los términos de la búsqueda?
export const coincide = (textoPreparado, q) =>
  terminos(q).every((t) => variantes(t).some((v) => textoPreparado.includes(v)));

// ---------------------------------------------------------------------
//  MongoDB
//  La base guarda el texto tal cual (con diacríticos), así que en lugar de
//  normalizar el texto se «ensancha» la búsqueda: cada letra se vuelve una
//  clase con todas sus variantes (t → [tTṭṬṯṮťţ…]) y entre letras se aceptan
//  ʿayn, hamza o marcas sueltas.
// ---------------------------------------------------------------------

// { a: "[aAáÁāĀ…]", b: "[bB…]", … } — se calcula una vez desde Unicode
const CLASES = (() => {
  const mapa = {};
  const rangos = [
    [0x41, 0x5a],
    [0x61, 0x7a],
    [0xc0, 0x24f], // Latín-1 y Latín extendido A/B (á, ā, š, ŷ…)
    [0x1e00, 0x1eff], // Latín extendido adicional (ṭ, ḥ, ḍ, ṣ, ẓ, ṯ, ḏ…)
  ];
  for (const [desde, hasta] of rangos) {
    for (let c = desde; c <= hasta; c++) {
      const ch = String.fromCodePoint(c);
      const base = ch.normalize("NFD").replace(MARCAS, "").toLowerCase();
      if (/^[a-z]$/.test(base)) (mapa[base] ||= new Set()).add(ch);
    }
  }
  return Object.fromEntries(Object.entries(mapa).map(([k, set]) => [k, `[${[...set].join("")}]`]));
})();

const ENTRE = `[${MARCAS_CLASE}]*`;
const escapar = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// "tarawih" → patrón que también encuentra "ṭarāwīḥ", "Tarawīh", "tarrawih"…
// (Las letras dobles del texto cuentan como una, salvo la «y», igual que en el navegador.)
const patronDe = (v) =>
  [...v]
    .map((ch) =>
      !CLASES[ch] ? `${escapar(ch)}${ENTRE}` : ch === "y" ? `${CLASES[ch]}${ENTRE}` : `(?:${CLASES[ch]}${ENTRE})+`
    )
    .join("");

// Regex (como texto) para un término, con todas sus variantes
export const regexDeTermino = (termino) => `(?:${variantes(termino).map(patronDe).join("|")})`;

// Filtro de MongoDB: cada término debe aparecer en al menos uno de los campos
export const filtroMongo = (q, campos) => {
  const ts = terminos(q);
  if (!ts.length) return null;
  return {
    $and: ts.map((t) => {
      const re = { $regex: regexDeTermino(t), $options: "i" };
      return { $or: campos.map((c) => ({ [c]: re })) };
    }),
  };
};
