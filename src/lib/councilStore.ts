import { useEffect, useState } from "react";

export type CouncilMember = {
  id: string;
  name: string;
  designation: string;
  position: string;
  email: string;
};

export type CouncilKey =
  | "iqac"
  | "college-council-curriculum"
  | "grievances-cell"
  | "anti-ragging-cell"
  | "internal-grievances-vishakha"
  | "reservation-cell"
  | "academic-council-committee-2023-2024"
  | "co-curricular-extra-curricular-activity-cell"
  | "research-innovation-entrepreneurship-cell"
  | "student-support-career-guidance-placement-cell"
  | "student-council";

export const COUNCIL_GROUPS: { key: CouncilKey; label: string }[] = [
  { key: "iqac", label: "Internal Quality Assurance Cell for AY 2024-25" },
  { key: "college-council-curriculum", label: "College Council Committee for the AY 2024-2025" },
  { key: "grievances-cell", label: "Student Grievances and Redressal Committee" },
  { key: "anti-ragging-cell", label: "Anti-Ragging Committee 2024-25" },
  { key: "internal-grievances-vishakha", label: "Committee Against Sexual Harassment" },
  { key: "reservation-cell", label: "Human Resources Development Cell for the AY 2024-25" },
  {
    key: "academic-council-committee-2023-2024",
    label: "Academic Council Committee",
  },
  {
    key: "co-curricular-extra-curricular-activity-cell",
    label: "Co-Curricular & Extra-Curricular Activity Cell",
  },
  {
    key: "research-innovation-entrepreneurship-cell",
    label: "Research Innovation and Entrepreneurship Cell",
  },
  {
    key: "student-support-career-guidance-placement-cell",
    label: "Student Support, Career Guidance and Placement Cell",
  },
  { key: "student-council", label: "Student Council" },
];

const mk = (
  name: string,
  designation: string,
  position = "Member",
  phone = "",
  email = "",
): Omit<CouncilMember, "id"> => ({
  name,
  designation,
  position,
  email,
});

const DEFAULTS: Record<CouncilKey, CouncilMember[]> = {
"iqac": [
    { id: "i1", ...mk("Dr. Sonal Mohanlalji Rathi", "Chairman", "Principal", "9423156907", "sonallohiya07@gmail.com") },
    { id: "i2", ...mk("Dr. Prashant Janardhan Divthane", "Member", "Medical Superintendent", "7588565566", "anvipd@gmail.com") },
    { id: "i3", ...mk("Dr. Nikhil Ashok Baxi", "Member", "Professor", "9822824590", "nikhil24j@gmail.com") },
    { id: "i4", ...mk("Dr. Mahesh Madan Rathod", "Member", "Professor", "9405272013", "drmaheshrathod2008@rediffmail.com") },
    { id: "i5", ...mk("Dr. Vidya Dattatray Khot", "Member", "Associate Professor", "7066526616", "dr.vidyakhot24@gmail.com") },
    { id: "i6", ...mk("Mr. Pandhare Vinod Sahebrao", "Member", "Administrative", "9370035692", "vinupandhare2383@gmail.com") },
    { id: "i7", ...mk("Mr. Dutonde Gajanan Ashok", "Member", "College Administrative Staff", "9834959031", "gajupatil307@gmail.com") },
    { id: "i8", ...mk("Kamble Kiran Balaji", "Member", "Metron", "8788082502", "annurahul143@gmail.com") },
    { id: "i9", ...mk("Dr. Lahorkar Balaji Rangnathrao", "Member", "External", "9881361469", "brlahorkar@gmail.com") },
],
 "college-council-curriculum": [
    { id: "c1", ...mk("Vda. Rathi Sonal Mohanlalji", "Chairman", "Principal", "9423156907", "sonallohiya07@gmail.com") },
    { id: "c2", ...mk("Vd. Baxi Nikhil Ashok", "Member", "Professor (Samhita)", "9822824590", "nikhil24j@gmail.com") },
    { id: "c3", ...mk("Vd. Jaiswal Aashishkumar N.", "Member", "Member (Rachana Sharir)", "9309853354", "jaiswalashish187@gmail.com") },
    { id: "c4", ...mk("Vda. Khot Vidhya Dattatray", "Member", "Asso. Professor (Kriya Sharir)", "7066526616", "dr.vidyakhot24@gmail.com") },
],
"grievances-cell": [
    { id: "g1", ...mk("Vda. Rathi Sonal Mohanlalji", "Chairman", "Principal", "9423156907", "sonallohiya07@gmail.com") },
    { id: "g2", ...mk("Vd. Baxi Nikhil Ashok", "Member", "Professor", "9822824590", "nikhil24j@gmail.com") },
    { id: "g3", ...mk("Vd. Jaiswal Aashishkumar N.", "Member", "Reader", "9309853354", "jaiswalashish187@gmail.com") },
    { id: "g4", ...mk("Vda. Khot Vidhya", "Member", "Reader", "7066526616", "dr.vidyakhot24@gmail.com") },
    { id: "g5", ...mk("Mr. Pandhare Vinod Sahebrao", "Member", "Admin", "9370035692", "vinupandhare2382@gmail.com") },
    { id: "g6", ...mk("Mr. Murudkar Pramod Prahlad", "Member", "Librarian", "9158928990", "pramodmuradkar007@gmail.com") },
    { id: "g7", ...mk("Giri Sagar Shravan", "Member", "Boy Student", "9307741763", "sagarpiti1607@gmail.com") },
    { id: "g8", ...mk("Ingole Sakshi Vinod", "Member", "Girl Student", "7887935495", "ingolesakshi5@gmail.com") },
    { id: "g9", ...mk("Tathe Vikram Dattatray", "Member", "Boy Student", "9022916217", "vickytathe65@gmail.com") },
    { id: "g10", ...mk("Sanjivani Sunil Bilari", "Member", "Girl Student", "8007705071", "ssbilari28@gmail.com") },
    { id: "g11", ...mk("Mr. Dutonde Gajanan Ashok", "Member", "Office Bearer", "9834955031", "gajupatil307@gmail.com") },
],
"anti-ragging-cell": [
    { id: "a1", ...mk("Vda. Rathi Sonal Mohanlalji", "Chairman", "Principal", "9423156907", "Sonallohiya07@gmail.com") },
    { id: "a2", ...mk("Vd. Baxi Nikhil Ashok", "Member", "Professor", "9822824590", "nikhil24j@gmail.com") },
    { id: "a3", ...mk("Vd. Jaiswal Aashishkumar N.", "Member", "Reader", "9309853354", "jaiswalashish187@gmail.com") },
    { id: "a4", ...mk("Vda. Khot Vidhya", "Member", "Reader", "7066526616", "dr.vidyakhot24@gmail.com") },
    { id: "a5", ...mk("Mr. Pandhare Vinod", "Member", "Admin", "9370035692", "vinupandhare2382@gmail.com") },
],
"internal-grievances-vishakha": [
    { id: "v1", ...mk("Vda. Rathi Sonal Mohanlalji", "Chairman", "Chairman", "9423156907", "Sonallohiya07@gmail.com") },
    { id: "v2", ...mk("Vda. Khot Vidya Dattatray", "Member", "Member", "7066526616", "dr.vidyakhot24@gmail.com") },
    { id: "v3", ...mk("Vda. Temkar Shital Uttamrao", "Member", "Member", "9689965227", "shitaltemkar1@gmail.com") },
    { id: "v4", ...mk("Vda. Chimankar Rohini", "Member", "Member", "9011682897", "rohinichimankar23@gmail.com") },
    { id: "v5", ...mk("Mrs. Langute Shreedevi Vyankatrao", "Member", "Member", "9172640647", "shreedevigawali93@gmail.com") },
],
 "reservation-cell": [
    { id: "r1", ...mk("Vda. Rathi Sonal Mohanlalji", "Chairman", "Principal", "9423156907", "sonallohiya07@gmail.com") },
    { id: "r2", ...mk("Vd. Baxi Nikhil Ashok", "Co-ordinator", "Professor (Samhita)", "9822824590", "nikhil24j@gmail.com") },
    { id: "r3", ...mk("Dr. Metangale Bhagwan", "Member", "DMS", "9373259353", "bhagwanpatil53@gmail.com") },
    { id: "r4", ...mk("Vd. Jaiswal Aashishkumar N.", "Member", "Asso. Professor (Rachana Sharir)", "9309853354", "jaiswalashish187@gmail.com") },
    { id: "r5", ...mk("Mr. Pandhare Vinod Sahebrao", "Member", "Admin", "9370035692", "vinupandhare2382@gmail.com") },
],
 "academic-council-committee-2023-2024": [
    { id: "ac1", ...mk("Vda. Rathi Sonal Mohanlalji", "Chairman", "Principal", "9423156907", "sonallohiya07@gmail.com") },
    { id: "ac2", ...mk("Vda. Temkar Shital Uttamrao", "Member", "Asst. Professor (Samhita)", "9689965227", "shitaltemkar1@gmail.com") },
    { id: "ac3", ...mk("Vda. Chimankar Rohini Pandurang", "Member", "Asst. Professor (Kriya Sharir)", "9011682897", "rohinichimankar23@gmail.com") },
    { id: "ac4", ...mk("Vd. Kakade Ram Balchandra", "Member", "Asst. Professor (Rachana Sharir)", "9970827949", "drramkakade22@gmail.com") },
    { id: "ac5", ...mk("Mrs. Langute Shreedevi Vyankatrao", "Member", "Asst. Professor (Sanskrit)", "9172640647", "shreedevigawali93@gmail.com") },
],
"co-curricular-extra-curricular-activity-cell": [
    { id: "cc1", ...mk("Vda. Rathi Sonal Mohanlalji", "Chairman", "Principal", "9423156907", "sonallohiya07@gmail.com") },
    { id: "cc2", ...mk("Vd. Baxi Nikhil Ashok", "Convenor", "Professor (Samhita)", "9822824590", "nikhil24j@gmail.com") },
    { id: "cc3", ...mk("Vd. Jaiswal Aashishkumar N.", "Member", "Asso. Professor (Rachana Sharir)", "9309853354", "jaiswalashish187@gmail.com") },
    { id: "cc4", ...mk("Vda. Khot Vidya Dattatray", "Member", "Asso. Professor (Kriya Sharir)", "7066526616", "dr.vidyakhot24@gmail.com") },
    { id: "cc5", ...mk("Vda. Temkar Shital Uttamrao", "Member", "Asst. Professor (Samhita)", "9689965227", "shitaltemkar1@gmail.com") },
    { id: "cc6", ...mk("Vd. Kakade Ram Balchandra", "Member", "Asst. Professor (Rachana Sharir)", "9970827949", "drramkakade22@gmail.com") },
    { id: "cc7", ...mk("Vda. Chimankar Rohini Pandurang", "Member", "Asst. Professor (Kriya Sharir)", "9011682897", "rohinichimankar23@gmail.com") },
    { id: "cc8", ...mk("Mrs. Langute Shreedevi Vyankatrao", "Member", "Asst. Professor (Sanskrit)", "9172640647", "shreedevigawali93@gmail.com") },
],
  "research-innovation-entrepreneurship-cell": [
    { id: "ri1", ...mk("Vda. Rathi Sonal Mohanlalji", "Chairman", "Principal", "9423156907", "sonallohiya07@gmail.com") },
    { id: "ri2", ...mk("Vd. Baxi Nikhil Ashok", "Co-ordinator", "Professor (Samhita)", "9822824590", "nikhil24j@gmail.com") },
    { id: "ri3", ...mk("Vd. Jaiswal Aashishkumar N.", "Member", "Asso. Professor (Rachana Sharir)", "9309853354", "jaiswalashish187@gmail.com") },
    { id: "ri4", ...mk("Vda. Khot Vidya Dattatray", "Member", "Asso. Professor (Kriya Sharir)", "7066526616", "dr.vidyakhot24@gmail.com") },
    { id: "ri5", ...mk("Vda. Temkar Shital Uttamrao", "Member", "Asst. Professor (Samhita)", "9689965227", "shitaltemkar1@gmail.com") },
    { id: "ri6", ...mk("Vd. Kakade Ram Balchandra", "Member", "Asst. Professor (Rachana Sharir)", "9970827949", "drramkakade22@gmail.com") },
    { id: "ri7", ...mk("Prathmesh V. Jawanjal", "Member", "Student (Boy)", "9579281695", "Prathmeshjawanjal741@gmail.com") },
    { id: "ri8", ...mk("Siddhika Purushottam Nikam", "Member", "Student (Girl)", "9130558187", "Siddhi.nikam13@gmail.com") },
    { id: "ri9", ...mk("Sanghamitra Sakhare", "Member", "Student (Girl)", "8261045712", "sakharesanghamitra678@gmail.com") },
    { id: "ri10", ...mk("Sdhan Kishor Sariost", "Member", "Student (Boy)", "8329423436", "kishorsultane86@gmail.com") },
],
"student-support-career-guidance-placement-cell": [
    { id: "sp1", ...mk("Vda. Rathi Sonal Mohanlalji", "Chairman", "Principal", "9423156907", "sonallohiya07@gmail.com") },
    { id: "sp2", ...mk("Vd. Baxi Nikhil Ashok", "Convenor", "Professor (Samhita)", "9822824590", "nikhil24j@gmail.com") },
    { id: "sp3", ...mk("Vd. Jaiswal Aashishkumar N.", "Member", "Asso. Professor (Rachana Sharir)", "9309853354", "jaiswalashish187@gmail.com") },
    { id: "sp4", ...mk("Vda. Khot Vidya Dattatray", "Member", "Asso. Professor (Kriya Sharir)", "7066526616", "dr.vidyakhot24@gmail.com") },
    { id: "sp5", ...mk("Vda. Temkar Shital Uttamrao", "Member", "Asst. Professor (Samhita)", "9689965227", "shitaltemkar1@gmail.com") },
    { id: "sp6", ...mk("Mrs. Langute Shreedevi Vyankatrao", "Member", "Asst. Professor (Sanskrit)", "9172640647", "shreedevigawali93@gmail.com") },
    { id: "sp7", ...mk("Sagar Shravan Giri", "Member", "Boys Student", "9309741763", "sagargiri1607@gmail.com") },
    { id: "sp8", ...mk("Ku. Mrunal Wanole", "Member", "Girl Student", "8999985165", "wanolemrunal@gmail.com") },
    { id: "sp9", ...mk("Mr. Narhari Tejankar", "Member", "Boys Parent", "9096638282", "----") },
    { id: "sp10", ...mk("Mr. Namdeo Sanap", "Member", "Girls Parent", "9421325160", "----") },
    { id: "sp11", ...mk("Indrakshudha Jayant Donadkar", "Member", "Girl Student", "8830956539", "ishaadonadkar@gmail.com") },
    { id: "sp12", ...mk("Kartik Dattatray Bhosale", "Member", "Boy Student", "8329744088", "kartikraje45@gmail.com") },
],
 "student-council": [
    { id: "s1", ...mk("Sagar Shravan Giri", "Chairman", "Student", "9309741763", "sagargiri1607@gmail.com") },
    { id: "s2", ...mk("Sahil Sanjay Batte", "General Secretary", "Student", "9689614494", "battesahil@gmail.com") },
    { id: "s3", ...mk("Nikita Vikas Pise", "Member", "Student", "7057094105", "npise9553@gmail.com") },
    { id: "s4", ...mk("Gayatri Devrao Dahatonde", "Literary Secretary", "Student", "7498384770", "nileshdahatonde30@gmail.com") },
    { id: "s5", ...mk("Vinayak Ganpat Borkar", "Cultural, Fine art secretary", "Student", "9834762297", "vinayakbo88@gmail.com") },
    { id: "s6", ...mk("Yash Sunil Kuber", "Sport Secretary", "Student", "8668458763", "yshakuber2665@gmail.com") },
    { id: "s7", ...mk("Siddhika Purushottam Nikam", "Lady Student Representative", "Student", "9130558187", "Siddhi.nikam13@gmail.com") },
    { id: "s8", ...mk("Rushi Sadanand Gawande", "NSS Representative", "Student", "9112944662", "Rushigawande892@gmail.com") },
    { id: "s9", ...mk("Vijaya Madhukar Tupkar", "Member", "Student", "9371750484", "vijayatupkar30@gmail.com") },
],
};

const KEY = "ssam-council-v2";
type Store = Partial<Record<CouncilKey, CouncilMember[]>>;

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
  window.dispatchEvent(new Event("council-changed"));
}

export function getCouncil(k: CouncilKey): CouncilMember[] {
  return load()[k] ?? DEFAULTS[k];
}
export function setCouncil(k: CouncilKey, list: CouncilMember[]) {
  const s = load();
  s[k] = list;
  save(s);
}
export function resetCouncil(k: CouncilKey) {
  const s = load();
  delete s[k];
  save(s);
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