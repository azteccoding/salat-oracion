import { useEffect, useMemo, useState } from "react";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import CampoTexto from "@/components/editor/CampoTexto";
import TextoRico from "@/components/noticias/TextoRico";
import { topicOfCode } from "@/constants/fataawa";
import { codigosYTitulos } from "@/lib/fataawa-db";
import styles from "@/styles/site/Editor.module.css";
import ui from "@/styles/site/ui.module.css";

// =====================================================================
//  EDITOR DE FATĀWÁ  (/editor-fataawa)
//  Página de trabajo: no aparece en el menú ni en Google. Arma una fatwa
//  con formularios y entrega el JSON listo para pegar en MongoDB
//  (base islamic_website, colección "fataawa").
// =====================================================================

const hoy = () => new Date().toLocaleDateString("en-CA"); // AAAA-MM-DD

const aSlug = (t = "") =>
  t
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[ʿʾ'’"¿?¡!]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);

const CODIGO_VALIDO = /^(\d{4}|ac\d{2}|an\d{2})$/;

let contador = 0;
const nuevoId = () => `b${Date.now()}${contador++}`;

const BLOQUES = [
  { type: "p", label: "Párrafo" },
  { type: "h", label: "Subtítulo" },
  { type: "list", label: "Lista" },
  { type: "quote", label: "Cita" },
  { type: "arabic", label: "Texto árabe" },
  { type: "nota", label: "Recuadro" },
  { type: "link", label: "Enlace a otra fatwa" },
];

const bloqueVacio = (type) => {
  const base = { id: nuevoId(), type };
  if (type === "list") return { ...base, items: [""] };
  if (type === "quote") return { ...base, text: "", source: "" };
  if (type === "arabic") return { ...base, text: "", translit: "", translation: "", source: "" };
  if (type === "nota") return { ...base, title: "", text: "" };
  if (type === "link") return { ...base, codigo: "", text: "" };
  return { ...base, text: "" };
};

const INICIAL = {
  codigo: "",
  title: "",
  slug: "",
  slugManual: false,
  date: "",
  summary: "",
  question: "",
  opciones: { fuentes: false, relacionadas: false, borrador: false, sinApertura: false, sinCierre: false },
  answer: [],
  sources: [""],
  related: [],
};

const GUARDADO = "editor-fataawa-borrador";

export default function EditorFataawa({ existentes }) {
  const [d, setD] = useState(INICIAL);
  const [cargado, setCargado] = useState(false);
  const [aviso, setAviso] = useState("");

  // Recupera el trabajo guardado en este navegador
  useEffect(() => {
    try {
      const g = window.localStorage.getItem(GUARDADO);
      if (g) setD({ ...INICIAL, ...JSON.parse(g) });
      else setD((x) => ({ ...x, date: hoy() }));
    } catch {
      setD((x) => ({ ...x, date: hoy() }));
    }
    setCargado(true);
  }, []);

  useEffect(() => {
    if (!cargado) return;
    try {
      window.localStorage.setItem(GUARDADO, JSON.stringify(d));
    } catch {
      /* sin almacenamiento: no pasa nada */
    }
  }, [d, cargado]);

  const set = (campo, valor) => setD((x) => ({ ...x, [campo]: valor }));
  const setOpcion = (k, v) => setD((x) => ({ ...x, opciones: { ...x.opciones, [k]: v } }));
  const setTitulo = (t) => setD((x) => ({ ...x, title: t, slug: x.slugManual ? x.slug : aSlug(t) }));

  const agregar = (type) => setD((x) => ({ ...x, answer: [...x.answer, bloqueVacio(type)] }));
  const cambiar = (id, cambios) => setD((x) => ({ ...x, answer: x.answer.map((b) => (b.id === id ? { ...b, ...cambios } : b)) }));
  const quitar = (id) => setD((x) => ({ ...x, answer: x.answer.filter((b) => b.id !== id) }));
  const mover = (id, paso) =>
    setD((x) => {
      const i = x.answer.findIndex((b) => b.id === id);
      const j = i + paso;
      if (j < 0 || j >= x.answer.length) return x;
      const a = [...x.answer];
      [a[i], a[j]] = [a[j], a[i]];
      return { ...x, answer: a };
    });

  // Tema que corresponde al código
  const codigo = d.codigo.trim().toLowerCase();
  const { topic, sub } = topicOfCode(codigo);
  const tema = topic ? [topic.label, sub?.label].filter(Boolean).join(" · ") : "";
  const repetido = existentes.find((f) => f.codigo === codigo);
  const otras = existentes.filter((f) => f.codigo !== codigo);

  // ----- La fatwa final -----
  const fatwa = useMemo(() => {
    const f = { codigo, slug: d.slug || aSlug(d.title), title: d.title.trim(), date: d.date };
    if (d.opciones.borrador) f.borrador = true;
    f.summary = d.summary.trim();
    f.question = d.question.trim();
    f.answer = d.answer
      .map((b) => {
        if (b.type === "list") return { type: "list", items: b.items.map((t) => t.trim()).filter(Boolean) };
        if (b.type === "quote") return { type: "quote", text: b.text.trim(), ...(b.source.trim() && { source: b.source.trim() }) };
        if (b.type === "arabic")
          return {
            type: "arabic",
            text: b.text.trim(),
            ...(b.translit.trim() && { translit: b.translit.trim() }),
            ...(b.translation.trim() && { translation: b.translation.trim() }),
            ...(b.source.trim() && { source: b.source.trim() }),
          };
        if (b.type === "nota") return { type: "nota", ...(b.title.trim() && { title: b.title.trim() }), text: b.text.trim() };
        if (b.type === "link") return { type: "link", codigo: b.codigo, text: b.text.trim() };
        return { type: b.type, text: b.text.trim() };
      })
      .filter((b) => (b.type === "list" ? b.items.length : b.type === "link" ? b.codigo && b.text : b.text));
    if (d.opciones.fuentes) {
      const s = d.sources.map((x) => x.trim()).filter(Boolean);
      if (s.length) f.sources = s;
    }
    if (d.opciones.relacionadas && d.related.length) f.related = d.related;
    if (d.opciones.sinApertura) f.opening = false;
    if (d.opciones.sinCierre) f.closing = false;
    return f;
  }, [d, codigo]);

  const archivo = `${(fatwa.slug || "fatwa").replace(/-/g, "_")}_${codigo || "0000"}`.replace(/^(\d)/, "f_$1");

  const faltan = [
    !CODIGO_VALIDO.test(codigo) && "un código válido (4 cifras, o ac00 / an00)",
    CODIGO_VALIDO.test(codigo) && !topic && "un código dentro de algún tema",
    repetido && `otro código: el ${codigo} ya es «${repetido.title}»`,
    !fatwa.title && "el título",
    !fatwa.date && "la fecha",
    !fatwa.summary && "el resumen",
    !fatwa.question && "la pregunta",
    !fatwa.answer.length && "al menos un bloque de respuesta",
  ].filter(Boolean);

  const descargar = (contenido, nombre, tipo) => {
    const url = URL.createObjectURL(new Blob([contenido], { type: tipo }));
    const a = document.createElement("a");
    a.href = url;
    a.download = nombre;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copiar = async (texto, que) => {
    try {
      await navigator.clipboard.writeText(texto);
      setAviso(`${que} copiado.`);
    } catch {
      setAviso("No se pudo copiar: selecciona el texto y usa Ctrl+C.");
    }
    setTimeout(() => setAviso(""), 3000);
  };

  const empezarDeNuevo = () => {
    if (!window.confirm("¿Borrar todo y empezar una fatwa nueva?")) return;
    setD({ ...INICIAL, date: hoy() });
  };

  const tituloDe = (c) => existentes.find((f) => f.codigo === c)?.title || "";

  return (
    <>
      <Seo title="Editor de fatāwá" description="Herramienta interna para escribir fatāwá." noIndex />

      <PageHero title="Editor de fatāwá" eyebrow="Herramienta interna" crumbs={[{ label: "Editor de fatāwá" }]}>
        <p>
          Llena los campos, activa lo que necesites y copia el JSON para pegarlo en MongoDB. Tu trabajo se guarda solo en este
          navegador mientras escribes.
        </p>
      </PageHero>

      <div className={`contenedor ${styles.layout}`}>
        <div className={styles.form}>
          {/* ---------- 1. Datos ---------- */}
          <section className={styles.tarjeta}>
            <h2>1. Datos principales</h2>
            <div className={styles.fila}>
              <label>
                Código
                <input value={d.codigo} onChange={(e) => set("codigo", e.target.value)} placeholder="3501" />
                <span className={styles.ayuda}>{tema ? `Tema: ${tema}` : "1000 ʿaqīda · 2000 uṣūl · 3000 ṭahāra (3300 gusl, 3500 wuḍūʾ) · 4000 ṣalāt · 5000 zakāt · 6000 ayuno · 7000 ḥaŷŷ · 8000 matrimonio · 9000 sufismo · ac00 · an00"}</span>
              </label>
              <label>
                Fecha
                <input type="date" value={d.date} onChange={(e) => set("date", e.target.value)} />
              </label>
            </div>
            <label>
              Título (la pregunta en corto)
              <input value={d.title} onChange={(e) => setTitulo(e.target.value)} placeholder="¿Anula el wuḍūʾ tocar a la esposa?" />
            </label>
            <label>
              Resumen (una o dos líneas para la lista)
              <textarea rows={2} value={d.summary} onChange={(e) => set("summary", e.target.value)} />
            </label>
            <label>
              Pregunta, tal como llegó (deja una línea en blanco entre párrafos)
              <CampoTexto value={d.question} onChange={(v) => set("question", v)} rows={5} />
            </label>
            <details className={styles.avanzado}>
              <summary>Dirección web</summary>
              <label>
                /fataawa-zahiri-fiqh/…-{codigo || "código"}
                <input value={d.slug} onChange={(e) => setD((x) => ({ ...x, slug: aSlug(e.target.value), slugManual: true }))} />
              </label>
            </details>
          </section>

          {/* ---------- 2. Opciones ---------- */}
          <section className={styles.tarjeta}>
            <h2>2. ¿Qué lleva esta fatwa?</h2>
            <div className={styles.checks}>
              {[
                ["fuentes", "Fuentes"],
                ["relacionadas", "Fatāwá relacionadas"],
                ["borrador", "Borrador (no se publica)"],
                ["sinApertura", "Sin «Al-ḥamdu li-llāhi»"],
                ["sinCierre", "Sin «Wa-llāhu aʿlamu»"],
              ].map(([k, label]) => (
                <label key={k} className={styles.check}>
                  <input type="checkbox" checked={d.opciones[k]} onChange={(e) => setOpcion(k, e.target.checked)} />
                  {label}
                </label>
              ))}
            </div>

            {d.opciones.relacionadas && (
              <div className={styles.sub}>
                <h3>Fatāwá relacionadas</h3>
                {otras.length === 0 ? (
                  <p className={styles.ayuda}>Todavía no hay otras fatāwá.</p>
                ) : (
                  <div className={styles.checks}>
                    {otras.map((f) => (
                      <label key={f.codigo} className={styles.check}>
                        <input
                          type="checkbox"
                          checked={d.related.includes(f.codigo)}
                          onChange={(e) =>
                            set("related", e.target.checked ? [...d.related, f.codigo] : d.related.filter((c) => c !== f.codigo))
                          }
                        />
                        {f.codigo} · {f.title}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>

          {/* ---------- 3. Respuesta ---------- */}
          <section className={styles.tarjeta}>
            <h2>3. Respuesta</h2>
            <p className={styles.ayuda}>
              «Al-ḥamdu li-llāhi» al inicio y «Wa-llāhu aʿlamu» al final se ponen solos. Selecciona palabras y usa{" "}
              <strong>negritas</strong>, <mark>resaltar</mark> o enlace.
            </p>

            {d.answer.map((b, i) => (
              <div key={b.id} className={styles.bloque}>
                <div className={styles.bloqueCabeza}>
                  <strong>
                    {i + 1}. {BLOQUES.find((x) => x.type === b.type)?.label}
                  </strong>
                  <span>
                    <button type="button" onClick={() => mover(b.id, -1)} aria-label="Subir">
                      ↑
                    </button>
                    <button type="button" onClick={() => mover(b.id, 1)} aria-label="Bajar">
                      ↓
                    </button>
                    <button type="button" onClick={() => quitar(b.id)} aria-label="Quitar" className={styles.quitar}>
                      ✕
                    </button>
                  </span>
                </div>

                {b.type === "p" && <CampoTexto value={b.text} onChange={(v) => cambiar(b.id, { text: v })} />}

                {b.type === "h" && <input value={b.text} onChange={(e) => cambiar(b.id, { text: e.target.value })} placeholder="Subtítulo" />}

                {b.type === "list" && (
                  <>
                    {b.items.map((it, k) => (
                      <div key={k} className={styles.itemLista}>
                        <CampoTexto rows={2} value={it} onChange={(v) => cambiar(b.id, { items: b.items.map((x, j) => (j === k ? v : x)) })} />
                        <button
                          type="button"
                          className={styles.quitar}
                          onClick={() => cambiar(b.id, { items: b.items.filter((_, j) => j !== k) })}
                          aria-label="Quitar punto"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button type="button" className={styles.mas} onClick={() => cambiar(b.id, { items: [...b.items, ""] })}>
                      + Punto
                    </button>
                  </>
                )}

                {b.type === "quote" && (
                  <>
                    <CampoTexto value={b.text} onChange={(v) => cambiar(b.id, { text: v })} rows={3} placeholder="La cita en español" />
                    <input value={b.source} onChange={(e) => cambiar(b.id, { source: e.target.value })} placeholder="Ibn Ḥazm, al-Muḥallā, masʾala 150" />
                  </>
                )}

                {b.type === "arabic" && (
                  <>
                    <textarea dir="rtl" lang="ar" rows={3} value={b.text} onChange={(e) => cambiar(b.id, { text: e.target.value })} placeholder="النص العربي" />
                    <input value={b.translit} onChange={(e) => cambiar(b.id, { translit: e.target.value })} placeholder="Transliteración (opcional)" />
                    <input value={b.translation} onChange={(e) => cambiar(b.id, { translation: e.target.value })} placeholder="Traducción (opcional)" />
                    <input value={b.source} onChange={(e) => cambiar(b.id, { source: e.target.value })} placeholder="Corán 5:6 · Muslim 224 … (opcional)" />
                  </>
                )}

                {b.type === "nota" && (
                  <>
                    <input value={b.title} onChange={(e) => cambiar(b.id, { title: e.target.value })} placeholder="Título del recuadro (opcional)" />
                    <CampoTexto value={b.text} onChange={(v) => cambiar(b.id, { text: v })} rows={3} />
                  </>
                )}

                {b.type === "link" && (
                  <>
                    <select value={b.codigo} onChange={(e) => cambiar(b.id, { codigo: e.target.value })}>
                      <option value="">Elige la fatwa…</option>
                      {otras.map((f) => (
                        <option key={f.codigo} value={f.codigo}>
                          {f.codigo} · {f.title}
                        </option>
                      ))}
                    </select>
                    <input
                      value={b.text}
                      onChange={(e) => cambiar(b.id, { text: e.target.value })}
                      placeholder={b.codigo ? `Lee la fatwa n.º ${b.codigo}: ${tituloDe(b.codigo)}` : "Texto del enlace"}
                    />
                  </>
                )}
              </div>
            ))}

            <div className={styles.agregar}>
              {BLOQUES.map((x) => (
                <button key={x.type} type="button" className={`${ui.btn} ${ui.btnGhost}`} onClick={() => agregar(x.type)}>
                  + {x.label}
                </button>
              ))}
            </div>
          </section>

          {/* ---------- 4. Fuentes ---------- */}
          {d.opciones.fuentes && (
            <section className={styles.tarjeta}>
              <h2>4. Fuentes</h2>
              <p className={styles.ayuda}>Una por renglón. Puedes usar enlaces: [Muḥallā](https://…).</p>
              {d.sources.map((s, i) => (
                <div key={i} className={styles.itemLista}>
                  <input value={s} onChange={(e) => set("sources", d.sources.map((x, k) => (k === i ? e.target.value : x)))} placeholder="Ibn Ḥazm, al-Muḥallā, masʾala 170" />
                  <button type="button" className={styles.quitar} onClick={() => set("sources", d.sources.filter((_, k) => k !== i))} aria-label="Quitar fuente">
                    ✕
                  </button>
                </div>
              ))}
              <button type="button" className={styles.mas} onClick={() => set("sources", [...d.sources, ""])}>
                + Fuente
              </button>
            </section>
          )}
        </div>

        {/* ================= VISTA PREVIA Y RESULTADO ================= */}
        <aside className={styles.lado}>
          <section className={styles.tarjeta}>
            <h2>Vista previa</h2>
            <div className={styles.preview}>
              <p className={styles.ayuda}>
                Fatwa n.º {codigo || "—"} {tema && `· ${tema}`}
              </p>
              <h3>{fatwa.title || "Título"}</h3>
              {fatwa.question &&
                fatwa.question.split(/\n\s*\n/).map((p, i) => (
                  <p key={i} className={styles.previewResumen}>
                    <TextoRico texto={p} />
                  </p>
                ))}
              {!d.opciones.sinApertura && <p className={styles.ayuda}>Al-ḥamdu li-llāhi.</p>}
              {fatwa.answer.map((b, i) => {
                if (b.type === "h") return <h4 key={i}>{b.text}</h4>;
                if (b.type === "list")
                  return (
                    <ul key={i}>
                      {b.items.map((t, k) => (
                        <li key={k}>
                          <TextoRico texto={t} />
                        </li>
                      ))}
                    </ul>
                  );
                if (b.type === "quote")
                  return (
                    <blockquote key={i}>
                      <TextoRico texto={b.text} />
                    </blockquote>
                  );
                if (b.type === "arabic")
                  return (
                    <p key={i} dir="rtl" lang="ar" className="arabe">
                      {b.text}
                    </p>
                  );
                if (b.type === "link") return <p key={i}>→ {b.text}</p>;
                return (
                  <p key={i} className={b.type === "nota" ? styles.previewNota : undefined}>
                    <TextoRico texto={b.text} />
                  </p>
                );
              })}
              {!d.opciones.sinCierre && <p className={styles.ayuda}>Wa-llāhu aʿlamu.</p>}
            </div>
          </section>

          <section className={styles.tarjeta}>
            <h2>Resultado</h2>
            {faltan.length > 0 ? <p className={styles.falta}>Falta: {faltan.join("; ")}.</p> : <p className={styles.listo}>✓ Lista para guardar.</p>}
            <div className={styles.acciones}>
              <button
                type="button"
                className={`${ui.btn} ${ui.btnPrimary}`}
                disabled={faltan.length > 0}
                onClick={() => copiar(JSON.stringify(fatwa, null, 2), "JSON")}
              >
                Copiar JSON
              </button>
              <button
                type="button"
                className={`${ui.btn} ${ui.btnGhost}`}
                disabled={faltan.length > 0}
                onClick={() => descargar(JSON.stringify(fatwa, null, 2), `${archivo}.json`, "application/json")}
              >
                Descargar JSON
              </button>
            </div>
            <ol className={styles.pasos}>
              <li>Pulsa <strong>Copiar JSON</strong>.</li>
              <li>
                En MongoDB (Atlas → <em>Browse Collections</em>, o Compass) abre la base <code>islamic_website</code>, colección 
                <code>fataawa</code>.
              </li>
              <li>
                <strong>Insert Document</strong> → borra lo que trae el cuadro → pega → <strong>Insert</strong>.
              </li>
              <li>En menos de un minuto aparece en el sitio, sin volver a construirlo.</li>
            </ol>
            <p className={styles.aviso} role="status">
              {aviso}
            </p>
            <details>
              <summary>Ver el JSON</summary>
              <pre className={styles.codigo}>{JSON.stringify(fatwa, null, 2)}</pre>
            </details>
            <button type="button" className={styles.reiniciar} onClick={empezarDeNuevo}>
              Empezar una fatwa nueva
            </button>
          </section>
        </aside>
      </div>
    </>
  );
}

// Solo códigos y títulos de las fatāwá que ya existen en MongoDB
// (para avisar códigos repetidos y elegir relacionadas). Se renueva cada 30 s.
export async function getStaticProps() {
  let existentes = [];
  try {
    existentes = await codigosYTitulos();
  } catch (error) {
    console.error("[editor-fataawa] No se pudo leer MongoDB:", error.message);
  }
  return { props: { existentes }, revalidate: 30 };
}
