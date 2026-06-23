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

export type CouncilMember = {
  id?: number;
  name: string;
  designation: string;
  position: string;
  email: string;
  groupKey: string;
  tempId?: string; // temporary unique identifier for new rows
};

type CouncilGroup = {
  key: string;
  label: string;
};

interface CouncilManagerProps {
  setSavedMsg: (msg: string) => void;
}

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
      // Ensure each member from backend has no tempId
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

    // Generate a unique temporary ID
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

    setIsSaving(true);

    try {
      for (const member of members) {
        // Prepare payload: exclude tempId
        const { tempId, ...payload } = {
          ...member,
          email: member.email?.trim() || null,
          groupKey: group,
        };

        if (member.id) {
          await updateCouncilMember(member.id, payload);
        } else {
          await createCouncilMember(payload);
        }
      }

      await loadMembers(group);

      setSavedMsg("✓ Council members saved successfully.");
      setTimeout(() => setSavedMsg(""), 2000);
    } catch (err) {
      console.error(err);
      setSavedMsg("Error saving members.");
      setTimeout(() => setSavedMsg(""), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="border border-border rounded-md p-5 bg-card">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-semibold text-lg mb-1">
            Council / Committee Members
          </h2>
          <p className="text-xs text-muted-foreground">
            Select a committee and manage members.
          </p>
        </div>

        <Button
          onClick={saveChanges}
          disabled={isSaving}
          className="bg-green-600 hover:bg-green-700"
        >
          {isSaving ? "Saving..." : "💾 Save Changes"}
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex-1 mr-4">
          <Label className="text-xs">Select Committee</Label>
          <select
            className="w-full mt-1 border border-border rounded-md p-2 bg-background text-sm"
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
            className="mt-5"
            onClick={resetAll}
          >
            Delete All Members
          </Button>
        )}
      </div>

      <div className="overflow-x-auto border border-border rounded-md">
        <table className="w-full text-xs">
          <thead className="bg-secondary">
            <tr>
              <th className="p-2 text-left w-10">Sr.No</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Designation</th>
              <th className="p-2 text-left">Position</th>
              <th className="p-2 text-left">Email ID</th>
              <th className="p-2"></th>
            </tr>
          </thead>

          <tbody>
            {members.map((m, i) => (
              <tr key={m.id ?? m.tempId ?? i} className="border-t border-border">
                <td className="p-2">{i + 1}</td>

                <td className="p-2">
                  <Input
                    value={m.name}
                    onChange={(e) =>
                      updateRow(i, { name: e.target.value })
                    }
                  />
                </td>

                <td className="p-2">
                  <Input
                    value={m.designation}
                    onChange={(e) =>
                      updateRow(i, { designation: e.target.value })
                    }
                  />
                </td>

                <td className="p-2">
                  <Input
                    value={m.position}
                    onChange={(e) =>
                      updateRow(i, { position: e.target.value })
                    }
                  />
                </td>

                <td className="p-2">
                  <Input
                    value={m.email}
                    onChange={(e) =>
                      updateRow(i, { email: e.target.value })
                    }
                  />
                </td>

                <td className="p-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-7 text-xs"
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

      <div className="flex gap-2 mt-3">
        <Button size="sm" onClick={addRow}>
          + Add Member
        </Button>
      </div>
    </div>
  );
}

export default CouncilManager;