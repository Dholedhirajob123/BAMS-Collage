// components/admin/StaffManager.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { STAFF_GROUPS, type StaffGroupKey, type StaffMember } from "@/lib/staffStore";
import { API_BASE_URL } from '@/lib/config';

interface StaffManagerProps {
  setSavedMsg: (msg: string) => void;
}

const API_BASE = `${API_BASE_URL}/api/staff`;

// Helper to convert raw Base64 to a displayable data URL
const getImageSrc = (src: string): string => {
  if (!src) return '';
  if (src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  if (src.startsWith('/9j/')) return `data:image/jpeg;base64,${src}`;
  if (src.startsWith('iVBORw0KGgo')) return `data:image/png;base64,${src}`;
  if (src.startsWith('R0lGODdh')) return `data:image/gif;base64,${src}`;
  if (src.startsWith('UklGR')) return `data:image/webp;base64,${src}`;
  return `data:image/jpeg;base64,${src}`;
};

export function StaffManager({ setSavedMsg }: StaffManagerProps) {
  const [group, setGroup] = useState<StaffGroupKey>("teaching");
  const [members, setMembers] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<StaffMember>>({});

  const fetchMembers = async (groupKey: StaffGroupKey) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}?groupKey=${groupKey}`);
      if (!res.ok) throw new Error("Failed to fetch staff");
      const data = await res.json();
      setMembers(data);
    } catch (error) {
      console.error(error);
      setSavedMsg("❌ Failed to load staff members.");
      setTimeout(() => setSavedMsg(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers(group);
  }, [group]);

  const createMember = async (member: StaffMember) => {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(member),
    });
    if (!res.ok) throw new Error("Failed to create staff member");
    return res.json();
  };

  const updateMember = async (id: number | string, member: StaffMember) => {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(member),
    });
    if (!res.ok) throw new Error("Failed to update staff member");
    return res.json();
  };

  const deleteMember = async (id: number | string) => {
    const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete staff member");
  };

  const addRow = () => {
    const emptyMember: Partial<StaffMember> = {
      name: "",
      designation: "",
      education: "",
      year: "",
      photo: "",
      mobile: "",
      email: "",
      teacherCode: "",
      dob: "",
      registrationNumber: "",
      qualification: "",
      dateOfJoining: "",
      experience: "",
      fatherName: "",
      dateOfAppointment: "",
      natureOfAppointment: "",
      workingDepartment: "",
      payScale: "",
    };
    setEditingId("new");
    setEditForm(emptyMember);
  };

  const startEdit = (member: StaffMember) => {
    setEditingId(String(member.id));
    setEditForm({ ...member });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async () => {
    if (!editForm.name || !editForm.designation) {
      setSavedMsg("⚠️ Name and designation are required.");
      setTimeout(() => setSavedMsg(""), 2000);
      return;
    }

    if (editForm.mobile && !/^\d+$/.test(editForm.mobile)) {
      setSavedMsg("⚠️ Mobile number must contain only digits.");
      setTimeout(() => setSavedMsg(""), 2000);
      return;
    }

    try {
      const payload = { ...editForm, groupKey: group } as StaffMember;

      if (editingId === "new") {
        await createMember(payload);
        setSavedMsg("✅ Staff member created successfully.");
      } else {
        const id = Number(editingId);
        await updateMember(id, payload);
        setSavedMsg("✅ Staff member updated successfully.");
      }

      await fetchMembers(group);
      cancelEdit();
      setTimeout(() => setSavedMsg(""), 2000);
    } catch (error) {
      console.error(error);
      setSavedMsg("❌ Failed to save staff member.");
      setTimeout(() => setSavedMsg(""), 3000);
    }
  };

  const removeRow = async (id: number) => {
    if (!confirm("Remove this staff member?")) return;
    try {
      await deleteMember(id);
      setSavedMsg("🗑️ Staff member removed.");
      await fetchMembers(group);
      cancelEdit();
      setTimeout(() => setSavedMsg(""), 2000);
    } catch (error) {
      console.error(error);
      setSavedMsg("❌ Failed to delete staff member.");
      setTimeout(() => setSavedMsg(""), 3000);
    }
  };

  const resetAll = async () => {
    if (!confirm(`Delete ALL ${members.length} staff members from this group? This cannot be undone.`)) return;
    try {
      for (const m of members) {
        await deleteMember(m.id);
      }
      setSavedMsg("🗑️ All staff members removed.");
      await fetchMembers(group);
      setTimeout(() => setSavedMsg(""), 2000);
    } catch (error) {
      console.error(error);
      setSavedMsg("❌ Failed to delete all staff members.");
      setTimeout(() => setSavedMsg(""), 3000);
    }
  };

  const onPhoto = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setEditForm({ ...editForm, photo: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const getInitials = (name: string) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("");
  };

  const formatDateForInput = (date?: string): string => {
    if (!date) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
    const parts = date.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return date;
  };

  const isTeaching = group === "teaching";
  const isNonTeaching = group === "non-teaching";
  const isHospital = group === "hospital";

  return (
    <div className="border border-border rounded-md p-3 sm:p-5 bg-card">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4">
        <div>
          <h2 className="font-semibold text-base sm:text-lg mb-0.5 sm:mb-1">Staff Management</h2>
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            {isLoading ? "Loading..." : `${members.length} staff members in this group`}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => fetchMembers(group)}
          disabled={isLoading}
          className="text-xs w-full sm:w-auto"
        >
          🔄 Refresh
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-4">
        <div className="flex-1 min-w-[200px]">
          <Label className="text-xs">Select Staff Group</Label>
          <select
            className="w-full mt-1 border border-border rounded-md p-2 bg-background text-sm"
            value={group}
            onChange={(e) => setGroup(e.target.value as StaffGroupKey)}
          >
            {STAFF_GROUPS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {members.length > 0 && (
            <Button size="sm" variant="destructive" onClick={resetAll} disabled={isLoading} className="flex-1 sm:flex-none text-xs">
              Delete All Staff
            </Button>
          )}
          <Button size="sm" onClick={addRow} disabled={isLoading} className="flex-1 sm:flex-none text-xs bg-brand hover:bg-brand-dark">
            + Add Staff Member
          </Button>
        </div>
      </div>

      {/* Staff Cards Grid */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="text-muted-foreground">⏳ Loading staff...</div>
        </div>
      )}

      {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {members.map((m) => (
            <div
              key={m.id}
              className="border border-border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-all"
            >
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  {m.photo ? (
                    <img
                      src={getImageSrc(m.photo)}
                      alt={m.name}
                      className="h-14 w-14 sm:h-16 sm:w-16 rounded-lg object-cover border-2 border-brand"
                    />
                  ) : (
                    <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                      {getInitials(m.name)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-brand text-sm sm:text-base truncate">{m.name || "No name"}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">{m.designation || "No designation"}</p>
                  {isTeaching && m.teacherCode && (
                    <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-full inline-block mt-0.5">
                      {m.teacherCode}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => startEdit(m)}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs bg-brand text-white rounded-md hover:bg-brand/80 transition-colors flex-shrink-0"
                >
                  ✏️ Edit
                </button>
              </div>

              <div className="p-3 sm:p-4 space-y-2">
                {isTeaching ? (
                  <>
                    <div className="grid grid-cols-2 gap-2 text-[10px] sm:text-xs">
                      <div>
                        <p className="text-muted-foreground">Qualification</p>
                        <p className="font-medium truncate">{m.qualification || "—"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Experience</p>
                        <p className="font-medium truncate">{m.experience || "—"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Date of Birth</p>
                        <p className="font-medium truncate">{m.dob || "—"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Date of Joining</p>
                        <p className="font-medium truncate">{m.dateOfJoining || "—"}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] sm:text-xs pt-2 border-t border-border">
                      <div>
                        <p className="text-muted-foreground">Registration No.</p>
                        <p className="font-medium">{m.registrationNumber || "—"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Mobile</p>
                        <p className="font-medium">{m.mobile || "—"}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-2 text-[10px] sm:text-xs">
                      <div>
                        <p className="text-muted-foreground">Father's Name</p>
                        <p className="font-medium truncate">{m.fatherName || "—"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Qualification</p>
                        <p className="font-medium truncate">{m.qualification || m.education || "—"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Date of Appointment</p>
                        <p className="font-medium truncate">{m.dateOfAppointment || "—"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Nature of Appointment</p>
                        <p className="font-medium truncate">{m.natureOfAppointment || "—"}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] sm:text-xs pt-2 border-t border-border">
                      <div>
                        <p className="text-muted-foreground">Department</p>
                        <p className="font-medium">{m.workingDepartment || "—"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Pay Scale</p>
                        <p className="font-medium">{m.payScale || "—"}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && members.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-base sm:text-lg">👔 No staff members</p>
          <p className="text-xs sm:text-sm">Click "Add Staff Member" to get started</p>
        </div>
      )}

      {/* Edit / Add Modal - Mobile Responsive */}
      {editingId && editForm && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-2 sm:p-4 animate-fade-in"
          onClick={() => cancelEdit()}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 p-3 sm:p-4 border-b border-border flex justify-between items-center rounded-t-2xl">
              <h3 className="text-base sm:text-xl font-bold text-brand">
                {editingId === "new" ? "Add Staff Member" : `Edit ${editForm.name || "Staff"}`}
              </h3>
              <button
                onClick={() => cancelEdit()}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-secondary hover:bg-secondary/70 flex items-center justify-center text-lg sm:text-xl transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-3 sm:p-6">
              {/* Photo Upload */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6">
                <div>
                  {editForm.photo ? (
                    <img
                      src={getImageSrc(editForm.photo)}
                      alt="Profile"
                      className="h-20 w-20 sm:h-24 sm:w-24 rounded-lg object-cover border-2 border-brand"
                    />
                  ) : (
                    <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-2xl sm:text-3xl">
                      {editForm.name ? getInitials(editForm.name) : "?"}
                    </div>
                  )}
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-sm font-medium">Profile Photo</p>
                  <p className="text-xs text-muted-foreground mb-2">Upload a photo (max 2MB)</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="text-xs w-full sm:w-auto"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) onPhoto(f);
                      e.target.value = "";
                    }}
                  />
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Common Fields */}
                <div>
                  <Label className="text-xs">Full Name *</Label>
                  <Input
                    value={editForm.name || ""}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="mt-1 text-sm"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label className="text-xs">Designation *</Label>
                  <Input
                    value={editForm.designation || ""}
                    onChange={(e) => setEditForm({ ...editForm, designation: e.target.value })}
                    className="mt-1 text-sm"
                    placeholder="e.g. Professor (Samhita)"
                  />
                </div>

                {isTeaching && (
                  <>
                    <div>
                      <Label className="text-xs">Date of Birth</Label>
                      <Input
                        type="date"
                        value={formatDateForInput(editForm.dob)}
                        onChange={(e) => setEditForm({ ...editForm, dob: e.target.value })}
                        className="mt-1 text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Date of Joining</Label>
                      <Input
                        type="date"
                        value={formatDateForInput(editForm.dateOfJoining)}
                        onChange={(e) => setEditForm({ ...editForm, dateOfJoining: e.target.value })}
                        className="mt-1 text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Teacher Code</Label>
                      <Input
                        value={editForm.teacherCode || ""}
                        onChange={(e) => setEditForm({ ...editForm, teacherCode: e.target.value })}
                        className="mt-1 text-sm"
                        placeholder="e.g. TCH001"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Registration Number</Label>
                      <Input
                        value={editForm.registrationNumber || ""}
                        onChange={(e) => setEditForm({ ...editForm, registrationNumber: e.target.value })}
                        className="mt-1 text-sm"
                        placeholder="Registration No."
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label className="text-xs">Qualification</Label>
                      <Input
                        value={editForm.qualification || editForm.education || ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            qualification: e.target.value,
                            education: e.target.value,
                          })
                        }
                        className="mt-1 text-sm"
                        placeholder="e.g. M.D. (Samhita), PhD"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Experience</Label>
                      <Input
                        value={editForm.experience || ""}
                        onChange={(e) => setEditForm({ ...editForm, experience: e.target.value })}
                        className="mt-1 text-sm"
                        placeholder="e.g. 10 years"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Mobile Number</Label>
                      <Input
                        value={editForm.mobile || ""}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          setEditForm({ ...editForm, mobile: val });
                        }}
                        className="mt-1 text-sm"
                        placeholder="Mobile number (digits only)"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label className="text-xs">Email ID</Label>
                      <Input
                        value={editForm.email || ""}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="mt-1 text-sm"
                        placeholder="email@example.com"
                      />
                    </div>
                  </>
                )}

                {(isNonTeaching || isHospital) && (
                  <>
                    <div className="sm:col-span-2">
                      <Label className="text-xs">Father's Name</Label>
                      <Input
                        value={editForm.fatherName || ""}
                        onChange={(e) => setEditForm({ ...editForm, fatherName: e.target.value })}
                        className="mt-1 text-sm"
                        placeholder="Father's full name"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label className="text-xs">Qualification</Label>
                      <Input
                        value={editForm.qualification || editForm.education || ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            qualification: e.target.value,
                            education: e.target.value,
                          })
                        }
                        className="mt-1 text-sm"
                        placeholder="e.g. M.A., B.Sc."
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Date of Appointment</Label>
                      <Input
                        type="date"
                        value={formatDateForInput(editForm.dateOfAppointment)}
                        onChange={(e) => setEditForm({ ...editForm, dateOfAppointment: e.target.value })}
                        className="mt-1 text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Nature of Appointment</Label>
                      <Input
                        value={editForm.natureOfAppointment || ""}
                        onChange={(e) => setEditForm({ ...editForm, natureOfAppointment: e.target.value })}
                        className="mt-1 text-sm"
                        placeholder="e.g. Permanent, Contract, Ad-hoc"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label className="text-xs">Working Department</Label>
                      <Input
                        value={editForm.workingDepartment || ""}
                        onChange={(e) => setEditForm({ ...editForm, workingDepartment: e.target.value })}
                        className="mt-1 text-sm"
                        placeholder="e.g. Administration, Accounts"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label className="text-xs">Pay Scale</Label>
                      <Input
                        value={editForm.payScale || ""}
                        onChange={(e) => setEditForm({ ...editForm, payScale: e.target.value })}
                        className="mt-1 text-sm"
                        placeholder="e.g. Level 7 ₹44,900-1,42,400"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-6 pt-4 border-t border-border">
                <Button variant="outline" onClick={() => cancelEdit()} className="w-full sm:w-auto order-2 sm:order-1">
                  Cancel
                </Button>
                {editingId !== "new" && (
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (editingId) removeRow(Number(editingId));
                    }}
                    className="w-full sm:w-auto order-1 sm:order-2"
                  >
                    Delete
                  </Button>
                )}
                <Button className="bg-brand hover:bg-brand/80 w-full sm:w-auto order-3" onClick={saveEdit}>
                  💾 {editingId === "new" ? "Create" : "Save"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffManager;