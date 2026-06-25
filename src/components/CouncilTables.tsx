// components/CouncilTables.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCouncilData, useCouncilStore, type CouncilKey } from "@/lib/councilStore";

// ---- Static list of council slugs (for sidebar navigation) ----
export const COUNCIL_GROUPS: { key: CouncilKey; label: string }[] = [
  // This should match the slugs in PAGE_MAP and sidebar
  // The labels here are fallback; display name from DB overrides.
  { key: "iqac", label: "Internal Quality Assurance Cell" },
  { key: "college-council-curriculum", label: "College Council Committee" },
  { key: "grievances-cell", label: "Student Grievances and Redressal Committee" },
  { key: "anti-ragging-cell", label: "Anti-Ragging Committee" },
  { key: "internal-grievances-vishakha", label: "Committee Against Sexual Harassment" },
  { key: "reservation-cell", label: "Human Resources Development Cell" },
  { key: "academic-council-committee-2023-2024", label: "Academic Council Committee" },
  { key: "co-curricular-extra-curricular-activity-cell", label: "Co-Curricular & Extra-Curricular Activity Cell" },
  { key: "research-innovation-entrepreneurship-cell", label: "Research Innovation and Entrepreneurship Cell" },
  { key: "student-support-career-guidance-placement-cell", label: "Student Support, Career Guidance and Placement Cell" },
  { key: "student-council", label: "Student Council" },
];

// ---- Title overrides ----
const FULL_TITLES: Partial<Record<CouncilKey, string>> = {
  iqac: "IQAC – Internal Quality Assurance Cell",
  "college-council-curriculum": "College Council",
  "grievances-cell": "Grievance Redressal Cell",
  "anti-ragging-cell": "Anti-Ragging Committee",
  "internal-grievances-vishakha": "Internal Complaint Committee",
  "reservation-cell": "Reservation Cell",
  "student-council": "Student Council",
};

// ---- Council Table Component ----
function CouncilTable({ groupKey, title }: { groupKey: CouncilKey; title?: string }) {
  const { members, loading, error, group } = useCouncilData(groupKey);

  // Determine display title: use prop, then DB group displayName, then fallback from static list
  const displayTitle =
    title ??
    group?.displayName ??
    COUNCIL_GROUPS.find((g) => g.key === groupKey)?.label ??
    groupKey;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12 bg-secondary/30 rounded-lg">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
          <p className="mt-2 text-sm text-muted-foreground">Loading members…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12 bg-red-50 dark:bg-red-950/20 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">Failed to load: {error}</p>
          <button
            onClick={() => useCouncilStore.getState().refetchCouncil(groupKey)}
            className="mt-3 px-4 py-2 bg-brand text-white rounded-lg text-sm hover:opacity-80"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="block md:hidden">
          {members.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">No members yet.</div>
          ) : (
            <div className="divide-y divide-border">
              {members.map((r, i) => (
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

        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30">
                <TableHead className="w-16 font-semibold">Sr.No</TableHead>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Designation</TableHead>
                <TableHead className="font-semibold">Position</TableHead>
                <TableHead className="font-semibold">Email ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((r, i) => (
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
              {members.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-12">
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

// ---- Council Content Mapping ----
export const COUNCIL_CONTENT: Record<string, React.FC> = Object.fromEntries(
  COUNCIL_GROUPS.map((g) => [
    g.key,
    () => <CouncilTable groupKey={g.key} title={FULL_TITLES[g.key] ?? g.label} />,
  ]),
);