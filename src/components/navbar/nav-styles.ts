/**
 * Clases del shell del header (una sola cadena = menos ruido en el JSX).
 */
export const headerClassName =
  "sticky top-0 z-50 w-full overflow-visible border-b border-line/80 bg-white/90 pt-2.5 sm:pt-3 md:pt-3.5 backdrop-blur-md supports-[backdrop-filter]:bg-white/75 shadow-[0_1px_2px_rgb(15_23_42/0.04),0_4px_20px_rgb(37_99_235/0.08)]";

export const navInnerClassName =
  "relative mx-auto w-full max-w-7xl overflow-visible px-4 sm:px-6";

export const barRowClassName =
  "flex h-14 w-full items-center justify-between gap-2 sm:gap-4";

export const logoLinkClassName =
  "relative z-20 flex min-w-0 max-w-[72%] shrink items-center outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:max-w-none";

export const logoImageClassName =
  "h-28 max-w-[min(100%,calc(100vw-3.75rem))] w-auto object-contain object-left drop-shadow-[0_2px_8px_rgb(37_99_235/0.12)] sm:max-w-none sm:h-[8.75rem] md:h-[10rem] lg:h-[11.5rem] xl:h-[12.5rem] 2xl:h-[13.5rem]";

export const desktopListClassName =
  "hidden min-w-0 items-center justify-end gap-1.5 md:flex md:gap-4 lg:gap-6";

const navLinkBase =
  "relative inline-flex w-full items-center justify-center rounded-lg px-3 py-2.5 text-sm font-medium outline-none transition-[color,transform] duration-200 ease-out focus-visible:ring-2 focus-visible:ring-brand-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-[0.98] md:inline-flex md:w-auto md:justify-center md:px-2 md:py-1.5 after:pointer-events-none after:absolute after:inset-x-1.5 after:bottom-0.5 after:h-px after:origin-left after:bg-brand-primary after:transition-transform after:duration-300 after:ease-out";

const navLinkActive =
  "text-brand-primary after:scale-x-100";

const navLinkInactive =
  "text-ink hover:text-brand-primary after:scale-x-0 hover:after:scale-x-100";

export function navLinkClassName(active: boolean) {
  return `${navLinkBase} ${active ? navLinkActive : navLinkInactive}`;
}

export const menuButtonClassName =
  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-ink outline-none transition-colors hover:bg-black/[0.04] hover:text-brand-primary focus-visible:ring-2 focus-visible:ring-brand-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white md:hidden";

export function mobilePanelClassName(open: boolean) {
  if (!open) return "hidden md:hidden";
  return "border-t border-line/80 bg-white/95 py-2 shadow-[inset_0_1px_0_rgb(255_255_255/0.6)] backdrop-blur-md supports-[backdrop-filter]:bg-white/85 md:hidden";
}
