export const services = [
  {
    id: "1",
    name: "Residential Interior Design",
    desc: "Transform your home into a stylish and functional haven, tailored to your personal taste.",
    icon: "fas fa-home",
    image: "/images/services/residential.jpg", // Local image path
  },
  {
    id: "2",
    name: "Office Interior Design",
    desc: "Create modern, productive workspaces that inspire creativity and enhance efficiency.",
    icon: "fas fa-briefcase",
    image: "/images/services/office.jpg", // Local image path
  },
  {
    id: "3",
    name: "Renovations",
    desc: "Revamp and refresh your spaces with expert renovation services tailored to your vision.",
    icon: "fas fa-sync-alt",
    image: "/images/services/renovation.jpg", // Local image path
  },
  {
    id: "4",
    name: "Space Planning",
    desc: "Maximize the potential of your space with professional layout and planning expertise.",
    icon: "fas fa-ruler-combined",
    image: "/images/services/space-planning.jpg", // Local image path
  },
  {
    id: "5",
    name: "Lighting Design",
    desc: "Enhance your interiors with elegant and functional lighting solutions.",
    icon: "fas fa-lightbulb",
    image: "/images/services/lighting.jpg", // Local image path
  },
];

export const projects = [
  {
    id: "1",
    title: "Kingeero Rita Echuria",
    desc: "A sleek and functional design for urban living in Nairobi.",
    image: "/images/kingeero/After/after1.jpg", // Featured image
    before: ["/images/kingeero/Before/before_1.jpg"],
    after: [
      "/images/kingeero/After/after1.jpg",
      "/images/kingeero/After/after2.jpg",
      "/images/kingeero/After/after3.jpg",
      "/images/kingeero/After/after4.jpg",
      "/images/kingeero/After/after5.jpg",
      "/images/kingeero/After/after6.jpg",
    ],
  },
  {
    id: "2",
    title: "Embakasi Home",
    desc: "A serene and luxurious retreat inspired by Kenyan coastlines.",
    image: "/images/Embakasi/After/after6.jpg", // Featured image
    before: [
      "/images/Embakasi/Before/before1.jpg",
      "/images/Embakasi/Before/before2.jpg",
      "/images/Embakasi/Before/before3.jpg",
    ],
    after: [
      "/images/Embakasi/After/after1.jpg",
      "/images/Embakasi/After/after2.jpg",
      "/images/Embakasi/After/after3.jpg",
      "/images/Embakasi/After/after4.jpg",
      "/images/Embakasi/After/after5.jpg",
      "/images/Embakasi/After/after6.jpg",
    ],
  },
  {
    id: "3",
    title: "KWS Amboseli National Park",
    desc: "A tranquil and serene retreat in the heart of Amboseli National Park.",
    image: "/images/Amboseli/before3.jpg", // Featured image
    before: [
      "/images/Amboseli/before1.jpg",
      "/images/Amboseli/before2.jpg",
      "/images/Amboseli/before3.jpg",
    ],
    after: [
      "/images/Amboseli/after1.jpg",
      "/images/Amboseli/after2.jpg",
      "/images/Amboseli/after3.jpg",
      "/images/Amboseli/after4.jpg",
      "/images/Amboseli/after5.jpg",
      "/images/Amboseli/after6.jpg",
    ],
  },
];

export const testimonials = [
  {
    image: "/images/testimonials/client1.jpg", // Local image path
    name: "Jane Wanjiru",
    message:
      "Their designs transformed my home into a space I love. Highly recommended!",
  },
  {
    image: "/images/testimonials/client2.jpg", // Local image path
    name: "Michael Otieno",
    message:
      "Our office now inspires creativity and productivity thanks to their expertise.",
  },
  {
    image: "/images/testimonials/client3.jpg", // Local image path
    name: "Lydia Nduta",
    message:
      "The lighting solutions they provided completely changed my living space. Amazing work!",
  },
];

export const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines depend on the scope of the project. Most designs take 2–6 weeks.",
  },
  {
    question: "Do you offer services outside Nairobi?",
    answer:
      "Yes, we work with clients across Kenya, including coastal and upcountry regions.",
  },
  {
    question: "Can I request a consultation before committing?",
    answer:
      "Absolutely! We offer free initial consultations to discuss your needs.",
  },
  {
    question: "Do you handle renovations?",
    answer:
      "Yes, we specialize in transforming outdated spaces into stunning interiors.",
  },
  {
    question: "What is your pricing structure?",
    answer:
      "Our pricing depends on the project’s complexity and size. Contact us for a custom quote.",
  },
];

export const blogs = [
  {
    id: "1",
    title: "How to Turn Your House into a Home",
    image: "/images/residential.jpg",
    description: "Simple hacks for adding warmth and character to your space.",
    date: "2024-11-01",
    content: `
      <p><i class="fas fa-home"></i> Have you ever walked into someone’s house and thought, <em>‘Wow, this place feels like home!’</em>? It's not about expensive furniture or a massive space—it’s the vibe. Making your house feel like home is about adding personal touches that bring out <strong>you</strong>.</p>
      <p><i class="fas fa-couch"></i> Start with basics: cozy cushions, throw blankets, and a few <em>statement pieces</em>. <i class="fas fa-leaf"></i> Plants? They’re a game-changer! Even if you're not a plant parent, easy-to-care-for options like snake plants or pothos are perfect.</p>
      <p><i class="fas fa-palette"></i> Finally, make your walls speak. Add a gallery wall with family photos or art pieces from local artists. If you’re feeling bold, try a feature wall with a splash of color.</p>
      <p><i class="fas fa-heart"></i> The key? Authenticity. Don't worry about trends—create a space that feels <em>yours</em>, and trust me, it’ll always feel like home.</p>
    `,
    comments: [
      {
        user: "Shiko from Nakuru",
        icon: "fas fa-smile",
        comment:
          "Totally agree about plants being a game-changer. Snake plants are so easy to care for!",
      },
      {
        user: "James W.",
        icon: "fas fa-thumbs-up",
        comment:
          "Loved the tip about gallery walls. I just added one to my living room, and it looks amazing!",
      },
    ],
    metadata: {
      title: "How to Turn Your House into a Home",
      description:
        "Learn simple tips to add warmth, character, and authenticity to your living space.",
      keywords: [
        "home decor tips",
        "Kenyan interiors",
        "personalized spaces",
        "plants in homes",
      ],
    },
  },
  {
    id: "2",
    title: "Top Interior Design Trends for 2024",
    image: "/images/galla-6.jpg",
    description:
      "Explore the styles and trends that will define interiors in the upcoming year.",
    date: "2024-11-10",
    content: `
      <p><i class="fas fa-lightbulb"></i> Interior design trends are ever-evolving, and 2024 is no exception. The focus this year? <strong>Natural elements</strong>, <strong>bold colors</strong>, and <strong>sustainability</strong>.</p>
      <h3>1. Bring Nature Indoors</h3>
      <p><i class="fas fa-leaf"></i> Think plants, natural wood, and earthy textures. From rattan furniture to jute rugs, these elements bring warmth and calm into any room.</p>
      <h3>2. Bold Colors</h3>
      <p><i class="fas fa-palette"></i> Neutral tones are taking a backseat, as vibrant colors like terracotta, emerald green, and mustard yellow steal the show. A pop of bold color can transform your walls, furniture, or accessories.</p>
      <h3>3. Sustainable Choices</h3>
      <p><i class="fas fa-recycle"></i> Eco-friendly materials like bamboo, recycled wood, and upcycled furniture are making their mark. Sustainability is not just a trend—it’s the future.</p>
    `,
    comments: [
      {
        user: "Fatma A.",
        icon: "fas fa-heart",
        comment:
          "Loving the bold colors trend! Terracotta is perfect for my living room.",
      },
      {
        user: "Peter K.",
        icon: "fas fa-thumbs-up",
        comment:
          "Natural wood and plants are my go-to. Thanks for the inspiration!",
      },
    ],
    metadata: {
      title: "Top Interior Design Trends for 2024",
      description:
        "Discover the top interior design trends for 2024, including natural elements, bold colors, and sustainable materials.",
      keywords: [
        "interior design trends",
        "2024 design",
        "sustainable interiors",
        "bold colors",
        "Kenyan home trends",
      ],
    },
  },
  {
    id: "3",
    title: "Lighting Design: The Secret to a Perfect Room",
    image: "/images/galla-5.jpg",
    description:
      "Learn how to use lighting to set the mood and enhance your interior design.",
    date: "2024-11-16",
    content: `
      <p><i class="fas fa-lightbulb"></i> Lighting is everything in interior design. It’s not just about brightening a space; it’s about creating an atmosphere.</p>
      <h3>1. Ambient Lighting</h3>
      <p><i class="fas fa-sun"></i> This is your room’s main source of light. Ceiling fixtures, chandeliers, or recessed lighting provide a warm, consistent glow.</p>
      <h3>2. Task Lighting</h3>
      <p><i class="fas fa-lamp"></i> Focused lighting for specific tasks, like reading lamps or under-cabinet kitchen lights. They’re practical but stylish!</p>
      <h3>3. Accent Lighting</h3>
      <p><i class="fas fa-star"></i> Highlight specific features in your room, like a piece of art or a bookshelf. Accent lights add depth and drama.</p>
      <p>Lighting can make or break your design, so choose wisely!</p>
    `,
    comments: [
      {
        user: "Ken M.",
        icon: "fas fa-star",
        comment:
          "Accent lighting has changed my bedroom completely. It feels so cozy now!",
      },
      {
        user: "Njeri W.",
        icon: "fas fa-lightbulb",
        comment:
          "Task lighting in the kitchen was a game-changer. Thanks for the tips!",
      },
    ],
    metadata: {
      title: "Lighting Design: The Secret to a Perfect Room",
      description:
        "Discover how to use ambient, task, and accent lighting to enhance your interiors.",
      keywords: [
        "lighting design",
        "Kenyan interiors",
        "accent lighting",
        "task lighting",
        "ambient lighting",
      ],
    },
  },
];
