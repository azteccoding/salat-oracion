import { useEffect, useMemo, useRef, useState } from "react";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import TextoRico from "@/components/noticias/TextoRico";
import { NOTICIA_TEMAS } from "@/constants/noticias";
import styles from "@/styles/site/Editor.module.css";
import ui from "@/styles/site/ui.module.css";

// =====================================================================
//  EDITOR DE NOTICIAS  (/editor-noticias)
//  Página de trabajo: no aparece en el menú ni en Google. Arma una noticia
//  con formularios y entrega el JSON listo para pegar en MongoDB
//  (base islamic_website, colección "noticias").
// =====================================================================

const hoy = () => new Date().toLocaleDateString("en-CA"); // AAAA-MM-DD en la hora local

const aSlug = (t = "") =>
  t
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[ʿʾ'’"]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);

const aArchivo = (t = "") => {
  const n = aSlug(t).replace(/-/g, "_") || "noticia";
  return /^[0-9]/.test(n) ? `n_${n}` : n;
};

// "C:\...\foto 1.JPG" o "public/img/noticias/foto.jpg" → "/img/noticias/foto.jpg"
const rutaImagen = (v = "") => {
  const s = v.trim().replace(/\\/g, "/");
  if (!s) return "";
  if (s.includes("/img/")) return s.slice(s.indexOf("/img/"));
  const nombre = s.split("/").pop();
  return `/img/noticias/${nombre}`;
};

let contador = 0;
const nuevoId = () => `b${Date.now()}${contador++}`;

const BLOQUES = [
  { type: "p", label: "Párrafo" },
  { type: "h", label: "Subtítulo" },
  { type: "list", label: "Lista" },
  { type: "quote", label: "Cita" },
  { type: "imagen", label: "Imagen en el texto" },
  { type: "nota", label: "Recuadro" },
];

const bloqueVacio = (type) => {
  const base = { id: nuevoId(), type };
  if (type === "list") return { ...base, items: [""] };
  if (type === "quote") return { ...base, text: "", source: "" };
  if (type === "imagen") return { ...base, src: "", alt: "", pie: "" };
  if (type === "nota") return { ...base, title: "", text: "" };
  return { ...base, text: "" };
};

const INICIAL = {
  title: "",
  slug: "",
  slugManual: false,
  archivo: "",
  archivoManual: false,
  date: "",
  tema: "mundo",
  resumen: "",
  opciones: { imagen: false, fuentes: false, noIndexar: false, borrador: false },
  imagen: { src: "", alt: "" },
  fuentes: [{ nombre: "", url: "", nota: "" }],
  cuerpo: [],
};

const GUARDADO = "editor-noticias-borrador";

// ---------------------------------------------------------------------
//  Campo de texto con botones: Negritas · Resaltar · Enlace
// ---------------------------------------------------------------------
const CampoTexto = ({ value, onChange, rows = 4, placeholder }) => {
  const ref = useRef(null);
  const [url, setUrl] = useState("");

  const envolver = (antes, despues) => {
    const el = ref.current;
    if (!el) return;
    const { selectionStart: a, selectionEnd: b } = el;
    const sel = value.slice(a, b) || "texto";
    const nuevo = value.slice(0, a) + antes + sel + despues + value.slice(b);
    onChange(nuevo);
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

// ---------------------------------------------------------------------
//  Página
// ---------------------------------------------------------------------
export default function EditorNoticias() {
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

  const setTitulo = (t) =>
    setD((x) => ({
      ...x,
      title: t,
      slug: x.slugManual ? x.slug : aSlug(t),
      archivo: x.archivoManual ? x.archivo : aArchivo(t),
    }));

  // Bloques del cuerpo
  const agregar = (type) => setD((x) => ({ ...x, cuerpo: [...x.cuerpo, bloqueVacio(type)] }));
  const cambiarBloque = (id, cambios) =>
    setD((x) => ({ ...x, cuerpo: x.cuerpo.map((b) => (b.id === id ? { ...b, ...cambios } : b)) }));
  const quitarBloque = (id) => setD((x) => ({ ...x, cuerpo: x.cuerpo.filter((b) => b.id !== id) }));
  const moverBloque = (id, paso) =>
    setD((x) => {
      const i = x.cuerpo.findIndex((b) => b.id === id);
      const j = i + paso;
      if (j < 0 || j >= x.cuerpo.length) return x;
      const c = [...x.cuerpo];
      [c[i], c[j]] = [c[j], c[i]];
      return { ...x, cuerpo: c };
    });

  // Fuentes
  const setFuente = (i, cambios) => set("fuentes", d.fuentes.map((f, k) => (k === i ? { ...f, ...cambios } : f)));

  // ----- La noticia final, lista para el sitio -----
  const noticia = useMemo(() => {
    const n = {
      slug: d.slug || aSlug(d.title),
      title: d.title.trim(),
      date: d.date,
      tema: d.tema,
    };
    if (d.opciones.imagen && d.imagen.src.trim())
      n.imagen = { src: rutaImagen(d.imagen.src), alt: d.imagen.alt.trim() };
    n.resumen = d.resumen.trim();
    n.cuerpo = d.cuerpo
      .map((b) => {
        if (b.type === "list") return { type: "list", items: b.items.map((t) => t.trim()).filter(Boolean) };
        if (b.type === "quote") return { type: "quote", text: b.text.trim(), ...(b.source.trim() && { source: b.source.trim() }) };
        if (b.type === "imagen")
          return { type: "imagen", src: rutaImagen(b.src), alt: b.alt.trim(), ...(b.pie.trim() && { pie: b.pie.trim() }) };
        if (b.type === "nota") return { type: "nota", ...(b.title.trim() && { title: b.title.trim() }), text: b.text.trim() };
        return { type: b.type, text: b.text.trim() };
      })
      .filter((b) => (b.type === "list" ? b.items.length : b.type === "imagen" ? b.src : b.text));
    if (d.opciones.fuentes) {
      const f = d.fuentes
        .filter((x) => x.url.trim())
        .map((x) => ({ nombre: x.nombre.trim() || x.url.trim(), url: x.url.trim(), ...(x.nota.trim() && { nota: x.nota.trim() }) }));
      if (f.length) n.fuentes = f;
    }
    if (d.opciones.noIndexar) n.indexar = false;
    if (d.opciones.borrador) n.borrador = true;
    return n;
  }, [d]);

  const archivo = d.archivo || aArchivo(d.title);

  const faltan = [
    !noticia.title && "el titular",
    !noticia.date && "la fecha",
    !noticia.resumen && "el resumen",
    !noticia.cuerpo.length && "al menos un párrafo",
    d.opciones.imagen && !d.imagen.src.trim() && "el archivo de la imagen principal",
    !/^[a-z_][a-z0-9_]*$/.test(archivo) && "un nombre de archivo válido (minúsculas, números y _)",
  ].filter(Boolean);

  // Consejos que no impiden descargar
  const nombresImagen = [noticia.imagen?.src, ...noticia.cuerpo.filter((b) => b.type === "imagen").map((b) => b.src)].filter(Boolean);
  const consejos = nombresImagen
    .filter((src) => /[\sA-ZÁÉÍÓÚÑáéíóúñ]/.test(src.split("/").pop()))
    .map((src) => `Mejor renombra «${src.split("/").pop()}» en minúsculas, sin espacios ni acentos (p. ej. iftar-2026.jpg).`);

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
    if (typeof window !== "undefined" && !window.confirm("¿Borrar todo y empezar una noticia nueva?")) return;
    setD({ ...INICIAL, date: hoy() });
  };

  return (
    <>
      <Seo title="Editor de noticias" description="Herramienta interna para escribir noticias." noIndex />

      <PageHero title="Editor de noticias" eyebrow="Herramienta interna" crumbs={[{ label: "Editor de noticias" }]}>
        <p>
          Llena los campos, activa lo que necesites en el menú y copia el JSON para pegarlo en MongoDB. Tu trabajo se guarda solo en este
          navegador mientras escribes.
        </p>
      </PageHero>

      <div className={`contenedor ${styles.layout}`}>
        {/* ================= FORMULARIO ================= */}
        <div className={styles.form}>
          <section className={styles.tarjeta}>
            <h2>1. Datos principales</h2>
            <label>
              Titular
              <input value={d.title} onChange={(e) => setTitulo(e.target.value)} placeholder="Yemen golpea Yanbu…" />
            </label>
            <div className={styles.fila}>
              <label>
                Fecha
                <input type="date" value={d.date} onChange={(e) => set("date", e.target.value)} />
              </label>
              <label>
                Tema
                <select value={d.tema} onChange={(e) => set("tema", e.target.value)}>
                  {NOTICIA_TEMAS.map((t) => (
                    <option key={t.slug} value={t.slug}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              Resumen (se ve en el inicio y en la lista)
              <CampoTexto value={d.resumen} onChange={(v) => set("resumen", v)} rows={3} placeholder="Una o dos líneas…" />
            </label>
            <details className={styles.avanzado}>
              <summary>Dirección web y nombre del archivo</summary>
              <label>
                Dirección: /noticias/…
                <input
                  value={d.slug}
                  onChange={(e) => setD((x) => ({ ...x, slug: aSlug(e.target.value), slugManual: true }))}
                />
              </label>
              <label>
                Nombre del archivo (sin .js)
                <input
                  value={d.archivo}
                  onChange={(e) =>
                    setD((x) => ({ ...x, archivo: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "_"), archivoManual: true }))
                  }
                  placeholder="houthi_attacks_saudi"
                />
              </label>
            </details>
          </section>

          <section className={styles.tarjeta}>
            <h2>2. ¿Qué lleva esta noticia?</h2>
            <div className={styles.checks}>
              {[
                ["imagen", "Imagen principal"],
                ["fuentes", "Fuentes al final"],
                ["noIndexar", "Ocultar de Google y de la lista"],
                ["borrador", "Borrador (no se publica)"],
              ].map(([k, label]) => (
                <label key={k} className={styles.check}>
                  <input type="checkbox" checked={d.opciones[k]} onChange={(e) => setOpcion(k, e.target.checked)} />
                  {label}
                </label>
              ))}
            </div>

            {d.opciones.imagen && (
              <div className={styles.sub}>
                <h3>Imagen principal</h3>
                <p className={styles.ayuda}>
                  Copia la foto a <code>public/img/noticias/</code> y escribe aquí solo su nombre, por ejemplo{" "}
                  <code>yemen_attack_oil.jpg</code>. Se guardará como <code>{rutaImagen(d.imagen.src || "foto.jpg")}</code>.
                </p>
                <div className={styles.fila}>
                  <label>
                    Archivo
                    <input
                      value={d.imagen.src}
                      onChange={(e) => set("imagen", { ...d.imagen, src: e.target.value })}
                      placeholder="foto.jpg"
                    />
                  </label>
                  <label>
                    Qué se ve en la foto
                    <input
                      value={d.imagen.alt}
                      onChange={(e) => set("imagen", { ...d.imagen, alt: e.target.value })}
                      placeholder="Humo sobre la refinería de Yanbu"
                    />
                  </label>
                </div>
              </div>
            )}
          </section>

          <section className={styles.tarjeta}>
            <h2>3. Texto de la noticia</h2>
            <p className={styles.ayuda}>
              Agrega bloques en el orden en que se leerán. En los textos, selecciona palabras y usa los botones de{" "}
              <strong>negritas</strong>, <mark>resaltar</mark> o enlace.
            </p>

            {d.cuerpo.map((b, i) => (
              <div key={b.id} className={styles.bloque}>
                <div className={styles.bloqueCabeza}>
                  <strong>
                    {i + 1}. {BLOQUES.find((x) => x.type === b.type)?.label}
                  </strong>
                  <span>
                    <button type="button" onClick={() => moverBloque(b.id, -1)} aria-label="Subir">
                      ↑
                    </button>
                    <button type="button" onClick={() => moverBloque(b.id, 1)} aria-label="Bajar">
                      ↓
                    </button>
                    <button type="button" onClick={() => quitarBloque(b.id)} aria-label="Quitar" className={styles.quitar}>
                      ✕
                    </button>
                  </span>
                </div>

                {b.type === "p" && <CampoTexto value={b.text} onChange={(v) => cambiarBloque(b.id, { text: v })} />}

                {b.type === "h" && (
                  <input value={b.text} onChange={(e) => cambiarBloque(b.id, { text: e.target.value })} placeholder="Subtítulo" />
                )}

                {b.type === "list" && (
                  <>
                    {b.items.map((it, k) => (
                      <div key={k} className={styles.itemLista}>
                        <CampoTexto
                          rows={2}
                          value={it}
                          onChange={(v) => cambiarBloque(b.id, { items: b.items.map((x, j) => (j === k ? v : x)) })}
                        />
                        <button
                          type="button"
                          className={styles.quitar}
                          onClick={() => cambiarBloque(b.id, { items: b.items.filter((_, j) => j !== k) })}
                          aria-label="Quitar punto"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button type="button" className={styles.mas} onClick={() => cambiarBloque(b.id, { items: [...b.items, ""] })}>
                      + Punto
                    </button>
                  </>
                )}

                {b.type === "quote" && (
                  <>
                    <CampoTexto value={b.text} onChange={(v) => cambiarBloque(b.id, { text: v })} rows={3} placeholder="La cita" />
                    <input
                      value={b.source}
                      onChange={(e) => cambiarBloque(b.id, { source: e.target.value })}
                      placeholder="Quién lo dijo (opcional)"
                    />
                  </>
                )}

                {b.type === "imagen" && (
                  <>
                    <p className={styles.ayuda}>
                      Archivo en <code>public/img/noticias/</code>: escribe solo su nombre.
                    </p>
                    <div className={styles.fila}>
                      <input value={b.src} onChange={(e) => cambiarBloque(b.id, { src: e.target.value })} placeholder="foto2.jpg" />
                      <input value={b.alt} onChange={(e) => cambiarBloque(b.id, { alt: e.target.value })} placeholder="Qué se ve" />
                    </div>
                    <CampoTexto value={b.pie} onChange={(v) => cambiarBloque(b.id, { pie: v })} rows={2} placeholder="Pie de foto (opcional)" />
                  </>
                )}

                {b.type === "nota" && (
                  <>
                    <input value={b.title} onChange={(e) => cambiarBloque(b.id, { title: e.target.value })} placeholder="Título del recuadro (opcional)" />
                    <CampoTexto value={b.text} onChange={(v) => cambiarBloque(b.id, { text: v })} rows={3} />
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

          {d.opciones.fuentes && (
            <section className={styles.tarjeta}>
              <h2>4. Fuentes</h2>
              {d.fuentes.map((f, i) => (
                <div key={i} className={styles.fuente}>
                  <input value={f.nombre} onChange={(e) => setFuente(i, { nombre: e.target.value })} placeholder="Medio — título de la nota" />
                  <input value={f.url} onChange={(e) => setFuente(i, { url: e.target.value })} placeholder="https://…" />
                  <input value={f.nota} onChange={(e) => setFuente(i, { nota: e.target.value })} placeholder="Nota corta (opcional)" />
                  <button
                    type="button"
                    className={styles.quitar}
                    onClick={() => set("fuentes", d.fuentes.filter((_, k) => k !== i))}
                    aria-label="Quitar fuente"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button type="button" className={styles.mas} onClick={() => set("fuentes", [...d.fuentes, { nombre: "", url: "", nota: "" }])}>
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
              <h3>{noticia.title || "Titular"}</h3>
              {noticia.resumen && (
                <p className={styles.previewResumen}>
                  <TextoRico texto={noticia.resumen} />
                </p>
              )}
              {noticia.imagen && <p className={styles.ayuda}>🖼 {noticia.imagen.src}</p>}
              {noticia.cuerpo.map((b, i) => {
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
                if (b.type === "imagen") return <p key={i} className={styles.ayuda}>🖼 {b.src}</p>;
                if (b.type === "quote")
                  return (
                    <blockquote key={i}>
                      <TextoRico texto={b.text} />
                    </blockquote>
                  );
                return (
                  <p key={i} className={b.type === "nota" ? styles.previewNota : undefined}>
                    <TextoRico texto={b.text} />
                  </p>
                );
              })}
            </div>
          </section>

          <section className={styles.tarjeta}>
            <h2>Resultado</h2>
            {faltan.length > 0 ? (
              <p className={styles.falta}>Falta: {faltan.join(", ")}.</p>
            ) : (
              <p className={styles.listo}>✓ Lista para guardar.</p>
            )}
            {consejos.map((c) => (
              <p key={c} className={styles.consejo}>
                ⚠ {c}
              </p>
            ))}
            <div className={styles.acciones}>
              <button
                type="button"
                className={`${ui.btn} ${ui.btnPrimary}`}
                disabled={faltan.length > 0}
                onClick={() => copiar(JSON.stringify(noticia, null, 2), "JSON")}
              >
                Copiar JSON
              </button>
              <button
                type="button"
                className={`${ui.btn} ${ui.btnGhost}`}
                disabled={faltan.length > 0}
                onClick={() => descargar(JSON.stringify(noticia, null, 2), `${archivo}.json`, "application/json")}
              >
                Descargar JSON
              </button>
            </div>
            <ol className={styles.pasos}>
              <li>Pulsa <strong>Copiar JSON</strong>.</li>
              <li>
                En MongoDB (Atlas → <em>Browse Collections</em>, o Compass) abre la base <code>islamic_website</code>, colección 
                <code>noticias</code>.
              </li>
              <li>
                <strong>Insert Document</strong> → borra lo que trae el cuadro → pega → <strong>Insert</strong>.
              </li>
              {nombresImagen.length > 0 && (
                <li>
                  Copia las fotos a la carpeta del proyecto: {nombresImagen.map((src) => (
                    <code key={src}>public{src} </code>
                  ))}
                  (las fotos no van en MongoDB).
                </li>
              )}
              <li>En menos de un minuto aparece en el sitio, sin volver a construirlo.</li>
            </ol>
            <p className={styles.aviso} role="status">
              {aviso}
            </p>
            <details>
              <summary>Ver el JSON</summary>
              <pre className={styles.codigo}>{JSON.stringify(noticia, null, 2)}</pre>
            </details>
            <button type="button" className={styles.reiniciar} onClick={empezarDeNuevo}>
              Empezar una noticia nueva
            </button>
          </section>
        </aside>
      </div>
    </>
  );
}
