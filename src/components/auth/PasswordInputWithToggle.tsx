"use client";

import type { ReactNode } from "react";
import { useState } from "react";

type PasswordInputWithToggleProps = {
  id: string;
  label: string;
  name: string;
  autoComplete: string;
  minLength?: number;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  hint?: ReactNode;
};

function EyeIcons({ visible }: { visible: boolean }) {
  if (!visible) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-5 w-5"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-5 w-5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.698a18.032 18.032 0 01-1.197 3.234M6.228 6.228L3 3m3.228 3.228l11.089 11.089m3.086-11.086L21 21"
      />
    </svg>
  );
}

export function PasswordInputWithToggle({
  id,
  label,
  name,
  autoComplete,
  minLength,
  required = true,
  value,
  onChange,
  hint,
}: PasswordInputWithToggleProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          required={required}
          minLength={minLength}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 py-2 pl-3 pr-11 text-sm outline-none ring-brand-accent/40 transition focus:border-brand-primary focus:ring-2"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-gray-500 outline-none transition hover:bg-gray-100 hover:text-ink focus-visible:ring-2 focus-visible:ring-brand-accent/60"
          aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          <EyeIcons visible={visible} />
        </button>
      </div>
      {hint}
    </div>
  );
}
