// lib/docsStore.ts
import { useEffect, useState } from "react";

export type DocFile = {
  id: string;
  name: string;
  dataUrl: string;
  size: number;
  addedAt: number;
  batch?: string;
};
export type DocSection = { info: string; files: DocFile[] };

const KEY = "ssam-docs-v1";

export const DOC_SECTIONS: { key: string; label: string }[] = [


  // News & Events
  { key: "news-events", label: "📰 News & Events" },
  { key: "notices", label: "📢 Notices & Announcements" },
  { key: "press-releases", label: "📰 Press Releases" },

  // Attendance sections
  { key: "attendance-teaching", label: "Staff Attendance — Teaching Staff" },
  { key: "attendance-non-teaching", label: "Staff Attendance — Non Teaching Staff" },
  { key: "attendance-hospital", label: "Staff Attendance — Hospital Staff" },
  { key: "attendance-ug", label: "Student Attendance — UG" },
  
  // FRA sections
  { key: "fra-fee-structure", label: "FRA Fee Structure — Overview" },
  { key: "fra-ug", label: "FRA Fee Structure — UG" },
  
  // Admissions
  { key: "student-admission-list", label: "Student Admission List" },
  { key: "programs-admission", label: "Programs Offered — Admission Details" },
  { key: "government-approvals", label: "Government Approvals" },
  
  // Academics
  { key: "result", label: "Result" },
  { key: "academic-syllabus", label: "Academic Syllabus UG" },
  { key: "calendar-ug", label: "Academic Calendar — UG" },
  { key: "timetable-ug", label: "Time Table — UG" },
  { key: "time-table", label: "Time Table" },
  
  // Resources
  { key: "alumni-association", label: "Alumni Association" },
  { key: "research-publications", label: "Research and Publications" },
  { key: "download", label: "Downloads" },
  // { key: "important-links", label: "Important Links" },
  
  // MUHS Mandate
  { key: "muhs-mandate", label: "MUHS Mandate — Overview" },
  { key: "muhs-mandate-circulars", label: "MUHS Mandate — Circulars" },
  { key: "muhs-mandate-notifications", label: "MUHS Mandate — Notifications" },
  
  // Hospital Services - THESE KEYS MUST MATCH THE SLUGS
  { key: "opd-services", label: "🏥 OPD Services" },
  { key: "ipd-services", label: "🏥 IPD Services" },
  { key: "hospital-departments", label: "🏥 Hospital Departments" },
  { key: "operation-theatre", label: "🏥 Operation Theatre" },
  
  // NAAC Documents
  { key: "naac", label: "⭐ NAAC" },
  { key: "naac-ssr", label: "⭐ NAAC SSR" },
  { key: "naac-aqar", label: "⭐ NAAC AQAR" },
  { key: "naac-iiqa", label: "⭐ NAAC IIQA" },
  { key: "naac-certificate", label: "⭐ NAAC Certificate" },
  
  // Innovation
  { key: "innovation-ecosystem", label: "💡 Innovation Ecosystem" },
  
  // Events
  { key: "azadi-ka-amrut-mahosav", label: "🇮🇳 Azadi Ka Amrut Mahosav" },
  
  // Reports
  { key: "institute-annual-report", label: "📊 Institute Annual Report" },
  
  // Feedback
  { key: "feedback", label: "💬 Feedback" },
  
  // Activities
  { key: "activities-cultural", label: "🎭 Cultural Activities" },
  { key: "activities-sports", label: "⚽ Sports Activities" },
  { key: "activities-nss", label: "🤝 NSS Activities" },
  
  // Departments overview
  { key: "departments", label: "Departments Overview" },
  
  // Staff related
  // { key: "staff-college", label: "College Staff" },
  // { key: "staff-hospital", label: "Hospital Staff" },
  // { key: "staff-non-teaching", label: "Non Teaching Staff" },
  // { key: "faculty-teaching-staff", label: "Teaching Staff" },
  
  // Council / Committee
  { key: "iqac", label: "IQAC" },
  { key: "college-council-curriculum", label: "College Council" },
  { key: "grievances-cell", label: "Grievances Cell" },
  { key: "anti-ragging-cell", label: "Anti Ragging Cell" },
  { key: "internal-grievances-vishakha", label: "Internal Grievances Committee" },
  { key: "reservation-cell", label: "Reservation Cell" },
  { key: "student-council", label: "Student Council" },
  
  // Facilities
  { key: "facility-infrastructure", label: "Infrastructure" },
  { key: "facility-herbal-garden", label: "Herbal Garden" },
  { key: "facility-library", label: "Library" },
  { key: "facility-laboratory", label: "Laboratory" },
];

const DEFAULT_INFO: Record<string, string> = {
  "attendance-teaching": "Monthly attendance record of all Teaching Staff members. Download the latest attendance sheets below.",
  "attendance-non-teaching": "Monthly attendance record of Non-Teaching Staff. Download the latest attendance sheets below.",
  "attendance-hospital": "Monthly attendance record of Hospital Staff including doctors, nurses, and support staff.",
  "attendance-ug": "UG (BAMS) student attendance reports — year-wise and month-wise sheets.",
  "fra-fee-structure": "Fee structure approved by the Fee Regulating Authority (FRA), Government of Maharashtra. Download notifications below.",
  "fra-ug": "FRA approved Undergraduate (BAMS) fee structure documents.",
  "student-admission-list": "Official list of students admitted to UG programs. Download year-wise admission lists below.",
  "programs-admission": "Details of programs offered and admission criteria.",
  "government-approvals": "Government approvals and regulatory certificates held by the institute.",
  "result": "Exam results and merit list PDFs for affiliated courses.",
  "academic-syllabus": "UG (BAMS) academic syllabus documents and curriculum details.",
  "calendar-ug": "Academic calendar for Undergraduate (BAMS) program as per MUHS guidelines.",
  "timetable-ug": "Time table documents for UG students. Download the latest timetable PDFs below.",
  "time-table": "Time table documents organized by batch. Download the latest timetable PDFs below.",
  "alumni-association": "Information about our alumni association and its activities.",
  "research-publications": "Research publications, papers and academic output from the college.",
  "download": "Download PDF resources and important documents available to visitors.",
  "important-links": "Important links and downloadable resources for students and staff.",
  "muhs-mandate": "Mandatory disclosures and circulars issued by Maharashtra University of Health Sciences (MUHS), Nashik.",
  "muhs-mandate-circulars": "Latest circulars released by MUHS for affiliated colleges.",
  "muhs-mandate-notifications": "Official notifications from MUHS for students, faculty and administration.",
  
  // Hospital Services
  "opd-services": "OPD Services - Outpatient department guidelines, consultation hours, and services available at Rajashri Ayurvedic Medical College & Hospital. OPD services run daily from 9 AM to 1 PM and 4 PM to 7 PM.",
  "ipd-services": "IPD Services - Inpatient department guidelines, admission procedures, ward information, and patient care protocols. 24/7 emergency services available.",
  "hospital-departments": "Various hospital departments including Kayachikitsa, Panchakarma, Shalya Tantra, Shalakya Tantra, Prasuti Tantra & Streerog, Kaumarbhritya, and Swasthavritta.",
  "operation-theatre": "Operation Theatre facilities, surgical protocols, pre and post-operative care guidelines, and list of available surgical procedures. Equipped with 3 modern operation theatres.",
  
    "news-events": "Latest news, events, and happenings at Rajashri Ayurvedic Medical College & Hospital. Download event reports, newsletters, and announcements below.",
  "notices": "Important notices and announcements from the college administration for students, faculty, and staff.",
  "press-releases": "Official press releases and media coverage about the college's achievements and activities.",
  // NAAC
  "naac": "NAAC accreditation documents, reports, and related information for Rajashri Ayurvedic Medical College & Hospital. The institution is NAAC accredited with Grade B++.",
  "naac-ssr": "NAAC Self Study Report (SSR) - Comprehensive institutional assessment document submitted for accreditation.",
  "naac-aqar": "NAAC Annual Quality Assurance Report (AQAR) - Yearly quality assurance reports submitted to NAAC.",
  "naac-iiqa": "NAAC Internal Quality Assurance (IIQA) - Documents related to internal quality assurance processes.",
  "naac-certificate": "NAAC accreditation certificates and recognition documents awarded to the institution.",
  
  // Innovation
  "innovation-ecosystem": "Innovation Ecosystem - Research initiatives, entrepreneurial activities, innovation cells, and startup support at Rajashri Ayurvedic Medical College.",
  
  // Events
  "azadi-ka-amrut-mahosav": "Azadi Ka Amrut Mahosav celebration details, event reports, and activities organized by the college.",
  
  // Reports
  "institute-annual-report": "Annual report of the institute detailing achievements, activities, and progress during the academic year.",
  
  // Feedback
  "feedback": "Feedback forms and submission guidelines for students, parents, faculty, and stakeholders.",
  
  // Activities
  "activities-cultural": "Cultural events and celebrations including festivals, annual social gatherings, and talent shows.",
  "activities-sports": "Sports events and competitions including annual sports day and inter-college tournaments.",
  "activities-nss": "National Service Scheme activities including community service and health awareness camps.",
  
  "departments": "Academic departments overview - Learn about our various departments.",
  "staff-college": "College staff directory and contact information.",
  "staff-hospital": "Hospital staff directory including doctors and nurses.",
  "staff-non-teaching": "Non-teaching staff directory and administrative contacts.",
  "faculty-teaching-staff": "Teaching faculty directory and department assignments.",
  "iqac": "Internal Quality Assurance Cell - Quality initiatives and accreditation activities.",
  "college-council-curriculum": "College Council - Academic governance and curriculum development.",
  "grievances-cell": "Student Grievances and Redressal Committee - Complaint handling procedures.",
  "anti-ragging-cell": "Anti-Ragging Committee - Policies and procedures to prevent ragging.",
  "internal-grievances-vishakha": "Internal Complaint Committee - Sexual harassment prevention and redressal.",
  "reservation-cell": "Reservation Cell - Implementation of reservation policies.",
  "student-council": "Student Council - Student representatives and leadership body.",
  "facility-infrastructure": "Campus infrastructure details including buildings, classrooms, and labs.",
  "facility-herbal-garden": "Medicinal plant garden with over 200 species of Ayurvedic herbs.",
  "facility-library": "Digital library with books, journals, and e-resources.",
  "facility-laboratory": "State-of-the-art laboratories for practical training.",
};

type Store = Record<string, DocSection>;

function load(): Store {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Store) : {};
  } catch {
    return {};
  }
}

function save(s: Store) {
  localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new Event("docs-changed"));
}

export function getSection(key: string): DocSection {
  const all = load();
  return all[key] ?? { info: DEFAULT_INFO[key] ?? "", files: [] };
}

export function setSection(key: string, section: DocSection) {
  const all = load();
  all[key] = section;
  save(all);
}

export function resetSection(key: string) {
  const all = load();
  delete all[key];
  save(all);
}

export function newDocId() {
  return Math.random().toString(36).slice(2, 10);
}

export function useDocSection(key: string): DocSection {
  const [s, setS] = useState<DocSection>(() => getSection(key));
  useEffect(() => {
    const sync = () => setS(getSection(key));
    window.addEventListener("docs-changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("docs-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, [key]);
  return s;
}