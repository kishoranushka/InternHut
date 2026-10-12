import type { ContactPath } from "@/lib/enums";

export type ContactPersona = {
  id: ContactPath;
  number: string;
  label: string;
  description: string;
  formTitle: string;
  emailLabel: string;
  orgLabel?: string;
  showOrgRole: boolean;
  showOptionalOrg: boolean;
  messageHint: string;
  topics: string[];
};

export const CONTACT_PERSONAS: ContactPersona[] = [
  {
    id: "STUDENT",
    number: "01",
    label: "I'm a student",
    description: "Questions about programmes, applications, payments or certificates.",
    formTitle: "Student enquiry",
    emailLabel: "Email",
    showOrgRole: false,
    showOptionalOrg: false,
    messageHint: "Include your application or certificate ID if you have one",
    topics: ["Choosing a programme", "Application status", "Payments & refunds", "My certificate", "Something else"],
  },
  {
    id: "INSTITUTION",
    number: "02",
    label: "I represent a college",
    description: "Placement cells, departments and institutional partnerships.",
    formTitle: "Institutional enquiry",
    emailLabel: "Work email",
    orgLabel: "Institution",
    showOrgRole: true,
    showOptionalOrg: false,
    messageHint: "How can we help?",
    topics: ["General question", "Programme formats", "Reporting & assessment", "An existing partnership"],
  },
  {
    id: "COMPANY",
    number: "03",
    label: "I represent a company",
    description: "Become a partner company or ask about an existing partnership.",
    formTitle: "Partner company enquiry",
    emailLabel: "Work email",
    orgLabel: "Company",
    showOrgRole: true,
    showOptionalOrg: false,
    messageHint: "How can we help?",
    topics: ["Becoming a partner company", "Offering a specific internship", "An existing partnership", "Other"],
  },
  {
    id: "GENERAL",
    number: "04",
    label: "Something else",
    description: "Employers verifying a certificate, media and other enquiries.",
    formTitle: "General enquiry",
    emailLabel: "Email",
    showOrgRole: false,
    showOptionalOrg: true,
    messageHint: "How can we help?",
    topics: ["Employer verification", "Report a suspicious certificate", "Media enquiry", "Other"],
  },
];
