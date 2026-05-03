import type { Metadata } from "next";
import Link from "next/link";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Recuperar contraseña",
  description:
    "Solicita un enlace por correo para restablecer la contraseña de tu cuenta.",
};

export default function RecuperarPage() {
  return (
    <div className="min-h-[60vh] bg-gray-50/90 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl pt-8 text-center sm:pt-10">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Recuperar contraseña
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          ¿Recordaste la clave?{" "}
          <Link href="/login" className="font-semibold text-brand-primary hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>

      <ForgotPasswordForm />
    </div>
  );
}
