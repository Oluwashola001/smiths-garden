"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  MapPin, Phone, ChevronDown,
} from "lucide-react";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaYoutube, FaInstagram, FaPinterestP, FaTiktok } from "react-icons/fa6";

/* ════════════════════════════════════════════
   DESIGN TOKENS
════════════════════════════════════════════ */
const G  = "#4a7c23";
const GL = "#6db33f";
const BG = "#000000";
const T1 = "#f2f0e8";
const T2 = "rgba(242,240,232,0.50)";
const T3 = "rgba(242,240,232,0.25)";

/* ════════════════════════════════════════════
   DATA
════════════════════════════════════════════ */
const SOCIALS = [
  { Icon: FaFacebookF,  href: "https://facebook.com/smithsgardentown",         label: "Facebook",  color: "#1877F2" },
  { Icon: FaXTwitter,   href: "https://x.com/smithsgardentown",                label: "X",         color: "#000000" },
  { Icon: FaLinkedinIn, href: "https://linkedin.com/company/smithsgardentown", label: "LinkedIn",  color: "#0A66C2" },
  { Icon: FaYoutube,    href: "https://youtube.com/@smithsgardentown",         label: "YouTube",   color: "#FF0000" },
  { Icon: FaInstagram,  href: "https://instagram.com/smithsgardentown",        label: "Instagram", color: "#E1306C" },
  { Icon: FaPinterestP, href: "https://pinterest.com/smithsgardentown",        label: "Pinterest", color: "#E60023" },
  { Icon: FaTiktok,     href: "https://tiktok.com/@smithsgardentown",          label: "TikTok",    color: "#000000" },
];

const NAV_LINKS = [
  { label: "Terms & Conditions", href: "/terms"   },
  { label: "Privacy Policy",     href: "/privacy" },
  { label: "Contact Us",         href: "/contact" },
];

const REFUND_PARAGRAPHS = [
  "Smith's Gardentown will make a full refund for non-plant merchandise purchased at full price and returned in good condition within 30 days of purchase with our receipt. Credit card purchases will be refunded to the customer's credit card.",
  "PLANTS must be returned in good condition within 2 days of purchase for full refund.",
  "TREES and SHRUBS carry a 6-month replacement warranty at 50% of the original cost of the plants, which may only be applied to a replacement plant. Our receipt showing the date of purchase is required.",
  "SEASONAL or HOLIDAY merchandise and/or merchandise purchased on sale is not subject to refund.",
];

/* ════════════════════════════════════════════
   HELPERS
════════════════════════════════════════════ */
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return { ref, inView, delay };
}

function Divider() {
  return (
    <div
      className="w-full h-px"
      style={{ background: "rgba(74,124,35,0.2)" }}
    />
  );
}

/* ════════════════════════════════════════════
   SOCIAL ROW
════════════════════════════════════════════ */
function SocialRow() {
  const { ref, inView } = useReveal(0.05);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center justify-center gap-3 flex-wrap"
    >
      {SOCIALS.map(({ Icon, href, label, color }, i) => (
        <SocialIcon key={label} Icon={Icon} href={href} label={label} color={color} delay={i * 0.05} inView={inView} />
      ))}
    </motion.div>
  );
}

function SocialIcon({
  Icon, href, label, color, delay, inView,
}: {
  Icon: React.ElementType;
  href: string;
  label: string;
  color: string;
  delay: number;
  inView: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
      style={{
        background: hov ? color : "rgba(255,255,255,0.05)",
        border: `1px solid ${hov ? color : "rgba(255,255,255,0.10)"}`,
        boxShadow: hov ? `0 0 20px ${color}66` : "none",
      }}
    >
      <Icon
        className="w-4 h-4 transition-colors duration-300"
        style={{ color: hov ? "#fff" : T2 }}
      />
    </motion.a>
  );
}

/* ════════════════════════════════════════════
   NAV LINKS
════════════════════════════════════════════ */
function NavLinks() {
  const { ref, inView } = useReveal(0.1);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center justify-center gap-2 flex-wrap"
    >
      {NAV_LINKS.map(({ label, href }, i) => (
        <span key={label} className="flex items-center gap-2">
          <Link
            href={href}
            className="text-[0.65rem] font-bold uppercase tracking-widest transition-colors duration-200"
            style={{ color: T2 }}
            onMouseEnter={(e) => (e.currentTarget.style.color = GL)}
            onMouseLeave={(e) => (e.currentTarget.style.color = T2 as string)}
          >
            {label}
          </Link>
          {i < NAV_LINKS.length - 1 && (
            <span style={{ color: T3, fontSize: "0.5rem" }}>|</span>
          )}
        </span>
      ))}
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   BBB BADGE
════════════════════════════════════════════ */
function BBBBadge() {
  const { ref, inView } = useReveal(0.12);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="flex justify-center"
    >
      <a
        href="https://www.bbb.org"
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-opacity duration-200 hover:opacity-80"
      >
        <img
          src="/bbb-badge.png"
          alt="BBB Accredited Business — A+ Rating"
          className="h-14 w-auto object-contain"
        />
      </a>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   ADDRESS BAR
════════════════════════════════════════════ */
function AddressBar() {
  const { ref, inView } = useReveal(0.14);
  const items = [
    { Icon: null,    text: "Smith's Gardentown Farms" },
    { Icon: MapPin,  text: "4940 Seymour Highway, Wichita Falls, Texas" },
    { Icon: Phone,   text: "(940) 692-7100" },
    { Icon: null,    text: "#LetsGrow" },
  ];
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center justify-center gap-2 flex-wrap text-center"
    >
      {items.map(({ Icon, text }, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {Icon && <Icon className="w-3 h-3 shrink-0" style={{ color: GL }} />}
          <span
            className="text-[0.68rem] font-semibold"
            style={{
              color: i === 0 ? T1 : i === 3 ? GL : T2,
              fontStyle: i === 3 ? "italic" : "normal",
            }}
          >
            {text}
          </span>
          {i < items.length - 1 && (
            <span className="ml-1" style={{ color: T3, fontSize: "0.45rem" }}>|</span>
          )}
        </span>
      ))}
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   REFUND POLICY — accordion
════════════════════════════════════════════ */
function RefundPolicy() {
  const [open, setOpen] = useState(false);
  const { ref, inView } = useReveal(0.16);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-2xl mx-auto"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl transition-all duration-200"
        style={{
          background: open ? "rgba(74,124,35,0.12)" : "rgba(255,255,255,0.03)",
          border: `1px solid ${open ? G + "66" : "rgba(255,255,255,0.08)"}`,
        }}
      >
        <span
          className="text-[0.6rem] font-bold uppercase tracking-[0.25em]"
          style={{ color: open ? GL : T2 }}
        >
          Refund Policy
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-3.5 h-3.5" style={{ color: open ? GL : T3 }} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="refund-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div
              className="mt-3 rounded-xl p-5 flex flex-col gap-3"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: `1px solid ${G}33`,
              }}
            >
              {REFUND_PARAGRAPHS.map((p, i) => (
                <p
                  key={i}
                  className="text-[0.7rem] leading-relaxed text-center"
                  style={{ color: T2, fontWeight: i > 0 ? 600 : 400 }}
                >
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   BOTTOM BAR
════════════════════════════════════════════ */
function BottomBar() {
  const { ref, inView } = useReveal(0.2);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="flex flex-col items-center gap-3 pt-4 pb-8"
    >
      <p className="text-[0.62rem] font-bold uppercase tracking-widest" style={{ color: T3 }}>
        Copyright 2026 Smith's Gardentown · All Rights Reserved
      </p>
      <p className="text-[0.64rem] text-center leading-relaxed" style={{ color: T2 }}>
        Monday – Friday&nbsp;&nbsp;9 a.m. – 6:00 p.m.&nbsp;&nbsp;
        <span style={{ color: T3 }}>|</span>&nbsp;&nbsp;
        Saturday&nbsp;&nbsp;9 a.m. – 5:00 p.m.&nbsp;&nbsp;
        <span style={{ color: T3 }}>|</span>&nbsp;&nbsp;
        Sunday&nbsp;&nbsp;12 p.m. – 5 p.m.
      </p>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════ */
export default function Footer() {
  return (
    <footer
      style={{
        background: BG,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          height: 2,
          background: `linear-gradient(to right, transparent 0%, ${G} 30%, ${GL} 50%, ${G} 70%, transparent 100%)`,
        }}
      />

      {/* Subtle green glow from top */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -80,
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 200,
          background: `radial-gradient(ellipse at center, ${G}18 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center gap-7 pt-10">
        <SocialRow />
        <Divider />
        <NavLinks />
        <BBBBadge />
        <Divider />
        <AddressBar />
        <Divider />
        <RefundPolicy />
        <Divider />
        <BottomBar />
      </div>
    </footer>
  );
}