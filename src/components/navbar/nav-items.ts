export type NavItem = {
  label: string;
  href: string;
  isActive: (pathname: string) => boolean;
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Inicio",
    href: "/",
    isActive: (p) => p === "/",
  },
  {
    label: "Servicios",
    href: "/#servicios",
    isActive: () => false,
  },
  {
    label: "Portafolio",
    href: "/#portafolio",
    isActive: () => false,
  },
  {
    label: "Contacto",
    href: "/#contacto",
    isActive: () => false,
  },
];
