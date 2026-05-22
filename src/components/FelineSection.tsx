"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

/* ════════════════════════════════════════════
   DESIGN TOKENS
════════════════════════════════════════════ */
const G  = "#4a7c23";
const GL = "#6db33f";
const Y  = "#FFFF00";
const BG = "#000000";
const T1 = "#f2f0e8";
const T2 = "rgba(242,240,232,0.50)";

const GIFT_CARD_URL =
  "https://shop.smithsgardentown.com/subdept/156/smith-s-gardentown-gift-card";

/* ════════════════════════════════════════════
   IMAGE TARGETS — save in /public/
   ─────────────────────────────────────────
   cat-lionel.webp
   cat-callie.webp
   cat-sylvester.webp
   cat-petunia-poppy.webp
   cat-romeo.webp
   card.png   ← the gift card image
════════════════════════════════════════════ */

const CATS = [
  { src: "/cat-lionel.webp",        name: "Lionel"          },
  { src: "/cat-callie.webp",        name: "Callie"          },
  { src: "/cat-sylvester.webp",     name: "Sylvester"       },
  { src: "/cat-petunia-poppy.webp", name: "Petunia & Poppy" },
  { src: "/cat-romeo.webp",         name: "Romeo"           },
];

const GIFT_CARDS = [
  { amount: "$25", label: "Classic"   },
  { amount: "$50", label: "Classic"   },
  { amount: "$200", label: "Premium" },
];

/* ════════════════════════════════════════════
   SHARED: per-element scroll reveal
════════════════════════════════════════════ */
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-55px" });
  return { ref, inView, delay };
}

/* ════════════════════════════════════════════
   PART A — FELINE STAFF  (full-width gallery)
════════════════════════════════════════════ */
function FelineGallery() {
  return (
    <div className="w-full px-5 sm:px-10 xl:px-20 pt-20 pb-14">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-10">

        {/* ── Heading ── */}
        {(() => {
          const { ref, inView } = useReveal(0);
          return (
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] mb-3" style={{ color: GL }}>
                Meet
              </p>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-black italic leading-tight"
                style={{ fontFamily: "'Georgia', serif", color: GL, letterSpacing: "-0.02em" }}
              >
                Our Feline Staff.
              </h2>
              <p
                className="text-xl sm:text-2xl font-black italic mt-1"
                style={{ fontFamily: "'Georgia', serif", color: T2 }}
              >
                They are Puuurrrrfect!
              </p>

              {/* Decorative rule */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="h-px w-20" style={{ background: `linear-gradient(to left, ${G}, transparent)` }} />
                <span className="text-lg select-none">🐾</span>
                <div className="h-px w-20" style={{ background: `linear-gradient(to right, ${G}, transparent)` }} />
              </div>
            </motion.div>
          );
        })()}

        {/* ── Desktop: 5-across portrait grid ── */}
        <div className="hidden md:grid md:grid-cols-5 gap-4 lg:gap-5">
          {CATS.map((cat, i) => (
            <CatPortrait key={cat.name} cat={cat} delay={0.08 + i * 0.1} />
          ))}
        </div>

        {/* ── Mobile: 2-col grid, individual scroll-reveal ── */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {CATS.map((cat, i) => (
            <MobileCatCard key={cat.name} cat={cat} index={i} total={CATS.length} />
          ))}
        </div>

      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Desktop cat portrait card
──────────────────────────────────────────── */
function CatPortrait({ cat, delay }: { cat: typeof CATS[number]; delay: number }) {
  const { ref, inView } = useReveal(delay);
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-3"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{
          aspectRatio: "3 / 4",
          boxShadow: hov
            ? `0 0 0 2px ${G}, 0 28px 60px rgba(0,0,0,0.8)`
            : `0 0 0 1px rgba(255,255,255,0.06), 0 16px 40px rgba(0,0,0,0.65)`,
          transition: "box-shadow 0.35s ease",
        }}
      >
        <motion.img
          src={cat.src}
          alt={cat.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
          animate={{ scale: hov ? 1.06 : 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.2) 35%, transparent 60%)",
          }}
        />
        <motion.span
          className="absolute top-3 right-3 text-base select-none"
          animate={{ opacity: hov ? 1 : 0, scale: hov ? 1 : 0.5 }}
          transition={{ duration: 0.22 }}
        >
          🐾
        </motion.span>
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <p
            className="text-sm font-black text-center leading-tight"
            style={{
              fontFamily: "'Georgia', serif",
              color: hov ? Y : T1,
              transition: "color 0.25s ease",
              textShadow: "0 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            {cat.name}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   Mobile cat card
──────────────────────────────────────────── */
function MobileCatCard({
  cat, index, total,
}: { cat: typeof CATS[number]; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const isLastOdd = total % 2 !== 0 && index === total - 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.78, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
      className={isLastOdd ? "col-span-2 w-full" : ""}
    >
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{
          aspectRatio: isLastOdd ? "16 / 9" : "3 / 4",
          boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 10px 28px rgba(0,0,0,0.6)`,
        }}
      >
        <img
          src={cat.src}
          alt={cat.name}
          className={`absolute inset-0 w-full h-full object-cover ${isLastOdd ? "object-center" : "object-top"}`}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
          <p
            className="text-xs font-black text-center"
            style={{
              fontFamily: "'Georgia', serif",
              color: T1,
              textShadow: "0 1px 6px rgba(0,0,0,0.8)",
            }}
          >
            {cat.name}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   PART B — GIFT CARD SECTION
════════════════════════════════════════════ */
function GiftCardSection() {
  const { ref: headRef, inView: headInView } = useReveal(0);

  return (
    <div className="w-full px-5 sm:px-10 xl:px-20 pb-24">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-12">

        {/* ── Section heading ── */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center flex flex-col items-center gap-4"
        >
          {/* Divider above */}
          <div className="flex items-center gap-4 w-full max-w-xs">
            <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${G})` }} />
            <span className="text-base select-none">🎁</span>
            <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${G})` }} />
          </div>

          <p className="text-[10px] font-bold uppercase tracking-[0.32em]" style={{ color: GL }}>
            The Perfect Present
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black italic leading-tight"
            style={{ fontFamily: "'Georgia', serif", color: Y, letterSpacing: "-0.02em" }}
          >
            Grab a Gift Card
          </h2>
          <p
            className="text-base md:text-lg max-w-lg leading-relaxed"
            style={{ color: T2 }}
          >
            A Smith's Gardentown Gift Card makes a great gift!<br />
            Purchase on-line or in-store today!
          </p>
        </motion.div>

        {/* ── Three gift card tiles ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {GIFT_CARDS.map((card, i) => (
            <GiftCardTile key={card.amount} card={card} delay={0.1 + i * 0.12} />
          ))}
        </div>

      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Individual gift card tile
──────────────────────────────────────────── */
function GiftCardTile({
  card,
  delay,
}: {
  card: { amount: string; label: string };
  delay: number;
}) {
  const { ref, inView } = useReveal(delay);
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-5"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Card image */}
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{
          aspectRatio: "5 / 3",
          boxShadow: hov
            ? `0 0 0 2px ${GL}, 0 28px 60px rgba(0,0,0,0.85)`
            : `0 0 0 1px rgba(74,124,35,0.25), 0 16px 40px rgba(0,0,0,0.65)`,
          transition: "box-shadow 0.35s ease",
        }}
      >
        <motion.img
          src="/card.webp"
          alt={`Smith's Gardentown ${card.amount} Gift Card`}
          className="absolute inset-0 w-full h-full object-cover object-center"
          animate={{ scale: hov ? 1.04 : 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Amount badge — top-left */}
        <div
          className="absolute top-3 left-3 px-3 py-1 rounded-lg"
          style={{
            background: hov ? Y : "rgba(0,0,0,0.75)",
            border: `1.5px solid ${hov ? Y : "rgba(255,255,255,0.15)"}`,
            transition: "all 0.25s ease",
            backdropFilter: "blur(6px)",
          }}
        >
          <span
            className="text-sm font-black"
            style={{
              fontFamily: "'Georgia', serif",
              color: hov ? "#1a3a08" : T1,
              transition: "color 0.25s ease",
            }}
          >
            {card.amount}
          </span>
        </div>

        {/* Label badge — top-right */}
        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-lg"
          style={{
            background: `rgba(74,124,35,${hov ? "0.85" : "0.55"})`,
            border: `1px solid rgba(109,179,63,0.4)`,
            backdropFilter: "blur(6px)",
            transition: "background 0.25s ease",
          }}
        >
          <span
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: T1 }}
          >
            {card.label}
          </span>
        </div>
      </div>

      {/* Amount label + CTA */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p
            className="text-2xl font-black italic"
            style={{ fontFamily: "'Georgia', serif", color: T1 }}
          >
            {card.amount}
          </p>
          <p
            className="text-[10px] font-bold uppercase tracking-[0.25em]"
            style={{ color: GL }}
          >
            Gift Card
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
          <Link
            href={GIFT_CARD_URL}
            target="_blank"
            className="group flex items-center justify-center gap-2 w-full py-3 rounded-xl text-[0.625rem] font-bold uppercase tracking-wider"
            style={{
              background: hov ? Y : "rgba(255,255,0,0.07)",
              border: `1.5px solid ${hov ? Y : "rgba(255,255,0,0.22)"}`,
              color: hov ? "#1a3a08" : Y,
              transition: "all 0.25s ease",
            }}
          >
            Buy Now
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════ */
export default function FelineSection() {
  return (
    <section style={{ background: BG, borderTop: "1px solid rgba(74,124,35,0.15)" }}>
      <FelineGallery />

      {/* Divider between cat gallery and gift cards */}
      <div className="w-full px-5 sm:px-10 xl:px-20 pb-16">
        <div
          className="max-w-[1400px] mx-auto h-px"
          style={{ background: `linear-gradient(to right, transparent, ${G}55, transparent)` }}
        />
      </div>

      <GiftCardSection />
    </section>
  );
}