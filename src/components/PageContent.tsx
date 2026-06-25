// components/PageContent.tsx
import { DEPT_PAGE_CONTENT } from "./DepartmentContent";
import { DocSection } from "./DocSection";
import { DOC_SECTIONS } from "../lib/docsStore"; // ✅ import from documentStore
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
const TeachingStaff = () => <StaffSection title="Teaching Staff" group="teaching" slug="staff-teaching" />;
const NonTeachingStaff = () => <StaffSection title="Non-Teaching Staff" group="non-teaching" slug="staff-non-teaching" />;

// ============================================
// DOCUMENT PAGES – build from DOC_SECTIONS (includes news, notices, etc.)
// ============================================
const DOC_PAGES: Record<string, React.FC> = Object.fromEntries(
  DOC_SECTIONS
    .filter((s) => s.key !== "faculty-teaching-staff") // exclude because TeachingStaff handles it
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
  "staff-teaching": TeachingStaff,          // ✅ consistent slug
  "staff-non-teaching": NonTeachingStaff,
  "faculty-teaching-staff": TeachingStaff, // Dedicated detailed view

  // All department pages
  ...DEPT_PAGE_CONTENT,

  "important-links": ImportantLinks,

  // All document pages – this includes news, notices, press releases, etc.
  ...DOC_PAGES,
};