import Link from "next/link";
import { HeroBackgroundVideo } from "@/components/HeroBackgroundVideo";
import { HeroTypewriterHeadline } from "@/components/HeroTypewriterHeadline";

export default function Hero() {
  return (
    <section className="relative flex min-h-dvh min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-8 sm:px-6 sm:py-16 max-md:pt-6">
      <HeroBackgroundVideo />
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-slate-950/80 via-slate-950/65 to-slate-950/85"
        aria-hidden
      />
      <div className="relative z-10 bottom-[100px] w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm sm:text-4xl md:text-5xl">
          <HeroTypewriterHeadline onDarkBackground />
        </h1>

        <p className="mt-5 text-base leading-relaxed text-white/85 sm:mt-6 sm:text-lg">
          Desarrollamos software y páginas web rápidas, seguras y optimizadas
          para generar más clientes.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:mx-auto sm:w-auto sm:flex-row sm:justify-center sm:gap-4">
          <Link
            href="/#contacto"
            className="inline-flex min-h-9 items-center justify-center rounded-lg bg-white px-4 py-2 text-center text-xs font-medium text-slate-900 transition hover:bg-white/90 sm:min-h-10 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Impulsa tu negocio ahora
          </Link>

          <Link
            href="/#portafolio"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/35 bg-white/5 px-6 py-3 text-center text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/15 sm:min-h-12 sm:text-base"
          >
            Ver trabajos
          </Link>
        </div>
      </div>
    </section>
  );
}
