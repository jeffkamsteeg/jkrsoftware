/**
 * Debe coincidir con Supabase: Authentication → Providers → Email →
 * "Email OTP expiration" (segundos). Enlace de confirmación y recuperación.
 */
function readExpirySeconds(): number {
  const raw = process.env.NEXT_PUBLIC_AUTH_EMAIL_LINK_EXPIRY_SEC;
  if (raw === undefined || raw === "") return 180;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 60 || n > 86_400) return 180;
  return Math.floor(n);
}

export const AUTH_EMAIL_LINK_EXPIRY_SEC = readExpirySeconds();

/** Para textos UX ("3 minutos" / "90 segundos"). */
export function formatExpiryDurationBrief(sec = AUTH_EMAIL_LINK_EXPIRY_SEC): string {
  return sec >= 120 ? `${Math.round(sec / 60)} minutos` : `${sec} segundos`;
}

export const STORAGE_SIGNUP_LINK_SENT_AT = "auth_signup_email_link_sent_at_v1";

export const STORAGE_RECOVERY_LINK_SENT_AT = "auth_recovery_email_link_sent_at_v1";
