"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

/* ════════════════════════════════════════════
   DESIGN TOKENS
════════════════════════════════════════════ */
const G  = "#4a7c23";
const GL = "#6db33f";
const Y  = "#FFFF00";
const BG = "#000000";
const T1 = "#f2f0e8";
const T2 = "rgba(242,240,232,0.52)";

/* ════════════════════════════════════════════
   SHARED: SCROLL-REVEAL
════════════════════════════════════════════ */
function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeIn({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   PART 1A — MOBILE IMAGE STACK
   Three images revealed one by one on scroll
════════════════════════════════════════════ */
function MobileImageStack() {
  const images = [
    { src: "/garden-main.jpg",     label: "Beautify" },
    { src: "/garden-accent-1.jpg", label: "Your Garden" },
    { src: "/garden-accent-2.jpg", label: "Each Season" },
  ];

  return (
    /* Only visible on mobile */
    <div className="lg:hidden flex flex-col gap-4 mb-10">
      {images.map((img, i) => {
        const ref = useRef<HTMLDivElement>(null);
        const inView = useInView(ref, { once: true, margin: "-60px" });

        return (
          <motion.div
            key={i}
            ref={ref}
            initial={{ opacity: 0, y: 48, scale: 0.96 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full overflow-hidden rounded-2xl"
            style={{
              height: i === 0 ? "260px" : "180px",
              boxShadow: "0 0 0 1px rgba(74,124,35,0.18), 0 16px 48px rgba(0,0,0,0.7)",
            }}
          >
            <img
              src={img.src}
              alt={img.label}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Bottom gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)",
              }}
            />
            {/* Label chip */}
            <span
              className="absolute bottom-3 left-3 text-[9px] font-bold uppercase tracking-[0.22em] px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(0,0,0,0.6)",
                color: GL,
                border: "1px solid rgba(74,124,35,0.3)",
              }}
            >
              {img.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════
   PART 1B — DESKTOP IMAGE MOSAIC (2×2 grid)
════════════════════════════════════════════ */
function DesktopImageMosaic() {
  const [hov, setHov] = useState<number | null>(null);

  const images = [
    { src: "/garden-main.jpg",     alt: "Smith's Gardentown garden landscape" },
    { src: "/garden-accent-1.jpg", alt: "Garden seasonal items" },
    { src: "/garden-accent-2.jpg", alt: "Pottery and outdoor décor" },
  ];

  return (
    /* Only visible on desktop */
    <div
      className="hidden lg:grid grid-cols-2 grid-rows-2 gap-3"
      style={{ height: "520px" }}
    >
      {/* Large image — spans both rows on left */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`relative rounded-2xl overflow-hidden cursor-pointer ${i === 0 ? "row-span-2" : ""}`}
          style={{
            boxShadow:
              i === 0
                ? "0 0 0 1px rgba(74,124,35,0.2), 0 24px 64px rgba(0,0,0,0.75)"
                : "0 0 0 1px rgba(74,124,35,0.15), 0 12px 32px rgba(0,0,0,0.6)",
          }}
          onMouseEnter={() => setHov(i)}
          onMouseLeave={() => setHov(null)}
        >
          <motion.img
            src={images[i].src}
            alt={images[i].alt}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ scale: hov === i ? 1.06 : 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)" }}
          />
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{ opacity: hov === i ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ boxShadow: `inset 0 0 0 1.5px ${G}` }}
          />
          {i === 2 && (
            <span
              className="absolute bottom-3 left-3 text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
              style={{ background: "rgba(0,0,0,0.65)", color: GL, border: "1px solid rgba(74,124,35,0.3)" }}
            >
              Each Season
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════
   PART 1 — GARDEN SHOWCASE
════════════════════════════════════════════ */
function GardenShowcase() {
  const categories = [
    "Pottery", "Statuary", "Bird Baths",
    "Home Décor", "Outdoor Furniture", "Seasonal Items",
  ];

  return (
    <div className="w-full px-5 sm:px-10 xl:px-20 pt:20 md:pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-10 xl:gap-16 items-center">

        {/* Images — mobile stack or desktop mosaic */}
        <FadeUp delay={0}>
          <MobileImageStack />
          <DesktopImageMosaic />
        </FadeUp>

        {/* Text */}
        <div className="flex flex-col gap-6">
          <FadeUp delay={0.1}>
            <span
              className="inline-block text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{ color: GL }}
            >
              Beyond the Garden
            </span>
            <h2
              className="mt-2 text-3xl md:text-4xl xl:text-5xl font-black leading-tight"
              style={{
                fontFamily: "'Georgia', serif",
                color: T1,
                letterSpacing: "-0.025em",
              }}
            >
              Enjoy Your{" "}
              <span style={{ color: G }}>Garden</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.16}>
            <div className="h-px w-12" style={{ background: G }} />
          </FadeUp>

          <FadeUp delay={0.22}>
            <p className="text-[15px] md:text-base leading-[1.9]" style={{ color: T2 }}>
              Enjoy your garden that you put so much time and hard work into.&nbsp; Each season
              Smith's stocks up with fun and unique items that are perfect for all types of
              landscapes.&nbsp; We have pottery, statuary, bird baths, and home decor items that
              work great for you, and make fantastic gifts. We are sure to have what you need,
              and if we don't just let us know and we will see what we can order.
            </p>
          </FadeUp>

          {/* Category chips */}
          <FadeUp delay={0.28}>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, i) => (
                <motion.span
                  key={cat}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.32 + i * 0.055, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block text-[11px] font-semibold px-3.5 py-1.5 rounded-full"
                  style={{
                    background: "rgba(74,124,35,0.12)",
                    border: "1px solid rgba(74,124,35,0.28)",
                    color: GL,
                  }}
                >
                  {cat}
                </motion.span>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   PART 2 — EMAIL CLUB BANNER (redesigned)
════════════════════════════════════════════ */
function EmailClub() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const [hov, setHov] = useState(false);

  return (
    <div ref={sectionRef} className="w-full px-5 sm:px-10 xl:px-20 py-10 pb-24">
      <FadeIn delay={0}>
        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 2px 0 rgba(74,124,35,0.4) inset, 0 40px 100px rgba(0,0,0,0.65)",
          }}
        >
          {/* ── Background layers ── */}
          <div className="absolute inset-0 z-0">
            {/* Parallax dark base */}
            <motion.div className="absolute inset-0" style={{ y: bgY }}>
              <div
                className="w-full h-full"
                style={{
                  background: `
                    radial-gradient(ellipse 55% 80% at 8% 50%, rgba(74,124,35,0.18) 0%, transparent 60%),
                    radial-gradient(ellipse 40% 60% at 92% 50%, rgba(74,124,35,0.10) 0%, transparent 55%),
                    linear-gradient(145deg, #0a0f07 0%, #060806 60%, #050605 100%)
                  `,
                }}
              />
            </motion.div>

            {/* Dot grid */}
            <div
              className="absolute inset-0 opacity-[0.028]"
              style={{
                backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: `linear-gradient(to right, transparent 0%, ${G} 30%, ${G} 70%, transparent 100%)`,
              }}
            />
          </div>

          {/* ── Desktop: side-by-side ── */}
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-0 px-8 md:px-0 py-14 md:py-16">

            {/* LEFT — icon + decorative */}
            <div className="hidden md:flex flex-col items-center justify-center w-64 xl:w-80 shrink-0 px-10 self-stretch border-r"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              {/* Glowing icon */}
              <motion.div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
                style={{
                  background: "rgba(74,124,35,0.12)",
                  border: "1px solid rgba(74,124,35,0.3)",
                }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(74,124,35,0.1)",
                    "0 0 50px rgba(74,124,35,0.28)",
                    "0 0 20px rgba(74,124,35,0.1)",
                  ],
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Mail className="w-9 h-9" style={{ color: GL }} />
              </motion.div>

              {/* Decorative label stack */}
              <span
                className="text-[9px] font-bold uppercase tracking-[0.3em] text-center block"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                Smith's Gardentown
              </span>
            </div>

            {/* RIGHT — text + CTA */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-5 flex-1 md:px-12 xl:px-16">

              {/* Mobile icon */}
              <div className="md:hidden">
                <motion.div
                  className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center"
                  style={{
                    background: "rgba(74,124,35,0.12)",
                    border: "1px solid rgba(74,124,35,0.3)",
                    boxShadow: "0 0 32px rgba(74,124,35,0.18)",
                  }}
                >
                  <Mail className="w-6 h-6" style={{ color: GL }} />
                </motion.div>
              </div>

              {/* Eyebrow */}
              <span
                className="inline-block text-[10px] font-bold uppercase tracking-[0.3em]"
                style={{ color: GL }}
              >
                Stay in the Loop
              </span>

              {/* Headline — white */}
              <h2
                className="text-3xl sm:text-4xl md:text-4xl xl:text-5xl font-black leading-[1.05]"
                style={{
                  fontFamily: "'Georgia', serif",
                  color: "#ffffff",
                  letterSpacing: "-0.025em",
                }}
              >
                Be sure to sign up for our{" "}
                <span style={{ color: Y }}>E-mail Club!</span>
              </h2>

              {/* Sub */}
              <p className="text-sm md:text-base" style={{ color: T2 }}>
                Receive important information and fun ideas via e mail.
              </p>

              {/* CTA */}
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/resources/subscribe-email-club/"
                  className="group inline-flex items-center gap-3 font-bold text-sm uppercase tracking-[0.1em]"
                  style={{
                    background: hov ? Y : G,
                    color: hov ? "#1a3a08" : "#fff",
                    padding: "0.8rem 2rem",
                    borderRadius: "0.6rem",
                    boxShadow: hov
                      ? "0 6px 32px rgba(255,255,0,0.28)"
                      : "0 4px 24px rgba(74,124,35,0.4)",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={() => setHov(true)}
                  onMouseLeave={() => setHov(false)}
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  Click Here to Sign Up
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>

            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════ */
export default function GardenSection() {
  return (
    <section style={{ background: BG, borderTop: "1px solid rgba(74,124,35,0.15)" }}>
      <GardenShowcase />
      <EmailClub />
    </section>
  );
}