"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { navItems, services, capabilities } from "./data";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function DesktopNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="nav-pill" aria-label="Primary navigation">
      {navItems.map((item) => {
        const hasDropdown = item.label === "Services" || item.label === "Products";
        
        if (hasDropdown) {
          return (
            <div 
              key={item.href}
              className="nav-dropdown-wrapper"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                className={`nav-link ${isActive(pathname, item.href) ? "is-active" : ""}`}
                href={item.href}
              >
                {item.label}
                <ChevronDown size={14} style={{ marginLeft: '4px' }} />
              </Link>
              
              {openDropdown === item.label && (
                <div className="nav-dropdown">
                  {item.label === "Services" && (
                    <>
                      <div className="nav-dropdown-header">Our Services</div>
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services#${service.slug}`}
                          className="nav-dropdown-item"
                          onClick={() => setOpenDropdown(null)}
                        >
                          <strong>{service.title}</strong>
                          <p>{service.body}</p>
                        </Link>
                      ))}
                    </>
                  )}
                  
                  {item.label === "Products" && (
                    <>
                      <div className="nav-dropdown-header">Our Products</div>
                      <Link
                        href="/labs#mark8bot"
                        className="nav-dropdown-item"
                        onClick={() => setOpenDropdown(null)}
                      >
                        <strong>Mark8bot</strong>
                        <p>Social media campaign management with AI-assisted scheduling and responses.</p>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        }
        
        return (
          <Link
            key={item.href}
            className={`nav-link ${isActive(pathname, item.href) ? "is-active" : ""}`}
            href={item.href}
            aria-current={isActive(pathname, item.href) ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
      {session && (
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
        <strong>Pravaron Technologies</strong>
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
          <Link href="/labs">Products</Link>
        </nav>

        <div className="footer-col">
          <span>Company</span>
          <Link href="/about">About Us</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/contact">Contact</Link>
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





