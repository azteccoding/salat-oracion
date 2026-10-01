import { useEffect, useState } from "react";
import styles from "@/styles/site/Noticias.module.css";

// Botones para compartir una noticia o una fatwa en Facebook, X (antes Twitter), WhatsApp e Instagram.
//
// Facebook: en el celular, su app ignora el enlace sharer.php (solo abre el inicio), así que ahí
// se usa el menú de compartir del teléfono: al elegir Facebook se abre una publicación nueva con
// el enlace. En la computadora sí se usa sharer.php.
// Instagram: no acepta enlaces desde una página web. En el celular se le manda la IMAGEN
// (la foto de la noticia o la tarjeta de la fatwa) y se copia el enlace, para pegarlo en el
// texto o en una etiqueta de enlace de la historia. En la computadora solo se copia el enlace.

const LOGOS = {
  facebook: (
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21z" />
  ),
  whatsapp: (
    <path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2zm0 16a7.2 7.2 0 0 1-3.7-1l-.3-.2-2.6.7.7-2.5-.2-.3A7.2 7.2 0 1 1 12 19.2zm4-5.4c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a5.9 5.9 0 0 1-2.9-2.5c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.4a.8.8 0 0 0-.6.3 2.4 2.4 0 0 0-.8 1.8 4.2 4.2 0 0 0 .9 2.2 9.6 9.6 0 0 0 3.7 3.3c1.4.6 1.9.6 2.6.5.4-.1 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1l-.3-.2z" />
  ),
  x: <path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6.4L5.2 21H2.1l7.3-8.3L2 3h6.4l4.4 5.9zm-1.1 16.2h1.7L7.4 4.7H5.6z" />,
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

const esCelular = () =>
  typeof navigator !== "undefined" &&
  (navigator.userAgentData?.mobile || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

// `que` cambia el texto: «esta noticia» (por defecto) o «esta fatwa».
// `imagen`: dirección de la imagen que se manda a Instagram (opcional).
const CompartirNoticia = ({ url, titulo, que = "esta noticia", imagen }) => {
  const [aviso, setAviso] = useState("");
  const [archivo, setArchivo] = useState(null);
  const texto = `${titulo} — ${url}`;

  // La imagen se descarga antes del clic: el teléfono solo abre su menú de compartir
  // si se llama justo al tocar el botón, sin esperas.
  useEffect(() => {
    if (!imagen || !esCelular() || !navigator.canShare) return undefined;
    let vivo = true;
    fetch(imagen)
      .then((r) => (r.ok ? r.blob() : null))
      .then((blob) => {
        if (!vivo || !blob) return;
        const ext = blob.type.includes("png") ? "png" : "jpg";
        const f = new File([blob], `compartir.${ext}`, { type: blob.type || "image/jpeg" });
        if (navigator.canShare({ files: [f] })) setArchivo(f);
      })
      .catch(() => {});
    return () => {
      vivo = false;
    };
  }, [imagen]);

  const avisar = (msg) => {
    setAviso(msg);
    setTimeout(() => setAviso(""), 6000);
  };

  // Copia el enlace. Si el navegador no tiene el portapapeles moderno (por ejemplo,
  // en http sin candado), usa el método antiguo, que funciona en todos lados.
  const copiar = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).catch(() => {});
      return true;
    }
    try {
      const t = document.createElement("textarea");
      t.value = url;
      t.setAttribute("readonly", "");
      t.style.position = "fixed";
      t.style.opacity = "0";
      document.body.appendChild(t);
      t.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(t);
      return ok;
    } catch {
      return false;
    }
  };

  const facebook = (e) => {
    if (!esCelular() || !navigator.share) return; // computadora: sigue el enlace sharer.php
    e.preventDefault();
    navigator.share({ title: titulo, url }).catch(() => {});
  };

  const instagram = () => {
    const copiado = copiar();
    if (!esCelular()) {
      avisar(copiado ? "Enlace copiado: pégalo en tu historia o publicación de Instagram." : "Abre Instagram en tu celular para compartir.");
      return;
    }
    // 1) Lo mejor: mandar la imagen con el menú del teléfono → elegir «Historias»
    if (archivo) {
      navigator.share({ files: [archivo] }).catch(() => {});
      avisar("Elige Instagram → Historias. El enlace ya está copiado: pégalo con la etiqueta «Enlace».");
      return;
    }
    // 2) Si el teléfono no lo permite: abrir directo la cámara de historias de Instagram
    avisar("El enlace ya está copiado: pégalo en tu historia con la etiqueta «Enlace».");
    window.location.href = "instagram://story-camera";
  };

  return (
    <section className={styles.compartir} aria-label={`Compartir ${que}`} data-no-print>
      <p className={styles.compartirTitulo}>Comparte {que}</p>
      <div className={styles.compartirBotones}>
        <a
          className={`${styles.compartirBtn} ${styles.facebook}`}
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={facebook}
        >
          <Logo nombre="facebook" /> Facebook
        </a>
        <a
          className={`${styles.compartirBtn} ${styles.x}`}
          href={`https://x.com/intent/tweet?text=${encodeURIComponent(titulo)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Logo nombre="x" /> X
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
