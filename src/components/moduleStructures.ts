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
import Module1CarbonPriceDashboard from './Module1CarbonPriceDashboard';
import waterImg from '../assets/water.jpg';
import openingMeditationAudio from '../assets/Module1-OpeningMeditation.m4a';
import hopeMeditationAudio from '../assets/Module1-HopeMeditation.m4a';
import coalOilGasAudio from '../assets/Coal-Oil-Gas.mp3';
import module2Water from '../assets/module2/water.jpg';
import stockFlowExample from '../assets/module2/StockandFlow.webp';
import co2Removal1 from '../assets/module2/co2removal_1.jpg';
import co2Removal2 from '../assets/module2/co2removal_2.jpg';
import netZeroImg from '../assets/module2/Net zero = emissions in \u2013 removals out = 0.png';
import hopeOrientationImg from '../assets/module2/Hope Orientation-Tippett.png';
import hopeStockAudio from '../assets/module2/Module2-Hope-as-a-Stock.m4a';



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
  | { type: 'flip-cards'; title?: string; cards: FlipCardData[] }
  | { type: 'dashboard'; }
  | { type: 'exercise1-dashboard'; }
  | { type: '2ndExerciseDashboard'; }
  | { type: 'third-exercise'; }
  | { type: 'fourth-exercise'; }
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
                backDescription: 'The skill of paying attention using all our senses, emotions and experience–to what’s happening in a system, like a school, a community, or even the climate–and noticing patterns so you can better understand how everything is connected.'
              },
              {
                frontTitle: 'Emotional Literacy',
                frontDescription: 'Feelings you experience',
                backTitle: 'Definition',
                backDescription: 'Emotions are feelings you experience in response to what’s happening around or inside you. Emotional literacy is learning how these feelings and states show up in your body, thoughts, and behaviors.'
              },
              {
                frontTitle: 'Awareness',
                frontDescription: 'Noticing and understanding',
                backTitle: 'Definition',
                backDescription: 'Being able to notice what you\'re feeling, thinking, or experiencing in the moment. By learning to pay attention to emotions without judging them, you can recognize how they affect your choices, relationships, and wellbeing.'
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
            content: "So imagine you've got a **bathtub**.\n- The **water already in the tub** is the **stock**.\n- The **water coming in from the faucet** is a **flow**.\n- The **water draining out** is another **flow**.\n\nThe size of the stock (how much water is in the tub) depends on the flows (how fast water enters or leaves).\n\nSo if the faucet is running faster than the drain?\n➡️ The tub fills up.\n\nIf the drain is faster than the faucet?\n➡️ The tub empties.\n\nIf they're equal?\n➡️ The water level stays the same."
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
            question: '1. If our total CO₂ emissions stop rising and stay flat… What do you think will happen to the amount of CO₂ already in the atmosphere?',
            options: ['Increase', 'Level out', 'Decrease'],
            id: 'prediction-flat-emissions',
            singleSelect: true
          },
          {
            type: 'poll',
            question: '2. If our total CO₂ emissions drop a lot and become much lower than they are today… What do you think will happen to the CO₂ concentration in the atmosphere?',
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
            content: "We can change how much CO₂ is removed from the atmosphere through policies like incentivizing farmers to reforest parts of their farmland, or by investing in technological carbon removal.\n\nThe two new En‑ROADS sliders below let you increase:\n\n- **Nature‑based CO₂ removal** (like reforestation)\n- **Technological CO₂ removal** (like direct air capture)\n\nWhen you adjust these sliders, you'll see a new graph called \"**CO₂ Emissions and Removals.**\"\n\nIt shows:\n- Emissions (what we add)\n- Removals (what we take out)\n\nAnd, as before, you'll still see the **CO₂ concentration graph** so you can watch how the total “stock” in the atmosphere changes."
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