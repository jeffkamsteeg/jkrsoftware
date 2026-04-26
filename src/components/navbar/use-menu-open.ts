"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Menú móvil: estado, cierra al cambiar de ruta y con Escape. */
export function useMenuOpen() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return {
    open,
    close: () => setOpen(false),
    toggle: () => setOpen((v) => !v),
  };
}
