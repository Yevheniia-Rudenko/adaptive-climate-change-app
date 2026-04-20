export const module3 = {
  title: 'Olası Geleceklere Yol Haritası',
  sections: [
    {
      content: [
        { label: 'Sözlüğü Aç' },
        {
          title: '**Bu modül hakkında**',
          content: 'Şimdiye kadar yüksek etkili çeşitli iklim çözümlerini inceledik: net emisyonları önemli ölçüde azaltabilen ve küresel sıcaklık artışını yavaşlatabilen politika ve eylemler.\n\n Şimdi önemli bir soru soracağız:'
        },
        {},
        {
          title: '**Çözümleri birleştirdiğimizde ne olur?**',
          content: 'Karbon fiyatı gibi bazı yüksek etkili politikalar emisyonları azaltmada son derece etkilidir. Ancak her şeyin bağlı olduğu bir sistemde, her çözümün hem olumlu hem olumsuz sonuçları vardır.\n\n Bu modülde, farklı iklim politikalarının doğurabileceği etik, ekolojik ve ekonomik etkileri daha yakından inceleyeceğiz.'
        },
        {
          title: '**Çözümleri, yaratabilecekleri etkileri görmezden gelmeden nasıl dikkatle keşfedebiliriz?**',
          content: 'Sistem bilimci veya politika yapıcı gibi düşünmene yardımcı olmak için, emisyonları azaltan ve gerçek dünyadaki dengelemeleri dikkate alan kendi iklim politika senaryonu tasarlamak üzere En-ROADS\'un tam simülatörünü kullanacaksın.'
        }
      ]
    },
    {
      content: [
        { alt: 'Beyaz bulutların altında denizde büyük yük gemileri' },
        {
          title: '**Grup etkinliği**',
          content: '1. ve 2. modülde karbon fiyatlandırmasının emisyonları azaltmanın en hızlı ve güçlü yollarından biri olduğunu gördük.\n\n Ancak karbon fiyatının tek etkisi emisyonları düşürmek değildir.'
        },
        {
          content: 'Tüm iklim politikaları şu ikisini birlikte üretir:\n\n• **Olumlu yan etkiler** (bazen çoklu çözümleme denir)\n   - Örnek: halk sağlığını iyileştirmek veya uzun vadede para tasarrufu\n\n• **İstenmeyen olumsuz etkiler**, genellikle düşük gelirli kişileri daha fazla etkiler'
        },
        {
          content: 'Eşitlik perspektifi, çözümlerin herkes için adil olabilmesi adına bu olumsuz etkileri azaltmamıza veya önlememize yardımcı olur.'
        },
        { title: '**Bireysel ya da küçük grup beyin fırtınası:**', content: '' },
        {},
        {
          content: '**1. Karbon fiyatının hangi olumlu yan etkileri olabilir?**\n(Sağlık, ulaşım, istihdam, hava kalitesi vb. düşün)\n\n**2. Hangi olası zararları doğurabilir?**\nBu zararlar farklı topluluklarda nasıl görünebilir?\n\n**3. Bu zararları nasıl azaltabilir veya önleyebiliriz?**\n(İpucu: kamu desteği, iade mekanizmaları, yatırımlar, eşitlik politikaları)'
        },
        { title: '**Birlikte düşünelim**', content: '' },
        { prompt: 'Karbon fiyatının hangi faydalı etkileri olabilir?' },
        { prompt: 'Hangi zararlı etkileri olabilir?' }
      ]
    },
    {
      content: [
        {
          title: '**En-ROADS\'ta senaryoyu keşfet**',
          content: 'Şimdi karbon fiyatı kaydırıcısını deneyimleyebilecek ve bu politikanın iki önemli yan etkiyi nasıl etkilediğini görebileceksin.\n\nKarbon fiyatının, sera gazı emisyonlarına vergi ya da ceza biçiminde uygulanan bir maliyet olduğunu hatırlayabilirsin. Karbon fiyatı belirlemek, kirletenleri fosil yakıt yakımını azaltmaya finansal olarak teşvik ederek hükümetlerin iklim değişikliğini azaltmasına yardımcı olabilir; bu da iklim değişikliğinin başlıca etkenlerinden biridir.'
        },
        { alt: 'Kahire\'de hava kirliliği' },
        {
          title: '**1. Hava kirliliği**',
          content: 'Her yıl havaya salınan zararlı parçacık miktarı olarak ölçülür.\n Uzun süreli hava kirliliği maruziyeti şu riskleri artırır:\n\n• Astım\n• Kalp hastalığı\n• İnme\n• Kronik obstrüktif akciğer hastalığı (KOAH)\n• Akciğer kanseri\n• Demans\n\n Daha temiz hava çoğu zaman **daha sağlıklı topluluklar** demektir.'
        },
        { alt: 'Kahire\'de benzin doldurma' },
        {
          title: '**2. Tüketiciler için ortalama enerji fiyatı**',
          content: 'Bu grafik, günlük yaşam için ortalama enerji maliyetini gösterir; şunları içerir:\n\n• Elektrik\n• Gaz\n• Hidrojen\n\nBu çizgi yükseldiğinde, enerji faturaları **herkes için pahalanır**; bu da ekonominin zaten baskı altında olduğu topluluklarda eşitlik kaygıları yaratabilir.'
        },
        {
          title: '**Bir tahminde bulunalım**',
          content: 'En-ROADS modelini kullanmadan önce tahminlerini yapmak için bir an ayır.'
        },
        {
          prompt: 'Karbon fiyatı arttıkça enerji fiyatı ve hava kirliliğinde ne olacağını düşünüyorsun?'
        },
        { title: '**Bir model oluştur**', content: '' },
        {},
        { title: '**Birlikte düşünelim**', content: '' },
        {
          prompt: 'Karbon fiyatı modelinde ne fark ettin?\n\nKarbon fiyatını ayarladığında sıcaklık, hava kirliliği ve enerji fiyatlarının nasıl değiştiğini açıkla.'
        },
        {
          prompt: 'Bunu eşitlik perspektifinden düşündüğünde, bu senaryo farklı insanlar için ne anlama gelebilir? Bu politikadan en çok kim etkilenir sence? Neden?\n\nKimin fayda gördüğünü ve kimin zorluk yaşayabileceğini düşün. Gelir düzeylerini, toplulukları, sektörleri veya bölgeleri değerlendir.'
        }
      ]
    },
    {
      content: [
        {
          title: '**Dengelemeleri anlamak**',
          transcript: 'Artık biliyoruz ki karbon fiyatı, atmosfere karbon salmayı daha maliyetli hale getirir. Bir enerji kaynağı, ürettiği her enerji birimi başına daha fazla CO2 salıyorsa karbon fiyatı altında daha pahalı olur. Bu durumda daha az karbon salan kaynaklar daha ucuz kalır.\nFosil yakıtlar arasında kömür, enerji birimi başına en fazla CO2 üretir ve en kötü hava kirliliğine neden olur. Bu, karbon fiyatı yükseldikçe kömürün daha temiz seçeneklere göre çok daha pahalı hâle geldiği anlamına gelir. Sonuç olarak insanlar ve şirketler kömürü çok daha az kullanır.\nKömür kullanımı azaldığında hava kirliliği de azalır — hem de ciddi ölçüde.\n\n\nBu, çok önemli bir olumlu yan etkidir. Daha az kömür; daha temiz hava, daha az solunum sorunu, daha sağlıklı topluluklar ve daha düşük sağlık maliyetleri demektir.\nAma bir dengeleme de vardır.\nModelde muhtemelen enerji ortalama fiyatının karbon fiyatı arttıkça yükseldiğini fark ettin. Bunun nedeni şirketlerin artan maliyetlerini tüketicilere yansıtmasıdır.\nVe işte bu yüzden önemlidir:\nÇoğu hane için — özellikle düşük gelirli haneler için — enerji temel ve kaçınılmaz bir giderdir. İnsanlar elektriği ya da ısıtmayı bırakıp kullanmama lüksüne sahip değildir. Bu yüzden fiyatlar yükseldiğinde, daha az kaynağı olan topluluklar bunu daha sert hisseder.\nAyrıca enerji fiyatlarının yaklaşık 2037 civarında zirve yaptığını görmüş olabilirsin. Bu, karbon fiyatının yaklaşık on yıl boyunca kademeli yükselmenin ardından en yüksek seviyesine ulaştığı andır.\nBir hükümet karbon fiyatına toplumsal destek istiyorsa, enerji maliyetlerindeki artıştan en çok etkilenecek kişileri nasıl koruyacağını dikkatle planlamalıdır.'
        },
        {
          title: '**❓Bu dengelemeleri dengeleyebilir miyiz? :**',
          content: '**Durumu dengelemeye hangi politikalar yardımcı olabilir?**\nKarbon fiyatı hükümete ek gelir sağlıyorsa, bu para şunlar için nasıl kullanılabilir:\n\n• Düşük gelirli ailelerin enerji faturalarını düşürmek?\n• İnsanların temiz enerjiye geçişini desteklemek?\n• Politikanın herkes için adil algılanmasını sağlamak?\n\nDüşünme görevin bu.'
        },
        { title: '**Birlikte düşünelim**', content: '' },
        {
          prompt: 'Bu hedefe ulaşmaya hangi hükümet veya topluluk politikaları/çabaları yardımcı olabilir? Her düzeyi düşün: yerel, eyalet/il, ulusal, bölgesel veya küresel.'
        }
      ]
    },
    {
      content: [
        { title: '**En-ROADS\'ta kendi iklim politika senaryonu oluştur**', content: '' },
        {
          title: '**✏️ Şimdi sıra sende: bir iklim geleceği tasarla!**',
          content: 'Kurmak istediğin **dünya türünü yansıtan** bir senaryo oluşturmak için En-ROADS\'un tam iklim politika simülatörünü kullanacaksın.\n\nKontrollerle oynarken bu üç hedefi **aynı anda** karşılamaya çalış:'
        },
        {
          title: '**Görevin**',
          content: '\n**1- Küresel ısınmayı 2°C\'nin altında tut** \n(Bunu En-ROADS\'un ana sıcaklık grafiğinde göreceksin.)\n\n **2- Eşitsizliği azalt** \n (Hangi politikaların adil olduğunu, kime yardımcı olduğunu ve kimi zorlayabileceğini düşün.) \n\n **3- Maliyet ve adaleti dengele**\n (Enerji fiyatlarını, ekonomik etkileri ve geçişten en çok etkilenen toplulukların nasıl destekleneceğini değerlendir.)**'
        },
        {
          title: '**Görevinin adımı**',
          content: 'Bu hedefleri karşılayan bir senaryo kurmak için kontrollerden dilediğini kullan.\n\n Tek bir “doğru cevap” yoktur; ancak analiz etmen gereken dengelemeler vardır.'
        },
        {
          title: '**Bitirdiğinde:**',
          content: 'En-ROADS\'ta işin bittiğinde “Share Your Scenario”ya tıkla, bağlantıyı kopyala ve modülü tamamlamak için **buraya geri dön**.'
        },
        { alt: 'En-ROADS senaryo ekran görüntüsü' },
        { label: 'Şimdi En-ROADS\'ta oluştur!' }
      ]
    },
    {
      content: [
        { title: '**👋 Yeniden hoş geldin!**', content: 'En-ROADS deneyimin nasıl geçti? Deneyimini duymak isteriz.' },
        { title: '**Senaryonu paylaş**', content: '' },
        { prompt: 'En-ROADS senaryo bağlantını buraya yapıştır:' },
        { alt: 'Senaryo paylaşımı görseli', title: 'İpucu: “Share Your Scenario” bağlantısını En-ROADS\'un sağ üst köşesinde bulabilirsin.' },
        { title: '**Birlikte düşünelim:**', content: '' },
        { prompt: '• Hangi politikaları seçtin ve neden? \n • Senaryon ısınmayı 2°C\'nin altında nasıl tuttu? \n • Eşitsizlikleri azaltmak veya kırılgan toplulukları korumak için hangi kararları aldın? \n • Adalet ve maliyet üzerine nasıl düşündün? \n • Senaryonu tasarlarken seni ne şaşırttı?' }
      ]
    },
    {
      content: [
        { title: '**Geleceği hayal etmek**', content: '🎉 En-ROADS ile iklim senaryoları oluşturan dünya çapında 492,000+ kişiye sen de katıldın.' },
        { title: '**Liderler En-ROADS hakkında ne söylüyor**' },
        { content: 'Paylaşılan olası geleceğimize giden birden çok yol var. Aşağıda senin gibi öğrenenlerin oluşturduğu bazı iklim geleceklerini göreceksin.' },
        {
          title: '**Senaryo anlık görüntüleri**',
          images: [
            { caption: 'Senaryo 1' },
            { caption: 'Senaryo 2' },
            { caption: 'Senaryo 3' },
            { caption: 'Senaryo 4' }
          ]
        },
        { content: 'Bu gelecek senaryolarını görmek ve kendi senaryonu oluşturmak birçok duyguyu tetikleyebilir: umuttan hayal kırıklığına, iyimserlikten umutsuzluğa.\n\n Gerekli tüm politika, iş birliği ve toplumsal değişimleri düşünmeye başlayabiliriz. \n\n Bu geleceklerin nasıl görüneceğini hayal edebilir ve o gelecekte bizim ya da topluluklarımızın ne yaptığını sorabiliriz. \n\n Durup nefes almak ve nasıl olduğumuzu kontrol etmek için bir an ayıralım.' },
        { title: 'Duygular çarkı', alt: 'Plutchik Duygular Çarkı: 8 temel duyguyu ve yoğunluk değişimlerini gösteren dairesel diyagram' },
        { content: 'Duygular çarkına geri dönelim. En-ROADS senaryonu oluştururken hangi duygular ortaya çıktı? Çok sayıda ya da birbiriyle çatışan duygular olması normaldir.' },
        { prompt: 'Nasıl hissediyorsun? Bu iklim geleceklerini düşündüğünde hangi duygular ortaya çıkıyor? Bedenine bir an dikkat et: bu duyguları nerede hissediyorsun?' }
      ]
    },
    {
      content: [
        {
          title: '🎉 Modül 3: Olası Geleceklere Yol Haritaları\'nı tamamladığın için tebrikler!',
          description: 'Sonrakine başlamadan önce, bu öğrenme deneyimi hakkındaki geri bildirimini duymak isteriz.'
        }
      ]
    }
  ],
  components: {
    carbonPriceDashboard: {
      title: 'Bir model oluştur: Karbon fiyatı',
      openFullscreen: 'Tam ekran aç',
      closeFullscreen: 'Tam ekranı kapat',
      temperatureTitle: '2100 için\nsıcaklık\nartışı',
      airPollution: 'Hava kirliliği',
      averageEnergyPrice: 'Tüketiciler için ortalama enerji fiyatı',
      carbonPrice: 'Karbon fiyatı',
      loadingModel: 'Model yükleniyor...',
      failedToLoad: 'En-ROADS modeli yüklenemedi.',
      baseline: 'TEMEL SENARYO',
      currentScenario: 'MEVCUT SENARYO'
    }
  }
};
