import { useEffect, useState } from "react";

export type CouncilMember = {
  id: string;
  name: string;
  designation: string;
  position: string;
  phone: string;
  email: string;
};

export type CouncilKey =
  | "iqac"
  | "college-council-curriculum"
  | "grievances-cell"
  | "anti-ragging-cell"
  | "internal-grievances-vishakha"
  | "reservation-cell"
  | "student-council";

export const COUNCIL_GROUPS: { key: CouncilKey; label: string }[] = [
  { key: "iqac", label: "IQAC" },
  { key: "college-council-curriculum", label: "College Council (CDC)" },
  { key: "grievances-cell", label: "Grievance Redressal Cell" },
  { key: "anti-ragging-cell", label: "Anti-Ragging Committee" },
  { key: "internal-grievances-vishakha", label: "Internal Complaint (Vishakha)" },
  { key: "reservation-cell", label: "Reservation Cell" },
  { key: "student-council", label: "Student Council" },
];

const mk = (name: string, designation: string, position = "Member", phone = "", email = ""): Omit<CouncilMember, "id"> => ({
  name, designation, position, phone, email,
});

const DEFAULTS: Record<CouncilKey, CouncilMember[]> = {
  iqac: [
    { id: "i1", ...mk("Dr. Aware Milind B.", "Chairperson — Principal") },
    { id: "i2", ...mk("Dr. Pawale Pritam S.", "IQAC Coordinator") },
    { id: "i3", ...mk("Dr. Patil (Aher) Gayatri S.", "Senior Faculty Member") },
    { id: "i4", ...mk("Dr Patil Sandip", "Member") },
    { id: "i5", ...mk("Dr. Raut Aparna A.", "Faculty Member") },
    { id: "i6", ...mk("Dr. Pawar Parshuram S.", "PG Director") },
  ],
  "college-council-curriculum": [
    { id: "c0", ...mk("Vd. Aware Milind Babarao", "Principal — Chairman") },
    { id: "c1", ...mk("Vd. Dande Bhavana Sumit", "HOD — Sanskrit Samhita & Siddhanta") },
    { id: "c2", ...mk("Vd. Lahare Kunal H.", "HOD — Rachana Sharir") },
    { id: "c3", ...mk("Vd. Chondikar Prakash R.", "HOD — Kriya Sharir") },
    { id: "c4", ...mk("Vd. Shahane Vijay C.", "HOD — Swasthavritta & Yoga") },
    { id: "c5", ...mk("Vd. Pawale Pritam S.", "HOD — Dravyaguna") },
    { id: "c6", ...mk("Vd. Wagh Sucheta S.", "HOD — Rog Nidan") },
    { id: "c7", ...mk("Vd. Pagar Manisha M.", "HOD — Prasuti Tantra & Streerog") },
    { id: "c8", ...mk("Vd. Pawar Parshuram S.", "HOD — Kayachikitsa") },
    { id: "c9", ...mk("Vd. Raut Aparna A.", "HOD — Shalya Tantra") },
    { id: "c10", ...mk("Vd. Patil (Aher) Gayatri S.", "HOD — Panchakarma") },
  ],
  "grievances-cell": [
    { id: "g1", ...mk("Dr. Aware Milind B.", "Chairperson — Principal") },
    { id: "g2", ...mk("Dr. Raut Aparna A.", "Senior Faculty Member") },
    { id: "g3", ...mk("Dr. Wagh Sucheta", "Faculty Member") },
    { id: "g4", ...mk("Ms. Kadam Ashwini B.", "Administration Clerk") },
  ],
  "anti-ragging-cell": [
    { id: "a1", ...mk("Dr. Milind Aware", "Principal") },
    { id: "a2", ...mk("Mr. Ruchi Kumbharkar", "Civil Administration — Corporator") },
    { id: "a3", ...mk("Mr. Shekhar Phartale", "Police Inspector") },
    { id: "a4", ...mk("Mr. Nagare Santosh", "Media Representative") },
    { id: "a5", ...mk("Vrushali Sonawane", "NGO Representative") },
  ],
  "internal-grievances-vishakha": [
    { id: "v1", ...mk("Smt. Himgauri B. Aher", "Chairperson") },
    { id: "v2", ...mk("Dr. Aware Milind", "Secretary — Principal") },
    { id: "v3", ...mk("Dr. Raut Aparna", "Co-ordinator") },
    { id: "v4", ...mk("Vrushali Sonawane", "NGO Member") },
    { id: "v5", ...mk("Dr. Pagar Manisha", "Medical Superintendent") },
  ],
  "reservation-cell": [
    { id: "r1", ...mk("Dr. Milind Babarao Aware", "Chairman — Principal") },
    { id: "r2", ...mk("Dr. Popat Jagtap", "Professor") },
    { id: "r3", ...mk("Dr. Thakur Deepali", "Associate Professor") },
    { id: "r4", ...mk("Dr. Yogesh Surse", "Professor") },
    { id: "r5", ...mk("Dr. Sunil More", "Professor") },
    { id: "r6", ...mk("Mr. Akshay Khairnar", "Student Representative") },
  ],
  "student-council": [
    { id: "s1", ...mk("Mr. Anurag Nikam", "General Secretary") },
    { id: "s2", ...mk("Mr. Anad Lad", "Class Rep — 1st Year New") },
    { id: "s3", ...mk("Mr. Pratik Gawali", "Class Rep — 1st Year Old") },
    { id: "s4", ...mk("Mr. Piyush Nalwade", "Class Rep — 2nd Year") },
    { id: "s5", ...mk("Mr. Mukundraj Channe", "Class Rep — Final Year") },
    { id: "s6", ...mk("Mr. Pramod Khatal", "Literary Secretary") },
    { id: "s7", ...mk("Miss. Purva Jangle", "Literary Secretary") },
  ],
};

const KEY = "ssam-council-v2";
type Store = Partial<Record<CouncilKey, CouncilMember[]>>;

function load(): Store {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; }
}
function save(s: Store) {
  localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new Event("council-changed"));
}

export function getCouncil(k: CouncilKey): CouncilMember[] {
  return load()[k] ?? DEFAULTS[k];
}
export function setCouncil(k: CouncilKey, list: CouncilMember[]) {
  const s = load(); s[k] = list; save(s);
}
export function resetCouncil(k: CouncilKey) {
  const s = load(); delete s[k]; save(s);
}
export function newCouncilId() {
  return `cm-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function useCouncil(k: CouncilKey): CouncilMember[] {
  const [list, setList] = useState<CouncilMember[]>(() =>
    typeof window === "undefined" ? DEFAULTS[k] : getCouncil(k),
  );
  useEffect(() => {
    const update = () => setList(getCouncil(k));
    update();
    window.addEventListener("council-changed", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("council-changed", update);
      window.removeEventListener("storage", update);
    };
  }, [k]);
  return list;
}
