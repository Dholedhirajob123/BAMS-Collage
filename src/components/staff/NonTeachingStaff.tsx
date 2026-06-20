// components/staff/NonTeachingStaff.tsx
import { StaffSection } from "./StaffSection";

interface NonTeachingStaffProps {
  slug?: string;
}

export function NonTeachingStaff({ slug = "staff-non-teaching" }: NonTeachingStaffProps) {
  return <StaffSection title="Non-Teaching Staff" group="non-teaching" slug={slug} />;
}

export default NonTeachingStaff;