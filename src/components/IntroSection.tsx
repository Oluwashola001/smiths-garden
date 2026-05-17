"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, MessageSquare, Phone } from "lucide-react";
import Link from "next/link";

/* ════════════════════════════════════════════
   DESIGN TOKENS
════════════════════════════════════════════ */
const G = "#4a7c23";       // brand green
const GL = "#6db33f";      // lighter green
const Y = "#FFFF00";       // brand yellow
const BG = "#000000";      // section background
const CARD = "#0c0c0c";    // card surface
const BORDER = "rgba(255,255,255,0.07)";
const T1 = "#f2f0e8";      // primary text
const T2 = "rgba(242,240,232,0.52)"; // secondary text

/* ════════════════════════════════════════════
   SHARED: FADE-UP ON SCROLL
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
   SHARED: 3-D TILT CARD WRAPPER
════════════════════════════════════════════ */
function TiltCard({ children, className = "", style = {} }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 24 });
  const sy = useSpring(my, { stiffness: 200, damping: 24 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-10deg", "10deg"]);
  const glowX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["0%", "100%"]);
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); setHovered(false); };

  return (
    <motion.div
      className={className}
      style={{ perspective: "900px", ...style }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
    >
      <motion.div
        style={{
          rotateX, rotateY,
          transformStyle: "preserve-3d",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          borderRadius: "1.25rem",
        }}
      >
        {children}

        {/* Moving specular highlight */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[1.25rem] z-30"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(circle 180px at ${glowX} ${glowY}, rgba(255,255,255,0.07), transparent 70%)`,
            transition: "opacity 0.3s",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   ROW 1 — EVENTS BANNER
════════════════════════════════════════════ */
function EventsRow() {
  return (
    <div className="w-full px-5 sm:px-10 xl:px-20 pt-20 pb-10">
      <FadeUp>
        <div
          className="relative flex flex-col sm:flex-row items-center gap-8 md:gap-14 rounded-2xl overflow-hidden px-8 md:px-14 py-10 md:py-12"
          style={{
            background: `linear-gradient(130deg, #0c160a 0%, #0a0a0a 60%, #0d120a 100%)`,
            border: `1px solid rgba(74,124,35,0.22)`,
            boxShadow: `0 0 60px rgba(74,124,35,0.08), 0 2px 0 rgba(74,124,35,0.3) inset`,
          }}
        >
          {/* Left green bar accent */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1"
            style={{ background: `linear-gradient(to bottom, transparent, ${G}, transparent)` }}
          />

          {/* Image */}
          <motion.div
            whileHover={{ scale: 1.04, rotate: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="shrink-0 w-40 h-40 sm:w-52 sm:h-52 rounded-2xl overflow-hidden"
            style={{
              boxShadow: `0 0 0 1px rgba(74,124,35,0.35), 0 20px 50px rgba(0,0,0,0.8)`,
            }}
          >
            <img
              src="https://smithsgardentown.com/wp-content/uploads/2025/12/Smiths-Gardentown-Events-300x300.jpeg"
              alt="View the Classes and Events happening at Smith's Gardentown."
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Text block */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-5 flex-1">
            <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${G}55, transparent)` }} />

            <h3
              className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight"
              style={{ fontFamily: "'Georgia', serif", color: T1, letterSpacing: "-0.02em" }}
            >
              View the Classes and Events happening
              <br className="hidden sm:block" />{" "}
              <span style={{ color: GL }}>at Smith's Gardentown.</span>
            </h3>

            <Link
              href="https://shop.smithsgardentown.com/inventory/"
              target="_blank"
              className="group inline-flex items-center gap-3 font-bold text-xs uppercase tracking-[0.14em]"
              style={{
                background: G, color: "#fff",
                padding: "0.75rem 1.75rem", borderRadius: "0.5rem",
                boxShadow: `0 4px 28px rgba(74,124,35,0.45)`,
                transition: "all 0.22s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = GL;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 36px rgba(74,124,35,0.6)`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = G;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 28px rgba(74,124,35,0.45)`;
              }}
            >
              <ArrowRight className="w-4 h-4" />
              CLICK HERE
            </Link>

            <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${G}55, transparent)` }} />
          </div>
        </div>
      </FadeUp>
    </div>
  );
}

/* ════════════════════════════════════════════
   ROW 2 — ABOUT / SUPERSTORE (EDITORIAL SPLIT)
════════════════════════════════════════════ */
function AboutRow() {
  return (
    <div className="w-full px-5 sm:px-10 xl:px-20 py-16 md:py-24">
      <div className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-start max-w-[1400px] mx-auto">

        {/* LEFT: Big decorative "76" typographic anchor */}
        {/* FIX 1: increased stroke opacity and added a subtle text-shadow so it reads on black */}
        <FadeUp delay={0} className="hidden md:block">
          <div className="relative select-none">
            <span
              className="block font-black leading-none"
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(8rem, 14vw, 13rem)",
                color: "transparent",
                WebkitTextStroke: `2px rgba(74,124,35,0.75)`,
                filter: "drop-shadow(0 0 18px rgba(74,124,35,0.35))",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              76
            </span>
            <span
              className="absolute inset-0 flex items-center justify-center text-[11px] font-bold uppercase tracking-[0.35em]"
              style={{ color: `${GL}cc` }}
            >
              Years
            </span>
          </div>
        </FadeUp>

        {/* RIGHT: Content */}
        <div>
          <FadeUp delay={0.08}>
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] mb-3" style={{ color: GL }}>
              Est. 1940s · Wichita Falls, TX
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-black mb-8 leading-tight"
              style={{
                fontFamily: "'Georgia', serif",
                color: G,
                letterSpacing: "-0.025em",
              }}
            >
              Smith's Gardentown Gardening Superstore
            </h2>
          </FadeUp>

          <FadeUp delay={0.15}>
            {/* Thin rule */}
            <div className="h-px w-16 mb-7" style={{ background: G }} />
            <p className="text-sm md:text-[15px] leading-[1.85] mb-5" style={{ color: T2 }}>
              For 76 years Smith's Gardentown Farms has served Texoma providing our customers
              with the best in products, services and advice. Founded by C.O. Smith, Sr., in
              the 1940's, the family business operated for many years under the direction of
              Curtis W. Smith, and continues with his children, Katherine and Steve Smith.
            </p>
            <p className="text-sm md:text-[15px] leading-[1.85]" style={{ color: T2 }}>
              When you walk through the door at Smith's Gardentown Farms in Wichita Falls,
              Texas, you immediately realize that you are about to have a pleasurable shopping
              experience.&nbsp;Smith's Gardentown Farms provides Bedding Plants, Trees, Shrubs,
              Fertilizer, Potting Soil, Outdoor Furniture and many fun and unique accessories
              to create a beautiful landscape for your home.
            </p>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   CARD A — SMITH'S GARDEN TEXT CLUB (built in code)
════════════════════════════════════════════ */
function TextClubCard() {
  return (
    <TiltCard
      className="h-full"
      style={{ height: "100%" }}
    >
      {/* Depth layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(74,124,35,0.18) 0%, transparent 65%),
            linear-gradient(180deg, #0d180a 0%, #080c06 100%)
          `,
        }}
      />

      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top green line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-20"
        style={{ background: `linear-gradient(to right, transparent, ${G}, transparent)` }} />

      {/* Card content */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full px-7 pt-10 pb-8 text-center gap-6">

        {/* Card 1 logo: bigger, shifted down */}
        <div className="flex flex-col items-center mt-2">
          <motion.img
            src="/logo1.png"
            alt="Smith's Gardentown"
            className="w-48 h-48 object-contain -mb-13"
            animate={{ filter: ["drop-shadow(0 0 10px rgba(74,124,35,0.2))", "drop-shadow(0 0 22px rgba(74,124,35,0.4))", "drop-shadow(0 0 10px rgba(74,124,35,0.2))"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Label + headline sit directly below the image */}
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-1" style={{ color: `${GL}99` }}>
            Smith's Gardentown
          </p>
          <h3
            className="text-2xl font-black leading-tight"
            style={{ fontFamily: "'Georgia', serif", color: T1, letterSpacing: "-0.02em" }}
          >
            Garden<br />
            <span style={{ color: Y }}>Text Club</span>
          </h3>
        </div>

        {/* Divider */}
        <div className="w-full h-px" style={{ background: `linear-gradient(to right, transparent, rgba(74,124,35,0.4), transparent)` }} />

        {/* CTA info */}
        <div className="flex flex-col gap-3 w-full">
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ background: "rgba(74,124,35,0.12)", border: "1px solid rgba(74,124,35,0.2)" }}
          >
            <MessageSquare className="w-4 h-4 shrink-0" style={{ color: GL }} />
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-wider font-bold mb-0.5" style={{ color: T2 }}>Text the word</p>
              <p className="text-sm font-black" style={{ color: Y, letterSpacing: "0.05em" }}>SMITHS</p>
            </div>
          </div>

          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ background: "rgba(74,124,35,0.12)", border: "1px solid rgba(74,124,35,0.2)" }}
          >
            <Phone className="w-4 h-4 shrink-0" style={{ color: GL }} />
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-wider font-bold mb-0.5" style={{ color: T2 }}>to</p>
              <p className="text-sm font-black" style={{ color: T1 }}>1 (833) 339-0799</p>
            </div>
          </div>
        </div>

        {/* Fine print */}
        <p className="text-[9px] leading-relaxed text-center" style={{ color: "rgba(255,255,255,0.22)" }}>
          By submitting, you consent to receive recurring automated marketing texts from Smiths
          Gardentown. Consent not required for purchase. Msg&amp;Data rates may apply.{" "}
          <Link href="https://smithsgardentown.m.txttoi.com/legal/privacy-policy" target="_blank" className="underline hover:opacity-60 transition-opacity">Privacy Policy</Link>
          {" "}&amp;{" "}
          <Link href="https://smithsgardentown.m.txttoi.com/legal/terms-and-conditions" target="_blank" className="underline hover:opacity-60 transition-opacity">Terms of Service</Link>
        </p>
      </div>
    </TiltCard>
  );
}

/* ════════════════════════════════════════════
   CARD B — CARTAWAY CONCRETE (image hero)
   FIX 3: removed "Sister Company" badge, slightly greenish bg,
   image not clipped (object-contain so transparent PNG shows fully)
════════════════════════════════════════════ */
function CartawayCard() {
  const [hov, setHov] = useState(false);
  return (
    <TiltCard className="h-full" style={{ height: "100%" }}>
      {/* FIX 3a: slightly greenish card background so the transparent PNG has context */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(160deg, #0a140a 0%, #0c180b 50%, #091208 100%)`,
        }}
      />

      <Link
        href="https://smithscartawayconcrete.com/"
        target="_blank"
        rel="noopener"
        className="block h-full"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {/* Card 2: full-bleed image, shifted up via object-position */}
        <div className="absolute inset-x-0 z-0" style={{ top: "-25%", height: "130%" }}>
        <motion.img
          src="/cartaway-truck.png"
          alt="Smith's Cart-Away Concrete"
          className="w-full h-full object-cover"
          animate={{ scale: hov ? 1.26 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
          {/* Dark gradient for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 70%, transparent 100%)",
            }}
          />
          {/* Top edge fade */}
          <div
            className="absolute inset-x-0 top-0 h-24"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)" }}
          />
        </div>

        {/* Bottom text — no "Sister Company" badge */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] mb-1" style={{ color: `${GL}cc` }}>
            Portable Concrete · Ready Mix
          </p>
          <h3
            className="text-2xl md:text-3xl font-black mb-1 leading-tight"
            style={{ fontFamily: "'Georgia', serif", color: T1, letterSpacing: "-0.02em" }}
          >
            Smith's Cart-Away Concrete
          </h3>
          <p className="text-sm font-bold mb-4" style={{ color: T2 }}>
            940-692-7100
          </p>

          <motion.span
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg"
            style={{
              background: hov ? Y : "rgba(255,255,255,0.1)",
              color: hov ? "#1a3a08" : T1,
              border: `1px solid ${hov ? Y : "rgba(255,255,255,0.15)"}`,
              transition: "all 0.25s ease",
            }}
          >
            Click to Visit Website
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.span>
        </div>
      </Link>
    </TiltCard>
  );
}

/* ════════════════════════════════════════════
   CARD C — DAILY SAVINGS CLUB
   FIX 4: hang.png placed at top-right, slightly cut off (as intended),
   no other layout/text changes
════════════════════════════════════════════ */
function DailySavingsCard() {
  return (
    <TiltCard className="h-full" style={{ height: "100%" }}>
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 55% at 50% 100%, rgba(255,255,0,0.06) 0%, transparent 65%),
            linear-gradient(180deg, #0e0e0a 0%, #090908 100%)
          `,
        }}
      />

      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-20"
        style={{ background: `linear-gradient(to right, transparent, ${Y}99, transparent)` }} />

      {/* hang.png: full-width, no clipping, occupies ~30% of card from top */}
      <div className="absolute top-0 left-34 md:left-48 right-0 z-10 pointer-events-none"style={{ width: "70%" }}>
  <img
    src="/hang.png"
    alt=""
    className="w-full object-contain"
    style={{ display: "block" }}
  />
</div>

      {/* Content — pushed down to clear the image */}
      <div className="relative z-10 flex flex-col h-full px-7 pt-[38%] pb-8 gap-4">

        {/* Header */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2" style={{ color: `rgba(255,255,0,0.5)` }}>
            Members Only
          </p>
          <h3
            className="text-2xl font-black leading-tight mb-3"
            style={{ fontFamily: "'Georgia', serif", color: T1, letterSpacing: "-0.02em" }}
          >
            Daily Savings Club!
          </h3>
          <div className="h-px w-12" style={{ background: Y + "66" }} />
        </div>

        {/* Feature pills */}
        <div className="flex flex-col gap-3 flex-1">
          {[
            { stat: "15%", label: "off Bird Food · Every Day" },
            { stat: "$10", label: "Reward Bucks per $200 spent" },
          ].map(({ stat, label }, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4 px-4 py-4 rounded-xl"
              style={{
                background: "rgba(255,255,0,0.04)",
                border: "1px solid rgba(255,255,0,0.1)",
              }}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="text-3xl font-black leading-none shrink-0"
                style={{ fontFamily: "'Georgia', serif", color: Y }}
              >
                {stat}
              </span>
              <span className="text-sm font-semibold leading-snug" style={{ color: T2 }}>
                {label}
              </span>
            </motion.div>
          ))}

          <p className="text-xs font-semibold" style={{ color: T2 }}>
            Save and earn Reward Bucks! 15% off of Bird Food!
            <br />$10 Reward Bucks for every $200 you spend plus more!
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/resources/daily-savings-club/"
          className="group inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-200"
          style={{
            background: "rgba(255,255,0,0.1)",
            border: `1.5px solid rgba(255,255,0,0.25)`,
            color: Y,
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = Y;
            (e.currentTarget as HTMLElement).style.color = "#1a3a08";
            (e.currentTarget as HTMLElement).style.borderColor = Y;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,0,0.1)";
            (e.currentTarget as HTMLElement).style.color = Y;
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,0,0.25)";
          }}
        >
          Learn More
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </TiltCard>
  );
}

/* ════════════════════════════════════════════
   ROW 3 — THREE CARDS
════════════════════════════════════════════ */
function CardsRow() {
  const cards = [
    { component: <TextClubCard />, delay: 0 },
    { component: <CartawayCard />, delay: 0.12, featured: true },
    { component: <DailySavingsCard />, delay: 0.22 },
  ];

  return (
    <div className="w-full px-5 sm:px-10 xl:px-20 pb-20 md:pb-28">
      {/* Section label */}
      <FadeUp className="mb-8">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${G}44)` }} />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: G }}>
            More From Smith's
          </span>
          <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${G}44)` }} />
        </div>
      </FadeUp>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
        style={{ alignItems: "stretch" }}
      >
        {cards.map(({ component, delay, featured }, i) => (
          <FadeUp key={i} delay={delay} className="flex flex-col">
            <motion.div
              className="flex-1 flex flex-col rounded-[1.25rem] overflow-hidden"
              style={{
                background: CARD,
                border: `1px solid ${BORDER}`,
                boxShadow: featured
                  ? `0 0 0 1px rgba(74,124,35,0.18), 0 32px 80px rgba(0,0,0,0.7)`
                  : `0 20px 60px rgba(0,0,0,0.5)`,
                minHeight: featured ? "520px" : "480px",
              }}
              whileHover={{
                boxShadow: featured
                  ? `0 0 0 1px rgba(74,124,35,0.35), 0 40px 100px rgba(0,0,0,0.8)`
                  : `0 28px 70px rgba(0,0,0,0.65)`,
                y: -4,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {component}
            </motion.div>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════ */
export default function IntroSection() {
  return (
    <section
      style={{
        background: BG,
        borderTop: `1px solid rgba(74,124,35,0.2)`,
      }}
    >
      <EventsRow />
      <AboutRow />
      <CardsRow />
    </section>
  );
}