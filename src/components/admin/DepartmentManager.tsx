// components/admin/DepartmentManager.tsx
import { useState, useEffect } from 'react';
import {
  getDepartments,
  getFacultyMembers,
  createFacultyMember,
  updateFacultyMember,
  deleteFacultyMember,
  Department,
  FacultyMember,
} from '@/lib/apis';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DepartmentManagerProps {
  setSavedMsg: (msg: string) => void;
}

export function DepartmentManager({ setSavedMsg }: DepartmentManagerProps) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>('');
  const [faculties, setFaculties] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getDepartments()
      .then((data) => {
        setDepartments(data);
        if (data.length > 0) setSelectedSlug(data[0].slug);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedSlug) return;
    getFacultyMembers(selectedSlug)
      .then(setFaculties)
      .catch(console.error);
  }, [selectedSlug]);

  const updateRow = (id: number, patch: Partial<FacultyMember>) => {
    setFaculties(faculties.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  };

  const removeRow = async (id: number) => {
    if (!confirm('Remove this faculty member?')) return;
    try {
      await deleteFacultyMember(id);
      setFaculties(faculties.filter((f) => f.id !== id));
      setSavedMsg('✓ Faculty member deleted.');
      setTimeout(() => setSavedMsg(''), 2000);
    } catch (err) {
      alert('Failed to delete.');
      console.error(err);
    }
  };

  const addRow = () => {
    setFaculties([
      ...faculties,
      { name: '', designation: '', qualification: '' } as FacultyMember,
    ]);
  };

  const resetAll = async () => {
    if (!confirm('Delete ALL faculty members from this department?')) return;
    for (const f of faculties) {
      if (f.id) await deleteFacultyMember(f.id);
    }
    setFaculties([]);
    setSavedMsg('✓ All faculty members deleted.');
    setTimeout(() => setSavedMsg(''), 2000);
  };

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      for (const faculty of faculties) {
        if (faculty.id) {
          await updateFacultyMember(faculty.id, faculty);
        } else {
          await createFacultyMember({ ...faculty, departmentSlug: selectedSlug });
        }
      }
      const fresh = await getFacultyMembers(selectedSlug);
      setFaculties(fresh);
      setSavedMsg('✓ Faculty saved successfully.');
    } catch (err) {
      alert('Error saving.');
      console.error(err);
    } finally {
      setIsSaving(false);
      setTimeout(() => setSavedMsg(''), 2000);
    }
  };

  return (
    <div className="border border-border rounded-md p-5 bg-card">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-semibold text-lg mb-1">Department Faculty Members</h2>
          <p className="text-xs text-muted-foreground">Edit faculty list. Click Save to apply changes.</p>
        </div>
        <Button onClick={saveChanges} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
          {isSaving ? 'Saving...' : '💾 Save Changes'}
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex-1 mr-4">
          <Label className="text-xs">Select Department</Label>
          <select
            className="w-full mt-1 border border-border rounded-md p-2 bg-background text-sm"
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
          >
            {departments.map((dept) => (
              <option key={dept.slug} value={dept.slug}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        {faculties.length > 0 && (
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
              <th className="p-2 text-left min-w-[120px]">Name</th>
              <th className="p-2 text-left min-w-[120px]">Designation</th>
              <th className="p-2 text-left min-w-[150px]">Qualification</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {faculties.map((f, idx) => (
              <tr key={f.id || idx} className="border-t border-border align-top">
                <td className="p-2 text-muted-foreground text-center">{idx + 1}</td>
                <td className="p-2">
                  <Input
                    value={f.name}
                    onChange={(e) => updateRow(f.id!, { name: e.target.value })}
                    placeholder="Full Name"
                    className="text-xs"
                  />
                </td>
                <td className="p-2">
                  <Input
                    value={f.designation}
                    onChange={(e) => updateRow(f.id!, { designation: e.target.value })}
                    placeholder="Designation"
                    className="text-xs"
                  />
                </td>
                <td className="p-2">
                  <Input
                    value={f.qualification}
                    onChange={(e) => updateRow(f.id!, { qualification: e.target.value })}
                    placeholder="Qualification"
                    className="text-xs"
                  />
                </td>
                <td className="p-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-7 text-xs"
                    onClick={() => f.id && removeRow(f.id)}
                    disabled={!f.id}
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