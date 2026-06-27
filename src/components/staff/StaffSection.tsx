// components/staff/StaffSection.tsx
import { useState } from "react";
import { useStaff, useStaffStatus, refetchStaff, type StaffGroupKey } from "@/lib/staffStore";
import { DocSection } from "@/components/DocSection";

interface StaffSectionProps {
  title: string;
  group: StaffGroupKey;
  slug: string;
}

export function StaffSection({ title, group, slug }: StaffSectionProps) {
  const members = useStaff(group);
  const { loading, error } = useStaffStatus(group);
  const [active, setActive] = useState<number | null>(null);

  const isTeaching = group === "teaching";

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full" />
          <h2 className="text-xl font-bold text-brand">{title}</h2>
        </div>
        <div className="text-center py-12 bg-secondary/30 rounded-lg">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
          <p className="mt-2 text-sm text-muted-foreground">Loading staff…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full" />
          <h2 className="text-xl font-bold text-brand">{title}</h2>
        </div>
        <div className="text-center py-12 bg-red-50 dark:bg-red-950/20 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">Error: {error}</p>
          <button
            onClick={() => refetchStaff(group)}
            className="mt-2 px-4 py-2 bg-brand text-white rounded-lg text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full" />
        <div>
          <h2 className="text-xl font-bold text-brand">{title}</h2>
          <p className="text-xs text-muted-foreground">Staff members of Rajashri Ayurvedic Medical College</p>
        </div>
      </div>

      {members.length === 0 ? (
        <div className="text-center py-12 bg-secondary/30 rounded-lg">
          <p className="text-sm text-muted-foreground italic">No staff members listed yet.</p>
        </div>
      ) : (
        <>
          {/* Mobile Cards */}
          <div className="block md:hidden space-y-3">
            {members.map((m, i) => (
              <div
                key={m.id}
                className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setActive(i)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {m.photo ? (
                      <img
                        src={m.photo}
                        alt={m.name}
                        loading="lazy"
                        className="h-16 w-16 rounded-full object-cover border-2 border-brand"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-xl">
                        {m.name ? m.name.split(" ").map(n => n[0]).slice(0, 2).join("") : "?"}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-brand">{m.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">#{i + 1}</p>
                      </div>
                    </div>
                    <p className="text-sm mt-1">{m.designation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto border border-border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-brand w-16">S. No.</th>
                  <th className="px-4 py-3 text-left font-semibold text-brand">Name of Employee</th>
                  <th className="px-4 py-3 text-left font-semibold text-brand">Designation</th>
                  {isTeaching ? (
                    <>
                      <th className="px-4 py-3 text-left font-semibold text-brand">Qualification</th>
                      <th className="px-4 py-3 text-left font-semibold text-brand">Experience</th>
                    </>
                  ) : (
                    <>
                      <th className="px-4 py-3 text-left font-semibold text-brand">Father's Name</th>
                      <th className="px-4 py-3 text-left font-semibold text-brand">Department</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {members.map((m, i) => (
                  <tr
                    key={m.id}
                    className="border-t border-border hover:bg-secondary/40 transition-colors cursor-pointer"
                    onClick={() => setActive(i)}
                  >
                    <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                    <td className="px-4 py-3 font-semibold text-brand hover:underline">
                      {m.name}
                    </td>
                    <td className="px-4 py-3">{m.designation}</td>
                    {isTeaching ? (
                      <>
                        <td className="px-4 py-3">{m.qualification || "-"}</td>
                        <td className="px-4 py-3">{m.experience || "-"}</td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-3">{m.fatherName || "-"}</td>
                        <td className="px-4 py-3">{m.workingDepartment || "-"}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <DocSection slug={slug} />

      {/* Mobile-First Dialog Box */}
      {active !== null && members[active] && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4 overflow-y-auto"
          onClick={() => setActive(null)}
        >
          <div 
            className="w-full sm:max-w-2xl bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-xl shadow-xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-slide-up sm:animate-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Floating */}
            <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 rounded-t-2xl flex justify-between items-center p-2 border-b border-gray-100 dark:border-gray-800">
              <div className="w-12 sm:w-16"></div>
              <button
                onClick={() => setActive(null)}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-xl"
              >
                ✕
              </button>
              <div className="w-12 sm:w-16 text-right">
                <span className="text-xs text-gray-400">{active + 1}/{members.length}</span>
              </div>
            </div>

            {/* Header with Name & Designation */}
            <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {members[active].photo ? (
                    <img
                      src={members[active].photo}
                      alt={members[active].name}
                      loading="lazy"
                      className="h-12 w-12 sm:h-16 sm:w-16 rounded-full object-cover border-2 border-amber-500"
                    />
                  ) : (
                    <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg sm:text-2xl">
                      {members[active].name ? members[active].name.split(" ").map(n => n[0]).slice(0, 2).join("") : "?"}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate">
                    {members[active].name}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-600 dark:text-amber-400 font-medium truncate">
                    {members[active].designation}
                  </p>
                  {isTeaching && members[active].teacherCode && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 text-[10px] sm:text-xs rounded-full">
                      Code: {members[active].teacherCode}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Details Grid - Compact on Mobile */}
            <div className="p-3 sm:p-4">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                Employee Details
              </h4>
              {isTeaching ? (
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 sm:p-2.5 border border-gray-200 dark:border-gray-700">
                    <p className="text-[8px] sm:text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">S. No.</p>
                    <p className="text-xs sm:text-sm text-gray-900 dark:text-white font-medium">{active + 1}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 sm:p-2.5 border border-gray-200 dark:border-gray-700">
                    <p className="text-[8px] sm:text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Designation</p>
                    <p className="text-xs sm:text-sm text-gray-900 dark:text-white font-medium truncate">{members[active].designation}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 sm:p-2.5 border border-gray-200 dark:border-gray-700">
                    <p className="text-[8px] sm:text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Qualification</p>
                    <p className="text-xs sm:text-sm text-gray-900 dark:text-white font-medium truncate">{members[active].qualification || "-"}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 sm:p-2.5 border border-gray-200 dark:border-gray-700">
                    <p className="text-[8px] sm:text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">DOB</p>
                    <p className="text-xs sm:text-sm text-gray-900 dark:text-white font-medium">{members[active].dob || "-"}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 sm:p-2.5 border border-gray-200 dark:border-gray-700">
                    <p className="text-[8px] sm:text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Joining</p>
                    <p className="text-xs sm:text-sm text-gray-900 dark:text-white font-medium truncate">{members[active].dateOfJoining || "-"}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 sm:p-2.5 border border-gray-200 dark:border-gray-700">
                    <p className="text-[8px] sm:text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Experience</p>
                    <p className="text-xs sm:text-sm text-gray-900 dark:text-white font-medium">{members[active].experience || "-"}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 sm:p-2.5 border border-gray-200 dark:border-gray-700 col-span-2">
                    <p className="text-[8px] sm:text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Registration Number</p>
                    <p className="text-xs sm:text-sm text-gray-900 dark:text-white font-medium truncate">{members[active].registrationNumber || "-"}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 sm:p-2.5 border border-gray-200 dark:border-gray-700 col-span-2">
                    <p className="text-[8px] sm:text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</p>
                    <p className="text-xs sm:text-sm text-gray-900 dark:text-white font-medium truncate">
                      {members[active].mobile || members[active].email ? (
                        <>
                          {members[active].mobile && <span>{members[active].mobile}</span>}
                          {members[active].mobile && members[active].email && <span className="hidden sm:inline"> | </span>}
                          {members[active].email && <span className="block sm:inline text-xs sm:text-sm">{members[active].email}</span>}
                        </>
                      ) : "-"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 sm:p-2.5 border border-gray-200 dark:border-gray-700">
                    <p className="text-[8px] sm:text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">S. No.</p>
                    <p className="text-xs sm:text-sm text-gray-900 dark:text-white font-medium">{active + 1}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 sm:p-2.5 border border-gray-200 dark:border-gray-700">
                    <p className="text-[8px] sm:text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Designation</p>
                    <p className="text-xs sm:text-sm text-gray-900 dark:text-white font-medium truncate">{members[active].designation}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 sm:p-2.5 border border-gray-200 dark:border-gray-700">
                    <p className="text-[8px] sm:text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Father's Name</p>
                    <p className="text-xs sm:text-sm text-gray-900 dark:text-white font-medium truncate">{members[active].fatherName || "-"}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 sm:p-2.5 border border-gray-200 dark:border-gray-700">
                    <p className="text-[8px] sm:text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Qualification</p>
                    <p className="text-xs sm:text-sm text-gray-900 dark:text-white font-medium truncate">{members[active].qualification || "-"}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 sm:p-2.5 border border-gray-200 dark:border-gray-700">
                    <p className="text-[8px] sm:text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Appointment</p>
                    <p className="text-xs sm:text-sm text-gray-900 dark:text-white font-medium truncate">{members[active].dateOfAppointment || "-"}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 sm:p-2.5 border border-gray-200 dark:border-gray-700">
                    <p className="text-[8px] sm:text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nature</p>
                    <p className="text-xs sm:text-sm text-gray-900 dark:text-white font-medium capitalize truncate">
                      {members[active].natureOfAppointment || "-"}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 sm:p-2.5 border border-gray-200 dark:border-gray-700 col-span-2">
                    <p className="text-[8px] sm:text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Working Department</p>
                    <p className="text-xs sm:text-sm text-gray-900 dark:text-white font-medium truncate">{members[active].workingDepartment || "-"}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 sm:p-2.5 border border-gray-200 dark:border-gray-700 col-span-2">
                    <p className="text-[8px] sm:text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pay Scale</p>
                    <p className="text-xs sm:text-sm text-gray-900 dark:text-white font-medium truncate">{members[active].payScale || "-"}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons - Compact on Mobile */}
            <div className="flex items-center justify-between gap-2 px-3 sm:px-5 py-2.5 sm:py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 rounded-b-2xl sm:rounded-b-xl">
              <button
                onClick={() => setActive((active - 1 + members.length) % members.length)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-400 font-medium rounded-lg transition-colors text-xs flex items-center gap-1"
              >
                <span className="text-base sm:text-sm">‹</span>
                <span className="hidden xs:inline">Prev</span>
              </button>
              <div className="text-gray-500 dark:text-gray-400 text-xs font-medium">
                <span className="sm:hidden">{active + 1}/{members.length}</span>
                <span className="hidden sm:inline">Employee {active + 1} of {members.length}</span>
              </div>
              <button
                onClick={() => setActive((active + 1) % members.length)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-400 font-medium rounded-lg transition-colors text-xs flex items-center gap-1"
              >
                <span className="hidden xs:inline">Next</span>
                <span className="text-base sm:text-sm">›</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffSection;