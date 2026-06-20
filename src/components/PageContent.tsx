// components/PageContent.tsx
import { useState } from "react";
import { DEPT_PAGE_CONTENT } from "./DepartmentContent";
import { DocSection } from "./DocSection";
import { DOC_SECTIONS } from "@/lib/docsStore";
import { TeachingStaff } from "./staff/TeachingStaff";
import { StaffSection } from "./staff/StaffSection";
import {
  PhotoGallery,
  AboutUs,
  History,
  VisionMission,
  FounderChairman,
  Chairman,
  Hospital,
  Library,
  HerbalGarden,
  Infrastructure,
  Lab,
  Contact,
} from "./pages";
import { ImportantLinks } from "./pages/ImportantLinks";

// ============================================
// STAFF PAGE COMPONENTS
// ============================================
const HospitalStaff = () => <StaffSection title="Hospital Staff" group="hospital" slug="staff-hospital" />;
const CollegeStaff = () => <StaffSection title="College Staff" group="college" slug="staff-college" />;
const NonTeachingStaff = () => <StaffSection title="Non-Teaching Staff" group="non-teaching" slug="staff-non-teaching" />;

// ============================================
// DOCUMENT PAGES - Filter out faculty-teaching-staff
// ============================================
const DOC_PAGES: Record<string, React.FC> = Object.fromEntries(
  DOC_SECTIONS
    .filter((s) => s.key !== "faculty-teaching-staff") // Remove teaching staff from docs
    .map((s) => [s.key, () => <DocSection slug={s.key} />]),
);

// ============================================
// PAGE_CONTENT EXPORT
// ============================================
export const PAGE_CONTENT: Record<string, React.FC> = {
  // About pages
  "photo-gallery": PhotoGallery,
  "about-us": AboutUs,
  "history": History,
  "vision-mission": VisionMission,
  "founder-chairman": FounderChairman,
  "chairman": Chairman,
  
  // Facility pages
  "hospital": Hospital,
  "facility-library": Library,
  "facility-herbal-garden": HerbalGarden,
  "facility-infrastructure": Infrastructure,
  "facility-laboratory": Lab,
  
  // Contact
  "contact": Contact,
  
  // Staff pages
  "staff-hospital": HospitalStaff,
  "staff-college": CollegeStaff,
  "staff-non-teaching": NonTeachingStaff,
  "faculty-teaching-staff": TeachingStaff, // This will NOT be overridden by DOC_PAGES
  
  // Department pages
  ...DEPT_PAGE_CONTENT,
    "important-links": ImportantLinks,

  // Document pages (excluding faculty-teaching-staff)
  ...DOC_PAGES,
  
  // News & Events
  "news-events": () => <DocSection slug="news-events" />,
  "notices": () => <DocSection slug="notices" />,
  "press-releases": () => <DocSection slug="press-releases" />,
};