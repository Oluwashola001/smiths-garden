"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const videos = [
  "/videos/vid1.mp4",
  "/videos/vid2.mp4",
  "/videos/vid3.mp4",
];

/* ─────────────────────────────────────────────
   DESKTOP: Triptych panel
───────────────────────────────────────────── */
function TriptychPanel({
  src,
  index,
  isCenter,
}: {
  src: string;
  index: number;
  isCenter: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.play().catch(() => {});
    }
  }, []);

  return (
    <motion.div
      initial={{ y: 80, opacity: 0, scale: 0.94 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{
        duration: 1.1,
        delay: 0.2 + index * 0.18,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative overflow-hidden flex-1"
      style={{
        borderRadius: isCenter ? "1.5rem" : "1rem",
        marginTop: isCenter ? "0" : "0rem",   /* ← adjust this to shift side panels up/down */
        marginBottom: isCenter ? "0" : "3rem",
        boxShadow: isCenter
          ? "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1.5px rgba(255,255,255,0.12)"
          : "0 16px 48px rgba(0,0,0,0.55)",
      }}
    >
      {isCenter && (
        <div
          className="absolute inset-0 z-10 pointer-events-none rounded-[1.5rem]"
          style={{ boxShadow: "inset 0 0 0 1.5px rgba(255,255,0,0.25)" }}
        />
      )}

      <video
        ref={ref}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)",
        }}
      />

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 1.2 + index * 0.15 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-[10px] tracking-[0.25em] uppercase font-light"
      >
        0{index + 1}
      </motion.span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MOBILE: Auto-cycling single video
───────────────────────────────────────────── */
function MobileVideoCarousel() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = () => {
    if (transitioning) return;
    const nextIdx = (current + 1) % videos.length;
    setNext(nextIdx);
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(nextIdx);
      setNext(null);
      setTransitioning(false);
    }, 900);
  };

  useEffect(() => {
    timerRef.current = setTimeout(advance, 4500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, transitioning]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        key={current}
        src={videos[current]}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: transitioning ? 0 : 1,
          transition: "opacity 0.9s ease",
        }}
      />

      <AnimatePresence>
        {next !== null && (
          <motion.video
            key={`next-${next}`}
            src={videos[next]}
            autoPlay
            muted
            playsInline
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (i === current || transitioning) return;
              setNext(i);
              setTransitioning(true);
              setTimeout(() => {
                setCurrent(i);
                setNext(null);
                setTransitioning(false);
              }, 900);
            }}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? "20px" : "6px",
              height: "6px",
              background: i === current ? "#FFFF00" : "rgba(255,255,255,0.45)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function Hero() {
  return (
    <main className="min-h-screen bg-black">
      <section className="relative w-full overflow-hidden" style={{ height: "100svh", minHeight: 600, overflowAnchor: "none" }}>

        {/* ── DESKTOP: triptych — top padding reduced to shift panels up ── */}
        <div className="hidden md:flex absolute inset-0 items-stretch gap-3 px-6 pb-8 pt-3 z-0">
          {videos.map((src, i) => (
            <TriptychPanel key={src} src={src} index={i} isCenter={i === 1} />
          ))}
        </div>

        {/* ── MOBILE: cycling single video ── */}
        <div className="md:hidden absolute inset-0 z-0">
          <MobileVideoCarousel />
        </div>

        {/* ── Global overlays ── */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 35%, transparent 50%, rgba(0,0,0,0.72) 100%)",
          }}
        />

        {/* ── Content layer ──
            Mobile:  justify-center  → headline + CTA sit in the vertical middle
            Desktop: justify-end     → headline + CTA sit near the bottom, shifted up via pb
        ── */}
        <div className="relative z-20 h-full flex flex-col justify-end md:justify-end px-6 md:px-10 xl:px-16 py-8 md:py-10 max-w-[1600px] mx-auto w-full">

          {/* HEADLINE + CTA */}
          <div className="flex flex-col items-start gap-6 pb-24 md:pb-26">  {/* ← pb-24 = mobile distance from bottom; md:pb-16 = desktop */}

            {/* #LetsGROW */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="block font-black text-white leading-none"
                style={{
                  fontSize: "clamp(3rem, 8vw, 7rem)",
                  fontFamily: "'Georgia', serif",
                  textShadow: "0 4px 32px rgba(0,0,0,0.55)",
                  letterSpacing: "-0.02em",
                }}
              >
                #Lets
                <span style={{ color: "#4a7c23" }}>GROW</span>
              </span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.7, delay: 1.5 }}
                className="block h-[2px] mt-2"
                style={{ background: "linear-gradient(to right, #22c55e, transparent)" }}
              />
            </motion.div>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="flex flex-wrap gap-3"
            >
              {/* Primary CTA */}
              <Link
                href="https://shop.smithsgardentown.com/inventory/"
                target="_blank"
                className="group relative flex items-center gap-2.5 overflow-hidden"
                style={{
                  padding: "0.65rem 1.5rem",
                  borderRadius: "0.5rem",
                  background: "#4a7c23",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  boxShadow: "0 4px 20px rgba(34,197,94,0.35)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "#77b844";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 28px rgba(34,197,94,0.45)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "#4a7c23";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(34,197,94,0.35)";
                }}
              >
                Shop Our Inventory
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>

              {/* Secondary ghost CTA */}
              <Link
                href="/resources/"
                className="flex items-center gap-2"
                style={{
                  padding: "0.65rem 1.4rem",
                  borderRadius: "0.5rem",
                  border: "1px solid rgba(255,255,255,0.35)",
                  color: "rgba(255,255,255,0.88)",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  backdropFilter: "blur(8px)",
                  background: "rgba(255,255,255,0.07)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.14)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.6)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.35)";
                }}
              >
                Explore Resources
              </Link>
            </motion.div>

          </div>
        </div>

        {/* ── Desktop: decorative panel spacers ── */}
        <div className="hidden md:flex absolute inset-0 z-10 pointer-events-none items-stretch gap-3 px-6 pb-8 pt-3">
          {[0, 1, 2].map(i => (
            <div key={i} className="flex-1" />
          ))}
        </div>

      </section>
    </main>
  );
}