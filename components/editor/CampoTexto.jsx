import { useRef, useState } from "react";
import styles from "@/styles/site/Editor.module.css";

// Campo de texto con botones: Negritas · Resaltar · Enlace (para los editores).
// Selecciona palabras y pulsa un botón: se envuelven con **…**, ==…== o [texto](enlace).
const CampoTexto = ({ value, onChange, rows = 4, placeholder }) => {
  const ref = useRef(null);
  const [url, setUrl] = useState("");

  const envolver = (antes, despues) => {
    const el = ref.current;
    if (!el) return;
    const { selectionStart: a, selectionEnd: b } = el;
    const sel = value.slice(a, b) || "texto";
    onChange(value.slice(0, a) + antes + sel + despues + value.slice(b));
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(a + antes.length, a + antes.length + sel.length);
    });
  };

  const enlazar = () => {
    const destino = url.trim();
    if (!destino) return;
    envolver("[", `](${destino})`);
    setUrl("");
  };

  return (
    <div className={styles.campoTexto}>
      <div className={styles.barra}>
        <button type="button" onClick={() => envolver("**", "**")} title="Selecciona texto y pulsa">
          <strong>N</strong> Negritas
        </button>
        <button type="button" onClick={() => envolver("==", "==")} title="Selecciona texto y pulsa">
          <mark>R</mark> Resaltar
        </button>
        <span className={styles.enlace}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://… o /pagina-del-sitio"
            aria-label="Dirección del enlace"
          />
          <button type="button" onClick={enlazar}>
            🔗 Enlazar selección
          </button>
        </span>
      </div>
      <textarea ref={ref} rows={rows} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

export default CampoTexto;
