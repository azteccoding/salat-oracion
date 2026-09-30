import Link from "next/link";

// Convierte marcas sencillas dentro del texto de una noticia:
//   **texto**         → negritas
//   ==texto==         → texto resaltado (fondo dorado)
//   [texto](enlace)   → enlace (también dentro de **negritas** o ==resaltado==). Si empieza con "/" es una página del sitio;
//                       si empieza con "http" se abre en otra pestaña.
const PATRON = /(\*\*[^*]+\*\*|==[^=]+==|\[[^\]]+\]\([^)\s]+\))/g;

const TextoRico = ({ texto = "" }) =>
  texto.split(PATRON).map((trozo, i) => {
    if (trozo.startsWith("**") && trozo.endsWith("**")) return (
        <strong key={i}>
          <TextoRico texto={trozo.slice(2, -2)} />
        </strong>
      );
    if (trozo.startsWith("==") && trozo.endsWith("==")) return (
        <mark key={i}>
          <TextoRico texto={trozo.slice(2, -2)} />
        </mark>
      );
    const enlace = trozo.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (enlace) {
      const [, etiqueta, href] = enlace;
      return href.startsWith("/") ? (
        <Link key={i} href={href}>
          {etiqueta}
        </Link>
      ) : (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer">
          {etiqueta}
        </a>
      );
    }
    return trozo;
  });

export default TextoRico;
