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
  return (
    <h2 className="text-2xl md:text-3xl font-bold text-brand mb-3 border-l-4 border-amber-500 pl-4">
      {children}
    </h2>
  );
}

function YearTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="w-12 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500"></div>
      <p className="text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

function CouncilTable({ slug, title, year }: { slug: CouncilKey; title: string; year?: string }) {
  const rows = useCouncil(slug);
  
  return (
    <div className="space-y-6">
    

    

      {/* Table Section */}
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        {/* Mobile View - Card Layout */}
        <div className="block md:hidden">
          {rows.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              No members yet.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {rows.map((r, i) => (
                <div key={r.id} className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs text-muted-foreground">#{i + 1}</span>
                      <h3 className="font-semibold text-brand text-lg mt-1">{r.name}</h3>
                    </div>
                    {r.position && (
                      <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-xs rounded-full">
                        {r.position}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Designation</p>
                      <p className="font-medium">{r.designation || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Mobile</p>
                      {r.phone ? (
                        <a href={`tel:${r.phone}`} className="text-brand hover:underline font-medium">
                          {r.phone}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-muted-foreground">Email</p>
                      {r.email ? (
                        <a href={`mailto:${r.email}`} className="text-brand hover:underline break-all">
                          {r.email}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Desktop View - Table */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30">
                <TableHead className="w-16 font-semibold">Sr.No</TableHead>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Designation</TableHead>
                <TableHead className="font-semibold">Position</TableHead>
                <TableHead className="font-semibold">Mobile No.</TableHead>
                <TableHead className="font-semibold">Email ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r, i) => (
                <TableRow key={r.id} className="hover:bg-secondary/50 transition-colors">
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell className="font-semibold text-brand">{r.name}</TableCell>
                  <TableCell>{r.designation}</TableCell>
                  <TableCell>
                    {r.position ? (
                      <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-xs rounded-full">
                        {r.position}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {r.phone ? (
                      <a href={`tel:${r.phone}`} className="text-brand hover:underline font-medium">
                        {r.phone}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {r.email ? (
                      <a href={`mailto:${r.email}`} className="text-brand hover:underline break-all">
                        {r.email}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-12">
                    No members yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
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