import plutchikWheel from '../assets/Plutchik-Model-600.png';
import globalTempAudio from '../assets/GlobalTemperature.mp3';
import renewableEnergyAudio from '../assets/RenewableEnergy.mp3';
import climateInteractiveLogo from '../assets/ci-logo.svg';
import enroadsScreenshot from '../assets/En-Roads-Screenshot 2026-01-30.png';
import enroadsTemp from '../assets/En-Roads-Temp.png';
import climateChangeGif from '../assets/Climate Change Weather GIF by INTO ACTION.gif';
import forestImage from '../assets/forest.jpg';
import windTurbinesImg from '../assets/Wind turbines.jpg';
import coalPlantImg from '../assets/coal_plant_cut.png';
import carbonPricingImg from '../assets/carbon_pricing_meeting.jpg';
import carbonPriceAudio from '../assets/CarbonPrice.mp3';
import FourthExerciseDashboard from '../components/FourthExerciseDashboard';
import waterImg from '../assets/water.jpg';
import openingMeditationAudio from '../assets/Module1-OpeningMeditation.m4a';
import hopeMeditationAudio from '../assets/Module1-HopeMeditation.m4a';
import coalOilGasAudio from '../assets/Coal-Oil-Gas.mp3';
import globalWarmingImg from '../assets/module_3/global-warming.png';
import puzzleAnimation from '../assets/module_3/assembling_puzzle_animation.json';
import brainstorming from '../assets/module_3/brainstorming.json';
import carbonAndEmissionsImg from '../assets/carbon_and_emissions.jpg';
import carbonEquityAudio from '../assets/Carbon-Equity.mp3';
import scenario1Img from '../assets/Scenario1.png';
import scenario2Img from '../assets/Scenario2.png';
import scenario3Img from '../assets/Scenario3.png';
import scenario4Img from '../assets/Scenario4.png';



export type FlipCardData = {
  frontTitle: string;
  frontDescription?: string;
  backTitle?: string;
  backDescription: string;
};

export type ContentBlock =
  | { type: 'text'; title?: string; content: string; hideIcon?: boolean }
  | { type: 'video'; title?: string; videoUrl: string; description?: string }
  | { type: 'audio'; title?: string; audioUrl: string; description?: string; transcript?: string }
  | { type: 'image'; imageUrl: string; alt: string; title?: string; width?: string }
  | { type: 'image-collage'; title?: string; images: { imageUrl: string; alt: string; caption?: string }[]; width?: string; columns?: 1 | 2 | 3 | 4 }
  | { type: 'button'; label: string; url: string; variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'; size?: 'default' | 'sm' | 'lg' | 'icon'; iconName?: string; newTab?: boolean }
  | { type: 'lottie'; title?: string; animationData?: unknown; animationUrl?: string; loop?: boolean; autoplay?: boolean; speed?: number; width?: string; height?: string }
  | { type: 'icon'; iconName?: string; iconAsset?: string; size?: number; color?: string; title?: string }
  | { type: 'flip-cards'; title?: string; cards: FlipCardData[] }
  | { type: 'quote-carousel'; title?: string; quotes: { quote: string; author: string; subtitle?: string }[] }
  | { type: 'dashboard'; }
  | { type: 'exercise1-dashboard'; }
  | { type: '2ndExerciseDashboard'; }
  | { type: 'third-exercise'; }
  | { type: 'fourth-exercise'; }
  | { type: 'module3-carbon-price-dashboard'; }
  | { type: 'html-embed'; htmlFile: string; title?: string }
  | { type: 'reflection'; prompt: string; id: string }
  | { type: 'poll'; question: string; options: string[]; id: string; singleSelect?: boolean }
  | { type: 'numeric-prediction'; question: string; id: string; unit?: string }
  | { type: 'meditation'; title: string; content: string }
  | { type: 'module-feedback'; title: string; description: string; id: string };

export type BlockWrapper = {
  type: 'block';
  blockTitle?: string;
  colorTheme: 'blue' | 'green' | 'amber' | 'purple' | 'pink' | 'teal';
  content: ContentBlock[];
};

export type ModuleSection = ContentBlock | BlockWrapper;

export type ModuleStructure = {
  id: number;
  title: string;
  headerImage: string;
  sections: ModuleSection[];
};

export const moduleStructures: ModuleStructure[] = [
  {
    id: 1,
    title: "Relating to Climate Futures",
    headerImage: waterImg,
    sections: [
      {
        type: 'block',
        colorTheme: 'teal',
        content: [
          {
            type: 'text',
            title: '**About this Module**',
            content: "Climate change isn't just about science and data—it's deeply personal.\n\n Understanding how climate futures affect you, your community, and the world helps build meaningful connections to the issue. This module explores how we emotionally and intellectually relate to different possible futures, and why these connections matter for taking action."
          },
          {
            type: 'button',
            label: 'Open Glossary',
            url: '/glossary',
            variant: 'outline',
            iconName: 'BookOpen'
          },
          {
            type: 'text',
            title: '**Key Concepts**',
            content: ''
          },
          {
            type: 'flip-cards',
            cards: [
              {
                frontTitle: 'Climate Change',
                frontDescription: 'A global shift',
                backTitle: 'Definition',
                backDescription: 'Long-term shifts in temperatures and weather patterns, primarily due to human activities like burning fossil fuels and cutting down forests and other habitats.'
              },
              {
                frontTitle: 'Systems',
                frontDescription: 'Connected parts',
                backTitle: 'Definition',
                backDescription: 'A system is a group of connected parts that interact with one another and together create outcomes that none of the parts could produce on their own.'
              },
              {
                frontTitle: 'Systems Thinking',
                frontDescription: 'Understanding connections',
                backTitle: 'Definition',
                backDescription: 'Systems thinking is the practice of looking at how different parts of a situation or system connect and influence each other so you can understand the bigger picture and why certain outcomes happen.'
              },
              {
                frontTitle: 'Systems Sensing',
                frontDescription: 'Paying close attention',
                backTitle: 'Definition',
                backDescription: 'The skill of paying close attention to what\'s happening in a system using all our senses, emotions, and lived experience. It helps us notice patterns, relationships, and changes to better understand how everything is connected.'
              },
              {
                frontTitle: 'Emotions',
                frontDescription: 'Feelings you experience',
                backTitle: 'Definition',
                backDescription: 'Feelings you experience in response to what\'s happening around or inside you. They range from joy and excitement to stress, anger, or confusion, and help you understand your experiences and needs.'
              },
              {
                frontTitle: 'Awareness',
                frontDescription: 'Noticing and understanding',
                backTitle: 'Definition',
                backDescription: 'Being able to notice and understand what you\'re feeling, thinking, or experiencing in the moment. It\'s paying attention to your emotions without judging them and recognizing how they affect your choices and relationships.'
              }
            ]
          },
          {
            type: 'text',
            title: '**Reflection**',
            content: "Climate change brings up many emotions, feelings and opinions based on our experience and context.\n\nHow do we get in touch with this emotional landscape?"
          },
          {
            type: 'audio',
            title: 'Listen to the audio recording',
            audioUrl: openingMeditationAudio,
            transcript: `Take a comfortable seat.
Let your feet rest on the floor.
Gently close your eyes, or soften your gaze.
Take a slow breath in through your nose…
and a long breath out through your mouth.
As you breathe, notice what comes up when you think about climate change.
You might feel worry, sadness, anger, or confusion.
You might also feel care, connection, or hope.
Whatever you feel is okay.
You don't need to fix these emotions.
Just notice them—like clouds passing through the sky.
Now ask yourself quietly:
How can I stay connected to what I care about without letting it overwhelm me?
As you breathe in, imagine drawing in steadiness.
As you breathe out, imagine releasing what's too heavy to carry alone.
As you breathe in, imagine drawing in community.
As you breathe out, imagine releasing despair.
Remember:
You are allowed to care and to rest.
You are allowed to learn and to be human.
Take one more slow breath.
When you're ready, gently return to the room.
Thank you for practicing with me. 
`
          },
          {
            type: 'text',
            title: '**Learning to Name Our Emotions**',
            content: "The Wheel of Emotions, created by psychologist Robert Plutchik, is a tool that can help you make sense of what you're feeling.\n\nThink of it like a map of emotions: it shows eight basic feelings—such as joy, fear, anger, and surprise—and how they shift, grow stronger, or blend into other emotions.\n\nWhen you're having a tough day, feeling stressed, or even just noticing a mood change, the wheel can help you put a name to what's going on inside. The more clearly you can identify your emotions, the easier it becomes to communicate with others, make thoughtful decisions, and understand yourself better.\n\nUsing this tool is a simple way to build emotional awareness and strengthen your overall well‑being.\n\nTake a look at the Wheel of Emotions and identify any emotions that you connect with when you think about climate change."
          },
          {
            type: 'image',
            title: 'Wheel of Emotions',
            imageUrl: plutchikWheel,
            alt: "Plutchik's Wheel of Emotions",
            width: '70%'
          },
          {
            type: 'reflection',
            prompt: 'What emotions do you feel when you think about climate change?',
            id: 'emotions-initial'
          }
        ]
      },
      {
        type: 'block',
        colorTheme: 'green',
        content: [
          {
            type: 'text',
            title: '**Understanding Climate Drivers and Impacts**',
            content: "Think about the possible impacts of climate change–whether those occurring right now or those in the future."
          },
          {
            type: 'poll',
            id: 'impacts-poll',
            question: 'What do you care about most?',
            options: ['Flooding', 'Fires', 'Species loss', 'Extreme Heat']
          },
          {
            type: 'text',
            title: '**What If?**',
            content: "We will begin to explore some of the primary drivers that are causing climate change and the impact that different policies and actions could have in shaping our collective future.\n\nA powerful tool for exploring this is En-ROADS, an interactive climate simulation made by Climate Interactive based on real scientific research. Think of it like a real‑life \"what if?\" simulator for the Earth's future."
          },
          {
            type: 'image',
            imageUrl: climateInteractiveLogo,
            alt: 'Climate Interactive Logo',
            width: '40%'
          },
          {
            type: 'image',
            imageUrl: enroadsScreenshot,
            alt: 'En-ROADS Screenshot'
          },
          {
            type: 'text',
            content: "**En-ROADS lets you explore questions like:**\n\n• What happens if we use more renewable energy?\n• What if cars and buildings become more energy efficient, such as needing less gas or electricity to fuel them?\n• What if countries put a price on pollution?\n\nYou move sliders that represent real-world global policy choices—energy, transportation, food, forests, and technology—and the simulator instantly shows how those choices affect:\n\n• Global temperature\n• Sea level rise\n• Air pollution\n• Energy use\n• Economic outcomes"
          },
          {
            type: 'text',
            title: '**Why does global temperature matter?**',
            content: '',
            hideIcon: true
          },
          {
            type: 'image',
            imageUrl: climateChangeGif,
            alt: 'Climate Change Weather Animation',
            width: '33%'
          },
          {
            type: 'audio',
            title: '**What does global temperature increase mean?**',
            audioUrl: globalTempAudio,
            transcript: "When scientists talk about global temperature increase, they are comparing today's average Earth temperature to what it was before the Industrial Revolution, around eighteen fifty—before cars, factories, and power plants burned large amounts of fossil fuels.\n\nRight now, Earth has already warmed by about one point two degrees Celsius, or two point two degrees Fahrenheit. That may not sound like much, but even small changes in Earth's average temperature can cause big changes in weather and ecosystems—just like how a small change in body temperature can make a human very sick.\n\nThe Paris Climate Agreement set two key temperature goals. The main goal is to keep global warming well below two degrees Celsius. The safer goal, which countries are encouraged to aim for, is limiting warming to one point five degrees Celsius.\n\nAt one point five degrees, there are fewer deadly heat waves, less sea level rise, and a lower risk of extreme weather. At two degrees or more, storms and floods become much stronger, many coral reefs die, and more people face extreme heat and food and water shortages.\n\nSo while both levels of warming are dangerous, limiting warming to one point five degrees is much safer than reaching two degrees."
          },
          {
            type: 'text',
            content: "In En-ROADS, the current projection if global policies and collective behavior remain the same as present, the global temperature increase by 2100 will be 3.3 degrees Celsius or 5.9 degrees Fahrenheit."
          },
          {
            type: 'image',
            imageUrl: enroadsTemp,
            alt: 'En-ROADS Temperature Projection',
            width: '40%'
          },
          {
            type: 'text',
            content: "That far exceeds the 1.5 degree Celsius goal. So what can we do?"
          }
        ]
      },
      {
        type: 'block',
        colorTheme: 'amber',
        content: [
          {
            type: 'text',
            title: '**Let\'s try some solutions.**',
            content: `While many climate lessons tell you **what's wrong**, En‑ROADS lets you **experiment with solutions**.

Instead of just hearing: "Climate change is bad and complicated," you get to:

• Test ideas yourself
• See **cause and effect** immediately
• Discover which solutions matter most

You're not memorizing facts—you're **thinking like a decision‑maker.**

So, let's try it out! 

We'll introduce you to En-ROADS a few elements at a time. Later, we'll play with the full model.`
          },
          {
            type: 'text',
            title: '**Exercise 1: Nature-Based Carbon Dioxide Removal**',
            content: ''
          },
          {
            type: 'image',
            imageUrl: forestImage,
            alt: 'Forest landscape',
            width: '100%'
          },
          {
            type: 'text',
            content: `**Could we just plant more trees? What if we planted a trillion trees?**

Some organizations and groups are advocating just that. They advocate that planting more trees will help slow climate change by using trees' natural ability to **remove carbon dioxide (CO₂)** from the atmosphere.

Trees absorb CO₂ as they grow and store that carbon in their trunks, branches, roots, and surrounding soil. This process is known as **carbon sequestration**.

Planting a trillion trees would cover 550 million hectares–or over 2 million square miles–of unforested land with forest. To visualize, imagine half the area of the entire United States of America.

So, let's try this solution out! Let's plant more trees–a nature-based solution to carbon dioxide removal.`
          },
          {
            type: 'text',
            title: '**First, let\'s make a prediction**',
            content: ''
          },
          {
            type: 'poll',
            id: 'afforestation-impact-poll',
            question: 'How impactful do you think this solution will be?',
            options: ['Very impactful', 'Moderately impactful', 'Not very impactful'],
            singleSelect: true
          },
          {
            type: 'numeric-prediction',
            question: 'If we implemented this solution, what do you think the global temperature increase by 2100 would be? Would it stay at 3.3 degrees Celsius? Would it increase or decrease?',
            id: 'afforestation-temp-prediction',
            unit: '°C'
          },
          {
            type: 'text',
            title: '**Make a Model**',
            content: ''
          },
          {
            type: 'flip-cards',
            title: '**Concept Cards: How to Use the En-ROADS Graphs**',
            cards: [
              {
                frontTitle: 'Sliders',
                frontDescription: 'Control solutions',
                backDescription: 'Sliders are focused on solutions. You can move the slider in different directions to maximize or minimize its effect.'
              },
              {
                frontTitle: 'Graphs',
                frontDescription: 'Display impacts',
                backDescription: 'Graphs display impacts. You will see the main graph of global temperature increase by 2100. You can also choose an impact graph you care about.'
              }
            ]
          },
          {
            type: 'exercise1-dashboard'
          },
          {
            type: 'text',
            title: '**Let\'s Reflect**',
            content: ''
          },
          {
            type: 'reflection',
            prompt: 'Pause and reflect on these graphs. What do you notice? What do you wonder?',
            id: 'exercise-1-reflection-1'
          },
          {
            type: 'reflection',
            prompt: 'What assumptions did you have that were challenged? What surprised you?',
            id: 'exercise-1-reflection-2'
          }
        ]
      },
      {
        type: 'block',
        colorTheme: 'purple',
        content: [
          {
            type: 'text',
            title: '**Exercise 2: Renewable Energy**',
            content: ''
          },
          {
            type: 'image',
            imageUrl: windTurbinesImg,
            alt: 'Wind turbines generating renewable energy',
            width: '100%'
          },
          {
            type: 'text',
            content: `What about green or renewable energy? Can't we use the power of the sun and wind to power our communities?

Advocates of renewable energy point to its many advantages, both for the planet and for our communities. Renewable energy has big benefits, including:

• Produces little to no pollution.
• Uses resources (the sun and wind) that won't run out in the foreseeable future.
• Helps stabilize energy costs.
• Supports energy independence.
• Creates jobs and boosts local economies.
• Pairs well with modern energy technology.

So what is renewable energy?`
          },
          {
            type: 'audio',
            audioUrl: renewableEnergyAudio,
            title: 'What is Renewable Energy?',
            transcript: `When we talk about renewable energy, we're talking about sources of power that come from naturally replenishing resources—things like the sun, wind, the heat inside the Earth, and flowing water. These energy sources don't run out the way fossil fuels do, and they produce little to no carbon pollution, which makes them a key part of addressing climate change.

For example, building solar panels, wind turbines, or geothermal systems allows us to create electricity without burning coal, oil, or gas. Hydropower—electricity generated from moving water—is another important renewable option. You might notice that nuclear energy and bioenergy are usually discussed separately because they work differently and have their own benefits and challenges.

Renewable energy also connects to other technologies. We can produce clean hydrogen using renewable power, which can then be used as fuel without releasing carbon dioxide. And because sources like wind and solar can vary from moment to moment, we also invest in energy storage (like batteries) to help balance the system and make sure electricity is available whenever people need it.`
          },
          {
            type: 'text',
            content: 'Should we try it out? What if the world encouraged building solar panels, geothermal, and wind turbines through tax subsidies?'
          },
          {
            type: 'text',
            title: '**First, let\'s make a prediction**',
            content: ''
          },
          {
            type: 'poll',
            id: 'renewables-impact-poll',
            question: 'How impactful do you think this solution will be?',
            options: ['Very impactful', 'Moderately impactful', 'Not very impactful'],
            singleSelect: true
          },
          {
            type: 'numeric-prediction',
            id: 'renewables-temp-prediction',
            question: 'If we implemented this solution, what do you think the global temperature increase by 2100 would be? Would it stay at 3.3 degrees Celsius? Would it increase or decrease?',
            unit: '°C'
          },
          {
            type: 'text',
            title: '**Make a Model**',
            content: ''
          },
          {
            type: '2ndExerciseDashboard'
          },
          {
            type: 'text',
            title: '**Let\'s Reflect**',
            content: ''
          },
          {
            type: 'reflection',
            prompt: 'Pause and reflect on these graphs. What do you notice? What do you wonder?',
            id: 'renewables-reflection-1'
          },
          {
            type: 'reflection',
            prompt: 'What assumptions did you have that were challenged? What surprised you?',
            id: 'renewables-reflection-2'
          }
        ]
      },
      {
        type: 'block',
        colorTheme: 'amber',
        content: [
          {
            type: 'text',
            title: '**Exercise 3 — Fossil Fuels**',
            content: ' ',
            hideIcon: true
          },
          {
            type: 'image',
            imageUrl: coalPlantImg,
            alt: 'Duke Energy\'s Cliffside Coal Plant',
            width: '60%'
          },
          {
            type: 'audio',
            title: 'Can we stop using oil, coal and gas?',
            audioUrl: coalOilGasAudio,
            transcript: `When people talk about divesting from oil, gas, and coal, they’re talking about moving money away from companies that extract or sell fossil fuels. Advocates believe this is one of the ways we can send a strong message about the future we want to build.

They argue that when schools, cities, banks, or other institutions pull their investments out of fossil fuel companies, it reduces financial support for industries that contribute the most to carbon pollution.

At the same time, divestment can shift money toward cleaner energy sources like wind, solar, and geothermal. Supporters say this isn’t just symbolic—it's a way to push the global economy toward low‑carbon solutions faster.

Advocates also point out that fossil fuels are becoming riskier investments over time because the world is moving toward cleaner energy. By divesting now, they say communities can avoid financial losses and take a stand that aligns with climate science. According to this perspective, widespread divestment helps accelerate the transition to renewable energy and sends a clear signal that society is serious about addressing climate change.

To reduce use of fossil fuels–oil, gas and coal–one strategy is to place higher taxes on these products.`
          },
          {
            type: 'text',
            content: 'Should we try it out?  You know the process, let’s go!'
          },
          {
            type: 'text',
            title: '**Let\'s make a prediction**',
            content: ' '
          },
          {
            type: 'poll',
            id: 'fossil-fuel-impact-poll',
            question: 'How impactful do you think this solution will be?',
            options: ['Very impactful', 'Moderately impactful', 'Not very impactful'],
            singleSelect: true
          },
          {
            type: 'numeric-prediction',
            question: 'If we implemented this solution, what do you think the global temperature increase by 2100 would be?  Would it stay at 3.3 degrees Celsius? Would it increase or decrease?',
            id: 'fossil-fuel-temp-prediction',
            unit: '°C'
          },
          {
            type: 'text',
            title: '**Make a Model**',
            content: ' '
          },
          {
            type: 'third-exercise'
          },
          {
            type: 'text',
            title: '**Let\'s Reflect**',
            content: ' '
          },
          {
            type: 'reflection',
            prompt: `Pause and reflect on these graphs. What do you notice? What do you wonder?

What assumptions did you have that were challenged? What surprises you?`,
            id: 'fossil-fuel-reflection'
          }
        ]
      },
      {
        type: 'text',
        title: '**Exercise 4 — Carbon Price**',
        content: ' ',
        hideIcon: true
      },
      {
        type: 'image',
        imageUrl: carbonPricingImg,
        alt: 'Carbon Pricing Coalition Leadership Meeting',
        width: '60%'
      },
      {
        type: 'text',
        content: 'Should we charge those who pollute?  Could we tax companies who release more carbon dioxide into the atmosphere?  Communities are exploring this very solution, with advocates arguing that carbon price is a powerful strategy for reducing emissions and speeding up the shift to cleaner energy.'
      },
      {
        type: 'audio',
        title: 'What is carbon price?',
        audioUrl: carbonPriceAudio,
        transcript: `A carbon price is a policy tool that puts a cost on releasing carbon dioxide into the atmosphere. Think of it as a way to make polluting more expensive and clean energy more attractive. When a carbon price is in place, energy sources that produce a lot of carbon—like coal, oil, and natural gas—become more expensive than cleaner options such as wind, solar, or geothermal.

There are a few different ways countries can do this. One approach is to set a global carbon price so that, no matter where you are, companies pay based on how much they pollute. Another option is a clean electricity standard or an emissions performance standard, which essentially says, “You can only produce electricity up to this amount of carbon per unit.” Anything dirtier becomes harder or more expensive to use.

Advocates say carbon pricing creates a clear signal: if you pollute more, you pay more. That encourages companies to adopt cleaner technologies and reduce emissions. But there’s another important piece: when energy companies face higher costs, they might pass those costs on to customers. That’s why any carbon pricing policy has to be designed carefully—to make sure it doesn’t put an unfair burden on low‑income families.`
      },
      {
        type: 'text',
        content: "Should we try it out? You know what we need to do next."
      },
      {
        type: 'text',
        title: '**Let’s make a prediction**',
        content: ' ',
        hideIcon: true
      },
      {
        type: 'poll',
        id: 'carbon-price-impact-poll',
        question: 'How impactful do you think this solution will be?',
        options: ['Very impactful', 'Moderately impactful', 'Not very impactful'],
        singleSelect: true
      },
      {
        type: 'numeric-prediction',
        question: 'If we implemented this solution, what do you think the global temperature increase by 2100 would be?  Would it stay at 3.3 degrees Celsius? Would it increase or decrease?',
        id: 'carbon-price-temp-prediction',
        unit: '°C'
      },
      {
        type: 'fourth-exercise'
      },
      {
        type: 'reflection',
        prompt: 'Pause and reflect on these graphs. What do you notice? What do you wonder?',
        id: 'carbon-price-reflection'
      },
      {
        type: 'text',
        title: '**Let\'s Reflect**',
        content: 'Think back through these four exercises. What did you notice across these different scenarios? What do you notice? What do you wonder?',
        hideIcon: true
      },
      {
        type: 'reflection',
        prompt: 'What was disappointing?\n\nWhat gave you the most hope?\n\nAny patterns or trends?',
        id: 'exercises-comparison-reflection'
      },
      {
        type: 'block',
        colorTheme: 'teal',
        content: [
          {
            type: 'text',
            title: '**The Practice of Hope**',
            content: "Change takes time. We started this module exploring the complex emotions that we may have about climate change.  We explored different possible solutions and impacts.\n\nHow are we feeling now? \n\nWe can hold both today’s reality and a vision for the future."
          },
          {
            type: 'audio',
            title: 'Meditation: Hope as an Active Muscle',
            audioUrl: hopeMeditationAudio,
            transcript: `I invite you to take a moment to pause and to reflect on your experience over these past few minutes.

You might close your eyes, notice your breathing. Inviting into awareness of how you feel at this moment.

As you reflect on the last exercises, notice any emotions that were evoked. Confronting the realities of climate change can be daunting. We can learn to be with the difficulty that arises through reflection and through community and connection.

We also need to have a vision of what is possible, a vision of our future that we can contribute positively towards.

Hope is a muscle, one we can grow with practice.

As you continue to breathe, reflect, What is your vision of a better future? What gives you hope? Where can you notice the feeling of hope in your body, your mind or heart?

Throughout these exercises, we invite you to pause and reconnect with that sense of possibility, that sense of hope, as together we build our muscles and nurture a better world.

Thank you for practicing.`
          }
        ]
      },
      {
        type: 'module-feedback',
        title: 'Congratulations on completing Module 1: Relating to Climate Futures!',
        description: "Before you begin the next, we'd love your feedback on this learning experience.",
        id: 'module-1-feedback'
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
        type: 'block',
        colorTheme: 'amber',
        content: [
                      {
            type: 'text',
            title: '**About this Module**',
            content: "So far, we’ve explored several high‑leverage climate solutions—policies and actions that can significantly reduce net emissions and slow the rise in global temperature.\n\n Now we’re going to ask an important question:"
          },
                {
            type: 'lottie',
            animationData: puzzleAnimation,
            loop: true,
            autoplay: true,
            speed: 0.8,
            width: '709px',
            height: '540px',
          },
                {
        type: 'text',
        title: '**What happens when we combine solutions?**',
        content: "Some high‑leverage policies—like a carbon price—are extremely effective at lowering emissions. But in a system where everything is connected, every solution has consequences, both good and bad.\n\n In this module, we’ll take a closer look at the ethical, ecological, and economic effects that different climate policies can create."
      },
                      {
        type: 'text',
        title: '**How do we explore solutions thoughtfully, without ignoring the impacts they might have?**',
        content: "To help you think like a systems scientist or policymaker, you’ll use the full En‑ROADS simulator to design your own climate policy scenario—one that reduces emissions and considers real‑world trade‑offs."
      },
        ]
      },
            {
        type: 'block',
        colorTheme: 'green',
        content: [
                {
        type: 'image',
        imageUrl: carbonAndEmissionsImg,
        alt: 'White and black ship on sea under white clouds',
        width: '80%'
      },
                      {
            type: 'text',
            title: '**Group Activity**',
            content: "In Modules 1 and 2, we saw that putting a price on carbon is one of the fastest and strongest ways to reduce emissions. \n\n But lowering emissions isn’t the only effect of a carbon price."
          },
          {type: 'text',
            content: 'All climate policies create: \n\n• **Positive side‑effects** (sometimes called multisolving)\n   - Example: Improving public health or saving money long-term \n\n• **Unintended negative impacts** \n   -Often hit people with lower incomes the hardest'
          },
          {type: 'text',
            content: 'Trying to reduce or prevent those negative impacts is called **equity work**—making sure solutions are fair to everyone.'
          },
                    {
            type: 'text',
            title: '**Brainstorm individually or in small groups:**',
            content: '',
            hideIcon: true
          },
          {
            type: 'lottie',
            animationData: brainstorming,
            loop: true,
            autoplay: true,
            speed: 0.8,
            width: '496px',
            height: '378px',
          },
          {type: 'text',
          content: '1. **What positive side‑effects could a carbon price create?** \n (Think: health, transportation, jobs, air quality, etc.) \n\n 2.**What potential harms could it cause?** \n How might these harms show up in different communities? \n\n 3.**How could we reduce or prevent those harms?** \n (Hint: government support, rebates, investments, equity policies)',
          },
          {
            type: 'text',
            title: '**Let\'s Reflect**',
            content: ''
          },
          {
            type: 'reflection',
            prompt: 'What could be beneficial effects of a carbon price?',
            id: 'group-activity-1'
          },
          {
            type: 'reflection',
            prompt: 'What could be harmful effects?',
            id: 'group-activity-2'
          },
        ]
      },
                  {
        type: 'block',
        colorTheme: 'green',
        content: [
                          {
        type: 'image',
        imageUrl: enroadsScreenshot,
        alt: 'White and black ship on sea under white clouds',
        width: '100%'
      },
      {
            type: 'text',
            title: '**Explore the Scenario in En‑ROADS**',
            content: "Now you’ll get to experiment with the carbon price slider and see how this policy affects two important side‑effects shown in the graphs:"
          },
                      {
            type: 'text',
            title: '**1. Air Pollution**',
            hideIcon: true,
            content: "Measured as the amount of harmful particles released into the air each year. \n Long‑term exposure to air pollution increases the risk of:\n\n• Asthma\n• Heart disease\n• Stroke\n• Chronic obstructive pulmonary disease (COPD)\n• Lung cancer\n• Dementia\n\n Cleaner air usually means **healthier communities.**"
          },    
                                {
            type: 'text',
            title: '**2. Average Price of Energy for Consumers**',
            hideIcon: true,
            content: 'This graph shows the average cost of energy for everyday people—including:\n\n• Electricity\n• Gas\n• Hydrogen\n\nWhen this line goes up, **energy bills get more expensive** for everyone, which can create equity concerns.'
          },   
          {
            type: 'text',
            title: '**Let’s Predict**',
            hideIcon: true,
            content: 'Before you use the model, take a moment to make your predictions.'
          },
          {type: 'reflection',
            prompt: 'What do you think will happen to the price of energy and the amount of air pollution as the carbon price increases?',
            id: 'predict-1'
          },
                    {
            type: 'text',
            title: '**Make a Model**',
            hideIcon: true,
            content: ''
          },
          { type: 'module3-carbon-price-dashboard' },
            {
            type: 'text',
            title: '**Let\'s Reflect**',
            content: ''
          },
          {
            type: 'reflection',
            prompt: 'What did you notice happening in the carbon price model?\n\nDescribe how emissions, air pollution, and energy prices changed as you adjusted the carbon price.',
            id: 'prediction-reflection-1'
          },
          {
            type: 'reflection',
            prompt: 'Looking at this through an equity lens, what might this scenario mean for different people?\n\nThink about who benefits and who might face challenges.',
            id: 'prediction-reflection-2'
          },
                    {
            type: 'reflection',
            prompt: 'Who do you think would be most affected by this policy? Why?\n\nConsider income levels, communities, industries, or regions.',
            id: 'prediction-reflection-3'
          },
                    {
            type: 'reflection',
            prompt: 'Are there groups who might be positively affected—and others who might be negatively affected—by raising the carbon price?\n\nExplain what those effects could look like in real life.',
            id: 'prediction-reflection-4'
          },
        {type: 'audio',
          audioUrl: carbonEquityAudio,
          title: 'Understanding Trade-offs',
          transcript: `By now, we know that a carbon price basically makes it more expensive to release carbon into the atmosphere. So if an energy source gives off more CO₂ for every unit of energy it produces, it becomes more expensive under a carbon price. In this case, energy sources that release less carbon would stay cheaper.
Among the fossil fuels, coal produces the most CO₂ per unit of energy, and it also creates the worst air pollution. That means when we raise the carbon price, coal gets much more expensive compared to cleaner options. As a result, people and companies would use way less of it.
And when coal use drops, air pollution drops too—by a lot.


This is a really important positive side effect. Less coal leads to cleaner air which leads to fewer breathing problems which enables healthier communities and lower healthcare costs.
But there’s a trade‑off too.
You probably noticed in the model that the average price of energy goes up when the carbon price increases. This happens because companies usually pass their higher costs onto customers.
And here’s why that matters:
For most households—especially lower‑income households—energy is a basic, non‑optional cost. People can’t just stop using electricity or heating. So when prices rise, poorer communities feel it the most.
You may have also seen that energy prices peak around 2037. That’s when the carbon price hits its highest level after slowly increasing for about ten years.
If a government wants people to support a carbon price, it has to think carefully about how to protect the people who would be hurt most by rising energy costs.`
        },
        {type: 'text',
        title: '**❓So here’s the big question:**',
        hideIcon: true,
        content: '**What policies could help balance things out?**\nIf a carbon price brings in extra money to the government, how could that money be used to:\n\n• Lower energy bills for low‑income families?\n• Help people transition to clean energy?\n• Make the policy feel fair for everyone?\n\nThat’s your challenge to think about.',
        },
        {
            type: 'text',
            title: '**Let\'s Reflect**',
            content: ''
          },
        {type: 'reflection',
          prompt: 'What policies can you think of that could achieve this goal?',
          id: 'prediction-reflection-5'
        }
        ]
      },
      {
        type: 'block',
        colorTheme: 'green',
        content: [
          {
            type:'text',
            title: '**Create Your Own Climate Policy Scenario in En‑ROADS**',
            hideIcon: true,
            content:''
          },
        {
        type: 'image',
        imageUrl: enroadsScreenshot,
        alt: 'White and black ship on sea under white clouds',
        width: '100%'
      },
      {
        type: 'text',
        title: '**Now it\'s your turn to design a climate future!**',
        hideIcon: true,
        content: 'Using the **full En‑ROADS climate policy simulator**, create a scenario that reflects the kind of world you want to help build. As you experiment with the sliders, try to meet these three goals **at the same time:**'
      },
      { type: 'text',
        title: '**Your Challenge**',
        content: '\n**1- Keep global warming below 2°C** \n(You’ll see this on the main En‑ROADS temperature graph.)\n\n **2- Reduce inequality** \n (Think about what policies are fair, who they help, and who might be harmed.) \n\n **3- Balance costs and fairness**\n (Consider energy prices, economic impacts, and how to support communities most affected by the transition.)**'
          },
            { type: 'text',
        title: '**Your Task**',
        hideIcon: true,
        content: 'Use the sliders—energy, land use, transportation, carbon removal, and policies—to build a scenario that meets these goals.\n here’s no single “right answer,” but there are trade‑offs you’ll need to think through.'
          },
            { type: 'text',
        title: '**When you’re done**',
        hideIcon: true,
        content: 'Click the “Share Your Scenario” button, copy the link, and return back here.'
          },
          {
        type: 'button',
        label: 'Now go create in En-ROADS!',
        url: 'https://en-roads.climateinteractive.org/scenario.html?v=25.11.0',
        variant: 'default',
        size: 'default',
        iconName: 'ExternalLink',
        newTab: false   
  }

        ]
      },
            {
        type: 'block',
        colorTheme: 'green',
        content: [
      {
        type: 'text',
        title: '**👋 Welcome back!**',
        hideIcon: true,
        content: 'How was En-ROADS?  We’d love to learn from your experience.'
      },
      {type: 'text',
        title: '**Share your scenario**',
        hideIcon: true,
        content: ''
      },
                    {type: 'reflection',
          prompt: 'Paste your En-ROADS Scenario link here:',
          id: 'en-roads-scenario-1'
        },
      {
            type: 'text',
            title: '**Let\'s Reflect - Reflect on your scenario:**',
            content: ''
          },
              {type: 'reflection',
          prompt: '• Which policies did you choose and why? \n • How did your scenario keep warming below 2°C? \n • What choices did you make to reduce inequality or protect vulnerable communities? \n • How did you think about fairness and cost? \n • What surprised you while designing your scenario?',
          id: 'en-roads-scenario-2'
        }
        ]
      },
                  {
        type: 'block',
        colorTheme: 'green',
        content: [
      {
        type: 'text',
        title: '**Imagining the Future**',
        hideIcon: true,
        content: '🎉 You have just joined the over 492,000+ people around the world who have created climate scenarios using En-ROADS.'
      },
      {
        type: 'quote-carousel',
        title: '**What leaders say about En‑ROADS**',
        quotes: [
          {
            quote: 'En‑ROADS is quite simply a climate crisis game-changer for policymakers and people across the country. Everyone is hearing more and more about the science, but sometimes it takes a demonstration tool like En‑ROADS for people to see first-hand that every one of us needs to be on a war footing and mobilize to fight this crisis head-on. Our goal with World War Zero is to drive at least ten million conversations about the climate crisis: En‑ROADS is the ultimate conversation starter.',
            author: 'John Kerry',
            subtitle: 'U.S. Special Presidential Envoy for Climate (2021–2024), U.S. Secretary of State (2013–2017)'
          },
                    {
            quote: 'Amidst a complex and urgent issue, En-ROADS emerges as a beacon of understanding and direction. The simulator connects scientific research with tangible pathways for action, empowering leaders to make informed decisions that shape effective climate strategies. It\'s time to act, and En-ROADS puts the power to act decisively in our hands.',
            author: 'Sissi Knispel de Acosta',
            subtitle: 'Executive Secretary, European Climate Research Alliance (ECRA). Brussels, Belgium'
          },
                              {
            quote: 'EN-ROADS lit my brain on fire….in one screen, the model communicates the urgency of the climate change threat, powerfully debunks cherished myths, confirms the importance of current commitments and emphasizes how much more we have to do.',
            author: 'Roberta Barbieri',
            subtitle: 'Vice President, Global Sustainability, PepsiCo, United States'
          }
        ]
      },
      {
        type:'text',
        title: '',
        hideIcon: true,
        content: 'There are a number of roadmaps to our possible shared future.'
      },
      {
        type: 'image-collage',
        title: '**Scenario snapshots**',
        width: '1100px',
        images: [
          { imageUrl: scenario1Img, alt: 'Scenario 1', caption: 'Scenario 1' },
          { imageUrl: scenario2Img, alt: 'Scenario 2', caption: 'Scenario 2' },
          { imageUrl: scenario3Img, alt: 'Scenario 3', caption: 'Scenario 3' },
          { imageUrl: scenario4Img, alt: 'Scenario 4', caption: 'Scenario 4' }
        ]
      },
            {
        type:'text',
        title: '',
        hideIcon: true,
        content: 'Seeing these scenarios of the future, and creating your own, can evoke a lot. \n\n We might begin to think about all the policies, collaborations, and societal changes needed. \n\n We might imagine what these futures look like–and wonder where we or our communities might be doing in that future. \n\n Let’s take a moment to pause and check in with yourselves.'
      },
                {
            type: 'image',
            title: 'Wheel of Emotions',
            imageUrl: plutchikWheel,
            alt: "Plutchik's Wheel of Emotions",
            width: '70%'
          },
                {
        type:'text',
        title: '',
        hideIcon: true,
        content: 'Let’s revisit the emotion wheel. What emotions came up when you were creating your En-ROADS scenario?  It’s okay if there were many or even conflicting emotions. '
      },
      {type: 'reflection',
        prompt: 'How are you feeling? What emotions do you feel when you think about these climate futures?',
        id: 'en-roads-scenario-3'
      }
        ]
      },
                  {
        type: 'block',
        colorTheme: 'green',
        content: [
           {
        type: 'module-feedback',
        title: 'Congratulations on completing Module 3: Roadmaps to Possible Futures!',
        description: "Before you begin the next, we'd love your feedback on this learning experience.",
        id: 'module-3-feedback'
      }
        ]
      },
    ]
  }
];
