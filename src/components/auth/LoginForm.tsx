"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { PasswordInputWithToggle } from "@/components/auth/PasswordInputWithToggle";

function translateAuthError(raw: string) {
  if (raw.includes("Invalid login credentials")) {
    return "Correo o contraseña incorrectos.";
  }
  if (raw.includes("Email not confirmed")) {
    return "Confirma tu correo antes de iniciar sesión.";
  }
  return raw;
}

export function LoginForm() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const { error: signErr } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signErr) {
        setError(translateAuthError(signErr.message));
        return;
      }
      router.replace("/cuenta");
      router.refresh();
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
        <label htmlFor="login-email" className="block text-sm font-medium text-ink">
          Correo electrónico
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-brand-accent/40 transition focus:border-brand-primary focus:ring-2"
        />
      </div>

      <PasswordInputWithToggle
        id="login-password"
        label="Contraseña"
        name="password"
        autoComplete="current-password"
        minLength={6}
        value={password}
        onChange={setPassword}
      />

      <p className="text-right text-sm">
        <Link
          href="/recuperar"
          className="font-semibold text-brand-primary hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </p>

      {error ? (
        <p className="text-sm font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full min-h-11 items-center justify-center rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-brand-primary/90 disabled:opacity-70"
      >
        {pending ? "Entrando…" : "Entrar"}
      </button>

      <p className="text-center text-sm text-gray-600">
        ¿No tienes cuenta?{" "}
        <Link href="/registro" className="font-semibold text-brand-primary hover:underline">
          Crear cuenta
        </Link>
      </p>
    </form>
  );
}
