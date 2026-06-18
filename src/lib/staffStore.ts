// lib/staffStore.ts
import { useEffect, useState } from "react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import g7 from "@/assets/gallery-7.jpg";
import g8 from "@/assets/gallery-8.jpg";

export type StaffMember = {
  id: string;
  name: string;
  designation: string;
  education: string;
  year: string;
  photo: string;
  mobile?: string;
  // Teaching staff fields
  teacherCode?: string;
  dob?: string;
  registrationNumber?: string;
  qualification?: string;
  dateOfJoining?: string;
  email?: string;
  experience?: string;
};

export type StaffGroupKey = "hospital" | "non-teaching" | "teaching";

export const STAFF_GROUPS: { key: StaffGroupKey; label: string }[] = [
  { key: "hospital", label: "Hospital Staff" },
  { key: "non-teaching", label: "Non-Teaching Staff" },
  { key: "teaching", label: "Teaching Staff" },
];

const P = [g1, g2, g3, g4, g5, g6, g7, g8];

const DEFAULTS: Record<StaffGroupKey, StaffMember[]> = {
  hospital: [
    {
      id: "h1",
      name: "Dr. Sandip Patil",
      designation: "Medical Superintendent",
      education: "M.D. (Kayachikitsa)",
      year: "Since 2010",
      photo: P[0],
      mobile: "+91 98200 10001",
    },
    {
      id: "h2",
      name: "Dr. Aparna Raut",
      designation: "Resident Medical Officer",
      education: "M.D. (Panchakarma)",
      year: "Since 2014",
      photo: P[1],
      mobile: "+91 98200 10002",
    },
  ],
 
  
  "non-teaching": [
    {
      id: "n1",
      name: "Shri Anil Deshmukh",
      designation: "Administrative Officer",
      education: "M.Com, MBA",
      year: "Since 2005",
      photo: P[0],
      mobile: "+91 98200 30001",
    },
    {
      id: "n2",
      name: "Smt. Sunita Joshi",
      designation: "Accountant",
      education: "M.Com",
      year: "Since 2009",
      photo: P[1],
      mobile: "+91 98200 30002",
    },
  ],
  teaching: [
    {
      id: "t1",
      name: "Dr. Milind Aware",
      designation: "Professor",
      education: "M.D. Ph.D. (Ayurveda)",
      year: "Since 2008",
      photo: P[4],
      mobile: "+91 98200 40001",
      teacherCode: "TCH001",
      dob: "15/06/1975",
      registrationNumber: "NCISM-12345",
      qualification: "M.D. Ph.D. (Ayurveda)",
      dateOfJoining: "01/07/2008",
      email: "milind.aware@rajashriayurvedic.edu.in",
      experience: "17 years",
    },
    {
      id: "t2",
      name: "Dr. Dineshwar Daware",
      designation: "Professor",
      education: "M.D. (Samhita Siddhanta)",
      year: "Since 2012",
      photo: P[5],
      mobile: "+91 98200 40002",
      teacherCode: "TCH002",
      dob: "20/08/1980",
      registrationNumber: "NCISM-67890",
      qualification: "M.D. (Samhita Siddhanta)",
      dateOfJoining: "15/07/2012",
      email: "dineshwar.daware@rajashriayurvedic.edu.in",
      experience: "12 years",
    },
  ],
};

const KEY = "ssam-staff-v1";
type Store = Partial<Record<StaffGroupKey, StaffMember[]>>;

function load(): Store {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

function save(s: Store) {
  localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new Event("staff-changed"));
}

export function getStaff(group: StaffGroupKey): StaffMember[] {
  const s = load();
  return s[group] ?? DEFAULTS[group];
}

export function setStaff(group: StaffGroupKey, members: StaffMember[]) {
  const s = load();
  s[group] = members;
  save(s);
}

export function resetStaff(group: StaffGroupKey) {
  const s = load();
  delete s[group];
  save(s);
}

export function useStaff(group: StaffGroupKey): StaffMember[] {
  const [list, setList] = useState<StaffMember[]>(() =>
    typeof window === "undefined" ? DEFAULTS[group] : getStaff(group),
  );
  useEffect(() => {
    const update = () => setList(getStaff(group));
    update();
    window.addEventListener("staff-changed", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("staff-changed", update);
      window.removeEventListener("storage", update);
    };
  }, [group]);
  return list;
}

export function newId() {
  return `m-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}