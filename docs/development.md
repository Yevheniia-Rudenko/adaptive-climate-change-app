# Development Guide

## Local Setup

```bash
npm install
npm run dev          # → http://localhost:5173
npm run build        # → ./build (production bundle)
```

**`.env.local`** (never commit):
```
VITE_API_BASE_URL=http://localhost:8000
```

---

## Adding Content

### New module
1. Add a `ModuleStructure` object to the array in `src/data/moduleStructures.ts`
2. Add `module6` translation key to every language in `src/data/translations.ts`
3. Add `{ id: 6, label: t.module6 }` to the `modules` array in `src/components/Header.tsx`
4. Update the navigation bound in `FlexibleModulePage.tsx` (`moduleId < 5` → `< 6`)

### New content block type
1. Add a union member to `ContentBlock` in `src/data/moduleStructures.ts`
2. Add a `case 'my-type':` branch in `ContentBlock.tsx`
3. Use `{ type: 'my-type', ... }` in any module's `sections` array

### Block color themes
Available `colorTheme` values on `BlockWrapper`: `teal` · `green` · `amber` · `purple` · `pink` · `blue`

### New glossary term
1. Add to **all 6 language arrays** in `src/data/glossary.ts`:
   ```typescript
   { term: 'my term', variants: ['alt spelling'], definition: 'Short, age-appropriate explanation.' }
   ```
2. No code changes needed — terms are auto-detected in `text` and `meditation` blocks.

### New UI string (i18n)
1. Add key to `Translations` type in `src/data/translations.ts`
2. Add translations for all 6 languages: `en` · `es` · `ar` · `de` · `ru` · `uk`
3. Use via `const { t } = useLanguage(); t.myKey`

### New language
1. Extend `Language` type: `type Language = 'en' | 'es' | ... | 'fr'`
2. Add complete `Translations` entry for the new code
3. Add to `LanguageSwitcher.tsx`
4. Add language array to `glossary.ts`

---

## Coding Standards

### TypeScript
- **No `any`** without a comment explaining why
- Named exports for all components (`export function Foo`)
- Interfaces for object shapes, type aliases for unions
- Custom context hook with a null-guard error (`useXxx` — never consume context directly)

### Files & folders
| What | Convention |
|---|---|
| Component | `PascalCase.tsx` |
| Utility / data | `camelCase.ts` |
| Assets | lowercase with hyphens/underscores |

### Styling
- **Tailwind classes first** — inline `style` only for runtime-dynamic values
- Every colour needs a `dark:` variant
- Responsive via breakpoint prefixes (`sm:`, `md:`, `lg:`) — never fixed px media queries

### Assets
Always import via ES module — never use public-folder string paths:
```typescript
import forestImg from '../assets/forest.jpg'; // ✅
<img src="/assets/forest.jpg" />              // ❌
```

### API calls
- All API functions live in `src/api/`
- Always `try/catch` around `fetch` (network error ≠ HTTP error — handle both)
- Throw `Error` with a descriptive message — never return `null` to signal failure

---

## Git Workflow

**Branch naming:**
```
feature/short-description
fix/short-description
docs/short-description
refactor/short-description
```

**PR checklist:**
- [ ] `npx tsc --noEmit` passes (no TypeScript errors)
- [ ] Tested at mobile (375px) · tablet (768px) · desktop (1280px)
- [ ] Dark mode toggled and verified
- [ ] All 6 languages checked if any UI string was added
- [ ] New external images have an entry in `src/data/imageAttribution.ts`
- [ ] `/sandbox` not used for permanent features
- [ ] No `.bak` files committed
- [ ] No `.env.local` or secrets committed
- [ ] Relevant doc in `/docs` updated if behaviour changed

---

## Notes

- **Sandbox page** (`/sandbox`, `SandboxPage.tsx`) — scratch area for UI experiments. Remove route before any release.
- **`.bak` files** (`moduleStructures.ts.bak`) — manual snapshots, never import, delete after restructure is verified.
- **Vendored packages** (`en-roads-core`, `sim-ui-graph`) — treat as read-only. Do not edit directly.
- **RTL** — Arabic `lang`/`dir` is set on `<html>` but full RTL layout is commented out in `LanguageContext.tsx` pending design work.
