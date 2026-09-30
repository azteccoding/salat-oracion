import { useState } from "react";
import styles from "@/styles/site/Noticias.module.css";

// Botones para compartir una noticia en Facebook, WhatsApp e Instagram.
// Instagram no permite compartir enlaces desde una página web: en el celular se abre
// el menú de compartir del teléfono (donde aparece Instagram); en la computadora se
// copia el enlace para pegarlo en una historia o en la biografía.

const LOGOS = {
  facebook: (
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21z" />
  ),
  whatsapp: (
    <path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2zm0 16a7.2 7.2 0 0 1-3.7-1l-.3-.2-2.6.7.7-2.5-.2-.3A7.2 7.2 0 1 1 12 19.2zm4-5.4c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a5.9 5.9 0 0 1-2.9-2.5c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.4a.8.8 0 0 0-.6.3 2.4 2.4 0 0 0-.8 1.8 4.2 4.2 0 0 0 .9 2.2 9.6 9.6 0 0 0 3.7 3.3c1.4.6 1.9.6 2.6.5.4-.1 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1l-.3-.2z" />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.7" r="1.1" />
    </>
  ),
};

const Logo = ({ nombre }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
    {LOGOS[nombre]}
  </svg>
);

const CompartirNoticia = ({ url, titulo }) => {
  const [aviso, setAviso] = useState("");
  const texto = `${titulo} — ${url}`;

  const instagram = async () => {
    // Celular: menú de compartir del teléfono (incluye Instagram si está instalado)
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: titulo, url });
        return;
      } catch {
        // la persona cerró el menú: no hacemos nada
        return;
      }
    }
    // Computadora: copiar el enlace
    try {
      await navigator.clipboard.writeText(url);
      setAviso("Enlace copiado: pégalo en tu historia o biografía de Instagram.");
    } catch {
      setAviso(url);
    }
    setTimeout(() => setAviso(""), 5000);
  };

  return (
    <section className={styles.compartir} aria-label="Compartir esta noticia">
      <p className={styles.compartirTitulo}>Comparte esta noticia</p>
      <div className={styles.compartirBotones}>
        <a
          className={`${styles.compartirBtn} ${styles.facebook}`}
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Logo nombre="facebook" /> Facebook
        </a>
        <a
          className={`${styles.compartirBtn} ${styles.whatsapp}`}
          href={`https://wa.me/?text=${encodeURIComponent(texto)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Logo nombre="whatsapp" /> WhatsApp
        </a>
        <button type="button" className={`${styles.compartirBtn} ${styles.instagram}`} onClick={instagram}>
          <Logo nombre="instagram" /> Instagram
        </button>
      </div>
      <p className={styles.compartirAviso} role="status" aria-live="polite">
        {aviso}
      </p>
    </section>
  );
};

export default CompartirNoticia;
