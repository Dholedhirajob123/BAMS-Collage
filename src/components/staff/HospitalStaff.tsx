// components/staff/HospitalStaff.tsx
import { StaffSection } from "./StaffSection";

interface HospitalStaffProps {
  slug?: string;
}

export function HospitalStaff({ slug = "staff-hospital" }: HospitalStaffProps) {
  return <StaffSection title="Hospital Staff" group="hospital" slug={slug} />;
}

export default HospitalStaff;