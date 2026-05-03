import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Nueva contraseña",
  description: "Define una nueva contraseña tras abrir el enlace del correo.",
};

/** Llegás aquí desde el correo de Supabase (redirect vía `/auth/callback`). */
export default function RestablecerContrasenaPage() {
  return (
    <div className="min-h-[60vh] bg-gray-50/90 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl pt-8 text-center sm:pt-10">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Restablecer contraseña
        </h1>
      </div>

      <ResetPasswordForm />
    </div>
  );
}
