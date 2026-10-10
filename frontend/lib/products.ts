export type Category =
  | 'Rings'
  | 'Necklaces'
  | 'Earrings'
  | 'Bracelets'
  | 'Pendants'
  | 'Anklets'
  | 'Chains'
  | 'Sets'
  | 'Mangalsutras'
  | 'Nose Pins'
  | 'Toe Rings';

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  collection: string;
  price: number;
  compareAtPrice?: number;
  material: string;
  purity: string;
  stone: string;
  weightGrams: number;
  rating: number;
  reviews: number;
  badge?: string;
  image: string;
  images: string[];
  description: string;
  longDescription: string;
  sizes: string[];
  stock: number;
  gender?: string;
  occasion?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  product: string;
};

export const categories: { name: Category; image: string; count: number }[] = [
  { name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80', count: 5 },
  { name: 'Pendants', image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80', count: 3 },
  { name: 'Bracelets', image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80', count: 4 },
  { name: 'Earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80', count: 5 },
  { name: 'Anklets', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=80', count: 2 },
  { name: 'Chains', image: 'https://images.unsplash.com/photo-1515562141589-67f0d569b6e5?auto=format&fit=crop&w=800&q=80', count: 3 },
  { name: 'Sets', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80', count: 4 },
  { name: 'Mangalsutras', image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80', count: 2 },
  { name: 'Nose Pins', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80', count: 3 },
  { name: 'Toe Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80', count: 2 },
  { name: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80', count: 4 },
];

export const products: Product[] = [
  {
    id: 'celeste-ring', slug: 'celeste-solitaire-ring', name: 'Celeste Solitaire Ring', category: 'Rings', collection: 'Timeless Icons',
    price: 125000, material: '18K Yellow Gold', purity: '18K', stone: 'Natural Diamond (0.5ct)', weightGrams: 3.8, rating: 4.9, reviews: 38,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1603561596112-db1d7e9e5b0f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'A quietly radiant solitaire, hand-finished to celebrate the moments that change everything.',
    longDescription: 'The Celeste Solitaire is our most cherished ring — a single brilliant-cut natural diamond cradled in hand-polished 18K yellow gold. Each prong is set by master craftsmen in our Dhaka atelier using techniques passed down through three generations. The band tapers elegantly toward the stone, creating a silhouette that is both contemporary and timeless. Certified conflict-free diamond with GIA-equivalent grading.',
    sizes: ['5', '6', '7', '8', '9'], stock: 8, gender: 'Women', occasion: 'Engagement',
  },
  {
    id: 'aurelia-necklace', slug: 'aurelia-pearl-necklace', name: 'Aurelia Pearl Necklace', category: 'Necklaces', collection: 'Timeless Icons',
    price: 89500, material: '18K Gold', purity: '18K', stone: 'Freshwater Pearl', weightGrams: 8.2, rating: 4.8, reviews: 24,
    badge: 'New Arrival',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515562141589-67f0d569b6e5?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'Luminous pearls and a refined gold chain make an effortless heirloom for every day.',
    longDescription: 'The Aurelia features hand-selected freshwater pearls, each chosen for its natural lustre and near-perfect spherical form. Strung on a solid 18K gold chain with a secure lobster-claw clasp, this necklace transitions effortlessly from morning meetings to evening celebrations. The pearls are individually knotted for security and drape.',
    sizes: ['16 in', '18 in', '20 in'], stock: 11, gender: 'Women', occasion: 'Everyday',
  },
  {
    id: 'luna-earrings', slug: 'luna-diamond-drop-earrings', name: 'Luna Diamond Drop Earrings', category: 'Earrings', collection: 'Lunar Light',
    price: 72000, material: '18K White Gold', purity: '18K', stone: 'Natural Diamond', weightGrams: 2.4, rating: 4.9, reviews: 17,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'Fine diamond drops with movement, light and a whisper of midnight glamour.',
    longDescription: 'Luna earrings capture light from every angle. Set in rhodium-plated 18K white gold, each drop features three graduated diamonds that sway gently as you move. The lever-back mechanism ensures all-day security without compromising comfort. Designed for women who believe elegance is in the details.',
    sizes: ['One size'], stock: 5, gender: 'Women', occasion: 'Evening',
  },
  {
    id: 'serene-bangle', slug: 'serene-gold-bangle', name: 'Serene Gold Bangle', category: 'Bracelets', collection: 'Everyday Gold',
    price: 64500, compareAtPrice: 72000, material: '18K Gold', purity: '18K', stone: 'No stone', weightGrams: 12.5, rating: 4.7, reviews: 31,
    badge: 'Limited',
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1000&q=85',
    images: [
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'A sculptural gold bangle designed to layer beautifully or stand confidently alone.',
    longDescription: 'The Serene bangle is a statement in understated luxury. Sculpted from solid 18K gold and hand-polished to a mirror finish, its continuous oval form sits comfortably on the wrist. The slightly tapering profile catches light differently throughout the day, creating a warm, living shimmer that only real gold can offer.',
    sizes: ['Small', 'Medium', 'Large'], stock: 14, gender: 'Women', occasion: 'Everyday',
  },
  {
    id: 'flora-ring', slug: 'flora-diamond-band', name: 'Flora Diamond Band', category: 'Rings', collection: 'Garden of Light',
    price: 98000, material: '18K Rose Gold', purity: '18K', stone: 'Natural Diamond', weightGrams: 3.2, rating: 4.8, reviews: 19,
    image: 'https://images.unsplash.com/photo-1603561596112-db1d7e9e5b0f?auto=format&fit=crop&w=1000&q=85',
    images: [
      'https://images.unsplash.com/photo-1603561596112-db1d7e9e5b0f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'A delicate floral diamond band, made for stacking, celebrating and remembering.',
    longDescription: 'Inspired by the jasmine gardens of old Dhaka, the Flora band features micro-set diamonds arranged in a botanical pattern along the full circumference of 18K rose gold. The warm blush tone of the metal complements every skin tone, and the low-profile design makes it perfect for daily wear or stacking with other rings.',
    sizes: ['5', '6', '7', '8'], stock: 9, gender: 'Women', occasion: 'Anniversary',
  },
  {
    id: 'mira-pendant', slug: 'mira-gold-pendant', name: 'Mira Gold Pendant', category: 'Necklaces', collection: 'Everyday Gold',
    price: 51500, material: '18K Gold', purity: '18K', stone: 'No stone', weightGrams: 4.1, rating: 4.6, reviews: 12,
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1000&q=85',
    images: [
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515562141589-67f0d569b6e5?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'A polished pendant with an understated, personal silhouette.',
    longDescription: 'Mira is our most personal piece — a smooth, organically shaped 18K gold pendant that sits close to the heart. Its convex surface catches light in a warm glow, while the fine cable chain keeps the focus on the pendant itself. Engravable on the reverse for a private message.',
    sizes: ['18 in', '20 in'], stock: 17, gender: 'Women', occasion: 'Gift',
  },
  {
    id: 'halo-studs', slug: 'halo-diamond-studs', name: 'Halo Diamond Studs', category: 'Earrings', collection: 'Lunar Light',
    price: 67500, material: '18K White Gold', purity: '18K', stone: 'Natural Diamond', weightGrams: 1.8, rating: 4.9, reviews: 45,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=1000&q=85',
    images: [
      'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'Classic diamond studs encircled by light-catching pavé details.',
    longDescription: 'The Halo studs are our perennial best-seller — a central brilliant-cut diamond surrounded by a ring of micro-pavé diamonds, all set in 18K white gold. The result is a stud that looks far larger and more luminous than its carat weight suggests. Screw-back posts for absolute security.',
    sizes: ['One size'], stock: 12, gender: 'Women', occasion: 'Everyday',
  },
  {
    id: 'serein-chain', slug: 'serein-chain-bracelet', name: 'Serein Chain Bracelet', category: 'Bracelets', collection: 'Everyday Gold',
    price: 44000, material: '18K Yellow Gold', purity: '18K', stone: 'No stone', weightGrams: 6.8, rating: 4.7, reviews: 14,
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=85',
    images: [
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'A fine chain bracelet with subtle detailing for daily wear.',
    longDescription: 'Serein is the French word for the fine rain that falls from a cloudless sky — and this bracelet captures that same delicate beauty. Each link of the 18K yellow gold chain is individually soldered for strength, then polished to a soft satin finish. An adjustable clasp ensures a perfect fit.',
    sizes: ['Small', 'Medium', 'Large'], stock: 15, gender: 'Women', occasion: 'Everyday',
  },
  {
    id: 'eternal-band', slug: 'eternal-diamond-eternity-band', name: 'Eternal Diamond Eternity Band', category: 'Rings', collection: 'Bridal',
    price: 185000, material: '18K White Gold', purity: '18K', stone: 'Natural Diamond (1.2ct total)', weightGrams: 3.5, rating: 5.0, reviews: 8,
    badge: 'Premium',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1000&q=85',
    images: [
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'A full-circle eternity band symbolising love without end.',
    longDescription: 'Twenty-four matched brilliant-cut diamonds encircle this 18K white gold band, each hand-set in a shared-prong setting that maximises brilliance while minimising metal visibility. The result is a continuous ribbon of light — the ultimate symbol of eternal commitment.',
    sizes: ['5', '6', '7', '8'], stock: 4, gender: 'Women', occasion: 'Wedding',
  },
  {
    id: 'rani-choker', slug: 'rani-gold-choker', name: 'Rani Gold Choker', category: 'Necklaces', collection: 'Heritage',
    price: 142000, material: '22K Gold', purity: '22K', stone: 'No stone', weightGrams: 18.5, rating: 4.8, reviews: 9,
    badge: 'Heritage',
    image: 'https://images.unsplash.com/photo-1515562141589-67f0d569b6e5?auto=format&fit=crop&w=1000&q=85',
    images: [
      'https://images.unsplash.com/photo-1515562141589-67f0d569b6e5?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'A regal 22K gold choker inspired by Mughal jewellery traditions.',
    longDescription: 'The Rani Choker draws from centuries of South Asian jewellery-making tradition. Hand-wrought in pure 22K gold using the ancient filigree technique, this choker features intricate floral and paisley motifs that tell stories of royalty and devotion. A statement piece for weddings, celebrations, and the women who wear their heritage with pride.',
    sizes: ['14 in', '15 in', '16 in'], stock: 3, gender: 'Women', occasion: 'Wedding',
  },
  {
    id: 'chandelier-earrings', slug: 'chandelier-ruby-earrings', name: 'Chandelier Ruby Earrings', category: 'Earrings', collection: 'Heritage',
    price: 96000, material: '18K Yellow Gold', purity: '18K', stone: 'Natural Ruby', weightGrams: 5.2, rating: 4.7, reviews: 11,
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=85',
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'Cascading rubies set in gold filigree, inspired by chandelier artistry.',
    longDescription: 'These show-stopping earrings feature graduated natural rubies suspended from delicate 18K gold filigree work. Each ruby is bezel-set and swings freely, creating a cascade of rich red that dances with every movement. Omega clip backs distribute weight evenly for comfort during long celebrations.',
    sizes: ['One size'], stock: 6, gender: 'Women', occasion: 'Wedding',
  },
  {
    id: 'sovereign-ring', slug: 'sovereign-mens-signet', name: 'Sovereign Signet Ring', category: 'Rings', collection: 'Men\'s Collection',
    price: 78000, material: '18K Yellow Gold', purity: '18K', stone: 'Black Onyx', weightGrams: 9.5, rating: 4.8, reviews: 7,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1589674781759-c21c37956a44?auto=format&fit=crop&w=1000&q=85',
    images: [
      'https://images.unsplash.com/photo-1589674781759-c21c37956a44?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'A bold signet ring with black onyx centre — quiet authority on the hand.',
    longDescription: 'The Sovereign is designed for men who appreciate understated power. A cushion-cut black onyx sits flush in a heavy 18K gold setting, with brushed sides and a polished top surface. The interior is comfort-fit curved for all-day wear. Engravable with initials or a personal crest.',
    sizes: ['9', '10', '11', '12'], stock: 10, gender: 'Men', occasion: 'Everyday',
  },
  {
    id: 'jhumka-earrings', slug: 'jhumka-gold-earrings', name: 'Jhumka Gold Earrings', category: 'Earrings', collection: 'Heritage',
    price: 54000, material: '22K Gold', purity: '22K', stone: 'No stone', weightGrams: 7.3, rating: 4.9, reviews: 28,
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=85',
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'Traditional jhumka earrings in 22K gold — a celebration of Bengali craftsmanship.',
    longDescription: 'These classic jhumka earrings are hand-crafted in 22K gold using traditional Bengali goldsmithing techniques. The bell-shaped drops feature intricate granulation work and delicate chains that create a soft, musical movement. A timeless piece that connects modern women to centuries of cultural artistry.',
    sizes: ['One size'], stock: 20, gender: 'Women', occasion: 'Traditional',
  },
  {
    id: 'rose-pendant', slug: 'rose-sapphire-pendant', name: 'Rose Sapphire Pendant', category: 'Necklaces', collection: 'Garden of Light',
    price: 115000, material: '18K Rose Gold', purity: '18K', stone: 'Natural Blue Sapphire', weightGrams: 5.6, rating: 4.8, reviews: 6,
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1000&q=85',
    images: [
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'A vivid blue sapphire set in warm rose gold — where colour meets warmth.',
    longDescription: 'The Rose pendant features a 1.5ct natural blue sapphire, hand-selected for its velvety cornflower hue, cradled in an 18K rose gold bezel setting. A halo of micro-set diamonds adds brilliance without competing with the sapphire\'s depth. Includes an adjustable rose gold chain.',
    sizes: ['18 in', '20 in'], stock: 3, gender: 'Women', occasion: 'Gift',
  },
  {
    id: 'valor-bracelet', slug: 'valor-mens-bracelet', name: 'Valor Men\'s Bracelet', category: 'Bracelets', collection: 'Men\'s Collection',
    price: 88000, material: '18K Gold', purity: '18K', stone: 'No stone', weightGrams: 22.0, rating: 4.6, reviews: 5,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=85',
    images: [
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'A substantial 18K gold link bracelet designed for the modern gentleman.',
    longDescription: 'The Valor bracelet is engineered for men who appreciate weight and substance. Solid 18K gold links are individually cast and then assembled by hand, creating a chain with satisfying heft and a commanding presence on the wrist. The fold-over clasp integrates seamlessly with the link design.',
    sizes: ['Medium', 'Large', 'X-Large'], stock: 7, gender: 'Men', occasion: 'Everyday',
  },
  {
    id: 'twilight-ring', slug: 'twilight-sapphire-ring', name: 'Twilight Sapphire Ring', category: 'Rings', collection: 'Garden of Light',
    price: 155000, material: '18K White Gold', purity: '18K', stone: 'Natural Blue Sapphire + Diamond', weightGrams: 4.8, rating: 4.9, reviews: 3,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'A vivid sapphire flanked by tapered baguette diamonds — drama on the hand.',
    longDescription: 'The Twilight ring features a deep-blue cushion-cut natural sapphire flanked by two tapered baguette diamonds, all set in 18K white gold. The design is inspired by Art Deco geometry while remaining entirely modern. A collector\'s ring for those who value rare beauty.',
    sizes: ['5', '6', '7', '8'], stock: 2, gender: 'Women', occasion: 'Engagement',
  },
];

export const collections = [
  { name: 'Timeless Icons', slug: 'timeless-icons', description: 'Our enduring signatures that transcend seasons.' },
  { name: 'Lunar Light', slug: 'lunar-light', description: 'Diamond pieces that capture moonlit elegance.' },
  { name: 'Everyday Gold', slug: 'everyday-gold', description: 'Refined gold for the rituals of daily life.' },
  { name: 'Garden of Light', slug: 'garden-of-light', description: 'Gemstones and botanicals in precious metals.' },
  { name: 'Heritage', slug: 'heritage', description: 'Traditional South Asian craftsmanship, reimagined.' },
  { name: 'Bridal', slug: 'bridal', description: 'For the day that changes everything.' },
  { name: "Men's Collection", slug: 'mens-collection', description: 'Bold, understated pieces for the modern gentleman.' },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1', name: 'Nusrat Jahan', location: 'Dhaka', rating: 5,
    text: 'The Celeste ring exceeded every expectation. The craftsmanship is extraordinary — my fiancé was speechless. Swornali made our engagement unforgettable.',
    product: 'Celeste Solitaire Ring',
  },
  {
    id: 't2', name: 'Raihan Ahmed', location: 'Chittagong', rating: 5,
    text: 'Bought the Sovereign signet for myself. The weight, the finish, the onyx — everything speaks quality. This is real jewellery for men.',
    product: 'Sovereign Signet Ring',
  },
  {
    id: 't3', name: 'Farida Begum', location: 'Sylhet', rating: 5,
    text: 'The Jhumka earrings are absolutely beautiful. They remind me of my grandmother\'s jewellery but feel completely modern. I wear them every week.',
    product: 'Jhumka Gold Earrings',
  },
  {
    id: 't4', name: 'Tasnim Rahman', location: 'Dhaka', rating: 5,
    text: 'Ordered the Aurelia Pearl Necklace as a gift for my mother. The packaging was exquisite, delivery was fast, and her reaction was priceless.',
    product: 'Aurelia Pearl Necklace',
  },
];

export const faqs = [
  { q: 'How do I find my ring size?', a: 'Visit any Swornali Jewellers store for a complimentary sizing, or use our printable ring sizer guide available on each ring product page. We recommend professional sizing for the most accurate fit.' },
  { q: 'Are your diamonds conflict-free?', a: 'Yes. Every diamond used by Swornali Jewellers is sourced in full compliance with the Kimberley Process and is accompanied by certification verifying its ethical origin.' },
  { q: 'Do you offer engraving?', a: 'Selected pieces can be engraved with initials, dates, or short messages. Look for the "Engravable" label on eligible product pages, or contact our team for custom engraving requests.' },
  { q: 'What is your return policy?', a: 'We offer a 14-day return policy on unworn, unaltered pieces in their original packaging. Custom and engraved jewellery is non-returnable. Refunds are processed within 5-7 business days.' },
  { q: 'How should I care for my jewellery?', a: 'Store each piece separately in the Swornali pouch provided. Avoid contact with perfumes, lotions, and chlorine. Clean gently with a soft cloth. For deep cleaning, visit any Swornali store for complimentary ultrasonic cleaning.' },
  { q: 'Do you ship internationally?', a: 'Currently we ship across Bangladesh with complimentary insured delivery. International shipping to select countries is available — please contact us for rates and timelines.' },
];

// Gold & Silver rate per gram (BDT) — BAJUS Official Bangladesh Rates
export const goldRates: Record<string, number> = {
  '18K': 16110, // ~৳1,87,907 per bhori
  '21K': 18760, // ~৳2,18,817 per bhori
  '22K': 19640, // ~৳2,29,081 per bhori
  '24K': 21450, // Pure assay
  'Silver': 370, // ~৳4,316 per bhori (22K pure silver)
};

export const formatPrice = (price: number) => `৳${price.toLocaleString('en-BD')}`;

export const findProduct = (slug: string) => products.find((p) => p.slug === slug);

export const getProductsByCategory = (category: Category) => products.filter((p) => p.category === category);

export const getProductsByCollection = (collection: string) => products.filter((p) => p.collection === collection);

export const searchProducts = (query: string) => {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.collection.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q) ||
      p.stone.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
};

export const sortProducts = (items: Product[], sort: string) => {
  const sorted = [...items];
  switch (sort) {
    case 'price-asc': return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc': return sorted.sort((a, b) => b.price - a.price);
    case 'rating': return sorted.sort((a, b) => b.rating - a.rating);
    case 'name': return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'new':
    default: return sorted;
  }
};

export const materials = ['18K Yellow Gold', '18K White Gold', '18K Rose Gold', '18K Gold', '22K Gold'];
export const stones = ['Natural Diamond', 'Natural Diamond (0.5ct)', 'Natural Diamond (1.2ct total)', 'Natural Blue Sapphire', 'Natural Blue Sapphire + Diamond', 'Natural Ruby', 'Black Onyx', 'Freshwater Pearl', 'No stone'];
export const occasions = ['Everyday', 'Engagement', 'Wedding', 'Anniversary', 'Evening', 'Gift', 'Traditional'];
