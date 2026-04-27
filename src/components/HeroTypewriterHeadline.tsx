"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

const STATIC_HEADLINE = "Software, páginas web y aplicaciones ";
const WORDS = [
  "rápidas",
  "seguras",
  "modernas",
  "escalables",
  "eficientes",
  "robustas",
  "intuitivas",
  "innovadoras",
  "confiables",
] as const;

const TYPING_MS = 80;
const DELETING_MS = 50;
const PAUSE_FULL_MS = 2000;
const START_MS = 450;
const BETWEEN_WORDS_MS = 120;

type HeroTypewriterHeadlineProps = {
  /** Texto claro sobre fondo oscuro (p. ej. video) */
  onDarkBackground?: boolean;
};

export function HeroTypewriterHeadline({
  onDarkBackground = false,
}: HeroTypewriterHeadlineProps) {
  const [displayWord, setDisplayWord] = useState("");
  const timeoutIds = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timeoutIds.current.forEach(clearTimeout);
    timeoutIds.current = [];
  };

  const schedule = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timeoutIds.current.push(id);
  };

  const setWordVisible = (w: string) => {
    flushSync(() => {
      setDisplayWord(w);
    });
  };

  useEffect(() => {
    let cancelled = false;

    const runWord = (wordIndex: number) => {
      if (cancelled) return;
      const word = WORDS[wordIndex];

      const typeChar = (i: number) => {
        if (cancelled) return;
        setWordVisible(word.slice(0, i));
        if (i < word.length) {
          schedule(() => typeChar(i + 1), TYPING_MS);
        } else {
          schedule(() => deleteChar(word.length - 1), PAUSE_FULL_MS);
        }
      };

      const deleteChar = (len: number) => {
        if (cancelled) return;
        setWordVisible(word.slice(0, len));
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
  }, []);

  return (
    <>
      <span className="sr-only">
        Software, páginas web y aplicaciones rápidas, seguras, modernas,
        escalables, eficientes, robustas, intuitivas, innovadoras y
        confiables.
      </span>
      <span aria-hidden className="text-balance">
        <span className={onDarkBackground ? "text-white" : "text-ink"}>
          {STATIC_HEADLINE}
        </span>
        <span
          className={
            onDarkBackground ? "text-sky-300" : "text-brand-primary"
          }
        >
          {displayWord}
        </span>
        <span
          className={`hero-typewriter-cursor ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-[0.08em] align-middle sm:ml-1 ${onDarkBackground ? "bg-sky-300" : "bg-brand-primary"}`}
          aria-hidden
        />
      </span>
    </>
  );
}
