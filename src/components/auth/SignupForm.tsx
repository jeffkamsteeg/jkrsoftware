"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export function SignupForm() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setPending(true);

    const origin =
      typeof window !== "undefined" ? window.location.origin : "";
    try {
      const { data, error: signErr } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${origin}/auth/callback?next=/cuenta`,
        },
      });

      if (signErr) {
        setError(signErr.message);
        return;
      }

      const needsConfirm = !data.session;
      setNotice(
        needsConfirm
          ? "Te enviamos un enlace por correo. Ábrelo para confirmar la cuenta antes de iniciar sesión."
          : "Cuenta creada correctamente.",
      );

      if (data.session) {
        router.replace("/cuenta");
        router.refresh();
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-10 w-full max-w-md space-y-5 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8"
      noValidate
    >
      <div className="space-y-1">
        <label htmlFor="signup-email" className="block text-sm font-medium text-ink">
          Correo electrónico
        </label>
        <input
          id="signup-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-brand-accent/40 transition focus:border-brand-primary focus:ring-2"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="signup-password" className="block text-sm font-medium text-ink">
          Contraseña
        </label>
        <input
          id="signup-password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-brand-accent/40 transition focus:border-brand-primary focus:ring-2"
        />
        <p className="text-xs text-gray-500">Mínimo 8 caracteres (ajustable en Supabase).</p>
      </div>

      {error ? (
        <p className="text-sm font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      {notice ? (
        <p className="text-sm leading-relaxed text-gray-700" role="status">
          {notice}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full min-h-11 items-center justify-center rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-brand-primary/90 disabled:opacity-70"
      >
        {pending ? "Creando cuenta…" : "Registrar"}
      </button>

      <p className="text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="font-semibold text-brand-primary hover:underline">
          Iniciar sesión
        </Link>
      </p>
    </form>
  );
}
