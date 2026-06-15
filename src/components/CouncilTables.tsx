import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCouncil, type CouncilKey, COUNCIL_GROUPS } from "@/lib/councilStore";
import councilPic from "@/assets/gallery-1.jpg";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-semibold text-brand mb-2">{children}</h2>;
}

function YearTag({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground mb-4">{children}</p>;
}

function CouncilTable({ slug, title, year }: { slug: CouncilKey; title: string; year?: string }) {
  const rows = useCouncil(slug);
  return (
    <div>
      <div className="mb-6 rounded-md overflow-hidden border border-border bg-card">
        <img src={councilPic} alt={title} className="w-full h-44 object-cover" />
      </div>
      <SectionTitle>{title}</SectionTitle>
      <YearTag>{year ?? "Academic Year 2025-26"}</YearTag>
      <div className="rounded-md border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary">
              <TableHead className="w-16">Sr.No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Mobile No.</TableHead>
              <TableHead>Email ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={r.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell className="font-medium">{r.name}</TableCell>
                <TableCell>{r.designation}</TableCell>
                <TableCell>{r.position || <span className="text-muted-foreground">—</span>}</TableCell>
                <TableCell>
                  {r.phone ? (
                    <a href={`tel:${r.phone}`} className="text-brand hover:underline">{r.phone}</a>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell>
                  {r.email ? (
                    <a href={`mailto:${r.email}`} className="text-brand hover:underline">{r.email}</a>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-6">
                  No members yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

const TITLES: Record<CouncilKey, string> = Object.fromEntries(
  COUNCIL_GROUPS.map((g) => [g.key, g.label]),
) as Record<CouncilKey, string>;

const FULL_TITLES: Partial<Record<CouncilKey, string>> = {
  iqac: "IQAC – Internal Quality Assurance Cell",
  "college-council-curriculum": "College Council",
  "grievances-cell": "Grievance Redressal Cell",
  "anti-ragging-cell": "Anti-Ragging Committee",
  "internal-grievances-vishakha": "Internal Complaint Committee",
  "reservation-cell": "Reservation Cell",
  "student-council": "Student Council 2026-27",
};

export const COUNCIL_CONTENT: Record<string, React.FC> = Object.fromEntries(
  COUNCIL_GROUPS.map((g) => [
    g.key,
    () => <CouncilTable slug={g.key} title={FULL_TITLES[g.key] ?? TITLES[g.key]} />,
  ]),
);
