"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { WHATSAPP_URL } from "@/config/contact";

const SHOW_AFTER_MS = 5000;
const PULSE_MS = 2200;
const PULSE_STAGGER_MS = 1100;
const PULSE_MAX_SCALE = 2.6;
const PULSE_OPACITY_PEAK = 0.88;

function easeOutPow(t: number): number {
  return 1 - (1 - t) ** 2.5;
}

function pulseAt(elapsedMs: number, offsetMs: number) {
  const t = (((elapsedMs - offsetMs) % PULSE_MS) + PULSE_MS) % PULSE_MS;
  const u = t / PULSE_MS;
  const e = easeOutPow(u);
  const scale = 1 + (PULSE_MAX_SCALE - 1) * e;
  const opacity = PULSE_OPACITY_PEAK * (1 - e);
  return { scale, opacity };
}

/**
 * Onda expansiva siempre vía requestAnimationFrame (mismo código en móvil, escritorio y
 * vista “responsive” del DevTools). Las media queries (pointer: coarse) en emulación
 * suelen seguir siendo “ratón”, por eso antes no se veía el pulso.
 */
export function WhatsAppFloatingButton() {
  const [visible, setVisible] = useState(false);

  const ring1Ref = useRef<HTMLSpanElement>(null);
  const ring2Ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => setVisible(true), SHOW_AFTER_MS);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!visible) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      startRef.current = null;
      const a = ring1Ref.current;
      const b = ring2Ref.current;
      if (a) {
        a.style.removeProperty("transform");
        a.style.removeProperty("opacity");
      }
      if (b) {
        b.style.removeProperty("transform");
        b.style.removeProperty("opacity");
      }
      return;
    }

    const tick = (now: number) => {
      if (document.visibilityState === "hidden") {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;

      const p1 = pulseAt(elapsed, 0);
      const p2 = pulseAt(elapsed, PULSE_STAGGER_MS);

      const r1 = ring1Ref.current;
      const r2 = ring2Ref.current;
      if (r1) {
        r1.style.transform = `scale(${p1.scale})`;
        r1.style.opacity = String(p1.opacity);
      }
      if (r2) {
        r2.style.transform = `scale(${p2.scale})`;
        r2.style.opacity = String(p2.opacity);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      startRef.current = null;
    };
  }, [visible]);

  if (!visible || typeof document === "undefined") {
    return null;
  }

  const ringBase =
    "wa-whatsapp-pulse-blob pointer-events-none absolute inset-0 z-0 rounded-full";

  const pulseOrigin = { transformOrigin: "center" } as const;

  return createPortal(
    <div
      className="pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom,0px))] right-[max(1rem,env(safe-area-inset-right,0px))] z-[9999] sm:bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] sm:right-[max(1.25rem,env(safe-area-inset-right,0px))]"
      role="presentation"
    >
      <div className="relative h-11 w-11 sm:h-12 sm:w-12">
        <span
          ref={ring1Ref}
          className={ringBase}
          style={pulseOrigin}
          aria-hidden
        />
        <span
          ref={ring2Ref}
          className={ringBase}
          style={pulseOrigin}
          aria-hidden
        />
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-whatsapp-pop-in pointer-events-auto relative z-10 flex h-full w-full items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_3px_10px_rgb(0_0_0/0.22)] transition-[transform,box-shadow] duration-200 hover:scale-105 hover:shadow-[0_4px_14px_rgb(37_211_102/0.4)] focus-visible:outline focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
          aria-label="Escribir por WhatsApp"
        >
          <svg
            className="h-6 w-6 sm:h-7 sm:w-7"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              fill="currentColor"
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
            />
          </svg>
        </a>
      </div>
    </div>,
    document.body,
  );
}
