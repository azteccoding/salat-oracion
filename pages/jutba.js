import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import {
  SHEIJ_JUTBA,
  enlaceDrive,
  esViernes,
  fechaLarga,
  reproductorDrive,
  viernesProximo,
} from "@/constants/jutbas";
import { listarJutbas } from "@/lib/jutbas-db";
// Nota: lib/jutbas-db (MongoDB) solo se usa en getStaticProps (servidor).
import styles from "@/styles/site/Jutba.module.css";
import ui from "@/styles/site/ui.module.css";

// =====================================================================
//  /jutba — la juṭba del viernes
//  Solo se escucha los viernes (hora de México). Otro día muestra «vuelve el viernes».
//  En tu computadora puedes verla cualquier día con /jutba?probar=1
// =====================================================================

// Reproductor de Google Drive (se carga solo al pulsar, para no traer diez reproductores a la vez)
const Reproductor = ({ jutba, abierto: abiertoInicial = false }) => {
  const [abierto, setAbierto] = useState(abiertoInicial);
  if (!abierto) {
    return (
      <button
        type="button"
        className={`${ui.btn} ${ui.btnGhost}`}
        onClick={() => setAbierto(true)}
      >
        <Icon name="play" size={18} /> Escuchar
      </button>
    );
  }
  return (
    <div className={styles.reproductor}>
      <iframe
        src={reproductorDrive(jutba.driveId)}
        title={`Audio: ${jutba.titulo}`}
        allow="autoplay"
        loading="lazy"
      />
      <a
        href={enlaceDrive(jutba.driveId)}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.abrirDrive}
      >
        ¿No se oye? Ábrela en Google Drive <Icon name="external" size={14} />
      </a>
    </div>
  );
};

const Datos = ({ jutba }) => (
  <p className={styles.datos}>
    {jutba.fecha && (
      <span>
        <Icon name="calendar" size={15} /> {fechaLarga(jutba.fecha)}
      </span>
    )}
    {jutba.sheij && (
      <span>
        <Icon name="mihrab" size={15} /> {jutba.sheij}
        {jutba.lugar ? ` · ${jutba.lugar}` : ""}
      </span>
    )}
    {jutba.borrador && <span className={styles.borrador}>Borrador</span>}
  </p>
);

export default function JutbaPage({ jutbas }) {
  const { query } = useRouter();
  const probar = process.env.NODE_ENV === "development" && query.probar === "1";
  // null mientras el navegador revisa qué día es (así no parpadea)
  const [viernes, setViernes] = useState(null);

  useEffect(() => {
    setViernes(probar || esViernes());
  }, [probar]);

  const [ultima, ...anteriores] = jutbas;

  return (
    <>
      <Seo
        title="Juṭba del viernes"
        description={`Escucha la juṭba del viernes del ${SHEIJ_JUTBA.nombre} desde ${SHEIJ_JUTBA.lugar}.`}
        image={SHEIJ_JUTBA.foto}
        imageAlt={SHEIJ_JUTBA.alt}
        noIndex
      />

      <PageHero
        title="Juṭba del viernes"
        arabic="خُطْبَةُ الْجُمُعَةِ"
        eyebrow="Juṭbatu l-ŷumuʿati"
        crumbs={[{ label: "Juṭba del viernes" }]}
      >
        <p>
          Cada viernes, la juṭba del {SHEIJ_JUTBA.nombre} desde{" "}
          {SHEIJ_JUTBA.lugar}, para escucharla donde estés.
        </p>
      </PageHero>

      <div className={`contenedor ${styles.layout}`}>
        <div>
          {viernes === null && <div className={styles.cargando} aria-hidden />}

          {viernes === false && (
            <section className={`${ui.card} ${ui.cardPad} ${styles.vuelve}`}>
              <Icon name="headphones" size={40} />
              <h2>Vuelve el viernes</h2>
              <p>
                La juṭba se escucha solo los viernes. La próxima es el{" "}
                <strong>{fechaLarga(viernesProximo())}</strong>, in šāʾa llāhu.
              </p>
              <Link href="/" className={`${ui.btn} ${ui.btnPrimary}`}>
                <Icon name="arrowLeft" size={18} /> Volver al inicio
              </Link>
              {process.env.NODE_ENV === "development" && (
                <p className={styles.soloDev}>
                  Solo en tu computadora:{" "}
                  <Link href="/jutba?probar=1">
                    verla como si fuera viernes
                  </Link>
                  .
                </p>
              )}
            </section>
          )}

          {viernes === true && !ultima && (
            <section className={`${ui.card} ${ui.cardPad} ${styles.vuelve}`}>
              <Icon name="headphones" size={40} />
              <h2>La juṭba de hoy aún no está lista</h2>
              <p>Vuelve más tarde, in šāʾa llāh.</p>
            </section>
          )}

          {viernes === true && ultima && (
            <>
              <article
                className={`${ui.card} ${ui.cardPad} ${styles.destacada}`}
                id={ultima.slug || undefined}
              >
                <p className={styles.kicker}>La más reciente</p>
                <h2>{ultima.titulo}</h2>
                <Datos jutba={ultima} />
                {ultima.resumen && (
                  <p className={styles.resumen}>{ultima.resumen}</p>
                )}
                <Reproductor jutba={ultima} abierto />
              </article>

              {anteriores.length > 0 && (
                <section className={styles.anteriores}>
                  <h2 className={ui.sectionTitle}>Juṭbas anteriores</h2>
                  {anteriores.map((j) => (
                    <article
                      key={j.driveId}
                      className={`${ui.card} ${ui.cardPad} ${styles.item}`}
                      id={j.slug || undefined}
                    >
                      <h3>{j.titulo}</h3>
                      <Datos jutba={j} />
                      {j.resumen && (
                        <p className={styles.resumen}>{j.resumen}</p>
                      )}
                      <Reproductor jutba={j} />
                    </article>
                  ))}
                </section>
              )}
            </>
          )}
        </div>

        <aside className={styles.aside}>
          <figure className={`${ui.card} ${styles.sheij}`}>
            <div className={styles.sheijFoto}>
              <Image
                src={SHEIJ_JUTBA.foto}
                alt={SHEIJ_JUTBA.alt}
                fill
                sizes="(max-width: 900px) 100vw, 320px"
              />
            </div>
            <figcaption>
              <strong>{SHEIJ_JUTBA.nombre}</strong>
              <span>
                <Icon name="pin" size={15} /> {SHEIJ_JUTBA.lugar}
              </span>
            </figcaption>
          </figure>
        </aside>
      </div>
    </>
  );
}

// Se renueva cada 120 s: una juṭba nueva en MongoDB aparece sola, sin volver a construir el sitio
export async function getStaticProps() {
  let jutbas = [];
  try {
    jutbas = await listarJutbas();
  } catch (error) {
    console.error("[jutba] No se pudo leer MongoDB:", error.message);
  }
  return { props: { jutbas }, revalidate: 120 };
}
