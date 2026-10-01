import axios from "axios";
import { FATAAWA_API_URI, NOTICIAS_API_URI } from "@/constants/api";

// =====================================================================
//  Peticiones del navegador al servicio interno (pages/api), que a su vez
//  consulta MongoDB. Igual que en el diccionario: cada función devuelve
//  { hasExternalError, data, errorMessage } y nunca lanza errores.
// =====================================================================

const pedir = async (url, params) => {
  try {
    return {
      hasExternalError: false,
      data: await axios.get(url, { params }),
    };
  } catch (error) {
    return {
      hasExternalError: true,
      data: error,
      errorMessage: error.message,
    };
  }
};

// Busca fatāwá por texto (también dentro de las respuestas) y tema
export const findFataawa = (q, tema = "", skip = 0) => pedir(FATAAWA_API_URI, { q, tema, skip });

// Una fatwa completa por su código
export const getFatwa = (codigo) => pedir(`${FATAAWA_API_URI}/${encodeURIComponent(codigo)}`);

// Busca noticias por texto (también dentro del cuerpo) y tema
export const findNoticias = (q, tema = "", skip = 0) => pedir(NOTICIAS_API_URI, { q, tema, skip });

// Una noticia completa por su slug
export const getNoticia = (slug) => pedir(`${NOTICIAS_API_URI}/${encodeURIComponent(slug)}`);
