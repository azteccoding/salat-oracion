import Image from "next/image";
import styles from "@/styles/site/Comunidad.module.css";

// Texto largo dividido en secciones { titulo?, parrafos, foto? }.
const Secciones = ({ secciones }) => (
  <div className={styles.texto}>
    {secciones.map((s, i) => (
      <section key={s.titulo || i}>
        {s.titulo && <h2>{s.titulo}</h2>}
        {s.parrafos.map((p, j) => (
          <p key={j}>{p}</p>
        ))}
        {s.foto && (
          <figure className={styles.figura}>
            <Image
              src={s.foto.src}
              alt={s.foto.alt}
              width={s.foto.ancho}
              height={s.foto.alto}
              sizes="(max-width: 1000px) 100vw, 620px"
            />
            {s.foto.pie && <figcaption>{s.foto.pie}</figcaption>}
          </figure>
        )}
      </section>
    ))}
  </div>
);

export default Secciones;
