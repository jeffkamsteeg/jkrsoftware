"use client";

import { useEffect, useRef, useState } from "react";
import {
  AUTH_EMAIL_LINK_EXPIRY_SEC,
  formatExpiryDurationBrief,
} from "@/lib/auth/email-link-validity";

type Props = {
  sentAt: number;
  className?: string;
  /** Se llama una sola vez al pasar a caducado. */
  onExpired?: () => void;
};

export function EmailLinkExpiryCountdown({
  sentAt,
  className,
  onExpired,
}: Props) {
  const [now, setNow] = useState(() => Date.now());
  const expireNotified = useRef(false);
  const onExpiredRef = useRef(onExpired);
  onExpiredRef.current = onExpired;

  const expiryMs = AUTH_EMAIL_LINK_EXPIRY_SEC * 1000;
  const end = sentAt + expiryMs;
  const remainingMs = Math.max(0, end - now);
  const expired = remainingMs <= 0;

  useEffect(() => {
    expireNotified.current = false;
  }, [sentAt]);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [sentAt]);

  useEffect(() => {
    if (!expired) return;
    if (!expireNotified.current) {
      expireNotified.current = true;
      onExpiredRef.current?.();
    }
  }, [expired]);

  const totalSec = Math.ceil(remainingMs / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;

  if (expired) {
    return (
      <p className={className} role="status">
        El enlace del correo ya caducó (válido {formatExpiryDurationBrief()}).
        Solicita uno nuevo desde esta página.
      </p>
    );
  }

  return (
    <p className={className} role="timer" aria-live="polite">
      Tienes{" "}
      <span className="font-mono font-semibold tabular-nums text-ink">
        {m}:{s.toString().padStart(2, "0")}
      </span>{" "}
      para abrir el enlace del correo antes de que caduque.
    </p>
  );
}
