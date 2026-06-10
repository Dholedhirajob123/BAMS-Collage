import { useEffect, useState } from "react";

export type DocFile = { id: string; name: string; dataUrl: string; size: number; addedAt: number };
export type DocSection = { info: string; files: DocFile[] };

const KEY = "ssam-docs-v1";

export const DOC_SECTIONS: { key: string; label: string }[] = [
  { key: "attendance-teaching", label: "Staff Attendance — Teaching Staff" },
  { key: "attendance-non-teaching", label: "Staff Attendance — Non Teaching Staff" },
  { key: "attendance-hospital", label: "Staff Attendance — Hospital Staff" },
  { key: "attendance-ug", label: "Student Attendance — UG" },
  { key: "attendance-pg", label: "Student Attendance — PG" },
  { key: "fra-fee-structure", label: "FRA Fee Structure — Overview" },
  { key: "fra-ug", label: "FRA Fee Structure — UG" },
  { key: "fra-pg", label: "FRA Fee Structure — PG" },
  { key: "student-admission-list", label: "Student Admission List" },
  { key: "calendar-ug", label: "Academic Calendar — UG" },
  { key: "calendar-pg", label: "Academic Calendar — PG" },
  { key: "muhs-mandate", label: "MUHS Mandate — Overview" },
  { key: "muhs-mandate-circulars", label: "MUHS Mandate — Circulars" },
  { key: "muhs-mandate-notifications", label: "MUHS Mandate — Notifications" },
];

const DEFAULT_INFO: Record<string, string> = {
  "attendance-teaching": "Monthly attendance record of all Teaching Staff members. Download the latest attendance sheets below.",
  "attendance-non-teaching": "Monthly attendance record of Non-Teaching Staff. Download the latest attendance sheets below.",
  "attendance-hospital": "Monthly attendance record of Hospital Staff including doctors, nurses, and support staff.",
  "attendance-ug": "UG (BAMS) student attendance reports — year-wise and month-wise sheets.",
  "attendance-pg": "PG scholar attendance reports — year-wise and month-wise sheets.",
  "fra-fee-structure": "Fee structure approved by the Fee Regulating Authority (FRA), Government of Maharashtra. Download notifications below.",
  "fra-ug": "FRA approved Undergraduate (BAMS) fee structure documents.",
  "fra-pg": "FRA approved Postgraduate (MD/MS Ayurveda) fee structure documents.",
  "student-admission-list": "Official list of students admitted to UG / PG programs. Download year-wise admission lists below.",
  "calendar-ug": "Academic calendar for Undergraduate (BAMS) program as per MUHS guidelines.",
  "calendar-pg": "Academic calendar for Postgraduate (MD/MS) program as per MUHS guidelines.",
  "muhs-mandate": "Mandatory disclosures and circulars issued by Maharashtra University of Health Sciences (MUHS), Nashik.",
  "muhs-mandate-circulars": "Latest circulars released by MUHS for affiliated colleges.",
  "muhs-mandate-notifications": "Official notifications from MUHS for students, faculty and administration.",
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
