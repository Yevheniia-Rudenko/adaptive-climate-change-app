# 📚 Interactive Climate Glossary Feature

## Overview
We've added an interactive glossary system that automatically highlights climate terms throughout the educational modules. When learners click on a highlighted term, a beautiful popup appears with a clear definition.

## ✨ Features

### 🎯 Automatic Term Detection
- Climate terms are **automatically detected** in module content
- No manual markup needed - just add terms to the glossary file
- Works in all text blocks and meditation blocks

### 🌍 Multi-language Support
- Full support for 6 languages: English, Spanish, Arabic, German, Russian, Ukrainian
- RTL layout support for Arabic
- Each term has culturally appropriate translations

### 🎨 Beautiful UI
- **Highlighted terms**: Blue background with help icon
- **Smooth animations**: Popup appears with spring animation
- **Mobile-friendly**: Responsive design that works on all devices
- **Accessible**: Keyboard navigation (Enter/Space to open, Escape to close)

### 📖 Current Climate Terms
1. **Carbon Dioxide (CO₂)** - Greenhouse gas from fossil fuels
2. **Emissions** - Release of greenhouse gases
3. **Greenhouse Gas** - Heat-trapping atmospheric gases
4. **Renewable Energy** - Clean, sustainable energy sources
5. **Climate System** - Earth's interconnected climate components
6. **Fossil Fuels** - Coal, oil, and natural gas

## 🚀 How It Works

### User Experience
1. User reads module content
2. Climate terms appear **highlighted in blue** with a small help icon ℹ️
3. Click/tap on any term to see its definition
4. Popup appears with clear, age-appropriate explanation
5. Click "Got it!" or anywhere outside to close

### Example in Module 2
```
"Imagine Earth's climate as a bathtub. Carbon dioxide is the water 
flowing in (emissions) and flowing out..."
```

In this text:
- **Carbon dioxide** → highlighted, clickable
- **emissions** → highlighted, clickable
- Both show helpful definitions when clicked

## 📝 Adding New Terms

### Quick Guide
1. Open `/data/glossary.ts`
2. Add term to each language array:

```typescript
{
  term: 'deforestation',
  variants: ['deforest', 'forest loss'],
  definition: 'The clearing of forests for agriculture or development...'
}
```

3. Save - the term will automatically be detected!

### Important Notes
- ✅ Add translations for ALL 6 languages
- ✅ Keep definitions simple (14-18 year old audience)
- ✅ Include common variants (plural, abbreviations)
- ✅ Use word boundaries (won't match partial words)

## 🎯 Design Decisions

### Why Automatic Detection?
- **Consistency**: All instances of a term are highlighted
- **Efficiency**: No manual markup needed in module content
- **Flexibility**: Easy to add/remove terms globally

### Why Popups Instead of Tooltips?
- **Mobile-friendly**: Easier to tap and read on phones
- **Accessibility**: Better keyboard navigation
- **Clarity**: More space for detailed explanations

### Why These Specific Terms?
- Selected based on En-ROADS climate simulator concepts
- Fundamental to understanding climate systems
- Frequently used throughout the modules
- Age-appropriate complexity (14-18 years)

## 🔧 Technical Implementation

### Components
```
/components/
  ├── GlossaryTerm.tsx      # Highlighted term component
  ├── TermPopup.tsx          # Definition popup modal
  └── TextWithGlossary.tsx   # Text renderer with term detection
```

### Data
```
/data/
  └── glossary.ts            # Term definitions for all languages
```

### Smart Features
- **Case-insensitive matching**: "Carbon Dioxide" = "carbon dioxide"
- **Longest-first matching**: Prevents "greenhouse gas" being split
- **Variant support**: CO₂, CO2, carbon dioxide all match
- **Word boundaries**: Won't match "emissions" in "emissions123"

## 🎨 Customization

### Change Term Highlight Color
Edit `/components/GlossaryTerm.tsx`:
```tsx
className="... bg-blue-50 text-blue-700 ..."
//            ↑ change these
```

### Change Popup Style
Edit `/components/TermPopup.tsx`:
- Border: `border-blue-200`
- Background gradient: `from-blue-50 to-green-50`
- Button: `bg-blue-600`

## 📱 Mobile & Accessibility

### Mobile Optimizations
- Responsive popup sizing (`w-[90vw] sm:w-[85vw]`)
- Touch-friendly tap targets
- Centered modal positioning
- Backdrop blur for focus

### Accessibility Features
- ARIA labels for screen readers
- Keyboard navigation support
- Focus management
- High contrast ratios
- Clear visual indicators

## 🌐 RTL Support

The system fully supports right-to-left languages (Arabic):
- Text direction automatically adjusts
- Icons positioned correctly
- Popup layout mirrors properly

## 📊 Impact

This feature helps learners:
- **Build vocabulary**: Learn climate terms in context
- **Reduce confusion**: Quick access to definitions
- **Stay engaged**: Interactive, discoverable learning
- **Learn independently**: Don't need to ask what terms mean

## 🔮 Future Enhancements

Potential additions:
- [ ] Add more terms (target: 20-30 key climate concepts)
- [ ] Usage statistics (which terms are clicked most)
- [ ] "Learn more" links to detailed articles
- [ ] Visual diagrams in some definitions
- [ ] Quiz mode using glossary terms

## 📚 Resources

- Full implementation guide: `/GLOSSARY_GUIDE.md`
- Climate term sources: En-ROADS Climate Simulator
- Translation guidelines: Age 14-18 comprehension level
- Design inspiration: Modern educational platforms

---

**Note**: This feature is designed for the climate education app targeting youth ages 14-18. All definitions are written with this audience in mind.
