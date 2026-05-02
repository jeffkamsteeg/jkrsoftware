"use client";

import { useEffect } from "react";

type RedirectToSectionProps = {
  id: string;
};

export function RedirectToSection({ id }: RedirectToSectionProps) {
  useEffect(() => {
    window.location.replace(`${window.location.origin}/#${id}`);
  }, [id]);

  return (
    <p className="px-4 py-16 text-center text-sm text-gray-600">
      Redirigiendo al inicio…
    </p>
  );
}
