import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { LoginQueryAlerts } from "@/components/auth/LoginQueryAlerts";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "Accede con correo y contraseña.",
};

export default function LoginPage() {
  return (
    <div className="min-h-[60vh] bg-gray-50/90 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl pt-8 text-center sm:pt-10">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Iniciar sesión
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          ¿Aún sin cuenta?{" "}
          <Link href="/registro" className="font-semibold text-brand-primary hover:underline">
            Registro
          </Link>
        </p>
      </div>

      <Suspense fallback={null}>
        <LoginQueryAlerts />
      </Suspense>

      <LoginForm />
    </div>
  );
}
