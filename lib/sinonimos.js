// =====================================================================
//  Equivalencias para el buscador
//  Cada grupo reúne formas que deben encontrarse entre sí: la transliteración
//  de la Casa de Velázquez, las grafías populares (inglesas, persas, turcas,
//  urdus) y, cuando es inequívoco, la palabra española.
//
//  Buscar cualquiera de ellas encuentra textos que contengan cualquier otra.
//  Se pueden escribir con o sin diacríticos: el buscador las normaliza solo.
//  Para añadir un término basta con agregar una línea.
// =====================================================================

const SINONIMOS = [
  ["ṣalāt", "salat", "salah", "salaat", "namaz", "namāz", "oración"],
  ["ŷumuʿa", "jumua", "jumuah", "jumuʿa", "juma", "jumah", "jummah", "yumua", "yumuah", "yuma", "yumah"],
  ["ḏikr", "dhikr", "zikr", "thikr", "dikr"],
  ["wuḍūʾ", "wudu", "wudhu", "wuzu", "wudoo", "abdest"],
  ["gusl", "ghusl", "gusul", "ghusul"],
  ["tayammum", "tayamum", "teyemmum"],
  ["ṣawm", "sawm", "ṣiyām", "siyam", "roza", "rozah", "oruç", "ayuno"],
  ["ramaḍān", "ramadan", "ramadhan", "ramzan", "ramazan"],
  ["tarāwīḥ", "tarawih", "taraweeh", "taravih"],
  ["saḥūr", "suḥūr", "sahur", "suhur", "suhoor", "sehri"],
  ["zakāt", "zakat", "zakah", "zakaat", "zekat"],
  ["ḥaŷŷ", "hajj", "hach", "hayy", "peregrinación"],
  ["ʿumra", "umra", "umrah", "omra"],
  ["aḏān", "adhan", "azan", "athan", "ezan"],
  ["ẓuhr", "zuhr", "dhuhr", "duhr", "zohr", "öğle"],
  ["ʿaṣr", "asr", "asar"],
  ["magrib", "maghrib"],
  ["ʿišāʾ", "isha", "esha", "ishaa"],
  ["faŷr", "fajr", "fayr", "fajar"],
  ["witr", "vitr", "watr"],
  ["sūra", "sura", "surah", "sourate"],
  ["āya", "aya", "ayah", "ayat", "aleya"],
  ["qurʾān", "quran", "koran", "coran", "corán", "alcorán"],
  ["ḥadīṯ", "hadith", "hadiz", "hadis", "hadit"],
  ["sunna", "sunnah", "suna"],
  ["fatwa", "fatwā", "fatāwá", "fatawa", "fetua", "fetva"],
  ["tawḥīd", "tawhid", "tauhid", "tawheed", "tevhid"],
  ["masŷid", "masjid", "mesjid", "mezquita"],
  ["juṭba", "jutba", "khutba", "khutbah", "hutbe"],
  ["ŷanāza", "janaza", "janazah", "yanaza", "cenaze"],
  ["nikāḥ", "nikah", "nikkah", "nikah", "matrimonio"],
  ["muḥammad", "mohammed", "mohamed", "mohammad", "muhammed", "mahoma"],
];

export default SINONIMOS;
