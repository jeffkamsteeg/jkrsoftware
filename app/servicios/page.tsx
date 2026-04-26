import type { Metadata } from "next";

const cardClassName =
  "flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-[0_1px_3px_rgb(15_23_42/0.06)] transition duration-200 hover:border-brand-primary/45 hover:shadow-[0_4px_20px_rgb(37_99_235/0.1)] sm:p-6";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Páginas web, aplicaciones web y publicidad con Google.",
};

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-gray-50/90 px-4 py-12 sm:px-6 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
          Servicios
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <div className={cardClassName}>
            <h2 className="text-lg font-semibold text-ink">Páginas web</h2>
            <p className="mt-2 flex-grow text-sm leading-relaxed text-gray-600">
              Sitios que se ven bien en cualquier dispositivo para tener marca
              empresarial.
            </p>
          </div>

          <div className={cardClassName}>
            <h2 className="text-lg font-semibold text-ink">Aplicaciones web</h2>
            <p className="mt-2 flex-grow text-sm leading-relaxed text-gray-600">
              Para gestionar de forma segura la información de su empresa.
            </p>
          </div>

          <div className={cardClassName}>
            <h2 className="text-lg font-semibold text-ink">
              Publicidad con Google
            </h2>
            <p className="mt-2 flex-grow text-sm leading-relaxed text-gray-600">
              Aparición en las búsquedas de Google para captar clientes.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
