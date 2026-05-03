/**
 * Supabase suele enviar errores API en inglés; aquí mejoramos algunos UX comunes.
 * @see https://supabase.com/docs/guides/auth/rate-limits
 */
export function formatAuthEmailError(message: string | undefined | null): string {
  const m = (message ?? "").trim();
  const lower = m.toLowerCase();

  const isMailRateLimit =
    lower.includes("email rate limit") ||
    lower.includes("rate limit exceeded") ||
    lower.includes("over_email_send_rate_limit") ||
    lower.includes("smtp_rate_limit") ||
    (lower.includes("rate limit") &&
      (lower.includes("email") || lower.includes("mail")));

  if (isMailRateLimit) {
    return (
      "Se alcanzó el límite de correos de autenticación de Supabase. " +
      "Con el servicio de email integrado existe un máximo por hora para todo el proyecto; " +
      "es habitual verlo al hacer muchas pruebas seguidas. Espera algo (p. ej. una hora) y vuelve a intentarlo, " +
      "o revisa Authentication → Rate Limits / SMTP en el panel: con SMTP propio puedes aumentar ese límite."
    );
  }

  return m || "Algo salió mal. Inténtalo de nuevo.";
}
