import { useEffect } from "react";
import { CLAVE_TIEMPOS, aplicarTema } from "@/lib/tema-rezo";

// Cambia el tema solo: claro al terminar el tiempo del fajr (šurūq) y
// oscuro al entrar el ʿišāʾ, con los horarios del recuadro de IslamicFinder.
// El primer tema lo pone el <script> de _document.js antes de pintar;
// aquí se traen los horarios del día y se revisa cada 30 segundos.
const TemaSegunRezo = () => {
  useEffect(() => {
    let ultimoIntento = 0;

    const traerHorarios = async () => {
      if (Date.now() - ultimoIntento < 10 * 60 * 1000) return; // máx. un intento cada 10 min
      ultimoIntento = Date.now();
      try {
        const r = await fetch("/api/tiempos-rezo");
        if (!r.ok) return;
        const t = await r.json();
        if (t.fuente !== "islamicfinder") return;
        try {
          localStorage.setItem(CLAVE_TIEMPOS, JSON.stringify(t));
        } catch {}
        aplicarTema();
      } catch {}
    };

    const revisar = () => {
      const { deIslamicFinder } = aplicarTema();
      if (!deIslamicFinder) traerHorarios();
    };

    revisar();
    const id = window.setInterval(revisar, 30 * 1000);
    const alVolver = () => document.visibilityState === "visible" && revisar();
    document.addEventListener("visibilitychange", alVolver);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", alVolver);
    };
  }, []);

  return null;
};

export default TemaSegunRezo;
