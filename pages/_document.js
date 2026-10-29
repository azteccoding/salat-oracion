import { Html, Head, Main, NextScript } from "next/document";
import { aplicarTema } from "@/lib/tema-rezo";

// Pone el tema (claro u oscuro según el fajr y el ʿišāʾ) antes de pintar la página,
// para que no parpadee. Ver lib/tema-rezo.js y components/TemaSegunRezo.jsx.
const scriptTema = `try{(${aplicarTema.toString()})()}catch(e){}`;

export default function Document() {
  return (
    <Html lang="es-MX" data-scroll-behavior="smooth">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0f2350" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
