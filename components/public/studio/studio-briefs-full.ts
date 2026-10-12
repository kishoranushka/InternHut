/**
 * Illustrative Project Studio briefs. Explicitly not real company briefs —
 * every tile and the drawer both carry an "ILLUSTRATIVE BRIEF" badge.
 * `programmeSlug` links each brief to the matching real internship.
 */
export type StudioBriefFull = {
  id: string;
  code: string;
  category: string;
  level: "Beginner" | "Intermediate";
  duration: string;
  title: string;
  programme: string;
  programmeSlug: string;
  context: string;
  deliverables: string[];
  skills: string[];
  criteria: [string, number][];
};

export const STUDIO_BRIEFS_FULL: StudioBriefFull[] = [
  {
    id: "b1",
    code: "Brief 01",
    category: "Software development",
    level: "Beginner",
    duration: "8 weeks",
    title: "Campus Events Dashboard",
    programme: "Frontend Development with React",
    programmeSlug: "frontend-development-with-react",
    context:
      "A student council needs one place to publish events, track registrations and post updates. Build the web dashboard its organisers will use every week.",
    deliverables: [
      "Wireframes for four core screens",
      "A reusable component library",
      "A working dashboard connected to a mock API",
      "A handover note and walkthrough recording",
    ],
    skills: ["React", "Component design", "State management", "Accessibility", "REST integration"],
    criteria: [["Functionality", 30], ["Code quality", 25], ["UX & accessibility", 25], ["Documentation", 20]],
  },
  {
    id: "b2",
    code: "Brief 02",
    category: "Data & AI",
    level: "Beginner",
    duration: "10 weeks",
    title: "Library Footfall Analysis",
    programme: "Data Analytics with Python & SQL",
    programmeSlug: "data-analytics-with-python-and-sql",
    context:
      "A college library wants to plan staffing around real usage. Analyse a year of anonymised entry logs and recommend opening hours with evidence.",
    deliverables: [
      "A cleaned dataset with a data dictionary",
      "SQL queries answering six operational questions",
      "A four-view dashboard",
      "A two-page recommendation memo",
    ],
    skills: ["SQL", "Python · pandas", "Data cleaning", "Visualisation", "Written communication"],
    criteria: [["Analytical accuracy", 35], ["Insight quality", 25], ["Visual clarity", 20], ["Communication", 20]],
  },
  {
    id: "b3",
    code: "Brief 03",
    category: "Design",
    level: "Beginner",
    duration: "6 weeks",
    title: "Hostel Maintenance Requests",
    programme: "UI/UX Design Foundations",
    programmeSlug: "ui-ux-design-foundations",
    context:
      "Students report hostel maintenance issues by phone and on paper. Design a mobile flow to raise, track and close requests — and test it with real users.",
    deliverables: [
      "A research summary from five user interviews",
      "User flow and wireframes",
      "A high-fidelity clickable prototype",
      "A usability test report",
    ],
    skills: ["User research", "Information architecture", "Prototyping", "Usability testing"],
    criteria: [["Research rigour", 25], ["Problem framing", 25], ["Design quality", 30], ["Test insights", 20]],
  },
  {
    id: "b4",
    code: "Brief 04",
    category: "Software development",
    level: "Intermediate",
    duration: "8 weeks",
    title: "Canteen Pre-ordering API",
    programme: "Backend APIs with Spring Boot",
    programmeSlug: "backend-apis-with-spring-boot",
    context:
      "Queues at the campus canteen peak between lectures. Build the API behind a pre-ordering service: menus, orders, pickup slots and payments status.",
    deliverables: [
      "An OpenAPI specification",
      "A tested service with a relational schema",
      "A deployed staging environment",
      "A Postman collection and README",
    ],
    skills: ["Java", "Spring Boot", "SQL", "API design", "Automated testing"],
    criteria: [["Correctness", 35], ["Code quality", 25], ["Testing", 20], ["Documentation", 20]],
  },
  {
    id: "b5",
    code: "Brief 05",
    category: "Data & AI",
    level: "Intermediate",
    duration: "12 weeks",
    title: "Attendance Risk Model",
    programme: "Machine Learning Foundations",
    programmeSlug: "machine-learning-foundations",
    context:
      "Using a synthetic, anonymised dataset, build a model that flags students at risk of falling below the attendance threshold — and document its limits.",
    deliverables: [
      "An exploratory analysis notebook",
      "A baseline and an improved model",
      "An evaluation report including a fairness check",
      "A one-page model card",
    ],
    skills: ["Python", "scikit-learn", "Feature engineering", "Model evaluation", "Responsible AI"],
    criteria: [["Method", 30], ["Evaluation", 30], ["Responsible use", 20], ["Communication", 20]],
  },
  {
    id: "b6",
    code: "Brief 06",
    category: "Business & product",
    level: "Beginner",
    duration: "6 weeks",
    title: "Alumni Mentoring Platform",
    programme: "Product Management Essentials",
    programmeSlug: "product-management-essentials",
    context:
      "An alumni association wants to connect graduates with current students. Define the product: who it serves, what to build first, and why.",
    deliverables: [
      "A summary of eight problem interviews",
      "Two evidence-based personas",
      "A product requirements document",
      "A prioritised three-month roadmap",
    ],
    skills: ["Product discovery", "Interviewing", "Prioritisation", "Writing specs"],
    criteria: [["Discovery quality", 30], ["Clarity", 30], ["Prioritisation", 20], ["Presentation", 20]],
  },
  {
    id: "b7",
    code: "Brief 07",
    category: "Software development",
    level: "Intermediate",
    duration: "10 weeks",
    title: "Bus Pass Renewal App",
    programme: "Android Apps with Kotlin",
    programmeSlug: "android-apps-with-kotlin",
    context:
      "Renewing a college bus pass means forms and queues. Build an Android app to apply, track status and show a digital pass that works offline.",
    deliverables: [
      "Core screens in Jetpack Compose",
      "Offline storage for the active pass",
      "Status notifications",
      "A signed release build",
    ],
    skills: ["Kotlin", "Jetpack Compose", "Room", "Notifications"],
    criteria: [["Functionality", 35], ["Code quality", 25], ["UX", 20], ["Stability", 20]],
  },
  {
    id: "b8",
    code: "Brief 08",
    category: "Business & product",
    level: "Beginner",
    duration: "6 weeks",
    title: "Club Recruitment Campaign",
    programme: "Digital Marketing Analytics",
    programmeSlug: "digital-marketing-analytics",
    context:
      "A student club wants more first-year members. Plan, run and measure a two-week campaign, then report honestly on what worked.",
    deliverables: [
      "Audience research and goals",
      "A campaign plan with channels and budget",
      "A tracking dashboard",
      "A results memo with recommendations",
    ],
    skills: ["Analytics", "Copywriting", "Campaign planning", "Measurement"],
    criteria: [["Strategy", 30], ["Measurement", 30], ["Creativity", 20], ["Reporting", 20]],
  },
];
