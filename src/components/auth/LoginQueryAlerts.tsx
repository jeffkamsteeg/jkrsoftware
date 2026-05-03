"use client";

import { useSearchParams } from "next/navigation";

/** Mensajes opcionales en la URL en `/login`. */
export function LoginQueryAlerts() {
  const sp = useSearchParams();

  if (sp.get("error") === "auth") {
    return (
      <div className="mx-auto mt-6 max-w-md rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-800">
        Hubo un problema al confirmar el acceso (enlace caducado o inválido). Prueba
        iniciar sesión de nuevo.
      </div>
    );
  }

  if (sp.get("ok") === "clave") {
    return (
      <div className="mx-auto mt-6 max-w-md rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm text-emerald-900">
        Contraseña actualizada correctamente. Ya puedes iniciar sesión con la nueva clave.
      </div>
    );
  }

  return null;
}
