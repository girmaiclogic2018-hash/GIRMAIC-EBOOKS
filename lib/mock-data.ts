export interface Chapter {
  id: string;
  title: string;
  amharicTitle: string;
  content: string;
  amharicContent: string;
  wordCount: number;
  audioDuration: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  amharicTitle: string;
  amharicSubtitle: string;
  author: string;
  organization: string;
  category: string;
  priceETB: number;
  priceUSD: number;
  pages: number;
  words: number;
  language: string;
  coverImage: string;
  description: string;
  amharicDescription: string;
  status: 'Published' | 'In Editing' | 'Drafting' | 'Review';
  tier: 'Standard' | 'Premium' | 'Ultimate';
  chapters: Chapter[];
  days30Program?: { day: number; title: string; action: string }[];
}

export const INITIAL_BOOKS: Book[] = [
  {
    id: 'book-1',
    title: 'The Human Reset',
    subtitle: 'A Practical Guide to Rebuilding Your Life, Mindset and Future',
    amharicTitle: 'የሰው ልጅ ዳግም ጅምር (The Human Reset)',
    amharicSubtitle: 'የሕይወትዎን፣ የአስተሳሰብዎን እና የወደፊት ዕጣ ፈንታዎን እንደገና ለመገንባት የሚያስችል ተግባራዊ መመሪያ',
    author: 'Girma Haile Bunaro',
    organization: 'Girmaic AI Technology & Innovation Center',
    category: 'Self-Development & Mindset',
    priceETB: 399,
    priceUSD: 5.99,
    pages: 124,
    words: 32400,
    language: 'English & Amharic',
    coverImage: 'https://picsum.photos/seed/humanreset/800/1200',
    description: 'A transformative guide designed to help readers reset their core mental paradigms, overcome adversity, and construct a purposeful future through intentional habits, resilience frameworks, and actionable personal blueprints.',
    amharicDescription: 'አንባብያን የዕለት ተዕለት ሕይወታቸውን ፈተናዎች አሸንፈው ጠንካራ አስተሳሰብ እና የብሩህ ተስፋ እቅድ እንዲገነቡ የሚያግዝ አበረታች መጽሐፍ።',
    status: 'Published',
    tier: 'Ultimate',
    chapters: [
      {
        id: 'ch-1',
        title: 'Chapter 1: The Anatomy of a Reset',
        amharicTitle: 'ምዕራፍ 1፡ የዳግም ጅምር መሰረታዊ መርሆች',
        content: 'Every meaningful transformation begins with an honest audit of where you are. We often cling to outdated patterns not because they serve us, but because they are familiar. The human reset is about deliberately stepping out of comfortable stagnation into conscious growth...',
        amharicContent: 'እያንዳንዱ ትርጉም ያለው ለውጥ የሚጀምረው ባለበት ሁኔታ ላይ በታማኝነት በመገምገም ነው። ብዙ ጊዜ ከጥቅም ውጪ በሆኑ ልምዶች የምንጠመደው ስለሚጠቅሙን ሳይሆን ስለለመድናቸው ነው። የሰው ልጅ ዳግም ጅምር ማለት ወደ ሕሊናዊ እድገት ፊት ለፊት መጋፈጥ ነው።',
        wordCount: 2450,
        audioDuration: '14:20'
      },
      {
        id: 'ch-2',
        title: 'Chapter 2: Rewiring Mental Models',
        amharicTitle: 'ምዕራፍ 2፡ የአስተሳሰብ ማዕቀፎችን ማደስ',
        content: 'Your beliefs dictate your actions, and your actions compound into your destiny. To change your life, you must first inspect the invisible filters through which you perceive reality. Mental models determine whether you see obstacles as walls or stepping stones...',
        amharicContent: 'እምነቶችዎ ድርጊቶችዎን ይወስናሉ፣ ድርጊቶችዎ ደግሞ የወደፊት ዕጣ ፈንታዎን ይቀርጻሉ። ሕይወትዎን ለመለወጥ በመጀመሪያ እውነታውን የሚመለከቱባቸውን የማይታዩ ማጣሪያዎች መመርመር አለብዎት።',
        wordCount: 2800,
        audioDuration: '16:10'
      }
    ],
    days30Program: [
      { day: 1, title: 'Auditing Your Current Reality', action: 'Write down your 3 biggest daily drains and 3 biggest energy drivers.' },
      { day: 2, title: 'Defining Your True North', action: 'Write a 1-sentence mission statement for the next 3 years of your life.' },
      { day: 3, title: 'Eliminating Friction', action: 'Remove 3 digital or physical distractions from your workspace.' }
    ]
  },
  {
    id: 'book-2',
    title: 'The AI Life Revolution',
    subtitle: 'How Ordinary People Can Use Artificial Intelligence to Learn, Work and Create',
    amharicTitle: 'የአርቴፊሻል ኢንተለጀንስ ሕይወት አብዮት',
    amharicSubtitle: 'ተራ ሰዎች አርቴፊሻል ኢንተለጀንስን በመጠቀም እንዴት መማር፣ መስራት እና መፍጠር እንደሚችሉ',
    author: 'Girma Haile Bunaro',
    organization: 'Girmaic AI Technology & Innovation Center',
    category: 'Technology & Future',
    priceETB: 499,
    priceUSD: 7.99,
    pages: 142,
    words: 38100,
    language: 'English & Amharic',
    coverImage: 'https://picsum.photos/seed/airevolution/800/1200',
    description: 'An accessible, empowering roadmap for students, professionals, and entrepreneurs across Africa and the world to leverage artificial intelligence for skill acquisition, career growth, and digital enterprise.',
    amharicDescription: 'በአፍሪካ እና በዓለም ዙሪያ ያሉ ተማሪዎች፣ ባለሙያዎች እና ኢንተርፕረነሮች አርቴፊሻል ኢንተለጀንስን በመጠቀም ክህሎታቸውን እንዴት ማሳደግ እንደሚችሉ የሚያሳይ ተግባራዊ መመሪያ።',
    status: 'Published',
    tier: 'Premium',
    chapters: [
      {
        id: 'ch-2-1',
        title: 'Chapter 1: AI as Your Personal Co-Pilot',
        amharicTitle: 'ምዕራፍ 1፡ AI እንደ ግል ረዳትዎ',
        content: 'Artificial intelligence is no longer locked in futuristic laboratories. It is available in the palm of your hand, ready to serve as a tireless tutor, researcher, editor, and creative partner...',
        amharicContent: 'አርቴፊሻል ኢንተለጀንስ ከአሁን በኋላ በምርምር ማዕከላት ብቻ የተወሰነ አይደለም። በማንኛውም ጊዜ ሊረዳዎ ዝግጁ የሆነ የማያባራ አስተማሪ እና ፈጣሪ ሆኖ በእጅዎ ይገኛል።',
        wordCount: 3100,
        audioDuration: '18:45'
      }
    ]
  },
  {
    id: 'book-3',
    title: 'From Zero to Digital Income',
    subtitle: 'A Practical Roadmap for Turning Knowledge and Skills Into Digital Products',
    amharicTitle: 'ከባዶ እስከ ዲጂታል ገቢ',
    amharicSubtitle: 'እውቀትዎን እና ክህሎትዎን ወደ ዲጂታል ምርቶች የመቀየር ተግባራዊ መንገድ',
    author: 'Girma Haile Bunaro',
    organization: 'Girmaic AI Technology & Innovation Center',
    category: 'Digital Business & Wealth',
    priceETB: 499,
    priceUSD: 7.99,
    pages: 135,
    words: 35000,
    language: 'English & Amharic',
    coverImage: 'https://picsum.photos/seed/digitalincome/800/1200',
    description: 'Step-by-step guidance on identifying valuable knowledge, packaging it into e-books, online courses, and digital assets, and launching them on global and African marketplaces like Ye-Buna Digitals.',
    amharicDescription: 'ዋጋ ያለው እውቀት በመለየት ወደ ኢ-መጽሐፍት እና ዲጂታል ምርቶች በመቀየር በየ-ቡና ዲጂታልስ እና ሌሎች መድረኮች ላይ እንዴት መሸጥ እንደሚቻል ማብራሪያ።',
    status: 'Published',
    tier: 'Ultimate',
    chapters: []
  },
  {
    id: 'book-4',
    title: 'The African Innovator',
    subtitle: 'Building Solutions for Africa and the Global Future',
    amharicTitle: 'አፍሪካዊው ፈጣሪ',
    amharicSubtitle: 'ለአፍሪካ እና ለዓለም የወደፊት እጣ ፈንታ መፍትሄዎችን መገንባት',
    author: 'Girma Haile Bunaro',
    organization: 'Girmaic AI Technology & Innovation Center',
    category: 'Innovation & Leadership',
    priceETB: 449,
    priceUSD: 6.99,
    pages: 138,
    words: 36000,
    language: 'English & Amharic',
    coverImage: 'https://picsum.photos/seed/africaninnovator/800/1200',
    description: 'Exploring the unique entrepreneurial spirit, technological leaps, and systemic opportunities driving Africa’s next generation of builders, innovators, and visionary leaders.',
    amharicDescription: 'የአፍሪካን አዳዲስ ፈጣሪዎች እና መሪዎች አቅም የሚያጎለብቱ ልዩ የቴክኖሎጂ እና የንግድ እድሎችን ይዳስሳል።',
    status: 'Published',
    tier: 'Standard',
    chapters: []
  },
  {
    id: 'book-5',
    title: 'The Confidence Code',
    subtitle: 'How to Stop Doubting Yourself and Start Building the Life You Want',
    amharicTitle: 'የድፍረት መርህ (The Confidence Code)',
    amharicSubtitle: 'ራስን መጠራጠርን አቁሞ የሚፈልጉትን ሕይወት መገንባት መጀመር የሚቻለው እንዴት ነው?',
    author: 'Girma Haile Bunaro',
    organization: 'Girmaic AI Technology & Innovation Center',
    category: 'Self-Development',
    priceETB: 349,
    priceUSD: 4.99,
    pages: 108,
    words: 27500,
    language: 'English & Amharic',
    coverImage: 'https://picsum.photos/seed/confidencecode/800/1200',
    description: 'Actionable mental frameworks to conquer impostor syndrome, build unshakeable self-belief, and act courageously in the face of uncertainty.',
    amharicDescription: 'የውስጥ ስጋትን አሸንፎ በራስ መተማመንን በመገንባት በድፍረት ውሳኔዎችን ለመወሰን የሚያስችል መመሪያ።',
    status: 'Published',
    tier: 'Standard',
    chapters: []
  },
  {
    id: 'book-6',
    title: 'The Future-Ready Human',
    subtitle: 'Skills, Mindset and Intelligence for the Age of AI',
    amharicTitle: 'ለወደፊቱ የተዘጋጀው የሰው ልጅ',
    amharicSubtitle: 'ለአርቴፊሻል ኢንተለጀንስ ዘመን የሚያስፈልጉ ክህሎቶች እና አስተሳሰቦች',
    author: 'Girma Haile Bunaro',
    organization: 'Girmaic AI Technology & Innovation Center',
    category: 'Future of Work',
    priceETB: 499,
    priceUSD: 7.99,
    pages: 145,
    words: 39000,
    language: 'English & Amharic',
    coverImage: 'https://picsum.photos/seed/futureready/800/1200',
    description: 'Understanding which human skills—such as empathy, complex problem solving, philosophical inquiry, and emotional intelligence—become more valuable in an AI-driven society.',
    amharicDescription: 'በቴክኖሎጂ ዘመን የሰዎችን ልዩ ችሎታዎች እና አእምሯዊ ብቃቶች እንዴት ማሳደግ እንደሚቻል ጥልቅ ትንታኔ።',
    status: 'In Editing',
    tier: 'Premium',
    chapters: []
  },
  {
    id: 'book-7',
    title: 'The Global Citizen',
    subtitle: 'Understanding Humanity Across Cultures, Borders and Generations',
    amharicTitle: 'ዓለም አቀፍ ዜጋ (The Global Citizen)',
    amharicSubtitle: 'תרבותን፣ ድንበሮችን እና ትውልዶችን በማገናኘት ሰብአዊነትን መረዳት',
    author: 'Girma Haile Bunaro',
    organization: 'Girmaic AI Technology & Innovation Center',
    category: 'Culture & Society',
    priceETB: 399,
    priceUSD: 5.99,
    pages: 118,
    words: 30000,
    language: 'English & Amharic',
    coverImage: 'https://picsum.photos/seed/globalcitizen/800/1200',
    description: 'A thoughtful exploration of cross-cultural empathy, shared human values, and the responsibility of global citizenship in an interconnected world.',
    amharicDescription: 'በተለያዩ ባህሎች መካከል ያለውን መተሳሰብ እና የጋራ ሰብአዊ ዋጋዎችን የሚያጠና መጽሐፍ።',
    status: 'Drafting',
    tier: 'Standard',
    chapters: []
  },
  {
    id: 'book-8',
    title: 'The Youth Opportunity Blueprint',
    subtitle: 'A Practical Guide to Learning, Creating, Building and Earning in the Digital Age',
    amharicTitle: 'የወጣቶች የእድል ማዕቀፍ (Youth Opportunity Blueprint)',
    amharicSubtitle: 'በዲጂታል ዘመን መማር፣ መፍጠር እና ገቢ ማግኘት የሚቻልበት ተግባራዊ መመሪያ',
    author: 'Girma Haile Bunaro',
    organization: 'Girmaic AI Technology & Innovation Center',
    category: 'Youth & Career',
    priceETB: 449,
    priceUSD: 6.99,
    pages: 125,
    words: 32000,
    language: 'English & Amharic',
    coverImage: 'https://picsum.photos/seed/youthblueprint/800/1200',
    description: 'A high-impact playbook designed for young leaders to master modern digital skills, build portfolios, launch projects, and cultivate financial literacy.',
    amharicDescription: 'ወጣቶች ዘመናዊ ዲጂታል ክህሎቶችን በመማር የራሳቸውን ስኬት እንዲገነቡ የሚረዳ መመሪያ።',
    status: 'Published',
    tier: 'Ultimate',
    chapters: []
  },
  {
    id: 'book-9',
    title: 'The Second Life of Ideas',
    subtitle: 'How to Turn Problems, Experiences and Knowledge Into New Possibilities',
    amharicTitle: 'የሀሳቦች ሁለተኛ ሕይወት',
    amharicSubtitle: 'ችግሮችን እና ልምዶችን ወደ አዲስ ዕድሎች እንዴት መቀየር ይቻላል?',
    author: 'Girma Haile Bunaro',
    organization: 'Girmaic AI Technology & Innovation Center',
    category: 'Creativity & Strategy',
    priceETB: 399,
    priceUSD: 5.99,
    pages: 112,
    words: 29000,
    language: 'English & Amharic',
    coverImage: 'https://picsum.photos/seed/secondlife/800/1200',
    description: 'Discover how past failures, everyday problems, and personal experiences contain the exact raw materials needed to invent new innovations and ventures.',
    amharicDescription: 'ያለፉ ውድቀቶችን እና የዕለት ተዕለት ችግሮችን ወደ አዲስ የፈጠራ ስራዎች እንዴት መቀየር እንደሚቻል የሚያሳይ መጽሐፍ።',
    status: 'Review',
    tier: 'Standard',
    chapters: []
  },
  {
    id: 'book-10',
    title: 'Humanity 2050',
    subtitle: 'How Humans Can Build a More Inclusive, Intelligent and Sustainable Future',
    amharicTitle: 'የሰው ልጅ 2050 (Humanity 2050)',
    amharicSubtitle: 'የሰው ልጅ ይበልጥ አካታች፣ ብልህ እና ቀጣይነት ያለው የወደፊት ጊዜ መገንባት የሚችለው እንዴት ነው?',
    author: 'Girma Haile Bunaro',
    organization: 'Girmaic AI Technology & Innovation Center',
    category: 'Future Studies & Philosophy',
    priceETB: 549,
    priceUSD: 8.99,
    pages: 160,
    words: 42000,
    language: 'English & Amharic',
    coverImage: 'https://picsum.photos/seed/humanity2050/800/1200',
    description: 'A visionary projection of where our global civilization is heading, combining ethics, technology, environmental sustainability, and human wisdom.',
    amharicDescription: 'የሰው ልጅ ከቴክኖሎጂ እድገት ጋር አብሮ በመሄድ የተሻለ እና ፍትሃዊ ዓለም መፍጠር የሚችልበትን የወደፊት እይታ ያቀርባል።',
    status: 'Published',
    tier: 'Ultimate',
    chapters: []
  }
];
