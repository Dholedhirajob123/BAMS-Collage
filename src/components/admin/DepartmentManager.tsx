// components/admin/DepartmentManager.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEPARTMENTS } from "@/components/DepartmentContent";
import {
  getDepartmentFaculties,
  setDepartmentFaculties,
  newFacultyId,
  type FacultyMember,
} from "@/lib/departmentStore";

interface DepartmentManagerProps {
  setSavedMsg: (msg: string) => void;
}

// Extended FacultyMember with photo support
interface FacultyMemberWithPhoto extends FacultyMember {
  photo?: string;
}

export function DepartmentManager({ setSavedMsg }: DepartmentManagerProps) {
  const [slug, setSlug] = useState<string>(DEPARTMENTS[0]?.slug ?? "");
  const [members, setMembers] = useState<FacultyMemberWithPhoto[]>(() => {
    const department = DEPARTMENTS[0];
    if (!department) return [];
    return getDepartmentFaculties(department.slug, department.faculties).map(f => ({
      ...f,
      photo: f.photo || "",
    }));
  });
  const [isSaving, setIsSaving] = useState(false);

  const reload = (nextSlug: string) => {
    setSlug(nextSlug);
    const department = DEPARTMENTS.find((d) => d.slug === nextSlug);
    if (department) {
      setMembers(getDepartmentFaculties(nextSlug, department.faculties).map(f => ({
        ...f,
        photo: f.photo || "",
      })));
    }
  };

  const updateRow = (id: string, patch: Partial<FacultyMemberWithPhoto>) =>
    setMembers(members.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  const removeRow = (id: string) => {
    if (!confirm("Remove this faculty member?")) return;
    setMembers(members.filter((m) => m.id !== id));
  };

  const addRow = () =>
    setMembers([
      ...members,
      { 
        id: newFacultyId(), 
        name: "", 
        designation: "", 
        qualification: "",
        photo: "",
      },
    ]);

  const resetAll = () => {
    if (!confirm("Delete ALL faculty members from this department? This cannot be undone.")) return;
    setMembers([]);
  };

  const saveChanges = () => {
    setIsSaving(true);
    setDepartmentFaculties(slug, members);
    setTimeout(() => {
      setIsSaving(false);
      setSavedMsg("✓ Department faculty saved successfully.");
      setTimeout(() => setSavedMsg(""), 2000);
    }, 500);
  };

  const onPhoto = (id: string, file: File) => {
    if (!file.type.startsWith("image/")) return alert("Please choose an image file.");
    if (file.size > 2 * 1024 * 1024) return alert("Image must be under 2MB.");
    const reader = new FileReader();
    reader.onload = () => updateRow(id, { photo: reader.result as string });
    reader.readAsDataURL(file);
  };

  const getInitials = (name: string) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).slice(0, 2).join("");
  };

  return (
    <div className="border border-border rounded-md p-5 bg-card">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-semibold text-lg mb-1">Department Faculty Members</h2>
          <p className="text-xs text-muted-foreground">Edit faculty list with photos. Click Save to apply changes.</p>
        </div>
        <Button onClick={saveChanges} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
          {isSaving ? "Saving..." : "💾 Save Changes"}
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex-1 mr-4">
          <Label className="text-xs">Select Department</Label>
          <select
            className="w-full mt-1 border border-border rounded-md p-2 bg-background text-sm"
            value={slug}
            onChange={(e) => reload(e.target.value)}
          >
            {DEPARTMENTS.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        {members.length > 0 && (
          <Button size="sm" variant="destructive" className="mt-5" onClick={resetAll}>
            Delete All Faculty
          </Button>
        )}
      </div>

      <div className="overflow-x-auto border border-border rounded-md">
        <table className="w-full text-xs">
          <thead className="bg-secondary">
            <tr>
              <th className="p-2 text-left w-10">Sr.No</th>
              <th className="p-2 text-left">Photo</th>
              <th className="p-2 text-left min-w-[120px]">Name</th>
              <th className="p-2 text-left min-w-[120px]">Designation</th>
              <th className="p-2 text-left min-w-[150px]">Qualification</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, idx) => (
              <tr key={m.id} className="border-t border-border align-top">
                <td className="p-2 text-muted-foreground text-center">{idx + 1}</td>
                <td className="p-2">
                  <div className="flex flex-col items-center">
                    {m.photo ? (
                      <img 
                        src={m.photo} 
                        alt={m.name} 
                        className="h-12 w-12 rounded-full object-cover mb-1 border-2 border-brand" 
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mb-1 text-sm font-bold text-brand">
                        {getInitials(m.name)}
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="text-[10px] w-24"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) onPhoto(m.id, f);
                        e.target.value = "";
                      }}
                    />
                  </div>
                </td>
                <td className="p-2">
                  <Input 
                    value={m.name} 
                    onChange={(e) => updateRow(m.id, { name: e.target.value })} 
                    placeholder="Full Name"
                    className="text-xs"
                  />
                </td>
                <td className="p-2">
                  <Input 
                    value={m.designation} 
                    onChange={(e) => updateRow(m.id, { designation: e.target.value })} 
                    placeholder="Designation"
                    className="text-xs"
                  />
                </td>
                <td className="p-2">
                  <Input 
                    value={m.qualification} 
                    onChange={(e) => updateRow(m.id, { qualification: e.target.value })} 
                    placeholder="Qualification"
                    className="text-xs"
                  />
                </td>
                <td className="p-2">
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    className="h-7 text-xs" 
                    onClick={() => removeRow(m.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2 mt-3">
        <Button size="sm" onClick={addRow}>+ Add Faculty Member</Button>
      </div>
    </div>
  );
}

export default DepartmentManager;