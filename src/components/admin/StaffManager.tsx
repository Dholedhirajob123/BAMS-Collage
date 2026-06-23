// components/admin/StaffManager.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getStaff,
  setStaff,
  resetStaff,
  newId,
  STAFF_GROUPS,
  type StaffGroupKey,
  type StaffMember,
} from "@/lib/staffStore";

interface StaffManagerProps {
  setSavedMsg: (msg: string) => void;
}

export function StaffManager({ setSavedMsg }: StaffManagerProps) {
  const [group, setGroup] = useState<StaffGroupKey>("teaching");
  const [members, setMembers] = useState<StaffMember[]>(() => getStaff("teaching"));
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<StaffMember>>({});

  const reload = (g: StaffGroupKey) => {
    setGroup(g);
    setMembers(getStaff(g));
    setEditingId(null);
  };

  const commit = (next: StaffMember[]) => {
    setMembers(next);
    setStaff(group, next);
  };

  const updateRow = (id: string, patch: Partial<StaffMember>) =>
    commit(members.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  const removeRow = (id: string) => {
    if (!confirm("Remove this staff member?")) return;
    commit(members.filter((m) => m.id !== id));
    setEditingId(null);
  };

  const addRow = () => {
    const newMember = { 
      id: newId(), 
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
      // New fields for non-teaching & hospital staff
      fatherName: "",
      dateOfAppointment: "",
      natureOfAppointment: "",
      workingDepartment: "",
      payScale: "",
    };
    commit([...members, newMember]);
    setEditingId(newMember.id);
    setEditForm(newMember);
  };

  const resetAll = () => {
    if (!confirm(`Delete ALL ${members.length} staff members from this group? This cannot be undone.`)) return;
    commit([]);
    setEditingId(null);
  };

  const saveChanges = () => {
    setIsSaving(true);
    setStaff(group, members);
    setTimeout(() => {
      setIsSaving(false);
      setSavedMsg("✓ Staff members saved successfully.");
      setTimeout(() => setSavedMsg(""), 2000);
    }, 500);
  };

  const onPhoto = (id: string, file: File) => {
    if (!file.type.startsWith("image/")) return alert("Please choose an image file.");
    if (file.size > 2 * 1024 * 1024) return alert("Image must be under 2MB.");
    const reader = new FileReader();
    reader.onload = () => {
      updateRow(id, { photo: reader.result as string });
      if (editingId === id) {
        setEditForm({ ...editForm, photo: reader.result as string });
      }
    };
    reader.readAsDataURL(file);
  };

  const startEdit = (member: StaffMember) => {
    setEditingId(member.id);
    setEditForm({ ...member });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    if (editingId) {
      updateRow(editingId, editForm);
      setEditingId(null);
      setEditForm({});
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).slice(0, 2).join("");
  };

  const isTeaching = group === "teaching";
  const isNonTeaching = group === "non-teaching";
  const isHospital = group === "hospital";

  return (
    <div className="border border-border rounded-md p-5 bg-card">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-semibold text-lg mb-1">Staff Management</h2>
          <p className="text-xs text-muted-foreground">Edit staff entries. Click Save to apply changes.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={saveChanges} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
            {isSaving ? "Saving..." : "💾 Save Changes"}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <div className="flex-1 min-w-[200px]">
          <Label className="text-xs">Select Staff Group</Label>
          <select
            className="w-full mt-1 border border-border rounded-md p-2 bg-background text-sm"
            value={group}
            onChange={(e) => reload(e.target.value as StaffGroupKey)}
          >
            {STAFF_GROUPS.map((item) => (
              <option key={item.key} value={item.key}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          {members.length > 0 && (
            <Button size="sm" variant="destructive" onClick={resetAll}>
              Delete All Staff
            </Button>
          )}
          <Button size="sm" onClick={addRow}>+ Add Staff Member</Button>
        </div>
      </div>

      {/* Staff Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((m) => (
          <div
            key={m.id}
            className="border border-border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-all"
          >
            {/* Card Header with Photo */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-4 flex items-center gap-4">
              <div className="flex-shrink-0">
                {m.photo ? (
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="h-16 w-16 rounded-lg object-cover border-2 border-brand"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xl">
                    {getInitials(m.name)}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-brand truncate">{m.name || "New Staff"}</h3>
                <p className="text-sm text-muted-foreground truncate">{m.designation || "No designation"}</p>
                {isTeaching && m.teacherCode && (
                  <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-full">
                    {m.teacherCode}
                  </span>
                )}
              </div>
              <button
                onClick={() => startEdit(m)}
                className="px-3 py-1.5 text-xs bg-brand text-white rounded-md hover:bg-brand/80 transition-colors"
              >
                ✏️ Edit
              </button>
            </div>

            {/* Card Body - Quick Info */}
            <div className="p-4 space-y-2">
              {isTeaching ? (
                <>
                  <div className="grid grid-cols-2 gap-2 text-xs">
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
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-border">
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
                  <div className="grid grid-cols-2 gap-2 text-xs">
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
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-border">
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

      {members.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">👔 No staff members</p>
          <p className="text-sm">Click "Add Staff Member" to get started</p>
        </div>
      )}

      {/* Edit Modal */}
      {editingId && editForm && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => cancelEdit()}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 p-4 border-b border-border flex justify-between items-center rounded-t-2xl">
              <h3 className="text-xl font-bold text-brand">
                {editForm.name ? `Edit ${editForm.name}` : "Add Staff Member"}
              </h3>
              <button
                onClick={() => cancelEdit()}
                className="w-8 h-8 rounded-full bg-secondary hover:bg-secondary/70 flex items-center justify-center text-xl transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Photo Upload */}
              <div className="flex items-center gap-6 mb-6">
                <div>
                  {editForm.photo ? (
                    <img
                      src={editForm.photo}
                      alt="Profile"
                      className="h-24 w-24 rounded-lg object-cover border-2 border-brand"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-3xl">
                      {editForm.name ? getInitials(editForm.name) : "?"}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">Profile Photo</p>
                  <p className="text-xs text-muted-foreground mb-2">Upload a photo (max 2MB)</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="text-xs"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f && editingId) onPhoto(editingId, f);
                      e.target.value = "";
                    }}
                  />
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        value={editForm.dob || ""}
                        onChange={(e) => setEditForm({ ...editForm, dob: e.target.value })}
                        className="mt-1 text-sm"
                        placeholder="DD/MM/YYYY"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Date of Joining</Label>
                      <Input
                        value={editForm.dateOfJoining || ""}
                        onChange={(e) => setEditForm({ ...editForm, dateOfJoining: e.target.value })}
                        className="mt-1 text-sm"
                        placeholder="DD/MM/YYYY"
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
                    <div className="col-span-2">
                      <Label className="text-xs">Qualification</Label>
                      <Input
                        value={editForm.qualification || editForm.education || ""}
                        onChange={(e) => setEditForm({ 
                          ...editForm, 
                          qualification: e.target.value,
                          education: e.target.value 
                        })}
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
                        onChange={(e) => setEditForm({ ...editForm, mobile: e.target.value })}
                        className="mt-1 text-sm"
                        placeholder="Mobile number"
                      />
                    </div>
                    <div className="col-span-2">
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
                    <div className="col-span-2">
                      <Label className="text-xs">Father's Name</Label>
                      <Input
                        value={editForm.fatherName || ""}
                        onChange={(e) => setEditForm({ ...editForm, fatherName: e.target.value })}
                        className="mt-1 text-sm"
                        placeholder="Father's full name"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label className="text-xs">Qualification</Label>
                      <Input
                        value={editForm.qualification || editForm.education || ""}
                        onChange={(e) => setEditForm({ 
                          ...editForm, 
                          qualification: e.target.value,
                          education: e.target.value 
                        })}
                        className="mt-1 text-sm"
                        placeholder="e.g. M.A., B.Sc."
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Date of Appointment</Label>
                      <Input
                        value={editForm.dateOfAppointment || ""}
                        onChange={(e) => setEditForm({ ...editForm, dateOfAppointment: e.target.value })}
                        className="mt-1 text-sm"
                        placeholder="DD/MM/YYYY"
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
                    <div className="col-span-2">
                      <Label className="text-xs">Working Department</Label>
                      <Input
                        value={editForm.workingDepartment || ""}
                        onChange={(e) => setEditForm({ ...editForm, workingDepartment: e.target.value })}
                        className="mt-1 text-sm"
                        placeholder="e.g. Administration, Accounts"
                      />
                    </div>
                    <div className="col-span-2">
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

              {/* Modal Actions */}
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
                <Button variant="outline" onClick={() => cancelEdit()}>
                  Cancel
                </Button>
                {editingId && (
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (editingId) removeRow(editingId);
                    }}
                  >
                    Delete
                  </Button>
                )}
                <Button
                  className="bg-brand hover:bg-brand/80"
                  onClick={() => saveEdit()}
                  disabled={!editForm.name || !editForm.designation}
                >
                  💾 Save
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