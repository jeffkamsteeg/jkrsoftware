import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Mi cuenta",
  description: "Datos de tu sesión en JKR Software.",
};

export default async function CuentaPage() {
  const urlEnv = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const anonEnv = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  if (!urlEnv.trim() || !anonEnv.trim()) {
    redirect("/login");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-[60vh] bg-gray-50/90 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-xl rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Mi cuenta
        </h1>
        <dl className="mt-8 space-y-4 text-sm">
          <div>
            <dt className="font-medium text-gray-500">Correo</dt>
            <dd className="mt-1 break-all font-medium text-ink">{user.email}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Usuario</dt>
            <dd className="mt-1 break-all text-gray-700">
              ID interno solo para soporte técnico:{" "}
              <span className="font-mono text-xs text-gray-600">{user.id}</span>
            </dd>
          </div>
        </dl>

        <Link
          href="/"
          className="mt-8 inline-flex min-h-10 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-gray-50"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
