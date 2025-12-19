import { Interview, SoundEffect } from './types';

export const MOCK_INTERVIEWS: Interview[] = [
  // Detailed Costco Article from Image
  {
    id: 'costco-article-1',
    founderName: 'Samuel Mathew',
    author: 'Samuel Mathew',
    readTime: '4 min read',
    companyName: 'Costco Wholesale',
    position: 'Business Analyst',
    email: 'samuel@business.com',
    title: 'வாடிக்கையாளர்கள் நம்பிக்கை மூலம் பில்லியன் டாலர் வருவாய் ஈட்டிய ‘Costco’ சாம்ராஜ்யத்தின் வெற்றி கதை!',
    description: 'Costco வெறும் ஒரு சில்லறை வர்த்தகக் கிடங்கு அல்ல; அது நம்பிக்கை, நிலைப்பாடு மற்றும் மதிப்பு ஆகியவற்றின் வலுவான கலவையில் செழித்து வளரும் ஒரு தலைசிறந்த வணிக மாதிரி.',
    longContent: `
'கோஸ்ட்கோ' (Costco) - 1983ஆம் ஆண்டு அமெரிக்காவின் வாஷிங்டன் மாநிலம், சியாட்டிலில் தொடங்கப்பட்ட உலகளாவிய மொத்த விற்பனை (Wholesale) சில்லறை வர்த்தக நிறுவனம். அமெரிக்கா, கனடா உள்ளிட்ட பல நாடுகளில் மிகவும் பிரபலமாக இருந்து, குறைந்த விலையில் உயர்தர பொருட்களை அதிக அளவில் வழங்குவதற்கும், உறுப்பினர் முறை வணிக மாடலுக்கும் பிரபலமானது.

Costco வெறும் ஒரு சில்லறை வர்த்தகக் கிடங்கு அல்ல; அது நம்பிக்கை, நிலைப்பாடு மற்றும் மதிப்பு ஆகியவற்றின் வலுவான கலவையில் செழித்து வளரும் ஒரு தலைசிறந்த வணிக மாதிரி.

பெரும்பாலான நிறுவனங்கள் புதிய போக்குகள் அல்லது புதிய வித்தைகள் பின்னால் ஓடிக் கொண்டிருக்கும்போது, கோஸ்ட்கோவோ எளிமையான, ஆனால் ஆழமான தாக்கம் செலுத்தும் கொள்கைகளைக் கொண்டு ஒரு பெரிய சாம்ராஜ்யத்தை கட்டமைத்துள்ளது.

உலகின் மிகவும் வியூக உத்தியுடன் கூடிய நிறுவனங்களில் கோஸ்ட்கோ ஏன் முதன்மையானது என்பதை இந்த கட்டுரையில் பார்க்கலாம்.

"நான் ஒரு மறைக்கப்பட்ட அரிய பொருளை கண்டுபிடித்துவிட்டேன்," என்ற வெற்றியுணர்வை உருவாக்குவது. இந்தத் துல்லியமாகத் திட்டமிடப்பட்ட உளவியல் உத்தி (Psychological Strategy) ஒரு சாதாரண ஷாப்பிங் பயணத்தை வாடிக்கையாளர்கள் மீண்டும் மீண்டும் வரத்தூண்டும் ஓர் அனுபவமாக மாற்றுகிறது.

பகட்டுத் தேவை இல்லை, பொருளே பிரதானம்:

கோஸ்ட்கோவின் அணுகுமுறை வாடிக்கையாளர்களைக் கையாளுவது (Manipulation) விஷயத்தில் கோஸ்ட்கோ கடைபிடிக்கப்படும் கட்டுப்பாடு அதன் தனித்துவமான அம்சமாகும். மற்ற சில்லறை விற்பனையாளர்களைப் போலல்லாமல், கோஸ்ட்கோ அடுக்கு இடத்தை விற்பனை செய்வதில்லை. அது உங்களை கவர்ச்சியான விளம்பரங்களால் மூழ்கடிப்பதில்லை அல்லது இணையம் முழுவதும் உங்கள் உலாவல் பழக்கங்களைக் கண்காணிப்பதில்லை. அதற்குப் பதிலாக, கோஸ்ட்கோ மதிப்புக்கான அதன் நற்பெயரை நம்புகிறது, விளம்பரங்களை விட தயாரிப்புகளின் தரத்தில் கவனம் செலுத்துகிறது.

இன்றைய மின்னணு உலகில், நிறுவனங்கள் நமது ஒவ்வொரு அசைவையும் வலையில் கண்காணிக்கின்றன. ஆனால், கோஸ்ட்கோ பல ஆண்டுகளாக இந்த போக்கை எதிர்த்துள்ளது. சில்லறை வணிக ஊடகங்களின் வளர்ச்சி காரணமாக இது தற்போது மாறத் தொடங்கினாலும், பல தசாப்தங்களாக, கோஸ்ட்கோவின் வணிக மாதிரி கட்டுப்பாட்டின் அடிப்படையில் கட்டமைக்கப்பட்டுள்ளது. பெரும்பாலான நிறுவனங்கள் வாடிக்கையாளர் தகவல்களைக் கையாளுவதற்கு முன்னுரிமை அளிக்கும் உலகில் இது ஒரு புதிய அணுகுமுறை. ஊடுருவும் சந்தைப்படுத்துதல் தந்திரங்கள் (Intrusive Marketing) இல்லாமல் கோஸ்ட்கோ செழித்து வளர்ந்துள்ளது.

ஊழியர்கள் மகிழ்ச்சி:

வெற்றிக்கு ஓர் அத்தியாவசியக் கூறு கோஸ்ட்கோ தனது ஊழியர்களுக்கு அளிக்கும் முக்கியத்துவமும் அதன் வெற்றிக்கு ஒரு முக்கிய காரணம். ஒரு சராசரி கோஸ்ட்கோ ஊழியர் ஒரு மணி நேரத்திற்கு $26 சம்பாதிக்கிறார், இது அமெரிக்கச் சில்லறை வர்த்தக ஊழியர்களின் சராசரியை விட கிட்டத்தட்ட 50% அதிகம். கோஸ்ட்கோவின் பல மேலாளர்கள் ஃபோர்க்லிஃப்ட் இயக்குநர்களாகப் பணியாற்றி, படிப்படியாக பதவி உயர்வு பெற்று உயர் பதவிகளுக்கு வந்துள்ளனர்.

இது ஏன் முக்கியம்? ஏனென்றால், மதிக்கப்படும் ஊழியர் ஒரு மதிக்கப்படும் பிராண்டிற்கு வழிவகுப்பார் என்று கோஸ்ட்கோ நம்புகிறது. தனது ஊழியர்களில் முதலீடு செய்வதன் மூலம், கோஸ்ட்கோ அவர்களை திருப்தியுடனும், உற்சாகத்துடனும் இருப்பதை உறுதி செய்கிறது. இது வாடிக்கையாளரே முதன்மையானவர் என்ற மனப்பான்மையாக மாறுகிறது. மேலும், பங்குச் சந்தையும் (Wall Street) இதை வரவேற்கிறது. கோஸ்ட்கோவின் பங்கு தொடங்கப்பட்டதிலிருந்து ஆண்டுதோறும் 17% வளர்ச்சி அடைந்துள்ளதிலிருந்து தெரிகிறது.
    `,
    thumbnail: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop',
    category: 'article',
    tags: ['Success Story', 'Business Story', 'Costco Brand Story', 'Success Stories', 'Wholesale Store', 'வெற்றிக்கதை', 'பிசினஸ் கதை', 'Household Store', 'Billion Dollar', 'Wholesale Brand'],
    format: 'horizontal',
    status: 'recorded',
    views: 125400,
    date: 'Dec 17, 2025',
    displayOnHome: true,
  },
  {
    id: 'article-2',
    founderName: 'Arul Kumar',
    author: 'Arul Kumar',
    readTime: '6 min read',
    companyName: 'FinTech TN',
    position: 'CEO',
    email: 'arul@fintech.tn',
    title: 'தமிழ்நாடு அரசு அறிவித்துள்ள "சுற்றுலா புதுமை ஹேக்கத்தான் 2025" - விண்ணப்பிப்பது எப்படி?',
    description: 'சுற்றுலாத் துறையில் புதிய தொழில்நுட்பங்களை புகுத்துவதற்காக தமிழ்நாடு சுற்றுலாத் துறை இந்த மாபெரும் போட்டியை அறிவித்துள்ளது.',
    longContent: `தமிழ்நாடு அரசு சுற்றுலாத் துறையில் டிஜிட்டல் தொழில்நுட்பங்களை மேம்படுத்தவும், புத்தாக்க சிந்தனைகளை ஊக்குவிக்கவும் 'சுற்றுலா புதுமை ஹேக்கத்தான் 2025' என்ற புதிய முன்னெடுப்பை தொடங்கியுள்ளது. இதன் மூலம் தமிழகத்தின் சுற்றுலாத் தளம் உலகத் தரத்திற்கு உயர்த்தப்படும் என எதிர்பார்க்கப்படுகிறது.`,
    thumbnail: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=400&auto=format&fit=crop',
    category: 'article',
    tags: ['Govt Scheme', 'Startup TN', 'Tourism'],
    format: 'horizontal',
    status: 'recorded',
    views: 32100,
    date: 'Dec 16, 2025',
    displayOnHome: true,
  },
  // Previous mock data kept for backward compatibility...
  {
    id: 'feat-1',
    founderName: 'Aditi Anand',
    companyName: 'Neelam Studios',
    position: 'Co-Founder',
    email: 'aditi@neelam.com',
    title: 'Directors needed to tell true, deep stories - Neelam Studios',
    description: 'Aditi Anand discusses the new wave of narrative filmmaking in Tamil cinema and the hunt for raw talent.',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop',
    category: 'featured',
    format: 'horizontal',
    status: 'recorded',
    views: 85400,
    date: 'Dec 17, 2025',
    displayOnHome: true,
  },
  {
    id: 'news-1',
    founderName: 'Cyber Simman',
    companyName: 'Cyber Defense',
    position: 'Analyst',
    email: 'simman@cyber.com',
    title: 'How to recover from ₹14 Crore fraud - A case study',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400&auto=format&fit=crop',
    category: 'news',
    format: 'horizontal',
    status: 'recorded',
    views: 12000,
    date: 'Dec 17, 2025',
    displayOnHome: true,
  }
];

export const SOUND_EFFECTS: SoundEffect[] = [
  { id: 'applause', label: 'Applause', icon: 'HandMetal', color: 'bg-yellow-500' },
  { id: 'money', label: 'Cha-Ching', icon: 'DollarSign', color: 'bg-green-500' },
  { id: 'laugh', label: 'Laugh', icon: 'Smile', color: 'bg-blue-500' },
  { id: 'drum', label: 'Ba Dum Tss', icon: 'Music', color: 'bg-purple-500' },
];