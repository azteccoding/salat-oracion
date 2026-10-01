import { useState } from "react";
import styles from "@/styles/site/Editor.module.css";

// Convierte una foto elegida en la computadora a base64 (data:image/jpeg;base64,…),
// reduciéndola antes para que el JSON no pese demasiado:
//   máximo 1600 px de ancho y calidad JPEG 82 % (una foto de celular queda en ~150–400 KB).
const ANCHO_MAX = 1600;
const CALIDAD = 0.82;

export const pesoKB = (dataUrl = "") => Math.round((dataUrl.length * 3) / 4 / 1024);

const aBase64 = (archivo) =>
  new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onerror = () => reject(new Error("No se pudo leer el archivo."));
    lector.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Ese archivo no parece una imagen."));
      img.onload = () => {
        const escala = Math.min(1, ANCHO_MAX / img.naturalWidth);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.naturalWidth * escala);
        canvas.height = Math.round(img.naturalHeight * escala);
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff"; // fondo blanco para PNG con transparencia
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", CALIDAD));
      };
      img.src = lector.result;
    };
    lector.readAsDataURL(archivo);
  });

const SubirImagen = ({ data, onChange }) => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const elegir = async (e) => {
    const archivo = e.target.files?.[0];
    e.target.value = "";
    if (!archivo) return;
    setError("");
    setCargando(true);
    try {
      onChange(await aBase64(archivo));
    } catch (err) {
      setError(err.message);
    }
    setCargando(false);
  };

  return (
    <div className={styles.subirImagen}>
      {data ? (
        <div className={styles.miniatura}>
          {/* eslint-disable-next-line @next/next/no-img-element -- vista previa de un base64 local */}
          <img src={data} alt="" />
          <span>{pesoKB(data)} KB</span>
          <button type="button" className={styles.quitar} onClick={() => onChange("")}>
            ✕ Quitar
          </button>
        </div>
      ) : null}
      <label className={styles.botonArchivo}>
        <input type="file" accept="image/*" onChange={elegir} />
        {cargando ? "Procesando…" : data ? "Cambiar foto" : "Elegir foto…"}
      </label>
      {error && <p className={styles.falta}>{error}</p>}
    </div>
  );
};

export default SubirImagen;
