"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NavbarMusic } from "@/components/NavbarMusic";

const links = [
  ["Home", "home"],
  ["Work", "work"],
  ["Kitchen", "lab"],
  ["Experience", "experience"],
  ["Offscreen", "offscreen"],
  ["Contact", "contact"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const pathname = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );
    links.forEach(([, id]) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-inner page-shell">
        <Link
          href="/#home"
          className="wordmark"
          aria-label="Devansh Kaushik — home"
          onClick={() => setOpen(false)}
        >
          devansh kaushik
        </Link>
        <div className="header-controls">
          <nav aria-label="Main navigation" className="desktop-nav">
            {links.map(([label, id]) => (
              <Link
                key={id}
                href={`/#${id}`}
                className={pathname === "/" && active === id ? "is-active" : ""}
                aria-current={
                  pathname === "/" && active === id ? "location" : undefined
                }
              >
                {label}
                {id === "contact" && <ArrowUpRight size={13} />}
              </Link>
            ))}
          </nav>
          <NavbarMusic onToggle={() => setOpen(false)} />
          <button
            ref={menuButton}
            className="menu-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav page-shell"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {links.map(([label, id], index) => (
          <Link key={id} href={`/#${id}`} onClick={() => setOpen(false)}>
            <span className="eyebrow">0{index + 1}</span>
            {label}
            <ArrowUpRight size={18} />
          </Link>
        ))}
      </nav>
    </header>
  );
}
