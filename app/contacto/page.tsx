import type { Metadata } from "next";
import { EMAIL, PHONE_DISPLAY, PHONE_E164 } from "@/config/contact";

const MAILTO_HREF = `mailto:${EMAIL}`;

const cardClassName =
  "group flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-[0_1px_3px_rgb(15_23_42/0.06)] transition duration-200 hover:border-brand-primary/45 hover:shadow-[0_4px_20px_rgb(37_99_235/0.1)] sm:p-6";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Llamadas ${PHONE_DISPLAY} y correo ${EMAIL}.`,
};

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-gray-50/90 px-4 py-12 sm:px-6 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
          Contacto
        </h1>

        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6">
          <a href={`tel:${PHONE_E164}`} className={cardClassName}>
            <h2 className="text-lg font-semibold text-ink">Llamadas</h2>
            <p className="mt-2 flex-grow text-sm leading-relaxed text-gray-600">
              Llámame al{" "}
              <span className="font-medium text-ink">{PHONE_DISPLAY}</span>.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary transition group-hover:gap-2">
              Llamar ahora
              <span aria-hidden>→</span>
            </span>
          </a>

          <a href={MAILTO_HREF} className={cardClassName}>
            <h2 className="text-lg font-semibold text-ink">Correo</h2>
            <p className="mt-2 flex-grow text-sm leading-relaxed text-gray-600">
              Correo personal:{" "}
              <span className="font-medium text-ink break-all">{EMAIL}</span>.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary transition group-hover:gap-2">
              Enviar correo
              <span aria-hidden>→</span>
            </span>
          </a>
        </div>
      </div>
    </main>
  );
}
