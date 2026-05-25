# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repository Is

`source-build-au` is a dark-themed portfolio/personal website built with React, TypeScript, Vite, and Tailwind CSS. It aggregates Claude Code skills from multiple upstream skill packages and exposes them as a Claude Code plugin.

### Two distinct concerns in one repo

1. **Portfolio website** (`src/`) — A single-page React app with animated sections
2. **Claude Code plugin** (`.claude-plugin/`, implied skills structure) — Aggregates trading, marketing, and engineering skills from upstream repos

---

## Development

```bash
npm run dev       # Vite dev server
npm run build     # TypeScript check + Vite production build
npm run preview   # Preview the production build locally
```

---

## Frontend Architecture

The app is a single-page layout rendered in `src/App.tsx`. Each visual section is its own component in `src/components/`:

- `LoadingScreen` — Splash/loading animation shown on first visit
- `Hero` — Landing section
- `SelectedWorks` — Portfolio pieces
- `Journal` — Writing/blog section
- `Explorations` — Side projects
- `Stats` — Key numbers/metrics
- `Contact` — Contact form or links

### Design Tokens

Tailwind is extended with CSS-variable–backed tokens in `tailwind.config.ts`:

| Token | Purpose |
|-------|---------|
| `bg` | Page background |
| `surface` | Card/panel backgrounds |
| `text-primary` | Body text |
| `muted` | Secondary text |
| `stroke` | Borders |
| `accent` | Highlight color |

Typography uses `font-body` (Inter) and `font-display` (Instrument Serif). Custom animations (`scroll-down`, `gradient-shift`, `subtle-zoom`, `pulse-glow`) are defined in the Tailwind config.

---

## Skill Aggregation

Skills are imported from three upstream packages:

| Package | Domain |
|---------|--------|
| `sjbrenchley89/claude-trading-skills` | Trading & finance (~54 skills) |
| `sjbrenchley89/marketingskills` | Marketing & growth (~40+ skills) |
| `sjbrenchley89/claude-skills1` | Engineering, product, leadership |

Install the full bundle:
```bash
npx skills add sjbrenchley89/source-build-au
```
