export const interactiveDashboard = {
  reset: 'Auf Basislinie zurücksetzen',
  fromBaseline: 'gegenüber Basislinie',
  modules: {
    1: {
      title: 'Klimazukunftsszenarien erkunden',
      params: {
        renewableGrowth: {
          label: 'Wachstum erneuerbarer Energien',
          description: 'Geschwindigkeit des Übergangs zu Solar, Wind und anderen Erneuerbaren'
        },
        deforestation: {
          label: 'Entwaldungsrate',
          description: 'Aktuelles Ausmaß des Waldverlustes'
        }
      },
      metrics: {
        temperature: 'Temperatur bis 2100',
        optimism: 'Klimaoptimismus'
      }
    },
    2: {
      title: 'Bestand- & Fluss-Dynamik',
      params: {
        emissions: {
          label: 'Jährliche CO₂-Emissionen',
          description: 'Fluss: CO₂, das jedes Jahr in die Atmosphäre gelangt'
        },
        carbonSinks: {
          label: 'Natürliche Kohlenstoffaufnahme',
          description: 'Fluss: CO₂, das durch Wälder und Ozeane entfernt wird'
        }
      },
      metrics: {
        stock: 'Atmosphärischer CO₂-Bestand',
        netChange: 'Netto-Jahresveränderung'
      }
    },
    3: {
      title: 'Pfad-Simulator',
      params: {
        coalPhaseout: {
          label: 'Geschwindigkeit des Kohleausstiegs',
          description: 'Wie schnell wir aufhören, Kohle zu nutzen'
        },
        electrification: {
          label: 'Elektrifizierung des Verkehrs',
          description: 'Anteil der Elektrofahrzeuge'
        },
        carbonPrice: {
          label: 'CO₂-Bepreisung',
          description: 'Steuer auf CO₂-Emissionen'
        }
      },
      metrics: {
        warming: 'Erwärmung bis 2050',
        risk: 'Pfad-Risikostufe'
      }
    },
    4: {
      title: 'Systemlösungen-Dashboard',
      params: {
        renewableEnergy: {
          label: 'Erneuerbare Energie',
          description: 'Sauberer Strom versorgt alles'
        },
        buildingEfficiency: {
          label: 'Gebäude-Effizienz',
          description: 'Bessere Isolierung, intelligentes Design'
        },
        landRestoration: {
          label: 'Land-Wiederherstellung',
          description: 'Wälder, Feuchtgebiete, Grasland'
        }
      },
      metrics: {
        impact: 'Gesamte Systemwirkung',
        cobenefits: 'Score der Zusatznutzen'
      }
    },
    5: {
      title: 'Hebelstarke Interventionen',
      params: {
        policyStrength: {
          label: 'Stärke der Klimapolitik',
          description: 'Staatliche Vorschriften und Anreize'
        },
        techInnovation: {
          label: 'Investitionen in Clean-Tech-F&E',
          description: 'Forschung und Entwicklungsfinanzierung'
        },
        socialMovement: {
          label: 'Stärke der sozialen Bewegung',
          description: 'Öffentliches Bewusstsein und Aktivismus'
        }
      },
      metrics: {
        multiplier: 'Hebel-Multiplikator',
        speed: 'Geschwindigkeit des Systemwandels'
      }
    }
  }
};
