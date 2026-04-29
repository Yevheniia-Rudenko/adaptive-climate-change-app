import { ResourceCategoryData } from '../components/ResourceCategoryPage';

export const resourceCategoriesData: Record<string, ResourceCategoryData> = {
  'climate-basics': {
    id: 'climate-basics',
    title: 'Climate Basics',
    description: 'This section provides beginner-friendly introductions to climate change and addresses common misconceptions. Perfect for those just starting their climate learning journey.',
    sections: [
      {
        title: 'Introductory',
        items: [
          {
            title: 'Climate Change Explained',
            description: 'A simple, visual explanation of what climate change is, why it\'s happening, and why it matters.',
            type: 'video',
            duration: '6 min',
            url: 'https://youtu.be/ffjIyms1BX4',
          },
          {
            title: 'NASA Earth for Kids',
            description: 'Climate science resources for young learners.',
            type: 'Website',
            duration: 'Interactive',
            url: 'https://science.nasa.gov/kids/earth/',
          },
          {
            title: 'MIT Climate Primer',
            description: 'Climate Science, Risk & Solutions Explained',
            type: 'Website',
            duration: 'Interactive',
            url: 'https://climateprimer.mit.edu/',
          },
        ],
      },
      {
        title: 'Advanced',
        items: [
          {
            title: 'NASA Climate Change',
            description: 'NASA\'s hub for climate science and research.',
            type: 'Website',
            duration: 'Interactive',
            url: 'https://science.nasa.gov/climate-change/',
          },
          {
            title: 'MIT Open CourseWare',
            description: 'Search MIT’s free and open access courses on climate change',
            type: 'Website',
            duration: 'Varies',
            url: 'https://ocw.mit.edu/search/?q=climate',
          },
          {
            title: 'MIT Learn',
            description: 'Search for MIT’online courses and resources on climate change',
            type: 'Website',
            duration: 'Varies',
            url: 'https://learn.mit.edu/search?q=climate',
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
            duration: 'Interactive',
            url: 'https://ourworldindata.org/co2-and-greenhouse-gas-emissions',
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
            title: 'The Most Important Thing We\'re Not Talking About',
            description: 'A reflection on climate change as a “hyperobject” and why attention, framing, and medium-scale action matter in a worsening crisis.',
            type: 'Article',
            duration: '12 min',
            url: 'https://thegoldenhour.substack.com/p/the-hyperobject',
          },
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
        title: 'Climate & Emotions',
        items: [
          {
            title: 'Climate Mental Health Network: Climate Emotions Wheel',
            description: 'Explore the Climate Emotions Wheel to support reflection, emotional awareness, and climate conversations.',
            type: 'Tool',
            duration: 'Interactive',
            url: 'https://www.climatementalhealth.net/wheel',
          },
          {
            title: 'Climate Mental Health Network: A Guide to Climate Emotions',
            description: 'Explore the Climate Mental Health Network K-12 education curriculum and toolkit for climate emotions learning.',
            type: 'Report',
            duration: 'Self-paced',
            url: 'https://www.climatementalhealth.net/_files/ugd/be8092_ef3abbb96dd04130835b06eae6550b0e.pdf',
          },
          {
            title: 'Plutchik Wheel of Emotions',
            description: 'A practical guide to Plutchik’s model of emotions that supports reflection and emotional literacy in climate learning contexts.',
            type: 'Article',
            duration: '8 min',
            url: 'https://www.6seconds.org/2025/02/06/plutchik-wheel-emotions/',
          },
        ],
      },
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
          {
            title: 'FLOWER Systems Model',
            description: 'Interactive systems model from the iSee systems Exchange for exploring multisolving dynamics.',
            type: 'Tool',
            duration: 'Interactive',
            url: 'https://exchange.iseesystems.com/public/multisolvinginstitute/flower/index.html#page1',
          },
          {
            title: 'Climate Venn',
            description: 'Ayana Elizabeth Johnson’s framework for finding your personal climate contribution at the intersection of skills, joy, and impact.',
            type: 'Tool',
            duration: 'Interactive',
            url: 'https://www.ayanaelizabeth.com/climatevenn',
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
          {
            title: 'Climate Walks',
            description: 'Interactive climate storytelling and learning experiences for exploring climate solutions.',
            type: 'Tool',
            duration: 'Interactive',
            url: 'https://climatewalks.com/',
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
          {
            title: 'Think Like A Bathtub COP26',
            description: 'The video shows how an everyday object - a bathtub - can help more people understand climate change and inspire us to take climate action.',
            type: 'video',
            duration: 'Varies',
            url: 'https://pie.yt/?v=https://youtu.be/7WAMnt8thGs?si=eTqeh4BF850UNqbG&pieshare=1',
          },
          {
            title: 'Climate Short: Carbon & Climate Action',
            description: 'A quick YouTube Short introducing a bite-sized climate concept for fast classroom or self-paced discussion.',
            type: 'video',
            duration: '<1 min',
            url: 'https://youtube.com/shorts/Sk8vHhGtO6A?si=qTTIoejyv5Ki8OAH',
          },
          {
            title: 'Climate Short: Systems Snapshot',
            description: 'A short-form climate explainer designed for rapid engagement and conversation starters.',
            type: 'video',
            duration: '<1 min',
            url: 'https://youtube.com/shorts/nn1lXFGqu5U?si=_eV0s7AoJYM82_jy',
          },
          {
            title: 'Marvel Climate',
            description: 'Short educational climate videos and explainers focused on practical action and communication.',
            type: 'video',
            duration: 'Short-form',
            url: 'https://www.marvelclimate.com/',
          },
          {
            title: 'Gen Z Mental Health: Climate Stories',
            description: 'Short documentary that explores the mental health impacts of the climate crisis to young adults worldwide.',
            type: 'video',
            duration: '8 min',
            url: 'https://www.climatementalhealth.net/genzfilm',
          },
          {
            title: 'How to Find Joy in Climate Action | Ayana Elizabeth Johnson | TED',
            description: 'TED talk on finding agency, joy, and sustained motivation in climate action.',
            type: 'video',
            duration: '10 min',
            url: 'https://www.youtube.com/watch?v=VsOJR40M0as',
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
            description: 'Examples of national climate action and innovation in Denmark.',
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
          {
            title: 'The Humanities & Climate Change? — Touch the Heart: Stories of Climate Resilience in Massachusetts',
            description: 'Highlights climate resilience projects led by two nonprofit organizations: the Hitchcock Center for the Environment in Amherst and Hola Cultura in East Boston.',
            type: 'video',
            duration: '4 min',
            url: 'https://www.youtube.com/watch?v=E4yMaHLVdgQ',
          },
        ],
      },
      {
        title: 'Sector-Specific Examples',
        items: [
          {
            title: 'The Sand Motor / De Zandmotor',
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
          {
            title: 'EAT Forum',
            description: 'Global platform advancing science-based food systems transformation for human and planetary health.',
            type: 'Website',
            duration: 'Self-paced',
            url: 'https://eatforum.org',
          },
          {
            title: 'Good Energy Collective (Good Power)',
            description: 'Policy and education resources on equitable clean energy transitions and climate action.',
            type: 'Website',
            duration: 'Self-paced',
            url: 'https://goodpower.org/',
          },
        ],
      },
    ],
  },
  'learning-opportunities': {
    id: 'learning-opportunities',
    title: 'Learning Opportunities',
    description: 'Climate and educational organizations for further learning and professional development.',
    sections: [
      {
        title: '',
        items: [
          {
            title: 'Teach Climate',
            description: 'Educational resources and programs for climate learning.',
            type: 'Website',
            duration: 'Interactive',
            url: 'https://www.teachclimate.org/',
          },
          {
            title: 'Compassionate Climate Program',
            description: 'Youth led climate education program with the Center for Systems Awareness',
            type: 'Case Study',
            duration: 'Varies',
            url: 'https://systemsawareness.org/youth-leadership-team/compassionate-climate-community/',
          },
          {
            title: 'Compassionate Systems Framework',
            description: 'Hands-on workshop on systems leadership offered by the Center for Systems Awareness',
            type: 'Website',
            duration: 'Varies',
            url: 'https://systemsawareness.org/what-we-do/#programs',
          },
          {
            title: 'MIT Day of Climate',
            description: 'Educational resources and activities for teaching climate change.',
            type: 'Website',
            duration: 'Interactive',
            url: 'https://dayofclimate.mit.edu/',
          },
          {
            title: 'MIT Climate Action through Education',
            description: 'Interdisciplinary, modular, standards-aligned climate change curricula for U.S. high school teachers',
            type: 'Website',
            duration: 'Interactive',
            url: 'https://cate.mit.edu/',
          },
          {
            title: 'Subject to Climate',
            description: 'Free climate resources for all K-12 subjects',
            type: 'Website',
            duration: 'Interactive',
            url: 'https://subjecttoclimate.org/',
          },
        ],
      },
    ],
  },
};
