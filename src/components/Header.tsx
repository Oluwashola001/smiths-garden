"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";

type NavLink = {
  name: string;
  href: string;
  external?: boolean;
};

type DropdownItem = {
  name: string;
  href: string;
  subItems?: { name: string; href: string }[];
};

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.845L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="white"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2"/>
  </svg>
);

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.78a4.85 4.85 0 0 1-1.01-.09z"/>
  </svg>
);

const socialBrandColors: Record<string, string> = {
  Facebook: "#1877F2",
  X: "#ffffff",
  LinkedIn: "#0A66C2",
  YouTube: "#FF0000",
  Instagram: "#E1306C",
  Pinterest: "#E60023",
  TikTok: "#ffffff",
};

function DesktopResourcesMenu({ resourcesDropdown }: { resourcesDropdown: DropdownItem[] }) {
  const [open, setOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div
      className="relative h-full flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => { setOpen(false); setHoveredIdx(null); }}
    >
      <button className="flex items-center gap-1 text-[9px] xl:text-[10px] tracking-wide uppercase font-semibold text-white hover:text-white/70 transition-colors px-1.5 xl:px-2 py-1 whitespace-nowrap">
        Resources
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
  className="absolute top-[100%] left-1/2 -translate-x-1/2 w-72 bg-[#4a7c23] shadow-xl border border-white/20 py-2 flex flex-col z-50 overflow-y-auto resources-dropdown"
  style={{ 
    maxHeight: "calc(100vh - 120px)",
    scrollbarWidth: "none",       // Firefox
    msOverflowStyle: "none",      // IE
  }}
>
          {resourcesDropdown.map((dropLink, idx) => (
            <div
              key={idx}
              className="relative"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <Link
                href={dropLink.href}
                style={{
                  borderLeft: hoveredIdx === idx ? "2px solid #FFFF00" : "2px solid transparent",
                  background: hoveredIdx === idx ? "rgba(255,255,0,0.12)" : "transparent",
                  paddingLeft: hoveredIdx === idx ? "14px" : "16px",
                }}
                className="py-2.5 pr-4 text-[11px] font-semibold text-white flex justify-between items-center w-full transition-all duration-150"
              >
                {dropLink.name}
                {dropLink.subItems && <ChevronRight className="w-3 h-3 opacity-70 shrink-0" />}
              </Link>

              {/* FIX 3: was "right-full" (opened to the left), changed to "left-full" so it opens to the RIGHT */}
              {dropLink.subItems && hoveredIdx === idx && (
                <div className="absolute top-0 left-full w-48 bg-[#3d6a1b] shadow-lg border border-white/20 py-2 flex flex-col z-[60]">
                  {dropLink.subItems.map((sub, sIdx) => (
                    <Link
                      key={sIdx}
                      href={sub.href}
                      className="px-4 py-2.5 text-[11px] font-semibold text-white/85 hover:text-white transition-colors"
                      style={{ borderLeft: "2px solid transparent" }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,0,0.12)";
                        (e.currentTarget as HTMLElement).style.borderLeftColor = "#FFFF00";
                        (e.currentTarget as HTMLElement).style.paddingLeft = "14px";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.borderLeftColor = "transparent";
                        (e.currentTarget as HTMLElement).style.paddingLeft = "16px";
                      }}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function HamburgerButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <div className="w-5 h-4 flex flex-col justify-between">
        <span
          className="block h-0.5 w-full bg-white rounded-full origin-center transition-all duration-300 ease-in-out"
          style={{ transform: isOpen ? "translateY(7px) rotate(45deg)" : "none" }}
        />
        <span
          className="block h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out"
          style={{ width: isOpen ? "0%" : "75%", opacity: isOpen ? 0 : 1 }}
        />
        <span
          className="block h-0.5 w-full bg-white rounded-full origin-center transition-all duration-300 ease-in-out"
          style={{ transform: isOpen ? "translateY(-7px) rotate(-45deg)" : "none" }}
        />
      </div>
    </button>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => {
      if (headerRef.current) {
        const h = headerRef.current.getBoundingClientRect().height;
        document.documentElement.style.setProperty("--header-height", `${h}px`);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // FIX 1: prevent body scroll (and thus page shift) when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const mainNavLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about-us/" },
    { name: "Smith's Cartaway Concrete", href: "https://smithscartawayconcrete.com/", external: true },
    { name: "Shop Our Inventory", href: "https://shop.smithsgardentown.com/inventory/", external: true },
    { name: "Link Tree", href: "/link-tree/" },
    { name: "Smith's Stone Yard", href: "/smiths-stone-yard/" },
  ];

  const trailingNavLinks: NavLink[] = [
    { name: "Employment Application", href: "/employment-application/" },
    { name: "Contact", href: "/contact-us/" },
  ];

  const shopLink: NavLink = {
    name: "Shop Our Inventory",
    href: "https://shop.smithsgardentown.com/inventory/",
    external: true,
  };

  const resourcesDropdown: DropdownItem[] = [
    { name: "Smith's Cart-Away Concrete", href: "https://smithscartawayconcrete.com/" },
    { name: "Hydrangea not Blooming?", href: "#" },
    { name: "Recommended Perennial and Bedding Plants", href: "/resources/perennial-bedding-plants/" },
    {
      name: "E-Newsletters",
      href: "/e-newsletters/",
      subItems: [{ name: "2025 Newsletters", href: "/e-newsletters/" }],
    },
    { name: "Blog", href: "/blog/" },
    { name: "Subscribe-Email Club", href: "/resources/subscribe-email-club/" },
    { name: "Customer Testimonials", href: "/customer-testimonials/" },
    { name: "Daily Savings Club", href: "/resources/daily-savings-club/" },
    { name: "Gardening Calendar", href: "/resources/gardening-calendar/" },
    { name: "Recommended Trees & Shrubs", href: "/resources/recommended-trees-shrubs/" },
    { name: "Caring For New Sod", href: "/resources/caring-new-sod/" },
    { name: "Vegetable Garden Planting Guide", href: "/resources/vegetable-garden-planting-guide/" },
    { name: "Gardening Links", href: "/resources/gardening-links/" },
    { name: "Gardening FAQ's", href: "/resources/gardening-faqs-2/" },
    { name: "How To Start Seed", href: "#" },
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, href: "https://facebook.com", label: "Facebook" },
    { icon: <XIcon />, href: "https://x.com", label: "X" },
    { icon: <LinkedInIcon />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <YouTubeIcon />, href: "https://youtube.com", label: "YouTube" },
    { icon: <InstagramIcon />, href: "https://instagram.com", label: "Instagram" },
    { icon: <PinterestIcon />, href: "https://pinterest.com", label: "Pinterest" },
    { icon: <TikTokIcon />, href: "https://tiktok.com", label: "TikTok" },
  ];

  return (
    // FIX 1: overflow-x-hidden stops the off-screen drawer creating horizontal scroll/page shift
    <header ref={headerRef} className="w-full z-50 sticky top-0 shadow-md bg-[#4a7c23]" style={{ overflowX: "clip" }}>

      {/* ── Top bar ── */}
      <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-6">
        {/* Mobile layout */}
        <div className="flex lg:hidden items-center justify-between py-2">
          <Link href="/" className="flex items-center pl-1">
            <img src="/logo1.png" alt="Smith's Gardentown" className="h-10 w-auto" />
          </Link>
          <HamburgerButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center py-2">
          <div aria-hidden="true" />
          <div className="flex items-center justify-center">
            {/* FIX 2: smaller logo at lg, full size only at xl */}
            <Link href="/" className="flex items-center shrink-0 mr-6 xl:mr-10">
              <img src="/logo1.png" alt="Smith's Gardentown" className="h-10 lg:h-11 xl:h-14 w-auto" />
            </Link>
            <div className="flex items-center gap-2 xl:gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  onMouseEnter={() => setHoveredSocial(s.label)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  style={{
                    color: hoveredSocial === s.label ? socialBrandColors[s.label] : "rgba(255,255,255,0.75)",
                    transform: hoveredSocial === s.label ? "scale(1.35)" : "scale(1)",
                    transition: "color 0.2s ease, transform 0.2s ease",
                    display: "inline-flex",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div aria-hidden="true" />
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="w-full border-t border-white/20" />

      {/* ── Desktop Nav bar ── */}
      {/* FIX 2: tighter padding/font at lg so links fit at 100% zoom; loosens up at xl */}
      <div className="hidden lg:block w-full max-w-[1400px] mx-auto px-2 xl:px-6">
        <nav className="flex items-center justify-center gap-x-0 xl:gap-x-1 py-1.5 xl:py-2">
          {mainNavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.external ? "_blank" : "_self"}
              className="text-[9px] xl:text-[10px] tracking-wide uppercase font-semibold text-white hover:text-white/70 transition-colors px-1.5 xl:px-2 py-1 whitespace-nowrap underline-offset-4 hover:underline"
            >
              {link.name}
            </Link>
          ))}

          <DesktopResourcesMenu resourcesDropdown={resourcesDropdown} />

          {trailingNavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[9px] xl:text-[10px] tracking-wide uppercase font-semibold text-white hover:text-white/70 transition-colors px-1.5 xl:px-2 py-1 whitespace-nowrap underline-offset-4 hover:underline"
            >
              {link.name}
            </Link>
          ))}

          <Link
            href={shopLink.href}
            target="_blank"
            className="ml-1 xl:ml-2 px-2.5 xl:px-4 py-1.5 xl:py-2 text-[9px] xl:text-[10px] tracking-wide uppercase font-bold bg-[#FFFF00] text-[#2d4e10] hover:bg-[#e6e600] transition-colors whitespace-nowrap rounded-sm"
          >
            {shopLink.name}
          </Link>
        </nav>
      </div>

      {/* ── Mobile overlay backdrop ── */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* ── Mobile Drawer ── */}
      {/* FIX 4: added opacity + smoother easing curve to the slide animation */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-[#3a6b1b] z-50 shadow-2xl flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/15 shrink-0">
          <span className="text-white/60 font-bold text-xs uppercase tracking-widest">Menu</span>
          <HamburgerButton isOpen={true} onClick={() => setIsOpen(false)} />
        </div>

        <div className="flex items-center justify-center gap-5 px-5 py-4 border-b border-white/15 shrink-0">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-white/65 hover:text-white transition-all duration-150 hover:scale-110"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* FIX 4: staggered slide-in per nav item */}
        <nav className="flex-1 overflow-y-auto">
          {[...mainNavLinks, ...trailingNavLinks].map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.external ? "_blank" : "_self"}
              className="flex items-center justify-between px-5 py-4 text-[13px] uppercase font-bold text-white/85 hover:text-white hover:bg-white/10 active:bg-white/15 border-b border-white/10"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateX(0)" : "translateX(16px)",
                transition: `opacity 0.3s ease ${i * 0.04}s, transform 0.3s ease ${i * 0.04}s`,
              }}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
              <ChevronRight className="w-3.5 h-3.5 opacity-35 shrink-0" />
            </Link>
          ))}

          <div
            className="border-b border-white/10"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateX(0)" : "translateX(16px)",
              transition: `opacity 0.3s ease ${[...mainNavLinks, ...trailingNavLinks].length * 0.04}s, transform 0.3s ease ${[...mainNavLinks, ...trailingNavLinks].length * 0.04}s`,
            }}
          >
            <button
              onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
              className="w-full flex items-center justify-between px-5 py-4 text-[13px] uppercase font-bold text-white/85 hover:text-white hover:bg-white/10 transition-colors"
            >
              Resources
              <ChevronDown
                className={`w-3.5 h-3.5 opacity-60 transition-transform duration-250 shrink-0 ${
                  mobileResourcesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{ maxHeight: mobileResourcesOpen ? "1200px" : "0px" }}
            >
              <div className="bg-black/10 py-1">
                {resourcesDropdown.map((dropLink, idx) => (
                  <div key={idx}>
                    <Link
                      href={dropLink.href}
                      className="flex items-center justify-between pl-8 pr-5 py-3 text-[12px] font-semibold text-white/75 hover:text-white hover:bg-white/10 transition-colors"
                      onClick={() => { if (!dropLink.subItems) setIsOpen(false); }}
                    >
                      {dropLink.name}
                      {dropLink.subItems && <ChevronRight className="w-3 h-3 opacity-40 shrink-0" />}
                    </Link>
                    {dropLink.subItems && (
                      <div className="border-l-2 border-white/20 ml-8 mb-1">
                        {dropLink.subItems.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            href={sub.href}
                            className="block pl-4 pr-5 py-2.5 text-[11px] font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="px-5 py-5 border-t border-white/15 shrink-0">
          <Link
            href={shopLink.href}
            target="_blank"
            className="block w-full py-3.5 text-[13px] uppercase font-bold bg-[#FFFF00] text-[#2d4e10] text-center rounded hover:bg-[#e6e600] active:bg-[#d4d400] transition-colors shadow-md"
            onClick={() => setIsOpen(false)}
          >
            {shopLink.name}
          </Link>
        </div>
      </div>
    </header>
  );
}