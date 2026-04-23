export const module2 = {
  title: 'Stock & Flow',
  sections: [
    {
      // Section 1 (teal block)
      content: [
        { label: 'Open Glossary' }, // 0: button
        { title: '**About this Module**', content: 'Some things build up slowly — and that changes everything.' }, // 1: text
        { alt: 'Diagram of a bathtub model showing a faucet filling a water tank, with arrows indicating water Inflow entering from the tap and Outflow draining from the bottom.' }, // 2: image
        { title: '', content: "So imagine you've got a **sink**.\n\n- The **water already in the sink** is the **stock**.\n- The **water coming in from the faucet** is a **flow**.\n- The **water draining out** is another **flow**.\n\n The size of the stock (how much water is in the sink) depends on the flows (how fast water enters or leaves).\n\nSo if the water in the faucet is running faster than the drain?\n➡️ The sink fills up.\n\nIf the drain is faster than the water in the faucet?\n➡️ The sink empties.\n\nIf they're equal?\n➡️ The water level stays the same." }, // 3: text
        { title: '**What is Stock and Flow?**', description: '' }, // 4: video
        { title: '**Key Concepts**', content: '' }, // 5: text
        { // 6: flip-cards
          cards: [
            {
              frontTitle: 'Stock',
              frontDescription: 'What accumulates over time',
              backTitle: 'Definition',
              backDescription: 'A stock is anything in a system that can build up or decrease over time—such as water in a sink or reservoir, money in a savings account, or carbon in the atmosphere.'
            },
            {
              frontTitle: 'In-flow',
              frontDescription: 'What increases the stock',
              backTitle: 'Definition',
              backDescription: 'An in‑flow is anything that adds to a stock—like water flowing into a sink, new money going into a bank account, or carbon being released into the atmosphere.'
            },
            {
              frontTitle: 'Out-flow',
              frontDescription: 'What decreases the stock',
              backTitle: 'Definition',
              backDescription: 'An out‑flow is anything that takes away from a stock—like water draining from a sink, money being spent from a bank account, or carbon being released into the atmosphere.'
            }
          ]
        },
        { title: "**Let's check your intuition about how systems behave.**", content: '' }, // 7: text (quiz intro)
        {}, // 8: true-or-myth (quiz items live in moduleStructures.ts — do not override)
        { title: '**🛁 Draw Your Own Stock & Flow**', content: "To explore how \"Stock and Flow\" works, let's start with a personal example. Pick an example of a Stock that you care about." }, // 9: text
        { title: '', content: "**Step One:** Draw a Stock and Flow diagram like in the image below.\n\n*You will need a paper and a pen or pencil to draw the Stock and Flow. Or you can also download and print this Stock and Flow worksheet*" }, // 10: text
        { alt: 'Diagram of a bathtub model showing a faucet filling a water tank, with arrows indicating water Inflow entering from the tap and Outflow draining from the bottom.' }, // 9: image
        { title: '', content: "**Step Two:** Pick a stock that you care about. Think about something that can rise or fall depending on what flows in or out of it. Some \"stock\" examples could be:\n\n-My level of well-being\n- My money\n- My level of motivation in my academics\n- The level of trust I have in my relationships\n- The level of hope I have in a positive future" }, // 10: text
        { title: '', content: "**Step Three:** Draw the in-flows to your chosen stock example. What is adding to or filling up your stock? Try to identify at least three in-flows to your stock." }, // 11: text
        { title: '', content: "**Step Four:** Draw the out-flows. What depletes or diminishes your stock? Remember, these in- and out-flows describe factors that change your stock over time. Try to identify at least 3 out-flows from your stock." }, // 12: text
        { title: '', content: "**Step Five:** Share your Stock and Flow with a partner or in a small group." }, // 13: text
        { title: '**💭Let’s Reflect**', content: "" }, // 14: text
        { prompt: 'What was happening in your Stock and Flow model? What did you notice or wonder about your chosen stock when exploring it using this model? Did anything surprise you?' } // 15: reflection
      ]
    },
    {
      // Section 2 (amber block)
      content: [
        { title: '**🌍 Why This Matters for Climate Change**', content: "The idea of \"stock and flow\" might feel super obvious when we talk about something simple—like water filling up a bathtub. But when we try to use the same idea to understand climate change, things can get a little more complicated.\n\nStill, the stock‑and‑flow model is **really helpful** for understanding the basic forces driving climate change.\n\nFirst, we'll look at what's causing climate change today by running a few simulations in **En‑ROADS**.\n\nAfter that, we'll connect what we saw in the simulations to the stock‑and‑flow idea so the whole picture makes more sense." }, // 0: text
        { title: "**Let's Make a Prediction**", content: "But before we dive into En‑ROADS, let’s make some predictions.\n\nThink about the relationship between:\n- CO2 emissions (what we put into the atmosphere)\n- CO2 concentration (how much ends up staying there)\n- CO2 removals (how much carbon dioxide is removed from the atmosphere)\n\nThese are three of the most important pieces of the climate system—so let’s see what you already think before we explore the model.\n\nNow let’s think about what might happen if we try to reduce global CO₂ emissions. Make your best predictions for each scenario:" }, // 1: text
        { question: '**Scenario 1. Stop the Rise**\nIf our total CO₂ emissions stop rising and stay flat, and our CO₂ removals stay the same, what do you think will happen to the amount of CO₂ already in the atmosphere?', options: ['Increase', 'Level out', 'Decrease'] }, // 2: poll
        { question: '**Scenario 2. Drop Emissions**\nIf our total CO₂ emissions drop a lot and become much lower than they are today, and our CO₂ remain the same, what do you think will happen to the CO₂ concentration in the atmosphere?', options: ['Increase', 'Level out', 'Decrease'] } // 3: poll
      ]
    },
    {
      // Section 3 (purple block)
      content: [
        { title: "**Let's Test Your Predictions!**", content: "In this next activity, you'll use **[En‑ROADS](/module/1?block=2&section=what-if)** to simulate these two scenarios.\n\nAs we learned in the last module, a **carbon price** is one of the more powerful and high-leverage climate policies for quickly lowering our global CO₂ emissions.\n\n Adjust the carbon price slider to see how changing emissions affects the concentration of CO₂ in the atmosphere." }, // 0: text
        {}, // 1: module2-exercise
        { title: '**💭 Let\'s Reflect**', content: 'Take a moment to think about what you just observed in the simulation.' }, // 2: text
        { prompt: 'What do you notice? Did your expectations match the outcome? Why do you think this is the result?' } // 3: reflection
      ]
    },
    {
      // Section 4 (pink block)
      content: [
        { title: '**Understanding CO₂ Removals**', content: "Now we're going to add **two more sliders** to our simulation. These sliders represent different ways we can **remove CO₂ from the atmosphere**—and we'll see how that changes the total CO₂ concentration over time." }, // 0: text
        { title: '**🌱 What are CO₂ removals?**', content: 'CO₂ removals are natural or technological processes that take carbon dioxide out of the air and store it somewhere else.\n\nThink of CO₂ as the outflow.' }, // 1: text
        { title: '**Natural CO₂ removals include:**', content: '- Trees and plants absorbing CO₂ as they grow\n- Soil storing carbon from dead plant material\n- The ocean absorbing CO₂ from the air (which unfortunately also makes the water more acidic)' }, // 2: text
        { alt: 'Natural CO₂ removal processes' }, // 3: image
        { title: '**Technological CO₂ removals include:**', content: '- Direct Air Capture (DACCS): Machines that pull CO₂ from the air and store it deep underground in rock\n- Enhanced mineralization: Spreading special kinds of rock on land so they naturally absorb CO₂ faster than normal' }, // 4: text
        { alt: 'Technological CO₂ removal processes' }, // 5: image
        { title: '**🌳 Why we talk about "net" CO₂ removals**', content: "Even when CO₂ is removed, some of it can **leak back** into the atmosphere.\nThis can happen because of:\n\n- Wildfires\n- Logging\n- Farming\n- Land changes\n\nSo instead of just \"CO₂ removals,\" we use the term **net CO₂ removals**, which means:\n\n **Total CO₂ taken out of the atmosphere** *-* **Total CO₂ that ends up returning to the atmosphere**\n\nThis gives a more accurate picture of what's really happening." } // 6: text
      ]
    },
    {
      // Section 5 (teal block)
      content: [
        { title: '**🎛️ How this works in the simulation**', content: "We can change how much CO₂ is removed from the atmosphere through policies like encouraging farmers to reforest parts of their farmland, or by investing in technological carbon removal.\n\nThe two new En‑ROADS sliders below let you increase:\n\n- **Nature‑based CO₂ removal** (like reforestation)\n- **Technological CO₂ removal** (like direct air capture)\n\nWhen you adjust these sliders, you'll see a new graph called \"**CO₂ Emissions and Removals.**\"\n\nIt shows:\n- Emissions (what we add: the \"inflow\")\n- Removals (what we take out: the \"outflow\")\n\nAnd, as before, you'll still see the **CO₂ concentration graph** so you can watch how the total “stock” in the atmosphere changes." }, // 0: text
        { title: '**🧠 Let\'s Predict**', content: 'Before you start moving the sliders, make your prediction:' }, // 1: text
        { question: 'When do you think the CO₂ concentration in the atmosphere will start to go down?', options: ['When CO₂ emissions are greater than CO₂ removals', 'When CO₂ emissions are equal to CO₂ removals', 'When CO₂ emissions are smaller than CO₂ removals'] }, // 2: poll
        { title: '**⚙️ Make a Model**', content: '' }, // 3: text
        {}, // 4: module2-removals
        { title: '**💭 Let\'s Reflect**', content: 'Take a moment to think about what you just observed in the simulation.' }, // 5: text
        { prompt: 'What do you notice? Did your expectations match the outcome? Why do you think this is the result?' } // 6: reflection
      ]
    },
    {
      // Section 6 (blue block)
      content: [
        { title: '**🌍 Why This Matters for Climate Change**', content: '' }, // 0: text
        { description: 'Understanding climate change through the bathtub analogy' }, // 1: video
        { content: "Remember the Stock & Flow. Think of carbon dioxide (CO₂) the same way.\n-The **atmosphere** is like the sink—this is the **stock**.\n-Burning fossil fuels (cars, factories, etc.) is like the water coming out of the faucet—that's an **inflow** adding CO₂.\n-Trees and oceans absorbing CO₂ is like the drain—that's an **outflow** removing CO₂.\n\nRight now, the **faucet is on full blast**, and the **drain is slow**, so the \"sink\" of CO₂ keeps rising.\n\nEven if we slow down the faucet, the sink will **keep filling** unless the drain is equally fast.\n\nThis helps explain why addressing emissions causing climate change is so hard:\n\nTo stop the CO₂ level from rising, the inflows and outflows have to balance.\n\nUnderstanding \"stock and flow\" helps you see that climate change isn't just about using fewer fossil fuels—it's about changing the whole system so we stop overfilling the atmospheric \"sink.\"\n\nIt's not just about one good action.\n\nIt's about how all our collective actions affect the **total amount** over time." } // 2: text
      ]
    },
    {
      // Section 7 (green block)
      content: [
        { title: '**🌍 The Vision of "Net‑Zero Emissions"**', content: "**What does Net-Zero Emissions mean?**\n\nThink of net‑zero emissions like balancing a scale.\n\nIt doesn't mean we produce zero carbon emissions ever again.\n\nIt means:\n\n**We don't add extra carbon dioxide to the atmosphere overall.**\n\nIn other words, any CO₂ we do emit gets balanced out by CO₂ we remove from the atmosphere." }, // 0: text
        { title: '**🛁 Back to our Sink Metaphor**', content: "Remember, imagine the atmosphere is a big sink (your CO₂ \"stock\").\n\n- The water coming in = **CO₂ emissions**\n- The water draining out = **CO₂ removals**\n\n**Net zero** is when water flows in at the same rate it flows out, so the water level stops rising.\n\nThat means CO₂ concentration in the atmosphere levels out instead of increasing." }, // 1: text
        { title: '**🧩 How We Get to Net Zero**', content: "To reach net zero, we need two big things working together:\n\n**1️⃣ Cut emissions as much as possible**\n\nThis means:\n- More renewable energy\n- Energy efficiency\n- Cleaner transportation\n- Better buildings\n- Switching away from fossil fuels\n\n*Reducing what's coming into the tub.*\n\n**2️⃣ Increase CO₂ removals**\n\nThis means:\n- Protecting forests\n- Re‑growing forests (reforestation)\n- Healthier soils\n- Technology that pulls CO₂ out of the air\n\n*Speeding up the drain.*" }, // 2: text
        { title: '**🏁 Why Net Zero Matters**', content: '' }, // 3: text
        { alt: 'Net zero = emissions in – removals out = 0' }, // 4: image
        { content: "Scientists say we need to reach global net zero around 2050 to help limit warming to 1.5°C.\n\nWhy? Because the CO₂ already in the atmosphere keeps the Earth warming—so we have to stop adding more.\n\nNet zero is basically humanity saying: **\"We're done increasing the CO₂ level in the atmosphere.\"**\n\nIt's not perfection. It's balance.\n\nAnd it's one of the most important goals for keeping future climate change manageable." }, // 5: text
        { title: '**💭 Let\'s Reflect**', content: 'Take a moment to think about what you\'ve learned in this module.' }, // 6: text
        { prompt: 'What did you find most interesting or challenging about the idea of net-zero? What is one question you still have about this topic?' } // 7: reflection
      ]
    }
  ],
  components: {
    exercise: {
      title: 'Test Your Predictions: Carbon Price Simulation',
      carbonPrice: 'Carbon Price',
      statusQuo: 'status quo',
      low: 'low',
      medium: 'medium',
      high: 'high',
      veryHigh: 'very high',
      temperatureTitle: 'Temperature\nIncrease by\n2100',
      openFullscreen: 'Open Full Screen',
      closeFullscreen: 'Close Full Screen',
      loadingModel: 'Loading En-ROADS model...',
      failedToLoad: 'Failed to load En-ROADS model.',
      baseline: 'BASELINE',
      currentScenario: 'CURRENT SCENARIO'
    },
    removals: {
      title: '⚙️ Make a Model: Carbon Price + CO₂ Removals',
      carbonPrice: 'Carbon Price',
      natureBasedRemovals: 'Nature-Based Removals',
      technologicalRemovals: 'Technological Removals',
      emissionsAndRemovalsTitle: 'CO₂ Emissions and Removals',
      concentrationTitle: 'CO₂ Concentration',
      emissions: 'CO₂ EMISSIONS',
      removals: 'CO₂ REMOVALS'
    },
    groupingFilters: {
      drawYourOwn: 'draw your own stock & flow',
      step: 'step',
      reflect: "let's reflect",
      whatAreRemovals: 'what are co2 removals?',
      naturalRemovals: 'natural co2 removals include',
      technologicalRemovals: 'technological co2 removals include',
      netRemovals: 'why we talk about "net" co2 removals',
      co2Removal: 'co2 removal'
    }
  }
};
