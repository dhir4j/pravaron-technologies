"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { navItems, services } from "./data";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function DesktopNav() {
  const pathname = usePathname();
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
                        href="/products#mark8bot"
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
    </nav>
  );
}

export function MobileNav() {
  const pathname = usePathname();

  return (
    <details className="mobile-nav-wrap">
      <summary
        className="menu-button"
        aria-label="Toggle navigation"
      >
        <span />
        <span />
      </summary>

      <div className="mobile-backdrop" aria-hidden="true" />

      <div className="mobile-drawer">
        {navItems.map((item) => (
          <Link
            href={item.href}
            className={isActive(pathname, item.href) ? "is-active" : ""}
            aria-current={isActive(pathname, item.href) ? "page" : undefined}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </details>
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
        <span className="brand-mark" aria-hidden="true">
          <Image src="/images/pravaron-mark.png" alt="" width={48} height={42} priority />
        </span>
        <span className="brand-copy">
          <strong className="brand-name">Pravaron</strong>
          <small className="brand-qualifier">Technologies</small>
        </span>
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
          <div className="footer-brand-content">
            <Link href="/" className="footer-brand-lockup" aria-label="Pravaron Technologies home">
              <span className="footer-brand-mark" aria-hidden="true">
                <Image src="/images/pravaron-mark.png" alt="" width={56} height={48} />
              </span>
              <span className="footer-brand-copy">
                <strong>Pravaron</strong>
                <small>Technologies</small>
              </span>
            </Link>
            <p className="footer-statement">Agentic AI infrastructure for future-ready businesses. Strategy, software, automation, and execution as one operating layer.</p>
            <div className="footer-address">
              <p>O-621, Block-A, EON Fairfox, Sector-140A, Noida.</p>
            </div>
          </div>
        </div>

        <nav className="footer-col" aria-label="Footer navigation">
          <span>Explore</span>
          <Link href="/services">Services</Link>
          <Link href="/approach">Approach</Link>
          <Link href="/products">Products</Link>
        </nav>

        <div className="footer-col">
          <span>Company</span>
          <Link href="/about">About Us</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>

      <div className="footer-baseline">
        <span>© 2026 Pravaron Technologies Pvt. Ltd.</span>
        <span>Noida, India</span>
      </div>
    </footer>
  );
}





