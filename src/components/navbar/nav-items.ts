export type NavItem = {
  label: string;
  href: string;
  /** Solo rutas internas (Inicio / Servicios); anclas del home no se marcan activas por pathname. */
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
    href: "/servicios",
    isActive: (p) => p.startsWith("/servicios"),
  },
  {
    label: "Portafolio",
    href: "/portafolio",
    isActive: (p) => p.startsWith("/portafolio"),
  },
  {
    label: "Contacto",
    href: "/contacto",
    isActive: (p) => p.startsWith("/contacto"),
  },
];
