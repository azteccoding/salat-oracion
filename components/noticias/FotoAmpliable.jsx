import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "@/components/Icon";
import { textoPlano } from "@/data/noticias-texto";
import styles from "@/styles/site/Noticias.module.css";

// Foto que se abre sobre la pantalla al tocarla.
//   · El fondo se oscurece alrededor de la foto (sin llegar a negro).
//   · Pellizcar (pinch), la rueda del ratón o el doble toque agrandan solo la foto, nunca la página.
//   · Con la foto agrandada se puede arrastrar para recorrerla.
//   · Se cierra tocando fuera de la foto, con la ✕ o con la tecla Esc.

const MIN = 1;
const MAX = 5;
const DOBLE_TOQUE = 2.5; // aumento al hacer doble toque o doble clic
const ESPERA_DOBLE = 300; // ms entre dos toques para contar como doble toque
const TOLERANCIA = 8; // px que puede moverse el dedo y seguir contando como toque

const limitar = (v, min, max) => Math.min(max, Math.max(min, v));
const distancia = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const medio = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

function Visor({ src, alt, pie, onClose }) {
  const capa = useRef(null);
  const foto = useRef(null);
  const botonCerrar = useRef(null);
  const t = useRef({ s: 1, x: 0, y: 0 }); // escala y desplazamiento de la foto
  const punteros = useRef(new Map());
  const gesto = useRef(null);
  const toque = useRef(null);
  const ultimoToque = useRef(0);

  // Punto de la pantalla medido desde el centro del visor (la foto está centrada).
  const relativo = useCallback((e) => {
    const r = capa.current.getBoundingClientRect();
    return { x: e.clientX - r.left - r.width / 2, y: e.clientY - r.top - r.height / 2 };
  }, []);

  const pintar = useCallback((animar = false) => {
    const el = foto.current;
    if (!el) return;
    const { s, x, y } = t.current;
    el.style.transition = animar ? "transform 0.22s ease" : "none";
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`;
    capa.current?.classList.toggle(styles.visorConZoom, s > 1.01);
  }, []);

  // Mantiene la escala entre MIN y MAX y no deja que la foto se salga de la pantalla.
  const encuadrar = useCallback(() => {
    const el = foto.current;
    const c = capa.current;
    if (!el || !c) return;
    const s = limitar(t.current.s, MIN, MAX);
    if (s <= MIN) {
      t.current = { s: MIN, x: 0, y: 0 };
      return;
    }
    const maxX = Math.max(0, (el.offsetWidth * s - c.clientWidth) / 2);
    const maxY = Math.max(0, (el.offsetHeight * s - c.clientHeight) / 2);
    t.current = { s, x: limitar(t.current.x, -maxX, maxX), y: limitar(t.current.y, -maxY, maxY) };
  }, []);

  // Cambia la escala dejando fijo el punto p (el que está bajo el dedo o el cursor).
  const zoomEn = useCallback((p, nueva) => {
    const { s, x, y } = t.current;
    const k = nueva / s;
    t.current = { s: nueva, x: p.x - (p.x - x) * k, y: p.y - (p.y - y) * k };
  }, []);

  // Esc para cerrar, foco en la ✕, sin scroll de la página mientras está abierto.
  useEffect(() => {
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    botonCerrar.current?.focus({ preventScroll: true });

    const tecla = (e) => {
      if (e.key === "Escape") onClose();
    };
    // Safari en iPhone: evita que el pellizco haga zoom a toda la página.
    const sinZoomDePagina = (e) => e.preventDefault();

    document.addEventListener("keydown", tecla);
    document.addEventListener("gesturestart", sinZoomDePagina);
    document.addEventListener("gesturechange", sinZoomDePagina);
    return () => {
      document.body.style.overflow = anterior;
      document.removeEventListener("keydown", tecla);
      document.removeEventListener("gesturestart", sinZoomDePagina);
      document.removeEventListener("gesturechange", sinZoomDePagina);
    };
  }, [onClose]);

  // Rueda del ratón y pellizco en el touchpad (llega como rueda con Ctrl).
  useEffect(() => {
    const c = capa.current;
    const rueda = (e) => {
      e.preventDefault();
      const factor = Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0025));
      zoomEn(relativo(e), limitar(t.current.s * factor, MIN, MAX));
      encuadrar();
      pintar();
    };
    c.addEventListener("wheel", rueda, { passive: false });
    return () => c.removeEventListener("wheel", rueda);
  }, [encuadrar, pintar, relativo, zoomEn]);

  const alBajar = (e) => {
    if (e.target.closest("button")) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    capa.current.setPointerCapture(e.pointerId);
    punteros.current.set(e.pointerId, relativo(e));
    const lista = [...punteros.current.values()];
    const { s, x, y } = t.current;

    if (lista.length === 1) {
      gesto.current = { tipo: "mover", inicio: lista[0], x0: x, y0: y };
      toque.current = { x: e.clientX, y: e.clientY, cuando: Date.now(), enFoto: e.target === foto.current, p: lista[0] };
    } else if (lista.length === 2) {
      gesto.current = { tipo: "pellizco", d0: distancia(lista[0], lista[1]) || 1, m0: medio(lista[0], lista[1]), s0: s, x0: x, y0: y };
      toque.current = null;
    }
  };

  const alMover = (e) => {
    if (!punteros.current.has(e.pointerId)) return;
    punteros.current.set(e.pointerId, relativo(e));
    const lista = [...punteros.current.values()];
    const g = gesto.current;

    if (toque.current && Math.hypot(e.clientX - toque.current.x, e.clientY - toque.current.y) > TOLERANCIA) {
      toque.current = null;
    }
    if (!g) return;

    if (g.tipo === "pellizco" && lista.length >= 2) {
      const m = medio(lista[0], lista[1]);
      // Durante el gesto se permite un poco menos de 1 para que se sienta elástico; al soltar vuelve a 1.
      const s = limitar((g.s0 * distancia(lista[0], lista[1])) / g.d0, 0.8, MAX);
      const k = s / g.s0;
      t.current = { s, x: m.x - (g.m0.x - g.x0) * k, y: m.y - (g.m0.y - g.y0) * k };
      pintar();
    } else if (g.tipo === "mover" && t.current.s > 1) {
      const p = lista[0];
      t.current = { ...t.current, x: g.x0 + p.x - g.inicio.x, y: g.y0 + p.y - g.inicio.y };
      pintar();
    }
  };

  const alSoltar = (e) => {
    if (!punteros.current.has(e.pointerId)) return;
    punteros.current.delete(e.pointerId);
    const lista = [...punteros.current.values()];

    if (lista.length === 1) {
      // Se levantó un dedo del pellizco: se sigue arrastrando con el otro.
      gesto.current = { tipo: "mover", inicio: lista[0], x0: t.current.x, y0: t.current.y };
      return;
    }
    if (lista.length > 1) return;

    gesto.current = null;
    const tq = toque.current;
    toque.current = null;

    if (tq && e.type === "pointerup" && Date.now() - tq.cuando < 500) {
      if (!tq.enFoto) {
        onClose();
        return;
      }
      const ahora = Date.now();
      if (ahora - ultimoToque.current < ESPERA_DOBLE) {
        ultimoToque.current = 0;
        if (t.current.s > 1.01) t.current = { s: 1, x: 0, y: 0 };
        else zoomEn(tq.p, DOBLE_TOQUE);
        encuadrar();
        pintar(true);
        return;
      }
      ultimoToque.current = ahora;
    }

    encuadrar();
    pintar(true);
  };

  return createPortal(
    <div
      ref={capa}
      className={styles.visor}
      role="dialog"
      aria-modal="true"
      aria-label={alt || "Foto ampliada"}
      onPointerDown={alBajar}
      onPointerMove={alMover}
      onPointerUp={alSoltar}
      onPointerCancel={alSoltar}
    >
      <button ref={botonCerrar} type="button" className={styles.visorCerrar} onClick={onClose} aria-label="Cerrar">
        <Icon name="close" size={22} />
      </button>
      {/* <img> normal a propósito: al agrandar se necesita la foto original, no una versión reducida. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={foto} src={src} alt={alt} className={styles.visorFoto} draggable={false} />
      {pie && <p className={styles.visorPie}>{textoPlano(pie)}</p>}
    </div>,
    document.body
  );
}

// Envuelve una foto (normalmente un <Image>) para que se pueda abrir en grande.
//   relleno  true si la foto usa `fill` y debe ocupar todo su contenedor.
export default function FotoAmpliable({ src, alt = "", pie, relleno = false, children }) {
  const [abierta, setAbierta] = useState(false);
  const boton = useRef(null);

  const cerrar = useCallback(() => {
    setAbierta(false);
    boton.current?.focus({ preventScroll: true });
  }, []);

  return (
    <>
      <button
        ref={boton}
        type="button"
        className={`${styles.ampliable} ${relleno ? styles.ampliableRelleno : ""}`}
        onClick={() => setAbierta(true)}
        aria-label={alt ? `Ampliar foto: ${alt}` : "Ampliar foto"}
        aria-haspopup="dialog"
      >
        {children}
      </button>
      {abierta && <Visor src={src} alt={alt} pie={pie} onClose={cerrar} />}
    </>
  );
}
