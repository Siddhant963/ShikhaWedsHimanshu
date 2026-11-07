// All wedding content below is carried over from the original invitation pages
// (legacy/index10.html + legacy/indexEnglishToHindi.html). Nothing is invented;
// story chapters remain clearly-marked placeholders, exactly as in the original.

export const WEDDING = {
  // Wedding ceremony: Friday 11 December 2026, 7:00 PM onwards (IST)
  date: '2026-12-11T19:00:00+05:30',
  mapsQuery: 'Hotel Indian Roller Jagadhari Road Ambala Cantt',
};

export const IMAGES = {
  hero: '/assets/couple-front-page.jpg',
  bride: '/assets/bride-portrait.jpg',
  groom: '/assets/groom-portrait.jpg',
  couple: '/assets/couple-portrait.jpg',
  ganesh: '/assets/ganesh-medallion.jpg',
};

const events = (en) => [
  { key: 'engagement', day: '09', weekday: en ? 'Wednesday' : 'बुधवार', icon: 'ring' },
  { key: 'mehndi', day: '10', weekday: en ? 'Thursday' : 'गुरुवार', icon: 'leaf' },
  { key: 'haldi', day: '10', weekday: en ? 'Thursday' : 'गुरुवार', icon: 'flower' },
  { key: 'wedding', day: '11', weekday: en ? 'Friday' : 'शुक्रवार', icon: 'flame' },
];

export const COPY = {
  en: {
    lang: 'en',
    title: 'Shikha & Himanshu | Wedding Invitation',
    guestDefault: 'Dear Family & Friends,',
    guest: (n) => `Dear ${n},`,
    envelope: {
      kicker: 'A wedding invitation',
      title: 'A Celebration of Love',
      invited: 'You are cordially invited',
      sub: 'to witness the beautiful beginning of',
      hint: 'Tap the envelope to open your invitation',
      aria: "Open Shikha and Himanshu's wedding invitation",
      date: '11 December 2026',
    },
    nav: { story: 'Our Story', celebrations: 'Celebrations', venue: 'Venue', gallery: 'Photos', party: 'Our People' },
    menu: 'Menu',
    close: 'Close',
    hero: {
      eyebrow: 'With the blessings of our families',
      sub: 'Two hearts, one beautiful journey',
      invite: ['Together with our families', 'we invite you to celebrate our wedding'],
      dates: '9 · 10 · 11 December 2026',
      scroll: 'Scroll',
      alt: "Illustrated couple artwork for Shikha and Himanshu's wedding invitation",
    },
    countdown: {
      eyebrow: 'Until we say “I do”',
      title: 'The Countdown Begins',
      units: { days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' },
      done: 'Today is the day. Welcome to our celebration.',
    },
    story: {
      eyebrow: 'Our Beautiful Story',
      title: 'A little love, a little destiny, and a lifetime together.',
      body: 'Some journeys are written in the stars. Ours is a story of love, laughter, family, and the promise of forever. We are delighted to begin this new chapter and share our special day with the people who mean the most to us.',
      roadmapTitle: 'Two Journeys, One Beautiful Destiny',
      pending: 'To be written',
      bride: { role: "The Bride's Journey", name: 'Shikha', tag: 'Her side of the story', title: 'Her Chapters' },
      groom: { role: "The Groom's Journey", name: 'Himanshu', tag: 'His side of the story', title: 'His Chapters' },
      chapter: 'Chapter',
      brideChapters: [
        ['Where Her Story Begins', "Shikha's story will begin here. We'll add the memories, little details, and moments that made her who she is when you share them."],
        ['A Dream in Her Heart', 'A space for her dreams, favourite memories, family moments, and the things that make her story uniquely hers.'],
        ['The Moment Everything Changed', "Here we'll tell her side of how their paths crossed and what that moment meant to her."],
        ['Her Forever Begins', 'The final chapter will lead into the beautiful new beginning she and Himanshu are celebrating.'],
      ],
      groomChapters: [
        ['His Own Beginning', "Himanshu's journey will start here, with the experiences and people that shaped his life before their paths met."],
        ['The Things He Holds Dear', 'A place for his passions, family memories, dreams, and the little things that make him who he is.'],
        ['When Their Paths Met', "Here we'll share Himanshu's perspective on meeting Shikha and the moments that brought them closer."],
        ['A Promise for Tomorrow', 'His side of the journey will meet hers here, as they step together into a new chapter.'],
      ],
      pillars: [
        ['How It Began', 'Every beautiful story begins with a special moment. Ours brought two hearts together and gave us a reason to dream about forever.'],
        ['A Promise of Love', 'With love and the blessings of our families, we look forward to sharing every tomorrow, every celebration, and every little moment.'],
        ['A New Beginning', 'A new chapter, new memories, and a lifetime of togetherness. Your blessings will make our celebration even more meaningful.'],
      ],
    },
    events: {
      eyebrow: 'Wedding Celebrations',
      title: 'Come for the rituals, stay for the memories!',
      month: 'December 2026',
      list: {
        engagement: { name: 'Engagement', date: 'Wednesday · 9 December 2026', time: '7:00 PM onwards', text: 'Join us as we celebrate the beginning of this beautiful journey together.' },
        mehndi: { name: 'Mehndi', date: 'Thursday · 10 December 2026', time: 'Timing to be announced', text: 'Henna, joyful music, colourful traditions, and treasured moments with loved ones.' },
        haldi: { name: 'Haldi', date: 'Thursday · 10 December 2026', time: 'Timing to be announced', text: 'A bright celebration filled with marigolds, blessings, and family joy.' },
        wedding: { name: 'Wedding Ceremony', date: 'Friday · 11 December 2026', time: '7:00 PM onwards', text: 'Join us for sacred rituals, heartfelt blessings, and the beginning of married life.' },
      },
      note: 'Engagement and wedding begin at 7:00 PM onwards. Timings for Mehndi and Haldi will be shared soon.',
      noteTitle: 'Celebration timings',
      items: events(true),
    },
    venue: {
      eyebrow: 'Venue for all celebrations',
      name: 'Hotel Indian Roller',
      address: 'Jagadhari Road, Ambala Cantt',
      text: 'We look forward to celebrating these special moments with you.',
      cta: 'Open in Maps',
    },
    gallery: {
      eyebrow: 'Our Memories',
      title: 'Little moments that become lifelong memories.',
      items: [
        { key: 'couple', title: 'Together, Forever', text: 'Two hearts, one beautiful journey, and a lifetime of memories to come.', alt: 'Shikha and Himanshu together in a flower garden' },
        { key: 'bride', title: 'The Bride · Shikha', text: 'A beautiful portrait celebrating the bride and her special day.', alt: 'Shikha, the bride, in a festive lehenga' },
        { key: 'groom', title: 'The Groom · Himanshu', text: 'A portrait of the groom as the celebrations begin.', alt: 'Himanshu in a dark suit and red tie' },
      ],
      more: 'More memories to come — new photographs will be added here.',
      prev: 'Previous photo',
      next: 'Next photo',
      closeLb: 'Close gallery',
      view: 'View',
    },
    party: {
      eyebrow: 'Our Wedding Party',
      title: 'The wonderful people standing beside us on our special day.',
      items: [
        ['The Bride', 'Shikha', 'The heart of this beautiful celebration.'],
        ['The Groom', 'Himanshu', 'Ready for a lifetime of love and togetherness.'],
        ['Our Families', '', 'Our roots, our strength, and our greatest blessings.'],
        ['Friends & Loved Ones', '', 'Thank you for being part of our story and our joy.'],
      ],
    },
    closing: {
      title: 'Your Presence Is Our Present',
      text: 'Your love, blessings, and good wishes mean the world to us. We cannot wait to celebrate together!',
    },
    footer: {
      wish: 'With love and warm wishes',
      line: 'Two families, one celebration, endless memories.',
      top: 'Back to top',
    },
    langLabel: 'Language',
  },

  hi: {
    lang: 'hi',
    title: 'शिखा और हिमांशु | विवाह निमंत्रण',
    guestDefault: 'प्रिय परिवारजनों एवं मित्रों,',
    guest: (n) => `प्रिय ${n} जी,`,
    envelope: {
      kicker: 'विवाह का स्नेहिल निमंत्रण',
      title: 'प्रेम का उत्सव',
      invited: 'आप सादर आमंत्रित हैं',
      sub: 'इस सुंदर शुरुआत के साक्षी बनने के लिए',
      hint: 'निमंत्रण खोलने के लिए लिफ़ाफ़े को छुएँ',
      aria: 'शिखा और हिमांशु का विवाह निमंत्रण खोलें',
      date: '11 दिसंबर 2026',
    },
    nav: { story: 'हमारी कहानी', celebrations: 'उत्सव', venue: 'स्थल', gallery: 'तस्वीरें', party: 'हमारे अपने' },
    menu: 'मेनू',
    close: 'बंद करें',
    hero: {
      eyebrow: 'हमारे परिवारों के आशीर्वाद से',
      sub: 'दो दिल, एक खूबसूरत सफ़र',
      invite: ['अपने परिवारों के साथ', 'हम आपको हमारे विवाह उत्सव में आमंत्रित करते हैं'],
      dates: '9 · 10 · 11 दिसंबर 2026',
      scroll: 'नीचे जाएँ',
      alt: 'शिखा और हिमांशु के विवाह निमंत्रण का चित्र',
    },
    countdown: {
      eyebrow: 'शुभ घड़ी तक',
      title: 'उलटी गिनती शुरू',
      units: { days: 'दिन', hours: 'घंटे', minutes: 'मिनट', seconds: 'सेकंड' },
      done: 'आज वही शुभ दिन है। हमारे उत्सव में आपका स्वागत है।',
    },
    story: {
      eyebrow: 'हमारी सुंदर कहानी',
      title: 'थोड़ा-सा प्यार, थोड़ी-सी किस्मत और जीवनभर का साथ।',
      body: 'कुछ सफ़र सितारों में लिखे होते हैं। हमारी कहानी है प्यार, हँसी, परिवार और जीवनभर साथ निभाने के वादे की। इस नए अध्याय की शुरुआत करके हमें बेहद खुशी है और हम अपना यह खास दिन अपने प्रियजनों के साथ मनाना चाहते हैं।',
      roadmapTitle: 'दो सफ़र, एक सुंदर मंज़िल',
      pending: 'जल्द लिखा जाएगा',
      bride: { role: 'दुल्हन का सफ़र', name: 'शिखा', tag: 'उसकी कहानी', title: 'उसके अध्याय' },
      groom: { role: 'दूल्हे का सफ़र', name: 'हिमांशु', tag: 'उसकी कहानी', title: 'उसके अध्याय' },
      chapter: 'अध्याय',
      brideChapters: [
        ['जहाँ उसकी कहानी शुरू होती है', 'शिखा की कहानी यहाँ से शुरू होगी। उनसे मिली यादें, छोटी-छोटी बातें और खास पल साझा होने पर यहाँ जोड़े जाएँगे।'],
        ['उसके दिल का एक सपना', 'उसके सपनों, प्यारी यादों, पारिवारिक पलों और उसकी कहानी को खास बनाने वाली बातों के लिए एक जगह।'],
        ['वह पल जिसने सब बदल दिया', 'यहाँ जानेंगे कि उनकी राहें कैसे मिलीं और वह पल उसके लिए कितना खास था।'],
        ['उसके नए जीवन की शुरुआत', 'आखिरी अध्याय उस सुंदर नई शुरुआत तक ले जाएगा, जिसका जश्न वह और हिमांशु मना रहे हैं।'],
      ],
      groomChapters: [
        ['उसकी अपनी शुरुआत', 'हिमांशु का सफ़र यहाँ उन अनुभवों और लोगों से शुरू होगा, जिन्होंने उनकी राहें मिलने से पहले उनका जीवन सँवारा।'],
        ['उसके दिल के करीब बातें', 'उसके शौक, पारिवारिक यादों, सपनों और उसे खास बनाने वाली छोटी-छोटी बातों के लिए एक जगह।'],
        ['जब उनकी राहें मिलीं', 'यहाँ शिखा से मिलने और उन्हें करीब लाने वाले पलों पर हिमांशु का नज़रिया साझा होगा।'],
        ['आने वाले कल का वादा', 'यहाँ उसका सफ़र शिखा के सफ़र से जुड़ेगा और दोनों साथ नए अध्याय में कदम रखेंगे।'],
      ],
      pillars: [
        ['शुरुआत कैसे हुई', 'हर सुंदर कहानी की शुरुआत एक खास पल से होती है। हमारे उस पल ने दो दिलों को मिलाया और हमें जीवनभर के साथ का सपना देखने की वजह दी।'],
        ['प्यार का वादा', 'अपने प्यार और परिवारों के आशीर्वाद के साथ, हम आने वाले हर कल, हर उत्सव और हर छोटे-से पल को साझा करने की आशा रखते हैं।'],
        ['एक नई शुरुआत', 'एक नया अध्याय, नई यादें और जीवनभर की एकजुटता। आपका आशीर्वाद हमारे उत्सव को और भी खास बना देगा।'],
      ],
    },
    events: {
      eyebrow: 'शादी के उत्सव',
      title: 'शुभ रस्मों में शामिल हों और यादें साथ ले जाएँ!',
      month: 'दिसंबर 2026',
      list: {
        engagement: { name: 'सगाई', date: 'बुधवार · 9 दिसंबर 2026', time: 'शाम 7:00 बजे से', text: 'इस खूबसूरत सफ़र की शुरुआत के उत्सव में हमारे साथ शामिल हों।' },
        mehndi: { name: 'मेहंदी', date: 'गुरुवार · 10 दिसंबर 2026', time: 'समय की जानकारी जल्द दी जाएगी', text: 'मेहंदी, मधुर संगीत, रंगीन परंपराएँ और अपनों के साथ अनमोल पल।' },
        haldi: { name: 'हल्दी', date: 'गुरुवार · 10 दिसंबर 2026', time: 'समय की जानकारी जल्द दी जाएगी', text: 'गेंदे के फूलों, आशीर्वाद और पारिवारिक खुशियों से सजा उजला उत्सव।' },
        wedding: { name: 'विवाह समारोह', date: 'शुक्रवार · 11 दिसंबर 2026', time: 'शाम 7:00 बजे से', text: 'पवित्र रस्मों, दिल से दिए गए आशीर्वाद और वैवाहिक जीवन की शुरुआत में हमारे साथ रहें।' },
      },
      note: 'सगाई और विवाह शाम 7:00 बजे से शुरू होंगे। मेहंदी और हल्दी का समय जल्द बताया जाएगा।',
      noteTitle: 'उत्सवों का समय',
      items: events(false),
    },
    venue: {
      eyebrow: 'सभी उत्सवों का स्थल',
      name: 'होटल इंडियन रोलर',
      address: 'जगाधरी रोड, अंबाला छावनी',
      text: 'हम आपके साथ इन खास पलों का उत्सव मनाने के लिए उत्सुक हैं।',
      cta: 'मैप में खोलें',
    },
    gallery: {
      eyebrow: 'हमारी यादें',
      title: 'छोटे-छोटे पल, जो जीवनभर की यादें बन जाते हैं।',
      items: [
        { key: 'couple', title: 'साथ-साथ, हमेशा', text: 'दो दिल, एक खूबसूरत सफ़र और आने वाले जीवनभर की यादें।', alt: 'फूलों के बगीचे में शिखा और हिमांशु' },
        { key: 'bride', title: 'दुल्हन · शिखा', text: 'दुल्हन और उसके खास दिन को समर्पित एक सुंदर तस्वीर।', alt: 'उत्सवी लहंगे में दुल्हन शिखा की तस्वीर' },
        { key: 'groom', title: 'दूल्हा · हिमांशु', text: 'उत्सवों की शुरुआत में दूल्हे की एक तस्वीर।', alt: 'गहरे सूट और लाल टाई में हिमांशु की तस्वीर' },
      ],
      more: 'और यादें जल्द जुड़ेंगी — नई तस्वीरें यहाँ जोड़ी जाएँगी।',
      prev: 'पिछली तस्वीर',
      next: 'अगली तस्वीर',
      closeLb: 'गैलरी बंद करें',
      view: 'देखें',
    },
    party: {
      eyebrow: 'हमारे अपने लोग',
      title: 'वे प्यारे लोग जो हमारे इस खास दिन पर हमारे साथ हैं।',
      items: [
        ['दुल्हन', 'शिखा', 'इस सुंदर उत्सव की धड़कन।'],
        ['दूल्हा', 'हिमांशु', 'जीवनभर के प्यार और साथ के लिए तैयार।'],
        ['हमारे परिवार', '', 'हमारी जड़ें, हमारी ताकत और हमारा सबसे बड़ा आशीर्वाद।'],
        ['मित्र एवं प्रियजन', '', 'हमारी कहानी और खुशियों का हिस्सा बनने के लिए धन्यवाद।'],
      ],
    },
    closing: {
      title: 'आपकी उपस्थिति ही हमारा उपहार है',
      text: 'आपका प्यार, आशीर्वाद और शुभकामनाएँ हमारे लिए अनमोल हैं। हम आपके साथ जश्न मनाने के लिए उत्सुक हैं!',
    },
    footer: {
      wish: 'ढेर सारे प्यार और शुभकामनाओं सहित',
      line: 'दो परिवार, एक उत्सव और अनगिनत यादें।',
      top: 'ऊपर जाएँ',
    },
    langLabel: 'भाषा',
  },
};
