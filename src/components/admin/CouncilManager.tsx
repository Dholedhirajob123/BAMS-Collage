// components/admin/CouncilManager.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  COUNCIL_GROUPS,
  getCouncil,
  setCouncil,
  resetCouncil,
  newCouncilId,
  type CouncilKey,
  type CouncilMember,
} from "@/lib/councilStore";

interface CouncilManagerProps {
  setSavedMsg: (msg: string) => void;
}

export function CouncilManager({ setSavedMsg }: CouncilManagerProps) {
  const [group, setGroup] = useState<CouncilKey>("iqac");
  const [members, setMembers] = useState<CouncilMember[]>(() => getCouncil("iqac"));
  const [isSaving, setIsSaving] = useState(false);

  const reload = (g: CouncilKey) => {
    setGroup(g);
    setMembers(getCouncil(g));
  };

  const updateRow = (id: string, patch: Partial<CouncilMember>) =>
    setMembers(members.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  const removeRow = (id: string) => {
    if (!confirm("Remove this member?")) return;
    setMembers(members.filter((m) => m.id !== id));
  };

  const addRow = () =>
    setMembers([
      ...members,
      { id: newCouncilId(), name: "", designation: "", position: "", email: "" },
    ]);

  const resetAll = () => {
    if (!confirm("Delete ALL members from this committee? This cannot be undone.")) return;
    setMembers([]);
  };

  const saveChanges = () => {
    setIsSaving(true);
    setCouncil(group, members);
    setTimeout(() => {
      setIsSaving(false);
      setSavedMsg("✓ Council members saved successfully.");
      setTimeout(() => setSavedMsg(""), 2000);
    }, 500);
  };

  return (
    <div className="border border-border rounded-md p-5 bg-card">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-semibold text-lg mb-1">Council / Committee Members</h2>
          <p className="text-xs text-muted-foreground">Edit member list. Click Save to apply changes.</p>
        </div>
        <Button onClick={saveChanges} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
          {isSaving ? "Saving..." : "💾 Save Changes"}
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex-1 mr-4">
          <Label className="text-xs">Select Committee</Label>
          <select
            className="w-full mt-1 border border-border rounded-md p-2 bg-background text-sm"
            value={group}
            onChange={(e) => reload(e.target.value as CouncilKey)}
          >
            {COUNCIL_GROUPS.map((g) => (
              <option key={g.key} value={g.key}>
                {g.label}
              </option>
            ))}
          </select>
        </div>
        {members.length > 0 && (
          <Button size="sm" variant="destructive" className="mt-5" onClick={resetAll}>
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
              <tr key={m.id} className="border-t border-border">
                <td className="p-2 text-muted-foreground">{i + 1}</td>
                <td className="p-2">
                  <Input value={m.name} onChange={(e) => updateRow(m.id, { name: e.target.value })} />
                </td>
                <td className="p-2">
                  <Input value={m.designation} onChange={(e) => updateRow(m.id, { designation: e.target.value })} />
                </td>
                <td className="p-2">
                  <Input value={m.position ?? ""} onChange={(e) => updateRow(m.id, { position: e.target.value })} />
                </td>
                <td className="p-2">
                  <Input value={m.email} onChange={(e) => updateRow(m.id, { email: e.target.value })} />
                </td>
                <td className="p-2">
                  <Button size="sm" variant="destructive" className="h-7 text-xs" onClick={() => removeRow(m.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2 mt-3">
        <Button size="sm" onClick={addRow}>+ Add Member</Button>
      </div>
    </div>
  );
}

export default CouncilManager;