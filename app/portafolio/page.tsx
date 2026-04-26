import type { Metadata } from "next";

const DRIVE_URL =
  "https://drive.google.com/drive/folders/1E9wTrjIQlGuwLJ-RWlCHuikJRarWWJw3";
const LINKEDIN_URL = "https://www.linkedin.com/in/jeffrykamsteeg/";
const CV_PATH = "/hoja-de-vida-jeffry-kamsteeg.pdf";
const CV_FILENAME = "Hoja de vida Jeffry Kamsteeg Rodiño.pdf";

const cardClassName =
  "group flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-[0_1px_3px_rgb(15_23_42/0.06)] transition duration-200 hover:border-brand-primary/45 hover:shadow-[0_4px_20px_rgb(37_99_235/0.1)] sm:p-6";

export const metadata: Metadata = {
  title: "Portafolio",
  description:
    "Hoja de vida, trabajos en Google Drive y perfil en LinkedIn.",
};

export default function PortafolioPage() {
  return (
    <main className="min-h-screen bg-gray-50/90 px-4 py-12 sm:px-6 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
          Portafolio
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <a
            href={CV_PATH}
            download={CV_FILENAME}
            className={cardClassName}
          >
            <h2 className="text-lg font-semibold text-ink">Hoja de vida (CV)</h2>
            <p className="mt-2 flex-grow text-sm leading-relaxed text-gray-600">
              Documento en PDF listo para descargar o compartir.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary transition group-hover:gap-2">
              Descargar PDF
              <span aria-hidden>↓</span>
            </span>
          </a>

          <a
            href={DRIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cardClassName}
          >
            <h2 className="text-lg font-semibold text-ink">
              Carpeta de Google Drive
            </h2>
            <p className="mt-2 flex-grow text-sm leading-relaxed text-gray-600">
              Documentos y proyectos organizados por categorías. Se abre en una
              nueva pestaña.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary transition group-hover:gap-2">
              Abrir Drive
              <span aria-hidden>→</span>
            </span>
          </a>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cardClassName}
          >
            <h2 className="text-lg font-semibold text-ink">LinkedIn</h2>
            <p className="mt-2 flex-grow text-sm leading-relaxed text-gray-600">
              Perfil profesional: experiencia, habilidades y trayectoria.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary transition group-hover:gap-2">
              Ver perfil
              <span aria-hidden>→</span>
            </span>
          </a>
        </div>
      </div>
    </main>
  );
}
