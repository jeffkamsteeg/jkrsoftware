import { menuButtonClassName } from "./nav-styles";

type NavbarMenuButtonProps = {
  open: boolean;
  onToggle: () => void;
};

export function NavbarMenuButton({ open, onToggle }: NavbarMenuButtonProps) {
  return (
    <button
      type="button"
      className={menuButtonClassName}
      aria-expanded={open}
      aria-controls="nav-menu-movil"
      aria-label={open ? "Cerrar menú" : "Abrir menú"}
      onClick={onToggle}
    >
      {open ? <IconClose /> : <IconMenu />}
    </button>
  );
}

function IconMenu() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.75}
      stroke="currentColor"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.75}
      stroke="currentColor"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}
