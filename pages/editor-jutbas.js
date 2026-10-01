import { useEffect, useMemo, useState } from "react";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import { SHEIJ_JUTBA, fechaLarga, idDeDrive, reproductorDrive, viernesProximo } from "@/constants/jutbas";
import styles from "@/styles/site/Editor.module.css";
import ui from "@/styles/site/ui.module.css";

// =====================================================================
//  EDITOR DE JUṬBAS  (/editor-jutbas)
//  Página de trabajo: no aparece en el menú ni en Google. Pegas el link de
//  Google Drive que manda el sheij y entrega el JSON listo para MongoDB
//  (base islamic_website, colección "podcasts_khutbah").
// =====================================================================

const aSlug = (t = "") =>
  t
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[ʿʾ'’"]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

const INICIAL = {
  enlace: "",
  titulo: "",
  fecha: "",
  sheij: SHEIJ_JUTBA.nombre,
  lugar: SHEIJ_JUTBA.lugar,
  resumen: "",
  borrador: false,
};

export default function EditorJutbas() {
  const [d, setD] = useState(INICIAL);
  const [aviso, setAviso] = useState("");

  // La fecha se calcula en el navegador: hoy si es viernes, si no el próximo viernes
  useEffect(() => {
    setD((x) => (x.fecha ? x : { ...x, fecha: viernesProximo() }));
  }, []);

  const set = (campo) => (e) => setD((x) => ({ ...x, [campo]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const driveId = idDeDrive(d.enlace);

  // ----- La juṭba final, lista para MongoDB -----
  const jutba = useMemo(() => {
    const j = {
      slug: `${aSlug(d.titulo) || "jutba"}-${d.fecha}`,
      titulo: d.titulo.trim(),
      fecha: d.fecha,
      driveId,
      enlace: d.enlace.trim(),
    };
    // Solo se guarda el sheij si no es el de siempre
    if (d.sheij.trim() && d.sheij.trim() !== SHEIJ_JUTBA.nombre) {
      j.sheij = d.sheij.trim();
      if (d.lugar.trim()) j.lugar = d.lugar.trim();
    }
    if (d.resumen.trim()) j.resumen = d.resumen.trim();
    if (d.borrador) j.borrador = true;
    return j;
  }, [d, driveId]);

  const archivo = `${(aSlug(d.titulo) || "jutba").replace(/-/g, "_")}_${d.fecha}`;

  const faltan = [
    !d.enlace.trim() && "el link de Google Drive",
    d.enlace.trim() && !driveId && "un link de Drive válido (como https://drive.google.com/file/d/…/view)",
    !jutba.titulo && "el título",
    !/^\d{4}-\d{2}-\d{2}$/.test(d.fecha) && "la fecha",
  ].filter(Boolean);

  const json = JSON.stringify(jutba, null, 2);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(json);
      setAviso("JSON copiado.");
    } catch {
      setAviso("No se pudo copiar: abre «Ver el JSON», selecciónalo y usa Ctrl+C.");
    }
    setTimeout(() => setAviso(""), 3000);
  };

  const descargar = () => {
    const url = URL.createObjectURL(new Blob([json], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${archivo}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Seo title="Editor de juṭbas" description="Herramienta interna para publicar la juṭba del viernes." noIndex />

      <PageHero title="Editor de juṭbas" eyebrow="Herramienta interna" crumbs={[{ label: "Editor de juṭbas" }]}>
        <p>Pega el link de Google Drive que manda el sheij, escribe el título y guarda el JSON en MongoDB.</p>
      </PageHero>

      <div className={`contenedor ${styles.layout}`}>
        <div className={styles.form}>
          <section className={styles.tarjeta}>
            <h2>1. El audio</h2>
            <label>
              Link de Google Drive
              <input
                type="url"
                value={d.enlace}
                onChange={set("enlace")}
                placeholder="https://drive.google.com/file/d/…/view?usp=drivesdk"
              />
            </label>
            <p className={styles.ayuda}>
              El archivo debe estar compartido como <strong>«Cualquier persona con el enlace»</strong>. Si en la vista
              previa sale «Necesitas permiso», pídele al sheij que lo comparta así.
            </p>
          </section>

          <section className={styles.tarjeta}>
            <h2>2. Datos</h2>
            <label>
              Título
              <input value={d.titulo} onChange={set("titulo")} placeholder="El derecho del huérfano" />
            </label>
            <div className={styles.fila}>
              <label>
                Fecha (el viernes de la juṭba)
                <input type="date" value={d.fecha} onChange={set("fecha")} />
              </label>
              <label>
                Sheij
                <input value={d.sheij} onChange={set("sheij")} />
              </label>
            </div>
            {d.sheij.trim() !== SHEIJ_JUTBA.nombre && (
              <label>
                Lugar
                <input value={d.lugar} onChange={set("lugar")} placeholder="Ciudad, estado" />
              </label>
            )}
            <label>
              Resumen (opcional)
              <textarea rows={3} value={d.resumen} onChange={set("resumen")} placeholder="Una o dos líneas sobre el tema…" />
            </label>
            <label className={styles.check}>
              <input type="checkbox" checked={d.borrador} onChange={set("borrador")} /> Borrador (solo se ve en tu
              computadora)
            </label>
          </section>
        </div>

        <aside className={styles.lado}>
          <section className={styles.tarjeta}>
            <h2>Vista previa</h2>
            <div className={styles.preview}>
              <h3>{jutba.titulo || "Título de la juṭba"}</h3>
              <p className={styles.previewResumen}>
                {fechaLarga(d.fecha)} · {d.sheij}
              </p>
              {jutba.resumen && <p>{jutba.resumen}</p>}
              {driveId ? (
                <iframe
                  key={driveId}
                  src={reproductorDrive(driveId)}
                  title="Vista previa del audio"
                  allow="autoplay"
                  style={{ width: "100%", height: 120, border: "1px solid var(--borde)", borderRadius: 8 }}
                />
              ) : (
                <p className={styles.ayuda}>Aquí aparece el reproductor al pegar el link.</p>
              )}
            </div>
          </section>

          <section className={styles.tarjeta}>
            <h2>Resultado</h2>
            {faltan.length > 0 ? (
              <p className={styles.falta}>Falta: {faltan.join(", ")}.</p>
            ) : (
              <p className={styles.listo}>✓ Lista para guardar.</p>
            )}
            <div className={styles.acciones}>
              <button type="button" className={`${ui.btn} ${ui.btnPrimary}`} disabled={faltan.length > 0} onClick={copiar}>
                Copiar JSON
              </button>
              <button type="button" className={`${ui.btn} ${ui.btnGhost}`} disabled={faltan.length > 0} onClick={descargar}>
                Descargar JSON
              </button>
            </div>
            <ol className={styles.pasos}>
              <li>
                Pulsa <strong>Copiar JSON</strong>.
              </li>
              <li>
                En MongoDB (Atlas → <em>Browse Collections</em>, o Compass) abre la base <code>islamic_website</code>,
                colección <code>podcasts_khutbah</code> (créala la primera vez).
              </li>
              <li>
                <strong>Insert Document</strong> → borra lo que trae el cuadro → pega → <strong>Insert</strong>.
              </li>
              <li>En menos de un minuto aparece en /jutba (los viernes).</li>
            </ol>
            <p className={styles.aviso} role="status">
              {aviso}
            </p>
            <details>
              <summary>Ver el JSON</summary>
              <pre className={styles.codigo}>{json}</pre>
            </details>
            <button type="button" className={styles.reiniciar} onClick={() => setD({ ...INICIAL, fecha: viernesProximo() })}>
              Empezar una juṭba nueva
            </button>
          </section>
        </aside>
      </div>
    </>
  );
}
