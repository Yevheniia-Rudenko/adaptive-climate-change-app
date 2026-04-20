export const interactiveDashboard = {
  reset: 'Temel Değere Sıfırla',
  fromBaseline: 'temel değerden',
  modules: {
    1: {
      title: 'İklim Geleceği Senaryolarını Keşfet',
      params: {
        renewableGrowth: {
          label: 'Yenilenebilir Enerji Büyümesi',
          description: 'Güneş, rüzgâr ve diğer yenilenebilirlere geçiş hızı'
        },
        deforestation: {
          label: 'Ormansızlaşma Oranı',
          description: 'Orman kaybının mevcut seviyesi'
        }
      },
      metrics: {
        temperature: '2100 için Sıcaklık',
        optimism: 'İklim İyimserliği'
      }
    },
    2: {
      title: 'Stok ve Akış Dinamikleri',
      params: {
        emissions: {
          label: 'Yıllık CO₂ Emisyonları',
          description: 'Akış: Her yıl atmosfere eklenen CO₂'
        },
        carbonSinks: {
          label: 'Doğal Karbon Yutakları',
          description: 'Akış: Ormanlar ve okyanuslarca uzaklaştırılan CO₂'
        }
      },
      metrics: {
        stock: 'Atmosferik CO₂ Stoku',
        netChange: 'Yıllık Net Değişim'
      }
    },
    3: {
      title: 'Yol Haritası Simülatörü',
      params: {
        coalPhaseout: {
          label: 'Kömürü Aşamalı Bırakma Hızı',
          description: 'Kömür kullanımını ne kadar hızlı bıraktığımız'
        },
        electrification: {
          label: 'Ulaşımın Elektrifikasyonu',
          description: 'Elektrikli araçların payı'
        },
        carbonPrice: {
          label: 'Karbon Fiyatı',
          description: 'Karbon emisyonlarına vergi'
        }
      },
      metrics: {
        warming: '2050 için Isınma',
        risk: 'Yol Haritası Risk Düzeyi'
      }
    },
    4: {
      title: 'Sistem Çözümleri Paneli',
      params: {
        renewableEnergy: {
          label: 'Yenilenebilir Enerji',
          description: 'Temiz elektrik her şeyi çalıştırır'
        },
        buildingEfficiency: {
          label: 'Bina Verimliliği',
          description: 'Daha iyi yalıtım, akıllı tasarım'
        },
        landRestoration: {
          label: 'Arazi Restorasyonu',
          description: 'Ormanlar, sulak alanlar, çayırlar'
        }
      },
      metrics: {
        impact: 'Toplam Sistem Etkisi',
        cobenefits: 'Eş-fayda Puanı'
      }
    },
    5: {
      title: 'Yüksek Etkili Müdahaleler',
      params: {
        policyStrength: {
          label: 'İklim Politikasının Gücü',
          description: 'Devlet düzenlemeleri ve teşvikler'
        },
        techInnovation: {
          label: 'Temiz Teknoloji Ar-Ge Yatırımı',
          description: 'Araştırma ve geliştirme finansmanı'
        },
        socialMovement: {
          label: 'Toplumsal Hareketin Gücü',
          description: 'Kamusal farkındalık ve aktivizm'
        }
      },
      metrics: {
        multiplier: 'Etki Çarpanı',
        speed: 'Sistemik Değişim Hızı'
      }
    }
  }
};
