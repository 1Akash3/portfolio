/* =============================================================================
   PROJECT DATA  —  the single source of truth for the portfolio.
   To add a project: copy one block, fill it in, done. It appears automatically
   in the grid (and in the cinematic strip if `featured: true`).

   Fields:
     id        unique slug
     name      display title
     category  one of: "Full-Stack" | "AI/ML" | "Frontend" | "Backend & Systems" | "Client Work"
     tags      short chips shown on the card (tech / type)
     year      string
     role      your role on it
     blurb     one-line summary (card)
     summary   longer paragraph (modal)
     features  bullet highlights (modal)
     tech      full tech list (modal)
     links     { demo, code }  — omit or null to hide that button
     accent    "blue" | "violet" | "lime" | "cyan" | "magenta"  (card gradient)
     featured  true = also shown in the horizontal cinematic strip
============================================================================= */
// Contact config. `phone` reveals the Call button; `whatsapp` (digits with
// country code, no +) reveals the WhatsApp button. Leave "" to hide either.
window.CONTACT = { phone: "+91 77440 24465", whatsapp: "917744024465" };

window.PROJECTS = [
  {
    id: "rewrd",
    name: "rewrd",
    category: "Full-Stack",
    tags: ["Next.js", "TypeScript", "Postgres", "SaaS"],
    year: "2026",
    role: "Solo architect & full-stack build",
    blurb: "A multi-tenant QR loyalty SaaS — local businesses turn every visit into a repeat customer.",
    summary:
      "A production B2B SaaS platform that lets local businesses run QR-first digital loyalty programs. One evergreen QR per branch: customers scan at the counter, collect digital stamps on their phone with no app install, and unlock real rewards. Merchants get a guided campaign builder, GPS branch detection, a fraud-velocity engine, per-branch analytics, and web-push nudges — all behind an operator-managed, trial-then-subscribe access model. Deployed and live at rewrd.online.",
    features: [
      "Multi-tenant Express API (10+ modules) with JWT auth + role-based access",
      "GPS branch detection & geo-fenced stamp validation (haversine distance)",
      "Fraud-velocity engine (device fingerprint + rate windows) blocks abuse",
      "Google Maps building-level search + distance-sorted 'offers near you'",
      "Email-OTP + Google Sign-In, Web Push nudges, 15/15 integration tests passing"
    ],
    tech: ["Next.js 14", "TypeScript", "Node/Express", "Prisma", "PostgreSQL (Neon)", "Google Maps API", "Tailwind", "Web Push", "Vercel", "Render"],
    links: { demo: "https://rewrd.online/", code: null },
    displayUrl: "rewrd.io",
    image: "images/shots/rewrd.png",
    accent: "violet",
    featured: true
  },
  {
    id: "spendsmart",
    name: "SpendSmart",
    category: "Full-Stack",
    tags: ["React", "Node", "MongoDB", "AI"],
    year: "2026",
    role: "Solo full-stack build",
    blurb: "AI-powered personal-finance platform — turns bank statements into live insights.",
    summary:
      "A production-style fintech PWA. Upload a CSV / XLSX / PDF bank statement and it runs a full ingestion pipeline — extraction, merchant detection, category classification — then surfaces real-time analytics: a financial health score, outlier detection, spend prediction, savings goals, and an AI assistant (Claude) with a rule-based fallback. Installable PWA with a Capacitor Android wrapper.",
    features: [
      "CSV / XLSX / PDF statement ingestion with pre-import preview",
      "Analytics engine: health score, z-score outliers, next-month prediction",
      "JWT access + refresh auth, bcrypt, rate-limiting, NoSQL-injection guards",
      "Graceful degradation everywhere (DB→in-memory, email→PDF, captcha→pass)",
      "Installable PWA + emailed PDF financial reports"
    ],
    tech: ["React 18", "Vite", "Tailwind", "Recharts", "Framer Motion", "Node/Express", "MongoDB Atlas", "Anthropic Claude", "Capacitor", "Brevo SMTP"],
    links: { demo: "https://smart-money-managar-xdti-one.vercel.app/", code: "https://github.com/1Akash3/SmartMoneyManagar" },
    displayUrl: "spendsmart.io",
    image: "images/shots/spendsmart.png",
    accent: "violet",
    featured: true
  },
  {
    id: "credit-engine",
    name: "Micro-Credit Approval Engine",
    category: "Full-Stack",
    tags: ["Node", "React", "Rules Engine", "35 tests"],
    year: "2026",
    role: "Full-stack + engine design",
    blurb: "Config-driven loan decisioning with an isomorphic scoring engine and 35 passing tests.",
    summary:
      "A credit-decisioning platform where every threshold, weight, band and rule lives in a runtime config — the engine contains zero hardcoded policy. The exact same pure engine runs on the server and in the browser, proven byte-for-byte identical by parity tests. A 9-stage pipeline takes an applicant from validation through weighted scoring, interaction rules, band lookup, explainable reasons, and a reverse 'what-if' resolver.",
    features: [
      "9-stage decisioning pipeline (validation → score → rules → reasons → what-if)",
      "Isomorphic engine: identical logic server-side and client-side",
      "35 deep-equal parity + behaviour tests (all passing)",
      "CSV / Excel / PDF applicant ingestion + PDF report export",
      "Live rule-config editor with band gap/overlap detection"
    ],
    tech: ["Node/Express", "Joi", "Mongoose", "React 18", "Vite", "Recharts", "puppeteer-core", "@react-pdf"],
    links: { demo: null, code: "https://github.com/1Akash3/Loan-Approval" },
    displayUrl: "creditengine.io",
    image: "images/shots/credit-engine.png",
    accent: "blue",
    featured: false
  },
  {
    id: "quiz-system",
    name: "Online Quiz System",
    category: "Full-Stack",
    tags: ["React", "Express", "MySQL", "Docker"],
    year: "2026",
    role: "Full-stack + DevOps",
    blurb: "A containerized 3-tier quiz app with CI that builds every image on push.",
    summary:
      "A full-stack quiz platform wired end to end with DevOps in mind: a React frontend, an Express API using a health-aware MySQL connection pool, and a seeded MySQL database — all orchestrated with Docker Compose and built on every push via GitHub Actions. Pick a category, answer over an animated Three.js backdrop, and get a scored, persisted result.",
    features: [
      "3-container topology (web → api → db) via Docker Compose",
      "MySQL connection pool that tolerates the DB still warming up",
      "GitHub Actions CI builds all images on every push",
      "Environment-driven secrets — nothing hardcoded",
      "Three.js animated quiz UI"
    ],
    tech: ["React", "Node/Express", "MySQL 8", "Docker", "GitHub Actions", "nginx", "three.js"],
    links: { demo: null, code: "https://github.com/1Akash3/Online-Quiz-System" },
    displayUrl: "quizhub.io",
    accent: "cyan",
    featured: false
  },
  {
    id: "mind-chat",
    name: "AI Mental-Health Chatbot",
    category: "AI/ML",
    tags: ["Python", "Flask", "NLP", "three.js"],
    year: "2025",
    role: "End-to-end build",
    blurb: "A supportive companion chatbot — Flask NLP engine + 3D-avatar web UI.",
    summary:
      "A compact, end-to-end wellbeing assistant. A Flask API classifies user intent with a transparent regex NLP engine and responds with empathetic, editable messages. The frontend renders a three.js 3D avatar, and an optional offline voice module adds speech-to-text and text-to-speech. Responses are intentionally rule-based and predictable — the right call for a wellbeing context.",
    features: [
      "Intent-classification NLP engine (greeting, feelings, help, small-talk, fallback)",
      "REST /chat API with editable response library (responses.json)",
      "three.js 3D-avatar chat interface",
      "Optional voice module: SpeechRecognition + pyttsx3",
      "No black-box model — safe, predictable replies"
    ],
    tech: ["Python", "Flask", "Regex NLP", "JavaScript", "three.js", "SpeechRecognition", "pyttsx3"],
    links: { demo: null, code: "https://github.com/1Akash3/AI-based-Mental-Health-Chatbot" },
    displayUrl: "mindmate.io",
    accent: "magenta",
    featured: false
  },
  {
    id: "cdn-sim",
    name: "Content Delivery Network",
    category: "Backend & Systems",
    tags: ["C++", "DSA", "Dijkstra", "Live demo"],
    year: "2025",
    role: "Systems + visualizer",
    blurb: "A CDN modelled from data structures — hash cache, FIFO queue, Dijkstra routing.",
    summary:
      "A Content Delivery Network built from first principles on three classic data structures: a hash table for the direct-mapped edge cache, a FIFO queue for the request buffer, and a weighted graph (with Dijkstra shortest-path) for nearest-server routing on a cache miss. Ships with a C++ engine AND a polished interactive web visualizer that is a faithful port of the C++ logic — same hash function, same latency matrix.",
    features: [
      "Direct-mapped hash cache with visualized collisions & eviction",
      "Dijkstra nearest-server routing over a real latency matrix",
      "FIFO request queue with live hit-ratio & latency stats",
      "Interactive visualizer — enqueue requests and watch it route",
      "C++ engine mirrored exactly by the JS visualizer"
    ],
    tech: ["C++17", "Data Structures", "Dijkstra", "Vanilla JS", "SVG animation"],
    links: { demo: "https://1akash3.github.io/Content-Delivery-Network/", code: "https://github.com/1Akash3/Content-Delivery-Network" },
    displayUrl: "cdnsim.io",
    image: "images/shots/cdn-sim.png",
    accent: "blue",
    featured: true
  },
  {
    id: "bajaj-qualifier",
    name: "Bajaj Finserv Java Qualifier",
    category: "Backend & Systems",
    tags: ["Java", "Spring Boot", "REST"],
    year: "2026",
    role: "Spring Boot developer",
    blurb: "Spring Boot app that automates the Bajaj Finserv hiring webhook + SQL challenge.",
    summary:
      "A Spring Boot solution for the Bajaj Finserv Health 'JAVA' hiring qualifier. On startup a CommandLineRunner drives the whole challenge automatically — it requests a webhook, selects and solves the assigned SQL problem based on registration-number parity, and submits the answer with a bearer token. Clean typed POJO models and outbound REST via RestTemplate.",
    features: [
      "CommandLineRunner bootstraps the full flow end-to-end",
      "Typed request/response models + RestTemplate calls",
      "Bearer-token authenticated submission",
      "Standard Maven layout, pinned to a stable Spring Boot release"
    ],
    tech: ["Java 17", "Spring Boot 3.3", "Spring Web / RestTemplate", "Maven"],
    links: { demo: null, code: "https://github.com/1Akash3/bajaj-finserv-java-qualifier" },
    displayUrl: "javaqualifier.io",
    accent: "lime",
    featured: false
  },
  {
    id: "coursehub",
    name: "CourseHub",
    category: "Frontend",
    tags: ["HTML", "Tailwind", "JS", "Razorpay"],
    year: "2025",
    role: "Frontend developer",
    blurb: "A 12-page online-course marketplace — auth, checkout, and progress tracking.",
    summary:
      "A complete online learning marketplace front-end: browse a catalog, create an account, enrol, pay at a Razorpay checkout, then track lesson-by-lesson progress from a personal dashboard. Twelve fully linked pages built with vanilla JavaScript and Tailwind, backed by a localStorage data layer — the whole product flow is demoable with zero backend.",
    features: [
      "Auth: register / login / logout / forgot-password (localStorage session)",
      "Course catalog with detail pages + curriculum",
      "Razorpay checkout flow",
      "Lesson player with per-course progress tracking",
      "Dashboard with enrolments + course management"
    ],
    tech: ["HTML5", "Tailwind CSS", "Vanilla JS (ES6)", "localStorage", "Razorpay"],
    links: { demo: "https://1akash3.github.io/course-selling-website/", code: "https://github.com/1Akash3/course-selling-website" },
    displayUrl: "coursehub.io",
    image: "images/shots/coursehub.png",
    accent: "cyan",
    featured: true
  },
  {
    id: "beauty-academy",
    name: "Beauty Academy",
    category: "Client Work",
    tags: ["Client", "Web Design", "Business"],
    year: "2026",
    role: "Designed & built for a client",
    blurb: "A polished marketing website delivered for a beauty-academy client.",
    summary:
      "A client engagement — a modern, conversion-focused website for a beauty academy: course/service showcase, an inviting brand-led design, and clear calls to action to drive enquiries and enrolments. Delivered end to end as freelance client work.",
    features: [
      "Brand-led visual design tailored to the client",
      "Course / service showcase",
      "Contact & enquiry-focused calls to action",
      "Responsive across devices"
    ],
    tech: ["Web Design", "Responsive Front-End"],
    // TODO: paste the live URL here (and code repo if any) to activate the buttons.
    links: { demo: null, code: null },
    displayUrl: "beautyacademy.io",
    accent: "magenta",
    featured: true
  }
];
