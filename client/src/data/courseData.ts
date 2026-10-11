// SALMON Program Data — The SALMON Course
// Structure: intro + 3 modules (overview / teaching / activities) + 5 foundation topics

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  type: 'intro' | 'overview' | 'chapter' | 'activities' | 'foundation';
  moduleId: string | null;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface FoundationTopic {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  type: 'foundation';
  moduleId: null;
}

export interface CourseData {
  title: string;
  slug: string;
  intro: Lesson;
  foundations: FoundationTopic[];
  modules: Module[];
}

export const COURSE: CourseData = {
  title: 'The SALMON Program',
  slug: 'salmon',
  intro: {
    id: 'before-you-begin',
    slug: 'before-you-begin-the-story-of-salmon',
    title: 'Before You Begin: The Story of SALMON',
    type: 'intro',
    moduleId: null,
  },
  foundations: [
    {
      id: 'foundation-1',
      slug: 'foundation-first-peoples-principles-of-learning',
      title: 'First Peoples Principles of Learning',
      subtitle: 'The pedagogical ground SALMON stands on, and where to go deeper.',
      type: 'foundation',
      moduleId: null,
    },
    {
      id: 'foundation-2',
      slug: 'foundation-halqemeylem-in-the-classroom',
      title: "Halq'eméylem in the Classroom",
      subtitle: 'Language is not an add-on — it is an assessed area of practice.',
      type: 'foundation',
      moduleId: null,
    },
    {
      id: 'foundation-3',
      slug: 'foundation-the-stolo-education-committee',
      title: 'The Stó:lō Education Committee',
      subtitle: 'The four educators whose guidance shaped every page of the tool.',
      type: 'foundation',
      moduleId: null,
    },
    {
      id: 'foundation-4',
      slug: 'foundation-the-values-that-anchor-it',
      title: 'The Values That Anchor It',
      subtitle: 'Self-reliance, generosity, honesty, and respect — from the school to the tool.',
      type: 'foundation',
      moduleId: null,
    },
    {
      id: 'foundation-5',
      slug: 'foundation-reciprocal-evaluation',
      title: 'Reciprocal Evaluation',
      subtitle: 'Teachers evaluate administrators too. Accountability runs both ways.',
      type: 'foundation',
      moduleId: null,
    },
  ],
  modules: [
    {
      id: 'module-1',
      title: "MODULE 1 — THE RIVER'S TEACHING",
      lessons: [
        { id: 'lesson-1-1', slug: 'lesson-1-1-module-overview', title: 'Lesson 1.1 — Module Overview', type: 'overview', moduleId: 'module-1' },
        { id: 'lesson-1-2', slug: 'lesson-1-2-the-lifecycle-four-stages-of-growth', title: 'Lesson 1.2 — The Lifecycle: Four Stages of Growth', type: 'chapter', moduleId: 'module-1' },
        { id: 'lesson-1-3', slug: 'lesson-1-3-activities-where-are-you-in-the-cycle', title: 'Lesson 1.3 — Activities & Tools: Where Are You in the Cycle?', type: 'activities', moduleId: 'module-1' },
      ],
    },
    {
      id: 'module-2',
      title: 'MODULE 2 — THE CONVERSATION',
      lessons: [
        { id: 'lesson-2-1', slug: 'lesson-2-1-module-overview', title: 'Lesson 2.1 — Module Overview', type: 'overview', moduleId: 'module-2' },
        { id: 'lesson-2-2', slug: 'lesson-2-2-culture-family-and-community', title: 'Lesson 2.2 — Culture, Family & Community', type: 'chapter', moduleId: 'module-2' },
        { id: 'lesson-2-3', slug: 'lesson-2-3-activities-culture-in-practice', title: 'Lesson 2.3 — Activities & Tools: Culture in Practice', type: 'activities', moduleId: 'module-2' },
      ],
    },
    {
      id: 'module-3',
      title: 'MODULE 3 — GROWING TOGETHER',
      lessons: [
        { id: 'lesson-3-1', slug: 'lesson-3-1-module-overview', title: 'Lesson 3.1 — Module Overview', type: 'overview', moduleId: 'module-3' },
        { id: 'lesson-3-2', slug: 'lesson-3-2-instruction-assessment-and-leadership', title: 'Lesson 3.2 — Instruction, Assessment & Leadership', type: 'chapter', moduleId: 'module-3' },
        { id: 'lesson-3-3', slug: 'lesson-3-3-activities-goals-set-together', title: 'Lesson 3.3 — Activities & Tools: Goals Set Together', type: 'activities', moduleId: 'module-3' },
      ],
    },
  ],
};

export const ALL_LESSONS: Lesson[] = [
  COURSE.intro,
  ...COURSE.modules.flatMap(m => m.lessons),
];

export const FOUNDATION_LESSONS: Lesson[] = COURSE.foundations.map(f => ({
  id: f.id,
  slug: f.slug,
  title: f.title,
  type: 'foundation' as const,
  moduleId: null,
}));

export const ALL_NAVIGABLE: Lesson[] = [
  COURSE.intro,
  ...FOUNDATION_LESSONS,
  ...COURSE.modules.flatMap(m => m.lessons),
];

export function getLessonBySlug(slug: string): Lesson | undefined {
  return ALL_NAVIGABLE.find(l => l.slug === slug);
}

export function getLessonIndex(slug: string): number {
  return ALL_LESSONS.findIndex(l => l.slug === slug);
}

export function getPrevLesson(slug: string): Lesson | undefined {
  const idx = ALL_NAVIGABLE.findIndex(l => l.slug === slug);
  return idx > 0 ? ALL_NAVIGABLE[idx - 1] : undefined;
}

export function getNextLesson(slug: string): Lesson | undefined {
  const idx = ALL_NAVIGABLE.findIndex(l => l.slug === slug);
  return idx < ALL_NAVIGABLE.length - 1 ? ALL_NAVIGABLE[idx + 1] : undefined;
}
