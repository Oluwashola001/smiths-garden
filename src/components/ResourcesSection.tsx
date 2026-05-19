"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

/* ════════════════════════════════════════════
   DESIGN TOKENS
════════════════════════════════════════════ */
const G  = "#4a7c23";
const GL = "#6db33f";
const BG = "#000000";
const T1 = "#f2f0e8";
const T2 = "rgba(242,240,232,0.50)";

/* ════════════════════════════════════════════
   IMAGE TARGETS — save these in /public/
   ─────────────────────────────────────────
   icon-calendar.png   ← green  calendar circle
   icon-sod.png        ← yellow grass circle
   icon-tree.png       ← blue   tree circle
   icon-blog.png       ← orange plant/pot circle
   thumbs-up.png       ← colorful thumbs-up crowd
════════════════════════════════════════════ */

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

/* ════════════════════════════════════════════
   3-D TILT WRAPPER
════════════════════════════════════════════ */
function TiltCard({ children, className = "" }: {
  children: React.ReactNode; className?: string;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 22 });
  const sy = useSpring(my, { stiffness: 180, damping: 22 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ["9deg", "-9deg"]);
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-9deg", "9deg"]);
  const glowX   = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);
  const glowY   = useTransform(sy, [-0.5, 0.5], ["0%", "100%"]);
  const [hov, setHov] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); setHov(false); };

  return (
    <motion.div
      className={className}
      style={{ perspective: "900px" }}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={onLeave}
    >
      <motion.div
        style={{
          rotateX, rotateY,
          transformStyle: "preserve-3d",
          height: "100%",
          position: "relative",
          borderRadius: "1.25rem",
          overflow: "hidden",
        }}
      >
        {children}
        {/* Specular cursor highlight */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 rounded-[1.25rem]"
          style={{
            opacity: hov ? 1 : 0,
            background: `radial-gradient(circle 160px at ${glowX} ${glowY}, rgba(255,255,255,0.06), transparent 70%)`,
            transition: "opacity 0.3s",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   RESOURCE CARD DATA
════════════════════════════════════════════ */
const RESOURCES = [
  {
    img:   "/icon-calendar.png",
    glow:  "rgba(74,124,35,0.35)",
    ring:  "rgba(74,124,35,0.3)",
    title: "Gardening Calendar",
    href:  "/resources/gardening-calendar/",
    body: (
      <>
        Need to know what to plant when and how to care for your landscape? View our{" "}
        <Link href="/resources/gardening-calendar/" className="underline underline-offset-2 hover:text-white transition-colors" style={{ color: "#6db33f" }}>
          Gardening Calendar.
        </Link>
      </>
    ),
  },
  {
    img:   "/icon-sod.png",
    glow:  "rgba(200,185,0,0.28)",
    ring:  "rgba(200,185,0,0.28)",
    title: "Sod Care",
    href:  "/resources/caring-new-sod/",
    body: (
      <>
        Instructions on{" "}
        <Link href="/resources/caring-new-sod/" className="underline underline-offset-2 hover:text-white transition-colors" style={{ color: "#6db33f" }}>
          how to care for Sod.
        </Link>
      </>
    ),
  },
  {
    img:   "/icon-tree.png",
    glow:  "rgba(58,103,179,0.32)",
    ring:  "rgba(58,103,179,0.3)",
    title: "Tree and Shrub Planting",
    href:  "/resources/recommended-trees-shrubs/",
    body:  "Need to know when and how to plant trees and shrubs.",
  },
  {
    img:   "/icon-blog.png",
    glow:  "rgba(210,80,20,0.28)",
    ring:  "rgba(210,80,20,0.25)",
    title: "Garden Blog",
    href:  "/garden-blog/",
    body: (
      <>
        And, be sure and check our informative{" "}
        <Link href="/garden-blog/" className="underline underline-offset-2 hover:text-white transition-colors" style={{ color: "#6db33f" }}>
          Garden Blog.
        </Link>{" "}
        Read the latest from Katherine Smith.
      </>
    ),
  },
];

/* ════════════════════════════════════════════
   SINGLE RESOURCE CARD
════════════════════════════════════════════ */
function ResourceCard({
  img, glow, ring, title, href, body,
}: (typeof RESOURCES)[number]) {
  const [hov, setHov] = useState(false);

  return (
    <TiltCard className="h-full">
      <motion.div
        className="flex flex-col items-center text-center h-full px-6 pt-10 pb-8 gap-5"
        style={{
          background: "#0c0c0c",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "1.25rem",
          boxShadow: hov
            ? `0 0 0 1px ${ring}, 0 28px 70px rgba(0,0,0,0.7)`
            : "0 20px 56px rgba(0,0,0,0.55)",
          transition: "box-shadow 0.35s ease",
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Icon with glow halo */}
        <div className="relative flex items-center justify-center">
          {/* Ambient glow behind icon */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "120px", height: "120px",
              background: glow,
              filter: "blur(20px)",
            }}
            animate={{ opacity: hov ? 1 : 0.4, scale: hov ? 1.2 : 1 }}
            transition={{ duration: 0.4 }}
          />
          <motion.img
            src={img}
            alt={title}
            className="relative z-10 w-24 h-24 object-contain drop-shadow-lg"
            animate={{ y: hov ? -6 : 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        {/* Title */}
        <h3
          className="text-xl font-black leading-tight"
          style={{
            fontFamily: "'Georgia', serif",
            color: T1,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h3>

        {/* Thin rule */}
        <div
          className="w-8 h-px mx-auto"
          style={{ background: `linear-gradient(to right, transparent, ${G}, transparent)` }}
        />

        {/* Body */}
        <p className="text-sm leading-relaxed flex-1" style={{ color: T2 }}>
          {body}
        </p>

        {/* CTA arrow */}
        <Link
          href={href}
          className="group inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] mt-auto transition-colors"
          style={{ color: hov ? GL : "#fff" }}
        >
          View
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </motion.div>
    </TiltCard>
  );
}

/* ════════════════════════════════════════════
   PART 1 — RESOURCE CARDS GRID
════════════════════════════════════════════ */
function ResourceCards() {
  return (
    <div className="w-full px-5 sm:px-10 xl:px-20 pt-4 md:pt-14 pb-10">

      {/* Section label */}
      <FadeUp className="mb-12">
        <div className="flex items-center gap-4 max-w-[1400px] mx-auto">
          <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, rgba(74,124,35,0.4))` }} />
          <span className="text-[10px] font-bold uppercase tracking-[0.32em]" style={{ color: G }}>
            Resources
          </span>
          <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, rgba(74,124,35,0.4))` }} />
        </div>
      </FadeUp>

      {/* ── Desktop / Tablet: 4-col or 2×2 ── */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1400px] mx-auto">
        {RESOURCES.map((r, i) => (
          <FadeUp key={r.title} delay={i * 0.1} className="flex flex-col">
            <ResourceCard {...r} />
          </FadeUp>
        ))}
      </div>

      {/* ── Mobile: single-column scroll reveal ── */}
      <div className="flex flex-col gap-4 sm:hidden max-w-[1400px] mx-auto">
        {RESOURCES.map((r, i) => {
          const ref = useRef<HTMLDivElement>(null);
          const inView = useInView(ref, { once: true, margin: "-60px" });
          return (
            <motion.div
              key={r.title}
              ref={ref}
              initial={{ opacity: 0, x: i % 2 === 0 ? -36 : 36, scale: 0.97 }}
              animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <ResourceCard {...r} />
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}

/* ════════════════════════════════════════════
   PART 2 — SATISFACTION STRIP
════════════════════════════════════════════ */
function SatisfactionStrip() {
  return (
    <div className="w-full px-5 sm:px-10 xl:px-20 py-10 pb-24">
      <FadeUp delay={0}>
        <div
          className="relative max-w-[1400px] mx-auto overflow-hidden rounded-2xl"
          style={{
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 2px 0 rgba(74,124,35,0.35) inset, 0 32px 80px rgba(0,0,0,0.6)",
            background: `
              radial-gradient(ellipse 50% 80% at 0% 50%, rgba(74,124,35,0.12) 0%, transparent 60%),
              linear-gradient(135deg, #0a0e07 0%, #060806 60%, #050605 100%)
            `,
          }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(to right, ${G}, rgba(74,124,35,0.2) 60%, transparent 100%)` }}
          />

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0 px-8 md:px-0 py-12 md:py-14">

            {/* Text — takes most of the width */}
            <div className="flex-1 md:pl-12 xl:pl-16 text-center md:text-left">
              <p
                className="text-base md:text-lg xl:text-xl font-semibold leading-[1.8]"
                style={{ color: T1, maxWidth: "680px" }}
              >
                Our goal is to make your visit to Smith's Gardentown Farms a pleasurable one!
                We want you, our customer, to be totally satisfied. If you have questions or
                comments please feel free to{" "}
                <Link
                  href="/contact/"
                  className="font-black underline underline-offset-4 transition-colors hover:text-white"
                  style={{ color: "#FFFF00" }}
                >
                  Contact Us.
                </Link>{" "}
                We would enjoy hearing from you!
              </p>
            </div>

            {/* Thumbs-up image */}
            <div className="shrink-0 md:pr-10 xl:pr-14 flex items-center justify-center">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.06, rotate: 2 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Subtle glow behind image */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, rgba(74,124,35,0.25) 0%, transparent 70%)",
                    filter: "blur(24px)",
                    transform: "scale(1.3)",
                  }}
                />
                <img
                  src="/thumbs-up.png"
                  alt="Our goal is your satisfaction"
                  className="relative z-10 w-36 h-auto md:w-44 xl:w-52 object-contain"
                  style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.6))" }}
                />
              </motion.div>
            </div>

          </div>
        </div>
      </FadeUp>
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════ */
export default function ResourcesSection() {
  return (
    <section style={{ background: BG }}>
      <ResourceCards />
      <SatisfactionStrip />
    </section>
  );
}