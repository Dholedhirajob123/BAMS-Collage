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
        <div className="text-center py-12 bg-white rounded-2xl border-2 border-red-300">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent" />
          <p className="mt-2 text-sm text-black font-bold">Loading staff…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="text-center py-12 bg-red-50 rounded-2xl border-2 border-red-400">
          <p className="text-sm text-red-600 font-bold">Error: {error}</p>
          <button
            onClick={() => refetchStaff(group)}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-full text-sm font-bold hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {members.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border-2 border-red-300">
          <p className="text-sm text-black font-bold italic">No staff members listed yet.</p>
        </div>
      ) : (
        <>
          {/* Mobile Table - Same as Desktop but with horizontal scroll */}
          <div className="block md:hidden overflow-x-auto border-2 border-red-300 rounded-2xl">
            <table className="w-full text-sm min-w-[600px]">
              <thead className="bg-red-600">
                <tr>
                  <th className="px-3 py-2 text-left font-bold text-white whitespace-nowrap">S. No.</th>
                  <th className="px-3 py-2 text-left font-bold text-white whitespace-nowrap">Name of Employee</th>
                  <th className="px-3 py-2 text-left font-bold text-white whitespace-nowrap">Designation</th>
                  {isTeaching ? (
                    <>
                      <th className="px-3 py-2 text-left font-bold text-white whitespace-nowrap">Qualification</th>
                      <th className="px-3 py-2 text-left font-bold text-white whitespace-nowrap">Department</th>
                      <th className="px-3 py-2 text-left font-bold text-white whitespace-nowrap">Experience</th>
                    </>
                  ) : (
                    <>
                      <th className="px-3 py-2 text-left font-bold text-white whitespace-nowrap">Father's Name</th>
                      <th className="px-3 py-2 text-left font-bold text-white whitespace-nowrap">Department</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {members.map((m, i) => (
                  <tr
                    key={m.id}
                    className="border-t border-red-200 cursor-pointer hover:bg-red-50 transition-colors"
                    onClick={() => setActive(i)}
                  >
                    <td className="px-3 py-2 text-black font-bold whitespace-nowrap">{i + 1}</td>
                    <td className="px-3 py-2 font-bold text-black whitespace-nowrap">{m.name}</td>
                    <td className="px-3 py-2 text-black font-bold whitespace-nowrap">{m.designation}</td>
                    {isTeaching ? (
                      <>
                        <td className="px-3 py-2 text-black font-bold whitespace-nowrap">{m.qualification || "-"}</td>
                        <td className="px-3 py-2 text-black font-bold whitespace-nowrap">
                          {m.department || m.workingDepartment || "-"}
                        </td>
                        <td className="px-3 py-2 text-black font-bold whitespace-nowrap">{m.experience || "-"}</td>
                      </>
                    ) : (
                      <>
                        <td className="px-3 py-2 text-black font-bold whitespace-nowrap">{m.fatherName || "-"}</td>
                        <td className="px-3 py-2 text-black font-bold whitespace-nowrap">
                          {m.workingDepartment || m.department || "-"}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Desktop Table - Same as before */}
          <div className="hidden md:block overflow-x-auto border-2 border-red-300 rounded-2xl">
            <table className="w-full text-sm">
              <thead className="bg-red-600">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-white w-16">S. No.</th>
                  <th className="px-4 py-3 text-left font-bold text-white">Name of Employee</th>
                  <th className="px-4 py-3 text-left font-bold text-white">Designation</th>
                  {isTeaching ? (
                    <>
                      <th className="px-4 py-3 text-left font-bold text-white">Qualification</th>
                      <th className="px-4 py-3 text-left font-bold text-white">Department</th>
                      <th className="px-4 py-3 text-left font-bold text-white">Experience</th>
                    </>
                  ) : (
                    <>
                      <th className="px-4 py-3 text-left font-bold text-white">Father's Name</th>
                      <th className="px-4 py-3 text-left font-bold text-white">Department</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {members.map((m, i) => (
                  <tr
                    key={m.id}
                    className="border-t border-red-200 cursor-pointer hover:bg-red-50 transition-colors"
                    onClick={() => setActive(i)}
                  >
                    <td className="px-4 py-3 text-black font-bold">{i + 1}</td>
                    <td className="px-4 py-3 font-bold text-black">{m.name}</td>
                    <td className="px-4 py-3 text-black font-bold">{m.designation}</td>
                    {isTeaching ? (
                      <>
                        <td className="px-4 py-3 text-black font-bold">{m.qualification || "-"}</td>
                        <td className="px-4 py-3 text-black font-bold">
                          {m.department || m.workingDepartment || "-"}
                        </td>
                        <td className="px-4 py-3 text-black font-bold">{m.experience || "-"}</td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-3 text-black font-bold">{m.fatherName || "-"}</td>
                        <td className="px-4 py-3 text-black font-bold">
                          {m.workingDepartment || m.department || "-"}
                        </td>
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

      {/* Big Dialog Box with Department */}
      {active !== null && members[active] && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActive(null)}
        >
          <div 
            className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto border-2 border-red-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Big Image with Name */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-t-2xl">
              <div className="flex items-center gap-6">
                {/* Big Image */}
                <div className="flex-shrink-0">
                  {members[active].photo ? (
                    <img
                      src={members[active].photo}
                      alt={members[active].name}
                      loading="lazy"
                      className="h-24 w-24 sm:h-32 sm:w-32 rounded-xl object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-xl bg-white flex items-center justify-center text-red-600 font-bold text-4xl shadow-lg">
                      {members[active].name ? members[active].name.split(" ").map(n => n[0]).slice(0, 2).join("") : "?"}
                    </div>
                  )}
                </div>
                
                {/* Name and Designation */}
                <div className="flex-1 text-white">
                  <h2 className="text-2xl sm:text-3xl font-bold">{members[active].name}</h2>
                  <p className="text-lg sm:text-xl text-white/90 font-bold">{members[active].designation}</p>
                  {/* Department Badge */}
                  {(members[active].department || members[active].workingDepartment) && (
                    <span className="inline-block mt-2 px-3 py-1 bg-white/20 text-white text-xs sm:text-sm rounded-full font-bold">
                      🏛️ {members[active].department || members[active].workingDepartment}
                    </span>
                  )}
                  {isTeaching && members[active].teacherCode && (
                    <span className="inline-block mt-2 ml-2 px-3 py-1 bg-white/20 text-white text-xs sm:text-sm rounded-full font-bold">
                      Teacher Code: {members[active].teacherCode}
                    </span>
                  )}
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setActive(null)}
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center text-white text-2xl font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Employee Details - Grid */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                <span className="text-red-600">📋</span> Employee Details
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {isTeaching ? (
                  <>
                    <div className="bg-gray-50 rounded-xl p-3 border-2 border-red-200">
                      <p className="text-[10px] font-bold text-black uppercase tracking-wider">S. No.</p>
                      <p className="text-base text-black font-bold">{active + 1}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 border-2 border-red-200">
                      <p className="text-[10px] font-bold text-black uppercase tracking-wider">Designation</p>
                      <p className="text-base text-black font-bold truncate">{members[active].designation}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 border-2 border-red-200">
                      <p className="text-[10px] font-bold text-black uppercase tracking-wider">Department</p>
                      <p className="text-base text-black font-bold truncate">
                        {members[active].department || members[active].workingDepartment || "-"}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 border-2 border-red-200">
                      <p className="text-[10px] font-bold text-black uppercase tracking-wider">Qualification</p>
                      <p className="text-base text-black font-bold truncate">{members[active].qualification || "-"}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 border-2 border-red-200">
                      <p className="text-[10px] font-bold text-black uppercase tracking-wider">Date of Birth</p>
                      <p className="text-base text-black font-bold">{members[active].dob || "-"}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 border-2 border-red-200">
                      <p className="text-[10px] font-bold text-black uppercase tracking-wider">Date of Joining</p>
                      <p className="text-base text-black font-bold truncate">{members[active].dateOfJoining || "-"}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 border-2 border-red-200">
                      <p className="text-[10px] font-bold text-black uppercase tracking-wider">Experience</p>
                      <p className="text-base text-black font-bold">{members[active].experience || "-"}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 border-2 border-red-200 col-span-1 sm:col-span-2 lg:col-span-3">
                      <p className="text-[10px] font-bold text-black uppercase tracking-wider">Registration Number</p>
                      <p className="text-base text-black font-bold truncate">{members[active].registrationNumber || "-"}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 border-2 border-red-200 col-span-1 sm:col-span-2 lg:col-span-3">
                      <p className="text-[10px] font-bold text-black uppercase tracking-wider">Contact Information</p>
                      <p className="text-base text-black font-bold">
                        {members[active].mobile || members[active].email ? (
                          <>
                            {members[active].mobile && <span>📱 {members[active].mobile}</span>}
                            {members[active].mobile && members[active].email && <span className="mx-2">|</span>}
                            {members[active].email && <span>✉️ {members[active].email}</span>}
                          </>
                        ) : "-"}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-gray-50 rounded-xl p-3 border-2 border-red-200">
                      <p className="text-[10px] font-bold text-black uppercase tracking-wider">S. No.</p>
                      <p className="text-base text-black font-bold">{active + 1}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 border-2 border-red-200">
                      <p className="text-[10px] font-bold text-black uppercase tracking-wider">Designation</p>
                      <p className="text-base text-black font-bold truncate">{members[active].designation}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 border-2 border-red-200">
                      <p className="text-[10px] font-bold text-black uppercase tracking-wider">Department</p>
                      <p className="text-base text-black font-bold truncate">
                        {members[active].workingDepartment || members[active].department || "-"}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 border-2 border-red-200">
                      <p className="text-[10px] font-bold text-black uppercase tracking-wider">Father's Name</p>
                      <p className="text-base text-black font-bold truncate">{members[active].fatherName || "-"}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 border-2 border-red-200">
                      <p className="text-[10px] font-bold text-black uppercase tracking-wider">Qualification</p>
                      <p className="text-base text-black font-bold truncate">{members[active].qualification || "-"}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 border-2 border-red-200">
                      <p className="text-[10px] font-bold text-black uppercase tracking-wider">Date of Appointment</p>
                      <p className="text-base text-black font-bold truncate">{members[active].dateOfAppointment || "-"}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 border-2 border-red-200">
                      <p className="text-[10px] font-bold text-black uppercase tracking-wider">Nature of Appointment</p>
                      <p className="text-base text-black font-bold capitalize truncate">
                        {members[active].natureOfAppointment || "-"}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 border-2 border-red-200 col-span-1 sm:col-span-2 lg:col-span-3">
                      <p className="text-[10px] font-bold text-black uppercase tracking-wider">Pay Scale</p>
                      <p className="text-base text-black font-bold truncate">{members[active].payScale || "-"}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-2 px-6 py-4 border-t-2 border-red-200 bg-red-50 rounded-b-2xl">
              <button
                onClick={() => setActive((active - 1 + members.length) % members.length)}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-colors flex items-center gap-2"
              >
                <span className="text-xl">‹</span>
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </button>
              
              <div className="text-center">
                <p className="text-black font-bold text-sm">
                  <span className="hidden sm:inline">Employee </span>
                  {active + 1} <span className="text-red-600">of</span> {members.length}
                </p>
                <p className="text-xs text-black/60 font-bold hidden sm:block">
                  {members[active].name}
                </p>
              </div>

              <button
                onClick={() => setActive((active + 1) % members.length)}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-colors flex items-center gap-2"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
                <span className="text-xl">›</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffSection;