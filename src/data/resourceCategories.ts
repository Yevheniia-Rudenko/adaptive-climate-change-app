import { ResourceCategoryData } from '../components/ResourceCategoryPage';

export const resourceCategoriesData: Record<string, ResourceCategoryData> = {
  'climate-basics': {
    id: 'climate-basics',
    title: 'Climate Basics',
    description: 'This section provides beginner-friendly introductions to climate change and addresses common misconceptions. Perfect for those just starting their climate learning journey.',
    sections: [
      {
        title: 'Introductory Videos',
        items: [
          {
            title: 'Climate Change Explained',
            description: 'A simple, visual explanation of what climate change is, why it\'s happening, and why it matters.',
            type: 'video',
            duration: '5 min',
            url: 'https://www.youtube.com/watch?v=ifrHogDujXw',
          },
          {
            title: 'The Basics of Climate Change',
            description: 'An introductory overview of the greenhouse effect, global warming, and human impact on the climate system.',
            type: 'video',
            duration: '8 min',
            url: 'https://www.youtube.com/watch?v=dcBXmj1nMTQ',
          },
        ],
      },
      {
        title: 'Myths vs Facts',
        items: [
          {
            title: 'Climate Change: Myths and Facts',
            description: 'Addresses common misconceptions about climate change using evidence-based explanations.',
            type: 'article',
            duration: '10 min',
            url: 'https://climate.nasa.gov/faq/16/do-scientists-agree-on-climate-change/',
          },
          {
            title: 'Debunking Climate Change Misinformation',
            description: 'Breaks down widely shared climate myths and explains why they are misleading or incorrect.',
            type: 'article',
            duration: '7 min',
            url: 'https://www.metoffice.gov.uk/weather/climate-change/guide-to-climate-change/myths',
          },
        ],
      },
    ],
  },
  // Add more categories here as needed
  'articles-publications': {
    id: 'articles-publications',
    title: 'Articles & Publications',
    description: 'Research papers, reports, and in-depth reading materials for those who want to dive deeper into climate science.',
    sections: [],
  },
  'tools-frameworks': {
    id: 'tools-frameworks',
    title: 'Tools & Frameworks',
    description: 'Interactive simulators and analytical tools for exploring climate scenarios and solutions.',
    sections: [],
  },
  'videos-podcasts': {
    id: 'videos-podcasts',
    title: 'Videos & Podcasts',
    description: 'Engaging multimedia content to learn about climate solutions from experts and educators.',
    sections: [],
  },
  'case-studies': {
    id: 'case-studies',
    title: 'Case Studies & Real-World Examples',
    description: 'Practical examples of climate action and their outcomes from around the world.',
    sections: [],
  },
  'action-participation': {
    id: 'action-participation',
    title: 'Action & Participation',
    description: 'Opportunities to get involved and make a difference in your community and beyond.',
    sections: [],
  },
  'external-links': {
    id: 'external-links',
    title: 'External Links',
    description: 'Curated links to trusted climate organizations and resources for further exploration.',
    sections: [],
  },
};
