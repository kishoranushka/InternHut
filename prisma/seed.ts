import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import type {
  Deliverable,
  EligibilityItem,
  FaqItem,
  WeeklyPlanItem,
} from "../lib/validation/internship-content";

async function seedAdmin() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  const name = process.env.SEED_ADMIN_NAME ?? "Admin";

  if (!email || !password) {
    throw new Error(
      "Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in your environment before running the seed script.",
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name },
    create: { email, passwordHash, name },
  });

  console.log(`Admin user ready: ${admin.email}`);
}

/** Standard three-row eligibility block, reworded per internship's actual prerequisites. */
function eligibility(prerequisites: string, needs: string): EligibilityItem[] {
  return [
    {
      label: "Who can apply",
      body: "Students currently enrolled in an undergraduate, postgraduate or diploma programme in India.",
    },
    { label: "Prerequisites", body: prerequisites },
    { label: "You will need", body: needs },
  ];
}

/** Standard seven-question FAQ block; the first and last answers reference the internship by name. */
function faqs(title: string, timeCommitment: string): FaqItem[] {
  return [
    {
      q: "Who will I be interning with?",
      a: "With [Partner company], one of our vetted partner companies. They set the project and provide your mentor; we match you, coordinate the programme and handle verification.",
    },
    {
      q: `What should I know before starting ${title}?`,
      a: "Nothing beyond what's listed under Eligibility. Week one includes a guided orientation, and the first milestone is planning rather than production work.",
    },
    {
      q: "How much time will this take each week?",
      a: `Plan for ${timeCommitment} a week. Milestones are due at the end of each week, so you can schedule the work around classes.`,
    },
    {
      q: "What happens if I miss a milestone deadline?",
      a: "Late submissions are still reviewed, after on-time ones. If you need an extension for exams or illness, ask your mentor before the deadline.",
    },
    {
      q: "Is the fee refundable?",
      a: "Refund terms are set out in the refund policy, linked in the footer.",
    },
    {
      q: "Does completing this guarantee a job or placement?",
      a: "No. Graditute does not promise jobs or placements. You leave with a reviewed project and a verifiable certificate you can show to employers.",
    },
    {
      q: "How do employers check my certificate?",
      a: "They enter the certificate ID on the verification page, or scan the QR code. The record shows your name, programme, completion date and skills assessed.",
    },
  ];
}

type InternshipSeed = {
  slug: string;
  title: string;
  category: string;
  mode: "REMOTE" | "HYBRID" | "ON_CAMPUS";
  level: "BEGINNER" | "INTERMEDIATE";
  durationWeeks: number;
  weeklyEffortHours: string;
  priceInPaise: number;
  seatsTotal: number;
  startDate: Date;
  tags: string[];
  shortDescription: string;
  overview: string[];
  learningOutcomes: string[];
  deliverables: Deliverable[];
  weeklyPlan: WeeklyPlanItem[];
  eligibility: EligibilityItem[];
  faqs: FaqItem[];
  courseEligibility: ("BBA" | "BCOM" | "BCA" | "BSC" | "MBA" | "MCOM" | "OTHER")[];
  perks: string[];
};

const INTERNSHIPS: InternshipSeed[] = [
  {
    slug: "frontend-development-with-react",
    title: "Frontend Development with React",
    category: "Software development",
    mode: "REMOTE",
    level: "BEGINNER",
    durationWeeks: 8,
    weeklyEffortHours: "8–10 hours",
    priceInPaise: 599900,
    seatsTotal: 30,
    startDate: new Date("2026-11-02"),
    tags: ["react", "javascript", "css", "web", "frontend"],
    shortDescription:
      "Build a responsive web dashboard from the partner company's brief, reviewed every week by a working engineer.",
    overview: [
      "You will build an organiser dashboard for an events platform — the screens organisers use to publish events, track registrations and post updates. The partner company provides the brief, a mock API and design references on day one.",
      "Each week opens one milestone. You submit a specific piece of work, your company mentor reviews it against a published rubric, and their comments shape the next milestone. By week eight you have a complete, documented project you can walk anyone through.",
    ],
    learningOutcomes: [
      "Structure a React app into reusable, testable components",
      "Manage state and data fetching from a REST API",
      "Build responsive layouts that work from phone to desktop",
      "Apply accessibility basics: semantics, focus, contrast",
      "Use Git and pull requests the way teams do",
      "Explain your technical decisions in writing",
    ],
    deliverables: [
      { title: "Wireframes for four core screens", due: "Milestone 1", format: "Figma or PDF" },
      { title: "Reusable component library", due: "Milestone 2", format: "Git repository" },
      { title: "Dashboard connected to the mock API", due: "Milestones 3–4", format: "Deployed preview link" },
      { title: "Handover note and walkthrough recording", due: "Final review", format: "README + 5-min video" },
    ],
    weeklyPlan: [
      { week: "Week 1", title: "Orientation & brief walkthrough", body: "Set up your environment, meet your mentor, read the brief and rubric." },
      { week: "Week 2", title: "Milestone 1 · Plan & wireframe", body: "Map user tasks and wireframe the four core screens. First mentor review." },
      { week: "Weeks 3–4", title: "Milestone 2 · Component library", body: "Build buttons, forms, tables and layout primitives with documented props." },
      { week: "Weeks 5–6", title: "Milestones 3–4 · Dashboard & data", body: "Assemble the dashboard, connect it to the API, handle loading and error states." },
      { week: "Week 7", title: "Milestone 5 · Polish & accessibility", body: "Responsive refinements, keyboard support and an accessibility pass.", milestone: true },
      { week: "Week 8", title: "Final project review", body: "Submit the handover note and walkthrough. Completion decision within five working days." },
    ],
    eligibility: eligibility(
      "Working knowledge of HTML, CSS and basic JavaScript. No prior React experience needed.",
      "A laptop that can run a code editor and a modern browser, and a stable internet connection.",
    ),
    faqs: faqs("Frontend Development with React", "8–10 hours"),
    courseEligibility: ["BCA", "BSC", "OTHER"],
    perks: [
      "Weekly mentor review from a company engineer",
      "Published rubric and completion criteria",
      "Verifiable certificate naming the partner company",
    ],
  },
  {
    slug: "data-analytics-with-python-and-sql",
    title: "Data Analytics with Python & SQL",
    category: "Data & AI",
    mode: "REMOTE",
    level: "BEGINNER",
    durationWeeks: 10,
    weeklyEffortHours: "8–10 hours",
    priceInPaise: 649900,
    seatsTotal: 30,
    startDate: new Date("2026-11-02"),
    tags: ["python", "sql", "pandas", "excel", "analytics", "data"],
    shortDescription:
      "Clean, query and present a real dataset, ending in a written analysis your mentor signs off.",
    overview: [
      "A partner company needs a year of operational data turned into something a non-technical manager can act on. You will clean a messy export, model it in a relational database, and answer a set of real business questions in SQL.",
      "Each milestone hands over one concrete artefact — a data dictionary, a query set, a dashboard, a memo — reviewed by a mentor who works with this kind of data every day. The final deliverable is a short written analysis with a recommendation, not just a chart dump.",
    ],
    learningOutcomes: [
      "Clean and validate a real, messy dataset in pandas",
      "Model data into normalised tables and write efficient SQL joins",
      "Answer specific business questions with aggregation queries",
      "Build a small dashboard that updates from a live query",
      "Spot and explain misleading or confounded results",
      "Write a recommendation memo a non-technical reader can act on",
    ],
    deliverables: [
      { title: "A cleaned dataset with a data dictionary", due: "Milestone 1", format: "CSV + PDF" },
      { title: "SQL queries answering six operational questions", due: "Milestone 2", format: "SQL file" },
      { title: "A four-view dashboard", due: "Milestones 3–4", format: "Shared workbook link" },
      { title: "A two-page recommendation memo", due: "Final review", format: "PDF" },
    ],
    weeklyPlan: [
      { week: "Weeks 1–2", title: "Orientation & data cleaning", body: "Set up your tools, meet your mentor, and clean the raw export into usable tables." },
      { week: "Weeks 3–4", title: "Milestone 1 · Data dictionary", body: "Document every field, flag anomalies, and agree the modelling approach with your mentor." },
      { week: "Weeks 5–6", title: "Milestone 2 · SQL questions", body: "Write and test queries answering six real operational questions from the brief." },
      { week: "Weeks 7–8", title: "Milestones 3–4 · Dashboard", body: "Turn the query results into a four-view dashboard a manager could actually use.", milestone: true },
      { week: "Week 9", title: "Draft recommendation memo", body: "Draft the written analysis; mentor reviews for clarity and rigour before the final pass." },
      { week: "Week 10", title: "Final project review", body: "Submit the finished memo and dashboard. Completion decision within five working days." },
    ],
    eligibility: eligibility(
      "Comfort with spreadsheets and basic logic (if/and/or). No prior SQL or Python experience needed — week one includes a refresher.",
      "A laptop that can run Python and a free database tool, and a stable internet connection.",
    ),
    faqs: faqs("Data Analytics with Python & SQL", "8–10 hours"),
    courseEligibility: ["BCA", "BSC", "BCOM", "MCOM", "OTHER"],
    perks: [
      "Hands-on SQL and pandas work on a real dataset",
      "Mentor-scored milestones",
      "Verifiable certificate naming the partner company",
    ],
  },
  {
    slug: "ui-ux-design-foundations",
    title: "UI/UX Design Foundations",
    category: "Design",
    mode: "HYBRID",
    level: "BEGINNER",
    durationWeeks: 6,
    weeklyEffortHours: "8–10 hours",
    priceInPaise: 499900,
    seatsTotal: 24,
    startDate: new Date("2026-12-07"),
    tags: ["figma", "ux", "ui", "research", "prototype", "design"],
    shortDescription:
      "Research, wireframe and usability-test a mobile flow for a campus service.",
    overview: [
      "Students report hostel maintenance issues by phone and on paper today. You will design the mobile flow that replaces that — from the first user interview through to a tested, clickable prototype.",
      "The brief is deliberately narrow: one flow, done properly, beats five screens done shallowly. Your mentor reviews each milestone's research rigour and design decisions, not just the visuals.",
    ],
    learningOutcomes: [
      "Plan and run a short user research interview",
      "Translate research notes into a problem statement",
      "Sketch and wireframe a multi-step mobile flow",
      "Build a high-fidelity, clickable prototype in Figma",
      "Design and run a usability test with real users",
      "Present design decisions with evidence, not opinion",
    ],
    deliverables: [
      { title: "A research summary from five user interviews", due: "Milestone 1", format: "PDF" },
      { title: "User flow and wireframes", due: "Milestone 2", format: "Figma file" },
      { title: "A high-fidelity clickable prototype", due: "Milestone 3", format: "Figma prototype link" },
      { title: "A usability test report", due: "Final review", format: "PDF" },
    ],
    weeklyPlan: [
      { week: "Week 1", title: "Orientation & research plan", body: "Meet your mentor, read the brief, and plan five short user interviews." },
      { week: "Week 2", title: "Milestone 1 · Research summary", body: "Run the interviews and summarise what you learned into a clear problem statement." },
      { week: "Week 3", title: "Milestone 2 · Flow & wireframes", body: "Map the end-to-end flow and wireframe every screen in grayscale." },
      { week: "Weeks 4–5", title: "Milestone 3 · High-fidelity prototype", body: "Apply visual design and build a clickable prototype ready for testing.", milestone: true },
      { week: "Week 6", title: "Usability testing & final review", body: "Test the prototype with real users, write up findings, and submit the final report." },
    ],
    eligibility: eligibility(
      "No prior design tool experience required — Figma basics are covered in week one.",
      "A laptop (Figma runs in the browser) and access to five people willing to try your prototype for 15 minutes.",
    ),
    faqs: faqs("UI/UX Design Foundations", "8–10 hours"),
    courseEligibility: ["BBA", "BCA", "BSC", "OTHER"],
    perks: [
      "Real user research and usability testing",
      "Portfolio-ready prototype",
      "Verifiable certificate naming the partner company",
    ],
  },
  {
    slug: "backend-apis-with-spring-boot",
    title: "Backend APIs with Spring Boot",
    category: "Software development",
    mode: "HYBRID",
    level: "INTERMEDIATE",
    durationWeeks: 8,
    weeklyEffortHours: "10–12 hours",
    priceInPaise: 649900,
    seatsTotal: 24,
    startDate: new Date("2026-12-07"),
    tags: ["java", "spring boot", "api", "backend", "sql"],
    shortDescription:
      "Design, build and document a REST service end to end, with tests and a deployment.",
    overview: [
      "The partner company needs a booking service exposed as a documented REST API — the kind of backend a frontend or mobile team would consume. You design the data model, implement the endpoints, and secure them.",
      "Testing and documentation are graded as seriously as the code itself: a service nobody can safely call or maintain isn't considered done, even if it technically works.",
    ],
    learningOutcomes: [
      "Model a domain into a relational schema with migrations",
      "Design and implement a RESTful API in Spring Boot",
      "Write unit and integration tests for critical endpoints",
      "Add authentication and handle errors consistently",
      "Document an API so another developer could consume it unaided",
      "Deploy a working build to a shared environment",
    ],
    deliverables: [
      { title: "Entity-relationship diagram and migrations", due: "Milestone 1", format: "Repository" },
      { title: "Core REST endpoints with tests", due: "Milestones 2–3", format: "Git repository" },
      { title: "Authentication and error handling", due: "Milestone 4", format: "Git repository" },
      { title: "API documentation and deployed build", due: "Final review", format: "OpenAPI spec + live URL" },
    ],
    weeklyPlan: [
      { week: "Week 1", title: "Orientation & data modelling", body: "Read the brief, meet your mentor, and design the schema and migrations." },
      { week: "Weeks 2–3", title: "Milestones 1–2 · Core endpoints", body: "Implement the primary CRUD endpoints with unit tests for each." },
      { week: "Weeks 4–5", title: "Milestone 3 · Integration tests", body: "Add integration tests covering realistic request flows and edge cases." },
      { week: "Week 6", title: "Milestone 4 · Auth & error handling", body: "Add authentication and a consistent error-response contract.", milestone: true },
      { week: "Week 7", title: "Documentation & deployment", body: "Write the API documentation and deploy a build to a shared environment." },
      { week: "Week 8", title: "Final project review", body: "Submit the finished service and documentation. Completion decision within five working days." },
    ],
    eligibility: eligibility(
      "Working knowledge of Java and basic SQL. Some exposure to REST concepts is helpful but not required.",
      "A laptop that can run a Java IDE and a local database, and a stable internet connection.",
    ),
    faqs: faqs("Backend APIs with Spring Boot", "10–12 hours"),
    courseEligibility: ["BCA", "BSC", "OTHER"],
    perks: [
      "API design reviewed by a practising engineer",
      "Testing and documentation practice",
      "Verifiable certificate naming the partner company",
    ],
  },
  {
    slug: "digital-marketing-analytics",
    title: "Digital Marketing Analytics",
    category: "Business & product",
    mode: "REMOTE",
    level: "BEGINNER",
    durationWeeks: 6,
    weeklyEffortHours: "6–8 hours",
    priceInPaise: 399900,
    seatsTotal: 30,
    startDate: new Date("2026-12-07"),
    tags: ["marketing", "analytics", "seo", "campaigns"],
    shortDescription:
      "Plan and measure a campaign for a student-run initiative using real traffic data.",
    overview: [
      "A student-run initiative wants to grow its audience but has never measured what's actually working. You will plan a short campaign, set up measurement properly, and report on it with real numbers.",
      "The emphasis throughout is measurement discipline: defining what success means before you launch anything, not explaining a number after the fact.",
    ],
    learningOutcomes: [
      "Set measurable goals for a marketing campaign before launch",
      "Set up and verify analytics tracking correctly",
      "Plan a multi-channel campaign calendar",
      "Read campaign data without fooling yourself with vanity metrics",
      "Write a campaign brief a stakeholder can approve quickly",
      "Present results with honest caveats, not just highlights",
    ],
    deliverables: [
      { title: "Campaign plan with goals and channels", due: "Milestone 1", format: "PDF" },
      { title: "Verified analytics tracking setup", due: "Milestone 2", format: "Shared dashboard access" },
      { title: "Campaign content calendar", due: "Milestone 3", format: "Spreadsheet" },
      { title: "Results report with recommendations", due: "Final review", format: "PDF" },
    ],
    weeklyPlan: [
      { week: "Week 1", title: "Orientation & goal-setting", body: "Meet your mentor, review the brief, and agree what success looks like before anything launches." },
      { week: "Week 2", title: "Milestone 1 · Campaign plan", body: "Draft the campaign plan: audience, channels, goals and how each will be measured." },
      { week: "Week 3", title: "Milestone 2 · Tracking setup", body: "Set up and verify analytics tracking so every number in the final report is trustworthy." },
      { week: "Week 4", title: "Milestone 3 · Content calendar", body: "Plan the campaign's content and posting schedule across channels.", milestone: true },
      { week: "Week 5", title: "Run & monitor", body: "The campaign runs; check in on early data and adjust if something is clearly off." },
      { week: "Week 6", title: "Final project review", body: "Submit the results report with honest caveats. Completion decision within five working days." },
    ],
    eligibility: eligibility(
      "No prior analytics tool experience required — setup is covered in week one.",
      "A laptop and an email address you can use to request analytics access.",
    ),
    faqs: faqs("Digital Marketing Analytics", "6–8 hours"),
    courseEligibility: ["BBA", "BCOM", "MBA", "MCOM", "OTHER"],
    perks: [
      "Real campaign, real traffic data",
      "Mentor review from a working marketer",
      "Verifiable certificate naming the partner company",
    ],
  },
  {
    slug: "android-apps-with-kotlin",
    title: "Android Apps with Kotlin",
    category: "Software development",
    mode: "REMOTE",
    level: "INTERMEDIATE",
    durationWeeks: 10,
    weeklyEffortHours: "10–12 hours",
    priceInPaise: 699900,
    seatsTotal: 24,
    startDate: new Date("2027-01-04"),
    tags: ["android", "kotlin", "mobile", "app"],
    shortDescription:
      "Ship a working Android app with offline storage, from first screen to release build.",
    overview: [
      "You will build an Android app from the partner company's brief — not a tutorial clone, a real app with navigation, local storage and a release build at the end.",
      "Offline-first behaviour is a core requirement, not a bonus: the app has to work sensibly when connectivity drops, which shapes several design decisions early on.",
    ],
    learningOutcomes: [
      "Structure a multi-screen Android app with proper navigation",
      "Persist data locally and sync it when connectivity returns",
      "Handle loading, error and empty states deliberately",
      "Write unit tests for core business logic",
      "Profile and fix an obvious performance issue",
      "Produce a signed release build",
    ],
    deliverables: [
      { title: "Navigation structure and core screens", due: "Milestone 1", format: "Git repository" },
      { title: "Local storage with offline support", due: "Milestone 2", format: "Git repository" },
      { title: "Feature complete build with tests", due: "Milestones 3–4", format: "Git repository" },
      { title: "Signed release build and handover notes", due: "Final review", format: "APK + README" },
    ],
    weeklyPlan: [
      { week: "Weeks 1–2", title: "Orientation & navigation", body: "Set up the project, meet your mentor, and build the core screen navigation." },
      { week: "Weeks 3–4", title: "Milestone 1 · Core screens", body: "Implement the primary screens against the brief's wireframes." },
      { week: "Weeks 5–6", title: "Milestone 2 · Offline storage", body: "Add local persistence and define how the app behaves without connectivity." },
      { week: "Weeks 7–8", title: "Milestones 3–4 · Feature complete", body: "Finish remaining features and add unit tests for core logic.", milestone: true },
      { week: "Week 9", title: "Performance pass", body: "Profile the app, fix an identified performance issue, and polish rough edges." },
      { week: "Week 10", title: "Final project review", body: "Submit the signed release build and handover notes. Completion decision within five working days." },
    ],
    eligibility: eligibility(
      "Working knowledge of Kotlin or a similar typed language. Some exposure to Android basics is helpful but not required.",
      "A laptop that can run Android Studio and an emulator (or a physical Android device), and a stable internet connection.",
    ),
    faqs: faqs("Android Apps with Kotlin", "10–12 hours"),
    courseEligibility: ["BCA", "BSC", "OTHER"],
    perks: [
      "A real, shippable app — not a tutorial clone",
      "Mentor review from a practising Android engineer",
      "Verifiable certificate naming the partner company",
    ],
  },
  {
    slug: "product-management-essentials",
    title: "Product Management Essentials",
    category: "Business & product",
    mode: "ON_CAMPUS",
    level: "BEGINNER",
    durationWeeks: 6,
    weeklyEffortHours: "6–8 hours",
    priceInPaise: 449900,
    seatsTotal: 20,
    startDate: new Date("2027-01-04"),
    tags: ["product", "management", "roadmap", "research"],
    shortDescription:
      "Take a product idea from problem interviews to a prioritised roadmap and spec.",
    overview: [
      "You will take a real problem statement from the partner company through discovery, sizing and specification — the actual sequence a product manager follows before anything gets built.",
      "The programme is deliberately opinionated about rigour: every prioritisation decision in your roadmap needs a reason a reviewer can follow, not just a gut call.",
    ],
    learningOutcomes: [
      "Run structured problem-discovery interviews",
      "Size an opportunity with evidence, not guesswork",
      "Write a clear, testable problem statement",
      "Prioritise a backlog using an explicit framework",
      "Write a specification an engineering team could build from",
      "Define success metrics before launch, not after",
    ],
    deliverables: [
      { title: "Discovery interview notes and synthesis", due: "Milestone 1", format: "PDF" },
      { title: "Opportunity sizing and problem statement", due: "Milestone 2", format: "PDF" },
      { title: "Prioritised roadmap", due: "Milestone 3", format: "Spreadsheet or Notion doc" },
      { title: "Product specification", due: "Final review", format: "PDF" },
    ],
    weeklyPlan: [
      { week: "Week 1", title: "Orientation & discovery plan", body: "Meet your mentor, review the brief, and plan a set of problem-discovery interviews." },
      { week: "Week 2", title: "Milestone 1 · Discovery synthesis", body: "Run the interviews and synthesise what you heard into clear themes." },
      { week: "Week 3", title: "Milestone 2 · Problem statement", body: "Size the opportunity and write a problem statement your mentor can stress-test." },
      { week: "Week 4", title: "Milestone 3 · Roadmap", body: "Prioritise a backlog using an explicit framework, with reasons for every call.", milestone: true },
      { week: "Week 5", title: "Draft specification", body: "Draft the product spec; mentor reviews for clarity and completeness." },
      { week: "Week 6", title: "Final project review", body: "Submit the finished specification. Completion decision within five working days." },
    ],
    eligibility: eligibility(
      "No prior product experience required. Comfort with spreadsheets and structured writing is helpful.",
      "A laptop and access to at least five people willing to be interviewed about the problem.",
    ),
    faqs: faqs("Product Management Essentials", "6–8 hours"),
    courseEligibility: ["BBA", "BCOM", "MBA", "MCOM", "OTHER"],
    perks: [
      "Discovery-to-specification practice on a real problem",
      "Mentor review from a company product manager",
      "Verifiable certificate naming the partner company",
    ],
  },
  {
    slug: "cloud-and-devops-essentials",
    title: "Cloud & DevOps Essentials",
    category: "Software development",
    mode: "REMOTE",
    level: "INTERMEDIATE",
    durationWeeks: 8,
    weeklyEffortHours: "10–12 hours",
    priceInPaise: 749900,
    seatsTotal: 24,
    startDate: new Date("2027-01-04"),
    tags: ["cloud", "devops", "docker", "ci", "aws", "linux"],
    shortDescription:
      "Containerise an application and build a CI/CD pipeline with monitoring.",
    overview: [
      "You will take an existing application, containerise it properly, and build the pipeline that takes a code change from commit to a running, monitored deployment.",
      "Nothing here is simulated: by the final review, a real build genuinely deploys through a real pipeline, and you can show someone the monitoring dashboard that proves it's healthy.",
    ],
    learningOutcomes: [
      "Containerise an application with a production-sensible Dockerfile",
      "Design a CI pipeline that runs tests before anything deploys",
      "Automate deployment to a cloud environment",
      "Manage configuration and secrets safely",
      "Set up basic monitoring and alerting",
      "Diagnose and fix a failed deployment",
    ],
    deliverables: [
      { title: "Dockerfile and local container build", due: "Milestone 1", format: "Git repository" },
      { title: "CI pipeline running tests on every commit", due: "Milestone 2", format: "Pipeline config" },
      { title: "Automated deployment to a cloud environment", due: "Milestones 3–4", format: "Live URL" },
      { title: "Monitoring dashboard and runbook", due: "Final review", format: "Dashboard link + PDF" },
    ],
    weeklyPlan: [
      { week: "Week 1", title: "Orientation & containerisation", body: "Set up your environment, meet your mentor, and containerise the application." },
      { week: "Weeks 2–3", title: "Milestone 1–2 · CI pipeline", body: "Build a pipeline that runs the test suite automatically on every commit." },
      { week: "Weeks 4–5", title: "Milestone 3 · Automated deployment", body: "Automate deployment to a cloud environment from a passing pipeline run." },
      { week: "Week 6", title: "Milestone 4 · Config & secrets", body: "Externalise configuration and handle secrets without committing them to source.", milestone: true },
      { week: "Week 7", title: "Monitoring & alerting", body: "Set up basic monitoring and a runbook for diagnosing a failed deployment." },
      { week: "Week 8", title: "Final project review", body: "Submit the dashboard and runbook. Completion decision within five working days." },
    ],
    eligibility: eligibility(
      "Working knowledge of Linux basics and at least one programming language. Some exposure to Git is expected.",
      "A laptop that can run Docker, and a free-tier account with a major cloud provider.",
    ),
    faqs: faqs("Cloud & DevOps Essentials", "10–12 hours"),
    courseEligibility: ["BCA", "BSC", "OTHER"],
    perks: [
      "A real pipeline deploying a real build",
      "Mentor review from a practising DevOps engineer",
      "Verifiable certificate naming the partner company",
    ],
  },
  {
    slug: "machine-learning-foundations",
    title: "Machine Learning Foundations",
    category: "Data & AI",
    mode: "REMOTE",
    level: "INTERMEDIATE",
    durationWeeks: 12,
    weeklyEffortHours: "10–12 hours",
    priceInPaise: 849900,
    seatsTotal: 24,
    startDate: new Date("2027-02-01"),
    tags: ["machine learning", "ml", "python", "ai", "model"],
    shortDescription:
      "Train, evaluate and explain a model on a public dataset, with a reproducible notebook.",
    overview: [
      "You will take a public dataset through the full modelling lifecycle — framing the problem, preparing the data, training and tuning a model, and explaining its results honestly, including where it's wrong.",
      "The final deliverable is judged as much on the explanation and the reproducibility of your notebook as on the model's accuracy score — a model nobody can trust or rerun doesn't count as done.",
    ],
    learningOutcomes: [
      "Frame a real-world question as a modelling problem",
      "Prepare and split data without leaking information",
      "Train and tune a baseline and an improved model",
      "Evaluate a model with the right metrics for the problem",
      "Explain model behaviour, including its failure cases",
      "Produce a reproducible, well-documented notebook",
    ],
    deliverables: [
      { title: "Problem framing and data preparation", due: "Milestone 1", format: "Notebook" },
      { title: "Baseline model with evaluation", due: "Milestone 2", format: "Notebook" },
      { title: "Tuned model with comparison report", due: "Milestones 3–4", format: "Notebook + PDF" },
      { title: "Final reproducible notebook and write-up", due: "Final review", format: "Notebook + PDF" },
    ],
    weeklyPlan: [
      { week: "Weeks 1–2", title: "Orientation & problem framing", body: "Meet your mentor, choose the dataset, and frame the question as a modelling problem." },
      { week: "Weeks 3–4", title: "Milestone 1 · Data preparation", body: "Clean, split and document the dataset without leaking information across splits." },
      { week: "Weeks 5–6", title: "Milestone 2 · Baseline model", body: "Train a simple baseline and evaluate it with the right metrics for the problem." },
      { week: "Weeks 7–9", title: "Milestones 3–4 · Tuning", body: "Tune the model and compare it honestly against the baseline, including failure cases.", milestone: true },
      { week: "Weeks 10–11", title: "Write-up & reproducibility", body: "Clean the notebook for reproducibility and draft the explanation of what the model does and doesn't do." },
      { week: "Week 12", title: "Final project review", body: "Submit the finished notebook and write-up. Completion decision within five working days." },
    ],
    eligibility: eligibility(
      "Working knowledge of Python and basic statistics. Some exposure to pandas is expected.",
      "A laptop that can run Python (or a free notebook environment), and a stable internet connection.",
    ),
    faqs: faqs("Machine Learning Foundations", "10–12 hours"),
    courseEligibility: ["BCA", "BSC", "OTHER"],
    perks: [
      "A full, honest modelling lifecycle — not just a leaderboard score",
      "Mentor review from a practising ML engineer",
      "Verifiable certificate naming the partner company",
    ],
  },
];

async function seedInternships() {
  for (const internship of INTERNSHIPS) {
    const data = {
      title: internship.title,
      category: internship.category,
      mode: internship.mode,
      level: internship.level,
      durationWeeks: internship.durationWeeks,
      weeklyEffortHours: internship.weeklyEffortHours,
      priceInPaise: internship.priceInPaise,
      startDate: internship.startDate,
      tags: internship.tags,
      shortDescription: internship.shortDescription,
      description: internship.overview.join("\n\n"),
      overview: internship.overview,
      learningOutcomes: internship.learningOutcomes,
      deliverables: internship.deliverables,
      weeklyPlan: internship.weeklyPlan,
      eligibility: internship.eligibility,
      faqs: internship.faqs,
      perks: internship.perks,
    };

    await prisma.internship.upsert({
      where: { slug: internship.slug },
      update: data,
      create: {
        ...data,
        slug: internship.slug,
        seatsTotal: internship.seatsTotal,
        courseEligibility: internship.courseEligibility,
        status: "PUBLISHED",
      },
    });
  }

  console.log(`Internships ready: ${INTERNSHIPS.length}`);
}

async function main() {
  await seedAdmin();
  await seedInternships();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
