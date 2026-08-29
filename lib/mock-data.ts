import { MAX_HEARTS } from "@/constants";

export interface MockCourse {
  id: number;
  title: string;
  imageSrc: string;
}

export interface MockChallengeOption {
  id: number;
  challengeId: number;
  text: string;
  correct: boolean;
  imageSrc: string | null;
  audioSrc: string | null;
}

export interface MockChallengeProgress {
  id: number;
  userId: string;
  challengeId: number;
  completed: boolean;
}

export interface MockChallenge {
  id: number;
  lessonId: number;
  type: "SELECT" | "ASSIST";
  question: string;
  order: number;
  completed: boolean;
  challengeOptions: MockChallengeOption[];
  challengeProgress?: MockChallengeProgress[];
}

export interface MockLesson {
  id: number;
  unitId: number;
  title: string;
  order: number;
  challenges: MockChallenge[];
  completed: boolean;
}

export interface MockUnit {
  id: number;
  courseId: number;
  title: string;
  description: string;
  order: number;
  lessons: MockLesson[];
}

export interface MockUserProgress {
  userId: string;
  userName: string;
  userImageSrc: string;
  activeCourseId: number;
  hearts: number;
  points: number;
  activeCourse?: MockCourse;
}

export interface MockUserSubscription {
  id: number;
  userId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  stripePriceId: string;
  stripeCurrentPeriodEnd: Date;
  isActive: boolean;
}

export interface MockStudentProfile {
  userId: string;
  name: string;
  avatar: string;
  scholarTier: string;
  joinDate: string;
  streakDays: number;
  totalXp: number;
  accuracyRate: number;
  hoursStudied: number;
  milestonesCompleted: number;
  currentLevel: string;
  entitlements: string[];
  competencies: {
    speaking: number;
    vocabulary: number;
    grammar: number;
    listening: number;
    reading: number;
    writing: number;
  };
  certificates: {
    id: string;
    title: string;
    course: string;
    level: string;
    score: string;
    issueDate: string;
    verificationId: string;
  }[];
  badges: {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt: string;
  }[];
}

export interface MockSpeakingPrompt {
  id: string;
  prompt: string;
  targetSentence: string;
  ipaGuide: string;
  translation: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  keyPhonemes: string[];
}

export interface MockFlashcard {
  id: string;
  term: string;
  phonetic: string;
  partOfSpeech: string;
  meaning: string;
  exampleSentence: string;
  exampleTranslation: string;
}

export interface MockGrammarExercise {
  id: string;
  instruction: string;
  ruleHint: string;
  tokens: string[];
  correctSentence: string;
  translation: string;
}

export interface MockListeningActivity {
  id: string;
  title: string;
  transcript: string;
  question: string;
  options: { id: string; text: string; correct: boolean }[];
  dictationTarget: string;
}

export interface MockReadingPassage {
  id: string;
  title: string;
  difficulty: string;
  passage: string;
  glossary: { term: string; definition: string }[];
  questions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface MockWritingPrompt {
  id: string;
  title: string;
  topic: string;
  prompt: string;
  minWords: number;
  sampleAnswer: string;
  rubricFocus: string[];
}

export interface MockVideoLesson {
  id: string;
  title: string;
  duration: string;
  instructor: string;
  videoUrl: string;
  keyTakeaways: string[];
  timestamps: { time: string; title: string }[];
  checkpoints: {
    time: string;
    question: string;
    options: string[];
    correctIndex: number;
  }[];
}

// Initial courses
export const mockCourses: MockCourse[] = [
  { id: 1, title: "English", imageSrc: "/en.svg" },
];

export const mockStudentProfile: MockStudentProfile = {
  userId: "user_guest",
  name: "Guest Scholar",
  avatar: "/mascot.svg",
  scholarTier: "Gold Academician • Advanced Tier",
  joinDate: "August 2026",
  streakDays: 14,
  totalXp: 1450,
  accuracyRate: 94,
  hoursStudied: 38,
  milestonesCompleted: 6,
  currentLevel: "Level 2: Intermediate English",
  entitlements: [
    "English Master Curriculum (A1 - B2)",
    "Azure AI Speaking & Pronunciation Lab",
    "OpenAI Essay & Writing Evaluation",
    "Accredited Language Certificates",
    "Unlimited Energy & Hearts Pro",
  ],
  competencies: {
    speaking: 88,
    vocabulary: 95,
    grammar: 91,
    listening: 86,
    reading: 94,
    writing: 89,
  },
  certificates: [
    {
      id: "cert_1",
      title: "Certificate of Language Achievement in English Foundations",
      course: "English",
      level: "Milestone I — Beginner Proficiency",
      score: "96% (Distinction)",
      issueDate: "August 28, 2026",
      verificationId: "CERT-IHS-ENG-2026-0891",
    },
    {
      id: "cert_2",
      title: "Certificate of Professional Pronunciation & Speech Fluency",
      course: "English",
      level: "Milestone II — Speech & Articulation",
      score: "93% (High Honors)",
      issueDate: "August 20, 2026",
      verificationId: "CERT-IHS-SPK-2026-0412",
    },
  ],
  badges: [
    {
      id: "b1",
      title: "Polyglot Prodigy",
      description:
        "Mastered over 500 academic vocabulary terms across disciplines.",
      icon: "🏆",
      unlockedAt: "Aug 26, 2026",
    },
    {
      id: "b2",
      title: "Perfect Articulation",
      description:
        "Achieved >95% Azure Pronunciation and Fluency score in Speaking Lab.",
      icon: "🎙️",
      unlockedAt: "Aug 24, 2026",
    },
    {
      id: "b3",
      title: "Grammar Virtuoso",
      description:
        "Completed 15 syntax & sentence construction modules without a mistake.",
      icon: "📜",
      unlockedAt: "Aug 21, 2026",
    },
    {
      id: "b4",
      title: "14-Day Academic Streak",
      description:
        "Maintained continuous daily study commitment for two straight weeks.",
      icon: "🔥",
      unlockedAt: "Today",
    },
  ],
};

export const mockSpeakingPrompts: MockSpeakingPrompt[] = [
  {
    id: "spk_1",
    prompt:
      "Read the English sentence aloud with clear intonation and cadence.",
    targetSentence:
      "The professor explains the lesson with patience and clarity.",
    ipaGuide: "/ðə prəˈfesər ɪkˈspleɪnz ðə ˈlesən wɪð ˈpeɪʃəns ænd ˈklærəti/",
    translation:
      "Focus on linking “explains the” and finishing “clarity” cleanly.",
    difficulty: "Intermediate",
    keyPhonemes: ["prəˈfesər", "ɪkˈspleɪnz", "ˈklærəti"],
  },
  {
    id: "spk_2",
    prompt: "Pronounce the greeting clearly, using natural English stress.",
    targetSentence:
      "Good morning, it is an honor to join this academic conference.",
    ipaGuide:
      "/ɡʊd ˈmɔːrnɪŋ ɪt ɪz ən ˈɑːnər tə dʒɔɪn ðɪs ˌækəˈdemɪk ˈkɑːnfərəns/",
    translation:
      "Keep the unstressed words light and stress “honor” and “conference.”",
    difficulty: "Beginner",
    keyPhonemes: ["ˈmɔːrnɪŋ", "ˈɑːnər", "ˌækəˈdemɪk"],
  },
  {
    id: "spk_3",
    prompt: "Practice conversational fluency and sentence pacing.",
    targetSentence:
      "The university library offers excellent resources for independent research.",
    ipaGuide:
      "/ðə ˌjuːnɪˈvɜːrsəti ˈlaɪbreri ˈɔːfərz ˈeksələnt rɪˈsɔːrsɪz fər ˌɪndɪˈpendənt rɪˈsɜːrtʃ/",
    translation: "Use a steady pace and keep the main content words prominent.",
    difficulty: "Advanced",
    keyPhonemes: ["ˌjuːnɪˈvɜːrsəti", "rɪˈsɔːrsɪz", "ˌɪndɪˈpendənt"],
  },
];

export const mockFlashcards: MockFlashcard[] = [
  {
    id: "fc_1",
    term: "Knowledge",
    phonetic: "/ˈnɑːlɪdʒ/",
    partOfSpeech: "Noun",
    meaning:
      "Information and understanding gained through study or experience.",
    exampleSentence:
      "Knowledge grows when we test ideas and reflect on evidence.",
    exampleTranslation: "Notice that the initial k is silent.",
  },
  {
    id: "fc_2",
    term: "Investigate",
    phonetic: "/ɪnˈvestɪɡeɪt/",
    partOfSpeech: "Verb",
    meaning: "To examine a subject carefully in order to discover facts.",
    exampleSentence:
      "The scientists investigate the unexpected result in detail.",
    exampleTranslation: "Related noun: investigation.",
  },
  {
    id: "fc_3",
    term: "Eloquent",
    phonetic: "/ˈeləkwənt/",
    partOfSpeech: "Adjective",
    meaning: "Fluent, persuasive, and articulate in speaking or writing.",
    exampleSentence: "Her eloquent speech held the audience’s attention.",
    exampleTranslation:
      "Common collocations: eloquent speaker, eloquent argument.",
  },
  {
    id: "fc_4",
    term: "Wisdom",
    phonetic: "/ˈwɪzdəm/",
    partOfSpeech: "Noun",
    meaning: "Wisdom, good judgment, or profound scholarly insight.",
    exampleSentence: "The mentor shared her wisdom with the next generation.",
    exampleTranslation: "The final syllable is unstressed: -dəm.",
  },
];

export const mockVocabularyPairs = [
  { term: "Resilient", meaning: "Able to recover quickly" },
  { term: "Concise", meaning: "Clear and brief" },
  { term: "Curious", meaning: "Eager to learn or know" },
  { term: "Evidence", meaning: "Facts that support a claim" },
  { term: "Interpret", meaning: "Explain the meaning of something" },
  { term: "Collaborate", meaning: "Work together toward a goal" },
];

export const mockGrammarExercises: MockGrammarExercise[] = [
  {
    id: "g1",
    instruction:
      "Arrange the words in the correct syntactic order to form a grammatically valid sentence:",
    ruleHint:
      "Rule: English statements usually follow Subject + Verb + Object + Place.",
    tokens: ["in", "the", "teacher", "the", "explains", "library", "lesson"],
    correctSentence: "the teacher explains the lesson in the library",
    translation: "The teacher teaches the lesson in the library.",
  },
  {
    id: "g2",
    instruction: "Construct a polite question in natural English order:",
    ruleHint:
      "Rule: In a question, place the auxiliary verb before the subject.",
    tokens: ["you", "are", "today?", "how", "feeling"],
    correctSentence: "how are you feeling today?",
    translation: "How are you feeling today?",
  },
  {
    id: "g3",
    instruction: "Assemble the complex comparative clause:",
    ruleHint:
      "Rule: Use the comparative adjective before “than” when comparing two things.",
    tokens: [
      "this",
      "is",
      "book",
      "more",
      "interesting",
      "than",
      "that",
      "one",
    ],
    correctSentence: "this book is more interesting than that one",
    translation: "This book is more interesting than that one.",
  },
];

export const mockListeningActivities: MockListeningActivity[] = [
  {
    id: "lis_1",
    title: "Academic Lecture Dialogue: University Registration",
    transcript:
      "Good morning. Welcome to the faculty of humanities and social sciences.",
    question: "Which faculty is welcoming the students in the audio?",
    options: [
      { id: "o1", text: "Humanities and Social Sciences", correct: true },
      { id: "o2", text: "Engineering and Mathematics", correct: false },
      { id: "o3", text: "General Medicine", correct: false },
      { id: "o4", text: "International Business", correct: false },
    ],
    dictationTarget: "Good morning welcome to the faculty",
  },
  {
    id: "lis_2",
    title: "Library Research Inquiry",
    transcript:
      "Please return the historical manuscripts before five o’clock this afternoon.",
    question: "What is the requested return time for historical manuscripts?",
    options: [
      { id: "o1", text: "Before 5:00 PM", correct: true },
      { id: "o2", text: "At noon", correct: false },
      { id: "o3", text: "Tomorrow morning", correct: false },
      { id: "o4", text: "Before 8:00 PM", correct: false },
    ],
    dictationTarget: "return the historical manuscripts before five",
  },
];

export const mockReadingPassage: MockReadingPassage = {
  id: "read_1",
  title: "How Language Learning Strengthens the Mind",
  difficulty: "B2 Intermediate-Advanced",
  passage: `Studying modern languages does more than open doors to international communication. It also strengthens cognition and analytical thinking. Throughout academic history, linguistic mastery has been treated as a cornerstone of scholarship.

When students explore the grammar and vocabulary of a new language, they develop a more nuanced understanding of culture and thought. Contemporary research suggests that bilingual practice supports neural plasticity and can improve complex problem-solving skills.`,
  glossary: [
    {
      term: "Cognition",
      definition:
        "The mental process of learning, understanding, and thinking.",
    },
    {
      term: "Cornerstone",
      definition: "A basic and essential part of something.",
    },
    {
      term: "Nuanced",
      definition: "Showing subtle differences or careful understanding.",
    },
    {
      term: "Neural plasticity",
      definition: "The brain’s ability to adapt and form new connections.",
    },
  ],
  questions: [
    {
      question:
        "According to the passage, what is considered a cornerstone of scholarship?",
      options: [
        "Linguistic mastery and language study",
        "Technological memorization tools",
        "Solely mathematics and physical sciences",
        "Short-term vocational certificates",
      ],
      correctIndex: 0,
      explanation:
        "The passage says that linguistic mastery has been treated as a cornerstone of scholarship.",
    },
    {
      question:
        "What cognitive benefit of bilingualism is explicitly highlighted in the research?",
      options: [
        "Neural plasticity and complex problem-solving optimization",
        "Reduction in overall reading speed",
        "Complete elimination of grammatical errors in all languages",
        "Decreased need for cultural studies",
      ],
      correctIndex: 0,
      explanation:
        "The passage links bilingual practice with neural plasticity and stronger complex problem-solving.",
    },
  ],
};

export const mockWritingPrompts: MockWritingPrompt[] = [
  {
    id: "wri_1",
    title: "Scholarly Reflection: Importance of Language Acquisition",
    topic: "Education & Global Communication",
    prompt:
      "Write a short reflective paragraph (40-80 words) in English explaining why language learning is important for global collaboration and cultural empathy.",
    minWords: 35,
    sampleAnswer:
      "Learning languages helps us understand different cultural perspectives and communicate with greater empathy. It also strengthens our thinking skills and makes international collaboration easier. By listening carefully to how other people express ideas, we can build trust, avoid assumptions, and work together more effectively.",
    rubricFocus: [
      "Grammatical accuracy & agreement",
      "Vocabulary richness & scholarly tone",
      "Structural coherence & sentence transitions",
    ],
  },
];

export const mockVideoLessons: MockVideoLesson[] = [
  {
    id: "vid_1",
    title: "Masterclass: English Verb Tenses & Clear Academic Style",
    duration: "12:45",
    instructor: "Prof. Eleanor Hayes, Chair of Applied Linguistics",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    keyTakeaways: [
      "Choosing between simple, continuous, and perfect verb forms",
      "Keeping tense consistent across a paragraph",
      "Using irregular verbs accurately in formal writing",
      "Academic writing transitions for argumentative essays",
    ],
    timestamps: [
      { time: "00:00", title: "Introduction & Structural Principles" },
      { time: "03:15", title: "Tense, Aspect & Time" },
      { time: "07:30", title: "Irregular Verb Patterns" },
      { time: "10:45", title: "Real-world Practice & Dialogue Review" },
    ],
    checkpoints: [
      {
        time: "05:00",
        question: "Which sentence correctly uses the present perfect tense?",
        options: [
          "She has finished the essay.",
          "She finish the essay.",
          "She finishing the essay.",
          "She have finished the essay.",
        ],
        correctIndex: 0,
      },
    ],
  },
];

const challengeOptionsData: Record<number, MockChallengeOption[]> = {
  1: [
    {
      id: 1,
      challengeId: 1,
      text: "man",
      correct: true,
      imageSrc: "/man.svg",
      audioSrc: null,
    },
    {
      id: 2,
      challengeId: 1,
      text: "woman",
      correct: false,
      imageSrc: "/woman.svg",
      audioSrc: null,
    },
    {
      id: 3,
      challengeId: 1,
      text: "boy",
      correct: false,
      imageSrc: "/boy.svg",
      audioSrc: null,
    },
  ],
  2: [
    {
      id: 4,
      challengeId: 2,
      text: "woman",
      correct: true,
      imageSrc: "/woman.svg",
      audioSrc: null,
    },
    {
      id: 5,
      challengeId: 2,
      text: "boy",
      correct: false,
      imageSrc: "/boy.svg",
      audioSrc: null,
    },
    {
      id: 6,
      challengeId: 2,
      text: "man",
      correct: false,
      imageSrc: "/man.svg",
      audioSrc: null,
    },
  ],
  3: [
    {
      id: 7,
      challengeId: 3,
      text: "woman",
      correct: false,
      imageSrc: "/woman.svg",
      audioSrc: null,
    },
    {
      id: 8,
      challengeId: 3,
      text: "man",
      correct: false,
      imageSrc: "/man.svg",
      audioSrc: null,
    },
    {
      id: 9,
      challengeId: 3,
      text: "boy",
      correct: true,
      imageSrc: "/boy.svg",
      audioSrc: null,
    },
  ],
  4: [
    {
      id: 10,
      challengeId: 4,
      text: "woman",
      correct: false,
      imageSrc: null,
      audioSrc: null,
    },
    {
      id: 11,
      challengeId: 4,
      text: "man",
      correct: true,
      imageSrc: null,
      audioSrc: null,
    },
    {
      id: 12,
      challengeId: 4,
      text: "boy",
      correct: false,
      imageSrc: null,
      audioSrc: null,
    },
  ],
  5: [
    {
      id: 13,
      challengeId: 5,
      text: "man",
      correct: false,
      imageSrc: "/man.svg",
      audioSrc: null,
    },
    {
      id: 14,
      challengeId: 5,
      text: "woman",
      correct: false,
      imageSrc: "/woman.svg",
      audioSrc: null,
    },
    {
      id: 15,
      challengeId: 5,
      text: "zombie",
      correct: true,
      imageSrc: "/zombie.svg",
      audioSrc: null,
    },
  ],
  6: [
    {
      id: 16,
      challengeId: 6,
      text: "robot",
      correct: true,
      imageSrc: "/robot.svg",
      audioSrc: null,
    },
    {
      id: 17,
      challengeId: 6,
      text: "zombie",
      correct: false,
      imageSrc: "/zombie.svg",
      audioSrc: null,
    },
    {
      id: 18,
      challengeId: 6,
      text: "boy",
      correct: false,
      imageSrc: "/boy.svg",
      audioSrc: null,
    },
  ],
  7: [
    {
      id: 19,
      challengeId: 7,
      text: "girl",
      correct: true,
      imageSrc: "/girl.svg",
      audioSrc: null,
    },
    {
      id: 20,
      challengeId: 7,
      text: "zombie",
      correct: false,
      imageSrc: "/zombie.svg",
      audioSrc: null,
    },
    {
      id: 21,
      challengeId: 7,
      text: "man",
      correct: false,
      imageSrc: "/man.svg",
      audioSrc: null,
    },
  ],
  8: [
    {
      id: 22,
      challengeId: 8,
      text: "woman",
      correct: false,
      imageSrc: null,
      audioSrc: null,
    },
    {
      id: 23,
      challengeId: 8,
      text: "zombie",
      correct: true,
      imageSrc: null,
      audioSrc: null,
    },
    {
      id: 24,
      challengeId: 8,
      text: "boy",
      correct: false,
      imageSrc: null,
      audioSrc: null,
    },
  ],
};

const createChallengesForLesson = (
  lessonId: number,
  userId: string,
  completedChallenges: MockChallengeProgress[]
): MockChallenge[] => {
  const challengeDefinitions = [
    { type: "SELECT" as const, question: 'Which one of these is "the man"?' },
    { type: "SELECT" as const, question: 'Which one of these is "the woman"?' },
    { type: "SELECT" as const, question: 'Which one of these is "the boy"?' },
    { type: "ASSIST" as const, question: '"the man"' },
    {
      type: "SELECT" as const,
      question: 'Which one of these is "the zombie"?',
    },
    { type: "SELECT" as const, question: 'Which one of these is "the robot"?' },
    { type: "SELECT" as const, question: 'Which one of these is "the girl"?' },
    { type: "ASSIST" as const, question: '"the zombie"' },
  ];

  return challengeDefinitions.map((def, index) => {
    const challengeId = (lessonId - 1) * 8 + index + 1;
    const isCompleted = completedChallenges.some(
      (p) => p.challengeId === challengeId && p.userId === userId && p.completed
    );
    const progress = completedChallenges.filter(
      (p) => p.challengeId === challengeId && p.userId === userId
    );

    return {
      id: challengeId,
      lessonId,
      type: def.type,
      question: def.question,
      order: index + 1,
      completed: isCompleted,
      challengeOptions: challengeOptionsData[index + 1] || [],
      challengeProgress: progress,
    };
  });
};

const createLesson = (
  id: number,
  unitId: number,
  title: string,
  order: number,
  userId: string,
  progressList: MockChallengeProgress[]
): MockLesson => {
  const challenges = createChallengesForLesson(id, userId, progressList);
  return {
    id,
    unitId,
    title,
    order,
    challenges,
    completed: challenges.length > 0 && challenges.every((c) => c.completed),
  };
};

export const createMockUnits = (
  courseId: number,
  userId: string,
  progressList: MockChallengeProgress[]
): MockUnit[] => {
  const unit1Lessons: MockLesson[] = [
    createLesson(1, 1, "Nouns", 1, userId, progressList),
    createLesson(2, 1, "Verbs", 2, userId, progressList),
    createLesson(3, 1, "Adjectives", 3, userId, progressList),
    createLesson(4, 1, "Phrases", 4, userId, progressList),
    createLesson(5, 1, "Sentences", 5, userId, progressList),
  ];

  const unit2Lessons: MockLesson[] = [
    createLesson(6, 2, "Greetings", 1, userId, progressList),
    createLesson(7, 2, "Food", 2, userId, progressList),
    createLesson(8, 2, "Travel", 3, userId, progressList),
    createLesson(9, 2, "Directions", 4, userId, progressList),
    createLesson(10, 2, "Shopping", 5, userId, progressList),
  ];

  return [
    {
      id: 1,
      courseId,
      title: "Unit 1",
      description: "Learn the basics of English",
      order: 1,
      lessons: unit1Lessons,
    },
    {
      id: 2,
      courseId,
      title: "Unit 2",
      description: "Build intermediate English skills",
      order: 2,
      lessons: unit2Lessons,
    },
  ];
};

// In-memory state storage for guest user session
class MockStore {
  userProgress: MockUserProgress = {
    userId: "user_guest",
    userName: "Guest Scholar",
    userImageSrc: "/mascot.svg",
    activeCourseId: 1,
    hearts: MAX_HEARTS,
    points: 120,
  };

  studentProfile: MockStudentProfile = mockStudentProfile;
  userSubscription: MockUserSubscription | null = null;
  challengeProgress: MockChallengeProgress[] = [];

  getCourse(id: number) {
    return mockCourses.find((c) => c.id === id);
  }

  getUserProgress(userId: string) {
    const course = this.getCourse(this.userProgress.activeCourseId);
    return {
      ...this.userProgress,
      userId,
      activeCourse: course || mockCourses[0],
    };
  }

  getStudentProfile(userId: string): MockStudentProfile {
    return {
      ...this.studentProfile,
      userId,
      totalXp: Math.max(
        this.studentProfile.totalXp,
        this.userProgress.points * 10
      ),
    };
  }

  setActiveCourse(courseId: number) {
    this.userProgress.activeCourseId = courseId;
    const course = this.getCourse(courseId);
    if (course) {
      this.userProgress.activeCourse = course;
    }
  }

  getUnits(courseId: number, userId: string) {
    return createMockUnits(courseId, userId, this.challengeProgress);
  }

  getLesson(lessonId: number, userId: string) {
    const allUnits = this.getUnits(this.userProgress.activeCourseId, userId);
    for (const unit of allUnits) {
      const lesson = unit.lessons?.find((l) => l.id === lessonId);
      if (lesson) return lesson;
    }
    const challenges = createChallengesForLesson(
      lessonId,
      userId,
      this.challengeProgress
    );
    return {
      id: lessonId,
      unitId: 1,
      title: "Lesson " + lessonId,
      order: 1,
      challenges,
      completed: challenges.length > 0 && challenges.every((c) => c.completed),
    };
  }

  completeChallenge(challengeId: number, userId: string) {
    const existing = this.challengeProgress.find(
      (p) => p.challengeId === challengeId && p.userId === userId
    );
    if (existing) {
      existing.completed = true;
    } else {
      this.challengeProgress.push({
        id: this.challengeProgress.length + 1,
        challengeId,
        userId,
        completed: true,
      });
    }
    this.userProgress.points += 10;
  }

  reduceHearts() {
    this.userProgress.hearts = Math.max(this.userProgress.hearts - 1, 0);
  }

  refillHearts() {
    this.userProgress.hearts = MAX_HEARTS;
    this.userProgress.points = Math.max(this.userProgress.points - 50, 0);
  }

  getLeaderboard() {
    return [
      {
        userId: "u1",
        userName: "Alex M.",
        userImageSrc: "/mascot.svg",
        points: 1420,
      },
      {
        userId: "u2",
        userName: "Sofia R.",
        userImageSrc: "/mascot.svg",
        points: 1180,
      },
      {
        userId: "u3",
        userName: "Lucas T.",
        userImageSrc: "/mascot.svg",
        points: 950,
      },
      {
        userId: "u4",
        userName: "Maya K.",
        userImageSrc: "/mascot.svg",
        points: 820,
      },
      {
        userId: "user_guest",
        userName: this.userProgress.userName,
        userImageSrc: this.userProgress.userImageSrc,
        points: this.userProgress.points,
      },
      {
        userId: "u5",
        userName: "Ethan W.",
        userImageSrc: "/mascot.svg",
        points: 320,
      },
      {
        userId: "u6",
        userName: "Oliver B.",
        userImageSrc: "/mascot.svg",
        points: 280,
      },
      {
        userId: "u7",
        userName: "Emma S.",
        userImageSrc: "/mascot.svg",
        points: 210,
      },
      {
        userId: "u8",
        userName: "Liam D.",
        userImageSrc: "/mascot.svg",
        points: 150,
      },
      {
        userId: "u9",
        userName: "Noah C.",
        userImageSrc: "/mascot.svg",
        points: 90,
      },
    ].sort((a, b) => b.points - a.points);
  }
}

export const mockStore = new MockStore();
