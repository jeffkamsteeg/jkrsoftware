import { createBrowserClient } from "@supabase/ssr";

/**
 * Credenciales reales siempre desde env. Placeholders solo para SSR/build sin `.env`:
 * permite prerender sin error; cualquier llamada HTTP real fallará hasta configurar Supabase.
 */
function supabaseCredentials() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    "https://build-placeholder.invalid.supabase.co";
  const anon =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    "sb_publishable_placeholder_key_build_only______________________________";
  return { url, anon };
}

export function createClient() {
  const { url, anon } = supabaseCredentials();
  return createBrowserClient(url, anon);
}
