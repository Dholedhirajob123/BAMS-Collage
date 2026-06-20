// components/staff/TeachingStaff.tsx
import { useState } from "react";
import { useStaff, type StaffMember } from "@/lib/staffStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TeachingStaffProps {
  slug?: string;
}

export function TeachingStaff({ slug = "faculty-teaching-staff" }: TeachingStaffProps) {
  const members = useStaff("teaching");
  const [active, setActive] = useState<number | null>(null);

  const getInitials = (name: string) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).slice(0, 2).join("");
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
        <div>
          <h2 className="text-xl font-bold text-brand">Teaching Staff</h2>
          <p className="text-xs text-muted-foreground">Faculty members of Rajashri Ayurvedic Medical College</p>
        </div>
      </div>


      {/* Table Section */}
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
                <TableHead className="w-12 font-semibold text-center">Sr.No</TableHead>
                <TableHead className="font-semibold">Photo</TableHead>
                <TableHead className="font-semibold min-w-[150px]">Name</TableHead>
                <TableHead className="font-semibold min-w-[120px]">Designation</TableHead>
                <TableHead className="font-semibold">Date of Joining</TableHead>
                <TableHead className="font-semibold">Teacher Code</TableHead>
                <TableHead className="font-semibold">Registration No.</TableHead>
                <TableHead className="font-semibold min-w-[150px]">Qualification</TableHead>
                <TableHead className="font-semibold min-w-[150px]">Email ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((m, i) => (
                <TableRow key={m.id} className="hover:bg-secondary/50 transition-colors">
                  <TableCell className="font-medium text-center">{i + 1}</TableCell>
                  <TableCell>
                    {m.photo ? (
                      <button onClick={() => setActive(i)} className="block">
                        <img
                          src={m.photo}
                          alt={m.name}
                          className="h-10 w-10 rounded-md object-cover border-2 border-brand hover:scale-110 transition-transform"
                        />
                      </button>
                    ) : (
                      <div 
                        onClick={() => setActive(i)} 
                        className="h-10 w-10 rounded-md bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-sm font-bold text-brand cursor-pointer hover:scale-110 transition-transform"
                      >
                        {getInitials(m.name)}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-semibold text-brand">{m.name}</TableCell>
                  <TableCell>{m.designation}</TableCell>
                  <TableCell>{m.dateOfJoining || "—"}</TableCell>
                  <TableCell>
                    {m.teacherCode ? (
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 text-xs rounded-full whitespace-nowrap">
                        {m.teacherCode}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-xs">{m.registrationNumber || "—"}</TableCell>
                  <TableCell className="text-xs">{m.qualification || "—"}</TableCell>
                  <TableCell>
                    {m.email ? (
                      <a href={`mailto:${m.email}`} className="text-brand hover:underline break-all text-xs">
                        {m.email}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {members.length === 0 && (
                <TableRow>
                  <TableCell colSpan={12} className="text-center text-muted-foreground py-12">
                    No teaching staff members yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Enhanced Profile Dialog with Large Left Photo */}
      {active !== null && members[active] && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActive(null)}
        >
          <div 
            className="bg-white dark:bg-gray-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 p-4 border-b border-border flex justify-between items-center rounded-t-2xl">
              <h3 className="text-xl font-bold text-brand">Faculty Profile</h3>
              <button
                onClick={() => setActive(null)}
                className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/70 flex items-center justify-center text-xl transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Profile Content - Left Photo, Right Info */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Side - Large Photo and Basic Info */}
                <div className="space-y-6">
                  {/* Large Photo */}
                  <div className="flex justify-center">
                    {members[active].photo ? (
                      <img
                        src={members[active].photo}
                        alt={members[active].name}
                        className="w-64 h-64 rounded-2xl object-cover border-4 border-brand shadow-xl"
                      />
                    ) : (
                      <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-7xl border-4 border-brand shadow-xl">
                        {getInitials(members[active].name)}
                      </div>
                    )}
                  </div>

                  {/* Basic Information */}
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-brand">{members[active].name}</h2>
                    <p className="text-lg text-blue-600 dark:text-blue-400">{members[active].designation}</p>
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                      {members[active].qualification && (
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 text-xs rounded-full">
                          🎓 {members[active].qualification}
                        </span>
                      )}
                      {members[active].teacherCode && (
                        <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-xs rounded-full">
                          📋 {members[active].teacherCode}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quick Info Cards */}
                  <div className="grid grid-cols-2 gap-3">
                   
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl p-3 text-center border border-purple-100 dark:border-purple-800">
                      <p className="text-xs text-muted-foreground">Date of Birth</p>
                      <p className="font-semibold text-sm">{members[active].dob || "—"}</p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl p-3 text-center border border-amber-100 dark:border-amber-800">
                      <p className="text-xs text-muted-foreground">Registration No.</p>
                      <p className="font-semibold text-sm">{members[active].registrationNumber || "—"}</p>
                    </div>
                  </div>

             
                </div>

                {/* Right Side - Detailed Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold border-b border-border pb-2">Profile Details</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Full Name</p>
                        <p className="font-medium">{members[active].name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Designation</p>
                        <p className="font-medium">{members[active].designation}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Date of Birth</p>
                        <p className="font-medium">{members[active].dob || "—"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Date of Joining</p>
                        <p className="font-medium">{members[active].dateOfJoining || "—"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Qualification</p>
                        <p className="font-medium">{members[active].qualification || "—"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Teacher Code</p>
                        <p className="font-medium">{members[active].teacherCode || "—"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Registration Number</p>
                        <p className="font-medium">{members[active].registrationNumber || "—"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Experience</p>
                        <p className="font-medium">{members[active].experience || "—"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Mobile</p>
                        {members[active].mobile ? (
                          <a href={`tel:${members[active].mobile}`} className="text-brand hover:underline font-medium">
                            {members[active].mobile}
                          </a>
                        ) : (
                          <p className="font-medium">—</p>
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        {members[active].email ? (
                          <a href={`mailto:${members[active].email}`} className="text-brand hover:underline font-medium break-all">
                            {members[active].email}
                          </a>
                        ) : (
                          <p className="font-medium">—</p>
                        )}
                      </div>
                    </div>
                  </div>

                
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeachingStaff;