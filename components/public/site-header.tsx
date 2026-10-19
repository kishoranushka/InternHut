"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PARTNERS_PAGE_ENABLED, ROUTES } from "@/lib/routes";
import {
  NAV_ACTIVE_PATHS,
  type MenuId,
  type StartingSoonItem,
} from "./header/nav-data";
import { MegaInternships } from "./header/mega-internships";
import { MegaColleges } from "./header/mega-colleges";
import { MegaHow } from "./header/mega-how";
import { MobileSheet } from "./header/mobile-sheet";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ChevronDownIcon, MenuIcon, ShieldCheckIcon } from "./header/header-icons";

const MENU_BUTTONS: { id: MenuId; label: string }[] = [
  { id: "internships", label: "Internships" },
  { id: "colleges", label: "For Colleges" },
  { id: "how", label: "How it works" },
];

export function SiteHeader({
  isLoggedIn,
  startingSoon,
}: {
  isLoggedIn: boolean;
  startingSoon: StartingSoonItem[];
}) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  // College pages are for institutions; logged-in students never see them.
  const menuButtons = isLoggedIn
    ? MENU_BUTTONS.filter((item) => item.id !== "colleges")
    : MENU_BUTTONS;

  /** Matches the mockup: clicking toggles, hovering only switches an already-open menu. */
  const toggleMenu = (id: MenuId) =>
    setOpenMenu((current) => (current === id ? null : id));

  const hoverMenu = (id: MenuId) =>
    setOpenMenu((current) => (current && current !== id ? id : current));

  const currentFor = (key: string) =>
    NAV_ACTIVE_PATHS[key]?.some((path) => pathname === path) ? "page" : "false";

  return (
    <header
      onMouseLeave={() => setOpenMenu(null)}
      className="sticky top-0 z-50 border-b border-border bg-card text-navy"
    >
      <div className="mx-auto box-border flex h-20 max-w-header items-center justify-between gap-6 px-gutter">
        <div className="flex items-center gap-14">
          <Link
            href={ROUTES.home}
            aria-label="Graditute home"
            className="text-[21px] font-bold tracking-[-0.025em] text-navy no-underline"
          >
            Graditute
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 nav:flex">
            {menuButtons.map((item) => (
              <button
                key={item.id}
                type="button"
                className="nav-link"
                aria-expanded={openMenu === item.id}
                data-current={currentFor(item.id)}
                onClick={() => toggleMenu(item.id)}
                onMouseEnter={() => hoverMenu(item.id)}
              >
                {item.label}
                <ChevronDownIcon />
              </button>
            ))}
            {PARTNERS_PAGE_ENABLED && (
              <Link
                href={ROUTES.partners}
                className="nav-link"
                data-current={currentFor("partners")}
              >
                Partners
              </Link>
            )}
            <Link
              href={ROUTES.about}
              className="nav-link"
              data-current={currentFor("about")}
            >
              About
            </Link>
          </nav>
        </div>

        <div className="hidden items-center gap-1 nav:flex">
          <ThemeToggle className="mr-1" />
          <Link href={ROUTES.verify} className="btn btn-ghost-navy btn-sm">
            <ShieldCheckIcon />
            Verify certificate
          </Link>
          <span className="mx-2 block h-6 w-px bg-border" />
          <Link
            href={isLoggedIn ? ROUTES.dashboard : ROUTES.login}
            className="btn btn-ghost-navy btn-sm"
          >
            {isLoggedIn ? "Dashboard" : "Log in"}
          </Link>
          <Link
            href={ROUTES.applyNow}
            className="btn btn-primary btn-sm ml-1"
          >
            Get started
          </Link>
        </div>

        <div className="flex items-center gap-2 nav:hidden">
          <ThemeToggle className="h-11 w-11" />
          <button
            type="button"
            className="btn btn-outline btn-sm h-11 w-11 p-0"
            aria-expanded={mobileOpen}
            aria-label="Menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {openMenu === "internships" && <MegaInternships startingSoon={startingSoon} />}
      {openMenu === "colleges" && !isLoggedIn && <MegaColleges />}
      {openMenu === "how" && <MegaHow />}

      {mobileOpen && (
        <MobileSheet
          isLoggedIn={isLoggedIn}
          onNavigate={() => setMobileOpen(false)}
        />
      )}
    </header>
  );
}
