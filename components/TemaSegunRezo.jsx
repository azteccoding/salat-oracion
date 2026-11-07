import { useEffect } from "react";
import { aplicarTema } from "@/lib/tema-rezo";

// Cambia el tema solo: claro al terminar el tiempo del fajr (šurūq) y
// oscuro al entrar el ʿišāʾ, con el cálculo de lib/tema-rezo.js.
// El primer tema lo pone el <script> de _document.js antes de pintar;
// aquí se revisa cada 30 segundos y al volver a la pestaña.
const TemaSegunRezo = () => {
  useEffect(() => {
    const id = window.setInterval(aplicarTema, 30 * 1000);
    const alVolver = () => document.visibilityState === "visible" && aplicarTema();
    document.addEventListener("visibilitychange", alVolver);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", alVolver);
    };
  }, []);

  return null;
};

export default TemaSegunRezo;
