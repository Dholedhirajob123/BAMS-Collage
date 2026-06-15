import { useEffect, useState } from "react";

export type DocFile = { id: string; name: string; dataUrl: string; size: number; addedAt: number; batch?: string };
export type DocSection = { info: string; files: DocFile[] };

const KEY = "ssam-docs-v1";

export const DOC_SECTIONS: { key: string; label: string }[] = [
  { key: "attendance-teaching", label: "Staff Attendance — Teaching Staff" },
  { key: "attendance-non-teaching", label: "Staff Attendance — Non Teaching Staff" },
  { key: "attendance-hospital", label: "Staff Attendance — Hospital Staff" },
  { key: "attendance-ug", label: "Student Attendance — UG" },
  { key: "fra-fee-structure", label: "FRA Fee Structure — Overview" },
  { key: "fra-ug", label: "FRA Fee Structure — UG" },
  { key: "student-admission-list", label: "Student Admission List" },
  { key: "programs-admission", label: "Programs Offered — Admission Details" },
  { key: "government-approvals", label: "Government Approvals" },
  { key: "result", label: "Result" },
  { key: "alumni-association", label: "Alumni Association" },
  { key: "academic-syllabus", label: "Academic Syllabus UG" },
  { key: "research-publications", label: "Research and Publications" },
  { key: "download", label: "Downloads" },
  { key: "important-links", label: "Important Links" },
  { key: "calendar-ug", label: "Academic Calendar — UG" },
  { key: "time-table", label: "Time Table" },
  { key: "timetable-ug", label: "Time Table — UG" },
  { key: "muhs-mandate", label: "MUHS Mandate — Overview" },
  { key: "muhs-mandate-circulars", label: "MUHS Mandate — Circulars" },
  { key: "muhs-mandate-notifications", label: "MUHS Mandate — Notifications" },
  
];

const DEFAULT_INFO: Record<string, string> = {
  "attendance-teaching": "Monthly attendance record of all Teaching Staff members. Download the latest attendance sheets below.",
  "attendance-non-teaching": "Monthly attendance record of Non-Teaching Staff. Download the latest attendance sheets below.",
  "attendance-hospital": "Monthly attendance record of Hospital Staff including doctors, nurses, and support staff.",
  "attendance-ug": "UG (BAMS) student attendance reports — year-wise and month-wise sheets.",
  "fra-fee-structure": "Fee structure approved by the Fee Regulating Authority (FRA), Government of Maharashtra. Download notifications below.",
  "fra-ug": "FRA approved Undergraduate (BAMS) fee structure documents.",
  "student-admission-list": "Official list of students admitted to UG  programs. Download year-wise admission lists below.",
  "programs-admission": "Details of programs offered and admission criteria for RAJASHRI AYURVEDIC MEDICAL COLLEGE & HOSPITAL.",
  "government-approvals": "Government approvals and regulatory certificates held by the institute.",
  "result": "Exam results and merit list PDFs for affiliated courses.",
  "alumni-association": "Information about our alumni association and its activities.",
  "academic-syllabus": "UG (BAMS) academic syllabus documents and curriculum details.",
  "research-publications": "Research publications, papers and academic output from the college.",
  "download": "Download PDF resources and important documents available to visitors.",
  "important-links": "Important links and downloadable resources for students and staff.",
  "calendar-ug": "Academic calendar for Undergraduate (BAMS) program as per MUHS guidelines.",
  "time-table": "Time table documents organized by batch. Download the latest timetable PDFs below.",
  "muhs-mandate": "Mandatory disclosures and circulars issued by Maharashtra University of Health Sciences (MUHS), Nashik.",
  "muhs-mandate-circulars": "Latest circulars released by MUHS for affiliated colleges.",
  "muhs-mandate-notifications": "Official notifications from MUHS for students, faculty and administration.",
  "faculty-teaching-staff": "Teaching staff details and department faculty information for the current academic year.",
 
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
