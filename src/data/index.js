// ═══════════════════════════════════════════
//  Dr Mom 2.0 — Dummy Data
//  Replace with API calls in production
// ═══════════════════════════════════════════

export const CLASSES = [
  { id: "lkg", label: "LKG", fullLabel: "Lower Kindergarten", color: "#34d399", emoji: "🌱", tagline: "First steps to learning", students: "2.4k" },
  { id: "ukg", label: "UKG", fullLabel: "Upper Kindergarten", color: "#38bdf8", emoji: "🌟", tagline: "Building strong foundations", students: "2.1k" },
  { id: "class1", label: "Grade 1", fullLabel: "Grade 1", color: "#c084fc", emoji: "🚀", tagline: "Igniting curiosity", students: "3.2k" },
  { id: "class2", label: "Grade 2", fullLabel: "Grade 2", color: "#fbbf24", emoji: "🦋", tagline: "Spreading your wings", students: "2.9k" },
  { id: "class3", label: "Grade 3", fullLabel: "Grade 3", color: "#f87171", emoji: "🔬", tagline: "Exploring the world", students: "2.6k" },
  { id: "class4", label: "Grade 4", fullLabel: "Grade 4", color: "#a78bfa", emoji: "🎯", tagline: "Aiming for excellence", students: "2.3k" },
  { id: "class5", label: "Grade 5", fullLabel: "Grade 5", color: "#34d399", emoji: "🏆", tagline: "Mastering skills", students: "2.0k" },
];

export const SUBJECTS = {
  lkg: ["Phonics", "Numbers", "Shapes & Colors", "EVS", "Art & Craft"],
  ukg: ["English", "Mathematics", "EVS", "Drawing", "Rhymes"],
  class1: ["English", "Mathematics", "EVS", "Hindi", "Art"],
  class2: ["English", "Mathematics", "Science", "Social Studies", "Hindi"],
  class3: ["English", "Mathematics", "Science", "Social Studies", "Hindi"],
  class4: ["English", "Mathematics", "Science", "Social Studies", "Hindi"],
  class5: ["English", "Mathematics", "Science", "Social Studies", "Hindi"],
};

const makeVideos = (classId, subject, chapters) =>
  chapters.flatMap((chapter, ci) =>
    Array.from({ length: 3 }, (_, vi) => ({
      id: `${classId}-${subject.toLowerCase().replace(/\s+/g, "-")}-ch${ci + 1}-v${vi + 1}`,
      classId,
      subject,
      chapter: `Chapter ${ci + 1}: ${chapter}`,
      chapterIndex: ci + 1,
      title: `${chapter} — Lesson ${vi + 1}`,
      thumbnail: `https://picsum.photos/seed/${classId}${subject}${ci}${vi}/400/225`,
      duration: `${Math.floor(Math.random() * 8) + 5}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      isLocked: vi > 0 || ci > 0,
      views: `${(Math.floor(Math.random() * 9) + 1)}.${Math.floor(Math.random() * 9)}k`,
      rating: (4 + Math.random()).toFixed(1),
      desc: `A fun and engaging lesson on ${chapter.toLowerCase()} designed specifically for young learners.`,
    }))
  );

export const VIDEOS_DATA = {
  lkg: {
    Phonics: makeVideos("lkg", "Phonics",
      ["Alphabet A-E", "Alphabet F-J", "Alphabet K-O", "Alphabet P-T", "Alphabet U-Z"]),
    "Numbers": makeVideos("lkg", "Numbers",
      ["Counting 1–5", "Counting 6–10", "Number Shapes", "Before & After", "Simple Addition"]),
    "Shapes & Colors": makeVideos("lkg", "Shapes & Colors",
      ["Basic Shapes", "Primary Colors", "Secondary Colors", "Shapes in Life", "Color Mixing"]),
    EVS: makeVideos("lkg", "EVS",
      ["My Body", "My Family", "Animals", "Plants", "Nature"]),
    "Art & Craft": makeVideos("lkg", "Art & Craft",
      ["Drawing Lines", "Basic Figures", "Paper Folding", "Collage", "Color Art"]),
  },
  ukg: {
    English: makeVideos("ukg", "English",
      ["Vowels & Consonants", "Simple Words", "Sentences", "Reading", "Story Time"]),
    Mathematics: makeVideos("ukg", "Mathematics",
      ["Numbers 1–20", "Addition", "Subtraction", "Patterns", "Measurement"]),
    EVS: makeVideos("ukg", "EVS",
      ["Our School", "My Neighbourhood", "Weather", "Food", "Transport"]),
    Drawing: makeVideos("ukg", "Drawing",
      ["Fruits", "Animals", "Vehicles", "Nature Scenes", "People"]),
    Rhymes: makeVideos("ukg", "Rhymes",
      ["Action Rhymes", "Animal Rhymes", "Number Rhymes", "Nature Rhymes", "Funny Rhymes"]),
  },
  class1: {
    English: makeVideos("class1", "English",
      ["The Alphabet", "Words & Spellings", "Sentences", "Reading Comprehension", "Handwriting"]),
    Mathematics: makeVideos("class1", "Mathematics",
      ["Numbers 1–100", "Place Value", "Addition", "Subtraction", "Shapes"]),
    EVS: makeVideos("class1", "EVS",
      ["Living Things", "Our Earth", "Water", "Air", "Seasons"]),
    Hindi: makeVideos("class1", "Hindi",
      ["Swar", "Vyanjan", "Matra", "Shabd", "Vakya"]),
    Art: makeVideos("class1", "Art",
      ["Lines & Patterns", "Nature Art", "Animal Drawing", "Festival Art", "Free Expression"]),
  },
  class2: {
    English: makeVideos("class2", "English",
      ["Grammar Basics", "Nouns & Pronouns", "Verbs", "Reading", "Creative Writing"]),
    Mathematics: makeVideos("class2", "Mathematics",
      ["Numbers to 1000", "Addition & Subtraction", "Multiplication Intro", "Division Intro", "Fractions"]),
    Science: makeVideos("class2", "Science",
      ["Plants", "Animals", "Food", "Shelter", "Transport"]),
    "Social Studies": makeVideos("class2", "Social Studies",
      ["My Family", "My School", "My Village/City", "Our Country", "Helpers"]),
    Hindi: makeVideos("class2", "Hindi",
      ["Varnamala", "Matra Gyan", "Sanyukt Akshar", "Vakya Nirman", "Kahaniyan"]),
  },
  class3: {
    English: makeVideos("class3", "English",
      ["Parts of Speech", "Tenses", "Comprehension", "Essay Writing", "Poem"]),
    Mathematics: makeVideos("class3", "Mathematics",
      ["4-digit Numbers", "Multiplication", "Division", "Fractions", "Money"]),
    Science: makeVideos("class3", "Science",
      ["Living & Non-living", "Habitats", "Matter", "Force", "Light & Sound"]),
    "Social Studies": makeVideos("class3", "Social Studies",
      ["Maps & Globes", "Physical Features", "Resources", "States of India", "Festivals"]),
    Hindi: makeVideos("class3", "Hindi",
      ["Gadya", "Padya", "Vyakaran", "Nibandh", "Patra Lekhan"]),
  },
  class4: {
    English: makeVideos("class4", "English",
      ["Advanced Grammar", "Comprehension", "Letter Writing", "Story Writing", "Poetry"]),
    Mathematics: makeVideos("class4", "Mathematics",
      ["Large Numbers", "LCM & HCF", "Decimals", "Geometry", "Data Handling"]),
    Science: makeVideos("class4", "Science",
      ["Teeth & Digestion", "Skeleton", "Rocks & Soil", "Water Cycle", "Simple Machines"]),
    "Social Studies": makeVideos("class4", "Social Studies",
      ["Ancient India", "Mughal Period", "British Rule", "Our Constitution", "Democracy"]),
    Hindi: makeVideos("class4", "Hindi",
      ["Kahani", "Kavita", "Anuched", "Patra", "Vyakaran Deepening"]),
  },
  class5: {
    English: makeVideos("class5", "English",
      ["Advanced Comprehension", "Report Writing", "Debate", "Advanced Grammar", "Literature"]),
    Mathematics: makeVideos("class5", "Mathematics",
      ["Whole Numbers", "Fractions & Decimals", "Percentage", "Algebra Intro", "Statistics"]),
    Science: makeVideos("class5", "Science",
      ["Super Senses", "Microorganisms", "Food Preservation", "Earth & Space", "Technology"]),
    "Social Studies": makeVideos("class5", "Social Studies",
      ["Mapping India", "Agriculture", "Industries", "Trade & Commerce", "Citizenship"]),
    Hindi: makeVideos("class5", "Hindi",
      ["Upanyas", "Natak", "Sahitya Parichay", "Vyakaran Advanced", "Rachnatmak Lekhan"]),
  },
};

export const SUBSCRIPTION_PLANS = [
  {
    id: "single",
    name: "Single Video",
    price: "₹19",
    period: "per video",
    color: "#38bdf8",
    features: [
      "Access to 1 selected video",
      "HD video quality",
      "Downloadable notes",
      "Valid for 30 days",
    ],
    cta: "Buy Video",
    popular: false,
  },
  {
    id: "chapter",
    name: "Chapter Pack",
    price: "₹99",
    period: "per chapter",
    color: "#c084fc",
    features: [
      "All videos in a chapter",
      "HD video quality",
      "Downloadable notes",
      "Practice worksheets",
      "Valid for 60 days",
    ],
    cta: "Buy Chapter",
    popular: false,
  },
  {
    id: "class",
    name: "Class Package",
    price: "₹499",
    period: "per class/year",
    color: "#34d399",
    features: [
      "All subjects for one class",
      "HD + 4K video quality",
      "Notes & worksheets",
      "Progress tracking",
      "Doubt clearing sessions",
      "Valid for 1 year",
    ],
    cta: "Buy Class Pack",
    popular: true,
  },
  {
    id: "full",
    name: "Full Access",
    price: "₹999",
    period: "all classes/year",
    color: "#fbbf24",
    features: [
      "All classes LKG to Grade 5",
      "4K video quality",
      "Notes, worksheets & tests",
      "Live sessions",
      "Parent dashboard",
      "Priority support",
      "Valid for 1 year",
    ],
    cta: "Get Full Access",
    popular: false,
  },
];

export const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Parent of Grade 2 Student",
    text: "Dr Mom 2.0 completely transformed how my daughter approaches learning. The animated videos make complex concepts feel like play.",
    avatar: "PS",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    role: "Parent of LKG Student",
    text: "My son looks forward to learning every day! The phonics module is exceptional — he started reading within weeks.",
    avatar: "RK",
    rating: 5,
  },
  {
    name: "Anitha Nair",
    role: "Parent of Grade 4 Student",
    text: "The quality of content and the platform's design is world-class. My daughter's grades improved significantly.",
    avatar: "AN",
    rating: 5,
  },
  {
    name: "Mohammed Ali",
    role: "Parent of Grade 1 Student",
    text: "Value for money is outstanding. The full access pack gives my child everything needed for the whole year.",
    avatar: "MA",
    rating: 5,
  },
];

export const STATS = [
  { value: "50,000+", label: "Happy Students" },
  { value: "2,000+", label: "Video Lessons" },
  { value: "100+", label: "Expert Teachers" },
  { value: "4.9★", label: "Average Rating" },
];

export const TEAM = [
  { name: "Dr. Meena Pillai", role: "Curriculum Director", initials: "MP", bg: "#6b3fa0" },
  { name: "Arun Krishnamurthy", role: "Head of Pedagogy", initials: "AK", bg: "#0d9488" },
  { name: "Sunita Devi", role: "Lead Content Creator", initials: "SD", bg: "#c2410c" },
  { name: "Vijay Nambiar", role: "Technology Lead", initials: "VN", bg: "#1e40af" },
];
