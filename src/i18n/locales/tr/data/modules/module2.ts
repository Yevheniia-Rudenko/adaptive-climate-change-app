export const module2 = {
  title: 'Stoklar ve Akış',
  sections: [
    {
      // Section 1 (teal block)
      content: [
        { label: 'Sözlüğü Aç' }, // 0: button
        { title: '**Bu Modül Hakkında**', content: 'Bazı şeyler yavaşça birikir ve bu her şeyi değiştirir.' }, // 1: text
        { alt: 'Bir musluğun bir su tankını doldurduğu, musluktan gelen giriş akışını (Inflow) ve alttan boşalan çıkış akışını (Outflow) gösteren küvet modeli diyagramı.' }, // 2: image
        { title: '', content: 'Bir **lavabon** olduğunu hayal et.\n\n- **Lavaboda zaten bulunan su**, **stoktur** (stock).\n- **Musluktan giren su**, bir **akıştır** (flow).\n- **Giderden çıkan su**, başka bir **akıştır** (flow).\n\n Stokun büyüklüğü (lavaboda ne kadar su olduğu), akışlara (suyun ne kadar hızlı girip çıktığına) bağlıdır.\n\nYa musluktan gelen su giderden hızlıysa?\n➡️ Lavabo dolar.\n\nYa gider, musluktan gelen sudan hızlıysa?\n➡️ Lavabo boşalır.\n\nYa ikisi eşitse?\n➡️ Su seviyesi aynı kalır.' }, // 3: text
        { title: '**Temel Kavramlar**', content: '' }, // 5: text
        { // 6: flip-cards
          cards: [
            {
              frontTitle: 'Stoklar',
              frontDescription: 'Zamanla biriken şey',
              backTitle: 'Tanım',
              backDescription: 'Stok, zamanla artabilen ya da azalabilen bir sistem unsurudur; lavabodaki su, birikim hesabındaki para veya atmosferdeki karbon gibi.'
            },
            {
              frontTitle: 'Giriş akışı',
              frontDescription: 'Stoku artıran şey',
              backTitle: 'Tanım',
              backDescription: 'Giriş akışı, stoğa eklenen her şeydir; lavaboya akan su, banka hesabına giren yeni para veya atmosfere salınan karbon gibi.'
            },
            {
              frontTitle: 'Çıkış akışı',
              frontDescription: 'Stoku azaltan şey',
              backTitle: 'Tanım',
              backDescription: 'Çıkış akışı, stoktan eksilen her şeydir; lavabodan boşalan su, banka hesabından harcanan para veya atmosferden uzaklaştırılan karbon gibi.'
            }
          ]
        },
        { title: '**Sistemlerin nasıl davrandığına dair sezgini test edelim.**', content: '' }, // 7: text (quiz intro)
        {
          items: [
            {
              statement: 'Emisyonların artması durursa, atmosferdeki CO₂ seviyeleri de yükselmeyi durdurur.',
              explanation: 'Emisyonlar sabit kalsa bile CO₂ birikmeye devam eder; çünkü içeri giren miktar, çıkan miktardan hâlâ fazladır.'
            },
            {
              statement: 'Atmosferik seviyelerin düşmesi için CO₂ emisyonlarının giderimlerden düşük olması gerekir.',
              explanation: 'Ancak giderimler (karbon çekilimi) emisyonları aştığında toplam yoğunluk azalır.'
            }
          ]
        }, // 8: true-or-myth
        { title: '**🛁 Kendi Stok ve Akışını Çiz**', content: '"Stoklar ve Akışlar"ın nasıl çalıştığını keşfetmek için kişisel bir örnekle başlayalım. Senin için önemli olan bir stok örneği seç.' }, // 9: text
        { title: '', content: '**Birinci Adım:** Aşağıdaki görseldeki gibi bir Stok ve Akış diyagramı çiz.\n\n*Stok ve Akışı çizmek için kâğıt ve kalem gerekir. İstersen bu Stok ve Akış çalışma kâğıdını indirip yazdırabilirsin.*' }, // 10: text
        { alt: 'Bir musluğun su tankını doldurduğu küvet modeli diyagramı.' }, // 9: image
        { title: '', content: '**İkinci Adım:** Senin için önemli bir stok seç. İçine giren ya da çıkan şeylere bağlı olarak artıp azalabilen bir şey düşün. "Stok" örnekleri şöyle olabilir:\n\n- İyi oluş düzeyim\n- Param\n- Akademik motivasyon düzeyim\n- İlişkilerimde hissettiğim güven düzeyi\n- Olumlu bir geleceğe dair sahip olduğum umut düzeyi' }, // 10: text
        { title: '', content: '**Üçüncü Adım:** Seçtiğin stok örneği için giriş akışlarını çiz. Stokunu ne ekliyor ya da dolduruyor? En az üç giriş akışı belirlemeye çalış.' }, // 11: text
        { title: '', content: '**Dördüncü Adım:** Çıkış akışlarını çiz. Stokunu ne tüketiyor ya da azaltıyor? Unutma, bu giriş ve çıkış akışları stokunu zaman içinde değiştiren etkenleri anlatır. En az 3 çıkış akışı belirlemeye çalış.' }, // 12: text
        { title: '', content: '**Beşinci Adım:** Diyagramını bir arkadaşınla veya küçük bir grupla paylaş.' }, // 13: text
        { title: '**💭 Birlikte düşünelim**', content: '' }, // 14: text
        { prompt: 'Stok ve Akış modelinde neler oldu? Bu modeli keşfederken seçtiğin stok hakkında ne fark ettin veya ne merak ettin? Seni şaşırtan bir şey oldu mu?' } // 15: reflection
      ]
    },
    {
      // Section 2 (amber block)
      content: [
        { title: '**🌍 Bunun İklim Değişikliği İçin Önemi**', content: '"Stoklar ve akışlar" fikri, küveti dolduran su gibi basit bir şeyden söz ederken çok açık görünebilir. Ancak aynı fikri iklim değişikliğini anlamak için kullandığımızda işler biraz daha karmaşıklaşabilir.\n\nYine de stok ve akış modeli, iklim değişikliğini yönlendiren temel kuvvetleri anlamak için **gerçekten yararlıdır**.\n\nÖnce En-ROADS\'ta bazı simülasyonlar yaparak bugün iklim değişikliğine neyin yol açtığına bakacağız.\n\nSonrasında simülasyonlarda gördüklerimizi stok ve akış fikriyle bağlayacağız ki bütün resim daha anlaşılır olsun.' }, // 0: text
        { title: '**Bir Tahminde Bulunalım**', content: 'Ama En-ROADS\'a dalmadan önce birkaç tahmin yapalım.\n\nŞunlar arasındaki ilişkiyi düşün:\n- CO2 emisyonları (atmosfere eklediğimiz)\n- CO2 yoğunluğu (orada kalan miktar)\n- CO2 giderimi (atmosferden uzaklaştırılan miktar)\n\nBunlar iklim sisteminin en önemli parçalarından üçü — o yüzden modeli keşfetmeden önce ne düşündüğüne bakalım.\n\nŞimdi küresel CO₂ emisyonlarını azaltmaya çalışırsak ne olabileceğini düşünelim. Her senaryo için en iyi tahminini yap:' }, // 1: text
        { question: '**Senaryo 1. Artışı Durdurmak**\nToplam CO₂ emisyonlarımız yükselmeyi bırakıp sabit kalırsa ve CO₂ giderimlerimiz aynı kalırsa, atmosferde zaten bulunan CO₂ miktarına sence ne olur?', options: ['Artar', 'Dengelenir', 'Azalır'] }, // 2: poll
        { question: '**Senaryo 2. Emisyonları Azaltmak**\nToplam CO₂ emisyonlarımız çok düşer ve bugüne kıyasla çok daha aşağı iner, CO₂ giderimlerimiz ise aynı kalırsa, atmosferdeki CO₂ yoğunluğuna sence ne olur?', options: ['Artar', 'Dengelenir', 'Azalır'] } // 3: poll
      ]
    },
    {
      // Section 3 (purple block)
      content: [
        { title: '**Tahminlerini test edelim!**', content: 'Bu etkinlikte, bu iki senaryoyu simüle etmek için **[En-ROADS](/module/1?block=2&section=what-if)** kullanacaksın.\n\nÖnceki modülde öğrendiğimiz gibi, **karbon fiyatı** küresel CO₂ emisyonlarımızı hızlıca azaltmada en güçlü ve etkisi yüksek iklim politikalarından biridir.\n\nEmisyonlardaki değişimin atmosferdeki CO₂ yoğunluğunu nasıl etkilediğini görmek için karbon fiyatı kaydırıcısını ayarla.' }, // 0: text
        {}, // 1: module2-exercise
        { title: '**💭 Birlikte düşünelim**', content: 'Simülasyonda az önce gözlemlediğin şeyleri düşünmek için bir an dur.' }, // 2: text
        { prompt: 'Ne fark ettin? Beklentilerin sonuçla örtüştü mü? Bunun neden böyle bir sonuç verdiğini düşünüyorsun?' } // 3: reflection
      ]
    },
    {
      // Section 4 (pink block)
      content: [
        { title: '**CO₂ Giderimini Anlamak**', content: 'Şimdi simülasyonumuza **iki yeni kaydırıcı daha** ekleyeceğiz. Bu kontroller, CO₂\'yi atmosferden **uzaklaştırmanın farklı yollarını** temsil eder — ve bunun zaman içinde toplam CO₂ yoğunluğunu nasıl değiştirdiğini göreceğiz.' }, // 0: text
        { title: '**🌱 CO₂ giderimi nedir?**', content: 'CO₂ giderimleri, karbondioksiti havadan çekip başka bir yerde depolayan doğal veya teknolojik süreçlerdir.\n\nCO₂\'yi çıkış akışı gibi düşün.' }, // 1: text
        { title: '**Doğal CO₂ giderimi şunları içerir:**', content: '- Büyürken CO₂ emen ağaçlar ve bitkiler\n- Ölü bitki materyalinden karbon depolayan toprak\n- Havadan CO₂ emen okyanuslar (ne yazık ki bu aynı zamanda suyu asitleştirir)' }, // 2: text
        { alt: 'Doğal CO₂ giderim süreçleri' }, // 3: image
        { title: '**Teknolojik CO₂ giderimi şunları içerir:**', content: '- Doğrudan Hava Yakalama (DACCS): CO₂\'yi havadan çekip yerin derinlerinde kayalarda depolayan makineler\n- Geliştirilmiş mineralizasyon: Özel kaya türlerini toprağa yayarak CO₂\'yi doğal süreçten daha hızlı emmesini sağlama' }, // 4: text
        { alt: 'Teknolojik CO₂ giderim süreçleri' }, // 5: image
        { title: '**🌳 Neden "net" CO₂ gideriminden söz ederiz**', content: 'CO₂ giderilse bile bir kısmı tekrar atmosfere **geri sızabilir**.\nBu şu nedenlerle olabilir:\n\n- Orman yangınları\n- Ağaç kesimi\n- Tarım\n- Toprak değişimleri\n\nBu nedenle yalnızca "CO₂ giderimi" yerine **net CO₂ giderimi** terimini kullanırız; bu şu anlama gelir:\n\n **Atmosferden çekilen toplam CO₂** *-* **yeniden atmosfere dönen toplam CO₂**\n\nBöylece gerçekte ne olup bittiğine dair daha doğru bir resim elde ederiz.' } // 6: text
      ]
    },
    {
      // Section 5 (teal block)
      content: [
        { title: '**🎛️ Simülasyonda bu nasıl çalışır**', content: 'Tarım arazilerinin bir kısmında yeniden ağaçlandırmayı teşvik etmek veya teknolojik karbon giderimine yatırım yapmak gibi politikalarla atmosferden ne kadar CO₂ çekileceğini değiştirebiliriz.\n\nAşağıdaki iki yeni En-ROADS kontrolü şunları artırmana imkân verir:\n\n- **Doğa temelli CO₂ giderimi** (yeniden ağaçlandırma gibi)\n- **Teknolojik CO₂ giderimi** (doğrudan hava yakalama gibi)\n\nBu kontrolleri ayarladığında "**CO₂ Emisyonları ve Giderimleri**" adlı yeni bir grafik göreceksin.\n\nBu grafikte şunlar görünür:\n- Emisyonlar (eklediğimiz: "giriş akışı")\n- Giderimler (çıkardığımız: "çıkış akışı")\n\nVe daha önce olduğu gibi, atmosferdeki toplam "stok"un nasıl değiştiğini görmek için **CO₂ yoğunluğu grafiğini** görmeye devam edersin.' }, // 0: text
        { title: '**🧠 Tahmin edelim**', content: 'Kaydırıcıları hareket ettirmeden önce tahminini yap:' }, // 1: text
        { question: 'Atmosferdeki CO₂ yoğunluğu sence ne zaman düşmeye başlayacak?', options: ['CO₂ emisyonları CO₂ giderimlerinden büyük olduğunda', 'CO₂ emisyonları CO₂ giderimlerine eşit olduğunda', 'CO₂ emisyonları CO₂ giderimlerinden küçük olduğunda'] }, // 2: poll
        { title: '**⚙️ Bir Model Oluştur**', content: '' }, // 3: text
        {}, // 4: module2-removals
        { title: '**💭 Birlikte düşünelim**', content: 'Simülasyonda az önce gözlemlediğin şeyleri düşünmek için bir an dur.' }, // 5: text
        { prompt: 'Ne fark ettin? Beklentilerin sonuçla örtüştü mü? Bunun neden böyle bir sonuç verdiğini düşünüyorsun?' } // 6: reflection
      ]
    },
    {
      // Section 6 (blue block)
      content: [
        { title: '**🌍 Bunun İklim Değişikliği İçin Önemi**', content: '' }, // 0: text
        { content: 'Stoklar ve Akışları hatırla. Karbondioksiti (CO₂) de aynı şekilde düşün.\n- **Atmosfer** lavabo gibidir — bu **stoktur**.\n- Fosil yakıt yakmak (arabalar, fabrikalar vb.) musluktan gelen su gibidir — bu CO₂ ekleyen bir **giriş akışıdır**.\n- Ağaçların ve okyanusların CO₂ emmesi gider gibidir — bu CO₂ çıkaran bir **çıkış akışıdır**.\n\nŞu anda **musluk sonuna kadar açık** ve **gider yavaş**, bu yüzden CO₂ "lavabosu" yükselmeye devam ediyor.\n\nMusluğu biraz kıssak bile, gider aynı hızda değilse lavabo **dolmaya devam eder**.\n\nBu, iklim değişikliğine neden olan emisyonları azaltmanın neden zor olduğunu açıklar:\n\nCO₂ seviyesinin yükselmeyi bırakması için girişlerin ve çıkışların dengelenmesi gerekir.\n\n"Stoklar ve akışları" anlamak, iklim değişikliğinin yalnızca daha az fosil yakıt kullanmakla ilgili olmadığını; atmosferik "lavaboyu" taşırmayı bırakacak şekilde tüm sistemi dönüştürmekle ilgili olduğunu görmene yardımcı olur.\n\nBu sadece tek bir iyi eylem meselesi değildir.\n\nTüm kolektif eylemlerimizin zaman içinde **toplam miktarı** nasıl etkilediğiyle ilgilidir.' } // 2: text
      ]
    },
    {
      // Section 7 (green block)
      content: [
        { title: '**🌍 "Net Sıfır Emisyon" Vizyonu**', content: '**Net Sıfır Emisyon ne demektir?**\n\nNet sıfır emisyonu, bir teraziyi dengelemek gibi düşün.\n\nBu, bir daha hiç karbon emisyonu üretmeyeceğimiz anlamına gelmez.\n\nAnlamı şudur:\n\n**Toplamda atmosfere ek karbon dioksit eklemeyiz.**\n\nYani saldığımız her CO₂, atmosferden uzaklaştırdığımız CO₂ ile dengelenir.' }, // 0: text
        { title: '**🛁 Lavabo benzetimine geri dönelim**', content: 'Unutma, atmosferi büyük bir lavabo (CO₂ "stokun") olarak hayal et.\n\n- İçeri giren su = **CO₂ emisyonları**\n- Giderden akan su = **CO₂ giderimleri**\n\n**Net sıfır**, suyun giriş hızının çıkış hızına eşit olduğu andır; böylece su seviyesi artık yükselmez.\n\nBu da atmosferdeki CO₂ yoğunluğunun artmak yerine dengelenmesi anlamına gelir.' }, // 1: text
        { title: '**🧩 Net Sıfıra Nasıl Ulaşırız**', content: 'Net sıfıra ulaşmak için birlikte çalışan iki büyük şeye ihtiyacımız var:\n\n**1️⃣ Emisyonları olabildiğince azaltmak**\n\nBu şunları içerir:\n- Daha fazla yenilenebilir enerji\n- Enerji verimliliği\n- Daha temiz ulaşım\n- Daha iyi binalar\n- Fosil yakıtlardan çıkış\n\n*Küvete giren suyu azaltmak.*\n\n**2️⃣ CO₂ giderimlerini artırmak**\n\nBu şunları içerir:\n- Ormanları korumak\n- Yeniden ormanlaştırma\n- Daha sağlıklı topraklar\n- Havadan CO₂ çeken teknoloji\n\n*Gideri hızlandırmak.*' }, // 2: text
        { title: '**🏁 Net Sıfır neden önemlidir**', content: '' }, // 3: text
        { alt: 'net sıfır = emisyonlar – giderimler = 0' }, // 4: image
        { content: 'Bilim insanları, ısınmayı 1,5 °C ile sınırlamaya yardımcı olmak için küresel net sıfıra yaklaşık 2050 civarında ulaşmamız gerektiğini söylüyor.\n\nNeden? Çünkü atmosferde zaten bulunan CO₂ Dünya\'yı ısıtmaya devam ediyor — bu yüzden daha fazlasını eklemeyi bırakmalıyız.\n\nNet sıfır aslında insanlığın şunu söylemesidir: **"Atmosferdeki CO₂ seviyesini artırmayı bıraktık."**\n\nBu mükemmellik değildir. Dengededir.\n\nVe gelecekteki iklim değişikliğini kontrol altında tutmanın en önemli hedeflerinden biridir.' }, // 5: text
        { title: '**💭 Birlikte düşünelim**', content: 'Bu modülde öğrendiklerin üzerine düşünmek için bir an dur.' }, // 6: text
        { prompt: 'Net sıfır fikrinin en ilginç veya en zor gelen yönü neydi? Bu konuda aklında hangi soru kaldı?' } // 7: reflection
      ]
    },
    {
      // Section 8 (amber block)
      content: [
        {
          alt: 'Krista Tippett\'ten “Stok olarak umut” sözü; kalp şeklinde dünya tutan eller çizimiyle.'
        },
        {
          content: 'Bazen karamsar veya belirsiz hissedebilirsin; yine de ayakları yere basan umudu geliştirmeyi temel bir kapasite olarak görüyoruz. Seni, umudu bir stok olarak ele alan — büyük küresel zorluklar karşısında bile bilinçli olarak yeniden doldurabileceğimiz bir şey olarak gören — bu **kısa rehberli meditasyonu** dinlemeye davet ediyoruz.'
        },
        {
          title: '**🌎 Rehberli Meditasyon: İklim Umudunu Beslemek**'
        }
      ]
    }
  ],
  components: {
    exercise: {
      title: 'Tahminlerini Test Et: Karbon Fiyatı Simülasyonu',
      carbonPrice: 'Karbon Fiyatı',
      statusQuo: 'mevcut durum',
      low: 'düşük',
      medium: 'orta',
      high: 'yüksek',
      veryHigh: 'çok yüksek',
      temperatureTitle: '2100 için\nsıcaklık\nartışı',
      openFullscreen: 'Tam Ekran Aç',
      closeFullscreen: 'Tam Ekranı Kapat',
      loadingModel: 'En-ROADS modeli yükleniyor...',
      failedToLoad: 'En-ROADS modeli yüklenemedi.',
      baseline: 'TEMEL SENARYO',
      currentScenario: 'MEVCUT SENARYO'
    },
    removals: {
      title: '⚙️ Bir Model Oluştur: Karbon Fiyatı + CO₂ Giderimi',
      carbonPrice: 'Karbon Fiyatı',
      natureBasedRemovals: 'Doğa Temelli Giderim',
      technologicalRemovals: 'Teknolojik Giderim',
      emissionsAndRemovalsTitle: 'CO₂ emisyonları ve giderimi',
      concentrationTitle: 'CO₂ yoğunluğu',
      emissions: 'CO₂ EMİSYONLARI',
      removals: 'CO₂ GİDERİMİ'
    },
    groupingFilters: {
      drawYourOwn: 'kendi stok ve akışını çiz',
      step: 'adım',
      reflect: 'birlikte düşünelim',
      whatAreRemovals: 'co2 giderimi nedir?',
      naturalRemovals: 'doğal co2 giderimi şunları içerir',
      technologicalRemovals: 'teknolojik co2 giderimi şunları içerir',
      netRemovals: 'neden "net" co2 gideriminden söz ediyoruz',
      co2Removal: 'co2 giderimi'
    }
  }
};
