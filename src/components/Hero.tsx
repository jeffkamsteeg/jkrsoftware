import Link from "next/link";
import { HeroTypewriterHeadline } from "@/components/HeroTypewriterHeadline";

export default function Hero() {
  return (
    <section className="flex min-h-dvh min-h-screen items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 sm:py-16 max-md:pt-6">
      <div className="relative bottom-[100px] w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
          <HeroTypewriterHeadline />
        </h1>

        <p className="mt-5 text-base leading-relaxed text-gray-600 sm:mt-6 sm:text-lg">
          Usamos <span className="font-medium text-ink">inteligencia artificial</span>{" "}
          para acelerar el ciclo de vida del software: menos tiempo de
          desarrollo, menos fricción y entregas más predecibles. El resultado
          son productos con foco en{" "}
          <span className="font-medium text-ink">
            seguridad, fiabilidad, rendimiento
          </span>{" "}
          y la disponibilidad que tu negocio necesita, incluso fuera del horario
          habitual.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:mx-auto sm:w-auto sm:flex-row sm:justify-center sm:gap-4">
          <Link
            href="/contacto"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-black px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-gray-800 sm:min-h-12 sm:text-base"
          >
            Contáctame
          </Link>

          <Link
            href="/portafolio"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-gray-300 px-6 py-3 text-center text-sm font-medium text-ink transition hover:bg-gray-100 sm:min-h-12 sm:text-base"
          >
            Ver trabajos
          </Link>
        </div>
      </div>
    </section>
  );
}
