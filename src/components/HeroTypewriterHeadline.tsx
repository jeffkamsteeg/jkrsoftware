"use client";

import { useEffect, useRef, useState } from "react";

/** Texto fijo desde la primera pintura; solo la última palabra se anima. */
const STATIC_HEADLINE = "Software, páginas web y aplicaciones ";
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

const TYPING_MS = 75;
const DELETING_MS = 45;
const PAUSE_FULL_MS = 2000;
const START_MS = 400;

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function HeroTypewriterHeadline() {
  const [displayWord, setDisplayWord] = useState("");
  const [skipAnimation, setSkipAnimation] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    let cancelled = false;

    (async () => {
      const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        setSkipAnimation(true);
        setDisplayWord(WORDS[0]);
        return;
      }

      await sleep(START_MS);
      if (cancelled || !mounted.current) return;

      let wordIndex = 0;
      while (!cancelled && mounted.current) {
        const word = WORDS[wordIndex];

        for (let i = 1; i <= word.length; i++) {
          if (cancelled || !mounted.current) return;
          setDisplayWord(word.slice(0, i));
          await sleep(TYPING_MS);
        }

        await sleep(PAUSE_FULL_MS);
        if (cancelled || !mounted.current) return;

        for (let len = word.length - 1; len >= 0; len--) {
          if (cancelled || !mounted.current) return;
          setDisplayWord(word.slice(0, len));
          await sleep(DELETING_MS);
        }

        wordIndex = (wordIndex + 1) % WORDS.length;
      }
    })();

    return () => {
      cancelled = true;
      mounted.current = false;
    };
  }, []);

  return (
    <>
      <span className="sr-only">
        Software, páginas web y aplicaciones rápidas, seguras, modernas,
        escalables, eficientes, robustas, intuitivas, personalizadas,
        innovadoras y confiables.
      </span>
      <span aria-hidden className="text-balance">
        <span className="text-ink">{STATIC_HEADLINE}</span>
        <span className="text-brand-primary">{displayWord}</span>
        {!skipAnimation ? (
          <span
            className="hero-typewriter-cursor ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-[0.08em] bg-brand-primary align-middle sm:ml-1"
            aria-hidden
          />
        ) : null}
      </span>
    </>
  );
}
