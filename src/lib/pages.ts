export type PageDef = {
  slug: string;
  title: string;
  category: string;
  body?: string;
};

export type NavItem = {
  label: string;
  slug?: string;
  to?: string;
  children?: NavItem[];
};

const p = (slug: string, title: string, category: string, body?: string): PageDef => ({
  slug,
  title,
  category,
  body,
});

export const PAGES: PageDef[] = [
  // Top nav
  p("about-us", "About Us", "About", "Learn about RAJASHRI AYURVEDIC MEDICAL COLLEGE & HOSPITAL, established in 2015."),
  p("history", "History", "About"),
  p("vision-mission", "Vision & Mission", "About"),
  p("founder-chairman", "Founder Chairman", "About"),
  p("chairman", "Chairman", "About"),
  p("hospital", "Hospital", "Hospital", "220-bed hospital with 3 operation theatres, ICU, Sonography and X-Ray facilities."),
  p("hospital-opd", "OPD Services", "Hospital"),
  p("hospital-ipd", "IPD Services", "Hospital"),
  p("hospital-departments", "Hospital Departments", "Hospital"),
  p("hospital-operation-theatre", "Operation Theatre", "Hospital"),
  p("facilities", "Facilities", "Facilities"),
  p("facility-infrastructure", "Infrastructure", "Facilities"),
  p("facility-herbal-garden", "Herbal Garden", "Facilities"),
  p("facility-library", "Library", "Facilities"),
  p("facility-laboratory", "LAB", "Facilities"),
  p("facility-hostel", "Hostel", "Facilities"),
  p("facility-canteen", "Canteen", "Facilities"),
  p("facility-transport", "Transport", "Facilities"),
  p("facility-sports", "Sports", "Facilities"),
  p("staff-college", "College Staff", "Staff"),
  p("download", "Downloads", "Resources"),
  p("important-links", "Important Links", "Resources"),
  p("photo-gallery", "Photo Gallery", "Media"),
  p("contact", "Contact Us", "Contact", "Kamal Nagar, Hirawadi, Panchavati, Nashik - 422003. Email: ssamnsk@gmail.com  Landline: +91 253 2621565"),
  p("pay-online", "Pay Online", "Services"),
  p("naac", "NAAC", "NAAC", "Accredited with Grade B++"),
  p("naac-ssr", "NAAC SSR", "NAAC"),
  p("naac-aqar", "NAAC AQAR", "NAAC"),
  p("naac-iiqa", "NAAC IIQA", "NAAC"),
  p("naac-certificate", "NAAC Certificate", "NAAC"),
  p("innovation-ecosystem", "Innovation Ecosystem", "Innovation"),

  // Council / Committee
  p("iqac", "Internal Quality Assurance Cell for AY 2024-25", "Council"),
  p("college-council-curriculum", "College Council Committee for the AY 2024-2025", "Council"),
  p("grievances-cell", "Student Grievances and Redressal Committee", "Council"),
  p("anti-ragging-cell", "Anti-Ragging Committee 2024-25", "Council"),
  p("internal-grievances-vishakha", "Committee Against Sexual Harassment", "Council"),
  p("reservation-cell", "Human Resources Development Cell for the AY 2024-25", "Council"),
  p("student-council", "Student Council", "Council"),
  p("rti-committee", "RTI Committee & Act", "Council"),
  p("academic-council-committee-2023-2024", "Academic Council Committee for the AY 2023-2024", "Council", "Academic Council Committee details for AY 2023-2024."),
  p("co-curricular-extra-curricular-activity-cell", "Co-Curricular & Extra-Curricular Activity Cell", "Council", "Co-curricular and extra-curricular activity cell information."),
  p("research-innovation-entrepreneurship-cell", "Research Innovation and Entrepreneurship Cell", "Council", "Research, innovation, and entrepreneurship cell details."),
  p("student-support-career-guidance-placement-cell", "Student Support, Career Guidance and Placement Cell", "Council", "Student support, career guidance, and placement cell information."),

  // Academics
  p("dept-sanskrit-samhita-siddhanta", "Sanskrit, Samhita and Siddhanta", "Academics"),
  p("dept-sharir-rachana", "Sharir Rachana", "Academics"),
  p("dept-sharir-kriya", "Sharir Kriya", "Academics"),
  p("dept-dravyaguna-vidnyan", "Dravyaguna Vidnyan", "Academics"),
  p("dept-agad-tantra", "Agad Tantra & Vidhi Vaidyak", "Academics"),
  p("dept-ras-shastra", "Ras Shastra and Bhaishajya Kalpana", "Academics"),
  p("dept-rog-nidan", "Rog Nidan Evum Vikruti Vidnyan", "Academics"),
  p("dept-swasthavritta", "Swasthavritta", "Academics"),
 

  // Faculty / Staff
  p("faculty-teaching-staff", "Teaching Staff", "Faculty"),
  p("staff-hospital", "Hospital Staff", "Staff"),
  p("staff-non-teaching", "Non Teaching Staff", "Staff"),

  // Attendance
  p("attendance-teaching", "Teaching Staff Attendance", "Attendance"),
  p("attendance-non-teaching", "Non Teaching Staff Attendance", "Attendance"),
  p("attendance-hospital", "Hospital Staff Attendance", "Attendance"),
  p("attendance-ug", "UG Student Attendance", "Attendance"),

  // Admissions / Programs
  p("programs-admission", "Programs Offered — Admission Details", "Admissions"),
  p("government-approvals", "Government Approvals", "Admissions"),
  p("fra-fee-structure", "FRA Fee Structure", "Admissions"),
  p("fra-ug", "FRA UG Fee Structure", "Admissions"),
  p("student-admission-list", "Student Admission List", "Admissions"),
  p("result", "Result", "Academics"),

  // More
  p("alumni-association", "Alumni Association", "Alumni"),
  p("academic-calendar", "Academic Calendar", "Academics"),
  p("calendar-ug", "Academic Calendar — UG", "Academics"),
  p("time-table", "Time Table", "Academics"),
  p("timetable-ug", "Time Table — UG", "Academics"),
  p("academic-syllabus", "Academic Syllabus UG", "Academics"),
  p("question-papers", "Question Papers", "Academics"),
  p("cie-cme", "CIE / CME", "Academics"),
  p("cie", "CIE", "Academics"),
  p("cme", "CME", "Academics"),
  p("research-publications", "Research and Publications", "Research"),
  p("e-portal", "E-Portal", "Resources"),
  p("activities", "Activities", "Activities"),
  p("activities-cultural", "Cultural Activities", "Activities"),
  p("activities-sports", "Sports Activities", "Activities"),
  p("activities-nss", "NSS", "Activities"),
  p("feedback", "Feedback", "Resources"),
  p("placement-cell", "Placement Cell", "Resources"),
  p("institute-annual-report", "Institute Annual Report", "Resources"),
  p("muhs-mandate", "MUHS Mandate Information", "Resources"),
  p("muhs-mandate-circulars", "MUHS Mandate — Circulars", "Resources"),
  p("muhs-mandate-notifications", "MUHS Mandate — Notifications", "Resources"),
  p("azadi-ka-amrut-mahosav", "Azadi ka Amrut Mahosav", "Events"),
  p("affiliated-university", "Details of Affiliated University : MUHS", "Notices"),
];

export const PAGE_MAP: Record<string, PageDef> = Object.fromEntries(
  PAGES.map((page) => [page.slug, page]),
);

export const TOP_NAV: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "About Us",
    children: [
      { label: "About", slug: "about-us" },
      { label: "History", slug: "history" },
      { label: "Vision & Mission", slug: "vision-mission" },
      { label: "Founder Chairman", slug: "founder-chairman" },
      { label: "Chairman", slug: "chairman" },
    ],
  },
  {
    label: "Hospital",
    children: [
      { label: "Overview", slug: "hospital" },
      { label: "OPD Services", slug: "hospital-opd" },
      { label: "IPD Services", slug: "hospital-ipd" },
      { label: "Departments", slug: "hospital-departments" },
      { label: "Operation Theatre", slug: "hospital-operation-theatre" },
    ],
  },
  {
    label: "Facilities",
    children: [
      { label: "Infrastructure", slug: "facility-infrastructure" },
      { label: "Herbal Garden", slug: "facility-herbal-garden" },
      { label: "Library", slug: "facility-library" },
      { label: "LAB", slug: "facility-laboratory" },
    ],
  },
  {
    label: "Staff",
    children: [
      { label: "Hospital Staff", slug: "staff-hospital" },
      { label: "College Staff", slug: "staff-college" },
      { label: "Non-Teaching", slug: "staff-non-teaching" },
    ],
  },
  {
    label: "Faculty",
    children: [
      { label: "Teaching Staff", slug: "faculty-teaching-staff" },
    ],
  },
  { label: "Download", slug: "download" },
  { label: "Important Links", slug: "important-links" },
  { label: "Photo Gallery", slug: "photo-gallery" },
  { label: "Contact", slug: "contact" },
  {
    label: "NAAC",
    children: [
      { label: "NAAC", slug: "naac" },
      { label: "SSR", slug: "naac-ssr" },
      { label: "AQAR", slug: "naac-aqar" },
      { label: "IIQA", slug: "naac-iiqa" },
      { label: "Certificate", slug: "naac-certificate" },
    ],
  },
  { label: "Innovation Ecosystem", slug: "innovation-ecosystem" },
];

export const SIDE_NAV: NavItem[] = [
  {
    label: "Council / Committee",
    children: [
      { label: "Academic Council Committee for the AY 2023-2024", slug: "academic-council-committee-2023-2024" },
      { label: "Internal Quality Assurance Cell for AY 2024-25", slug: "iqac" },
      { label: "College Council Committee for the AY 2024-2025", slug: "college-council-curriculum" },
      { label: "Student Grievances and Redressal Committee", slug: "grievances-cell" },
      { label: "Anti-Ragging Committee 2024-25", slug: "anti-ragging-cell" },
      { label: "Co-Curricular & Extra-Curricular Activity Cell", slug: "co-curricular-extra-curricular-activity-cell" },
      { label: "Committee Against Sexual Harassment", slug: "internal-grievances-vishakha" },
      { label: "Human Resources Development Cell for the AY 2024-25", slug: "reservation-cell" },
      { label: "Research Innovation and Entrepreneurship Cell", slug: "research-innovation-entrepreneurship-cell" },
      { label: "Student Support, Career Guidance and Placement Cell", slug: "student-support-career-guidance-placement-cell" },
      { label: "Student Council", slug: "student-council" },
    ],
  },
  {
    label: "Academics",
    children: [
      { label: "Sanskrit, Samhita and Siddhanta", slug: "dept-sanskrit-samhita-siddhanta" },
      { label: "Sharir Rachana", slug: "dept-sharir-rachana" },
      { label: "Sharir Kriya", slug: "dept-sharir-kriya" },
      { label: "Dravyaguna Vidnyan", slug: "dept-dravyaguna-vidnyan" },
      { label: "Agad Tantra & Vidhi Vaidyak", slug: "dept-agad-tantra" },
      { label: "Ras Shastra and Bhaishajya Kalpana", slug: "dept-ras-shastra" },
      { label: "Rog Nidan Evum Vikruti Vidnyan", slug: "dept-rog-nidan" },
      { label: "Swasthavritta", slug: "dept-swasthavritta" },
     
    ],
  },
  {
    label: "Faculty",
    children: [{ label: "Teaching Staff", slug: "faculty-teaching-staff" }],
  },
  {
    label: "Staff",
    children: [
      { label: "Hospital Staff", slug: "staff-hospital" },
      { label: "Non Teaching Staff", slug: "staff-non-teaching" },
    ],
  },
  {
    label: "Staff Attendance",
    children: [
      { label: "Teaching Staff", slug: "attendance-teaching" },
      { label: "Non Teaching Staff", slug: "attendance-non-teaching" },
      { label: "Hospital Staff", slug: "attendance-hospital" },
    ],
  },
  {
    label: "Student Attendance",
    children: [
      { label: "UG Student", slug: "attendance-ug" },
    ],
  },
  { label: "Programs Offered - Admission Details", slug: "programs-admission" },
  { label: "Government Approvals", slug: "government-approvals" },
  {
    label: "FRA Fee Structure",
    children: [
      { label: "Overview", slug: "fra-fee-structure" },
      { label: "UG", slug: "fra-ug" },
    ],
  },
  { label: "Student Admission List", slug: "student-admission-list" },
  { label: "Result", slug: "result" },
  { label: "Alumni Association", slug: "alumni-association" },
  {
    label: "Academic Calendar",
    children: [
      { label: "UG", slug: "calendar-ug" },
    ],
  },
  {
    label: "Time Table",
    children: [
      { label: "UG", slug: "timetable-ug" },
    ],
  },
  { label: "Academic Syllabus UG ", slug: "academic-syllabus" },
  
  { label: "Research and Publications", slug: "research-publications" },
  {
    label: "Activities",
    children: [
      { label: "Cultural", slug: "activities-cultural" },
      { label: "Sports", slug: "activities-sports" },
      { label: "NSS", slug: "activities-nss" },
    ],
  },
  { label: "Feedback", slug: "feedback" },
  { label: "Institute Annual Report", slug: "institute-annual-report" },
  {
    label: "MUHS Mandate Information",
    children: [
      { label: "Overview", slug: "muhs-mandate" },
      { label: "Circulars", slug: "muhs-mandate-circulars" },
      { label: "Notifications", slug: "muhs-mandate-notifications" },
    ],
  },
  { label: "Azadi ka Amrut Mahosav", slug: "azadi-ka-amrut-mahosav" },
];
