// NAVIGATION
export const NAV_LINKS = [
  { href: '/', key: 'features', label: 'Features' },
  { href: '/', key: 'how fitflow works', label: 'How FitFlow Works?' },
  { href: '/', key: 'Plans', label: 'Plans' },
  { href: '/', key: 'Community ', label: 'Community ' },
  { href: '/', key: 'Contact_us', label: 'Contact Us' },
];


// FEATURES SECTION
export const FEATURES = [
  {
    title: 'Personalized Workout Plans',
    src: '/plans.png',
    variant: 'green',
    description:
      'Get custom workout routines tailored to your goals, fitness level, and schedule',
    alt : 'plan'
  },
  {
    title: 'Expert Guidance',
    src: '/guidance.png',
    variant: 'green',
    description:
      "Access a library of videos and tips from certified trainers to perfect your form and stay motivated.",
     alt : 'guidance'
  },
  {
    title: 'Community Support',
    src: '/community.png',
    variant: 'green',
    description:
      'Join challenges, connect with friends, and get support from a global community of fitness enthusiasts.',
       alt : 'community'
  },

];

export const PLANS = [
    {
      name: "Basic Plan",
      price: "$19",
      period: "/month",
      priceId: "price_1RwK3qFhU6M0huUm5Se10nV4", // From Stripe

      features: [
        "Access to basic workout library",
        "Community forum access",
        "Standard support",
      ],
      isPopular: false,
    },
    {
      name: "Pro Plan",
      price: "$49",
      period: "/month",
      priceId: "price_1RwK4SFhU6M0huUmsVnknoOH", // From Stripe
      features: [
        "All Basic features",
        "Personalized workout plans",
        "Video guides from certified trainers",
        "Advanced analytics",
      ],
      isPopular: true,
    },
    {
      name: "Premium Plan",
      price: "$99",
      period: "/month",
      priceId: "price_1RwK58FhU6M0huUmpk40cT1q", // From Stripe
      features: [
        "All Pro features",
        "One-on-one virtual coaching",
        "Exclusive challenges and content",
        "Priority support",
      ],
      isPopular: false,
    },
  ];
// FOOTER SECTION
  export const FOOTERLINKS = [
    { title: "Product", links: ["Features", "Pricing", "Integrations"] },
    { title: "Company", links: ["About Us", "Contact", "Careers"] },
    { title: "Legal", links: ["Privacy Policy", "Terms of Service"] },
  ];




export const SOCIALS = {
  title: 'Social',
  links: [
    '/facebook.svg',
    '/instagram.svg',
    '/twitter.svg',
    '/youtube.svg',
    '/wordpress.svg',
  ],
};