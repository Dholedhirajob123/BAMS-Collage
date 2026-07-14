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

  const displayTitle =
    title ??
    group?.displayName ??
    COUNCIL_GROUPS.find((g) => g.key === groupKey)?.label ??
    groupKey;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12 bg-white rounded-xl border-2 border-red-300">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent" />
          <p className="mt-2 text-sm text-black font-bold">Loading members…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12 bg-red-50 rounded-xl border-2 border-red-400">
          <p className="text-sm text-red-600 font-bold">Failed to load: {error}</p>
          <button
            onClick={() => useCouncilStore.getState().refetchCouncil(groupKey)}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors"
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
      <div className="rounded-xl border-2 border-red-300 bg-white overflow-hidden shadow-lg">
        <div className="block md:hidden">
          {members.length === 0 ? (
            <div className="text-center text-black font-bold py-12">No members yet.</div>
          ) : (
            <div className="divide-y divide-red-200">
              {members.map((r, i) => (
                <div key={r.id} className="p-4 space-y-2 hover:bg-orange-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs text-red-600 font-bold">#{i + 1}</span>
                      <h3 className="font-bold text-black text-lg mt-1">{r.name}</h3>
                    </div>
                    {r.position && (
                      <span className=" text-black text-xs font-bold">
                        {r.position}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-xs text-black font-bold">Designation</p>
                      <p className="font-bold text-black">{r.designation || "—"}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-black font-bold">Email</p>
                      {r.email ? (
                        <a href={`mailto:${r.email}`} className="text-red-600 hover:text-orange-600 font-bold break-all">
                          {r.email}
                        </a>
                      ) : (
                        <span className="text-black">—</span>
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
              <TableRow className="bg-red-600">
                <TableHead className="w-16 font-bold text-white">Sr.No</TableHead>
                <TableHead className="font-bold text-white">Name</TableHead>
                <TableHead className="font-bold text-white">Designation</TableHead>
                <TableHead className="font-bold text-white">Position</TableHead>
                <TableHead className="font-bold text-white">Email ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((r, i) => (
                <TableRow 
                  key={r.id} 
                  className="border-t border-red-200 hover:bg-orange-50 transition-colors"
                >
                  <TableCell className="font-bold text-black">{i + 1}</TableCell>
                  <TableCell className="font-bold text-red-600">{r.name}</TableCell>
                  <TableCell className="font-bold text-black">{r.designation}</TableCell>
                  <TableCell>
                    {r.position ? (
                      <span className=" text-black text-xs font-bold  ">
                        {r.position}
                      </span>
                    ) : (
                      <span className="text-black">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {r.email ? (
                      <a href={`mailto:${r.email}`} className="text-red-600 hover:text-orange-600 font-bold break-all transition-colors">
                        {r.email}
                      </a>
                    ) : (
                      <span className="text-black">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {members.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-black font-bold py-12">
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