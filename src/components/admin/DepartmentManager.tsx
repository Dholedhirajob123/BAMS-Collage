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
import { API_BASE_URL } from '@/lib/config';

interface DepartmentManagerProps {
  setSavedMsg: (msg: string) => void;
}

// Helper to get auth token
const getAuthToken = () => {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
};

export function DepartmentManager({ setSavedMsg }: DepartmentManagerProps) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>('');
  const [faculties, setFaculties] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const data = await getDepartments();
      setDepartments(data);
      if (data.length > 0) {
        setSelectedSlug(data[0].slug);
        await loadFaculty(data[0].slug);
      }
    } catch (err) {
      console.error(err);
      setSavedMsg('❌ Failed to load departments.');
      setTimeout(() => setSavedMsg(''), 3000);
    }
  };

  const loadFaculty = async (slug: string) => {
    if (!slug) return;
    try {
      setLoading(true);
      const data = await getFacultyMembers(slug);
      setFaculties(data);
    } catch (err) {
      console.error(err);
      setSavedMsg('❌ Failed to load faculty members.');
      setTimeout(() => setSavedMsg(''), 3000);
    } finally {
      setLoading(false);
    }
  };

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
    // Create a new faculty member with temporary ID
    const tempId = Date.now();
    setFaculties([
      ...faculties,
      { 
        id: tempId,
        name: '', 
        designation: '', 
        qualification: '',
        departmentSlug: selectedSlug,
      } as FacultyMember,
    ]);
  };

  const resetAll = async () => {
    if (!confirm('Delete ALL faculty members from this department?')) return;
    try {
      for (const f of faculties) {
        if (f.id && typeof f.id === 'number') {
          await deleteFacultyMember(f.id);
        }
      }
      setFaculties([]);
      setSavedMsg('✓ All faculty members deleted.');
      setTimeout(() => setSavedMsg(''), 2000);
    } catch (err) {
      console.error(err);
      setSavedMsg('❌ Failed to delete all faculty members.');
      setTimeout(() => setSavedMsg(''), 3000);
    }
  };

  const saveChanges = async () => {
    // Validate
    const invalidMembers = faculties.filter(f => !f.name || !f.designation);
    if (invalidMembers.length > 0) {
      setSavedMsg(`⚠️ Please fill in Name and Designation for all ${invalidMembers.length} faculty member(s).`);
      setTimeout(() => setSavedMsg(''), 3000);
      return;
    }

    setIsSaving(true);
    try {
      let savedCount = 0;
      let failedCount = 0;

      for (const faculty of faculties) {
        try {
          const payload = {
            name: faculty.name.trim(),
            designation: faculty.designation.trim(),
            qualification: faculty.qualification?.trim() || '',
            departmentSlug: selectedSlug,
          };

          if (faculty.id && typeof faculty.id === 'number') {
            // Check if it's an existing record or a new one with temp ID
            const isNew = faculty.id > 999999; // Simple check for temp ID
            if (isNew) {
              await createFacultyMember(payload);
            } else {
              await updateFacultyMember(faculty.id, payload);
            }
          } else {
            await createFacultyMember(payload);
          }
          savedCount++;
        } catch (err) {
          failedCount++;
          console.error('Error saving faculty:', faculty, err);
        }
      }

      if (failedCount > 0 && savedCount > 0) {
        setSavedMsg(`⚠️ ${savedCount} saved, ${failedCount} failed. Check console.`);
      } else if (failedCount > 0) {
        setSavedMsg(`❌ Failed to save ${failedCount} faculty member(s).`);
      } else {
        setSavedMsg(`✓ ${savedCount} faculty member(s) saved successfully.`);
      }

      await loadFaculty(selectedSlug);
      setTimeout(() => setSavedMsg(''), 3000);
    } catch (err) {
      console.error(err);
      setSavedMsg('❌ Error saving faculty members.');
      setTimeout(() => setSavedMsg(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="border-2 border-red-300 rounded-xl p-3 sm:p-5 bg-white shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4">
        <div>
          <h2 className="font-bold text-base sm:text-lg text-black mb-0.5 sm:mb-1">
            Department Faculty Members
          </h2>
          <p className="text-[10px] sm:text-xs text-black font-bold">
            Edit faculty list. Click Save to apply changes.
          </p>
        </div>
        <Button 
          onClick={saveChanges} 
          disabled={isSaving} 
          className="bg-red-600 hover:bg-red-700 text-white font-bold w-full sm:w-auto text-sm rounded-xl"
        >
          {isSaving ? 'Saving...' : '💾 Save Changes'}
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-4">
        <div className="flex-1">
          <Label className="text-xs text-black font-bold">Select Department</Label>
          <select
            className="w-full mt-1 border-2 border-red-200 rounded-xl p-2 bg-white text-sm text-black font-bold focus:ring-2 focus:ring-red-500 focus:border-red-500"
            value={selectedSlug}
            onChange={(e) => {
              setSelectedSlug(e.target.value);
              loadFaculty(e.target.value);
            }}
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
            className="w-full sm:w-auto mt-1 sm:mt-5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl"
            onClick={resetAll}
          >
            Delete All Faculty
          </Button>
        )}
      </div>

      {/* Mobile Cards View */}
      <div className="block sm:hidden space-y-3">
        {faculties.map((f, idx) => (
          <div key={f.id || idx} className="border-2 border-red-200 rounded-xl p-3 bg-white">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs text-red-600 font-bold">#{idx + 1}</span>
              <Button
                size="sm"
                variant="destructive"
                className="h-7 text-xs bg-red-600 hover:bg-red-700 text-white font-bold rounded-full"
                onClick={() => f.id && typeof f.id === 'number' && f.id < 999999 && removeRow(f.id)}
                disabled={!f.id || (typeof f.id === 'number' && f.id > 999999)}
              >
                Delete
              </Button>
            </div>
            
            <div className="space-y-2">
              <div>
                <Label className="text-[10px] text-black font-bold">Name</Label>
                <Input
                  value={f.name || ''}
                  onChange={(e) => {
                    if (f.id && typeof f.id === 'number') {
                      updateRow(f.id, { name: e.target.value });
                    }
                  }}
                  placeholder="Full Name"
                  className="text-sm border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                />
              </div>
              
              <div>
                <Label className="text-[10px] text-black font-bold">Designation</Label>
                <Input
                  value={f.designation || ''}
                  onChange={(e) => {
                    if (f.id && typeof f.id === 'number') {
                      updateRow(f.id, { designation: e.target.value });
                    }
                  }}
                  placeholder="Designation"
                  className="text-sm border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                />
              </div>
              
              <div>
                <Label className="text-[10px] text-black font-bold">Qualification</Label>
                <Input
                  value={f.qualification || ''}
                  onChange={(e) => {
                    if (f.id && typeof f.id === 'number') {
                      updateRow(f.id, { qualification: e.target.value });
                    }
                  }}
                  placeholder="Qualification"
                  className="text-sm border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto border-2 border-red-200 rounded-xl">
        <table className="w-full text-xs">
          <thead className="bg-red-600">
            <tr>
              <th className="p-2 text-left w-10 text-white font-bold">Sr.No</th>
              <th className="p-2 text-left min-w-[120px] text-white font-bold">Name</th>
              <th className="p-2 text-left min-w-[120px] text-white font-bold">Designation</th>
              <th className="p-2 text-left min-w-[150px] text-white font-bold">Qualification</th>
              <th className="p-2 w-16 text-white font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {faculties.map((f, idx) => (
              <tr key={f.id || idx} className="border-t border-red-200 align-top">
                <td className="p-2 text-black font-bold text-center">{idx + 1}</td>
                <td className="p-2">
                  <Input
                    value={f.name || ''}
                    onChange={(e) => {
                      if (f.id && typeof f.id === 'number') {
                        updateRow(f.id, { name: e.target.value });
                      }
                    }}
                    placeholder="Full Name"
                    className="text-xs border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                  />
                </td>
                <td className="p-2">
                  <Input
                    value={f.designation || ''}
                    onChange={(e) => {
                      if (f.id && typeof f.id === 'number') {
                        updateRow(f.id, { designation: e.target.value });
                      }
                    }}
                    placeholder="Designation"
                    className="text-xs border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                  />
                </td>
                <td className="p-2">
                  <Input
                    value={f.qualification || ''}
                    onChange={(e) => {
                      if (f.id && typeof f.id === 'number') {
                        updateRow(f.id, { qualification: e.target.value });
                      }
                    }}
                    placeholder="Qualification"
                    className="text-xs border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                  />
                </td>
                <td className="p-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-7 text-xs w-full bg-red-600 hover:bg-red-700 text-white font-bold rounded-full"
                    onClick={() => f.id && typeof f.id === 'number' && f.id < 999999 && removeRow(f.id)}
                    disabled={!f.id || (typeof f.id === 'number' && f.id > 999999)}
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
        <Button 
          size="sm" 
          onClick={addRow} 
          className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl"
        >
          + Add Faculty Member
        </Button>
      </div>
    </div>
  );
}

export default DepartmentManager;