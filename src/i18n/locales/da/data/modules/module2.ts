export const module2 = {
  title: 'Beholdning & Strømning',
  sections: [
    {
      // Section 0 (teal block)
      content: [
        { label: 'Åbn Ordliste' }, // 0: button
        { title: '**Om dette modul**', content: 'Nogle ting ophobes langsomt — og det ændrer alt.' }, // 1: text
        { alt: 'Diagram af en badekarmodel, der viser en vandhane, der fylder en vandtank, med pile, der angiver vandtilstrømning fra hanen og udstrømning fra bunden.' }, // 2: image
        { title: '', content: "Forestil dig, at du har en **vask**.\\n\\n- **Vandet, der allerede er i vasken** er **beholdningen**.\\n- **Vandet, der kommer fra hanen** er en **strømning**.\\n- **Vandet, der løber ud af afløbet** er en anden **strømning**.\\n\\n Størrelsen af beholdningen (hvor meget vand der er i vasken) afhænger af strømningerne (hvor hurtigt vandet kommer ind eller forlader).\\n\\nHvis vandet fra hanen løber hurtigere end afløbet?\\n➡️ Vasken fyldes op.\\n\\nHvis afløbet er hurtigere end vandet fra hanen?\\n➡️ Vasken tømmes.\\n\\nHvis de er lige?\\n➡️ Vandniveauet forbliver det samme." }, // 3: text
        { title: '**Nøglebegreber**', content: '' }, // 4: text
        { // 5: flip-cards
          cards: [
            {
              frontTitle: 'Beholdning',
              frontDescription: 'Det, der ophobes over tid',
              backTitle: 'Definition',
              backDescription: 'En beholdning er alt i et system, der kan vokse eller falde over tid — som vand i en vask eller et reservoir, penge på en opsparingskonto eller kulstof i atmosfæren.'
            },
            {
              frontTitle: 'Indstrømning',
              frontDescription: 'Det, der øger beholdningen',
              backTitle: 'Definition',
              backDescription: 'En indstrømning er alt, der tilføjer til en beholdning — som vand, der strømmer ind i en vask, nye penge, der indsættes på en bankkonto, eller kulstof, der frigives til atmosfæren.'
            },
            {
              frontTitle: 'Udstrømning',
              frontDescription: 'Det, der reducerer beholdningen',
              backTitle: 'Definition',
              backDescription: 'En udstrømning er alt, der fjerner fra en beholdning — som vand, der løber fra en vask, penge, der bruges fra en bankkonto, eller kulstof, der fjernes fra atmosfæren.'
            }
          ]
        },
        { title: "**Lad os tjekke din intuition om, hvordan systemer opfører sig.**", content: '' }, // 6: text
        { // 7: true-or-myth
          items: [
            {
              statement: 'Hvis udledningerne stopper med at stige, vil CO₂-niveauerne i atmosfæren holde op med at stige.',
              explanation: 'Selv hvis udledningerne forbliver konstante, fortsætter CO₂ med at ophobe sig, fordi indstrømningen stadig overstiger udstrømningen.'
            },
            {
              statement: 'CO₂ skal være lavere end fjernelserne, for at atmosfæriske niveauer kan falde.',
              explanation: 'Kun når fjernelserne overstiger udledningerne, falder den samlede koncentration.'
            }
          ]
        },
        { title: '**🛁 Tegn din egen beholdning & strømning**', content: "For at udforske, hvordan \"Beholdning og Strømning\" fungerer, lad os starte med et personligt eksempel. Vælg et eksempel på en beholdning, du holder af." }, // 8: text
        { title: '', content: "**Trin ét:** Tegn et beholdning- og strømningsdiagram som på billedet nedenfor.\\n\\n*Du skal bruge papir og en pen eller blyant til at tegne beholdningen og strømningen. Eller du kan også downloade og udskrive dette beholdnings- og strømningsarbejdsark.*" }, // 9: text
        { alt: 'Diagram af en badekarmodel, der viser en vandhane, der fylder en vandtank, med pile, der angiver vandtilstrømning fra hanen og udstrømning fra bunden.' }, // 10: image
        { title: '', content: "**Trin to:** Vælg en beholdning, du holder af. Tænk på noget, der kan stige eller falde afhængigt af, hvad der strømmer ind eller ud af det. Nogle \"beholdnings\"-eksempler kunne være:\\n\\n- Mit niveau af trivsel\\n- Mine penge\\n- Mit niveau af motivation i mine studier\\n- Niveauet af tillid jeg har i mine relationer\\n- Niveauet af håb jeg har for en positiv fremtid" }, // 11: text
        { title: '', content: "**Trin tre:** Tegn indstrømningerne til din valgte beholdning. Hvad tilføjer til eller fylder din beholdning op? Prøv at identificere mindst tre indstrømninger til din beholdning." }, // 12: text
        { title: '', content: "**Trin fire:** Tegn udstrømningerne. Hvad udtømmer eller formindsker din beholdning? Husk, disse ind- og udstrømninger beskriver faktorer, der ændrer din beholdning over tid. Prøv at identificere mindst 3 udstrømninger fra din beholdning." }, // 13: text
        { title: '', content: "**Trin fem:** Del din beholdning og strømning med en partner eller i en lille gruppe." }, // 14: text
        { title: '**💭 Lad os reflektere**', content: '' }, // 15: text
        { prompt: 'Hvad skete der i din beholdnings- og strømningsmodel? Hvad bemærkede du, eller hvad undrede du dig over ved din valgte beholdning, da du udforskede den med denne model? Overraskede noget dig?' } // 16: reflection
      ]
    },
    {
      // Section 1 (amber block)
      content: [
        { title: '**🌍 Hvorfor dette er vigtigt for klimaforandringer**', content: "Ideen om \"beholdning og strømning\" kan virke super indlysende, når vi taler om noget simpelt — som vand, der fylder et badekar. Men når vi prøver at bruge den samme idé til at forstå klimaforandringer, kan tingene blive lidt mere komplicerede.\\n\\nAlligevel er beholdnings- og strømningsmodellen **virkelig nyttig** til at forstå de grundlæggende kræfter bag klimaforandringer.\\n\\nFørst kigger vi på, hvad der forårsager klimaforandringer i dag, ved at køre et par simuleringer i **En-ROADS**.\\n\\nDerefter forbinder vi det, vi så i simuleringerne, med beholdnings- og strømningsideen, så det samlede billede giver mere mening." }, // 0: text
        { title: "**Lad os lave en forudsigelse**", content: "Men før vi dykker ned i En-ROADS, lad os lave nogle forudsigelser.\\n\\nTænk over forholdet mellem:\\n- CO₂-udledninger (hvad vi putter i atmosfæren)\\n- CO₂-koncentration (hvor meget der ender med at blive der)\\n- CO₂-fjernelser (hvor meget kuldioxid der fjernes fra atmosfæren)\\n\\nDisse er tre af de vigtigste brikker i klimasystemet — så lad os se, hvad du allerede tror, før vi udforsker modellen.\\n\\nLad os nu tænke over, hvad der kan ske, hvis vi prøver at reducere globale CO₂-udledninger. Giv dine bedste forudsigelser for hvert scenarie:" }, // 1: text
        { question: '**Scenarie 1. Stop stigningen**\\nHvis vores samlede CO₂-udledninger holder op med at stige og forbliver flade, og vores CO₂-fjernelser forbliver de samme, hvad tror du så vil ske med mængden af CO₂, der allerede er i atmosfæren?', options: ['Stiger', 'Udjævnes', 'Falder'] }, // 2: poll
        { question: '**Scenarie 2. Sænk udledningerne**\\nHvis vores samlede CO₂-udledninger falder meget og bliver meget lavere end i dag, og vores CO₂-fjernelser forbliver de samme, hvad tror du så vil ske med CO₂-koncentrationen i atmosfæren?', options: ['Stiger', 'Udjævnes', 'Falder'] } // 3: poll
      ]
    },
    {
      // Section 2 (purple block)
      content: [
        { title: "**Lad os teste dine forudsigelser!**", content: "I den næste aktivitet bruger du **[En-ROADS](/module/1?block=2&section=what-if)** til at simulere disse to scenarier.\\n\\nSom vi lærte i det forrige modul, er en **kulstofpris** en af de mest kraftfulde og effektive klimapolitikker til hurtigt at sænke vores globale CO₂-udledninger.\\n\\n Justér kulstofpris-slideren for at se, hvordan ændring af udledninger påvirker koncentrationen af CO₂ i atmosfæren." }, // 0: text
        {}, // 1: module2-exercise
        { title: '**💭 Lad os reflektere**', content: 'Tag et øjeblik til at tænke over, hvad du lige har observeret i simuleringen.' }, // 2: text
        { prompt: 'Hvad lægger du mærke til? Matchede dine forventninger resultatet? Hvorfor tror du, dette er resultatet?' } // 3: reflection
      ]
    },
    {
      // Section 3 (pink block)
      content: [
        { title: '**Forståelse af CO₂-fjernelser**', content: "Nu tilføjer vi **to ekstra skydere** til vores simulering. Disse skydere repræsenterer forskellige måder, vi kan **fjerne CO₂ fra atmosfæren** — og vi ser, hvordan det ændrer den samlede CO₂-koncentration over tid." }, // 0: text
        { title: '**🌱 Hvad er CO₂-fjernelser?**', content: 'CO₂-fjernelser er naturlige eller teknologiske processer, der tager kuldioxid ud af luften og lagrer det et andet sted.\\n\\nTænk på CO₂ som udstrømningen.' }, // 1: text
        { title: '**Naturlige CO₂-fjernelser omfatter:**', content: '- Træer og planter, der absorberer CO₂, mens de vokser\\n- Jord, der lagrer kulstof fra dødt plantemateriale\\n- Havet, der absorberer CO₂ fra luften (hvilket desværre også gør vandet mere surt)' }, // 2: text
        { alt: 'Naturlige CO₂-fjernelsesprocesser' }, // 3: image
        { title: '**Teknologiske CO₂-fjernelser omfatter:**', content: '- Direkte luftopsamling (DACCS): Maskiner, der trækker CO₂ ud af luften og lagrer det dybt under jorden i klippe\\n- Forbedret mineralisering: Spredning af særlige typer klippe på land, så de naturligt absorberer CO₂ hurtigere end normalt' }, // 4: text
        { alt: 'Teknologiske CO₂-fjernelsesprocesser' }, // 5: image
        { title: '**🌳 Hvorfor vi taler om \"netto\" CO₂-fjernelser**', content: "Selv når CO₂ fjernes, kan noget af det **sive tilbage** til atmosfæren.\\nDette kan ske på grund af:\\n\\n- Skovbrande\\n- Skovhugst\\n- Landbrug\\n- Ændringer i arealanvendelse\\n\\nSå i stedet for bare \"CO₂-fjernelser\" bruger vi udtrykket **netto CO₂-fjernelser**, hvilket betyder:\\n\\n **Samlet CO₂ fjernet fra atmosfæren** *-* **Samlet CO₂, der ender med at vende tilbage til atmosfæren**\\n\\nDette giver et mere præcist billede af, hvad der virkelig sker." } // 6: text
      ]
    },
    {
      // Section 4 (teal block)
      content: [
        { title: '**🎛️ Hvordan dette fungerer i simuleringen**', content: "Vi kan ændre, hvor meget CO₂ der fjernes fra atmosfæren gennem politikker som at opmuntre landmænd til at genplante dele af deres landbrugsjord, eller ved at investere i teknologisk kulstoffjernelse.\\n\\nDe to nye En-ROADS-skydere nedenfor lader dig øge:\\n\\n- **Naturbaseret CO₂-fjernelse** (som genplantning af skov)\\n- **Teknologisk CO₂-fjernelse** (som direkte luftopsamling)\\n\\nNår du justerer disse skydere, vil du se en ny graf kaldet \\\"**CO₂-udledninger og -fjernelser.**\\\"\\n\\nDen viser:\\n- Udledninger (hvad vi tilføjer: \\\"indstrømningen\\\")\\n- Fjernelser (hvad vi tager ud: \\\"udstrømningen\\\")\\n\\nOg som før vil du stadig se **CO₂-koncentrationsgrafen**, så du kan se, hvordan den samlede \\\"beholdning\\\" i atmosfæren ændrer sig." }, // 0: text
        { title: '**🧠 Lad os forudsige**', content: 'Før du begynder at flytte skyderne, lav din forudsigelse:' }, // 1: text
        { question: 'Hvornår tror du, CO₂-koncentrationen i atmosfæren vil begynde at falde?', options: ['Når CO₂-udledninger er større end CO₂-fjernelser', 'Når CO₂-udledninger er lig med CO₂-fjernelser', 'Når CO₂-udledninger er mindre end CO₂-fjernelser'] }, // 2: poll
        { title: '**⚙️ Byg en model**', content: '' }, // 3: text
        {}, // 4: module2-removals
        { title: '**💭 Lad os reflektere**', content: 'Tag et øjeblik til at tænke over, hvad du lige har observeret i simuleringen.' }, // 5: text
        { prompt: 'Hvad lægger du mærke til? Matchede dine forventninger resultatet? Hvorfor tror du, dette er resultatet?' } // 6: reflection
      ]
    },
    {
      // Section 5 (blue block)
      content: [
        { title: '**🌍 Hvorfor dette er vigtigt for klimaforandringer**', content: '' }, // 0: text
        { content: "Husk beholdning & strømning. Tænk på kuldioxid (CO₂) på samme måde.\\n- **Atmosfæren** er som vasken — dette er **beholdningen**.\\n- At brænde fossile brændstoffer (biler, fabrikker osv.) er som vandet, der kommer fra hanen — det er en **indstrømning**, der tilføjer CO₂.\\n- Træer og oceaner, der absorberer CO₂, er som afløbet — det er en **udstrømning**, der fjerner CO₂.\\n\\nLige nu er **hanen åbnet helt op**, og **afløbet er langsomt**, så \"vasken\" af CO₂ fortsætter med at stige.\\n\\nSelv hvis vi bremser hanen, vil vasken **fortsætte med at fyldes**, medmindre afløbet er lige så hurtigt.\\n\\nDette hjælper med at forklare, hvorfor det er så svært at tackle de udledninger, der forårsager klimaforandringer:\\n\\nFor at stoppe CO₂-niveauet fra at stige, skal indstrømninger og udstrømninger være i balance.\\n\\nAt forstå \"beholdning og strømning\" hjælper dig med at se, at klimaforandringer ikke bare handler om at bruge færre fossile brændstoffer — det handler om at ændre hele systemet, så vi stopper med at overfylde den atmosfæriske \"vask.\"\\n\\nDet handler ikke bare om én god handling.\\n\\nDet handler om, hvordan alle vores kollektive handlinger påvirker den **samlede mængde** over tid." } // 1: text
      ]
    },
    {
      // Section 6 (green block)
      content: [
        { title: '**🌍 Visionen om \"Netto-nul-udledninger\"**', content: "**Hvad betyder netto-nul-udledninger?**\\n\\nTænk på netto-nul-udledninger som at balancere en vægt.\\n\\nDet betyder ikke, at vi aldrig producerer kulstofudledninger igen.\\n\\nDet betyder:\\n\\n**Vi tilføjer ikke ekstra kuldioxid til atmosfæren samlet set.**\\n\\nMed andre ord bliver enhver CO₂, vi udleder, opvejet af CO₂, vi fjerner fra atmosfæren." }, // 0: text
        { title: '**🛁 Tilbage til vores vaskemetafor**', content: "Husk, forestil dig at atmosfæren er en stor vask (din CO₂-\"beholdning\").\\n\\n- Vandet, der kommer ind = **CO₂-udledninger**\\n- Vandet, der løber ud = **CO₂-fjernelser**\\n\\n**Netto nul** er, når vand strømmer ind med samme hastighed, som det strømmer ud, så vandniveauet holder op med at stige.\\n\\nDet betyder, at CO₂-koncentrationen i atmosfæren stabiliseres i stedet for at stige." }, // 1: text
        { title: '**🧩 Hvordan vi når netto nul**', content: "For at nå netto nul har vi brug for to store ting, der arbejder sammen:\\n\\n**1️⃣ Skær udledningerne så meget som muligt**\\n\\nDette betyder:\\n- Mere vedvarende energi\\n- Energieffektivitet\\n- Renere transport\\n- Bedre bygninger\\n- Skifte væk fra fossile brændstoffer\\n\\n*Reducere det, der kommer ind i badekarret.*\\n\\n**2️⃣ Øg CO₂-fjernelser**\\n\\nDette betyder:\\n- Beskytte skove\\n- Genplante skove (skovrejsning)\\n- Sundere jord\\n- Teknologi, der trækker CO₂ ud af luften\\n\\n*Fremskynde afløbet.*" }, // 2: text
        { title: '**🏁 Hvorfor netto nul er vigtigt**', content: '' }, // 3: text
        { alt: 'Netto nul = udledninger ind – fjernelser ud = 0' }, // 4: image
        { content: "Forskere siger, at vi skal nå globalt netto nul omkring 2050 for at hjælpe med at begrænse opvarmningen til 1,5°C.\\n\\nHvorfor? Fordi den CO₂, der allerede er i atmosfæren, fortsætter med at opvarme Jorden — så vi er nødt til at stoppe med at tilføje mere.\\n\\nNetto nul er grundlæggende menneskeheden, der siger: **\"Vi er færdige med at øge CO₂-niveauet i atmosfæren.\"**\\n\\nDet er ikke perfektion. Det er balance.\\n\\nOg det er et af de vigtigste mål for at holde fremtidige klimaforandringer håndterbare." }, // 5: text
        { title: '**💭 Lad os reflektere**', content: 'Tag et øjeblik til at tænke over, hvad du har lært i dette modul.' }, // 6: text
        { prompt: 'Hvad tror du, der skal ske, for at de globale temperaturer rent faktisk begynder at falde?' }, // 7: reflection
        { prompt: 'Hvad hjalp denne lektion dig med at forstå om beholdninger og strømninger? Hvor ser du klimarelaterede beholdninger og strømninger i dit lokalsamfund? For eksempel, kan vi se beholdninger og strømninger i forurening, fast fashion eller madspild?' } // 8: reflection
      ]
    },
    {
      // Section 7 (amber block)
      content: [
        {
          alt: '"Håb som en beholdning" — et citat af Krista Tippett med en illustration af hænder, der holder en hjerteformet globus med blade.'
        },
        {
          content: 'Selvom du til tider kan føle dig pessimistisk eller usikker, tror vi, at det at dyrke forankret håb er en vigtig muskel. Vi inviterer dig til at lytte til denne **korte guidede meditation**, der præsenterer håb som en beholdning — noget vi bevidst kan genopfylde, selv i mødet med store globale udfordringer.'
        },
        {
          title: '**🌎 Guidet meditation: At dyrke klimahåb**'
        }
      ]
    },
    {
      // Section 8 (purple block — module feedback)
      content: [
        {
          title: 'Tillykke med at have gennemført Modul 2: Beholdning & Strømning!',
          description: "Før du begynder det næste, vil vi gerne have din feedback på denne læringsoplevelse."
        }
      ]
    }
  ],
  components: {
    exercise: {
      title: 'Test dine forudsigelser: Kulstofpris-simulering',
      carbonPrice: 'Kulstofpris',
      statusQuo: 'status quo',
      low: 'lav',
      medium: 'middel',
      high: 'høj',
      veryHigh: 'meget høj',
      temperatureTitle: 'Temperatur-\\nstigning\\ntil 2100',
      openFullscreen: 'Åbn i fuld skærm',
      closeFullscreen: 'Luk fuld skærm',
      loadingModel: 'Indlæser En-ROADS-model...',
      failedToLoad: 'Kunne ikke indlæse En-ROADS-modellen.',
      baseline: 'BASELINE',
      currentScenario: 'NUVÆRENDE SCENARIE'
    },
    removals: {
      title: '⚙️ Byg en model: Kulstofpris + CO₂-fjernelse',
      carbonPrice: 'Kulstofpris',
      natureBasedRemovals: 'Naturbaseret fjernelse',
      technologicalRemovals: 'Teknologisk fjernelse',
      emissionsAndRemovalsTitle: 'CO₂-udledninger og -fjernelser',
      concentrationTitle: 'CO₂-koncentration',
      emissions: 'CO₂-UDLEDNINGER',
      removals: 'CO₂-FJERNELSER'
    },
    groupingFilters: {
      drawYourOwn: 'tegn din egen beholdning & strømning',
      step: 'trin',
      reflect: 'lad os reflektere',
      whatAreRemovals: 'hvad er co₂-fjernelser?',
      naturalRemovals: 'naturlige co₂-fjernelser omfatter',
      technologicalRemovals: 'teknologiske co₂-fjernelser omfatter',
      netRemovals: 'hvorfor vi taler om "netto" co₂-fjernelser',
      co2Removal: 'co₂-fjernelse'
    }
  }
};
