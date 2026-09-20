# Worklog

## 2026-09-20 — v2 landing page: "Signal Blue" design pivot (Calendly-style)

### Context
User created `DESIGN.md` (repo root, untracked in git) containing a full Calendly.com-style
design reference: tokens, type scale, spacing, components, do's/don'ts, layout rules. Ran
`/goal` with the directive: build a v2 landing page following those rules exactly, tailor
content for this site (internship certification platform for Indian UG/PG students), best-practice
SEO and heading hierarchy, responsive, no em dashes (—) or em spaces, human-sounding copy,
production quality.

This is the site's **third** visual pivot. Order so far: navy/gold (original) -> Electric Blue
"Minimalist Modern" -> warm "Certified Amber" academic theme -> **current: "Signal Blue"
Calendly-inspired system**. Full history and rationale is in the auto-memory file
`project_design_system_pivot.md` (not in this repo — lives in the Claude Code memory dir for
this project). That memory file is the canonical long-term record; this worklog is a
session-scoped supplement in case memory isn't loaded.

### Scope decision
Interpreted "v2 landing page" as: the shared design system/tokens/primitives (which cascade
site-wide) + a full rebuild of the homepage (`app/(public)/page.tsx`) content and structure.
Did **not** rewrite about/benefits/contact/gallery/verify page copy — those pages keep their
existing markup and inherit the new tokens/fonts/component styling automatically with zero
page-level changes, same cascading pattern used in both prior pivots. Admin dashboard
(`app/admin/**`) also not touched directly; it inherits new tokens automatically via shared
`globals.css`/`layout.tsx` (intentional, matches prior pivots).

### Files changed

**`app/globals.css`** — full retoken to Calendly palette:
- `--background: #f8f9fb` (Cloud), `--foreground: #0b3558` (Ink Navy), `--muted: #f0f3f8`
  (Pebble), `--muted-foreground: #476788` (Slate Gray), `--border: #d4e0ed` (Hairline),
  `--card: #ffffff` (Paper)
- `--accent: #006bff` (Signal Blue), `--accent-secondary: #004eba` (Deep Cobalt, for pill
  badge text on `--badge-tint: #e6f0ff`)
- New decorative-only tokens: `--blob-magenta: #e55cff`, `--blob-cyan: #0099ff` — atmosphere
  only, never functional fills, per DESIGN.md's explicit rule
- Three blue-tinted shadow tokens (`--shadow-card`, `--shadow-product`, `--shadow-button`,
  all `rgba(71,103,136,...)`-based, never neutral black) — exposed through the existing
  `.shadow-accent` / `.shadow-accent-lg` utility class names so markup didn't need touching
- `.bg-gradient-accent` / `.text-gradient-accent` utility classes **kept** (many components
  reference them) but now resolve to flat solid Signal Blue — no more gradients anywhere,
  per DESIGN.md's "Don't add gradients to backgrounds" rule
- `.gradient-underline` (used under the highlighted hero word) changed from a gradient bar to
  a flat translucent Signal Blue bar

**`app/layout.tsx`** — dropped Fraunces (serif display) + Inter (body); both `--font-sans` and
`--font-display` now point to a single Manrope family (weights 400–700, the Gilroy substitute
DESIGN.md recommends). JetBrains Mono kept, only for certificate-code strings. Also upgraded
`metadata` export: added a title template, refined description, added an SEO `keywords` array.

**`components/ui/button.tsx`** — radius changed `rounded-full` (pill) -> `rounded-lg` (8px) per
DESIGN.md's explicit button-radius rule. Added two variants: `dark` (Ink Navy fill, "Dark CTA
Button") and `outline-white` (for buttons placed on dark/image backgrounds, e.g. the final CTA
section). Existing `primary`/`outline`/`ghost`/`danger` variants retoned, not restructured.

**`components/ui/badge.tsx`** — `SectionLabel` redesigned from a rule-line-and-caps eyebrow to
a proper Pill Badge (pebble-tint bg, deep-cobalt text, full pill radius, optional pulse dot),
matching DESIGN.md's defined "Pill Badge" component. Same prop API preserved (`pulse`, `dark`,
`className`). `Badge` tone variants retoned to match (`accent` tone now uses the pebble-tint bg).

**`components/ui/card.tsx`** — border/shadow retoned to hairline border + `--shadow-card` /
`--shadow-button` on hover (was neutral-shadow `shadow-md`/`shadow-xl`).

**`components/public/site-header.tsx`** — logo mark changed from gradient fill to solid
`bg-accent`. Structure unchanged (logo left / nav center-ish / CTA right already matched
DESIGN.md's described header layout).

**`components/public/site-footer.tsx`** — rebuilt from a dark inverted footer to a **light**
Cloud-background footer with Ink Navy link text and uppercase Slate Gray column headings, per
DESIGN.md's explicit Footer component spec (`#f8f9fb` bg). This is a reversal from both prior
pivots, which kept the footer dark — worth remembering if a future pivot reintroduces dark
chrome by default.

**`components/public/hero-graphic.tsx`** — replaced the Certified-Amber "Award icon in a
rotating dashed ring" seal motif with an "Elevated Product Card": a certificate-verification
widget mockup (cert code field + green "Certificate verified" result), backed by blurred
coral-magenta/sky-cyan decorative blobs, plus one floating stat chip. Matches DESIGN.md's
Calendly-style hero pattern (product visual + blob backdrop) instead of an abstract icon.

**`components/public/internship-card.tsx`** — card title bumped from `text-lg` (18px) to
`text-2xl font-bold` (24px) to satisfy DESIGN.md's explicit "don't set H3 below 24px" rule.
This component is shared with the `/internships` listing page too, so that page's card titles
changed size as a side effect (not visually reviewed this session — worth a quick look next
time `/internships` is touched).

**`app/(public)/page.tsx`** — homepage rewritten, not just retoned:
- New SEO-minded h1: "Real internships, **a certificate** employers can verify." (single h1,
  highlighted phrase using flat Signal Blue + underline, no gradient)
- All section H2s bumped to the 38px+ scale DESIGN.md requires, and most sections converted to
  **centered** Section Header Block layout (pill label + H2 + centered subtext, DESIGN.md's
  defined pattern) instead of the previous left-aligned layout
- Removed the real stock photo (`public/images/outdoor-study.jpg`) entirely from the "Real
  work, not busywork" section and replaced it with an abstract task-board UI mockup (Elevated
  Product Card style, blob backdrop) — DESIGN.md explicitly forbids photography/lifestyle
  imagery ("all visuals are product UI, abstract accent shapes... no photography"). This also
  sidesteps the pre-existing stock-photo/identifiable-person content-safety rule (see
  `project_content_placeholders.md` memory) rather than re-litigating it.
- Small decorative labels that don't carry real heading semantics (domain card names, team
  member names) changed from `<h3>` to `<p>` — avoids both heading-spam for SEO and conflict
  with the "no H3 below 24px" rule; step titles and the internship-card title, which *are*
  meaningful headings, were bumped to 24px instead
- Trust/stats band moved from a dark inverted section to a light band directly under the hero
  (matches DESIGN.md's "Trust Logo Strip" position/intent — used stat numbers instead of
  partner logos since the project's standing content-safety rule forbids fabricating real
  university/partner names or logos)
- Copy scrubbed for em dashes (found and removed one: "Not busywork — a real body of work" ->
  "Not busywork. A real body of work."); rewrote several section subheads/body copy for
  clarity and natural phrasing
- Final CTA section (dark Ink Navy inverted band, DESIGN.md's valid "Dark Surface") gained a
  second `outline-white` button linking to `/verify`

### Verification performed
- `npx eslint` on all changed files, then a full-project `npx eslint .` — clean, no errors
- `npx tsc --noEmit` across the whole project — no type errors
- Found that port 3000 was serving a **stale `next start` production build** (from well before
  today's changes — even predated the Certified Amber pivot, had leftover "Calistoga" font
  class in its HTML). This was not a dev server and did not reflect any of today's edits;
  left that process alone (didn't kill it, in case it's something the user runs deliberately)
  and instead started a temporary `next dev -p 3001` to verify against
- Installed Playwright (`npm install --no-save playwright@1.63.0`, not saved to package.json/
  lock) + reused an already-cached Chromium download to take real screenshots
- Full-page screenshots at 1440px (desktop) and 390px (mobile) after scrolling incrementally
  through the page first (required — this site's `whileInView` Framer Motion animations only
  render once their IntersectionObserver actually fires; a screenshot without scrolling first
  shows most sections stuck at `opacity:0`, per standing note in the design-pivot memory)
- Confirmed zero browser console errors on both viewports
- Visually reviewed the desktop screenshot section-by-section against DESIGN.md's component
  definitions (hero, trust strip, eligibility pills, domain grid, task-board mockup, featured
  internships, how-it-works, team, testimonials, FAQ accordion, final CTA, footer) — all read
  as intended, no gradients/pills/dark-footer leftovers from the old system
- Noticed a small black circle with "N" in the top-left of some screenshots — confirmed via a
  non-full-page crop that this is Next.js's dev-mode indicator overlay, not a real bug; won't
  appear in production
- Cleaned up afterward: killed the temporary port-3001 dev server, deleted the temporary
  screenshot scripts (`__screenshot_tmp.mjs`, `__crop_tmp.mjs`, `__crop_tmp2.mjs`), removed the
  temporary Playwright npm install. Confirmed final `git status --short` shows only the
  intended 15 modified files + untracked `DESIGN.md`, nothing stray

## 2026-09-20 (later) — Hero section redesign: full-width, bold, no floating elements

### Context
User directive after the Signal Blue pivot above: redesign the hero as a senior designer
would — "sleek, bold, eyecatchy," full width unlike the rest of the site's 1200px-capped
layout, no floating elements, and add good visual elements.

### Changes
- **`app/(public)/page.tsx`** hero section: switched from the two-column split (headline
  left / product card right, capped at `max-w-6xl`) to a single-column, centered layout
  capped at `max-w-[1400px]` (wider than every other section on the page, per "full width
  apart from the regular layout"). Headline bumped to DESIGN.md's 80px display size on large
  screens (`lg:text-[5rem]`, was `lg:text-[4.5rem]`), subtext and CTAs centered.
- **`components/public/hero-graphic.tsx`** rebuilt from a single product card (with a
  `framer-motion` `animate: { y: [...] }` bobbing stat chip) into a static 3-column grid: two
  flanking feature-highlight cards ("Mentor reviewed", "Recommendation letter") framing the
  certificate-verification widget card, all grounded in normal flow (no absolute-positioned
  floating chip, no animation loop). Dropped `"use client"` and the `framer-motion` import
  entirely — component is now a plain server component, composed inside the page's existing
  `FadeInUp` client wrapper for its one-time scroll-in reveal.
  - Deliberately did *not* reuse the trust-strip's stat numbers (1,200+, 100%, etc.) on the
    flanking cards to avoid duplicating content already shown in the stats band right below
    the hero — used distinct feature callouts instead.

### Verification
- `npx eslint` + `npx tsc --noEmit` clean.
- Found the project's real `next dev` server already running on port 3000 (PID noted in its
  own error output when a second `next dev -p 3001` was attempted) — used that instead of
  starting a duplicate.
- Same Playwright-based screenshot approach as the prior pivot (temp `npm install --no-save
  playwright@1.63.0`, script must live inside the project dir for ESM `import "playwright"`
  to resolve — copying a script from the scratchpad dir and running it in place failed with
  `ERR_MODULE_NOT_FOUND` until copied into the project root). Screenshotted hero only, cropped
  via `page.$("main > section:first-child").screenshot()`, at 1440px and 390px, after
  incremental scroll to trigger `whileInView` reveals. Zero console/page errors, zero
  horizontal overflow at either width. Visually confirmed: full-width centered bold headline,
  centered CTAs, grounded 3-card row (no floating/bobbing element), clean single-column stack
  on mobile. Cleaned up the temp script and `npm uninstall playwright --no-save` afterward.

## 2026-09-20 (later still) — Hero follow-up: viewport-fit + more bold, cards removed

### Context
User sent a screenshot showing the 3-card visual band from the prior hero redesign getting
cut off at the bottom of a ~900px-tall viewport, and asked for the hero to be a little bolder
and to fit entirely on screen at once.

### Changes
- **`app/(public)/page.tsx`** hero section: removed the `HeroGraphic` card row entirely.
  Section now uses `min-h-[calc(100dvh-73px)]` (73px ≈ the sticky header's rendered height)
  with `flex flex-col items-center justify-center`, so the hero always fills exactly the
  viewport height below the header and vertically centers its content — guarantees the whole
  hero is visible without scrolling on common desktop/laptop viewport heights (tested 900px,
  800px, 768px) and on mobile.
  - Headline pushed bolder: `sm:text-7xl lg:text-[5.5rem]` (was `sm:text-6xl lg:text-[5rem]`),
    tighter `leading-[1.03]` and `tracking-[-0.03em]` (was 1.05 / -0.02em).
  - Primary CTA button gained `shadow-accent-lg` for more visual weight.
  - Replaced the single top radial glow with three: the original top glow at higher opacity
    (0.08 → 0.12) plus two soft cyan/magenta blob glows anchored bottom-left/bottom-right,
    same static (non-animated) decorative-blob pattern as everywhere else in the design
    system — adds boldness without reintroducing the floating-card motif the user rejected
    earlier.
- **`components/public/hero-graphic.tsx`** deleted outright — grepped first to confirm it had
  no other usages before removing.

### Verification
- `npx eslint` + `npx tsc --noEmit` clean.
- Playwright screenshots (temp install again, same pattern as before) taken as **viewport-only**
  (not `fullPage`) at 1440×900, 1440×800, 1366×768, and 390×844 — all four show the complete
  hero (header through CTA buttons) with no cut-off content and no horizontal overflow.
- Cleaned up temp script + `npm uninstall playwright --no-save` afterward; `git status --short`
  confirms only the intended files changed (`hero-graphic.tsx` now shows as deleted).

## 2026-09-20 (later still) — Wire up DESIGN.md's type scale + rebuild navbar

### Context
User asked to "change the fonts according to the design" and improve the navbar per DESIGN.md.
Fonts were already Manrope (Gilroy substitute) everywhere from the first pivot, but DESIGN.md's
actual **type-scale tokens** (caption/body/button/heading/display roles with their own
line-heights) were never wired into Tailwind — sizes were ad hoc arbitrary values, and the
"Primary CTA Button" role (18px/600, DESIGN.md line 128) was being rendered at 14px (`text-sm`)
everywhere via `buttonVariants`'s base class.

### Changes
- **`app/globals.css`**: added the full DESIGN.md type scale as Tailwind v4 `@theme` tokens —
  `--text-caption` (12px) through `--text-display` (80px), each paired with its own
  `--text-*--line-height` per DESIGN.md's Type Scale table, so classes like `text-button`,
  `text-body-sm`, `text-heading-lg` etc. are now real Tailwind utilities site-wide (not used
  everywhere yet — this session only applied them to buttons and the navbar; broad adoption
  across every heading/body element on every page is a bigger follow-up, not done here).
- **`components/ui/button.tsx`**: `buttonVariants` base class changed from `text-sm` to
  `text-button` (18px/600, matches the token above) — this is DESIGN.md's literal Primary CTA
  Button spec (line 128: "text #ffffff at 18px weight 600"), which previously wasn't being hit
  at any button size. Removed the redundant `lg` size's `text-base` override (no longer needed
  now the base sets the correct size). `sm` size bumped `h-9 px-3` → `h-10 px-4` so 18px text
  has room to breathe at the smallest button height.
- **`components/public/site-header.tsx`**: rebuilt the bar layout to actually match
  DESIGN.md's Navigation spec (line 228: "64px sticky top bar with logo left, centered menu,
  and CTA cluster right") — previously the nav links sat in a `justify-between` flex row and
  were *not* independently centered (their position drifted with logo/CTA width). Switched to
  `grid grid-cols-[auto_1fr_auto]` with the nav `justify-center`'d in the middle track, and the
  header itself fixed to `h-16` (64px) instead of `py-4` (which rendered ~64-65px incidentally
  but wasn't pinned to the spec value). Nav links and the mobile dropdown's links switched from
  `text-sm` to the new `text-body-sm` token (same 14px, now token-backed, within DESIGN.md's
  Ghost Text Link 14-18px/500-600 range).
  - **Bug caught and fixed during verification**: first attempt merged the CTA's `hidden
    lg:inline-flex` visibility classes directly into `buttonVariants({..., className: "hidden
    lg:inline-flex" })`. `cva`'s own `className` merge param uses plain `clsx` concatenation,
    not `tailwind-merge` — so it doesn't dedupe the conflicting `inline-flex` (always-on, from
    the variant base) against `hidden` (consumer override) by source order. Result: the "Browse
    internships" CTA rendered on mobile too, overlapping the hamburger button and wrapping to
    two lines (caught via an actual mobile screenshot, not just code review). Fixed by wrapping
    with this project's `cn()` helper instead (`lib/cn.ts`, which *does* run `tailwind-merge`):
    `cn(buttonVariants({...}), "hidden lg:inline-flex")`. Grepped the rest of the codebase for
    the same `buttonVariants({..., className: "...hidden..." })` pattern — no other instances.
  - `app/(public)/page.tsx`'s hero `min-h-[calc(100dvh-Npx)]` (added in the prior hero-viewport
    session) updated from the earlier `73px` estimate to the now-exact `65px` (64px header +
    1px border), since the header height is no longer an approximation.

### Verification
- `npx eslint` + `npx tsc --noEmit` clean (globals.css isn't eslint-covered, expected).
- Playwright (same temp-install pattern as prior sessions in this worklog) screenshots at
  1440×900, 1024×900 (tablet — confirms the `lg` nav breakpoint at 1024px), and 390×844
  (mobile, both closed and open hamburger states), plus header-only crops. Confirmed: nav
  visually centered, header a clean 64px bar, button text visibly bolder/larger, mobile shows
  only logo + hamburger (no overlap after the fix above), hero still fits in one viewport.
  Zero console/page errors, zero horizontal overflow at any tested width.
- Extra sanity check (not explicitly requested, but the button/token changes are global): spot
  checked `/contact` and `/admin/login` at 1024px, since `components/ui/button.tsx` is shared
  by the whole app including admin. Both render cleanly with the new button sizing — no text
  wrapping or overflow in the contact page's `sm`-sized card buttons or the admin sign-in form.
- Cleaned up all temp scripts/screenshots and `npm uninstall playwright --no-save` after.
  `git status --short` confirms only the intended files changed.

### Known follow-ups / not done this session
- About/Benefits/Contact/Gallery/Verify pages were **not** content-rewritten for the new design
  language — they only inherit the new tokens/fonts automatically. If asked to bring the full
  site to v2, those pages still have Certified-Amber-era copy/structure assumptions worth a
  fresh look (e.g. any lingering em dashes, left-aligned section headers that should become
  centered per DESIGN.md).
- `/internships` listing page uses the same `InternshipCard` component whose title size changed
  (18px -> 24px) as a side effect of the homepage work — not visually re-checked this session.
- `DESIGN.md` is still untracked in git (`?? DESIGN.md` in status) — user has not asked for it
  to be committed; left as-is.
- Did not commit any of this work — all changes are currently uncommitted in the working tree
  (`git status` shows 15 modified files). User will need to review and commit when ready.

## 2026-09-20 (later still) — Bring About/Benefits/Contact/Gallery/Verify to the same design language

### Context
Direct follow-up to the "Known follow-ups" item above: user ran `/goal` pointing at `DESIGN.md`
asking for changes across all pages per its rules. These five pages had never been touched
since the Signal Blue pivot and still carried three concrete violations:
1. A leftover **orange radial-gradient** hero glow (`rgba(194,65,12,...)`) from the pre-pivot
   "Certified Amber" theme — never retoned.
2. **Stock photography** (`next/image` with files like `hero-students.jpg`, `library-laptop.jpg`,
   `team-meeting.jpg`, etc.) — DESIGN.md's Imagery section explicitly bans photography/lifestyle
   imagery site-wide ("all visuals are product UI, abstract accent shapes... no photography").
   The homepage had already dropped its one stock photo for this exact reason; these pages
   hadn't caught up.
3. Card titles rendered as `<h3 className="text-base ...">` (16px) — violates DESIGN.md's
   explicit "don't set H3 below 24px" rule.

### Changes
- **`app/(public)/about|benefits|contact|verify/page.tsx`**: replaced every stock photo with an
  "Elevated Product Card" UI mockup in the same style as the homepage's task-board card (header
  bar with icon + label, bordered rows below), backed by a `--blob-cyan`/`--blob-magenta` blur
  instead of a photo. Each mockup is tailored to the section's content instead of being generic:
  About gets a "Program at a glance" stat card, a "Mentor review" card, and (fittingly, given
  DESIGN.md's source is literally Calendly) a "Book a call" time-slot picker card. Benefits gets
  a checklist card and a certificate-preview card. Contact gets a two-bubble "message exchange"
  card. Verify gets a "Verification result" card that mirrors the page's own actual product.
  Replaced the leftover orange hero glow with the Signal Blue radial gradient
  (`rgba(0,107,255,0.12)`) used on the homepage. Card titles changed from `<h3 className=
  "text-base">` to `<p className="text-base">`, matching the homepage's established workaround
  for decorative card titles that shouldn't carry heading semantics at that size. All H1/H2s
  switched from ad hoc arbitrary sizes (`text-4xl sm:text-5xl`, `sm:text-[3.25rem]`) to the
  actual wired type-scale utilities added in the prior session (`text-heading-sm`/`text-heading`,
  38px -> 50px), and given `font-bold` to match DESIGN.md's 700-weight display-headline spec
  (previously missing on these pages, present on the homepage).
- **`app/(public)/gallery/page.tsx`**: full redesign, not just a retone. The page's entire
  premise was a photo masonry grid, which is irreconcilable with DESIGN.md's photography ban.
  Rebuilt it as a grid of 8 small "Elevated Product Card" mockups (task board, mentor feedback,
  verified certificate, book-a-call, course-eligibility pills, program stats, LOR-issued card,
  alumni-avatars card) — preserves the page's "look inside the program" intent using the same
  product-UI visual language as every other page, instead of lifestyle photography.
- **`app/globals.css`**: found and fixed a real pre-existing bug while doing this — the homepage's
  task-board mockup (and the new mockups added this session) reference a `shadow-product` Tailwind
  class, but only `.shadow-accent`/`.shadow-accent-lg` utility classes existed; `--shadow-product`
  was declared as a plain `:root` CSS variable, never exposed as a class, and Tailwind v4 doesn't
  auto-generate utilities from variables outside an `@theme` block. `shadow-product` was silently
  a no-op everywhere it was used. Added a `.shadow-product { box-shadow: var(--shadow-product); }`
  utility, matching the existing two — this is the shadow DESIGN.md defines for the "Elevated
  Product Card" component, so all the new mockup cards (and the homepage's pre-existing one) now
  actually render their three-layer blue-tinted shadow.

### Verification
- `npx tsc --noEmit` and `npx eslint` on all five changed page files — clean.
- Confirmed zero remaining `images/` references anywhere under `app/` (grep) — photography is
  now fully gone from every public page, not just the homepage.
- Reused the project's existing dev server on port 3000 (already running, picked up all changes
  via Fast Refresh — didn't need to start a second instance this time).
- Same temp-Playwright-install pattern as prior sessions: full-page screenshots of all five pages
  at 1440x900 and 390x844, after incremental scroll to trigger `whileInView` reveals. Zero
  console/page errors on any page at either width. Visually confirmed: no orange leftovers, no
  photography, correct pill badges/shadows/blob glows, clean mobile stacking with no horizontal
  overflow. Cleaned up the temp script and `npm uninstall playwright --no-save` after.
- `git status --short` after cleanup shows only the intended files changed, no stray temp files.

### Not done / still open
- Homepage's own H2s/card titles still use the pre-existing ad hoc arbitrary sizes, not the
  `text-heading-sm`/`text-heading` tokens now used on the five subpages — this session
  deliberately scoped to fixing the five subpages (the explicit ask), not re-touching the
  homepage. Worth a follow-up pass if full token consistency across every page is wanted.
- Did not commit this work — still uncommitted in the working tree alongside the prior session's
  changes.
