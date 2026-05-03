"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { EmailLinkExpiryCountdown } from "@/components/auth/EmailLinkExpiryCountdown";
import { createClient } from "@/lib/supabase/client";
import { formatAuthEmailError } from "@/lib/auth/format-auth-email-error";
import {
  STORAGE_RECOVERY_LINK_SENT_AT,
  formatExpiryDurationBrief,
} from "@/lib/auth/email-link-validity";

const REDIRECT_AFTER_RECOVERY_PATH = "/restablecer-contrasena";

export function ForgotPasswordForm() {
  const supabase = useMemo(() => createClient(), []);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const [recoverySentAt, setRecoverySentAt] = useState<number | null>(null);
  const [allowResend, setAllowResend] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setStatus("sending");
    setRecoverySentAt(null);
    setAllowResend(false);

    const origin =
      typeof window !== "undefined" ? window.location.origin : "";
    const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(REDIRECT_AFTER_RECOVERY_PATH)}`;

    try {
      const { error: resetErr } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        { redirectTo },
      );
      if (resetErr) {
        setError(formatAuthEmailError(resetErr.message));
        setStatus("idle");
        return;
      }
      setStatus("sent");
      const t = Date.now();
      sessionStorage.setItem(STORAGE_RECOVERY_LINK_SENT_AT, String(t));
      setRecoverySentAt(t);
    } catch {
      setError("No pudimos enviar el correo. Intenta más tarde.");
      setStatus("idle");
    }
  }

  const lockedAfterSend = status === "sent" && !allowResend;

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-10 w-full max-w-md space-y-5 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8"
      noValidate
    >
      <p className="text-sm leading-relaxed text-gray-600">
        Escribe el correo de tu cuenta. Si existe, enviaremos un enlace para
        crear una nueva contraseña (revisa también spam). El enlace caduca en{" "}
        {formatExpiryDurationBrief()}.
      </p>

      <div className="space-y-1">
        <label htmlFor="forgot-email" className="block text-sm font-medium text-ink">
          Correo electrónico
        </label>
        <input
          id="forgot-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={lockedAfterSend}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-brand-accent/40 transition focus:border-brand-primary focus:ring-2 disabled:bg-gray-50"
        />
      </div>

      {error ? (
        <p className="text-sm font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      {status === "sent" && recoverySentAt !== null ? (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700" role="status">
            Listo: si ese correo está registrado, recibirás un enlace para
            restablecer la contraseña.
          </p>
          <EmailLinkExpiryCountdown
            sentAt={recoverySentAt}
            className="text-sm font-medium text-gray-700"
            onExpired={() => setAllowResend(true)}
          />
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending" || lockedAfterSend}
        className="flex w-full min-h-11 items-center justify-center rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-brand-primary/90 disabled:opacity-70"
      >
        {status === "sending"
          ? "Enviando…"
          : status === "sent" && lockedAfterSend
            ? "Correo enviado"
            : allowResend
              ? "Enviar otro enlace"
              : "Enviar enlace"}
      </button>

      <p className="text-center text-sm text-gray-600">
        <Link href="/login" className="font-semibold text-brand-primary hover:underline">
          Volver a iniciar sesión
        </Link>
      </p>
    </form>
  );
}
