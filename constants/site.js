import { ASSOCIATION_NAME } from "./names";

export const SITE_NAME = ASSOCIATION_NAME;
export const SITE_SHORT_NAME = "Islam Guanajuato";
export const SITE_DESCRIPTION =
  "Estudiantes de Guanajuato y Aguascalientes reunidos para aprender y difundir el islam de forma pacífica, tolerante y académica.";

// Dominio público del sitio, sin "/" al final (p. ej. "https://islamguanajuato.mx").
// Se usa para las URL absolutas de Open Graph (vista previa al compartir en redes).
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

export const SITE_LOCATION = "León, Guanajuato, México";

export const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/salat", label: "Aprende a rezar" },
  { href: "/fataawa-zahiri-fiqh", label: "Fatāwá" },
  {
    href: "/nuestra-tariqa",
    label: "Nuestra Tarīqa",
    children: [
      { href: "/nuestra-tariqa", label: "Nuestra Tarīqa", text: "Silsila, valores y práctica" },
      { href: "/nuestro-maulana", label: "Nuestro Maulana", text: "Maulana ʿIyad ibn Yusuf" },
      { href: "/nuestro-sheij", label: "Nuestro Sheij", text: "Mullah Khalid" },
      { href: "/nuestra-recitacion", label: "Nuestra recitación", text: "Qirāʾat Khalaf ʿan Hamza" },
    ],
  },
  { href: "/descargas", label: "Descargas" },
  { href: "/#horarios", label: "Horarios" },
];
