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
import module2Water from '../assets/module2/water.jpg';
import stockFlowExample from '../assets/module2/stock-vs-flow-example1.jpg';
import co2Removal1 from '../assets/module2/co2removal_1.jpg';
import co2Removal2 from '../assets/module2/co2removal_2.jpg';
import netZeroImg from '../assets/module2/Net zero = emissions in \u2013 removals out = 0.png';
import hopeOrientationImg from '../assets/module2/Hope Orientation-Tippett.png';
import hopeStockAudio from '../assets/module2/Module2-Hope-as-a-Stock.m4a';
import systemsIcebergImg from '../assets/systems_iceberg.jpg';
import icebergExplainerAudio from '../assets/IcebergExplainer.mp3';
import mandalaForSystemsChangeImg from '../assets/module_5/mandala-for-systems-change.png';
import youthLeadershipImg from '../assets/module_5/youthleadership.png';
import skyRocketAnimation from '../assets/module_5/sky_rocket.json';
import breatheImg from '../assets/module_5/breathe.jpg';


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
  | { type: 'module2-exercise'; }
  | { type: 'module2-removals'; }
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
    title: "Stock & Flow",
    headerImage: module2Water,
    sections: [
      {
        type: 'block',
        colorTheme: 'teal',
        content: [
          {
            type: 'text',
            title: '**About this Module**',
            content: "Some things build up slowly — and that changes everything. "
          },
          {
            type: 'image',
            imageUrl: stockFlowExample,
            alt: "Stock vs flow example"
          },
          {
            type: 'text',
            title: '',
            content: "So imagine you've got a **bathtub**.\n\n- The **water already in the tub** is the **stock**.\n- The **water coming in from the faucet** is a **flow**.\n- The **water draining out** is another **flow**.\n\n The size of the stock (how much water is in the tub) depends on the flows (how fast water enters or leaves).\n\nSo if the faucet is running faster than the drain?\n➡️ The tub fills up.\n\nIf the drain is faster than the faucet?\n➡️ The tub empties.\n\nIf they're equal?\n➡️ The water level stays the same."
          },
{
            type: 'video',
            title: '**What is Stock and Flow?**',
            videoUrl: 'https://www.youtube.com/embed/nRlYGDBGcRA',
            description: ''
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
                frontTitle: 'Stock',
                frontDescription: 'What accumulates over time',
                backTitle: 'Definition',
                backDescription: 'A stock is anything in a system that can build up or decrease over time, like a “container” that holds a quantity—such as water in a reservoir, money in a savings account, or carbon in the atmosphere.'
              },
              {
                frontTitle: 'In-flow',
                frontDescription: 'What increases the stock',
                backTitle: 'Definition',
                backDescription: 'An in‑flow is anything that adds to a stock—like water flowing into a bathtub, new money going into a bank account, or carbon being released into the atmosphere.'
              },
              {
                frontTitle: 'Out-flow',
                frontDescription: 'What decreases the stock',
                backTitle: 'Definition',
                backDescription: 'An out‑flow is anything that takes away from a stock—like water draining from a bathtub, money being spent from a bank account, or carbon being removed from the atmosphere.'
              }
            ]
          },
          {
            type: 'text',
            title: '**🛁 Draw Your Own Stock & Flow**',
            content: "To explore how \"Stock and Flow\" works, let's start with a personal example."
          },
          {
            type: 'text',
            title: '**Step One**',
            content: "Draw a Stock and Flow diagram like in the image below.",
            hideIcon: true
          },
          {
            type: 'image',
            imageUrl: stockFlowExample,
            alt: 'Stock and Flow diagram example'
          },
          {
            type: 'text',
            title: '**Step Two**',
            content: "Pick a stock that you care about. Think about something quantifiable—meaning something that could be counted or measured. Some \"stock\" examples could be:\n\n- My free time\n- My level of well-being\n- My money\n- My level of motivation in my academics\n- The level of trust I have in my relationships\n- The level of hope I have in a positive future",
            hideIcon: true
          },
          {
            type: 'text',
            title: '**Step Three**',
            content: "Draw the in-flows to your chosen stock. What is adding to or filling up your stock? Try to identify at least three in-flows to your stock.",
            hideIcon: true
          },
          {
            type: 'text',
            title: '**Step Four**',
            content: "Draw the out-flows. What depletes or diminishes your stock? Remember, these in- and out-flows describe factors that change your stock over time. Try to identify at least 3 out-flows from your stock.",
            hideIcon: true
          },
          {
            type: 'text',
            title: '**Step Five**',
            content: "Share your Stock and Flow with a partner or in a small group.",
            hideIcon: true
          },
          {
            type: 'text',
            title: '**💭Let’s Reflect**',
            content: "",
          },
          {
            type: 'reflection',
            prompt: 'What was happening in your Stock and Flow model? What did you notice or wonder about your chosen stock when exploring it using this model? ',
            id: 'understanding'
          },
          {
            type: 'reflection',
            prompt: 'Did anything surprise you?',
            id: 'actions'
          },
        ]
      },

      {
        type: 'block',
        colorTheme: 'amber',
        content: [
          {
            type: 'text',
            title: '**🌍 Why This Matters for Climate Change**',
            content: "The idea of \"stock and flow\" might feel super obvious when we talk about something simple—like water filling up a bathtub. But when we try to use the same idea to understand climate change, things can get a little more complicated.\n\nStill, the stock‑and‑flow model is **really helpful** for understanding the basic forces driving climate change.\n\nFirst, we'll look at what's causing climate change today by running a few simulations in **En‑ROADS**.\n\nAfter that, we'll connect what we saw in the simulations to the stock‑and‑flow idea so the whole picture makes more sense.\n\nBut before we dive into En‑ROADS, let's make some predictions.\n\nThink about the relationship between CO₂ emissions (what we put into the atmosphere) and CO₂ concentration (how much ends up staying there).\n\nThese are two of the most important pieces of the climate system—so let's see what you already think before we explore the model."
          },
          {
            type: 'text',
            title: "**Let's Make a Prediction**",
            content: "Now let's think about what might happen if we try to reduce global CO₂ emissions.\n\nBefore we run any simulations, make your best predictions for each scenario:"
          },
          {
            type: 'poll',
            question: '**1. If our total CO₂ emissions stop rising and stay flat…**\nWhat do you think will happen to the amount of CO₂ already in the atmosphere?',
            options: ['Increase', 'Level out', 'Decrease'],
            id: 'prediction-flat-emissions',
            singleSelect: true
          },
          {
            type: 'poll',
            question: '**2. If our total CO₂ emissions drop a lot and become much lower than they are today…**\nWhat do you think will happen to the CO₂ concentration in the atmosphere?',
            options: ['Increase', 'Level out', 'Decrease'],
            id: 'prediction-lower-emissions',
            singleSelect: true
          },
        ]
      },
      {
        type: 'block',
        colorTheme: 'purple',
        content: [
          {
            type: 'text',
            title: "**Let's Test Your Predictions!**",
            content: "In this next activity, you'll use **En‑ROADS** to simulate these scenarios.\n\nAs we learned in the last module, a **carbon price** is one of the more powerful and high-leverage climate policies for quickly lowering our global CO₂ emissions.\n\nSo in this simulation, **you'll adjust the carbon price slider** to see how changing emissions affects the concentration of CO₂ in the atmosphere."
          },
          {
            type: 'module2-exercise'
          },
          {
            type: 'text',
            title: '**💭 Let\'s Reflect**',
            content: 'Take a moment to think about what you just observed in the simulation.'
          },
          {
            type: 'reflection',
            prompt: 'What do you notice?',
            id: 'module2-notice'
          },
          {
            type: 'reflection',
            prompt: 'Did your expectations match the outcome?',
            id: 'module2-expectations'
          },
          {
            type: 'reflection',
            prompt: 'Why do you think this is the result?',
            id: 'module2-why'
          },
        ]
      },
      {
        type: 'block',
        colorTheme: 'pink',
        content: [
          {
            type: 'text',
            title: '**Understanding CO₂ Removals**',
            content: "Now we're going to add **two more sliders** to our simulation. These sliders represent different ways we can **remove CO₂ from the atmosphere**—and we'll see how that changes the total CO₂ concentration over time."
          },
          {
            type: 'text',
            title: '**🌱 What are CO₂ removals?**',
            content: '**CO₂ removals** are natural or technological processes that **take carbon dioxide out of the air and store it somewhere else.**'
          },
          {
            type: 'image',
            imageUrl: co2Removal1,
            alt: 'Natural CO₂ removal processes'
          },
          {
            type: 'text',
            content: '**Natural CO₂ removals include:**\n\n- Trees and plants absorbing CO₂ as they grow\n- Soil storing carbon from dead plant material\n- The ocean absorbing CO₂ from the air (which unfortunately also makes the water more acidic)'
          },
          {
            type: 'image',
            imageUrl: co2Removal2,
            alt: 'Technological CO₂ removal processes'
          },
          {
            type: 'text',
            content: '**Technological CO₂ removals include:**\n\n- **Direct Air Capture (DACCS):** Machines that pull CO₂ from the air and store it deep underground in rock\n- **Enhanced mineralization:** Spreading special kinds of rock on land so they naturally absorb CO₂ faster than normal'
          },
          {
            type: 'text',
            title: '**🌳 Why we talk about "net" CO₂ removals**',
            content: "Even when CO₂ is removed, some of it can **leak back** into the atmosphere.\nThis can happen because of:\n\n- Wildfires\n- Logging\n- Farming\n- Land changes\n\nSo instead of just \"CO₂ removals,\" we use the term **net CO₂ removals**, which means:\n\n **Total CO₂ taken out of the atmosphere** *-* **Total CO₂ that ends up returning to the atmosphere**\n\nThis gives a more accurate picture of what's really happening."
          },
        ]
      },
      {
        type: 'block',
        colorTheme: 'teal',
        content: [
          {
            type: 'text',
            title: '**🎛️ How this works in the simulation**',
            content: "We can change how much CO₂ is removed from the atmosphere through policies like incentivizing farmers to reforest parts of their farmland, or by investing in technological carbon removal.\n\nThe two new En‑ROADS sliders below let you increase:\n\n- **Nature‑based CO₂ removal** (like reforestation)\n- **Technological CO₂ removal** (like direct air capture)\n\nWhen you adjust these sliders, you'll see a new graph called \"**CO₂ Emissions and Removals.**\"\n\nIt shows:\n- Emissions (what we add)\n- Removals (what we take out)\n\nAnd, as before, you'll still see the **CO₂ concentration graph** so you can watch how the total stock in the atmosphere changes."
          },
          {
            type: 'text',
            title: '**🧠 Let\'s Predict**',
            content: 'Before you start moving the sliders, make your prediction:'
          },
          {
            type: 'poll',
            question: 'When do you think the CO₂ concentration in the atmosphere will start to go down?',
            options: [
              'When CO₂ emissions are greater than CO₂ removals',
              'When CO₂ emissions are equal to CO₂ removals',
              'When CO₂ emissions are smaller than CO₂ removals'
            ],
            id: 'prediction-co2-removals',
            singleSelect: true
          },
          {
            type: 'text',
            title: '**⚙️ Make a Model**',
            content: ''
          },
          {
            type: 'module2-removals'
          },
          {
            type: 'text',
            title: '**💭 Let\'s Reflect**',
            content: 'Take a moment to think about what you just observed in the simulation.'
          },
          {
            type: 'reflection',
            prompt: 'What do you notice? Did your expectations match the outcome? Why do you think this is the result?',
            id: 'module2-removals-reflect'
          },
        ]
      },
      {
        type: 'block',
        colorTheme: 'blue',
        content: [
          {
            type: 'text',
            title: '**🌍 Why This Matters for Climate Change**',
            content: ""
          },
          {
            type: 'video',
            title: 'Think Like A Bathtub – COP26',
            videoUrl: 'https://www.youtube.com/embed/7WAMnt8thGs',
            description: 'Understanding climate change through the bathtub analogy'
          },
          {
            type: 'text',
            content: "Think of carbon dioxide (CO₂) the same way.\n-The **atmosphere** is like the bathtub—this is the **stock**.\n-Burning fossil fuels (cars, factories, etc.) is like the faucet—that's a **flow adding CO₂**.\n-Trees and oceans absorbing CO₂ is like the drain—that's a **flow removing CO₂**.\n\nRight now, the **faucet is on full blast**, and the **drain is slow**, so the \"bathtub\" of CO₂ keeps rising.\n\nEven if we slow down the faucet, the tub will **keep filling** unless the drain is equally fast."
          },
          {
            type: 'text',
            title: 'This helps explain why climate change is so hard:',
            content: "To stop the CO₂ level from rising, the inflows and outflows have to balance.\n\nUnderstanding \"stock and flow\" helps you see that climate change isn't just about using fewer fossil fuels—it's about changing the whole system so we stop overfilling the atmospheric \"bathtub.\"\n\nIt's not just about one good action.\n\nIt's about how all our collective actions affect the **total amount** over time."
          },
        ]
      },
      {
        type: 'block',
        colorTheme: 'green',
        content: [
          {
            type: 'text',
            title: '🌍 The Vision of "Net‑Zero Emissions"',
            content: "**What does Net-Zero Emissions mean?**\n\nThink of net‑zero emissions like balancing a scale.\n\nIt doesn't mean we produce zero carbon emissions ever again.\n\nIt means:\n\n**We don't add extra carbon dioxide to the atmosphere overall.**\n\nIn other words, any CO₂ we do emit gets balanced out by CO₂ we remove from the atmosphere."
          },
          {
            type: 'text',
            title: '🛁 Back to our Bathtub Metaphor',
            content: "Remember, imagine the atmosphere is a big bathtub (your CO₂ \"stock\").\n\n- The water coming in = **CO₂ emissions**\n- The water draining out = **CO₂ removals**\n\n**Net zero** is when water flows in at the same rate it flows out, so the water level stops rising.\n\nThat means CO₂ concentration in the atmosphere levels out instead of increasing."
          },
          {
            type: 'text',
            title: '🧩 How We Get to Net Zero',
            content: "To reach net zero, we need two big things working together:\n\n**1️⃣ Cut emissions as much as possible**\n\nThis means:\n- More renewable energy\n- Energy efficiency\n- Cleaner transportation\n- Better buildings\n- Switching away from fossil fuels\n\n*Reducing what's coming into the tub.*\n\n**2️⃣ Increase CO₂ removals**\n\nThis means:\n- Protecting forests\n- Re‑growing forests (reforestation)\n- Healthier soils\n- Technology that pulls CO₂ out of the air\n\n*Speeding up the drain.*"
          },
          {
            type: 'text',
            title: '🏁 Why Net Zero Matters',
            content: ''
          },
          {
            type: 'image',
            imageUrl: netZeroImg,
            alt: 'Net zero = emissions in – removals out = 0'
          },
          {
            type: 'text',
            content: "Scientists say we need to reach global net zero around 2050 to help limit warming to 1.5°C.\n\nWhy? Because the CO₂ already in the atmosphere keeps the Earth warming—so we have to stop adding more.\n\nNet zero is basically humanity saying: **\"We're done increasing the CO₂ level in the atmosphere.\"**\n\nIt's not perfection. It's balance.\n\nAnd it's one of the most important goals for keeping future climate change manageable."
          },
          {
            type: 'text',
            title: '💭 Let\'s Reflect',
            content: 'Take a moment to think about what you\'ve learned in this module.'
          },
          {
            type: 'reflection',
            prompt: 'What needs to happen for global temperatures to actually start going down?',
            id: 'module2-temp-going-down'
          },
          {
            type: 'reflection',
            prompt: 'Do you think temperatures will start dropping as soon as our emissions stop rising (when they peak)? Why or why not?',
            id: 'module2-peak-emissions'
          },
          {
            type: 'reflection',
            prompt: 'When we reach net zero emissions, will Earth\'s temperature return to what it was before the Industrial Revolution (late 1700s - mid‑1800s)? If not, what do you think will happen instead?',
            id: 'module2-net-zero-temp'
          },
          {
            type: 'reflection',
            prompt: 'What did this lesson help you understand about stocks and flows? How does that idea connect to climate change?',
            id: 'module2-stocks-flows-understanding'
          },
        ]
      },
      {
        type: 'block',
        colorTheme: 'amber',
        content: [
          {
            type: 'image',
            imageUrl: hopeOrientationImg,
            alt: 'Hope Orientation by Tippett'
          },
          {
            type: 'text',
            content: 'Listen to this short guided meditation that frames hope as a stock—something we can refill intentionally, even in the face of big global challenges.'
          },
          {
            type: 'audio',
            title: '🌎 Guided Meditation: Growing Climate Hope',
            audioUrl: hopeStockAudio,
            transcript: `Take a slow breath in…\nand a long breath out.\nLet your mind settle for a moment, like dust floating down in a quiet room.\n\nNow imagine that hope for the climate is a stock—a pool inside you that rises and falls over time.\nIt's normal for it to dip when you hear hard news or think about the future.\nIt's also possible to refill it—drop by drop.\n\nAs you breathe in, imagine a tiny stream flowing into that pool.\nThis stream is made of everything that strengthens your hopefulness:\nyoung people taking action,\nscientists discovering new solutions,\ncommunities planting trees, restoring land, or helping each other after storms,\nleaders and corporations making choices that move the world in the right direction.\n\nLet one of those images come to the front of your mind.\nHold it gently.\n\nWith each inhale, imagine that hopeful stream getting just a little stronger.\nWith each exhale, imagine releasing worry that feels too heavy to carry in this moment.\n\nSay silently to yourself:\n"Hope can grow. I can grow it."\n\nNotice your hope stock filling—slowly, steadily—like water rising in a bathtub when the faucet is turned on.\n\nTake one more full breath in…\nand a soft breath out.\n\nWhen you're ready, bring your attention back to the room, knowing that your hope is something you can refill—again and again.`
          },
        ]
      },
      {
        type: 'block',
        colorTheme: 'purple',
        content: [
          {
            type: 'module-feedback',
            title: 'Congratulations on completing Module 2: Stock and Flow!',
            description: "Before you begin the next, we'd love your feedback on this learning experience.",
            id: 'module-2-feedback'
          },
        ]
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
      },
    ]
  },
                  {
        type: 'block',
        colorTheme: 'green',
        content: [
           {
        type: 'module-feedback',
        title: '🎉 Congratulations on completing Module 3: Roadmaps to Possible Futures!',
        description: "Before you begin the next, we'd love your feedback on this learning experience.",
        id: 'module-3-feedback'
      }
        ]
      },
    ]
  },
  {
    id: 4,
    title: "Systems View of Climate Solutions",
    headerImage: systemsIcebergImg,
    sections: [
      // ── Submodule 1: Systems Iceberg Introduction ──────────────────────
      {
        type: 'block',
        colorTheme: 'blue',
        content: [
          {
            type: 'text',
            title: '**About this Module**',
            content: "To change outcomes, we need to look beneath the surface at systems.\n\nWe need systems thinking to understand climate change because it's not caused by one thing—it's shaped by many interconnected systems like energy, transportation, food, economics, and politics that all influence one another.\n\nSystems thinking helps us see these connections clearly, so we can design climate solutions that are effective, fair, and avoid unintended consequences."
          },
          {
            type: 'text',
            title: '🌊 The Systems Iceberg',
            content: "The Systems Iceberg Model is a way of looking at the world that helps us understand *why* things happen—not just *what* happens on the surface."
          },
          {
            type: 'image',
            imageUrl: systemsIcebergImg,
            alt: 'Systems Iceberg Model showing Events, Behavioral Patterns, Underlying Structures, Mental Models, and Artifacts',
            width: '80%'
          },
          {
            type: 'text',
            content: "It comes from the field of systems dynamics and it's used to help people understand complex issues.\n\nThe big idea is this: 👉 **What we see happening is only the tip of the iceberg.**\n\nMost of the reasons things happen are hidden *below the surface.*\n\nLet's break it down."
          }
        ]
      },
      // ── Submodule 2: Top of the Iceberg — Events ──────────────────────
      {
        type: 'block',
        colorTheme: 'teal',
        content: [
          {
            type: 'text',
            title: '❄️ Top of the Iceberg: Events',
            content: "The top of the iceberg is what you see. These are things that happen right in front of you.\n\n**Examples:**\n• A heat wave\n• A wildfire\n• A spike in energy prices\n• Protests about pollution\n• The latest climate news headline\n\nEvents are important, but they're only the surface. If we pay attention only to events, we can feel overwhelmed and think the world is random or chaotic."
          },
          {
            type: 'reflection',
            prompt: 'What climate "events" do you notice or see in your life?',
            id: 'm4-events-reflection'
          }
        ]
      },
      // ── Submodule 3: Just Below the Surface — Patterns & Trends ───────
      {
        type: 'block',
        colorTheme: 'green',
        content: [
          {
            type: 'text',
            title: '🔁 Just Below the Surface: Patterns & Trends',
            content: "If you zoom out in time, events start forming behavioural patterns and trends.\n\n**Examples:**\n• Heat waves happening more often\n• Wildfires getting bigger\n• Energy prices rising faster in certain communities\n• Air pollution affecting the same neighborhoods again and again\n• Consumers buying more single-use plastics every year\n\nPatterns show us:\n\n👉 **This isn't random—something is repeating.**"
          },
          {
            type: 'reflection',
            prompt: 'What climate "patterns" do you see in your life?',
            id: 'm4-patterns-reflection'
          }
        ]
      },
      // ── Submodule 4: Deeper — Underlying Systemic Structures ──────────
      {
        type: 'block',
        colorTheme: 'amber',
        content: [
          {
            type: 'text',
            title: '⚙️ Deeper: Underlying Systemic Structures',
            content: "This is where systems thinking gets powerful.\n\nThe underlying structures are the artifacts and mental models that shape patterns and events."
          },
          {
            type: 'text',
            title: 'Artifacts',
            content: "First, let's cover the artifacts — these are the often tangible and visible structures that shape our systems like:\n\n• How our energy system is built\n• Which communities live near highways or factories\n• Pricing systems for fossil fuels\n• Transportation options\n• Who makes policy decisions\n• Where money and power flow in a society\n\nThese artifacts create the conditions that make certain outcomes more likely than others.\n\nIf we want to change patterns, we need to understand and redesign these artifacts, not just react to events."
          },
          {
            type: 'reflection',
            prompt: 'What artifacts related to climate do you see in your life?',
            id: 'm4-artifacts-reflection'
          }
        ]
      },
      // ── Submodule 5: Deepest Level — Mental Models ────────────────────
      {
        type: 'block',
        colorTheme: 'purple',
        content: [
          {
            type: 'text',
            title: '🧠 Deepest Level: Mental Models',
            content: "**The Ideas and Beliefs That Shape the System**\n\nAt the very bottom of the iceberg are mental models—the beliefs, assumptions, and stories people hold about how the world works.\n\n**Examples:**\n• \"The earth is a resource for humans.\"\n• \"Fossil fuels are necessary for economic growth.\"\n• \"Some communities can handle more pollution than others.\"\n• \"Technology will fix everything.\"\n• \"My actions don't matter.\"\n• \"Climate solutions help everyone equally.\"\n\nThese beliefs shape the choices we make, and those choices shape the structures we build.\n\nChanging mental models is slow and hard—but it's where the most meaningful, lasting change begins."
          },
          {
            type: 'reflection',
            prompt: 'What mental models do you have about climate change?',
            id: 'm4-mental-models-reflection'
          }
        ]
      },
      // ── Submodule 6: Why Think About Climate Systems Using the Iceberg Model ──
      {
        type: 'block',
        colorTheme: 'blue',
        content: [
          {
            type: 'text',
            title: 'Why Think About Climate Systems Using the Iceberg Model?',
            content: ''
          },
          {
            type: 'image',
            imageUrl: systemsIcebergImg,
            alt: 'Systems Iceberg Model — Events, Behavioral Patterns, Underlying Structures, Mental Models & Artifacts',
            width: '80%'
          },
          {
            type: 'audio',
            title: 'Listen: The Iceberg & En-ROADS',
            audioUrl: icebergExplainerAudio,
            transcript: `So far, in En‑ROADS, we've been moving sliders that represent policy choices—things like carbon pricing, renewable energy, or reforestation. These sliders are all artifacts of the system: they're the visible actions or rules that shape what people and organizations do.

When we change these policies, they influence behaviors in the system—how much energy we use, which fuels companies choose, how quickly technologies spread.

Those behaviors then lead to the events we've been tracking in the impacts graphs, like global temperature rise, air pollution levels, or emissions curves.

That's the part above the waterline of the iceberg.

But systems thinking asks us to go deeper.

The most important part—and the one we often overlook—is the level of mental models.

These are the beliefs, assumptions, and stories people carry that shape decisions in the first place.

One of the biggest mental models in climate work is:
"We already have the technology and know-how to fix a huge part of the climate problem… so why haven't we done it yet?"

This question points us to the underlying structures—the things beneath the surface that shape behavior long before policies ever change.

Students can be invited to think about:
What beliefs keep leaders from acting?
What assumptions shape our energy system?
What mindsets or values guide where money flows?
What stories do people tell about what's possible—or impossible?

These deeper layers help explain why climate progress doesn't always match what science and technology say is achievable.

The iceberg reminds us:
If we want real change, we can't just react to the events at the top.
We need to understand—and maybe shift—the beliefs and systems underneath them.`
          },
          {
            type: 'text',
            title: '**Concept Cards**',
            content: "Let's review the elements of the systems iceberg.\n\n**The deeper you go, the more power you have to create change.**"
          },
          {
            type: 'flip-cards',
            cards: [
              {
                frontTitle: '🏔️ Events',
                frontDescription: 'What happened?',
                backTitle: 'Events',
                backDescription: 'The visible occurrences we notice day-to-day — a wildfire, a flood, a spike in energy prices. Reacting only to events keeps us at the surface.'
              },
              {
                frontTitle: '📈 Behavioral Patterns',
                frontDescription: "What's been happening over time?",
                backTitle: 'Behavioral Patterns',
                backDescription: 'Trends and recurring behaviors we notice over time — rising temperatures decade after decade, or the same neighborhoods facing repeated flood damage.'
              },
              {
                frontTitle: '⚙️ Artifacts',
                frontDescription: 'What policies, technologies or rules create these patterns?',
                backTitle: 'Artifacts',
                backDescription: 'The tangible structures that shape outcomes — energy infrastructure, zoning laws, pricing systems, who holds decision-making power, where money and resources flow.'
              },
              {
                frontTitle: '🧠 Mental Models',
                frontDescription: 'What beliefs keep this system in place?',
                backTitle: 'Mental Models',
                backDescription: 'The deepest level — the beliefs, assumptions and stories that shaped the structures in the first place. Changing mental models is slow, but it\'s where the most lasting change begins.'
              }
            ]
          }
        ]
      },
      // ── Submodule 7: Draw Your Own Climate Iceberg ────────────────────
      {
        type: 'block',
        colorTheme: 'pink',
        content: [
          {
            type: 'text',
            title: '✏️ Draw Your Own Climate Iceberg',
            content: "It's time to now draw your own systems iceberg. You may create your iceberg individually or as a team.\n\nThink about a current issue related to climate change that matters to you.\n\nDraw each of the layers of the iceberg and make notes about what is happening at each level."
          },
          {
            type: 'reflection',
            prompt: '🏔️ Event\n\nChoose an event related to a climate change issue that is specific, meaningful to you, and that you would like to understand better.',
            id: 'm4-own-iceberg-event'
          },
          {
            type: 'reflection',
            prompt: '📈 Behavioral Patterns\n\nWhat\'s been happening over time to shape this event?',
            id: 'm4-own-iceberg-patterns'
          },
          {
            type: 'reflection',
            prompt: '⚙️ Artifacts\n\nWhat infrastructure, policies, regulations, technologies, or rules create these patterns?',
            id: 'm4-own-iceberg-artifacts'
          },
          {
            type: 'reflection',
            prompt: '🧠 Mental Models\n\nWhat beliefs or assumptions shape people\'s behaviours and keep this system in place?',
            id: 'm4-own-iceberg-mental-models'
          }
        ]
      },
      // ── Submodule 8: Let's Reflect ────────────────────────────────────
      {
        type: 'block',
        colorTheme: 'teal',
        content: [
          {
            type: 'text',
            title: '💭 Let\'s Reflect',
            content: 'Share your iceberg experience:'
          },
          {
            type: 'reflection',
            prompt: 'What behaviors and patterns over time are contributing to the event you chose?\n\nWhat underlying structures (mental models and artifacts) are driving those behaviors and patterns?\n\nWhere do you see opportunity or leverage for change?',
            id: 'm4-final-reflection'
          }
        ]
      },
      // ── Submodule 9: Why the Systems Iceberg Matters for Climate Change ─
      {
        type: 'block',
        colorTheme: 'green',
        content: [
          {
            type: 'text',
            title: '🌍 Why the Systems Iceberg Matters for Climate Change',
            content: "When we look at climate issues only at the \"events\" level (heat waves, storms, fires), we feel:\n\n• Overwhelmed\n• Hopeless\n• Reactive\n\nBut when we look deeper:\n\n• We see patterns\n• We understand underlying structures\n• We change artifacts\n• We question mental models\n\nAnd suddenly, real solutions become possible.\n\nThe iceberg helps us shift from:\n\n❌ *\"This problem is too big.\"*\n\nto\n\n✅ *\"I can understand how the system works—and help change it.\"*"
          }
        ]
      },
      {
        type: 'module-feedback',
        title: '🎉 Congratulations on completing Module 4: Systems View of Climate!',
        description: "Before you begin the next, we'd love your feedback on this learning experience.",
        id: 'module-4-feedback'
      }
    ]
  },
  {
    id: 5,
    title: "Lever of Change",
    headerImage: "https://images.unsplash.com/photo-1742729096780-600245031d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZXZlciUyMG1lY2hhbmlzbSUyMGNoYW5nZXxlbnwxfHx8fDE3NjUxNzUwNjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    sections: [
          {
        type: 'block',
        colorTheme: 'pink',
        content: [
                    {
            type: 'text',
            title: '',
            content: "**You have a role to play.** \n\n By now, you’ve seen both the **gravity** of the climate crisis and the **real reasons for hope**—from powerful policy tools to nature‑based solutions, from systems thinking to community action. This final module is about turning what you’ve learned into **impact.**\n"
          },
          {
            type: 'lottie',
            animationData: skyRocketAnimation,
            loop: true,
            autoplay: true,
            width: '80%'
          },

                    {
            type: 'text',
            title: 'Holding Creative Tension',
            hideIcon: true,
            content: "In this program, we’ve practiced **creative tension:**\n\n• **Current Reality:** what the data and your En‑ROADS simulations show.\n• **Vision:** the healthier, fairer future you believe is possible.\n\nThe space **between** those two is not a void—it’s **energy**. When we face the truth and keep our vision alive, that tension fuels **focused, courageous action.** This module helps you channel that energy into **levers of change**—places in the system where smart, well‑designed actions can shift outcomes."
          },
        ]
      },
            {
        type: 'block',
        colorTheme: 'pink',
        content: [
          {
            type: 'text',
            title: 'You are not alone: the power of collective leadership',
            hideIcon: true,
            content: "A major global study surveyed 10,000 young people (ages 16–25) in 10 countries about their emotional responses to climate change. The results show that climate anxiety is widespread, intense, and deeply connected to how young people view government action."
          },
                    {
            type: 'text',
            title: '😟 1. Most young people across all countries are worried about climate change',
            hideIcon: true,
            content: "• **59%** said they were **very or extremely worried** \n• **84%** were at least **moderately worried**\n\nYoung people everywhere—regardless of country—are carrying strong concern about the future of the planet."
          },
          {
            type: 'text',
            title: '💬 2. More than half reported feeling a range of difficult emotions',
            hideIcon: true,
            content: "Over 50% of respondents said they feel:\n• Sad \n• Anxious \n• Angry \n• Powerless \n• Helpless \n• Guilty\n\nThis shows that climate change isn’t just a scientific or political issue—it’s an emotional one."
          },
          {
            type: 'text',
            title: '🧠 3. Climate anxiety affects daily life and thinking for many',
            hideIcon: true,
            content: "• More than **45%** said climate-related feelings **negatively affect their daily life and functioning** \n• **75%** said “the future is frightening” \n• **83%** said that “people have failed to take care of the planet”\n\nThis suggests that climate anxiety is shaping how young people see their future and their place in it."
          },
          {
            type: 'text',
            title: '🏛️ 4. Young people rated government climate responses very negatively',
            hideIcon: true,
            content: "Respondents said they felt:\n• **More betrayal than reassurance** when thinking about government action\n• A sense that leaders are **not doing enough** to protect them\n\nThese feelings of betrayal were stronger in countries where climate impacts are severe."
          },
          {
            type: 'text',
            title: '🔗 5. Climate anxiety is strongly linked to feeling let down by government',
            hideIcon: true,
            content: "The researchers found a clear connection:\n\n• When young people believe their government is not responding adequately, their **climate anxiety and distress increase.**"
          },
                    {
            type: 'text',
            title: '',
            hideIcon: true,
            content: "In other words, it’s not just the climate crisis itself—it’s the feeling that adults in power aren’t acting fast enough.\n\nThis study shows that **young people around the world are deeply worried about climate change**, experiencing strong emotions that affect their daily lives. Feelings of **fear, sadness, and anger** are common. Most importantly, the research shows that **inadequate government action** makes these feelings **worse**, leading to a sense of betrayal.\n\nYouth climate anxiety is not irrational—it’s a **real, evidence‑based response** to global inaction."
          },
          {
            type: 'button',
            label: 'Check out the study',
            newTab: true,
            url: 'https://www.thelancet.com/journals/lanplh/article/PIIS2542-5196%2821%2900278-3/fulltext'
          },
          {
            type: 'text',
            title: 'A Call to Youth Leadership',
            hideIcon: true,
            content: "Real change needs **informed, brave youth leaders**—people who can:\n\n • Think in systems, not quick fixes\n • Consider **equity and fairness**, not just averages\n • Communicate with **clarity and care**\n • Act with **persistence** when the work is hard\n\nYou don’t have to do everything. But you **can** do something—strategically, together."
          },          
        ]
      },
          {
        type: 'block',
        colorTheme: 'pink',
        content: [
          {
            type: 'text',
            title: '2. Finding Your Climate Action',
            hideIcon: true,
            content: "**Where can you have an impact in climate action?**\n\n Dr. Ayana Elizabeth Johnson, a marine biologist, policy expert, writer, and climate solution advocate, has an inspiring way to think about this very question."
          },
          {
            type: 'video',
            title: 'Watch as Dr. Johnson shares “How to Find Joy in Climate Action”',
            videoUrl: 'https://www.youtube.com/embed/VsOJR40M0as?si=4wHcfG7r6kODHJV5',
            description: 'A video by Dr. Johnson discussing the importance of finding joy in climate action.'
          },
          {
            type: 'text',
            title: 'Draw your own venn diagram inspired by Dr. Johnson’s talk.',
            content: "• What are you good at?\n\n • What needs doing?\n\n • What brings you joy?"
          },
          {
            type:'reflection',
            prompt:'What did you discover in this exercise? What climate actions might it inspire?',
            id:'module-5-reflection-1'
          }
          
        ]
      },
          {
        type: 'block',
        colorTheme: 'pink',
        content: [
          {
            type: 'text',
            title: '3. Designing for Systems Change',
            content: "Inspired by the last exercise of discovering your climate action, let’s plan your action out further. \n\n This systems tool can help give the understanding of what is needed to accomplish this my goals"
          },
          {
            type: 'text',
            title: 'Mandala for Systems Change',
            hideIcon: true,
            content: "The **Mandala for Systems Change** is a way of understanding how real, lasting change happens in complex systems—like schools, communities, social issues, or the climate system."
          },
          {
            type: 'image',
            imageUrl: mandalaForSystemsChangeImg,
            alt: 'Mandala for Systems Change',
            title: 'Mandala for Systems Change',
            width: '100%'
          },
          {
            type: 'text',
            title: '',
            hideIcon: true,
            content: "A “mandala” is a circle made of different parts that work together.\n\n In this model, the parts show what we need inside ourselves and around us in the world to create meaningful change.\n\nThink of it like a balanced recipe:"
          },
              {
            type: 'flip-cards',
            cards: [
              {
                frontTitle: 'Practice',
                frontDescription: '',
                backTitle: 'Definition',
                backDescription: 'What do you want to do or accomplish?'
              },
              {
                frontTitle: 'Research',
                frontDescription: '',
                backTitle: 'Definition',
                backDescription: ' How will you know its working? How will you  reflect, document, measure or track your progress, learning and development?'
              },
              {
                frontTitle: 'Community Building',
                frontDescription: '',
                backTitle: 'Definition',
                backDescription: 'Who is the ‘we’? What communities or stakeholders need to be involved?'
              },
              {
                frontTitle: 'Capacity Building',
                frontDescription: '',
                backTitle: 'Definition',
                backDescription: 'What skills, knowledge or resources will we need to move these changes forward?'
              }
            ]
          },
        ]
      },
      {
        type: 'block',
        colorTheme: 'pink',
        content: [
          {
            type: 'image',
            imageUrl: breatheImg,
            alt: 'Breathe in Nature',
            title: '',
            width: '100%'
          },
          {
            type: 'text',
            title: 'Caring for Your Energy (So You Can Sustain Action)',
            hideIcon: true,
            content: "Courage isn’t just intensity—it’s also regulation. To hold creative tension without burning out, you’ll need practices that refill your “hope stock” and steady your nervous system."
          },
          {
            type: 'text',
            title: '',
            hideIcon: true,
            content: "Try this 60‑second reset before hard conversations or decision‑making: \n\n 1. **Breathe:** Inhale for 4 counts, exhale for 6 counts (3 rounds). \n 2. **Name it:** Quietly name one feeling you’re having—just to notice it. \n 3. **Refocus:** Ask, “What’s one small, meaningful change I can try next?” \n 4. **Re‑enter:** Carry one clear action into the next step."
          }
        ]
      },
      {
        type: 'block',
        colorTheme: 'pink',
        content: [
        {
          type:'reflection',
          prompt:'As we close these activities, consider what you have learned and been inspired by. \n\n What is one climate action or change you feel motivated to try?',
          id:'module-5-reflection-2'
        },
        {
          type:'text',
          title:'The Big Idea',
          hideIcon: true,
          content: "**Systems don’t change themselves—people change them.** \n With clear vision, honest data, a global understanding, and steady hearts, you can help move this system toward a future that’s livable and just. \n\n **Let's begin!**"
        }
        ]
      },
            {
        type: 'block',
        colorTheme: 'pink',
        content: [
      {
        type: 'module-feedback',
        title: '🎉 Congratulations on completing Module 5: Levers of Change – the last module in this series!',
        description: "Before you depart–hopefully to start your climate action–we’d love your feedback on this learning experience.",
        id: 'module-5-feedback'
        }
        ]
      },
                  {
        type: 'block',
        colorTheme: 'pink',
        content: [
      {
        type: 'quote-carousel',
        title: '',
        quotes: [
          {
            quote: '“When young people develop basic leadership and collaborative learning skills, they can be a formidable force for change.”',
            author: 'Peter M. Senge',
            subtitle: 'rom The Fifth Discipline: The Art & Practice of The Learning Organization'
          },
        ]
      },
      {type: 'image',
        imageUrl: youthLeadershipImg,
        alt: 'Youth Leadership',
        title: '',
        width: '70%'
      },
      {
        type: 'text',
        title: '',
        hideIcon: true,
        content: "Learn more about how you can be a force for change. \n\n Explore our **Resources** to keep learning and connect with others on climate education and action."
      },
      {
        type: 'button',
        label: 'Explore Resources',
        url: '/resources'
      }
        ]
      },
        ]
    },
];
