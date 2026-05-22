# Theme System Guide

## How it works

- Default theme is **dark** (class="dark" on `<html>`)
- Light mode adds class **"light"** to `<html>` instead
- CSS variables in `globals.css` handle both
- `ThemeProvider` in `src/context/ThemeContext.tsx` manages state
- The anti-flash script in `layout.tsx` prevents FOUT (Flash of Unstyled Theme)

---

## tailwind.config.ts — REQUIRED CHANGE

You must enable class-based dark mode. Add this to your `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",   // <-- ADD THIS LINE
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
```

---

## Updating your other components

For each component in `src/components/`, replace hardcoded colors with CSS variables or the utility classes defined in `globals.css`.

### Pattern reference

| Old (hardcoded dark)       | New (theme-aware)                         |
|----------------------------|-------------------------------------------|
| `bg-black`                 | `bg-page` or `style={{ background: 'var(--bg-page)' }}` |
| `bg-[#111]`                | `bg-surface`                              |
| `text-white`               | `text-primary`                            |
| `text-white/70`            | `text-secondary`                          |
| `text-white/40`            | `text-muted`                              |
| `border-white/10`          | `border-theme`                            |
| `border-white/20`          | `border-theme-strong`                     |
| `bg-[#1a1a1a]`             | `bg-surface-2`                            |

### Example: updating a section component

```tsx
// BEFORE
<section className="bg-black py-16">
  <h2 className="text-white text-3xl">Our Plants</h2>
  <p className="text-white/70">Browse our collection</p>
  <div className="border border-white/10 bg-[#111] rounded-lg p-6">
    ...
  </div>
</section>

// AFTER
<section className="bg-page py-16">
  <h2 className="text-primary text-3xl">Our Plants</h2>
  <p className="text-secondary">Browse our collection</p>
  <div className="border border-theme bg-surface rounded-lg p-6">
    ...
  </div>
</section>
```

### For inline styles (if you use them)

```tsx
// BEFORE
style={{ background: '#111', color: '#fff' }}

// AFTER  
style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
```

---

## Files you need to update

Go through each of these and apply the pattern above:

1. `src/components/FelineSection.tsx`
2. `src/components/Footer.tsx`
3. `src/components/GardenSection.tsx`
4. `src/components/IntroSection.tsx`
5. `src/components/ResourcesSection.tsx`

The Header and Hero are already done.
The Header itself stays green (`bg-[#4a7c23]`) in both modes since
it's brand color — only the page content areas switch.