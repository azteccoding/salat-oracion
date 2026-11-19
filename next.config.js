/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Nombres anteriores de descargas (antes «según Ibn Hazm»): conservan los enlaces ya compartidos.
  async redirects() {
    return [
      { source: "/descargas/La_oracion_segun_Ibn_Hazm", destination: "/descargas/La_oracion_de_acuerdo_al_Coran_y_la_Sunna", permanent: true },
      { source: "/descargas/El_witr_segun_Ibn_Hazm", destination: "/descargas/El_witr_de_acuerdo_al_Coran_y_la_Sunna", permanent: true },
      { source: "/descargas/El_masbuq_segun_Ibn_Hazm", destination: "/descargas/El_masbuq_de_acuerdo_al_Coran_y_la_Sunna", permanent: true },
      { source: "/descargas/La_musica_es_licita_segun_Ibn_Hazm", destination: "/descargas/La_musica_es_licita_de_acuerdo_al_Coran_y_la_Sunna", permanent: true },
      { source: "/pdf/La_oracion_segun_Ibn_Hazm.pdf", destination: "/pdf/La_oracion_de_acuerdo_al_Coran_y_la_Sunna.pdf", permanent: true },
      { source: "/pdf/El_witr_segun_Ibn_Hazm.pdf", destination: "/pdf/El_witr_de_acuerdo_al_Coran_y_la_Sunna.pdf", permanent: true },
      { source: "/pdf/El_masbuq_segun_Ibn_Hazm.pdf", destination: "/pdf/El_masbuq_de_acuerdo_al_Coran_y_la_Sunna.pdf", permanent: true },
      { source: "/pdf/La_musica_es_licita_Ibn_Hazm_cuestion_1566_firma.pdf", destination: "/pdf/La_musica_es_licita_de_acuerdo_al_Coran_y_la_Sunna.pdf", permanent: true },
    ];
  },
}

module.exports = nextConfig
