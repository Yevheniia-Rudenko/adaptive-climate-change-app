export type ContentBlock =
  | { type: 'text'; title?: string; content: string }
  | { type: 'video'; title?: string; videoUrl: string; description?: string }
  | { type: 'image'; imageUrl: string; alt: string }
  | { type: 'dashboard';}
  | { type: 'third-exercise';}
  | { type: 'reflection'; prompt: string; id: string }
  | { type: 'meditation'; title: string; content: string };


export type ModuleStructure = {
  id: number;
  title: string;
  headerImage: string;
  sections: ContentBlock[];
};

export const moduleStructures: ModuleStructure[] = [
  {
    id: 1,
    title: "Relating to Climate Futures",
    headerImage: "https://images.unsplash.com/photo-1761486533154-cec2262c4d53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmUlMjBjaXR5JTIwc3VzdGFpbmFibGV8ZW58MXx8fHwxNzY1MTc1MDY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    sections: [
      {
        type: 'text',
        title: 'Understanding the Concept',
        content: "Climate change isn't just about science and data—it's deeply personal. Understanding how climate futures affect you, your community, and the world helps build meaningful connections to the issue. This module explores how we emotionally and intellectually relate to different possible futures, and why these connections matter for taking action."
      },
      {
        type: 'image',
        imageUrl: "https://images.unsplash.com/photo-1761486533154-cec2262c4d53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmUlMjBjaXR5JTIwc3VzdGFpbmFibGV8ZW58MXx8fHwxNzY1MTc1MDY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Sustainable future city"
      },
      {
        type: 'video',
        title: 'Watch & Learn',
        videoUrl: 'https://www.youtube.com/embed/dcSeYYcaCLo',
        description: 'Explore different climate future scenarios'
      },
      {
        type: 'reflection',
        prompt: 'How do you feel when you think about climate futures? What emotions come up—hope, anxiety, motivation, or something else?',
        id: 'emotions'
      },
      {
        type: 'dashboard'
      },
      {
        type: 'reflection',
        prompt: 'After exploring the interactive dashboard, what insights did you gain about how our choices shape climate futures?',
        id: 'insights'
      },
      {
        type:'third-exercise'
      },
            {
        type: 'reflection',
        prompt: 'What do you notice?',
        id: 'deforestation'
      }
    ]
  },
  {
    id: 2,
    title: "Stock and Flow",
    headerImage: "https://images.unsplash.com/photo-1752770645022-cdd45e86500d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGZsb3clMjBuYXR1cmV8ZW58MXx8fHwxNzY1MTc0ODg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    sections: [
      {
        type: 'text',
        title: 'Understanding Stocks and Flows',
        content: "Imagine Earth's climate as a bathtub. Carbon dioxide is the water flowing in (emissions) and flowing out (absorption by forests and oceans). Right now, we're adding water faster than the drain can handle—the tub is overflowing. Understanding 'stocks' (accumulated CO₂) and 'flows' (rates of emission and absorption) helps us see why reducing emissions alone isn't enough—we need to balance the whole system."
      },
      {
        type: 'video',
        title: 'The Bathtub Analogy',
        videoUrl: 'https://www.youtube.com/embed/7siNvegeu0Y',
        description: 'Learn about climate stocks and flows'
      },
      {
        type: 'dashboard'
      },
      {
        type: 'reflection',
        prompt: 'Think about the "bathtub" analogy. How does visualizing climate change as stocks and flows change how you understand the problem?',
        id: 'understanding'
      },
      {
        type: 'image',
        imageUrl: "https://images.unsplash.com/photo-1752770645022-cdd45e86500d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGZsb3clMjBuYXR1cmV8ZW58MXx8fHwxNzY1MTc0ODg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Water flow in nature"
      },
      {
        type: 'reflection',
        prompt: 'What actions do you think could help balance the "flows" in our climate system?',
        id: 'actions'
      }
    ]
  },
  {
    id: 3,
    title: "Roadmap to Possible Futures",
    headerImage: "https://images.unsplash.com/photo-1704466260929-047dca5330a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXRod2F5JTIwZm9yZXN0JTIwbGlnaHR8ZW58MXx8fHwxNzY1MTc1MDY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    sections: [
      {
        type: 'meditation',
        title: 'Reflection: Envisioning Futures',
        content: "Take a moment to close your eyes and imagine two different worlds in 2050. In one, we took bold action on climate. In the other, we continued as usual. How do you feel about each scenario? What do you see, hear, and experience in each future?"
      },
      {
        type: 'text',
        title: 'Multiple Pathways Ahead',
        content: "The future isn't written yet—there are multiple pathways ahead. Some lead to warming of 3°C or more, with severe impacts. Others lead to 1.5°C, preserving more of what we love. This module maps out different scenarios based on the choices we make today. Understanding these roadmaps helps us see that our actions matter and that change is still possible."
      },
      {
        type: 'video',
        title: 'Climate Pathways Explained',
        videoUrl: 'https://www.youtube.com/embed/Euw3kdNLReU'
      },
      {
        type: 'dashboard'
      },
      {
        type: 'image',
        imageUrl: "https://images.unsplash.com/photo-1704466260929-047dca5330a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXRod2F5JTIwZm9yZXN0JTIwbGlnaHR8ZW58MXx8fHwxNzY1MTc1MDY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "A pathway through a forest with light"
      },
      {
        type: 'reflection',
        prompt: 'Which possible future feels most real to you? What gives you hope or concern about the path we\'re on?',
        id: 'vision'
      },
      {
        type: 'reflection',
        prompt: 'What role do you see yourself playing in creating a better climate future?',
        id: 'role'
      }
    ]
  },
  {
    id: 4,
    title: "Systems View of Climate Solutions",
    headerImage: "https://images.unsplash.com/photo-1638068109209-002be3ae4950?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5ld2FibGUlMjBlbmVyZ3klMjBzb2xhciUyMHdpbmR8ZW58MXx8fHwxNzY1MTY5NTc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    sections: [
      {
        type: 'text',
        title: 'Interconnected Solutions',
        content: "Climate solutions aren't isolated fixes—they're interconnected parts of a larger system. Renewable energy affects transportation, which affects urban planning, which affects how we live and work. This systems view shows how solutions in one area can create positive ripple effects across many others. It's about seeing the big picture and understanding leverage points."
      },
      {
        type: 'image',
        imageUrl: "https://images.unsplash.com/photo-1638068109209-002be3ae4950?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5ld2FibGUlMjBlbmVyZ3klMjBzb2xhciUyMHdpbmR8ZW58MXx8fHwxNzY1MTY5NTc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Renewable energy - solar and wind"
      },
      {
        type: 'dashboard'
      },
      {
        type: 'video',
        title: 'Systems Thinking',
        videoUrl: 'https://www.youtube.com/embed/0k2-SzlDGko',
        description: 'Understanding interconnected climate solutions'
      },
      {
        type: 'reflection',
        prompt: 'Can you think of a climate solution that connects to other parts of your daily life? How do these connections make you feel about creating change?',
        id: 'connections'
      },
      {
        type: 'reflection',
        prompt: 'What synergies or co-benefits did you discover while exploring the systems dashboard?',
        id: 'synergies'
      }
    ]
  },
  {
    id: 5,
    title: "Lever of Change",
    headerImage: "https://images.unsplash.com/photo-1742729096780-600245031d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZXZlciUyMG1lY2hhbmlzbSUyMGNoYW5nZXxlbnwxfHx8fDE3NjUxNzUwNjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    sections: [
      {
        type: 'text',
        title: 'High-Leverage Actions',
        content: "Not all actions have equal impact. Some changes—like policy shifts, technology innovation, or social movements—act as 'levers' that can move the entire system. These high-leverage interventions create cascading effects. Understanding where to push can help you focus your energy where it matters most, whether that's in your community, your career choices, or your advocacy."
      },
      {
        type: 'video',
        title: 'Finding Your Lever',
        videoUrl: 'https://www.youtube.com/embed/ipVxxxqwBQw'
      },
      {
        type: 'dashboard'
      },
      {
        type: 'image',
        imageUrl: "https://images.unsplash.com/photo-1742729096780-600245031d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZXZlciUyMG1lY2hhbmlzbSUyMGNoYW5nZXxlbnwxfHx8fDE3NjUxNzUwNjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Lever mechanism representing change"
      },
      {
        type: 'reflection',
        prompt: 'What lever of change feels most accessible to you right now? How does knowing about high-leverage actions affect your sense of agency?',
        id: 'agency'
      },
      {
        type: 'meditation',
        title: 'Creative Tension',
        content: "There's a gap between where we are now and where we need to be. This gap creates 'creative tension'—a force that can motivate action. Take a moment to sit with this tension. What does it feel like? What does it inspire you to do?"
      },
      {
        type: 'reflection',
        prompt: 'Reflect on your vision: If you could use one lever to create change in the next year, what would it be and why?',
        id: 'vision'
      }
    ]
  }
];