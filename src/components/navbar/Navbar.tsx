"use client";

import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "./nav-items";
import { NavbarBrand } from "./NavbarBrand";
import { NavbarLink } from "./NavbarLink";
import { NavbarMenuButton } from "./NavbarMenuButton";
import { AuthNav } from "@/components/auth/AuthNav";
import {
  barRowClassName,
  desktopListClassName,
  headerClassName,
  mobilePanelClassName,
  navInnerClassName,
} from "./nav-styles";
import { useMenuOpen } from "./use-menu-open";

export default function Navbar() {
  const pathname = usePathname();
  const { open, close, toggle } = useMenuOpen();

  return (
    <header className={headerClassName}>
      <nav className={navInnerClassName} aria-label="Principal">
        <div className={barRowClassName}>
          <NavbarBrand onNavigate={close} />

          <ul className={desktopListClassName}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="flex shrink-0 items-center">
                <NavbarLink href={item.href} active={item.isActive(pathname)}>
                  {item.label}
                </NavbarLink>
              </li>
            ))}
          </ul>

          <AuthNav variant="desktop" />

          <NavbarMenuButton open={open} onToggle={toggle} />
        </div>

        <div id="nav-menu-movil" className={mobilePanelClassName(open)}>
          <ul className="flex flex-col pb-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <NavbarLink
                  href={item.href}
                  active={item.isActive(pathname)}
                  onClick={close}
                >
                  {item.label}
                </NavbarLink>
              </li>
            ))}
          </ul>
          <AuthNav variant="mobile" onNavigate={close} />
        </div>
      </nav>
    </header>
  );
}
