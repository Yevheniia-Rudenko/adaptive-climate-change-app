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
            duration: '6 min',
            url: 'https://youtu.be/ffjIyms1BX4',
          },
        ],
      },
      {
        title: 'Myths vs Facts',
        items: [
          {
            title: '10 Myths About Climate Change',
            description: 'Common misconceptions about climate change, debunked with facts.',
            type: 'Article',
            duration: '7 min',
            url: 'https://www.wwf.org.uk/updates/here-are-10-myths-about-climate-change',
          },
          {
            title: 'Climate Change Denial Myths',
            description: 'A breakdown of denial myths and the science that disproves them.',
            type: 'Article',
            duration: '6-8 min',
            url: 'https://www.ube.ac.uk/whats-happening/articles/climate-change-denial-myths/',
          },
        ],
      },
    ],
  },

  'articles-publications': {
    id: 'articles-publications',
    title: 'Articles & Publications',
    description: 'Research papers, reports, and in-depth reading materials for those who want to dive deeper into climate science.',
    sections: [
      {
        title: 'Articles',
        items: [
          {
            title: 'BBC Climate Change Overview',
            description: 'A concise overview of climate change from the BBC.',
            type: 'Article',
            duration: '6 min',
            url: 'https://www.bbc.com/news/articles/c9w15nggj58o',
          },
        ],
      },
      {
        title: 'Research Papers',
        items: [
          {
            title: 'IPCC AR6 Synthesis Report (SPM)',
            description: 'Summary for policymakers from the latest IPCC report.',
            type: 'Report',
            duration: '20 min',
            url: 'https://www.ipcc.ch/report/ar6/syr/downloads/report/IPCC_AR6_SYR_SPM.pdf',
          },
        ],
      },
      {
        title: 'Reports',
        items: [
          {
            title: 'UNEP Emissions Gap Report',
            description: 'Annual assessment of the emissions gap and progress.',
            type: 'Report',
            duration: '15 min',
            url: 'https://www.unep.org/resources/emissions-gap-report',
          },
        ],
      },
    ],
  },
  'tools-frameworks': {
    id: 'tools-frameworks',
    title: 'Tools & Frameworks',
    description: 'Interactive simulators and analytical tools for exploring climate scenarios and solutions.',
    sections: [
      {
        title: 'Scenario & Systems Tools',
        items: [
          {
            title: 'En-ROADS Climate Simulator',
            description: 'Interactive climate solutions simulator by Climate Interactive.',
            type: 'Tool',
            duration: 'Interactive',
            url: 'https://www.climateinteractive.org/en-roads/',
          },
          {
            title: 'Systems Thinking Tools',
            description: 'PDF guide to systems thinking tools for climate and beyond.',
            type: 'Article',
            duration: '10 min',
            url: 'https://thesystemsthinker.com/wp-content/uploads/2016/03/Systems-Thinking-Tools-TRST01E.pdf',
          },
        ],
      },
      {
        title: 'Trackers & Explorers',
        items: [
          {
            title: 'Climate Action Tracker',
            description: 'Tracks government climate action and measures progress.',
            type: 'Tool',
            duration: 'Interactive',
            url: 'https://climateactiontracker.org/',
          },
          {
            title: 'MIT Climate Explainers',
            description: 'Short explainers on climate science and solutions.',
            type: 'Article',
            duration: '5 min',
            url: 'https://climate.mit.edu/explainers',
          },
          {
            title: 'Project Drawdown Explorer',
            description: 'Explore solutions and data for climate action.',
            type: 'Tool',
            duration: 'Interactive',
            url: 'https://drawdown.org/explorer',
          },
        ],
      },
    ],
  },
  'videos-podcasts': {
    id: 'videos-podcasts',
    title: 'Videos & Podcasts',
    description: 'Engaging multimedia content to learn about climate solutions from experts and educators.',
    sections: [
      {
        title: 'Short Videos',
        items: [
          {
            title: 'Causes and Effects of Climate Change',
            description: 'A short explainer video on climate change.',
            type: 'video',
            duration: '3 min',
            url: 'https://www.youtube.com/watch?v=G4H1N_yXBiA',
          },
          {
            title: 'Climate Change 101 with Bill Nye',
            description: 'Short video on the facts of climate change.',
            type: 'video',
            duration: '4 min',
            url: 'https://www.youtube.com/watch?v=EtW2rrLHs08',
          },
        ],
      },
      {
        title: 'Deep Dives & Lectures',
        items: [
          {
            title: 'Global Weirding with Katharine Hayhoe',
            description: 'A playlist of in-depth lectures and talks.',
            type: 'video',
            duration: 'Long-form',
            url: 'https://youtube.com/playlist?list=PLwNT4Fr0_4CRlYFj3hZPVSaVYZfk9YQM4',
          },
        ],
      },
      {
        title: 'Podcasts',
        items: [
          {
            title: 'The Energy Transition Show',
            description: 'Podcast on the global energy transition.',
            type: 'Podcast',
            duration: '30–60 min',
            url: 'https://xenetwork.org/ets/',
          },
        ],
      },
      {
        title: 'Documentaries & Series',
        items: [
          {
            title: 'Our Planet',
            description: 'A documentary series about the natural world.',
            type: 'video',
            duration: 'Series',
            url: 'https://www.ourplanet.com/en/',
          },
        ],
      },
    ],
  },
  'case-studies': {
    id: 'case-studies',
    title: 'Case Studies & Real-World Examples',
    description: 'Practical examples of climate action and their outcomes from around the world.',
    sections: [
      {
        title: 'Country-Level Case Studies',
        items: [
          {
            title: 'State of Green',
            description: 'Examples of national climate action and innovation.',
            type: 'Case Study',
            duration: 'Self-paced',
            url: 'https://stateofgreen.com/en/',
          },
        ],
      },
      {
        title: 'City & Community Initiatives',
        items: [
          {
            title: 'C40 City Case Studies',
            description: 'Urban climate action and community projects.',
            type: 'Case Study',
            duration: 'Self-paced',
            url: 'https://www.c40.org/case-studies/',
          },
        ],
      },
      {
        title: 'Sector-Specific Examples',
        items: [
          {
            title: 'De Zandmotor',
            description: 'A sector-specific climate adaptation example.',
            type: 'Case Study',
            duration: 'Self-paced',
            url: 'https://dezandmotor.nl/en/',
          },
        ],
      },
    ],
  },
  'action-participation': {
    id: 'action-participation',
    title: 'Action & Participation',
    description: 'Opportunities to get involved and make a difference in your community and beyond.',
    sections: [
      {
        title: 'Volunteer Opportunities',
        items: [
          {
            title: 'Climate Corps',
            description: 'Volunteer for climate action projects and programs.',
            type: 'Website',
            duration: 'Self-paced',
            url: 'https://www.climatecorps.org/',
          },
          {
            title: '350.org Get Involved',
            description: 'Join global climate campaigns and volunteer.',
            type: 'Website',
            duration: 'Self-paced',
            url: 'https://350.org/get-involved/?r=TR&c=AS',
          },
        ],
      },
      {
        title: 'Organizations & Programs',
        items: [
          {
            title: 'Project Drawdown',
            description: 'Explore solutions and join climate programs.',
            type: 'Website',
            duration: 'Self-paced',
            url: 'https://drawdown.org/',
          },
        ],
      },
      {
        title: 'Donations & Support',
        items: [
          {
            title: 'Cool Earth',
            description: 'Donate to support rainforest protection.',
            type: 'Website',
            duration: 'Self-paced',
            url: 'https://www.coolearth.org/',
          },
        ],
      },
    ],
  },
  'external-links': {
    id: 'external-links',
    title: 'External Links',
    description: 'Curated links to trusted climate organizations and resources for further exploration.',
    sections: [
      {
        title: 'Scientific Institutions',
        items: [
          {
            title: 'NASA Climate Change',
            description: 'NASA\'s hub for climate science and research.',
            type: 'Website',
            duration: 'Self-paced',
            url: 'https://science.nasa.gov/climate-change/',
          },
          {
            title: 'NASA Earth for Kids',
            description: 'Climate science resources for young learners.',
            type: 'Website',
            duration: 'Self-paced',
            url: 'https://science.nasa.gov/kids/earth/',
          },
        ],
      },
      {
        title: 'Data & Research Platforms',
        items: [
          {
            title: 'Our World in Data: CO2 & Greenhouse Gas Emissions',
            description: 'Global data and research on emissions.',
            type: 'Website',
            duration: 'Self-paced',
            url: 'https://ourworldindata.org/co2-and-greenhouse-gas-emissions',
          },
        ],
      },
      {
        title: 'Educational Organizations',
        items: [
          {
            title: 'Teach Climate',
            description: 'Educational resources and programs for climate learning.',
            type: 'Website',
            duration: 'Self-paced',
            url: 'https://www.teachclimate.org/',
          },
        ],
      },
    ],
  },
};
