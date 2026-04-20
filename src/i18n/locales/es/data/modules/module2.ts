export const module2 = {
  title: 'Existencias y Flujos',
  sections: [
    {
      // Section 1 (teal block)
      content: [
        { label: 'Abrir Glosario' }, // 0: button
        { title: '**Sobre este Módulo**', content: 'Algunas cosas se acumulan lentamente, y eso lo cambia todo.' }, // 1: text
        { alt: 'Diagrama de un modelo de bañera que muestra un grifo llenando un tanque de agua, con flechas que indican el flujo de entrada (Inflow) desde el grifo y el flujo de salida (Outflow) drenando por el fondo.' }, // 2: image
        { title: '', content: "Imagina que tienes un **fregadero**.\n\n- El **agua que ya está en el fregadero** son las **existencias** (stock).\n- El **agua que entra por el grifo** es un **flujo** (flow).\n- El **agua que sale por el desagüe** es otro **flujo** (flow).\n\n El tamaño de las existencias (cuánta agua hay en el fregadero) depende de los flujos (qué tan rápido entra o sale el agua).\n\n¿Y si el agua del grifo corre más rápido que el desagüe?\n➡️ El fregadero se llena.\n\n¿Si el desagüe es más rápido que el agua del grifo?\n➡️ El fregadero se vacía.\n\n¿Si son iguales?\n➡️ El nivel del agua se mantiene igual." }, // 3: text
        { title: '**¿Qué son las Existencias y los Flujos?**', description: '' }, // 4: video
        { title: '**Conceptos Clave**', content: '' }, // 5: text
        { // 6: flip-cards
          cards: [
            {
              frontTitle: 'Existencias',
              frontDescription: 'Lo que se acumula con el tiempo',
              backTitle: 'Definición',
              backDescription: 'Una existencia (stock) es cualquier cosa en un sistema que puede aumentar o disminuir con el tiempo, como el agua en un fregadero o embalse, el dinero en una cuenta de ahorros o el carbono en la atmósfera.'
            },
            {
              frontTitle: 'Flujo de entrada',
              frontDescription: 'Lo que aumenta las existencias',
              backTitle: 'Definición',
              backDescription: 'Un flujo de entrada (inflow) es cualquier cosa que se añade a una existencia, como el agua que fluye hacia un fregadero, el dinero nuevo que entra en una cuenta bancaria o el carbono que se libera a la atmósfera.'
            },
            {
              frontTitle: 'Flujo de salida',
              frontDescription: 'Lo que disminuye las existencias',
              backTitle: 'Definición',
              backDescription: 'Un flujo de salida (outflow) es cualquier cosa que resta de una existencia, como el agua que drena de un fregadero, el dinero que se gasta de una cuenta bancaria o el carbono que se elimina de la atmósfera.'
            }
          ]
        },
        { title: '**🛁 Dibuja tus propios Existencia y Flujo**', content: "Para explorar cómo funcionan las \"Existencias y Flujos\", empecemos con un ejemplo personal. Elige un ejemplo de una existencia que te importe." }, // 7: text
        { title: '', content: "**Paso Uno:** Dibuja un diagrama de Existencia y Flujo como en la imagen de abajo.\n\n*Necesitarás papel y un bolígrafo o lápiz para dibujar la Existencia y el Flujo. O también puedes descargar e imprimir esta hoja de trabajo de Existencia y Flujo.*" }, // 8: text
        { alt: 'Diagrama de un modelo de bañera que muestra un grifo llenando un tanque de agua.' }, // 9: image
        { title: '', content: "**Paso Dos:** Elige una existencia que te importe. Piensa en algo que pueda subir o bajar dependiendo de lo que entre o salga de ello. Algunos ejemplos de \"existencias\" podrían ser:\n\n- Mi nivel de bienestar\n- Mi dinero\n- Mi nivel de motivación académica\n- El nivel de confianza que tengo en mis relaciones\n- El nivel de esperanza que tengo en un futuro positivo" }, // 10: text
        { title: '', content: "**Paso Tres:** Dibuja los flujos de entrada para tu ejemplo de existencia elegido. ¿Qué está añadiendo o llenando tu existencia? Intenta identificar al menos tres flujos de entrada." }, // 11: text
        { title: '', content: "**Paso Cuatro:** Dibuja los flujos de salida. ¿Qué agota o disminuye tu existencia? Recuerda, estos flujos de entrada y salida describen factores que cambian tu existencia con el tiempo. Intenta identificar al menos 3 flujos de salida." }, // 12: text
        { title: '', content: "**Paso Cinco:** Comparte tu diagrama con un compañero o en un grupo pequeño." }, // 13: text
        { title: '**💭 Reflexionemos**', content: "" }, // 14: text
        { prompt: '¿Qué pasaba en tu modelo de Existencia y Flujo? ¿Qué notaste o te preguntaste sobre tu existencia elegida al explorarla con este modelo? ¿Algo te sorprendió?' } // 15: reflection
      ]
    },
    {
      // Section 2 (amber block)
      content: [
        { title: '**🌍 Por qué esto es importante para el Cambio Climático**', content: "La idea de \"existencias y flujos\" puede parecer super obvia cuando hablamos de algo sencillo, como el agua llenando una bañera. Pero cuando intentamos usar la misma idea para entender el cambio climático, las cosas pueden volverse un poco más complicadas.\n\nAun así, el modelo de existencias y flujos es **realmente útil** para entender las fuerzas básicas que impulsan el cambio climático.\n\nPrimero, veremos qué está causando el cambio climático hoy realizando algunas simulaciones en **En-ROADS**.\n\nDespués de eso, conectaremos lo que vimos en las simulaciones con la idea de existencias y flujos para que todo el panorama tenga más sentido." }, // 0: text
        { title: "**Hagamos una Predicción**", content: "Pero antes de sumergirnos en En-ROADS, hagamos algunas predicciones.\n\nPiensa en la relación entre:\n- Las emisiones de CO2 (lo que ponemos en la atmósfera)\n- La concentración de CO2 (cuánto termina quedándose allí)\n- La eliminación de CO2 (cuánto dióxido de carbono se elimina de la atmósfera)\n\nEstas son tres de las piezas más importantes del sistema climático — así que veamos qué piensas antes de explorar el modelo.\n\nAhora pensemos en qué podría pasar si intentamos reducir las emisiones globales de CO₂. Haz tus mejores predicciones para cada escenario:" }, // 1: text
        { question: '**Escenario 1. Detener el Crecimiento**\nSi nuestras emisiones totales de CO₂ dejan de subir y se mantienen planas, y nuestras eliminaciones de CO₂ se mantienen igual, ¿qué crees que pasará con la cantidad de CO₂ que ya está en la atmósfera?', options: ['Aumentará', 'Se nivelará', 'Disminuirá'] }, // 2: poll
        { question: '**Escenario 2. Bajar las Emisiones**\nSi nuestras emisiones totales de CO₂ caen mucho y se vuelven mucho más bajas de lo que son hoy, y nuestras eliminaciones de CO₂ se mantienen igual, ¿qué crees que pasará con la concentración de CO₂ en la atmósfera?', options: ['Aumentará', 'Se nivelará', 'Disminuirá'] } // 3: poll
      ]
    },
    {
      // Section 3 (purple block)
      content: [
        { title: "**¡Pongamos a prueba tus predicciones!**", content: "En esta próxima actividad, usarás **[En-ROADS](/module/1?block=2&section=what-if)** para simular estos dos escenarios.\n\nComo aprendimos en el módulo anterior, un **precio al carbono** es una de las políticas climáticas más potentes y de alto impacto para reducir rápidamente nuestras emisiones globales de CO₂.\n\n Ajusta el control deslizante del precio al carbono para ver cómo el cambio en las emisiones afecta a la concentración de CO₂ en la atmósfera." }, // 0: text
        {}, // 1: module2-exercise
        { title: '**💭 Reflexionemos**', content: 'Tómate un momento para pensar en lo que acabas de observar en la simulación.' }, // 2: text
        { prompt: '¿Qué notas? ¿Tus expectativas coincidieron con el resultado? ¿Por qué crees que este es el resultado?' } // 3: reflection
      ]
    },
    {
      // Section 4 (pink block)
      content: [
        { title: '**Entendiendo la Eliminación de CO₂**', content: "Ahora vamos a añadir **dos controles deslizantes más** a nuestra simulación. Estos controles representan diferentes formas en las que podemos **eliminar CO₂ de la atmósfera** — y veremos cómo eso cambia la concentración total de CO₂ a lo largo del tiempo." }, // 0: text
        { title: '**🌱 ¿Qué es la eliminación de CO₂?**', content: 'Las eliminaciones de CO₂ son procesos naturales o tecnológicos que sacan el dióxido de carbono del aire y lo almacenan en otro lugar.\n\nPiensa en el CO₂ como el flujo de salida.' }, // 1: text
        { title: '**La eliminación natural de CO₂ incluye:**', content: '- Árboles y plantas que absorben CO₂ al crecer\n- El suelo almacenando carbono de material vegetal muerto\n- El océano absorbiendo CO₂ del aire (lo que desafortunadamente también acidifica el agua)' }, // 2: text
        { alt: 'Procesos naturales de eliminación de CO₂' }, // 3: image
        { title: '**La eliminación tecnológica de CO₂ incluye:**', content: '- Captura Directa de Aire (DACCS): Máquinas que extraen CO₂ del aire y lo almacenan profundamente bajo tierra en rocas\n- Mineralización mejorada: Esparcir tipos especiales de roca en la tierra para que absorban naturalmente el CO₂ más rápido de lo normal' }, // 4: text
        { alt: 'Procesos tecnológicos de eliminación de CO₂' }, // 5: image
        { title: '**🌳 Por qué hablamos de eliminaciones de CO₂ "netas"**', content: "Incluso cuando se elimina CO₂, parte de él puede **filtrarse de nuevo** a la atmósfera.\nEsto puede suceder debido a:\n\n- Incendios forestales\n- Tala de árboles\n- Agricultura\n- Cambios en el suelo\n\nPor eso, en lugar de solo \"eliminaciones de CO₂\", usamos el término **eliminaciones netas de CO₂**, lo que significa:\n\n **CO₂ total extraído de la atmósfera** *-* **CO₂ total que termina regresando a la atmósfera**\n\nEsto da una imagen más precisa de lo que realmente está sucediendo." } // 6: text
      ]
    },
    {
      // Section 5 (teal block)
      content: [
        { title: '**🎛️ Cómo funciona esto en la simulación**', content: "Podemos cambiar cuánto CO₂ se elimina de la atmósfera mediante políticas como fomentar la reforestación de partes de las tierras de cultivo, o invirtiendo en la eliminación tecnológica de carbono.\n\nLos dos nuevos controles de En-ROADS de abajo te permiten aumentar:\n\n- **Eliminación de CO₂ basada en la naturaleza** (como la reforestación)\n- **Eliminación tecnológica de CO₂** (como la captura directa de aire)\n\nCuando ajustes estos controles, verás un nuevo gráfico llamado \"**Emisiones y Eliminaciones de CO₂.**\"\n\nEste muestra:\n- Emisiones (lo que añadimos: el \"flujo de entrada\")\n- Eliminaciones (lo que sacamos: el \"flujo de salida\")\n\nY, como antes, seguirás viendo el **gráfico de concentración de CO₂** para que puedas observar cómo cambian las \"existencias\" totales en la atmósfera." }, // 0: text
        { title: '**🧠 Predigamos**', content: 'Antes de empezar a mover los controles, haz tu predicción:' }, // 1: text
        { question: '¿Cuándo crees que la concentración de CO₂ en la atmósfera empezará a bajar?', options: ['Cuando las emisiones de CO₂ sean mayores que las eliminaciones de CO₂', 'Cuando las emisiones de CO₂ sean iguales a las eliminaciones de CO₂', 'Cuando las emisiones de CO₂ sean menores que las eliminaciones de CO₂'] }, // 2: poll
        { title: '**⚙️ Crea un Modelo**', content: '' }, // 3: text
        {}, // 4: module2-removals
        { title: '**💭 Reflexionemos**', content: 'Tómate un momento para pensar en lo que acabas de observar en la simulación.' }, // 5: text
        { prompt: '¿Qué notas? ¿Tus expectativas coincidieron con el resultado? ¿Por qué crees que este es el resultado?' } // 6: reflection
      ]
    },
    {
      // Section 6 (blue block)
      content: [
        { title: '**🌍 Por qué esto es importante para el Cambio Climático**', content: '' }, // 0: text
        { description: 'Entendiendo el cambio climático a través de la analogía de la bañera' }, // 1: video
        { content: "Recuerda las Existencias y los Flujos. Piensa en el dióxido de carbono (CO₂) de la misma manera.\n-La **atmósfera** es como el fregadero — estas son las **existencias**.\n-Quemar combustibles fósiles (coches, fábricas, etc.) es como el agua que sale del grifo — eso es un **flujo de entrada** añadiendo CO₂.\n-Los árboles y los océanos absorbiendo CO₂ son como el desagüe — eso es un **flujo de salida** eliminando CO₂.\n\nAhora mismo, el **grifo está a tope**, y el **desagüe es lento**, por lo que el \"fregadero\" de CO₂ sigue subiendo.\n\nIncluso si cerramos un poco el grifo, el fregadero se **seguirá llenando** a menos que el desagüe sea igual de rápido.\n\nEsto ayuda a explicar por qué abordar las emisiones que causan el cambio climático es tan difícil:\n\nPara que el nivel de CO₂ deje de subir, las entradas y salidas tienen que equilibrarse.\n\nComprender las \"existencias y flujos\" te ayuda a ver que el cambio climático no se trata solo de usar menos combustibles fósiles, sino de cambiar todo el sistema para que dejemos de llenar en exceso el \"fregadero\" atmosférico.\n\nNo se trata solo de una buena acción.\n\nSe trata de cómo todas nuestras acciones colectivas afectan a la **cantidad total** a lo largo del tiempo." } // 2: text
      ]
    },
    {
      // Section 7 (green block)
      content: [
        { title: '**🌍 La Visión de las "Emisiones Netas Cero"**', content: "**¿Qué significan las Emisiones Netas Cero?**\n\nPiensa en las emisiones netas cero como equilibrar una balanza.\n\nNo significa que no volvamos a producir emisiones de carbono nunca más.\n\nSignifica que:\n\n**No añadimos dióxido de carbono adicional a la atmósfera en total.**\n\nEn otras palabras, cualquier CO₂ que emitamos se equilibra con el CO₂ que eliminamos de la atmósfera." }, // 0: text
        { title: '**🛁 Volviendo a nuestra metáfora del Fregadero**', content: "Recuerda, imagina que la atmósfera es un gran fregadero (tus \"existencias\" de CO₂).\n\n- El agua que entra = **emisiones de CO₂**\n- El agua que drena = **eliminaciones de CO₂**\n\n**Neto cero** es cuando el agua entra a la misma velocidad que sale, por lo que el nivel del agua deja de subir.\n\nEso significa que la concentración de CO₂ en la atmósfera se nivela en lugar de aumentar." }, // 1: text
        { title: '**🧩 Cómo llegamos al Neto Cero**', content: "Para llegar al neto cero, necesitamos dos grandes cosas trabajando juntas:\n\n**1️⃣ Reducir las emisiones tanto como sea posible**\n\nEsto significa:\n- Más energía renovable\n- Eficiencia energética\n- Transporte más limpio\n- Mejores edificios\n- Abandonar los combustibles fósiles\n\n*Reducir lo que entra en la bañera.*\n\n**2️⃣ Aumentar las eliminaciones de CO₂**\n\nEsto significa:\n- Proteger los bosques\n- Volver a plantar bosques (reforestación)\n- Suelos más sanos\n- Tecnología que extrae CO₂ del aire\n\n*Acelerar el desagüe.*" }, // 2: text
        { title: '**🏁 Por qué importa el Neto Cero**', content: '' }, // 3: text
        { alt: 'Neto cero = emisiones – eliminaciones = 0' }, // 4: image
        { content: "Los científicos dicen que necesitamos alcanzar el neto cero global alrededor de 2050 para ayudar a limitar el calentamiento a 1,5 °C.\n\n¿Por qué? Porque el CO₂ que ya está en la atmósfera sigue calentando la Tierra — así que tenemos que dejar de añadir más.\n\nEl neto cero es básicamente la humanidad diciendo: **\"Ya hemos terminado de aumentar el nivel de CO₂ en la atmósfera\".**\n\nNo es la perfección. Es el equilibrio.\n\nY es uno de los objetivos más importantes para mantener el cambio climático futuro bajo control." }, // 5: text
        { title: '**💭 Reflexionemos**', content: 'Tómate un momento para pensar en lo que has aprendido en este módulo.' }, // 6: text
        { prompt: '¿Qué te ha parecido más interesante o difícil de la idea del neto cero? ¿Qué pregunta te queda sobre este tema?' } // 7: reflection
      ]
    },
    {
      // Section 8 (amber block)
      content: [
        {
          alt: '"La esperanza como existencia" — una cita de Krista Tippett con una ilustración de manos sosteniendo un globo en forma de corazón con hojas.'
        },
        {
          content: 'Aunque a veces puedas sentirte pesimista o con incertidumbre, creemos que cultivar una esperanza con los pies en la tierra es una capacidad esencial. Te invitamos a escuchar esta **breve meditación guiada**, que presenta la esperanza como una existencia: algo que podemos volver a llenar intencionalmente, incluso frente a grandes desafíos globales.'
        },
        {
          title: '**🌎 Meditación Guiada: Cultivar Esperanza Climática**'
        }
      ]
    }
  ],
  components: {
    exercise: {
      title: 'Prueba tus Predicciones: Simulación del Precio al Carbono',
      carbonPrice: 'Precio al Carbono',
      statusQuo: 'statu quo',
      low: 'bajo',
      medium: 'medio',
      high: 'alto',
      veryHigh: 'muy alto',
      temperatureTitle: 'Aumento de\ntemperatura\npara 2100',
      openFullscreen: 'Abrir en Pantalla Completa',
      closeFullscreen: 'Cerrar Pantalla Completa',
      loadingModel: 'Cargando modelo En-ROADS...',
      failedToLoad: 'Error al cargar el modelo En-ROADS.',
      baseline: 'LÍNEA DE BASE',
      currentScenario: 'ESCENARIO ACTUAL'
    },
    removals: {
      title: '⚙️ Crea un Modelo: Precio al Carbono + Eliminación de CO₂',
      carbonPrice: 'Precio al Carbono',
      natureBasedRemovals: 'Eliminación Natural',
      technologicalRemovals: 'Eliminación Tecnológica',
      emissionsAndRemovalsTitle: 'Emisiones y eliminación de CO₂',
      concentrationTitle: 'Concentración de CO₂',
      emissions: 'CO₂ EMISSIONS',
      removals: 'ELIMINACIÓN DE CO₂'
    },
    groupingFilters: {
      drawYourOwn: 'dibuja tus propios existencia y flujo',
      step: 'paso',
      reflect: "reflexionemos",
      whatAreRemovals: '¿qué es la eliminación de co2?',
      naturalRemovals: 'la eliminación natural de co2 incluye',
      technologicalRemovals: 'la eliminación tecnológica de co2 incluye',
      netRemovals: 'por qué hablamos de eliminaciones de co2 "netas"',
      co2Removal: 'eliminación de co2'
    }
  }
};
