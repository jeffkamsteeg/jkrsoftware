import type { ReactNode } from "react";
import Link from "next/link";
import { navLinkClassName } from "./nav-styles";

type NavbarLinkProps = {
  href: string;
  active: boolean;
  onClick?: () => void;
  children: ReactNode;
};

export function NavbarLink({ href, active, onClick, children }: NavbarLinkProps) {
  return (
    <Link href={href} className={navLinkClassName(active)} onClick={onClick}>
      {children}
    </Link>
  );
}
