// components/admin/CouncilManager.tsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getCouncilGroups,
  getCouncilMembers,
  createCouncilMember,
  updateCouncilMember,
  deleteCouncilMember,
} from "@/lib/apis";
import { API_BASE_URL } from '@/lib/config';

export type CouncilMember = {
  id?: number;
  name: string;
  designation: string;
  position: string;
  email: string;
  groupKey: string;
  tempId?: string;
};

type CouncilGroup = {
  key: string;
  label: string;
};

interface CouncilManagerProps {
  setSavedMsg: (msg: string) => void;
}

// Helper to get auth token
const getAuthToken = () => {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
};

export function CouncilManager({ setSavedMsg }: CouncilManagerProps) {
  const [group, setGroup] = useState("");
  const [groups, setGroups] = useState<CouncilGroup[]>([]);
  const [members, setMembers] = useState<CouncilMember[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      const data = await getCouncilGroups();
      const mappedGroups = data.map((item: any) => ({
        key: item.groupKey,
        label: item.displayName,
      }));
      setGroups(mappedGroups);

      if (mappedGroups.length > 0) {
        const first = mappedGroups[0].key;
        setGroup(first);
        await loadMembers(first);
      }
    } catch (err) {
      console.error(err);
      setSavedMsg("Failed to load committees.");
      setTimeout(() => setSavedMsg(""), 3000);
    }
  };

  const loadMembers = async (groupKey: string) => {
    try {
      setGroup(groupKey);
      if (!groupKey) {
        setMembers([]);
        return;
      }
      const data = await getCouncilMembers(groupKey);
      setMembers(data.map((m: any) => ({ ...m, tempId: undefined })));
    } catch (err) {
      console.error(err);
      setSavedMsg("Failed to load members.");
      setTimeout(() => setSavedMsg(""), 3000);
    }
  };

  const updateRow = (index: number, patch: Partial<CouncilMember>) => {
    setMembers((prev) =>
      prev.map((m, i) => (i === index ? { ...m, ...patch } : m))
    );
  };

  const addRow = () => {
    if (!group) {
      alert("Please select a committee first.");
      return;
    }

    const tempId = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

    setMembers((prev) => [
      ...prev,
      {
        name: "",
        designation: "",
        position: "",
        email: "",
        groupKey: group,
        tempId,
      },
    ]);
  };

  const removeRow = async (member: CouncilMember) => {
    if (!confirm("Remove this member?")) return;

    try {
      if (member.id) {
        await deleteCouncilMember(member.id);
      }

      setMembers((prev) => prev.filter((m) => m !== member));

      setSavedMsg("✓ Member deleted.");
      setTimeout(() => setSavedMsg(""), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const resetAll = async () => {
    if (
      !confirm(
        "Delete ALL members from this committee? This cannot be undone."
      )
    )
      return;

    try {
      for (const member of members) {
        if (member.id) {
          await deleteCouncilMember(member.id);
        }
      }
      setMembers([]);
      setSavedMsg("✓ All members deleted.");
      setTimeout(() => setSavedMsg(""), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const saveChanges = async () => {
    if (!group) {
      alert("Please select a committee first.");
      return;
    }

    // Check if there are members to save
    if (members.length === 0) {
      setSavedMsg("⚠️ No members to save. Add members first.");
      setTimeout(() => setSavedMsg(""), 3000);
      return;
    }

    // Validate members
    const invalidMembers = members.filter(m => !m.name || !m.designation);
    if (invalidMembers.length > 0) {
      setSavedMsg(`⚠️ Please fill in Name and Designation for all ${invalidMembers.length} member(s).`);
      setTimeout(() => setSavedMsg(""), 3000);
      return;
    }

    setIsSaving(true);

    try {
      let savedCount = 0;
      let failedCount = 0;

      for (const member of members) {
        try {
          const { tempId, ...payload } = {
            name: member.name.trim(),
            designation: member.designation.trim(),
            position: member.position?.trim() || "",
            email: member.email?.trim() || "",
            groupKey: group,
          };

          if (member.id) {
            await updateCouncilMember(member.id, payload);
          } else {
            await createCouncilMember(payload);
          }
          savedCount++;
        } catch (err) {
          failedCount++;
          console.error("Error saving member:", member, err);
        }
      }

      if (failedCount > 0 && savedCount > 0) {
        setSavedMsg(`⚠️ ${savedCount} saved, ${failedCount} failed. Check console.`);
      } else if (failedCount > 0) {
        setSavedMsg(`❌ Failed to save ${failedCount} member(s).`);
      } else {
        setSavedMsg(`✓ ${savedCount} council member(s) saved successfully.`);
      }

      await loadMembers(group);
      setTimeout(() => setSavedMsg(""), 3000);
    } catch (err) {
      console.error(err);
      setSavedMsg("❌ Error saving members.");
      setTimeout(() => setSavedMsg(""), 3000);
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
            Council / Committee Members
          </h2>
          <p className="text-[10px] sm:text-xs text-black font-bold">
            Select a committee and manage members.
          </p>
        </div>

        <Button
          onClick={saveChanges}
          disabled={isSaving}
          className="bg-red-600 hover:bg-red-700 text-white font-bold w-full sm:w-auto text-sm rounded-xl"
        >
          {isSaving ? "Saving..." : "💾 Save Changes"}
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-4">
        <div className="flex-1">
          <Label className="text-xs text-black font-bold">Select Committee</Label>
          <select
            className="w-full mt-1 border-2 border-red-200 rounded-xl p-2 bg-white text-sm text-black font-bold focus:ring-2 focus:ring-red-500 focus:border-red-500"
            value={group}
            onChange={(e) => loadMembers(e.target.value)}
          >
            <option value="">Select Committee</option>
            {groups.map((g) => (
              <option key={g.key} value={g.key}>
                {g.label}
              </option>
            ))}
          </select>
        </div>

        {members.length > 0 && (
          <Button
            size="sm"
            variant="destructive"
            className="w-full sm:w-auto mt-1 sm:mt-5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl"
            onClick={resetAll}
          >
            Delete All Members
          </Button>
        )}
      </div>

      {/* Mobile Cards View */}
      <div className="block sm:hidden space-y-3">
        {members.map((m, i) => (
          <div key={m.id ?? m.tempId ?? i} className="border-2 border-red-200 rounded-xl p-3 bg-white">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs text-red-600 font-bold">#{i + 1}</span>
              <Button
                size="sm"
                variant="destructive"
                className="h-7 text-xs bg-red-600 hover:bg-red-700 text-white font-bold rounded-full"
                onClick={() => removeRow(m)}
              >
                Delete
              </Button>
            </div>
            
            <div className="space-y-2">
              <div>
                <Label className="text-[10px] text-black font-bold">Name</Label>
                <Input
                  value={m.name}
                  onChange={(e) => updateRow(i, { name: e.target.value })}
                  className="text-sm border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                  placeholder="Enter name"
                />
              </div>
              
              <div>
                <Label className="text-[10px] text-black font-bold">Designation</Label>
                <Input
                  value={m.designation}
                  onChange={(e) => updateRow(i, { designation: e.target.value })}
                  className="text-sm border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                  placeholder="Enter designation"
                />
              </div>
              
              <div>
                <Label className="text-[10px] text-black font-bold">Position</Label>
                <Input
                  value={m.position}
                  onChange={(e) => updateRow(i, { position: e.target.value })}
                  className="text-sm border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                  placeholder="Enter position"
                />
              </div>
              
              <div>
                <Label className="text-[10px] text-black font-bold">Email ID</Label>
                <Input
                  value={m.email}
                  onChange={(e) => updateRow(i, { email: e.target.value })}
                  className="text-sm border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                  placeholder="Enter email"
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
              <th className="p-2 text-left min-w-[100px] text-white font-bold">Position</th>
              <th className="p-2 text-left min-w-[150px] text-white font-bold">Email ID</th>
              <th className="p-2 w-16 text-white font-bold">Action</th>
            </tr>
          </thead>

          <tbody>
            {members.map((m, i) => (
              <tr key={m.id ?? m.tempId ?? i} className="border-t border-red-200">
                <td className="p-2 text-black font-bold">{i + 1}</td>

                <td className="p-2">
                  <Input
                    value={m.name}
                    onChange={(e) => updateRow(i, { name: e.target.value })}
                    className="text-xs border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                  />
                </td>

                <td className="p-2">
                  <Input
                    value={m.designation}
                    onChange={(e) => updateRow(i, { designation: e.target.value })}
                    className="text-xs border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                  />
                </td>

                <td className="p-2">
                  <Input
                    value={m.position}
                    onChange={(e) => updateRow(i, { position: e.target.value })}
                    className="text-xs border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                  />
                </td>

                <td className="p-2">
                  <Input
                    value={m.email}
                    onChange={(e) => updateRow(i, { email: e.target.value })}
                    className="text-xs border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                    type="email"
                  />
                </td>

                <td className="p-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-7 text-xs w-full bg-red-600 hover:bg-red-700 text-white font-bold rounded-full"
                    onClick={() => removeRow(m)}
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
          + Add Member
        </Button>
      </div>
    </div>
  );
}

export default CouncilManager;