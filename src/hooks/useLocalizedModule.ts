import { useLanguage } from '../contexts/LanguageContext';
import { moduleStructures, ModuleStructure, ModuleSection, ContentBlock, BlockWrapper } from '../data/moduleStructures';

export function useLocalizedModule(moduleId: number): ModuleStructure | undefined {
  const { t } = useLanguage();
  
  const baseModule = moduleStructures.find((m) => m.id === moduleId);
  if (!baseModule) return undefined;

  // Access the translated module data if available
  const moduleKey = `module${moduleId}` as keyof typeof t.data.modules;
  const translatedModule = (t.data.modules as any)?.[moduleKey];

  if (!translatedModule) {
    return {
      ...baseModule,
      title: (t.nav as any)?.[`module${moduleId}`] || baseModule.title,
    };
  }

  const localizedModule: ModuleStructure = {
    ...baseModule,
    title: translatedModule.title || (t.nav as any)?.[`module${moduleId}`] || baseModule.title,
    sections: baseModule.sections.map((section, sIdx) => {
      const translatedSection = translatedModule.sections?.[sIdx];
      if (!translatedSection) return section;

      // Handle Wrapped Blocks
      if (section.type === 'block') {
        const blockSection = section as BlockWrapper;
        const translatedContent = translatedSection.content || [];
        
        return {
          ...blockSection,
          blockTitle: translatedSection.blockTitle || blockSection.blockTitle,
          content: blockSection.content.map((block, bIdx) => {
            const translatedBlock = translatedContent[bIdx];
            if (!translatedBlock) return block;

            // Merge titles, content, labels, etc.
            const mergedBlock: any = {
              ...block,
              ...translatedBlock,
            };

            // Preserve base image URLs/alts for translated image-collage entries
            // where translation only provides captions.
            if (Array.isArray((block as any).images) && Array.isArray((translatedBlock as any).images)) {
              mergedBlock.images = (block as any).images.map((baseImage: any, imageIdx: number) => ({
                ...baseImage,
                ...((translatedBlock as any).images?.[imageIdx] ?? {}),
              }));
            }

            // Preserve base flip-card metadata when translations only override text fields.
            if (Array.isArray((block as any).cards) && Array.isArray((translatedBlock as any).cards)) {
              mergedBlock.cards = (block as any).cards.map((baseCard: any, cardIdx: number) => ({
                ...baseCard,
                ...((translatedBlock as any).cards?.[cardIdx] ?? {}),
              }));
            }

            // Preserve quiz answers for true-or-myth blocks when translation provides statement/explanation
            if (Array.isArray((block as any).items) && Array.isArray((translatedBlock as any).items) && block.type === 'true-or-myth') {
              mergedBlock.items = (block as any).items.map((baseItem: any, itemIdx: number) => ({
                ...baseItem,
                ...((translatedBlock as any).items?.[itemIdx] ?? {}),
              }));
            }

            return mergedBlock as any;
          })
        };
      }

      // Handle Flat Content Blocks
      return {
        ...section,
        ...translatedSection
      } as any;
    })
  };

  return localizedModule;
}
