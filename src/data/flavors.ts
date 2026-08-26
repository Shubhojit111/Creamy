export interface Flavor {
  id: string;
  name: string;
  subname: string;
  headline: string;
  headlineLine1: string;
  headlineLine2: string;
  subtitle: string;
  description: string;
  calories: number;
  caloriesLabel: string;
  price: number;
  rating: number;
  reviewsCount: string;
  reviewsTotal: number;
  image: string;
  heroImage: string;
  gallery: { id: number; src: string; label: string }[];
  color: {
    primary: string;
    outer: string;
    card: string;
    secondaryPill: string;
    subtext: string;
    accent: string;
    glow: string;
    swatch: string;
  };
  sizes: { label: string; grams: string; priceMultiplier: number; price: number; subPrice: number }[];
  tags: string[];
  nutrition: {
    fat: string;
    netCarbs: string;
    protein: string;
    caloriesPerPint: number;
    sugarAdded: string;
  };
  ingredients: string;
  howItsMade: string;
  sustainability: string;
  story: string;
  headlineStory: string;
}

export const FLAVORS: Flavor[] = [
  {
    id: 'cookies',
    name: 'Cookies & Kräm',
    subname: 'Rich Cocoa & Biscuit Bits',
    headline: 'Taste Joy in Every Bite',
    headlineLine1: 'Taste Joy in',
    headlineLine2: 'Every Bite',
    subtitle: "They aren't just about incredible sound, they're designed for your well-being. With immersive audio and noise cancellation.",
    description: 'Classic cookies & cream done right. Rich, creamy plant-based ice cream loaded with crunchy chocolate cookies for the perfect bite in every scoop.',
    calories: 320,
    caloriesLabel: '1 Pint 320 Calories',
    price: 6.99,
    rating: 4.8,
    reviewsCount: '12K+',
    reviewsTotal: 12436,
    image: '/cookies_transparent.png',
    heroImage: '/cookies_hero_pdp.png',
    gallery: [
      { id: 0, src: '/cookies_hero_pdp.png', label: 'Tub with Scoops' },
      { id: 1, src: '/gallery_1.png', label: 'Cookie Bits Studio' },
      { id: 2, src: '/cookie_scoop.png', label: 'Single Giant Scoop' },
      { id: 3, src: '/cookies_bowl.png', label: 'Artisanal Bowl' },
      { id: 4, src: '/pdp_story_tubs.png', label: 'Tubs Collection' },
    ],
    color: {
      primary: '#9c5c47',
      outer: '#da866c',
      card: '#9f5d49',
      secondaryPill: '#5c3427',
      subtext: '#f2cac0',
      accent: '#e6977e',
      glow: 'rgba(218, 134, 108, 0.45)',
      swatch: '#4A2818',
    },
    sizes: [
      { label: '16 oz (1 Pint)', grams: '473ml', priceMultiplier: 1.0, price: 6.99, subPrice: 5.94 },
      { label: '32 oz (2 Pints)', grams: '946ml', priceMultiplier: 1.85, price: 12.99, subPrice: 11.04 },
      { label: '64 oz (4 Pints)', grams: '1892ml', priceMultiplier: 3.4, price: 23.99, subPrice: 20.39 },
    ],
    tags: ['Oreo Cookie Crunch', 'No Added Sugar', 'Rich & Decadent', 'Plant-Based'],
    nutrition: {
      fat: '14g',
      netCarbs: '6g',
      protein: '7g',
      caloriesPerPint: 320,
      sugarAdded: '0g',
    },
    ingredients: 'Swedish whole cream, dark chocolate biscuit chunks (cocoa powder, wheat flour, coconut oil, sea salt), allulose, monk fruit extract, chicory root plant fiber, Bourbon vanilla bean, natural enzymes.',
    howItsMade: 'Slow-churned at sub-zero Swedish temperatures to minimize ice crystal formation and maximize velvety overrun texture. Hand-swirled with freshly crushed chocolate biscuits.',
    sustainability: 'Packaged in 100% recyclable, FSC-certified paperboard tubs printed with organic soy-based inks. Delivered in reusable thermal insulation with carbon-neutral dry ice.',
    story: 'Dark baked cocoa wafers crushed into rich sweet cream with a hint of sea salt for the ultimate nostalgic crunch.',
    headlineStory: 'Double-Crushed Cocoa Biscuits',
  },
  {
    id: 'mint',
    name: 'Mint Chokladchip',
    subname: 'Crisp Mint & Chocolate Shavings',
    headline: 'Taste Joy in Every Bite',
    headlineLine1: 'Taste Joy in',
    headlineLine2: 'Every Bite',
    subtitle: "They aren't just about incredible sound, they're designed for your well-being. With immersive audio and noise cancellation.",
    description: 'Crisp mountain peppermint swirled into velvety cream, loaded with fine Belgian dark chocolate flakes that melt on contact.',
    calories: 270,
    caloriesLabel: '1 Pint 270 Calories',
    price: 6.99,
    rating: 4.88,
    reviewsCount: '9.5K+',
    reviewsTotal: 9540,
    image: '/mint_transparent.png',
    heroImage: '/mint_tub.png',
    gallery: [
      { id: 0, src: '/mint_tub.png', label: 'Mint Tub' },
      { id: 1, src: '/gallery_5.png', label: 'Mint Leaves Studio' },
      { id: 2, src: '/mint_transparent.png', label: 'Scoop View' },
      { id: 3, src: '/cookies_bowl.png', label: 'Artisanal Bowl' },
      { id: 4, src: '/pdp_story_tubs.png', label: 'Tubs Collection' },
    ],
    color: {
      primary: '#4ea162',
      outer: '#74d68b',
      card: '#52a666',
      secondaryPill: '#2b663a',
      subtext: '#cbf5d4',
      accent: '#98ebb0',
      glow: 'rgba(116, 214, 139, 0.45)',
      swatch: '#4EA162',
    },
    sizes: [
      { label: '16 oz (1 Pint)', grams: '473ml', priceMultiplier: 1.0, price: 6.99, subPrice: 5.94 },
      { label: '32 oz (2 Pints)', grams: '946ml', priceMultiplier: 1.85, price: 12.99, subPrice: 11.04 },
      { label: '64 oz (4 Pints)', grams: '1892ml', priceMultiplier: 3.4, price: 23.99, subPrice: 20.39 },
    ],
    tags: ['Fresh Peppermint', 'Belgian Chocolate Chips', 'Keto Certified', 'Plant-Based'],
    nutrition: {
      fat: '13g',
      netCarbs: '5g',
      protein: '6g',
      caloriesPerPint: 270,
      sugarAdded: '0g',
    },
    ingredients: 'Natural spearmint extract, dark chocolate chunks, cultured cream, non-GMO soluble plant fiber, stevia leaf, monk fruit.',
    howItsMade: 'Cold-pressed wild mint essence blended gently with slow-churned sweet cream, studded with shaved dark chocolate ribbons.',
    sustainability: 'Direct farm sourced herbs and 100% recyclable FSC certified compostable packaging.',
    story: 'Cool spearmint oil pressed from organic mountain herbs, folded with crisp dark Belgian chocolate flakes that melt on contact.',
    headlineStory: 'Crisp Mountain Peppermint',
  },
  {
    id: 'strawberry',
    name: 'Strawberry Swirl',
    subname: 'Nordic Summer Strawberry',
    headline: 'Taste Joy in Every Bite',
    headlineLine1: 'Taste Joy in',
    headlineLine2: 'Every Bite',
    subtitle: "They aren't just about incredible sound, they're designed for your well-being. With immersive audio and noise cancellation.",
    description: 'Ripe wild Nordic strawberries simmered into glossy fruit ribbons, swirled into luscious cultured cream for an authentic berry taste.',
    calories: 270,
    caloriesLabel: '1 Pint 270 Calories',
    price: 6.99,
    rating: 4.92,
    reviewsCount: '11K+',
    reviewsTotal: 11200,
    image: '/strawberry_transparent.png',
    heroImage: '/strawberry_tub.png',
    gallery: [
      { id: 0, src: '/strawberry_tub.png', label: 'Strawberry Tub' },
      { id: 1, src: '/gallery_3.png', label: 'Fresh Strawberries Studio' },
      { id: 2, src: '/strawberry_transparent.png', label: 'Scoop View' },
      { id: 3, src: '/bowl_story.png', label: 'Dessert Bowl' },
      { id: 4, src: '/pdp_story_tubs.png', label: 'Tubs Collection' },
    ],
    color: {
      primary: '#cc4663',
      outer: '#f588a0',
      card: '#d14a68',
      secondaryPill: '#7c1f34',
      subtext: '#fed1dc',
      accent: '#ff94aa',
      glow: 'rgba(245, 136, 160, 0.45)',
      swatch: '#CC4663',
    },
    sizes: [
      { label: '16 oz (1 Pint)', grams: '473ml', priceMultiplier: 1.0, price: 6.99, subPrice: 5.94 },
      { label: '32 oz (2 Pints)', grams: '946ml', priceMultiplier: 1.85, price: 12.99, subPrice: 11.04 },
      { label: '64 oz (4 Pints)', grams: '1892ml', priceMultiplier: 3.4, price: 23.99, subPrice: 20.39 },
    ],
    tags: ['Real Wild Strawberries', 'No Sugar Rush', 'Velvety Cream', 'Plant-Based'],
    nutrition: {
      fat: '12g',
      netCarbs: '5g',
      protein: '6g',
      caloriesPerPint: 270,
      sugarAdded: '0g',
    },
    ingredients: 'Ripe Swedish strawberries, strawberry fruit swirl ribbons, cultured cream, organic birch xylitol, natural vanilla bean.',
    howItsMade: 'Summer strawberries simmered at low heat to preserve bright vitamin C and pure ruby color, folded into whipped Swedish cream.',
    sustainability: 'Wild-harvested berries supporting local Nordic growers and renewable energy packaging.',
    story: 'Sun-ripened wild Nordic strawberries simmered into glossy fruit ribbons, swirled into luscious cultured cream.',
    headlineStory: 'Wild Nordic Strawberry Ribbons',
  },
  {
    id: 'fudge',
    name: 'Chocolate Fudge Brownie',
    subname: 'Decadent Dark Cocoa & Fudge',
    headline: 'Taste Joy in Every Bite',
    headlineLine1: 'Taste Joy in',
    headlineLine2: 'Every Bite',
    subtitle: "They aren't just about incredible sound, they're designed for your well-being. With immersive audio and noise cancellation.",
    description: 'Double chocolate bliss. Creamy dark chocolate ice cream packed with chewy homemade keto brownie bites and swirls of rich chocolate fudge.',
    calories: 290,
    caloriesLabel: '1 Pint 290 Calories',
    price: 6.99,
    rating: 4.95,
    reviewsCount: '14K+',
    reviewsTotal: 14200,
    image: '/fudge_transparent.png',
    heroImage: '/fudge_tub.png',
    gallery: [
      { id: 0, src: '/fudge_tub.png', label: 'Fudge Tub' },
      { id: 1, src: '/gallery_1.png', label: 'Chocolate Chunks' },
      { id: 2, src: '/fudge_transparent.png', label: 'Scoop View' },
      { id: 3, src: '/cookies_bowl.png', label: 'Artisanal Bowl' },
      { id: 4, src: '/pdp_story_tubs.png', label: 'Tubs Collection' },
    ],
    color: {
      primary: '#6b3724',
      outer: '#91533d',
      card: '#6f3a27',
      secondaryPill: '#3f1f14',
      subtext: '#e8c2b5',
      accent: '#d48870',
      glow: 'rgba(145, 83, 61, 0.45)',
      swatch: '#6B3724',
    },
    sizes: [
      { label: '16 oz (1 Pint)', grams: '473ml', priceMultiplier: 1.0, price: 6.99, subPrice: 5.94 },
      { label: '32 oz (2 Pints)', grams: '946ml', priceMultiplier: 1.85, price: 12.99, subPrice: 11.04 },
      { label: '64 oz (4 Pints)', grams: '1892ml', priceMultiplier: 3.4, price: 23.99, subPrice: 20.39 },
    ],
    tags: ['Chewy Brownie Bites', 'Fudge Ribbons', 'No Sugar Rush', 'Plant-Based'],
    nutrition: {
      fat: '15g',
      netCarbs: '6g',
      protein: '8g',
      caloriesPerPint: 290,
      sugarAdded: '0g',
    },
    ingredients: 'Dutch processed cocoa, almond flour keto brownie dough, cacao butter, allulose, monk fruit, cultured cream.',
    howItsMade: 'Artisanal cocoa slow-churned with organic cream, layered with warm hand-folded fudge ribbons and baked brownie chunks.',
    sustainability: '100% Fair Trade Certified cocoa beans directly supporting sustainable agroforestry farming.',
    story: 'Melt-in-your-mouth chewy brownie chunks blended with deep roasted cocoa fudge swirl.',
    headlineStory: 'Double-Dutch Cocoa Fudge',
  },
  {
    id: 'caramel',
    name: 'Salted Caramel',
    subname: 'Golden Caramel & Sea Salt',
    headline: 'Taste Joy in Every Bite',
    headlineLine1: 'Taste Joy in',
    headlineLine2: 'Every Bite',
    subtitle: "They aren't just about incredible sound, they're designed for your well-being. With immersive audio and noise cancellation.",
    description: 'Golden buttery caramel ice cream swirled with thick salted caramel ribbons and a pinch of hand-harvested flaky sea salt.',
    calories: 260,
    caloriesLabel: '1 Pint 260 Calories',
    price: 6.99,
    rating: 4.89,
    reviewsCount: '8.8K+',
    reviewsTotal: 8850,
    image: '/caramel_transparent.png',
    heroImage: '/caramel_tub.png',
    gallery: [
      { id: 0, src: '/caramel_tub.png', label: 'Caramel Tub' },
      { id: 1, src: '/gallery_4.png', label: 'Caramel Drizzle' },
      { id: 2, src: '/caramel_transparent.png', label: 'Scoop View' },
      { id: 3, src: '/bowl_story.png', label: 'Dessert Bowl' },
      { id: 4, src: '/pdp_story_tubs.png', label: 'Tubs Collection' },
    ],
    color: {
      primary: '#b87c3a',
      outer: '#df9e55',
      card: '#bd803e',
      secondaryPill: '#6b4315',
      subtext: '#f7dfbe',
      accent: '#fcd397',
      glow: 'rgba(223, 158, 85, 0.45)',
      swatch: '#B87C3A',
    },
    sizes: [
      { label: '16 oz (1 Pint)', grams: '473ml', priceMultiplier: 1.0, price: 6.99, subPrice: 5.94 },
      { label: '32 oz (2 Pints)', grams: '946ml', priceMultiplier: 1.85, price: 12.99, subPrice: 11.04 },
      { label: '64 oz (4 Pints)', grams: '1892ml', priceMultiplier: 3.4, price: 23.99, subPrice: 20.39 },
    ],
    tags: ['Flaky Sea Salt', 'Golden Butter Caramel', 'Zero Added Sugar', 'Keto Certified'],
    nutrition: {
      fat: '13g',
      netCarbs: '5g',
      protein: '6g',
      caloriesPerPint: 260,
      sugarAdded: '0g',
    },
    ingredients: 'Swedish cultured butter, caramelized allulose, sea salt crystals, Bourbon vanilla, prebiotic dietary fiber.',
    howItsMade: 'Slow kettle-cooked caramel crafted with cultured cream and finished with Icelandic sea salt flakes.',
    sustainability: 'Renewable energy dairy processing and carbon neutral refrigerated delivery.',
    story: 'Kettle-cooked golden butter caramel with a touch of mineral-rich sea salt.',
    headlineStory: 'Artisan Sea Salt Caramel',
  },
  {
    id: 'vanilla',
    name: 'Swedish Vanilj',
    subname: 'Creamy Classic Vanilla',
    headline: 'Taste Joy in Every Bite',
    headlineLine1: 'Taste Joy in',
    headlineLine2: 'Every Bite',
    subtitle: "They aren't just about incredible sound, they're designed for your well-being. With immersive audio and noise cancellation.",
    description: 'Classic vanilla bean done right. Rich, creamy plant-based ice cream loaded with pure Bourbon vanilla for the perfect floral sweetness in every scoop.',
    calories: 240,
    caloriesLabel: '1 Pint 240 Calories',
    price: 6.99,
    rating: 4.9,
    reviewsCount: '10K+',
    reviewsTotal: 10400,
    image: '/vanilla_transparent.png',
    heroImage: '/vanilla_tub.png',
    gallery: [
      { id: 0, src: '/vanilla_tub.png', label: 'Vanilla Tub' },
      { id: 1, src: '/gallery_2.png', label: 'Vanilla Bean Setup' },
      { id: 2, src: '/vanilla_transparent.png', label: 'Scoop View' },
      { id: 3, src: '/bowl_story.png', label: 'Dessert Bowl' },
      { id: 4, src: '/pdp_story_tubs.png', label: 'Tubs Collection' },
    ],
    color: {
      primary: '#459ab8',
      outer: '#67c1e4',
      card: '#499ebc',
      secondaryPill: '#28586c',
      subtext: '#c0e8f8',
      accent: '#ffe89c',
      glow: 'rgba(103, 193, 228, 0.45)',
      swatch: '#459AB8',
    },
    sizes: [
      { label: '16 oz (1 Pint)', grams: '473ml', priceMultiplier: 1.0, price: 6.99, subPrice: 5.94 },
      { label: '32 oz (2 Pints)', grams: '946ml', priceMultiplier: 1.85, price: 12.99, subPrice: 11.04 },
      { label: '64 oz (4 Pints)', grams: '1892ml', priceMultiplier: 3.4, price: 23.99, subPrice: 20.39 },
    ],
    tags: ['Bourbon Vanilla Bean', 'No Added Sugar', 'Swedish Light Style', 'Plant-Based'],
    nutrition: {
      fat: '11g',
      netCarbs: '5g',
      protein: '6g',
      caloriesPerPint: 240,
      sugarAdded: '0g',
    },
    ingredients: 'Fresh Swedish cream, Bourbon vanilla bean, allulose, monk fruit, skim milk, vegetable fiber.',
    howItsMade: 'Infused with whole crushed Madagascar vanilla pods and aerated for signature Scandinavian lightness.',
    sustainability: 'Sustainably farmed vanilla pods directly supporting Madagascar cooperative farmers.',
    story: 'Sourced directly from Bourbon Island Madagascar, double-steeped in fresh Swedish cream for floral sweetness.',
    headlineStory: 'Pure Bourbon Vanilla Bean',
  },
];
