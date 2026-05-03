"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { PasswordInputWithToggle } from "@/components/auth/PasswordInputWithToggle";

export function ResetPasswordForm() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [ready, setReady] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data } = await supabase.auth.getSession();
      if (!cancelled) {
        setHasSession(!!data.session);
        setReady(true);
      }
    }

    load();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, session) => {
      setHasSession(!!session);
      setReady(true);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [supabase]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setPending(true);
    try {
      const { error: updateErr } = await supabase.auth.updateUser({
        password,
      });
      if (updateErr) {
        setError(updateErr.message);
        return;
      }
      await supabase.auth.signOut();
      router.replace("/login?ok=clave");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  if (!ready) {
    return (
      <div className="mx-auto mt-16 max-w-md text-center text-sm text-gray-500">
        Verificando enlace…
      </div>
    );
  }

  if (!hasSession) {
    return (
      <div className="mx-auto mt-10 max-w-md space-y-4 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center sm:p-8">
        <p className="text-sm leading-relaxed text-amber-900">
          Este enlace caducó, ya se usó o no es válido. Solicita un nuevo correo de
          recuperación.
        </p>
        <Link
          href="/recuperar"
          className="inline-flex min-h-10 items-center justify-center rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white hover:bg-brand-primary/90"
        >
          Solicitar de nuevo
        </Link>
        <p className="text-center text-sm text-gray-600">
          <Link href="/login" className="font-semibold text-brand-primary hover:underline">
            Ir al inicio de sesión
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-10 w-full max-w-md space-y-5 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8"
      noValidate
    >
      <h2 className="text-lg font-semibold text-ink">
        Nueva contraseña
      </h2>
      <p className="text-sm text-gray-600">
        Elige una contraseña segura que no hayas usado antes en otros sitios.
      </p>

      <PasswordInputWithToggle
        id="reset-password-new"
        label="Contraseña nueva"
        name="password"
        autoComplete="new-password"
        minLength={8}
        value={password}
        onChange={setPassword}
      />

      <PasswordInputWithToggle
        id="reset-password-confirm"
        label="Confirmar contraseña"
        name="confirm"
        autoComplete="new-password"
        minLength={8}
        value={confirm}
        onChange={setConfirm}
      />

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
        {pending ? "Guardando…" : "Guardar contraseña"}
      </button>
    </form>
  );
}
