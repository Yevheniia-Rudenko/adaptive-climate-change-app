# Climate Glossary System Guide

## Overview
The climate education app includes an interactive glossary system that automatically highlights climate-related terms in the module content and displays definitions when clicked.

## How It Works

### Automatic Term Detection
- Terms defined in `/data/glossary.ts` are automatically detected in module content
- When a term is found, it's highlighted with a blue background and a help icon
- Clicking on any highlighted term opens a popup with its definition
- All terms support multiple languages (EN, ES, AR, DE, RU, UK)

### Current Terms
The glossary currently includes these climate terms:
1. **Carbon Dioxide (CO₂)** - Greenhouse gas from burning fossil fuels
2. **Emissions** - Release of greenhouse gases into atmosphere
3. **Greenhouse Gas** - Gases that trap heat in atmosphere
4. **Renewable Energy** - Energy from naturally replenishing sources
5. **Climate System** - Complex interactions determining Earth's climate
6. **Fossil Fuels** - Ancient energy sources (coal, oil, gas)

## Adding New Terms

### Step 1: Add Term to Glossary
Open `/data/glossary.ts` and add the new term to each language:

```typescript
en: [
  // ... existing terms
  {
    term: 'your term',
    variants: ['alternative spelling', 'plural form'],
    definition: 'Clear explanation for 14-18 year olds'
  }
],
```

### Step 2: Add Translations
Make sure to add the term and definition for ALL 6 languages:
- English (en)
- Spanish (es)
- Arabic (ar)
- German (de)
- Russian (ru)
- Ukrainian (uk)

### Step 3: Test
The term will automatically be detected in:
- Text blocks (`type: 'text'`)
- Meditation blocks (`type: 'meditation'`)

No code changes needed - the system handles it automatically!

## Customization

### Styling the Highlighted Terms
Edit `/components/GlossaryTerm.tsx` to change the appearance:
- Background color: `bg-blue-50` / `hover:bg-blue-100`
- Text color: `text-blue-700`
- Border: `border-b-2 border-blue-300`

### Popup Design
Edit `/components/TermPopup.tsx` to customize the popup appearance.

## Technical Details

### Components
- **GlossaryTerm** - Highlighted term component
- **TermPopup** - Definition popup modal
- **TextWithGlossary** - Text renderer that detects and highlights terms

### Smart Matching
- Case-insensitive matching (Carbon Dioxide = carbon dioxide)
- Longest terms matched first (prevents "greenhouse gas" being split)
- Supports variants (CO₂, CO2, carbon dioxide all match)
- Word boundary detection (won't match partial words)

## Tips
- Keep definitions concise and age-appropriate (14-18 years)
- Use variants for abbreviations and plural forms
- Test terms in different languages to ensure proper detection
- Don't overuse - too many highlighted terms can be overwhelming
