"use client";

import { useEffect, useState } from "react";

const VIDEO_SRC = "/hero-background.mp4";

export function HeroBackgroundVideo() {
  const [hideVideo, setHideVideo] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setHideVideo(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (hideVideo) {
    return null;
  }

  return (
    <video
      className="absolute inset-0 z-0 h-full min-h-full w-full min-w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      src={VIDEO_SRC}
      aria-hidden
    />
  );
}
