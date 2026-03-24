# Architecture

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | React 18 + TypeScript | Strict mode intent |
| Build | Vite 6 | Output → `./build` |
| Styling | Tailwind CSS 3 | Class-based dark mode |
| UI | Radix UI + Lucide React | Accessible primitives |
| Routing | React Router DOM 7 | `basename="/adaptive-climate-change-app"` |
| Animation | Lottie React | JSON animations |
| Climate sim | en-roads-core | Vendored local package |
| Graphs | sim-ui-graph | Vendored local package |
| Deployment | GitHub Pages | Sub-path deployment |

---

## Provider Tree

```
ThemeProvider          ← dark/light, persists to localStorage
  LanguageProvider     ← i18n, persists language to localStorage
    BrowserRouter      ← routing (basename set for GH Pages)
      Header / Footer
      Routes
        SessionProvider  ← UUID session per module (scoped inside module route)
          FlexibleModulePage
            GlossaryHighlightProvider  ← resets per block
              ContentBlock (×N)
```

**Why `SessionProvider` is scoped inside the module route:** Sessions are per-module. The `key={id}` prop on `FlexibleModulePage` forces a full remount — and session reset — when the user navigates between modules.

---

## Key Design Decisions

| # | Decision | Rationale |
|---|---|---|
| 1 | **Content-driven modules** | All module text, media, and interactions are data in `moduleStructures.ts`. One generic renderer for all 5 modules. |
| 2 | **Single route `/module/:id`** | All modules share one layout — no duplicated component trees. |
| 3 | **Block-by-block subpage nav** | Splits long content into steps without changing the URL. Module 1 uses a hand-crafted grouping; all others auto-group. |
| 4 | **Vendored local packages** | `en-roads-core` and `sim-ui-graph` are local `file:./packages/` deps — treat as read-only. |
| 5 | **No global state library** | Context + local state is sufficient for this app's complexity. |
| 6 | **RTL partially implemented** | Arabic lang/dir is set on `<html>`, but full RTL layout is commented out pending design work. |

---

## Features

| Feature | Route / Component | Notes |
|---|---|---|
| 5-module learning journey | `/module/:id` → `FlexibleModulePage` | Block navigation with dot progress indicator |
| En-ROADS dashboards | Various `Module*Dashboard` components | 6 exercise variants using the simulation engine |
| Interactive glossary | `TextWithGlossary` + `TermPopup` | Inline term highlighting in text/meditation blocks |
| Learner responses | `ContentBlock` sub-components → `postInput` | Reflection · Poll · Numeric prediction · Star feedback |
| PDF export | `getInputsPdf` → `GET /api/input/pdf/:sessionId` | Downloads session responses as PDF |
| Multilingual (6 languages) | `LanguageContext` + `translations.ts` | en · es · ar · de · ru · uk |
| Dark / Light theme | `ThemeContext` + `ThemeToggle` | `next-themes` persisted via class on `<html>` |
| Educators page | `/educators` | Facilitation notes and classroom guidance |
| Resources library | `/resources`, `/resources/:categoryId` | Curated external links by category |
| Sandbox (dev-only) | `/sandbox` | **Delete before any public release** |

---

## Data Model

### `ModuleStructure`
```typescript
{
  id: number;           // 1–5 (matches array index + 1)
  title: string;
  headerImage: string;  // imported asset
  sections: ModuleSection[];
}
```

### `ModuleSection` = `ContentBlock | BlockWrapper`

**`BlockWrapper`** groups content under a coloured panel:
```typescript
{ type: 'block'; colorTheme: 'teal'|'green'|'amber'|'purple'|'pink'|'blue'; blockTitle?: string; content: ContentBlock[] }
```

**`ContentBlock`** union — key types:

| Category | Types |
|---|---|
| Text/media | `text` · `audio` · `video` · `image` · `image-collage` · `lottie` |
| Interactive | `flip-cards` · `quote-carousel` · `button` · `meditation` · `html-embed` |
| Submissions | `reflection` · `poll` · `numeric-prediction` · `module-feedback` |
| Dashboards | `exercise1-dashboard` · `2ndExerciseDashboard` · `third-exercise` · `fourth-exercise` · `module2-exercise` · `module2-removals` · `module3-carbon-price-dashboard` |

---

## API

**Base URL resolution** (`src/api/apiBaseUrl.ts`):
1. `VITE_API_BASE_URL` env var (set in `.env.local`)
2. `''` in dev (Vite proxy)
3. `https://adaptive-climate-change-backend.up.railway.app` (production fallback)

**Endpoints:**

| Method | Path | Function | Purpose |
|---|---|---|---|
| POST | `/api/input/post/` | `postInput()` | Submit learner response |
| GET | `/api/input/pdf/:sessionId` | `downloadInputsPdf()` | Download session PDF |

**POST payload shape:**
```typescript
{ input: string; module_id: string; section_id: string; session_id?: string; timestamp?: string; }
```
`input` is a JSON-serialised object whose shape varies by block type (includes `type`, question/prompt, and `response`).

**Session management:** UUID v4 per module, stored in `localStorage` as `module_{id}_session`. Generated fresh on first visit or when `startNewSession()` is called.
