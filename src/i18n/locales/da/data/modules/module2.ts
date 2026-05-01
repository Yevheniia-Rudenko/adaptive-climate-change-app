export const module2 = {
  title: "Beholdning & Strømning",
  sections: [
    {
      // Section 0 (teal block)
      content: [
        {
          title: '**Om dette modul**',
          content: "Forestil dig, at du leder en virksomhed og vil vide, hvor mange penge du har. Du ville kigge på din bankkonto, ikke? Men hvad hvis du ville forstå, hvorfor det beløb ændrer sig? Du ville være nødt til at se på dine indtægter og udgifter.\n\nDet samme gælder for at forstå klimaet. Vi er nødt til at se på mere end blot mængden af kuldioxid (CO₂) i atmosfæren – vi er nødt til at se på, hvordan det kommer derind, og hvordan det bliver fjernet."
        }, // 0: text
        {
          title: '**Nøglebegreber**',
          content: 'Lad os gennemgå nogle af nøglebegreberne nedenfor. Brug et øjeblik på at se de følgende kort igennem, mens du overvejer dine egne definitioner.'
        }, // 1: text
        {
          title: '',
          cards: [
            {
              frontTitle: 'Beholdning (Stock)',
              frontDescription: 'Mængden af noget',
              backTitle: 'Definition',
              backDescription: 'En beholdning er mængden af noget, der samler sig over tid. Tænk på det som mængden af vand i et badekar på et givet tidspunkt.'
            },
            {
              frontTitle: 'Strømning (Flow)',
              frontDescription: 'Ændring af beholdningen',
              backTitle: 'Definition',
              backDescription: 'En strømning er den hastighed, hvormed noget tilføjes eller fjernes fra en beholdning. Det er ligesom vandet, der løber fra hanen, eller vandet, der forsvinder ud af afløbet i badekarret.'
            },
            {
              frontTitle: 'Ligevægt',
              frontDescription: 'En balanceret tilstand',
              backTitle: 'Definition',
              backDescription: 'Ligevægt er en tilstand, hvor beholdningen forbliver den samme. Det sker, når den strømning, der tilføjes til beholdningen, er præcis lig med den strømning, der fjernes fra beholdningen.'
            },
          ]
        }, // 2: flip-cards
        {
          title: '**Stop op og test dig selv**',
          content: 'Hvilke andre eksempler på beholdning og strømning kan du komme i tanke om?'
        }, // 3: text
        {
          prompt: 'Tænk på nogle hverdags-eksempler på beholdninger og strømninger. Hvad falder dig ind?'
        }, // 4: reflection
        {
          title: '**Hvorfor det betyder noget for klimaforandringer**',
          content: "Modeller for beholdning og strømning kan findes i alle systemer, fra vores bankkonti og madlagre til vores følelser og det globale klima.\n\nAt forstå denne model hjælper os med at se, hvorfor klimaet ændrer sig, og hvad vi skal gøre for at stabilisere det."
        }, // 5: text
      ]
    },
    {
      // Section 1 (green block)
      content: [
        {
          title: '**Forståelse af CO2-udledning og fjernelse**',
          content: "I Jordens atmosfære er mængden af kuldioxid (CO₂) og andre drivhusgasser en beholdning. Denne beholdning afgør, hvor meget vores planet opvarmes."
        }, // 0: text
        { alt: 'Illustration af drivhusgasser i atmosfæren' }, // 1: image
        {
          title: '**Tilførsler (Inflows)**',
          content: "De strømninger, der tilføjer til denne beholdning - kaldet tilførsler - er for det meste **udledning af drivhusgasser** fra menneskelige aktiviteter, såsom afbrænding af fossile brændstoffer til energi og transport, eller rydning af skove."
        }, // 2: text
        { alt: 'Illustration af kilder til drivhusgasudledning: fabrikker, transport, skovrydning' }, // 3: image
        {
          title: '**Afløb (Outflows)**',
          content: "De strømninger, der reducerer denne beholdning - kaldet afløb - er de processer, der **fjerner CO₂** fra atmosfæren. Dette sker naturligt, for eksempel når træer og havet absorberer kulstof."
        }, // 4: text
        { alt: 'Illustration af drivhusgasfjernelse: skove, have' }, // 5: image
      ]
    },
    {
      // Section 2 (amber block)
      content: [
        {
          title: '**Stop op og reflekter**',
          content: "Tænk på badekarret. Hvordan får du vandstanden til at forblive den samme?"
        }, // 0: text
        {
          question: 'Hvordan forhindrer du mængden af vand i et badekar i at ændre sig?',
          options: [
            'Sluk helt for hanen',
            'Sørg for, at der løber vand ind i samme hastighed, som det løber ud',
            'Åbn afløbet mere',
          ]
        }, // 1: poll
        {
          content: "For at forhindre vandet i at stige, skal vandet fra hanen (tilførslen) være lig med vandet, der løber ud af afløbet (afløbet).\n\nLige nu bliver der udledt langt flere drivhusgasser i atmosfæren (hanen er åbnet på fuldt tryk), end naturen kan nå at fjerne (afløbet er delvist stoppet). Da tilførslen er større end afløbet, stiger den samlede mængde gasser i atmosfæren (beholdningen), hvilket får planeten til at varme op."
        }, // 2: text
        { alt: 'Badekar løber over, fordi hanen er skruet for meget op' }, // 3: image
        {
          title: '**Hvordan det fungerer i en simulering**',
          content: "Lad os se, hvordan begrebet beholdning og strømning vises i klimasimulatoren En-ROADS."
        }, // 4: text
        { alt: 'Beholdning og strømning graf i En-ROADS' }, // 5: image
        {
          content: "Denne graf i En-ROADS viser strømmene ind og ud af CO₂-beholdningen i atmosfæren. Den blå linje ('Netto CO₂-fjernelse') er hastigheden, hvormed kuldioxid trækkes ud af atmosfæren. Dette er afløbet.\n\nI øjeblikket er tilførslen (udledninger) meget højere end afløbet (fjernelse). På grund af dette vokser CO₂-beholdningen i atmosfæren."
        }, // 6: text
        { title: '**Hvorfor det er vigtigt for klimaforandringer**' }, // 7: text
        {
          content: "At forstå denne model hjælper os med at se, hvorfor klimaet ændrer sig, og hvad vi skal gøre for at stabilisere det."
        }, // 8: text
        {
          title: 'Visionen om "Netto Nul"',
          transcript: `Når vi taler om at opnå "Netto Nul", taler vi om at finde en balance.\n\nNetto Nul betyder, at den mængde drivhusgasser, vi udleder i atmosfæren, svarer til den mængde, vi fjerner. For at bruge metaforen med badekarret: mængden af vand, der strømmer ud af hanen, matcher præcis den mængde vand, der løber ud af afløbet. Som et resultat holder den samlede vandstand - eller den samlede mængde drivhusgasser i atmosfæren - op med at stige.\n\nDet er derfor så mange virksomheder og lande sætter "Netto Nul"-mål. Det er det nødvendige skridt for at stabilisere jordens temperatur og forhindre de værste virkninger af klimaforandringerne. Så længe udledningerne er større end fjernelsen, vil klimaet fortsætte med at varme op.`
        }, // 9: audio
        {
          prompt: 'Forestil dig en verden, der har nået Netto Nul. Hvordan ville dit liv og dit samfund se ud?'
        }, // 10: reflection
      ]
    },
    {
      // Section 3 (purple block)
      content: [
        {
          title: '**Håb som en beholdning**',
          content: "Vi kan også anvende begrebet beholdning og strømning på vores eget liv. Tænk på din følelse af håb eller motivation som en beholdning."
        }, // 0: text
        { alt: 'Illustration af en person, der balancerer håb og fortvivlelse' }, // 1: image
        {
          content: "Hvad fungerer som tilførsler (der tilføjer til dit håb), og hvad fungerer som afløb (der trækker fra det)?\n\nFor eksempel kan det at lære om klimaløsninger eller at tilbringe tid i naturen øge din beholdning af håb, mens det at læse negative nyheder fungerer som et afløb.\n\nVed at forstå, hvad der fylder op, og hvad der dræner vores følelsesmæssige beholdning, kan vi bedre opretholde den energi og modstandsdygtighed, der er nødvendig for klimahandling."
        }, // 2: text
        { prompt: 'Hvad tilføjer til din "håbs-beholdning" (tilførsler), og hvad dræner den (afløb)?' } // 3: reflection
      ]
    }
  ]
};
