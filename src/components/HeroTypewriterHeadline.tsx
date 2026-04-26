"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/** Solo la última palabra se anima; el resto del titular es fijo. */
const WORDS = [
  "rápidas",
  "seguras",
  "modernas",
  "escalables",
  "eficientes",
  "robustas",
  "intuitivas",
  "personalizadas",
  "innovadoras",
  "confiables",
] as const;

const TYPING_MS = 80;
const DELETING_MS = 50;
const PAUSE_FULL_MS = 2000;
const START_MS = 450;
const BETWEEN_WORDS_MS = 120;

export function HeroTypewriterHeadline() {
  const [displayWord, setDisplayWord] = useState("");
  /** null = aún no leímos prefers-reduced-motion en el cliente */
  const [respectMotion, setRespectMotion] = useState<boolean | null>(null);
  const timeoutIds = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timeoutIds.current.forEach(clearTimeout);
    timeoutIds.current = [];
  };

  const schedule = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timeoutIds.current.push(id);
  };

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setRespectMotion(mq.matches);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);

  useEffect(() => {
    clearTimers();

    if (respectMotion === null) return;

    if (respectMotion) {
      setDisplayWord(WORDS[0]);
      return;
    }

    let cancelled = false;

    const runWord = (wordIndex: number) => {
      if (cancelled) return;
      const word = WORDS[wordIndex];

      const typeChar = (i: number) => {
        if (cancelled) return;
        setDisplayWord(word.slice(0, i));
        if (i < word.length) {
          schedule(() => typeChar(i + 1), TYPING_MS);
        } else {
          schedule(() => deleteChar(word.length - 1), PAUSE_FULL_MS);
        }
      };

      const deleteChar = (len: number) => {
        if (cancelled) return;
        setDisplayWord(word.slice(0, len));
        if (len > 0) {
          schedule(() => deleteChar(len - 1), DELETING_MS);
        } else {
          schedule(
            () => runWord((wordIndex + 1) % WORDS.length),
            BETWEEN_WORDS_MS,
          );
        }
      };

      typeChar(0);
    };

    schedule(() => runWord(0), START_MS);

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [respectMotion]);

  const showCursor = respectMotion === false;

  return (
    <>
      <span className="sr-only">
        Software, páginas web y aplicaciones rápidas, seguras, modernas,
        escalables, eficientes, robustas, intuitivas, personalizadas,
        innovadoras y confiables.
      </span>
      <span aria-hidden className="text-balance">
        <span className="text-ink">
          <span className="font-semibold text-brand-primary">Software</span>
          {", páginas web y aplicaciones "}
        </span>
        <span className="text-brand-primary">{displayWord}</span>
        {showCursor ? (
          <span
            className="hero-typewriter-cursor ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-[0.08em] bg-brand-primary align-middle sm:ml-1"
            aria-hidden
          />
        ) : null}
      </span>
    </>
  );
}
