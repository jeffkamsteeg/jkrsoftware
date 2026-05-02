import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function supabaseCredentials() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    "https://build-placeholder.invalid.supabase.co";
  const anon =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    "sb_publishable_placeholder_key_build_only______________________________";
  return { url, anon };
}

export async function createClient() {
  const { url, anon } = supabaseCredentials();
  const cookieStore = await cookies();

  return createServerClient(url, anon, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // set puede fallar en Server Components sin mutación permitida (no crítico)
        }
      },
    },
  });
}
