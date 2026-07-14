"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { navItems } from "./data";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function DesktopNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="nav-pill" aria-label="Primary navigation">
      {navItems.map((item) => (
        <Link
          className={`nav-link ${isActive(pathname, item.href) ? "is-active" : ""}`}
          href={item.href}
          aria-current={isActive(pathname, item.href) ? "page" : undefined}
          key={item.href}
        >
          {item.label}
        </Link>
      ))}
      {session ? (
        <>
          <Link 
            className="nav-link"
            href={(session.user as any)?.role === "admin" ? "/admin" : "/dashboard"}
            style={{ marginLeft: '12px' }}
          >
            {(session.user as any)?.role === "admin" ? "Admin" : "Dashboard"}
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="nav-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link 
            className="nav-link"
            href="/login"
            style={{ marginLeft: '12px' }}
          >
            Login
          </Link>
          <Link
            className="nav-link nav-action"
            href="/register"
          >
            Register
            <ArrowUpRight aria-hidden="true" size={14} strokeWidth={2.4} />
          </Link>
        </>
      )}
    </nav>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="mobile-nav-wrap">
      <button
        className="menu-button"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>

      <div
        className={`mobile-backdrop ${open ? "is-open" : ""}`}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />

      <div className={`mobile-drawer ${open ? "is-open" : ""}`}>
        {navItems.map((item) => (
          <Link
            href={item.href}
            className={isActive(pathname, item.href) ? "is-active" : ""}
            aria-current={isActive(pathname, item.href) ? "page" : undefined}
            key={item.href}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <div style={{ borderTop: '1px solid #E5E7EB', margin: '16px 0' }} />
        {session ? (
          <>
            <Link
              href={(session.user as any)?.role === "admin" ? "/admin" : "/dashboard"}
              className="button button-secondary"
              onClick={() => setOpen(false)}
              style={{ marginBottom: '12px' }}
            >
              {(session.user as any)?.role === "admin" ? "Admin Panel" : "Dashboard"}
            </Link>
            <button
              onClick={() => {
                setOpen(false);
                signOut({ callbackUrl: '/login' });
              }}
              className="button button-primary"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="button button-secondary"
              onClick={() => setOpen(false)}
              style={{ marginBottom: '12px' }}
            >
              Login
            </Link>
            <Link
              href="/register"
              className="button button-primary"
              onClick={() => setOpen(false)}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <Link href="/" className="brand-lockup" aria-label="Pravaron Technologies home">
        <strong>Pravaron</strong>
      </Link>
      <DesktopNav />
      <MobileNav />
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-brand">
          <div>
            <strong>Pravaron Technologies</strong>
            <p>Agentic AI infrastructure for future-ready businesses. Strategy, software, automation, and execution as one operating layer.</p>
            <p className="footer-address">O-621, Block-A, EON Fairfox, Sector-140A, Noida.</p>
          </div>
        </div>

        <nav className="footer-col" aria-label="Footer navigation">
          <span>Explore</span>
          <Link href="/services">Services</Link>
          <Link href="/approach">Approach</Link>
          <Link href="/labs">Labs</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="footer-col">
          <span>Contact</span>
          <a href="mailto:contact@pravarontechnologies.com">contact@pravarontechnologies.com</a>
        </div>
      </div>

      <div className="footer-baseline">
        <span>Pravaron Technologies Pvt. Ltd.</span>
        <span>Agentic AI Infrastructure for Future-Ready Businesses</span>
      </div>
    </footer>
  );
}





