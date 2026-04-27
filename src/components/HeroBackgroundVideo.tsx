"use client";

import { useEffect, useRef } from "react";

const VIDEO_SRC = "/hero-background.mp4";

export function HeroBackgroundVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const play = () => {
      void video.play().catch(() => {
        // Algunos navegadores móviles bloquean autoplay hasta el primer toque.
      });
    };

    play();
    video.addEventListener("canplay", play);
    window.addEventListener("pageshow", play);
    document.addEventListener("visibilitychange", play);
    window.addEventListener("pointerdown", play, { once: true });
    window.addEventListener("touchstart", play, { once: true });

    return () => {
      video.removeEventListener("canplay", play);
      window.removeEventListener("pageshow", play);
      document.removeEventListener("visibilitychange", play);
      window.removeEventListener("pointerdown", play);
      window.removeEventListener("touchstart", play);
    };
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 z-0 h-full min-h-full w-full min-w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      disablePictureInPicture
      preload="auto"
      src={VIDEO_SRC}
      aria-hidden
    />
  );
}
