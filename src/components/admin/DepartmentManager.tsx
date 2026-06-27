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
    <div className="border border-border rounded-md p-3 sm:p-5 bg-card">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4">
        <div>
          <h2 className="font-semibold text-base sm:text-lg mb-0.5 sm:mb-1">
            Department Faculty Members
          </h2>
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            Edit faculty list. Click Save to apply changes.
          </p>
        </div>
        <Button 
          onClick={saveChanges} 
          disabled={isSaving} 
          className="bg-green-600 hover:bg-green-700 w-full sm:w-auto text-sm"
        >
          {isSaving ? 'Saving...' : '💾 Save Changes'}
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-4">
        <div className="flex-1">
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
          <Button 
            size="sm" 
            variant="destructive" 
            className="w-full sm:w-auto mt-1 sm:mt-5"
            onClick={resetAll}
          >
            Delete All Faculty
          </Button>
        )}
      </div>

      {/* Mobile Cards View */}
      <div className="block sm:hidden space-y-3">
        {faculties.map((f, idx) => (
          <div key={f.id || idx} className="border border-border rounded-lg p-3 bg-white dark:bg-gray-900">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs text-muted-foreground">#{idx + 1}</span>
              <Button
                size="sm"
                variant="destructive"
                className="h-7 text-xs"
                onClick={() => f.id && removeRow(f.id)}
                disabled={!f.id}
              >
                Delete
              </Button>
            </div>
            
            <div className="space-y-2">
              <div>
                <Label className="text-[10px] text-muted-foreground">Name</Label>
                <Input
                  value={f.name}
                  onChange={(e) => f.id && updateRow(f.id, { name: e.target.value })}
                  placeholder="Full Name"
                  className="text-sm"
                />
              </div>
              
              <div>
                <Label className="text-[10px] text-muted-foreground">Designation</Label>
                <Input
                  value={f.designation}
                  onChange={(e) => f.id && updateRow(f.id, { designation: e.target.value })}
                  placeholder="Designation"
                  className="text-sm"
                />
              </div>
              
              <div>
                <Label className="text-[10px] text-muted-foreground">Qualification</Label>
                <Input
                  value={f.qualification}
                  onChange={(e) => f.id && updateRow(f.id, { qualification: e.target.value })}
                  placeholder="Qualification"
                  className="text-sm"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto border border-border rounded-md">
        <table className="w-full text-xs">
          <thead className="bg-secondary">
            <tr>
              <th className="p-2 text-left w-10">Sr.No</th>
              <th className="p-2 text-left min-w-[120px]">Name</th>
              <th className="p-2 text-left min-w-[120px]">Designation</th>
              <th className="p-2 text-left min-w-[150px]">Qualification</th>
              <th className="p-2 w-16"></th>
            </tr>
          </thead>
          <tbody>
            {faculties.map((f, idx) => (
              <tr key={f.id || idx} className="border-t border-border align-top">
                <td className="p-2 text-muted-foreground text-center">{idx + 1}</td>
                <td className="p-2">
                  <Input
                    value={f.name}
                    onChange={(e) => f.id && updateRow(f.id, { name: e.target.value })}
                    placeholder="Full Name"
                    className="text-xs"
                  />
                </td>
                <td className="p-2">
                  <Input
                    value={f.designation}
                    onChange={(e) => f.id && updateRow(f.id, { designation: e.target.value })}
                    placeholder="Designation"
                    className="text-xs"
                  />
                </td>
                <td className="p-2">
                  <Input
                    value={f.qualification}
                    onChange={(e) => f.id && updateRow(f.id, { qualification: e.target.value })}
                    placeholder="Qualification"
                    className="text-xs"
                  />
                </td>
                <td className="p-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-7 text-xs w-full"
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

      {/* Add Member Button */}
      <div className="flex gap-2 mt-3">
        <Button size="sm" onClick={addRow} className="w-full sm:w-auto">
          + Add Faculty Member
        </Button>
      </div>
    </div>
  );
}

export default DepartmentManager;