import { ImageResponse } from "next/og";

// Imagen para compartir en redes (1200×630), generada al vuelo.
// Uso: /api/og?n=3500&t=Título de la fatwa&tema=Purificación · Wuḍūʾ
export const config = { runtime: "edge" };

const LOGO = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0Ij48Zz4KICA8cG9seWdvbiBwb2ludHM9IjMyLjAwLDQuMDAgNDAuMjAsMTIuMjAgNTEuODAsMTIuMjAgNTEuODAsMjMuODAgNjAuMDAsMzIuMDAgNTEuODAsNDAuMjAgNTEuODAsNTEuODAgNDAuMjAsNTEuODAgMzIuMDAsNjAuMDAgMjMuODAsNTEuODAgMTIuMjAsNTEuODAgMTIuMjAsNDAuMjAgNC4wMCwzMi4wMCAxMi4yMCwyMy44MCAxMi4yMCwxMi4yMCAyMy44MCwxMi4yMCIgZmlsbD0iI2M5OTYyZiIvPgogIDxwb2x5Z29uIHBvaW50cz0iMzIuMDAsNy41MCAzOS4xOCwxNC42OCA0OS4zMiwxNC42OCA0OS4zMiwyNC44MiA1Ni41MCwzMi4wMCA0OS4zMiwzOS4xOCA0OS4zMiw0OS4zMiAzOS4xOCw0OS4zMiAzMi4wMCw1Ni41MCAyNC44Miw0OS4zMiAxNC42OCw0OS4zMiAxNC42OCwzOS4xOCA3LjUwLDMyLjAwIDE0LjY4LDI0LjgyIDE0LjY4LDE0LjY4IDI0LjgyLDE0LjY4IiBmaWxsPSIjMGYyMzUwIi8+CiAgPHBvbHlnb24gcG9pbnRzPSI0MS4zOCw5LjM2IDQ1LjI2LDE4Ljc0IDU0LjY0LDIyLjYyIDUwLjc1LDMyLjAwIDU0LjY0LDQxLjM4IDQ1LjI2LDQ1LjI2IDQxLjM4LDU0LjY0IDMyLjAwLDUwLjc1IDIyLjYyLDU0LjY0IDE4Ljc0LDQ1LjI2IDkuMzYsNDEuMzggMTMuMjUsMzIuMDAgOS4zNiwyMi42MiAxOC43NCwxOC43NCAyMi42Miw5LjM2IDMyLjAwLDEzLjI1IiBmaWxsPSJub25lIiBzdHJva2U9IiNlNmM3N2EiIHN0cm9rZS13aWR0aD0iMS4yIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CiAgPHBvbHlnb24gcG9pbnRzPSIzNi40MCwyMS4zOCA0Mi42MiwyNy42MCA0Mi42MiwzNi40MCAzNi40MCw0Mi42MiAyNy42MCw0Mi42MiAyMS4zOCwzNi40MCAyMS4zOCwyNy42MCAyNy42MCwyMS4zOCIgZmlsbD0iI2ZhZjZlZSIvPgogIDxwb2x5Z29uIHBvaW50cz0iMzIuMDAsMjQuMDAgMzQuMzQsMjYuMzQgMzcuNjYsMjYuMzQgMzcuNjYsMjkuNjYgNDAuMDAsMzIuMDAgMzcuNjYsMzQuMzQgMzcuNjYsMzcuNjYgMzQuMzQsMzcuNjYgMzIuMDAsNDAuMDAgMjkuNjYsMzcuNjYgMjYuMzQsMzcuNjYgMjYuMzQsMzQuMzQgMjQuMDAsMzIuMDAgMjYuMzQsMjkuNjYgMjYuMzQsMjYuMzQgMjkuNjYsMjYuMzQiIGZpbGw9IiMxZDNmOGYiLz4KICA8Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIyLjIiIGZpbGw9IiNjOTk2MmYiLz4KPC9nPjwvc3ZnPg==";

// La tipografía de las imágenes no trae todas las letras de transliteración (ḥ, ṣ, ʿ…):
// se simplifican solo esas, conservando acentos del español y ā ī ū.
const limpiar = (s = "", max = 140) => {
  const t = [...s.replace(/[ʿʾ]/g, "’")]
    .map((c) => (c.codePointAt(0) <= 0x17f || c === "’" ? c : c.normalize("NFD").replace(/[\u0300-\u036f]/g, "")))
    .join("")
    .trim();
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
};

export default function handler(req) {
  const { searchParams } = new URL(req.url);
  const numero = limpiar(searchParams.get("n") || "", 12);
  const titulo = limpiar(searchParams.get("t") || "Estudiantes del Islam en Guanajuato");
  const tema = limpiar(searchParams.get("tema") || "", 60);
  const tamano = titulo.length > 90 ? 52 : titulo.length > 55 ? 62 : 72;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "radial-gradient(circle at 85% 10%, #1d3f8f 0%, #0f2350 55%, #0a1838 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- dentro de ImageResponse no aplica next/image */}
          <img src={LOGO} width={64} height={64} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 28, color: "#ffffff" }}>Estudiantes del Islam</span>
            <span style={{ fontSize: 20, color: "#e6c77a", letterSpacing: 4 }}>EN GUANAJUATO</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {(numero || tema) && (
            <div style={{ display: "flex", gap: 16, alignItems: "center", fontSize: 26, color: "#e6c77a" }}>
              {numero && (
                <span
                  style={{
                    padding: "6px 18px",
                    borderRadius: 12,
                    background: "rgba(230,199,122,0.18)",
                    border: "2px solid rgba(230,199,122,0.6)",
                  }}
                >
                  {`Fatwa n.º ${numero}`}
                </span>
              )}
              {tema && <span>{tema}</span>}
            </div>
          )}
          <div style={{ display: "flex", fontSize: tamano, lineHeight: 1.12, fontWeight: 700, maxWidth: 1000 }}>
            {titulo}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "#c3cbe2" }}>
          <span>islamguanajuato.com</span>
          <span style={{ color: "#e6c77a" }}>{limpiar("Fiqh ẓāhirī · Corán y Sunna")}</span>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 10, background: "linear-gradient(90deg, #9a6e1c, #e6c77a, #9a6e1c)" }} />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable" },
    }
  );
}
