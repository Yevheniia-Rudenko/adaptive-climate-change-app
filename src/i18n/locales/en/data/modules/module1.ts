export const module1 = {
  title: "Relating to Climate Futures",
  sections: [
    {
      // Section 0 (teal block)
      content: [
        { label: 'Open Glossary' }, // 0: button
        {
          title: '**About this Module**',
          content: "Climate change isn't just about science and data—it's also deeply personal.\n\n Understanding how climate futures affect you, your community, and the world helps build meaningful connections to the issue. This module explores how we emotionally and intellectually relate to our current climate situation, how we imagine different possible futures, and why these connections matter for understanding these complex global challenges and feeling empowered to take effective action."
        }, // 1: text (About this Module)
        {
          content: "Before we begin, let's test what we think we know."
        }, // 2: text (quiz intro)
        {}, // 3: true-or-myth quiz (no locale override needed)
        {
          content: "Climate change is often misunderstood.\n\nIn this module, we'll explore not just the facts—but how we relate to them."
        }, // 4: text (transition)
        {
          title: '**Key Concepts**',
          content: 'To start us off, let\'s explore some of the following key concepts. Take a moment to review the following cards, considering your own definitions as well.'
        }, // 5: text (Key Concepts)
        {
          title: '', // 3: flip-cards (optional title)
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
              backDescription: 'Systems sensing is the skill of paying close attention using all our senses, emotions and lived experience–to what\'s happening in a system, like a school, a community, or even the climate–and noticing patterns, emotions, relationships, and changes so you can better understand how everything is connected.'
            },
            {
              frontTitle: 'Emotional Literacy',
              frontDescription: 'Feelings you experience',
              backTitle: 'Definition',
              backDescription: 'Emotions are the feelings you experience in response to what\'s happening around you or inside you. They can range from joy, excitement and anger, or states like stress, confusion or happiness. Emotional literacy is learning how these feelings show up in your body, thoughts, and behaviors.'
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
          title: '**Reflection**',
          content: "Thinking about climate change brings up many emotions, feelings and opinions based on our experience and context.\n\nHow do we get in touch with this emotional landscape?"
        }, // 4: text
        {
          title: 'Listen to the audio recording',
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
Thank you for practicing with me.`
        }, // 5: audio
        {
          title: '**Learning to Name Our Emotions**',
          content: "The Wheel of Emotions, created by psychologist Robert Plutchik, is a tool that can help you make sense of what you're feeling.\n\nThink of it like a map of emotions: it shows eight basic feelings—such as joy, fear, anger, and surprise—and how they shift, grow stronger, or blend into other emotions.\n\nWhen you’re having a tough day, feeling stressed, or even just noticing a mood change, the wheel can help you put a name to what’s going on inside and sometimes even lessen its intensity. The more clearly you can identify your emotions, the easier it becomes to communicate with others, make thoughtful decisions, and understand yourself better.\n\nUsing this tool is a simple way to build emotional awareness and strengthen your overall well‑being.\n\nTake a look at the Wheel of Emotions and identify any emotions that you connect with when you think about climate change."
        }, // 6: text
        {
          title: 'Wheel of Emotions',
          alt: "Plutchik's Wheel of Emotions, a circular diagram showing 8 basic emotions and their variations in intensity"
        }, // 7: image
        {
          prompt: 'What emotions do you feel when you think about climate change?'
        } // 8: reflection
      ]
    },
    {
      // Section 1 (green block)
      content: [
        {
          title: '**Understanding Climate Drivers and Impacts**',
          content: "Think about the current and possible impacts of climate change–whether those occurring right now or those in the future. What do you care about most?"
        }, // 0: text
        {
          question: 'What do you care about most?',
          options: ['Flooding', 'Fires', 'Species loss', 'Extreme Heat']
        }, // 1: poll
        {
          title: '**What If?**',
          content: "We are going to look at what’s driving climate change and explore how different policies and actions could shape the future we all share.\n\nWe will begin to explore some of these primary drivers through a powerful tool called En-ROADS, an interactive climate solutions simulator made by Climate Interactive and MIT Sloan based on real scientific research.\nThink of it like a real‑life \"what if?\" simulator for the Earth's future."
        }, // 2: text
        { alt: 'Climate Interactive Logo' }, // 3: image
        { alt: 'En-ROADS climate simulation tool dashboard with policy sliders and graphs displaying projected climate outcomes, including a dropdown to switch between different graph views.' }, // 4: image
        {
          content: "**En-ROADS lets you explore questions like:**\n\n• What happens if we use more renewable energy?\n• What if cars and buildings become more energy efficient, such as needing less gas or electricity to fuel them?\n• What if countries put a price on pollution?\n\nYou move sliders that represent real-world global policy choices—energy, transportation, food, forests, and technology—and the simulator instantly shows how those choices affect:\n\n• Global temperature\n• Sea level rise\n• Air pollution\n• Energy use\n• Economic outcomes"
        }, // 5: text
        { title: '**Why does global temperature matter?**' }, // 6: text
        { alt: 'Animation of Thermometer filling to max degree with climate change text' }, // 7: image
        { content: 'Even small changes in Earth\’s average temperature can cause big changes in weather and ecosystems—just like how a small change in body temperature can make a human very sick.' }, // 8: text
        {
          title: '**What does global temperature increase mean?**',
          transcript: "When scientists talk about global temperature increase, they are comparing today's average Earth temperature to what it was before the Industrial Revolution, around eighteen fifty—before cars, factories, and power plants burned large amounts of fossil fuels.\n\nRight now, Earth has already warmed by about one point two degrees Celsius, or two point two degrees Fahrenheit. That may not sound like much, but even small changes in Earth's average temperature can cause big changes in weather and ecosystems—just like how a small change in body temperature can make a human very sick.\n\nThe Paris Climate Agreement set two key temperature goals. The main goal is to keep global warming well below two degrees Celsius. The safer goal, which countries are encouraged to aim for, is limiting warming to one point five degrees Celsius.\n\nAt one point five degrees, there are fewer deadly heat waves, less sea level rise, and a lower risk of extreme weather. At two degrees or more, storms and floods become much stronger, many coral reefs die, and more people face extreme heat and food and water shortages.\n\nSo while both levels of warming are dangerous, limiting warming to one point five degrees is much safer than reaching two degrees."
        }, // 9: audio
        { content: "In En-ROADS, the current projection if global policies and collective behavior remain the same as present, the global temperature increase by 2100 will be 3.3 degrees Celsius or 5.9 degrees Fahrenheit." }, // 10: text
        { alt: 'Projected global temperature increase of +3.3°C (+5.9°F) by 2100.' }, // 11: image
        { content: "That far exceeds the 1.5 degree Celsius (or 2.7 degrees Fahrenheit) goal. So what can we do?" } // 12: text
      ]
    },
    {
      // Section 2 (amber block)
      content: [
        {
          title: '**Let\'s try some solutions.**',
          content: `While many climate lessons tell you **what's wrong**, En‑ROADS lets you **experiment with solutions**.

Instead of just hearing: "Climate change is bad and complicated," you get to:

• Test ideas yourself
• See **cause and effect** immediately
• Discover which solutions matter most

Let’s move beyond memorizing facts, let\’s **think like a decision‑maker.**

So, let's try it out! 

We\’ll introduce you to En-ROADS a few elements at a time. Later, we\’ll play with the full climate policy model.`
        }, // 0: text
        { title: '**Exercise 1: Nature-Based Carbon Dioxide Removal**' }, // 1: text
        { alt: 'A dense forest with tall trees' }, // 2: image
        {
          content: `**Could we just plant more trees? What if we planted a trillion trees?**

Some organizations and groups are recommending just that. They advocate that planting more trees will help slow climate change by using trees’ natural ability to **remove carbon dioxide (CO₂)** from the atmosphere.

Trees absorb CO₂ as they grow and store that carbon in their trunks, branches, roots, and surrounding soil. This process is known as **carbon sequestration**.

To plant a trillion trees, that would cover 550 million hectares–or over 2 million square miles–of unforested land with forest. To visualise, imagine an area half the size of the entire United States of America.

So, let's try this solution out! Let's plant more trees–a nature-based solution to carbon dioxide removal.`
        }, // 3: text
        { title: '**First, let\'s make a prediction**' }, // 4: text
        {
          question: 'How impactful do you think this solution will be?',
          options: ['Very impactful', 'Moderately impactful', 'Not very impactful']
        }, // 5: poll
        { question: 'If we implemented this solution of planting more trees, do you think global temperature by 2100 would increase or decrease from 3.3 degrees Celsius?' }, // 6: numeric-prediction
        {
          title: '**Make a Model**',
          content: 'To get started, let\’s learn how to read and use the En-ROADS tool.'
        }, // 7: text
        {
          title: '**Concept Cards: How to Use En-ROADS**',
          cards: [
            {
              frontTitle: 'Sliders',
              frontDescription: 'Control solutions',
              backDescription: 'Sliders are focused on solutions. You can move the slider in different directions to maximize or minimize its effect.'
            },
            {
              frontTitle: 'Graphs',
              frontDescription: 'Display impacts',
              backDescription: 'Graphs display impacts. You will see the main graph of global temperature increase by 2100. You can also choose from different Impact Graphs you care about from the Dropdown in the left hand corner of the graph.'
            },
            {
              frontTitle: 'Baseline',
              frontDescription: 'Display baseline scenario',
              backDescription: 'The En-ROADS Baseline Scenario represents the state of the world if societal and technological changes were to continue at their current rate of progress, without additional policies or action.  It is represented as the black line in the Graphs.'
            },
            {
              frontTitle: 'Current Scenario',
              frontDescription: 'Display current scenario',
              backDescription: ' This is the projected state of the world based on the changes you make to the solution Sliders. It is represented as the blue line in the Graphs.'
            }
          ]
        }, // 8: flip-cards
        {}, // 9: exercise1-dashboard (empty)
        { title: '**Let\'s Reflect**' }, // 10: text
        { prompt: 'Pause and reflect on these graphs. What do you notice? What do you wonder?\n\nWhat assumptions did you have that were challenged? What surprised you?' } // 11: reflection
      ]
    },
    {
      // Section 3 (purple block)
      content: [
        { title: '**Exercise 2: Renewable Energy**' }, // 0: text
        { alt: 'Wind turbines generating renewable energy' }, // 1: image
        {
          content: `What about green or renewable energy? Can't we use the power of the sun and wind to power our communities?

Advocates of renewable energy point to its many advantages, both for the planet and for our communities. Renewable energy has big benefits, including:

• Produces little to no pollution.
• Uses resources (the sun and wind) that won't run out in the foreseeable future.
• Helps stabilize energy costs.
• Supports energy independence.
• Creates jobs and boosts local economies.
• Pairs well with modern energy technology.

So what is renewable energy?`
        }, // 2: text
        {
          title: 'What is Renewable Energy?',
          transcript: `When we talk about renewable energy, we're talking about sources of power that come from naturally replenishing resources—things like the sun, wind, the heat inside the Earth, and flowing water. These energy sources don't run out the way fossil fuels do, and they produce little to no carbon pollution, which makes them a key part of addressing climate change.

For example, building solar panels, wind turbines, or geothermal systems allows us to create electricity without burning coal, oil, or gas. Hydropower—electricity generated from moving water—is another important renewable option. You might notice that nuclear energy and bioenergy are usually discussed separately because they work differently and have their own benefits and challenges.

Renewable energy also connects to other technologies. We can produce clean hydrogen using renewable power, which can then be used as fuel without releasing carbon dioxide. And because sources like wind and solar can vary from moment to moment, we also invest in energy storage (like batteries) to help balance the system and make sure electricity is available whenever people need it.`
        }, // 3: audio
        { content: 'Should we try it out? What if the world encouraged building solar panels, geothermal, and wind turbines?' }, // 4: text
        { title: '**First, let\'s make a prediction**' }, // 5: text
        {
          question: 'How impactful do you think this solution will be?',
          options: ['Very impactful', 'Moderately impactful', 'Not very impactful']
        }, // 6: poll
        { question: 'If we implemented this solution, what do you think the global temperature increase by 2100 would be? Would it stay at 3.3 degrees Celsius? Would it increase or decrease?' }, // 7: numeric-prediction
        { title: '**Make a Model**' }, // 8: text
        {}, // 9: 2ndExerciseDashboard (empty)
        { title: '**Let\'s Reflect**' }, // 10: text
        { prompt: 'Pause and reflect on these graphs. What do you notice? What do you wonder?\n\nWhat assumptions did you have that were challenged? What surprised you?' } // 11: reflection
      ]
    },
    {
      // Section 4 (amber block)
      content: [
        { title: '**Exercise 3 — Fossil Fuels**' }, // 0: text
        { alt: 'Duke Energy\'s Cliffside Coal Plant' }, // 1: image
        {
          title: 'Can we stop using oil, coal and gas?',
          transcript: `When people talk about divesting from oil, gas, and coal, they’re talking about moving money away from companies that extract or sell fossil fuels. Advocates believe this is one of the ways we can send a strong message about the future we want to build.

They argue that when governments schools, cities, banks, or other institutions pull their investments out of fossil fuel companies, it reduces financial support for industries that contribute the most to carbon pollution.

At the same time, divestment can shift money toward cleaner energy sources like wind, solar, and geothermal. Supporters say this isn’t just symbolic—it's a way to push the global economy toward low‑carbon solutions faster.

Advocates also point out that fossil fuels are becoming riskier investments over time because the world is moving toward cleaner energy. By divesting now, they say communities can avoid financial losses and take a stand that aligns with climate science. According to this perspective, widespread divestment helps accelerate the transition to renewable energy and sends a clear signal that society is serious about addressing climate change.

To reduce use of fossil fuels–oil, gas and coal–one strategy is to place higher taxes on these products.`
        }, // 2: audio
        { content: 'Should we try it out?  You know the process, let’s go!' }, // 3: text
        { title: '**Let\'s make a prediction**' }, // 4: text
        {
          question: 'How impactful do you think this solution will be?',
          options: ['Very impactful', 'Moderately impactful', 'Not very impactful']
        }, // 5: poll
        { question: 'If we implemented this solution, what do you think the global temperature increase by 2100 would be?  Would it stay at 3.3 degrees Celsius? Would it increase or decrease?' }, // 6: numeric-prediction
        { title: '**Make a Model**' }, // 7: text
        {}, // 8: third-exercise (empty)
        { title: '**Let\'s Reflect**' }, // 9: text
        { prompt: 'Pause and reflect on these graphs. What do you notice? What do you wonder?\n\nWhat assumptions did you have that were challenged? What surprises you?' } // 10: reflection
      ]
    },
  ],
  components: {
    carbonRemoval: {
      title1: 'Model 1: Nature-Based Carbon Removal',
      title2: 'Model 2: Deforestation',
    model1IntroText: `En-ROADS Simplified Dashboard
  Now let’s see what effect nature-based carbon-dioxide removal (aka planting more trees) has on global temperature increase (remember the goal to keep the increase at no more than 1.5 degrees Celsius or 2.7 degrees Fahrenheit).
  In Exercise 1, you will adjust the amount that nature-based Carbon-Dioxide Removal is implemented as a policy by moving the slider. You can choose:
  Status Quo: Maintain the current levels of natural and cultivated forests. This is where the slider starts.
  Subsidize: Increase the amount of trees planted by providing governmental or private funding to support the planting and maintenance of forests and wooded areas.
  Tax: Decrease the amount of trees planted by charging governmental taxes or fees (ex. Taxes that increase the cost of purchasing trees)
  You can also explore other climate impacts like sea level rise, air pollution, crop yield and others using the dropdown option on the graphs.`,
    model2IntroText: `Planting more trees in this model is different from saving existing forests. Let’s also see what happens when we look at policies around deforestation–the intentional and large-scale clearing of forests for agriculture, building construction, and livestock.
  In Exercise 2, adjust the amount that Deforestation is happening globally by moving the slider. You can choose:
  Status Quo: Maintain the current levels of natural and cultivated forests. This is where the slider starts.
  Reforestation: Encourage the protection of forests, preserving current forests and allowing areas to re-grow after human disturbance. For example, letting a grass yard grow into a meadow and eventually into a forest.
  Deforestation: Discourage the protection of forests and increase the use of forest land for other uses, primarily for plant and animal agriculture and livestock, harvesting for wood products or bioenergy.
  Let’s try it out!`,
      natureLabel: 'Carbon-Dioxide Removal - Nature Based',
      deforestationLabel: 'Deforestation',
      highGrowth: 'high growth',
      mediumGrowth: 'medium growth',
      lowGrowth: 'low growth',
      increased: 'increased',
      reduced: 'reduced',
      highlyReduced: 'highly reduced',
      baseline: 'BASELINE',
      currentScenario: 'CURRENT SCENARIO',
      marineSpecies: 'MARINE SPECIES',
      landSpecies: 'LAND SPECIES',
      co2NetEmissions: 'CO2 Net Emissions',
      dashedBaseline: 'Dashed lines represent Baseline',
      temperatureTitle: 'Temperature\nIncrease by\n2100',
    }
  }
};
