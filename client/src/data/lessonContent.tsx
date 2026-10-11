// SALMON Lesson Content — all lessons as formatted JSX.
// Content drawn from the SALMON Tool booklet; films by/with the school community.

import React from "react";

// ─── Shared styles ────────────────────────────────────────────────────────────
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl sm:text-2xl font-bold text-[#2C2420] mt-6 sm:mt-8 mb-3 sm:mb-4 font-['DM_Sans']">{children}</h2>
);
const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-base sm:text-lg font-bold text-[#3d2e26] mt-4 sm:mt-6 mb-2 sm:mb-3 font-['DM_Sans']">{children}</h3>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[#4a3f35] mb-3 sm:mb-4 leading-relaxed text-[15px] sm:text-base">{children}</p>
);
const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="list-disc pl-4 sm:pl-6 mb-3 sm:mb-4 space-y-1 text-[#4a3f35] text-[15px] sm:text-base">{children}</ul>
);
const LI = ({ children }: { children: React.ReactNode }) => <li className="leading-relaxed">{children}</li>;
const Bold = ({ children }: { children: React.ReactNode }) => <strong className="font-bold">{children}</strong>;
const Em = ({ children }: { children: React.ReactNode }) => <em className="italic">{children}</em>;

const ExtLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#9B2335] hover:text-[#5d131e] font-semibold underline">
    {children}
  </a>
);
const InLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="inline-flex items-center gap-1 text-[#9B2335] hover:text-[#5d131e] font-semibold underline">
    {children}
  </a>
);

const VideoEmbed = ({ id, title }: { id: string; title: string }) => (
  <div className="my-4 sm:my-6">
    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
      <iframe
        className="absolute inset-0 w-full h-full rounded"
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
    <p className="text-sm text-gray-500 mt-2 italic">{title}</p>
  </div>
);

const ReflectionBox = ({ questions, title = "Guiding Reflection Questions" }: { questions: string[]; title?: string }) => (
  <div className="bg-[#FBF4F0] border-l-4 border-[#9B2335] p-3 sm:p-5 my-4 sm:my-6 rounded-r">
    <h3 className="font-bold text-[#2C2420] mb-3 font-['DM_Sans']">{title}</h3>
    <p className="text-[#6b5e52] text-sm mb-3">These are the tool's own questions — take a moment with each:</p>
    <ul className="space-y-2">
      {questions.map((q, i) => (
        <li key={i} className="text-[#4a3f35] text-[15px] leading-relaxed flex gap-2">
          <span className="text-[#9B2335] font-bold shrink-0">{i + 1}.</span>
          <span>{q}</span>
        </li>
      ))}
    </ul>
  </div>
);

const AreaCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white border border-[#e2ddd5] p-4 sm:p-5 my-4 rounded-sm shadow-sm">
    <h3 className="font-bold text-[#2C2420] mb-2 font-['DM_Sans'] text-base sm:text-lg">{title}</h3>
    <p className="text-[#4a3f35] leading-relaxed text-[15px] sm:text-base m-0">{children}</p>
  </div>
);

const PageImg = ({ n, alt }: { n: number; alt: string }) => (
  <figure className="my-5 sm:my-6 mx-0">
    <img src={`/booklet/p${String(n).padStart(2, "0")}.jpg`} alt={alt} className="w-full h-auto rounded shadow-md border border-[#e2ddd5]" loading="lazy" />
    <figcaption className="text-sm text-gray-500 mt-2 italic">From the SALMON Tool, page {n}.</figcaption>
  </figure>
);

const GoDeeper = ({ links }: { links: { label: string; href: string }[] }) => (
  <div className="bg-[#f4efe8] border border-[#e2ddd5] p-4 sm:p-5 my-5 rounded-sm">
    <h3 className="font-bold text-[#2C2420] mb-2 font-['DM_Sans']">Go Deeper</h3>
    <ul className="space-y-1.5">
      {links.map((l) => (
        <li key={l.href}>
          <ExtLink href={l.href}>{l.label} ↗</ExtLink>
        </li>
      ))}
    </ul>
  </div>
);

// ─── Lessons ──────────────────────────────────────────────────────────────────

const content: Record<string, React.ReactNode> = {

  // ── INTRO ──
  "before-you-begin-the-story-of-salmon": (
    <>
      <P><Em>Before anything else, meet the place.</Em> SALMON was not written in an office — it grew out of daily life at Seabird Island Community School, on Stó:lō territory beside the Fraser River in British Columbia.</P>
      <VideoEmbed id="EP5b48Weyrc" title="Seabird Island Community School — produced by Jason Bruce" />
      <H2>Why SALMON exists</H2>
      <P>The Seabird Assessment for Learning, Mentorship, and Ongoing Nurturing (SALMON) evaluation tool represents a significant departure from traditional approaches to teacher evaluation — a holistic, community-centred framework designed for the unique cultural and educational context of Seabird Island Community School.</P>
      <P>It was developed collaboratively, with contributions from the <Bold>language and culture team, teachers, educational assistants, and the vice-principal</Bold>. Its design reflects a simple belief: evaluation should be more than a performance review — it should foster <Bold>mentorship, continuous learning, and cultural responsiveness</Bold>.</P>
      <H2>What makes it different</H2>
      <UL>
        <LI><Bold>Growth is a cycle, not a scoreboard.</Bold> Educators locate themselves on the salmon's lifecycle — Spawning, Fry, Smolt, Returning Adult — and track their journey visually.</LI>
        <LI><Bold>Culture is inside the criteria.</Bold> Stó:lō cultural responsiveness and Halq'eméylem integration are assessed areas in their own right.</LI>
        <LI><Bold>Accountability runs both ways.</Bold> Teachers also evaluate how well administrators facilitate the process.</LI>
      </UL>
      <H2>How this program works</H2>
      <P>Three modules walk you through the framework: the lifecycle, the conversation at the heart of the tool, and the areas where educators grow. Each module ends with activities you can do on your own or bring to a colleague. Five foundation topics sit alongside the modules whenever you want to go deeper.</P>
      <P>You can open <InLink href="/tool">the full 24-page tool</InLink> at any point — this program follows it page by page.</P>
    </>
  ),

  // ── MODULE 1 ──
  "lesson-1-1-module-overview": (
    <>
      <P>This module introduces the heart of SALMON: the salmon lifecycle as a way of seeing educator growth.</P>
      <H2>In this module</H2>
      <UL>
        <LI>Why a river, and why salmon — the metaphor that carries the whole framework</LI>
        <LI>The four stages: Spawning, Fry, Smolt, and Returning Adult</LI>
        <LI>An activity to locate yourself in the cycle, honestly and without judgment</LI>
      </UL>
      <H2>The idea in one paragraph</H2>
      <P>Just as the salmon journeys through distinct phases of life, educators move through stages of growth — each building on the last, in a continuous cycle of learning. The stages carry no shame and no finish line: a Returning Adult mentors others <Em>and</Em> keeps growing. The river always moves.</P>
      <PageImg n={9} alt="The SALMON Journey — the four lifecycle stages illustrated in the tool" />
    </>
  ),

  "lesson-1-2-the-lifecycle-four-stages-of-growth": (
    <>
      <P>Every page of the SALMON tool asks educators to mark where they are on the lifecycle. Here is what each stage means.</P>
      <H3>1 · Spawning — Initiating Growth</H3>
      <P>The very beginning of a teacher's growth journey. Like salmon eggs full of potential, teachers in this stage are laying the foundation for future development — exploring, discovering, and building core skills. It is a time of nurturing early efforts, with a focus on support, mentorship, and building confidence for the path ahead.</P>
      <H3>2 · Fry — Emerging Growth</H3>
      <P>Teachers are starting to find their flow. Like young salmon navigating a stream, they are gaining independence and actively applying the foundational skills they've developed. This stage is marked by emerging confidence and adapting to new challenges with support and feedback.</P>
      <H3>3 · Smolt — Sustained Growth</H3>
      <P>Consistent and sustained growth. Teachers confidently apply their skills, adapt fluidly to diverse classroom needs, and are culturally responsive in their daily practices. Like smolt moving into deeper waters, they are preparing for broader challenges — leadership, collaboration, mastery.</P>
      <H3>4 · Returning Adult — Thriving &amp; Leading</H3>
      <P>Teachers thriving in their roles and leading within their school and community. Just as salmon return to their home waters, these teachers have completed a full cycle of growth — and now contribute their knowledge to others as mentors, role models, and leaders.</P>
      <H2>How the stages are used</H2>
      <P>In the tool, educators <Bold>highlight along the lines between stages</Bold> to show the stage they believe they've reached — and administrators do the same from their perspective. The two marks start a conversation, not a verdict. Where they differ, that difference is exactly what's worth talking about.</P>
      <PageImg n={12} alt="A worksheet page showing the lifecycle wheel beside self-evaluation, administrator feedback, and coactive goal-setting columns" />
    </>
  ),

  "lesson-1-3-activities-where-are-you-in-the-cycle": (
    <>
      <P>Time to put the lifecycle to work on your own practice.</P>
      <H2>Activity 1 — Locate yourself</H2>
      <P>Think of your practice as a whole this term. Which stage feels most like where you are: Spawning, Fry, Smolt, or Returning Adult? Say it out loud, or write it down. Remember: the stages carry no rank — only place.</P>
      <ReflectionBox
        title="Notice · Ask · Set"
        questions={[
          "Notice: What part of your practice feels newest right now, and what support would help it take root?",
          "Ask: Who at your school could observe one lesson and tell you one thing that's working?",
          "Set: Name one skill to practise deliberately for the next month — and decide how you'll know it worked.",
        ]}
      />
      <H2>Activity 2 — Ask the river question</H2>
      <P>The salmon returns to the waters that raised it. Ask yourself: <Em>who is growing because of me — and who could be?</Em> If the answer comes slowly, that's a direction, not a failure.</P>
      <H2>Keep your notes</H2>
      <P>The <InLink href="/reflect">Reflection Library</InLink> holds every guiding question in the tool with a private notes space that stays on your device — and a print button for bringing your reflections to a conversation.</P>
    </>
  ),

  // ── MODULE 2 ──
  "lesson-2-1-module-overview": (
    <>
      <P>This module teaches the conversation at the heart of SALMON — the five moves that turn a page of the booklet into dialogue.</P>
      <H2>The five moves</H2>
      <UL>
        <LI><Bold>Guiding Reflection Questions.</Bold> Begin with the questions at the start of each section — they guide your thinking about cultural responsiveness, collaboration, and belonging before any marking happens.</LI>
        <LI><Bold>Self-Evaluation (Teacher Stream).</Bold> Reflect on your progress, and highlight along the lifecycle lines to the stage you believe you've reached.</LI>
        <LI><Bold>Administrator Feedback.</Bold> Your administrator marks the stage from their perspective — on the same page, in the open.</LI>
        <LI><Bold>Coactive Goal-Setting.</Bold> Together, you set goals that are specific to where the two marks landed, and to what the community values.</LI>
        <LI><Bold>Feedback to Administrators.</Bold> The tool closes the loop: teachers assess how well the process itself was facilitated.</LI>
      </UL>
      <H2>In this module</H2>
      <P>Next, the first key area of the tool — culture, family, and community — with the exact questions educators sit with, and the film the students made about carrying their culture forward.</P>
    </>
  ),

  "lesson-2-2-culture-family-and-community": (
    <>
      <P>The first key area of SALMON evaluates how teachers integrate Stó:lō culture and Halq'eméylem language into their lessons, work with cultural guardians, and collaborate with families. Authenticity and strong community bonds are crucial — participation in community events and engagement with families are key indicators of trust.</P>
      <VideoEmbed id="H3yrPfDtOWQ" title="FOR OUR CULTURE — N'we Jinan Artists, recorded at Seabird Island Community School" />
      <AreaCard title="Stó:lō Cultural Responsiveness & Halq'eméylem Integration">
        Teachers are assessed on their ability to integrate Stó:lō cultural knowledge, traditions, and the Halq'eméylem language into their lessons. Collaboration with the language and culture team is required — evidence of culturally responsive lesson plans and classroom activities demonstrates effective integration.
      </AreaCard>
      <ReflectionBox questions={[
        "How effectively do you incorporate Stó:lō cultural knowledge and Halq'eméylem language into your daily lessons?",
        "In what ways do you collaborate with community members or Elders to ensure authentic cultural content is integrated into your teaching?",
        "How do you ensure that students feel a deep sense of cultural belonging and connection in your classroom?",
        "What additional resources or support do you need to strengthen the integration of Stó:lō culture into your teaching practice?",
      ]} />
      <AreaCard title="Communication & Collaboration with Families">
        Teachers are assessed on their communication and relationship-building with families, focusing on how family input is integrated into supporting student learning — regular, meaningful interactions that foster trust and promote student development.
      </AreaCard>
      <AreaCard title="Community Participation & Engagement">
        Teachers are assessed on their involvement in community and school events, with a focus on building relationships beyond the classroom and showing up where the community gathers.
      </AreaCard>
      <GoDeeper links={[
        { label: "Halq'eméylem on FirstVoices", href: "https://www.firstvoices.com/halqemeylem" },
        { label: "First Peoples' Cultural Council", href: "https://fpcc.ca/" },
        { label: "First Peoples Principles of Learning (FNESC)", href: "https://www.fnesc.ca/first-peoples-principles-of-learning/" },
      ]} />
    </>
  ),

  "lesson-2-3-activities-culture-in-practice": (
    <>
      <P>Culture in the criteria only matters if it reaches Monday morning. These activities make it concrete.</P>
      <H2>Activity 1 — The lesson-plan walk-through</H2>
      <P>Take one lesson you're teaching this week. Walk it through three questions: Where does Stó:lō knowledge (or your community's knowledge) live in it? Where could the language enter, even as a single greeting or place-name? Who in the community could deepen it?</P>
      <H2>Activity 2 — The family touchpoint</H2>
      <P>Choose one family you haven't spoken with this month. Make one positive contact — not about a problem, but about something their child did well. Notice what it changes.</P>
      <ReflectionBox
        title="From the tool — Communication & Collaboration with Families"
        questions={[
          "How consistently do you engage with families to understand their aspirations and concerns regarding their child's education?",
          "What methods do you use to involve parents in their child's learning process, both inside and outside of school?",
          "How do you ensure that communication with families is reciprocal and supports a collaborative approach to student success?",
          "What strategies do you plan to implement to enhance family involvement in future classroom activities or school events?",
        ]}
      />
      <H2>Bring it to the page</H2>
      <P>Open <InLink href="/tool">the tool</InLink> to the Cultural Integration section and try the three columns — self-evaluation, administrator feedback, coactive goal-setting — even if you fill in only the first one today.</P>
    </>
  ),

  // ── MODULE 3 ──
  "lesson-3-1-module-overview": (
    <>
      <P>The final module covers the craft areas — instruction, classroom management, holistic assessment — and the growth areas that keep teaching sustainable: professional development, leadership, and self-care.</P>
      <H2>In this module</H2>
      <UL>
        <LI>Curriculum planning, classroom management, and holistic student assessment — what the tool looks for</LI>
        <LI>Professional development plans, collaborative leadership, and the educator self-care routine</LI>
        <LI>An activity for setting goals <Em>together</Em> — the "coactive" in coactive goal-setting</LI>
      </UL>
      <P>This section of the tool focuses on curriculum structure, pacing, and classroom environment, assessing how teachers manage diverse student needs — with emphasis on holistic assessment strategies that promote student growth, and on classrooms that respect emotional and cultural needs.</P>
    </>
  ),

  "lesson-3-2-instruction-assessment-and-leadership": (
    <>
      <H2>The craft areas</H2>
      <AreaCard title="Curriculum Planning, Pacing & Learning Objectives">
        Teachers' ability to plan and pace curriculum effectively throughout the year is assessed, with clear, student-friendly learning objectives that families can understand too.
      </AreaCard>
      <AreaCard title="Classroom Management">
        Assessed on how well teachers create a respectful and inclusive environment — one that honours students' emotional and cultural needs while keeping learning moving.
      </AreaCard>
      <AreaCard title="Holistic Student Assessment">
        Teachers are assessed on their use of holistic assessments that capture a range of student abilities — alternative assessments such as portfolios and presentations, reviewed for how well they measure progress across different dimensions.
      </AreaCard>
      <H2>The growth areas</H2>
      <AreaCard title="Professional Development Plan">
        Teachers set professional development goals that align with the school's strategic needs, focused on enhancing teaching practices and contributing to student success.
      </AreaCard>
      <AreaCard title="Collaborative Leadership">
        Teachers' contributions to leadership within the school — mentoring peers, supporting collaboration, and participating in initiatives — are evaluated and nurtured.
      </AreaCard>
      <AreaCard title="Educator Self-Care Routine">
        Teachers reflect on how well they balance professional responsibilities with personal well-being — because sustainable teaching is part of good teaching.
      </AreaCard>
      <ReflectionBox
        title="From the tool — Holistic Student Assessment"
        questions={[
          "How do you implement diverse assessment strategies to capture the full range of student strengths and learning styles?",
          "How do you incorporate self-assessment and reflective practices to help students take ownership of their learning?",
          "What evidence do you collect to track student progress holistically, including academic, social, and emotional growth?",
          "What steps can you take to enhance your use of formative and summative assessments in the classroom?",
        ]}
      />
    </>
  ),

  "lesson-3-3-activities-goals-set-together": (
    <>
      <P>SALMON ends every section the same way: a goal set <Em>with</Em> someone, not <Em>for</Em> someone. This final set of activities practises that.</P>
      <H2>Activity 1 — The two-marks conversation</H2>
      <P>With a colleague or administrator you trust, each privately mark where you'd place your practice on the lifecycle for one area. Compare. Where the marks differ, talk about why — that difference is the most useful data the tool produces.</P>
      <H2>Activity 2 — One goal, three owners</H2>
      <P>Write one professional goal for this term. Then name what <Bold>you</Bold> will do, what your <Bold>administrator</Bold> could do to support it, and what the <Bold>community</Bold> connection could be. A goal with three owners survives the school year.</P>
      <ReflectionBox
        title="From the tool — Professional Development Plan"
        questions={[
          "What professional development goals have you set, and how do they align with the school's strategic needs?",
          "How do you reflect on areas for growth, and who gives you honest feedback?",
          "How will your goals enhance teaching practices and student success?",
          "What support do you need to follow through this term?",
        ]}
      />
      <H2>Finish the cycle</H2>
      <P>Mark this lesson complete, and your <InLink href="/certificate">certificate</InLink> is ready — then the real work begins: bring <InLink href="/tool">the tool</InLink> to your school's next growth conversation.</P>
    </>
  ),

  // ── FOUNDATIONS ──
  "foundation-first-peoples-principles-of-learning": (
    <>
      <P>SALMON stands on pedagogical ground articulated beautifully by the First Nations Education Steering Committee: learning is holistic, reflexive, relational, and grounded in place.</P>
      <H2>Where SALMON aligns</H2>
      <UL>
        <LI><Bold>Learning supports the well-being of the self, family, and community</Bold> — which is why families and community engagement are assessed areas, not afterthoughts.</LI>
        <LI><Bold>Learning is embedded in memory, history, and story</Bold> — the lifecycle metaphor is a story the whole school community already knows.</LI>
        <LI><Bold>Learning requires patience and time</Bold> — four stages, no deadlines, a cycle rather than a ladder.</LI>
      </UL>
      <GoDeeper links={[
        { label: "First Peoples Principles of Learning (FNESC)", href: "https://www.fnesc.ca/first-peoples-principles-of-learning/" },
        { label: "Learning First Peoples classroom resources", href: "https://www.fnesc.ca/learningfirstpeoples/" },
      ]} />
    </>
  ),

  "foundation-halqemeylem-in-the-classroom": (
    <>
      <P>At Seabird Island Community School, Halq'eméylem is part of daily life — Sxwōwálólh readers in the classrooms, language on the walls, and a language and culture team teachers collaborate with.</P>
      <figure className="my-5 mx-0">
        <img src="/img-readers.jpg" alt="Sxwōwálólh Halq'eméylem readers in a Seabird Island classroom" className="w-full h-auto rounded shadow-md border border-[#e2ddd5]" loading="lazy" />
        <figcaption className="text-sm text-gray-500 mt-2 italic">Sxwōwálólh readers in a Seabird Island classroom — from the school's film.</figcaption>
      </figure>
      <P>That is why the very first assessed area of the tool is <Bold>Stó:lō Cultural Responsiveness &amp; Halq'eméylem Integration</Bold>: language isn't an enrichment activity, it's a dimension of good teaching in this community.</P>
      <GoDeeper links={[
        { label: "Halq'eméylem on FirstVoices — hear the language", href: "https://www.firstvoices.com/halqemeylem" },
        { label: "First Peoples' Cultural Council", href: "https://fpcc.ca/" },
      ]} />
    </>
  ),

  "foundation-the-stolo-education-committee": (
    <>
      <P>At the heart of this work was the Stó:lō Education Committee — four respected Stó:lō educators who brought lived experience, cultural knowledge, and commitment to community into every phase of the journey.</P>
      <UL>
        <LI><Bold>Siyámíya (Dianna) Kay</Bold> — Language Curriculum Developer</LI>
        <LI><Bold>Kweláxtelot (Karla) Kay</Bold> — Language Vitalist</LI>
        <LI><Bold>Saylesh Wesley</Bold> — First Nations Resource Enhancement Teacher</LI>
        <LI><Bold>Camielle Laslo</Bold> — Halq'eméylem Teacher</LI>
      </UL>
      <P>Their guidance ensured the process honoured the voices of local educators and remained grounded in relational accountability — with people, with place, and with the teachings carried by those who have long served their communities.</P>
      <P>The committee's work is described step by step in <InLink href="/process">Our Process</InLink>.</P>
    </>
  ),

  "foundation-the-values-that-anchor-it": (
    <>
      <P>Seabird Island Community School commits to keeping Stó:lō history, culture, and language at the forefront of education — and to teaching the highly honoured values of <Bold>self-reliance, generosity, honesty, and respect</Bold> to guide students in their personal and academic journeys.</P>
      <H2>The same values, turned toward teachers</H2>
      <UL>
        <LI><Bold>Self-reliance</Bold> — self-evaluation comes first; educators name their own stage before anyone else does.</LI>
        <LI><Bold>Generosity</Bold> — Returning Adults mentor; knowledge is for passing on.</LI>
        <LI><Bold>Honesty</Bold> — two marks on one page, in the open, with the differences discussed.</LI>
        <LI><Bold>Respect</Bold> — feedback flows both directions, including toward administrators.</LI>
      </UL>
      <P>A school's vision and a teacher-growth tool drawn from the same well — that is what makes SALMON belong to its community.</P>
    </>
  ),

  "foundation-reciprocal-evaluation": (
    <>
      <P>In a reciprocal evaluation process, teachers assess the effectiveness of administrators in facilitating the teacher evaluation process. Transparency, fairness, and the promotion of growth are the key metrics — and this feedback encourages open communication and collaboration between teachers and administrators, ensuring continuous improvement in evaluation practices.</P>
      <ReflectionBox
        title="From the tool — Facilitation of the Evaluation Process"
        questions={[
          "How transparent do you find the evaluation process, and how well do you understand the criteria being used?",
          "In what ways does the evaluation process provide meaningful feedback that supports your professional growth?",
          "How can the evaluation process be improved to better support your development and align with your personal and professional goals?",
          "What suggestions do you have for improving the evaluation process to better support teachers' growth and the overall school community?",
        ]}
      />
      <P>Few evaluation frameworks anywhere ask this. It is SALMON's quiet signature: <Em>nobody in the building is above growing.</Em></P>
    </>
  ),
};

export function getLessonContent(slug: string): React.ReactNode {
  return content[slug] ?? null;
}
