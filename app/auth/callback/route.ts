import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

/**
 * PKCE/email de confirmación: las cookies deben ir en el NextResponse.redirect,
 * no solo en cookieStore — si no, el intercambio “funciona” pero el navegador no guarda sesión.
 */
export async function GET(request: NextRequest) {
  const urlEnv =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const anonEnv =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

  const origin = request.nextUrl.origin;
  const code = request.nextUrl.searchParams.get("code");
  const nextRaw = request.nextUrl.searchParams.get("next") ?? "/cuenta";
  const safeNext = nextRaw.startsWith("/") ? nextRaw : `/${nextRaw}`;

  const loginErrorUrl = `${origin}/login?error=auth`;
  const successUrl = `${origin}${safeNext}`;

  const oauthErr = request.nextUrl.searchParams.get("error");
  const oauthErrDesc =
    request.nextUrl.searchParams.get("error_description");
  if (oauthErr || oauthErrDesc) {
    return NextResponse.redirect(loginErrorUrl);
  }

  if (!code || !urlEnv || !anonEnv) {
    return NextResponse.redirect(loginErrorUrl);
  }

  const response = NextResponse.redirect(successUrl);

  const supabase = createServerClient(urlEnv, anonEnv, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(loginErrorUrl);
  }

  return response;
}
