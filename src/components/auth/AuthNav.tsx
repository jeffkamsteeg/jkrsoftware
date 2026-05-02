"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

const btnBase =
  "inline-flex min-h-9 items-center justify-center rounded-lg px-3 py-1.5 text-sm font-semibold outline-none transition focus-visible:ring-2 focus-visible:ring-brand-accent/60 focus-visible:ring-offset-2";

export function AuthNav({
  variant,
  onNavigate,
}: {
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      const { data } = await supabase.auth.getSession();
      if (!cancelled) {
        setUser(data.session?.user ?? null);
        setReady(true);
      }
    }

    bootstrap();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_evt, session) => {
      setUser(session?.user ?? null);
      setReady(true);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [supabase]);

  if (!ready) {
    return (
      <div
        className={
          variant === "desktop"
            ? "hidden h-9 min-w-[5rem] md:block"
            : "flex h-9 items-center justify-center px-3 text-xs text-gray-400 md:hidden"
        }
        aria-hidden
      >
        …
      </div>
    );
  }

  if (!user) {
    return (
      <div
        className={
          variant === "desktop"
            ? "hidden shrink-0 items-center gap-1.5 md:flex"
            : "flex flex-col gap-2 border-t border-line/80 px-4 py-3 md:hidden"
        }
      >
        <Link
          href="/login"
          onClick={onNavigate}
          className={`${btnBase} text-ink hover:bg-black/[0.04] hover:text-brand-primary md:bg-transparent`}
        >
          Entrar
        </Link>
        <Link
          href="/registro"
          onClick={onNavigate}
          className={`${btnBase} bg-brand-primary text-white hover:bg-brand-primary/90`}
        >
          Registrar
        </Link>
      </div>
    );
  }

  const email = user.email?.trim();

  return (
    <div
      className={
        variant === "desktop"
          ? "hidden shrink-0 items-center gap-2 md:flex"
          : "flex flex-col gap-2 border-t border-line/80 px-4 py-3 md:hidden"
      }
    >
      <Link
        href="/cuenta"
        onClick={onNavigate}
        title={email ?? "Mi cuenta"}
        aria-label={`Ir a mi cuenta (${email ?? "usuario"})`}
        className={`${btnBase} text-ink hover:bg-black/[0.04] hover:text-brand-primary ${
          variant === "desktop" ? "max-w-[260px]" : "w-full justify-start text-left normal-case font-medium"
        }`}
      >
        <span
          className={variant === "desktop" ? "truncate" : "break-all"}
        >
          {email ?? "Mi cuenta"}
        </span>
      </Link>
      <button
        type="button"
        className={`${btnBase} border border-line text-ink hover:bg-gray-50`}
        onClick={async () => {
          await supabase.auth.signOut();
          onNavigate?.();
          router.refresh();
        }}
      >
        Salir
      </button>
    </div>
  );
}
