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

// Mobile number validation helper
const validateMobile = (mobile: string): { isValid: boolean; message: string } => {
  if (!mobile) return { isValid: true, message: "" };
  
  // Remove any non-digit characters
  const cleaned = mobile.replace(/\D/g, '');
  
  if (cleaned.length === 0) return { isValid: true, message: "" };
  if (cleaned.length !== 10) {
    return { 
      isValid: false, 
      message: `Mobile number must be exactly 10 digits (currently ${cleaned.length} digits)` 
    };
  }
  
  return { isValid: true, message: "" };
};

// Format mobile number for display (XXX-XXX-XXXX)
const formatMobileForDisplay = (mobile: string): string => {
  if (!mobile) return "";
  const cleaned = mobile.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return cleaned;
};

export function StaffManager({ setSavedMsg }: StaffManagerProps) {
  const [group, setGroup] = useState<StaffGroupKey>("teaching");
  const [members, setMembers] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<StaffMember>>({});
  const [mobileError, setMobileError] = useState<string>("");

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
    setMobileError("");
  };

  const startEdit = (member: StaffMember) => {
    setEditingId(String(member.id));
    setEditForm({ ...member });
    setMobileError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
    setMobileError("");
  };

  const handleMobileChange = (value: string) => {
    // Only allow digits
    const digitsOnly = value.replace(/\D/g, '');
    
    // Limit to 10 digits
    const limited = digitsOnly.slice(0, 10);
    
    setEditForm({ ...editForm, mobile: limited });
    
    // Validate in real-time
    const validation = validateMobile(limited);
    setMobileError(validation.isValid ? "" : validation.message);
  };

  const saveEdit = async () => {
    if (!editForm.name || !editForm.designation) {
      setSavedMsg("⚠️ Name and designation are required.");
      setTimeout(() => setSavedMsg(""), 2000);
      return;
    }

    // Validate mobile number
    if (editForm.mobile) {
      const validation = validateMobile(editForm.mobile);
      if (!validation.isValid) {
        setMobileError(validation.message);
        setSavedMsg(`⚠️ ${validation.message}`);
        setTimeout(() => setSavedMsg(""), 3000);
        return;
      }
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
    <div className="border-2 border-red-300 rounded-xl p-3 sm:p-5 bg-white shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4">
        <div>
          <h2 className="font-bold text-base sm:text-lg text-black mb-0.5 sm:mb-1">Staff Management</h2>
          <p className="text-[10px] sm:text-xs text-black font-bold">
            {isLoading ? "Loading..." : `${members.length} staff members in this group`}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => fetchMembers(group)}
          disabled={isLoading}
          className="text-xs w-full sm:w-auto border-2 border-red-300 text-black font-bold hover:bg-red-50 rounded-full"
        >
          🔄 Refresh
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-4">
        <div className="flex-1 min-w-[200px]">
          <Label className="text-xs text-black font-bold">Select Staff Group</Label>
          <select
            className="w-full mt-1 border-2 border-red-200 rounded-xl p-2 bg-white text-sm text-black font-bold focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
            <Button 
              size="sm" 
              variant="destructive" 
              onClick={resetAll} 
              disabled={isLoading} 
              className="flex-1 sm:flex-none text-xs bg-red-600 hover:bg-red-700 text-white font-bold rounded-full"
            >
              Delete All Staff
            </Button>
          )}
          <Button 
            size="sm" 
            onClick={addRow} 
            disabled={isLoading} 
            className="flex-1 sm:flex-none text-xs bg-red-600 hover:bg-red-700 text-white font-bold rounded-full"
          >
            + Add Staff Member
          </Button>
        </div>
      </div>

      {/* Staff Cards Grid */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent" />
          <p className="ml-2 text-sm text-black font-bold">Loading staff...</p>
        </div>
      )}

      {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {members.map((m) => (
            <div
              key={m.id}
              className="border-2 border-red-200 rounded-xl overflow-hidden bg-white hover:shadow-xl hover:border-red-500 transition-all"
            >
              <div className="bg-red-50 p-3 sm:p-4 flex items-center gap-3 sm:gap-4 border-b-2 border-red-200">
                <div className="flex-shrink-0">
                  {m.photo ? (
                    <img
                      src={getImageSrc(m.photo)}
                      alt={m.name}
                      className="h-14 w-14 sm:h-16 sm:w-16 rounded-lg object-cover border-2 border-red-600"
                    />
                  ) : (
                    <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                      {getInitials(m.name)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-black text-sm sm:text-base truncate">{m.name || "No name"}</h3>
                  <p className="text-xs sm:text-sm text-red-600 font-bold truncate">{m.designation || "No designation"}</p>
                  {isTeaching && m.teacherCode && (
                    <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 bg-red-100 text-red-700 font-bold rounded-full inline-block mt-0.5">
                      {m.teacherCode}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => startEdit(m)}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors flex-shrink-0"
                >
                  ✏️ Edit
                </button>
              </div>

              <div className="p-3 sm:p-4 space-y-2">
                {isTeaching ? (
                  <>
                    <div className="grid grid-cols-2 gap-2 text-[10px] sm:text-xs">
                      <div>
                        <p className="text-black font-bold">Qualification</p>
                        <p className="font-bold text-black truncate">{m.qualification || "—"}</p>
                      </div>
                      <div>
                        <p className="text-black font-bold">Experience</p>
                        <p className="font-bold text-black truncate">{m.experience || "—"}</p>
                      </div>
                      <div>
                        <p className="text-black font-bold">Date of Birth</p>
                        <p className="font-bold text-black truncate">{m.dob || "—"}</p>
                      </div>
                      <div>
                        <p className="text-black font-bold">Date of Joining</p>
                        <p className="font-bold text-black truncate">{m.dateOfJoining || "—"}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] sm:text-xs pt-2 border-t-2 border-red-200">
                      <div>
                        <p className="text-black font-bold">Registration No.</p>
                        <p className="font-bold text-black">{m.registrationNumber || "—"}</p>
                      </div>
                      <div>
                        <p className="text-black font-bold">Mobile</p>
                        <p className="font-bold text-black">
                          {m.mobile && m.mobile.length === 10 
                            ? formatMobileForDisplay(m.mobile) 
                            : m.mobile || "—"}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-2 text-[10px] sm:text-xs">
                      <div>
                        <p className="text-black font-bold">Father's Name</p>
                        <p className="font-bold text-black truncate">{m.fatherName || "—"}</p>
                      </div>
                      <div>
                        <p className="text-black font-bold">Qualification</p>
                        <p className="font-bold text-black truncate">{m.qualification || m.education || "—"}</p>
                      </div>
                      <div>
                        <p className="text-black font-bold">Date of Appointment</p>
                        <p className="font-bold text-black truncate">{m.dateOfAppointment || "—"}</p>
                      </div>
                      <div>
                        <p className="text-black font-bold">Nature of Appointment</p>
                        <p className="font-bold text-black truncate">{m.natureOfAppointment || "—"}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] sm:text-xs pt-2 border-t-2 border-red-200">
                      <div>
                        <p className="text-black font-bold">Department</p>
                        <p className="font-bold text-black">{m.workingDepartment || "—"}</p>
                      </div>
                      <div>
                        <p className="text-black font-bold">Pay Scale</p>
                        <p className="font-bold text-black">{m.payScale || "—"}</p>
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
        <div className="text-center py-12 bg-red-50 rounded-xl border-2 border-red-200">
          <p className="text-base sm:text-lg text-black font-bold">👔 No staff members</p>
          <p className="text-xs sm:text-sm text-black font-bold">Click "Add Staff Member" to get started</p>
        </div>
      )}

      {/* Edit / Add Modal - Mobile Responsive */}
      {editingId && editForm && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-2 sm:p-4 animate-fade-in"
          onClick={() => cancelEdit()}
        >
          <div
            className="bg-white rounded-t-2xl sm:rounded-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-red-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-red-600 z-10 p-3 sm:p-4 border-b-2 border-red-700 flex justify-between items-center rounded-t-2xl">
              <h3 className="text-base sm:text-xl font-bold text-white">
                {editingId === "new" ? "Add Staff Member" : `Edit ${editForm.name || "Staff"}`}
              </h3>
              <button
                onClick={() => cancelEdit()}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-lg sm:text-xl transition-colors"
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
                      className="h-20 w-20 sm:h-24 sm:w-24 rounded-lg object-cover border-2 border-red-600"
                    />
                  ) : (
                    <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold text-2xl sm:text-3xl">
                      {editForm.name ? getInitials(editForm.name) : "?"}
                    </div>
                  )}
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-sm font-bold text-black">Profile Photo</p>
                  <p className="text-xs text-black font-bold mb-2">Upload a photo (max 2MB)</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="text-xs w-full sm:w-auto text-black font-bold"
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
                  <Label className="text-xs text-black font-bold">Full Name *</Label>
                  <Input
                    value={editForm.name || ""}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="mt-1 text-sm border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label className="text-xs text-black font-bold">Designation *</Label>
                  <Input
                    value={editForm.designation || ""}
                    onChange={(e) => setEditForm({ ...editForm, designation: e.target.value })}
                    className="mt-1 text-sm border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                    placeholder="e.g. Professor (Samhita)"
                  />
                </div>

                {isTeaching && (
                  <>
                    <div>
                      <Label className="text-xs text-black font-bold">Date of Birth</Label>
                      <Input
                        type="date"
                        value={formatDateForInput(editForm.dob)}
                        onChange={(e) => setEditForm({ ...editForm, dob: e.target.value })}
                        className="mt-1 text-sm border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-black font-bold">Date of Joining</Label>
                      <Input
                        type="date"
                        value={formatDateForInput(editForm.dateOfJoining)}
                        onChange={(e) => setEditForm({ ...editForm, dateOfJoining: e.target.value })}
                        className="mt-1 text-sm border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-black font-bold">Teacher Code</Label>
                      <Input
                        value={editForm.teacherCode || ""}
                        onChange={(e) => setEditForm({ ...editForm, teacherCode: e.target.value })}
                        className="mt-1 text-sm border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                        placeholder="e.g. TCH001"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-black font-bold">Registration Number</Label>
                      <Input
                        value={editForm.registrationNumber || ""}
                        onChange={(e) => setEditForm({ ...editForm, registrationNumber: e.target.value })}
                        className="mt-1 text-sm border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                        placeholder="Registration No."
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label className="text-xs text-black font-bold">Qualification</Label>
                      <Input
                        value={editForm.qualification || editForm.education || ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            qualification: e.target.value,
                            education: e.target.value,
                          })
                        }
                        className="mt-1 text-sm border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                        placeholder="e.g. M.D. (Samhita), PhD"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-black font-bold">Experience</Label>
                      <Input
                        value={editForm.experience || ""}
                        onChange={(e) => setEditForm({ ...editForm, experience: e.target.value })}
                        className="mt-1 text-sm border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                        placeholder="e.g. 10 years"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-black font-bold">Mobile Number</Label>
                      <Input
                        type="tel"
                        value={editForm.mobile || ""}
                        onChange={(e) => handleMobileChange(e.target.value)}
                        className={`mt-1 text-sm border-2 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold ${
                          mobileError ? 'border-red-500 bg-red-50' : 'border-red-200'
                        }`}
                        placeholder="Enter 10-digit mobile number"
                        maxLength={10}
                      />
                      {mobileError && (
                        <p className="text-xs text-red-600 font-bold mt-1">{mobileError}</p>
                      )}
                      {editForm.mobile && editForm.mobile.length === 10 && !mobileError && (
                        <p className="text-xs text-green-600 font-bold mt-1">✓ Valid mobile number</p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <Label className="text-xs text-black font-bold">Email ID</Label>
                      <Input
                        type="email"
                        value={editForm.email || ""}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="mt-1 text-sm border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                        placeholder="email@example.com"
                      />
                    </div>
                  </>
                )}

                {(isNonTeaching || isHospital) && (
                  <>
                    <div className="sm:col-span-2">
                      <Label className="text-xs text-black font-bold">Father's Name</Label>
                      <Input
                        value={editForm.fatherName || ""}
                        onChange={(e) => setEditForm({ ...editForm, fatherName: e.target.value })}
                        className="mt-1 text-sm border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                        placeholder="Father's full name"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label className="text-xs text-black font-bold">Qualification</Label>
                      <Input
                        value={editForm.qualification || editForm.education || ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            qualification: e.target.value,
                            education: e.target.value,
                          })
                        }
                        className="mt-1 text-sm border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                        placeholder="e.g. M.A., B.Sc."
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-black font-bold">Date of Appointment</Label>
                      <Input
                        type="date"
                        value={formatDateForInput(editForm.dateOfAppointment)}
                        onChange={(e) => setEditForm({ ...editForm, dateOfAppointment: e.target.value })}
                        className="mt-1 text-sm border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-black font-bold">Nature of Appointment</Label>
                      <Input
                        value={editForm.natureOfAppointment || ""}
                        onChange={(e) => setEditForm({ ...editForm, natureOfAppointment: e.target.value })}
                        className="mt-1 text-sm border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                        placeholder="e.g. Permanent, Contract, Ad-hoc"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label className="text-xs text-black font-bold">Working Department</Label>
                      <Input
                        value={editForm.workingDepartment || ""}
                        onChange={(e) => setEditForm({ ...editForm, workingDepartment: e.target.value })}
                        className="mt-1 text-sm border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                        placeholder="e.g. Administration, Accounts"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label className="text-xs text-black font-bold">Pay Scale</Label>
                      <Input
                        value={editForm.payScale || ""}
                        onChange={(e) => setEditForm({ ...editForm, payScale: e.target.value })}
                        className="mt-1 text-sm border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                        placeholder="e.g. Level 7 ₹44,900-1,42,400"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-6 pt-4 border-t-2 border-red-200">
                <Button 
                  variant="outline" 
                  onClick={() => cancelEdit()} 
                  className="w-full sm:w-auto order-2 sm:order-1 border-2 border-red-300 text-black font-bold hover:bg-red-50 rounded-full"
                >
                  Cancel
                </Button>
                {editingId !== "new" && (
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (editingId) removeRow(Number(editingId));
                    }}
                    className="w-full sm:w-auto order-1 sm:order-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full"
                  >
                    Delete
                  </Button>
                )}
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white font-bold w-full sm:w-auto order-3 rounded-full" 
                  onClick={saveEdit}
                >
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