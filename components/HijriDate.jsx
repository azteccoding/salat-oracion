import { useSyncExternalStore } from "react";

// Fecha hiŷrī (calendario Umm al-Qurà) y gregoriana, calculadas en el navegador
// para que siempre correspondan al día del visitante.
const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

const readDates = () => {
  const now = new Date();
  let hijri = "";
  try {
    hijri = new Intl.DateTimeFormat("es-MX-u-ca-islamic-umalqura", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
      .format(now)
      .replace(/\s*AH$/, " H");
  } catch {
    hijri = "";
  }
  const gregorian = cap(
    new Intl.DateTimeFormat("es-MX", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(now)
  );
  return `${hijri}|${gregorian}`;
};

const subscribe = () => () => {};

const HijriDate = ({ className, showGregorian = true, stacked = false }) => {
  const snapshot = useSyncExternalStore(subscribe, readDates, () => null);
  const [hijri, gregorian] = snapshot ? snapshot.split("|") : [];

  return (
    <span className={className}>
      {snapshot ? (
        <>
          <span data-hijri>{hijri}</span>
          {showGregorian && hijri && !stacked && " · "}
          {showGregorian && <span data-gregorian>{gregorian}</span>}
        </>
      ) : (
        "\u00a0"
      )}
    </span>
  );
};

export default HijriDate;
