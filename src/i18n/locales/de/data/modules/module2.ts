export const module2 = {
  title: 'Bestand & Fluss',
  sections: [
    {
      // Section 1 (teal block)
      content: [
        { label: 'Glossar öffnen' }, // 0: button
        { title: '**Über dieses Modul**', content: 'Manche Dinge bauen sich langsam auf – und das verändert alles.' }, // 1: text
        { alt: 'Diagramm eines Badewannenmodells mit einem Wasserhahn, der ein Wasserbecken füllt, mit Pfeilen, die den Zufluss (Inflow) vom Hahn und den Abfluss (Outflow) am Boden anzeigen.' }, // 2: image
        { title: '', content: "Stell dir vor, du hast ein **Spülbecken**.\n\n- Das **Wasser, das bereits im Becken ist**, ist der **Bestand** (Stock).\n- Das **Wasser, das aus dem Hahn kommt**, ist ein **Zufluss** (Flow).\n- Das **Wasser, das abfließt**, ist ein weiterer **Fluss** (Flow).\n\n Die Größe des Bestands (wie viel Wasser im Becken ist) hängt von den Flüssen ab (wie schnell Wasser hinein- oder herausfließt).\n\nWenn das Wasser aus dem Hahn schneller fließt als der Abfluss?\n➡️ Das Becken füllt sich.\n\nWenn der Abfluss schneller ist als das Wasser aus dem Hahn?\n➡️ Das Becken leert sich.\n\nWenn sie gleich schnell sind?\n➡️ Der Wasserstand bleibt gleich." }, // 3: text
        { title: '**Kernkonzepte**', content: '' }, // 5: text
        { // 6: flip-cards
          cards: [
            {
              frontTitle: 'Bestand',
              frontDescription: 'Was sich über die Zeit ansammelt',
              backTitle: 'Definition',
              backDescription: 'Ein Bestand ist alles in einem System, das sich über die Zeit aufbauen oder verringern kann – wie Wasser in einem Spülbecken oder Reservoir, Geld auf einem Sparkonto oder Kohlenstoff in der Atmosphäre.'
            },
            {
              frontTitle: 'Zufluss',
              frontDescription: 'Was den Bestand erhöht',
              backTitle: 'Definition',
              backDescription: 'Ein Zufluss ist alles, was zu einem Bestand hinzugefügt wird – wie Wasser, das in ein Spülbecken fließt, neues Geld, das auf ein Bankkonto geht, oder Kohlenstoff, der in die Atmosphäre freigesetzt wird.'
            },
            {
              frontTitle: 'Abfluss',
              frontDescription: 'Was den Bestand verringert',
              backTitle: 'Definition',
              backDescription: 'Ein Abfluss ist alles, was von einem Bestand weggenommen wird – wie Wasser, das aus einem Spülbecken abläuft, Geld, das von einem Bankkonto ausgegeben wird, oder Kohlenstoff, der aus der Atmosphäre entfernt wird.'
            }
          ]
        },
        { title: '**Lass uns deine Intuition darüber testen, wie Systeme sich verhalten.**', content: '' }, // 7: text (quiz intro)
        {
          items: [
            {
              statement: 'Wenn die Emissionen nicht mehr steigen, wird der CO₂-Gehalt in der Atmosphäre nicht mehr ansteigen.',
              explanation: 'Selbst wenn die Emissionen konstant bleiben, baut sich CO₂ weiter auf, weil der Zufluss immer noch größer als der Abfluss ist.'
            },
            {
              statement: 'Die CO₂-Emissionen müssen geringer als die Entnahmen sein, damit die Konzentration in der Atmosphäre sinkt.',
              explanation: 'Nur wenn die Entnahmen die Emissionen übersteigen, sinkt die Gesamtkonzentration.'
            }
          ]
        }, // 8: true-or-myth
        { title: '**🛁 Zeichne deinen eigenen Bestand & Fluss**', content: "Um zu erkunden, wie \"Bestand und Fluss\" funktioniert, fangen wir mit einem persönlichen Beispiel an. Wähle ein Beispiel für einen Bestand, der dir wichtig ist." }, // 9: text
        { title: '', content: "**Erster Schritt:** Zeichne ein Bestand-und-Fluss-Diagramm wie im Bild unten.\n\n*Du benötigst Papier und einen Stift, um den Bestand und Fluss zu zeichnen. Oder du kannst dieses Arbeitsblatt herunterladen und ausdrucken.*" }, // 10: text
        { alt: 'Diagramm eines Badewannenmodells mit einem Wasserhahn und einem Abfluss.' }, // 9: image
        { title: '', content: "**Zweiter Schritt:** Wähle einen Bestand, der dir wichtig ist. Überlege dir etwas, das steigen oder fallen kann, je nachdem, was hinein- oder herausfließt. Einige Beispiele für einen „Bestand“ könnten sein:\n\n- Mein Wohlbefinden\n- Mein Geld\n- Meine Motivation im Studium/Schule\n- Das Vertrauen in meinen Beziehungen\n- Die Hoffnung, die ich für eine positive Zukunft habe" }, // 10: text
        { title: '', content: "**Dritter Schritt:** Zeichne die Zuflüsse für dein gewähltes Bestandsbeispiel ein. Was füllt deinen Bestand auf? Versuche, mindestens drei Zuflüsse zu identifizieren." }, // 11: text
        { title: '', content: "**Vierter Schritt:** Zeichne die Abflüsse ein. Was verringert deinen Bestand? Denke daran, dass diese Zu- und Abflüsse Faktoren beschreiben, die deinen Bestand über die Zeit verändern. Versuche, mindestens 3 Abflüsse zu identifizieren." }, // 12: text
        { title: '', content: "**Fünfter Schritt:** Teile deinen Bestand und Fluss mit einem Partner oder in einer kleinen Gruppe." }, // 13: text
        { title: '**💭Lass uns reflektieren**', content: "" }, // 14: text
        { prompt: 'Was ist in deinem Bestand-und-Fluss-Modell passiert? Was ist dir aufgefallen oder was hast du dich gefragt, als du deinen gewählten Bestand mit diesem Modell erkundet hast? Hat dich etwas überrascht?' } // 15: reflection
      ]
    },
    {
      // Section 2 (amber block)
      content: [
        { title: '**🌍 Warum das für den Klimawandel wichtig ist**', content: "Die Idee von „Bestand und Fluss“ mag offensichtlich erscheinen, wenn wir über etwas Einfaches sprechen – wie Wasser, das eine Badewanne füllt. Aber wenn wir versuchen, dieselbe Idee zu nutzen, um den Klimawandel zu verstehen, können die Dinge etwas komplizierter werden.\n\nDennoch ist das Bestand-und-Fluss-Modell **wirklich hilfreich**, um die grundlegenden Kräfte zu verstehen, die den Klimawandel antreiben.\n\nZuerst schauen wir uns an, was den Klimawandel heute verursacht, indem wir einige Simulationen in **En-ROADS** durchführen.\n\ndanach verknüpfen wir das, was wir in den Simulationen gesehen haben, mit dem Bestand-und-Fluss-Konzept, damit das Gesamtbild mehr Sinn ergibt." }, // 0: text
        { title: "**Lass uns eine Vorhersage treffen**", content: "Bevor wir in En-ROADS eintauchen, lass uns einige Vorhersagen treffen.\n\nDenke über die Beziehung nach zwischen:\n- CO2-Emissionen (was wir in die Atmosphäre abgeben)\n- CO2-Konzentration (wie viel letztendlich dort bleibt)\n- CO2-Entnahme (wie viel Kohlendioxid aus der Atmosphäre entfernt wird)\n\nDies sind drei der wichtigsten Teile des Klimasystems – schauen wir also, was du bereits denkst, bevor wir das Modell erkunden.\n\nÜberlegen wir nun, was passieren könnte, wenn wir versuchen, die globalen CO2-Emissionen zu reduzieren. Triff deine besten Vorhersagen für jedes Szenario:" }, // 1: text
        { question: '**Szenario 1. Den Anstieg stoppen**\nWenn unsere gesamten CO2-Emissionen aufhören zu steigen und flach bleiben, und unsere CO2-Entnahme gleich bleibt, was glaubst du, wird mit der Menge an CO2 passieren, die sich bereits in der Atmosphäre befindet?', options: ['Erhöhung', 'Einpendeln', 'Verringerung'] }, // 2: poll
        { question: '**Szenario 2. Emissionen senken**\nWenn unsere gesamten CO2-Emissionen stark sinken und viel niedriger werden als heute, und unsere CO2-Entnahme gleich bleibt, was glaubst du, wird mit der CO2-Konzentration in der Atmosphäre passieren?', options: ['Erhöhung', 'Einpendeln', 'Verringerung'] } // 3: poll
      ]
    },
    {
      // Section 3 (purple block)
      content: [
        { title: "**Lass uns deine Vorhersagen testen!**", content: "In dieser nächsten Aktivität wirst du **[En-ROADS](/module/1?block=2&section=what-if)** verwenden, um diese zwei Szenarien zu simulieren.\n\nWie wir im letzten Modul gelernt haben, ist ein **CO2-Preis** eine der mächtigeren und wirkungsvolleren Klimamaßnahmen, um unsere globalen CO2-Emissionen schnell zu senken.\n\n Passe den CO2-Preis-Schieberegler an, um zu sehen, wie sich eine Änderung der Emissionen auf die Konzentration von CO2 in der Atmosphäre auswirkt." }, // 0: text
        {}, // 1: module2-exercise
        { title: '**💭 Lass uns reflektieren**', content: 'Nimm dir einen Moment Zeit, um über das nachzudenken, was du gerade in der Simulation beobachtet hast.' }, // 2: text
        { prompt: 'Was bemerkst du? Haben deine Erwartungen mit dem Ergebnis übereingestimmt? Warum glaubst du, ist dies das Ergebnis?' } // 3: reflection
      ]
    },
    {
      // Section 4 (pink block)
      content: [
        { title: '**CO2-Entnahme verstehen**', content: "Wir fügen nun **zwei weitere Schieberegler** zu unserer Simulation hinzu. Diese Schieberegler repräsentieren verschiedene Wege, wie wir **CO2 aus der Atmosphäre entfernen** können – und wir werden sehen, wie das die gesamte CO2-Konzentration über die Zeit verändert." }, // 0: text
        { title: '**🌱 Was ist CO2-Entnahme?**', content: 'CO2-Entnahmen sind natürliche oder technologische Prozesse, die Kohlendioxid aus der Luft entnehmen und woanders speichern.\n\nBetrachte das CO2 als den Abfluss.' }, // 1: text
        { title: '**Natürliche CO2-Entnahme umfasst:**', content: '- Bäume und Pflanzen, die CO2 beim Wachsen absorbieren\n- Boden, der Kohlenstoff aus abgestorbenem Pflanzenmaterial speichert\n- Der Ozean, der CO2 aus der Luft absorbiert (was leider auch das Wasser saurer macht)' }, // 2: text
        { alt: 'Natürliche CO2-Entnahmedprozesse' }, // 3: image
        { title: '**Technologische CO2-Entnahme umfasst:**', content: '- Direct Air Capture (DACCS): Maschinen, die CO2 aus der Luft ziehen und tief unter der Erde in Gestein speichern\n- Beschleunigte Verwitterung (Enhanced mineralization): Verteilen von speziellen Gesteinsarten auf dem Land, damit sie CO2 natürlich schneller absorbieren als normal' }, // 4: text
        { alt: 'Technologische CO2-Entnahmeprozesse' }, // 5: image
        { title: '**🌳 Warum wir von „Netto“-CO2-Entnahmen sprechen**', content: "Selbst wenn CO2 entfernt wird, kann ein Teil davon wieder in die Atmosphäre **entweichen**.\nDies kann passieren durch:\n\n- Waldbrände\n- Holzeinschlag\n- Landwirtschaft\n- Landnutzungsänderungen\n\nStatt nur von „CO2-Entnahmen“ sprechen wir daher von **Netto-CO2-Entnahmen**, was bedeutet:\n\n **Gesamtes aus der Atmosphäre entnommenes CO2** *-* **Gesamtes CO2, das letztendlich wieder in die Atmosphäre gelangt**\n\nDies ergibt ein genaueres Bild dessen, was wirklich passiert." } // 6: text
      ]
    },
    {
      // Section 5 (teal block)
      content: [
        { title: '**🎛️ Wie das in der Simulation funktioniert**', content: "Wir können ändern, wie viel CO2 durch Maßnahmen wie die Förderung der Wiederaufforstung von Teilen des Ackerlandes oder durch Investitionen in technologische Kohlendioxidentnahme aus der Atmosphäre entfernt wird.\n\nMit den zwei neuen En-ROADS-Schiebereglern unten kannst du folgendes erhöhen:\n\n- **Naturbasierte CO2-Entnahme** (wie Wiederaufforstung)\n- **Technologische CO2-Entnahme** (wie Direct Air Capture)\n\nWenn du diese Schieberegler anpasst, siehst du ein neues Diagramm namens „**CO2-Emissionen und -Entnahmen.**“\n\nEs zeigt:\n- Emissionen (was wir hinzufügen: der „Zufluss“)\n- Entnahmen (was wir herausnehmen: der „Abfluss“)\n\nUnd wie zuvor siehst du immer noch das **CO2-Konzentrationsdiagramm**, damit du beobachten kannst, wie sich der gesamte „Bestand“ in der Atmosphäre verändert." }, // 0: text
        { title: '**🧠 Lass uns vorhersagen**', content: 'Bevor du die Schieberegler bewegst, triff deine Vorhersage:' }, // 1: text
        { question: 'Wann glaubst du, wird die CO2-Konzentration in der Atmosphäre anfangen zu sinken?', options: ['Wenn die CO2-Emissionen größer sind als die CO2-Entnahmen', 'Wenn die CO2-Emissionen gleich den CO2-Entnahmen sind', 'Wenn die CO2-Emissionen kleiner sind als die CO2-Entnahmen'] }, // 2: poll
        { title: '**⚙️ Erstelle ein Modell**', content: '' }, // 3: text
        {}, // 4: module2-removals
        { title: '**💭 Lass uns reflektieren**', content: 'Nimm dir einen Moment Zeit, um über das nachzudenken, was du gerade in der Simulation beobachtet hast.' }, // 5: text
        { prompt: 'Was bemerkst du? Haben deine Erwartungen mit dem Ergebnis übereingestimmt? Warum glaubst du, ist dies das Ergebnis?' } // 6: reflection
      ]
    },
    {
      // Section 6 (blue block)
      content: [
        { title: '**🌍 Warum das für den Klimawandel wichtig ist**', content: '' }, // 0: text
        { content: "Erinnere dich an den Bestand & Fluss. Denke bei Kohlendioxid (CO2) an das Gleiche.\n-Die **Atmosphäre** ist wie das Becken – dies ist der **Bestand**.\n-Das Verbrennen von fossilen Brennstoffen (Autos, Fabriken usw.) ist wie das Wasser, das aus dem Hahn kommt – das ist ein **Zufluss**, der CO2 hinzufügt.\n-Bäume und Ozeane, die CO2 absorbieren, sind wie der Abfluss – das ist ein **Abfluss**, der CO2 entfernt.\n\nIm Moment läuft der **Hahn auf Hochtouren** und der **Abfluss ist langsam**, sodass der „CO2-Spiegel“ weiter ansteigt.\n\nSelbst wenn wir den Hahn zudrehen, wird sich das Becken **weiter füllen**, es sei denn, der Abfluss ist ebenso schnell.\n\nDies hilft zu erklären, warum es so schwer ist, die Emissionen anzugehen, die den Klimawandel verursachen:\n\nUm den CO2-Spiegel am Steigen zu hindern, müssen Zuflüsse und Abflüsse im Gleichgewicht sein.\n\nDas Verständnis von „Bestand und Fluss“ hilft dir zu sehen, dass es beim Klimawandel nicht nur darum geht, weniger fossile Brennstoffe zu verbrauchen – es geht darum, das ganze System zu ändern, damit wir das atmosphärische „Becken“ nicht weiter überfüllen.\n\nEs geht nicht nur um eine gute Tat.\n\nEs geht darum, wie alle unsere kollektiven Handlungen die **Gesamtmenge** über die Zeit beeinflussen." } // 2: text
      ]
    },
    {
      // Section 7 (green block)
      content: [
        { title: '**🌍 Die Vision von „Netto-Null-Emissionen“**', content: "**Was bedeutet Netto-Null-Emissionen?**\n\nStell dir Netto-Null-Emissionen wie das Ausbalancieren einer Waage vor.\n\nEs bedeutet nicht, dass wir nie wieder Kohlenstoffemissionen produzieren.\n\nEs bedeutet:\n\n**Wir fügen der Atmosphäre insgesamt kein zusätzliches Kohlendioxid hinzu.**\n\nMit anderen Worten: Jedes CO2, das wir emittieren, wird durch CO2 ausgeglichen, das wir aus der Atmosphäre entfernen." }, // 0: text
        { title: '**🛁 Zurück zu unserer Badewannen-Metapher**', content: "Erinnere dich: Stell dir die Atmosphäre als ein großes Becken vor (dein CO2-„Bestand“).\n\n- Das einfließende Wasser = **CO2-Emissionen**\n- Das abfließende Wasser = **CO2-Entnahmen**\n\n**Netto-Null** ist, wenn Wasser mit der gleichen Rate einfließt, wie es abfließt, sodass der Wasserstand aufhört zu steigen.\n\nDas bedeutet, dass sich die CO2-Konzentration in der Atmosphäre einpendelt, anstatt anzusteigen." }, // 1: text
        { title: '**🧩 Wie wir zu Netto-Null gelangen**', content: "Um Netto-Null zu erreichen, brauchen wir zwei große Dinge, die zusammenarbeiten:\n\n**1️⃣ Emissionen so weit wie möglich senken**\n\nDas bedeutet:\n- Mehr erneuerbare Energien\n- Energieeffizienz\n- Sauberer Transport\n- Bessere Gebäude\n- Abkehr von fossilen Brennstoffen\n\n*Die Menge reduzieren, die in die Wanne fließt.*\n\n**2️⃣ CO2-Entnahmen erhöhen**\n\nDas bedeutet:\n- Schutz der Wälder\n- Wiederbewaldung\n- Gesündere Böden\n- Technologien, die CO2 aus der Luft ziehen\n\n*Den Abfluss beschleunigen.*" }, // 2: text
        { title: '**🏁 Warum Netto-Null wichtig ist**', content: '' }, // 3: text
        { alt: 'Netto Null = Emissionen rein – Entnahmen raus = 0' }, // 4: image
        { content: "Wissenschaftler sagen, dass wir bis etwa 2050 ein globales Netto-Null erreichen müssen, um die Erwärmung auf 1,5 °C zu begrenzen.\n\nWarum? Weil das CO2, das bereits in der Atmosphäre ist, die Erde weiter erwärmt – wir müssen also aufhören, mehr hinzuzufügen.\n\nNetto-Null ist im Grunde die Menschheit, die sagt: **„Wir sind fertig damit, den CO2-Spiegel in der Atmosphäre zu erhöhen.“**\n\nEs ist nicht Perfektion. Es ist Gleichgewicht.\n\nUnd es ist eines der wichtigsten Ziele, um den zukünftigen Klimawandel beherrschbar zu halten." }, // 5: text
        { title: '**💭 Lass uns reflektieren**', content: 'Nimm dir einen Moment Zeit, um darüber nachzudenken, was du in diesem Modul gelernt hast.' }, // 6: text
        { prompt: 'Was fandest du am interessantesten oder herausforderndsten an der Idee von Netto-Null? Welche Frage hast du noch zu diesem Thema?' } // 7: reflection
      ]
    },
    {
      // Section 8 (amber block)
      content: [
        {
          alt: '„Hoffnung als Bestand“ — ein Zitat von Krista Tippett mit einer Illustration von Händen, die einen herzförmigen Globus mit Blättern halten.'
        },
        {
          content: 'Auch wenn du dich manchmal pessimistisch oder unsicher fühlst, glauben wir, dass es wichtig ist, eine geerdete Hoffnung zu stärken. Wir laden dich ein, diese **kurze geführte Meditation** anzuhören, die Hoffnung als einen Bestand beschreibt – etwas, das wir bewusst wieder auffüllen können, selbst angesichts großer globaler Herausforderungen.'
        },
        {
          title: '**🌎 Geführte Meditation: Klima-Hoffnung stärken**'
        }
      ]
    }
  ],
  components: {
    exercise: {
      title: 'Teste deine Vorhersagen: CO2-Preis-Simulation',
      carbonPrice: 'CO2-Preis',
      statusQuo: 'Status Quo',
      low: 'niedrig',
      medium: 'mittel',
      high: 'hoch',
      veryHigh: 'sehr hoch',
      temperatureTitle: 'Temperatur-\nanstieg bis\n2100',
      openFullscreen: 'Vollbild öffnen',
      closeFullscreen: 'Vollbild schließen',
      loadingModel: 'En-ROADS-Modell wird geladen...',
      failedToLoad: 'En-ROADS-Modell konnte nicht geladen werden.',
      baseline: 'BASISLINIE',
      currentScenario: 'AKTUELLES SZENARIO'
    },
    removals: {
      title: '⚙️ Erstelle ein Modell: CO2-Preis + CO2-Entnahme',
      carbonPrice: 'CO2-Preis',
      natureBasedRemovals: 'Naturbasierte Entnahme',
      technologicalRemovals: 'Technologische Entnahme',
      emissionsAndRemovalsTitle: 'CO₂-Emissionen und -Entnahme',
      concentrationTitle: 'CO₂-Konzentration',
      emissions: 'CO₂ EMISSIONS',
      removals: 'CO₂-ENTNAHME'
    },
    groupingFilters: {
      drawYourOwn: 'zeichne deinen eigenen bestand & fluss',
      step: 'schritt',
      reflect: "lass uns reflektieren",
      whatAreRemovals: 'was ist co2-entnahme?',
      naturalRemovals: 'natürliche co2-entnahme umfasst',
      technologicalRemovals: 'technologische co2-entnahme umfasst',
      netRemovals: 'warum wir von „netto“-co2-entnahmen sprechen',
      co2Removal: 'co2-entnahme'
    }
  }
};
