# Design System

## Typography

| Element | Classes |
|---|---|
| Global font | `font-sora` — add to outermost element of every new component |
| Body | `text-sm sm:text-base md:text-lg` |
| Section heading (h2) | `text-base sm:text-lg md:text-xl font-bold` |
| Block title | `text-xl sm:text-2xl font-bold` |

---

## Color Palette

### Block Wrapper Themes
Applied via `colorTheme` field on `BlockWrapper`. Light → Dark gradients:

| Token | Light | Dark |
|---|---|---|
| `teal` | `from-teal-50/60 to-cyan-50/60` | `from-teal-900/10 to-cyan-900/10` |
| `green` | `from-green-50/60 to-emerald-50/60` | `from-green-900/10 to-emerald-900/10` |
| `amber` | `from-amber-50/60 to-yellow-50/60` | `from-amber-900/10 to-yellow-900/10` |
| `purple` | `from-purple-50/60 to-violet-50/60` | `from-purple-900/10 to-violet-900/10` |
| `pink` | `from-pink-50/60 to-rose-50/60` | `from-pink-900/10 to-rose-900/10` |
| `blue` | `from-blue-50/60 to-indigo-50/60` | `from-blue-900/10 to-indigo-900/10` |

### Key Color Tokens

| Role | Light | Dark |
|---|---|---|
| Content icon accent | `text-blue-600` | `dark:text-blue-400` |
| Primary green (nav button) | `#2F8237` (inline) | — |
| Active nav link | `text-green-500` | `text-green-500` |
| Card surface | `bg-white` / `bg-white/80` | `dark:bg-gray-800` / `dark:bg-gray-800/80` |
| Card border | `border border-gray-100` | `dark:border-gray-700` |
| Header border | `border-2 border-gray-700` | `dark:border-gray-300` |
| Primary text | `text-gray-900` | `dark:text-gray-100` |
| Secondary text | `text-gray-700` | `dark:text-gray-300` |

---

## Layout & Spacing

| Element | Classes |
|---|---|
| Page container | `max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8` |
| Module card | `rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden` |
| Block wrapper | `rounded-2xl p-6 sm:p-8 mb-8` |
| Between blocks | `mb-6 sm:mb-8` |
| Card inner padding | `p-4 sm:p-6 md:p-8 lg:p-10` |

**Responsive breakpoints:**

| Prefix | Width | Primary use |
|---|---|---|
| *(default)* | 0 | Mobile-first base |
| `sm:` | 640px | Larger phones, layout switches |
| `md:` | 768px | Tablet, desktop nav appears |
| `lg:` | 1024px | Wide desktop padding |

---

## Dark Mode Rules

- Dark mode = Tailwind **class strategy** (`dark` on `<html>`)
- Every colour must have a `dark:` counterpart
- Card surfaces: `dark:bg-gray-800` — never `dark:bg-black` or custom hex
- Gradients use `/10` opacity: `dark:from-teal-900/10`
- Never use JS to apply dark styles — use the `dark:` Tailwind prefix

---

## Header

```
sticky top-0 z-50
bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm
rounded-2xl  shadow-lg
border-2 border-gray-700 dark:border-gray-300   ← intentional contrast border, keep it
max-w-4xl
```

---

## Components

### Buttons — use `Button` from `ui/button`

| Variant | Use case |
|---|---|
| `default` | Primary CTA (Next, Submit) |
| `ghost` | Back / secondary actions |
| `outline` | Soft CTAs (Glossary link) |
| `link` | Inline text links |

### Focus Rings
```
focus:outline-none focus:ring-2 focus:ring-green-500/60
```
Never use `outline-none` alone — focus indicators are required for accessibility.

### Navigation layout (Back / Next)
```
flex flex-col sm:flex-row gap-2 sm:gap-3
Back  → variant="ghost"  order-2 sm:order-1
Next  → flex-1           order-1 sm:order-3
```
Back is below Next on mobile; left of Next on desktop.

---

## Background

Fixed viewport image on `App.tsx` wrapper:
```
backgroundAttachment: 'fixed'
backgroundSize: 'cover'
backgroundPosition: 'center'
```
Do not override per page — module cards sit on top via their white/dark surface.

---

## Animations

- State transitions: `transition-all duration-200` or `transition-colors`
- Lottie: prefer `loop: true, autoplay: true` unless one-shot reveal is intended
- Avoid heavy animations inside module scroll — risk of jank on slow devices
