# Adaptive Climate Change App — Docs

> Internal documentation for contributors. Four focused guides — find what you need fast.

---

## 📂 Guides

| | Guide | What's inside |
|---|---|---|
| 🏗️ | [architecture.md](./architecture.md) | Tech stack · Component tree · Design decisions · Features · Data model · API · Deployment |
| 🎨 | [design.md](./design.md) | Colors · Typography · Layout · Dark mode · Responsive · Components |
| 🛠️ | [development.md](./development.md) | Local setup · Content system · Coding standards · i18n · Glossary · PR checklist |

---

## ⚡ Quick Start

```bash
npm install
npm run dev        # → http://localhost:5173
```

Add to `.env.local` to use a local backend:
```
VITE_API_BASE_URL=http://localhost:8000
```

---

## 🗂️ Project Map

```
src/
├── App.tsx              ← Router root, provider tree
├── components/          ← All React components  
│   ├── ui/              ← Radix-based primitives
│   └── module_3/        ← Module-specific dashboards
├── contexts/            ← LanguageContext, ThemeContext, SessionContext, GlossaryHighlightContext
├── data/                ← moduleStructures.ts · glossary.ts · translations.ts
├── api/                 ← postInput.ts · getInputsPdf.ts · apiBaseUrl.ts
└── assets/              ← Images, audio, Lottie JSON

packages/
├── en-roads-core/       ← Climate simulation engine (vendored, read-only)
└── sim-ui-graph/        ← Graph rendering (vendored, read-only)
```
