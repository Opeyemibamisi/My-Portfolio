import { Code2, Smartphone, Sparkles, Zap } from "lucide-react";

export const developerName = "Opeyemi Bamisi";

export const contact = {
  email: "opeyemibamisidopedev@gmail.com",
  emailLink:
    "https://mail.google.com/mail/?view=cm&fs=1&to=opeyemibamisidopedev@gmail.com",
  whatsapp: "https://wa.me/+2349165105168",
  github: "https://github.com/Opeyemibamisi",
  linkedin: "https://www.linkedin.com/in/opeyemi-bamisi-170059386",
  twitter: "https://x.com/DopeOpeyemis",
};

export const navItems = [
  "About",
  "Skills",
  "Experience",
  "Projects",
  "Blog",
  "Contact",
];

export const typewriterWords = [
  "MERN Stack Developer",
  "React Native Developer",
  "Python Developer",
  "UI Enthusiast",
  "Problem Solver",
];

export const stats = [
  ["3+", "Years Experience"],
  ["20+", "Projects Completed"],
  ["10+", "Technologies"],
  ["Open", "Source Contributor"],
];

export const skillGroups = [
  [
    "Frontend",
    ["HTML5", "CSS3", "Tailwind CSS", "JavaScript", "React", "Next.js"],
  ],
  ["Backend", ["Node.js", "Express.js", "MongoDB", "REST APIs"]],
  ["Mobile", ["React Native"]],
  ["Programming", ["Python"]],
  ["Tools", ["Git", "GitHub", "VS Code", "Postman"]],
];

export const projects = [
  {
    title: "Car Dealership Platform",
    desc: "Inventory, secure payments, image uploads, admin workflows, and conversion-focused vehicle detail pages.",
    image: "/src/assets/images/projects/car-dealership.jpg",
    stack: ["MERN", "Paystack", "Cloudinary"],
    tone: "from-cyan-400 via-blue-500 to-violet-500",
  },
  {
    title: "AI Chatbot Application",
    desc: "Streaming assistant UI with conversation memory, resilient Node APIs, and polished chat interactions.",
    image: "/src/assets/images/projects/ai-chatbot.jpg",
    stack: ["React", "Node.js", "OpenAI"],
    tone: "from-violet-400 via-fuchsia-500 to-cyan-400",
  },
  {
    title: "E-commerce Platform",
    desc: "Product discovery, cart, checkout, authentication, dashboard metrics, and fast Mongo-backed APIs.",
    image: "/src/assets/images/projects/ecommerce.jpg",
    stack: ["MongoDB", "Express", "React", "Node"],
    tone: "from-emerald-300 via-cyan-500 to-blue-500",
  },
  {
    title: "Mobile App",
    desc: "Cross-platform mobile experience with reusable components, clean navigation, and API integration.",
    image: "/src/assets/images/projects/mobile-app.jpg",
    stack: ["React Native"],
    tone: "from-blue-400 via-indigo-500 to-sky-300",
  },
];

export const services = [
  ["Full Stack Development", "Building scalable web applications.", Code2],
  [
    "Mobile App Development",
    "Cross-platform apps using React Native.",
    Smartphone,
  ],
  ["Backend API Development", "Secure and optimized APIs.", Zap],
  ["UI Development", "Responsive and modern interfaces.", Sparkles],
];

export const posts = [
  {
    title: "Designing MERN Apps That Stay Fast",
    category: "MERN Stack",
    date: "Jun 12, 2026",
    tags: ["MongoDB", "Performance", "APIs"],
    featured: true,
    image: "/src/assets/images/blog/mern-stack.jpg",
    excerpt:
      "A practical architecture guide for building expressive MERN products without losing speed.",
  },
  {
    title: "React Patterns for Premium Interfaces",
    category: "JavaScript",
    date: "May 28, 2026",
    tags: ["React", "Motion", "UX"],
    image: "/src/assets/images/blog/react-patterns.jpg",
    excerpt:
      "Motion, composition, and state patterns that make complex interfaces feel effortless.",
  },
  {
    title: "Shipping React Native Apps With Confidence",
    category: "React Native",
    date: "Apr 19, 2026",
    tags: ["Mobile", "Testing", "Delivery"],
    image: "/src/assets/images/blog/react-native.jpg",
    excerpt:
      "A field checklist for building stable cross-platform mobile apps.",
  },
  {
    title: "Python Automation for Developers",
    category: "Python",
    date: "Mar 03, 2026",
    tags: ["Python", "Automation"],
    image: "/src/assets/images/blog/python-automation.jpg",
    excerpt:
      "Small scripts that remove repetitive engineering work from your week.",
  },
  {
    title: "Career Systems for Software Developers",
    category: "Career",
    date: "Feb 14, 2026",
    tags: ["Growth", "Portfolio"],
    image: "/src/assets/images/blog/career-growth.jpg",
    excerpt:
      "How to document your value, pick better projects, and tell clearer technical stories.",
  },
  {
    title: "Modern Web Development Tooling",
    category: "Web Development",
    date: "Jan 22, 2026",
    tags: ["Vite", "DX", "Frontend"],
    image: "/src/assets/images/blog/web-tools.jpg",
    excerpt:
      "A compact map of the tools that make modern web work faster and calmer.",
  },
];

export const testimonials = [
  [
    "Amina Roberts",
    "Startup Founder",
    "Delivered a polished product quickly and explained every technical decision clearly.",
  ],
  [
    "Daniel Lee",
    "Product Lead",
    "The dashboard feels premium, fast, and incredibly easy for our team to use.",
  ],
  [
    "Sophia Grant",
    "Creative Director",
    "A rare blend of engineering discipline and design taste. The experience feels alive.",
  ],
];
