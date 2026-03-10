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
import systemsIcebergImg from '../assets/systems_iceberg.jpg';
import icebergExplainerAudio from '../assets/IcebergExplainer.mp3';



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