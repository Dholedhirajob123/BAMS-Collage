// routes/admin.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  addPhoto,
  getAllForAdmin,
  removePhoto,
  restorePhoto,
  updatePhoto,
} from "@/lib/galleryStore";
import {
  getStaff,
  setStaff,
  resetStaff,
  newId,
  STAFF_GROUPS,
  type StaffGroupKey,
  type StaffMember,
} from "@/lib/staffStore";
import {
  loadAdmins,
  addAdmin,
  updateAdmin,
  removeAdmin,
  verifyLogin,
  MAX_ADMINS,
  type Admin,
} from "@/lib/adminStore";
import {
  COUNCIL_GROUPS,
  getCouncil,
  setCouncil,
  resetCouncil,
  newCouncilId,
  type CouncilKey,
  type CouncilMember,
} from "@/lib/councilStore";
import {
  DOC_SECTIONS,
  getSection,
  setSection,
  resetSection,
  newDocId,
  type DocSection as DocSectionT,
} from "@/lib/docsStore";
import { DEPARTMENTS } from "@/components/DepartmentContent";
import {
  getDepartmentFaculties,
  setDepartmentFaculties,
  newFacultyId,
  type FacultyMember,
} from "@/lib/departmentStore";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Panel" }] }),
  component: AdminPage,
});

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [phone, setPhone] = useState("");
  const [pwInput, setPwInput] = useState("");
  const [err, setErr] = useState("");

  if (!authed) {
    return (
      <div className="mx-auto max-w-sm p-8 mt-10 border border-border rounded-md bg-card">
        <h1 className="text-2xl font-semibold text-brand mb-1">Admin Login</h1>
        <p className="text-xs text-muted-foreground mb-4">
          Default: phone <code className="bg-secondary px-1 rounded">0000000000</code> · password{" "}
          <code className="bg-secondary px-1 rounded">admin123</code>
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (verifyLogin(phone, pwInput)) {
              setAuthed(true);
              setErr("");
            } else {
              setErr("Invalid phone or password");
            }
          }}
          className="space-y-3"
        >
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoFocus
          />
          <Label htmlFor="pw">Password</Label>
          <Input
            id="pw"
            type="password"
            value={pwInput}
            onChange={(e) => setPwInput(e.target.value)}
          />
          {err && <p className="text-sm text-destructive">{err}</p>}
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          <Link to="/" className="hover:underline">
            ← Back to site
          </Link>
        </p>
      </div>
    );
  }

  return <Editor onLogout={() => setAuthed(false)} />;
}

function Editor({ onLogout }: { onLogout: () => void }) {
  const [savedMsg, setSavedMsg] = useState("");
  const [activeTab, setActiveTab] = useState<string>("pdf");

  const tabs = [
    { id: "pdf", label: "📄 PDF Documents" },
    { id: "council", label: "👥 Council Members" },
    { id: "faculty", label: "👨‍🏫 Department Faculty" },
    { id: "staff", label: "👔 Staff Management" },
    { id: "gallery", label: "🖼️ Photo Gallery" },
  ];

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Manage all content across the website</p>
        </div>
        <div className="flex gap-2">
          <Link to="/" className="text-sm text-brand hover:underline self-center">
            View Site
          </Link>
          <Button variant="outline" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>

      {savedMsg && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md text-sm">{savedMsg}</div>
      )}

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-border pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === tab.id
                ? "bg-brand text-white"
                : "bg-secondary text-muted-foreground hover:bg-secondary/70"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "pdf" && <DocsManager setSavedMsg={setSavedMsg} />}
        {activeTab === "council" && <CouncilManager setSavedMsg={setSavedMsg} />}
        {activeTab === "faculty" && <DepartmentManager setSavedMsg={setSavedMsg} />}
        {activeTab === "gallery" && <GalleryManager setSavedMsg={setSavedMsg} />}
        {activeTab === "staff" && <StaffManager setSavedMsg={setSavedMsg} />}
      </div>
    </div>
  );
}

function DocsManager({ setSavedMsg }: { setSavedMsg: (msg: string) => void }) {
  const [key, setKey] = useState<string>(DOC_SECTIONS[0]?.key || DOC_SECTIONS[0].key);
  const [section, setSectionState] = useState<DocSectionT>(() => getSection(DOC_SECTIONS[0]?.key || DOC_SECTIONS[0].key));
  const [searchTerm, setSearchTerm] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const reload = (k: string) => {
    setIsLoading(true);
    setKey(k);
    const loadedSection = getSection(k);
    setSectionState(loadedSection);
    setIsLoading(false);
  };

  const commit = (next: DocSectionT) => {
    setSectionState(next);
  };

  const saveChanges = () => {
    setIsSaving(true);
    setSection(key, section);
    setTimeout(() => {
      setIsSaving(false);
      setSavedMsg(`✓ "${DOC_SECTIONS.find(s => s.key === key)?.label}" saved successfully.`);
      setTimeout(() => setSavedMsg(""), 2000);
      reload(key);
    }, 500);
  };

  const flash = (t: string) => {
    setSavedMsg(t);
    setTimeout(() => setSavedMsg(""), 2000);
  };

  const [batch, setBatch] = useState<string>("");

  const onPdf = (file: File) => {
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf"))
      return alert("Please upload a PDF file.");
    if (file.size > 4 * 1024 * 1024) return alert("PDF must be under 4MB.");
    const reader = new FileReader();
    reader.onload = () => {
      const newFiles = [
        ...section.files,
        {
          id: newDocId(),
          name: file.name,
          dataUrl: reader.result as string,
          size: file.size,
          addedAt: Date.now(),
          batch: batch.trim() || undefined,
        },
      ];
      commit({ ...section, files: newFiles });
      flash(`✓ "${file.name}" added. Click Save to confirm.`);
      setBatch("");
    };
    reader.readAsDataURL(file);
  };

  const removeFile = (id: string, fileName: string) => {
    if (!confirm(`Remove "${fileName}"?`)) return;
    commit({ ...section, files: section.files.filter((f) => f.id !== id) });
    flash(`✓ "${fileName}" removed. Click Save to confirm.`);
  };

  const resetAllFiles = () => {
    if (!confirm(`Delete ALL ${section.files.length} PDFs from this section? This cannot be undone.`)) return;
    commit({ ...section, files: [] });
    flash("✓ All PDFs removed. Click Save to confirm.");
  };

  const filteredSections = DOC_SECTIONS.filter(s =>
    s.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategory = (key: string): string => {
    if (key.includes("attendance")) return "📊 Attendance";
    if (key.includes("fra")) return "💰 Fee Structure";
    if (key.includes("naac")) return "⭐ NAAC";
    if (key.includes("opd") || key.includes("ipd") || key.includes("operation") || key.includes("hospital-departments")) return "🏥 Hospital Services";
    if (key === "innovation-ecosystem") return "💡 Innovation";
    if (key === "departments") return "📚 Academics";
    if (key.includes("muhs")) return "📋 MUHS Mandate";
    return "📄 Other Documents";
  };

  return (
    <div className="border border-border rounded-md p-5 bg-card">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-semibold text-lg mb-1">Page Information & PDF Documents</h2>
          <p className="text-xs text-muted-foreground">Edit information and upload PDFs. Click Save to apply changes.</p>
        </div>
        <Button onClick={saveChanges} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
          {isSaving ? "Saving..." : "💾 Save Changes"}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label className="text-xs">Search Section</Label>
          <Input
            placeholder="Search by section name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-xs">Select Section</Label>
          <select
            className="w-full mt-1 border border-border rounded-md p-2 bg-background text-sm"
            value={key}
            onChange={(e) => reload(e.target.value)}
          >
            {filteredSections.map((s) => (
              <option key={s.key} value={s.key}>
                {getCategory(s.key)} - {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading section data...</p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <Label className="text-xs">Information / Description</Label>
            <textarea
              className="w-full mt-1 border border-border rounded-md p-2 bg-background text-sm min-h-[100px]"
              value={section.info}
              onChange={(e) => commit({ ...section, info: e.target.value })}
              placeholder="Enter information text shown above the PDF list..."
            />
          </div>

          <div className="mb-4 grid gap-3 md:grid-cols-2">
            <div>
              <Label className="text-xs">Batch/Year (optional)</Label>
              <Input
                value={batch}
                placeholder="e.g. BAMS 2025-26, Academic Year 2024-25"
                className="mt-1"
                onChange={(e) => setBatch(e.target.value)}
              />
            </div>
            <div>
              <Label className="text-xs">Upload New PDF</Label>
              <Input
                type="file"
                accept="application/pdf"
                className="mt-1"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onPdf(f);
                  e.target.value = "";
                }}
              />
            </div>
          </div>

          <div className="border border-border rounded-md">
            <div className="bg-secondary px-3 py-2 border-b border-border flex justify-between items-center">
              <span className="text-xs font-semibold">Uploaded Documents ({section.files.length})</span>
              {section.files.length > 0 && (
                <Button size="sm" variant="destructive" className="h-6 text-xs" onClick={resetAllFiles}>
                  Delete All
                </Button>
              )}
            </div>
            {section.files.length === 0 ? (
              <p className="p-3 text-xs text-muted-foreground italic">No PDFs uploaded for this section.</p>
            ) : (
              <ul className="divide-y divide-border">
                {section.files.map((f) => (
                  <li key={f.id} className="flex items-center justify-between p-3 text-xs hover:bg-secondary/30">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-red-500">📄</span>
                        <p className="font-medium truncate">{f.name}</p>
                      </div>
                      <div className="flex flex-wrap gap-3 mt-1 text-[10px] text-muted-foreground">
                        <span>{(f.size / 1024).toFixed(0)} KB</span>
                        <span>Added {new Date(f.addedAt).toLocaleDateString()}</span>
                        {f.batch && <span className="text-brand">🏷️ {f.batch}</span>}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-2">
                      <a
                        href={f.dataUrl}
                        download={f.name}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand hover:underline text-xs px-2 py-1 bg-secondary/50 rounded"
                      >
                        View
                      </a>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-7 text-xs"
                        onClick={() => removeFile(f.id, f.name)}
                      >
                        Delete
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function CouncilManager({ setSavedMsg }: { setSavedMsg: (msg: string) => void }) {
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
      { id: newCouncilId(), name: "", designation: "", position: "", phone: "", email: "" },
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
              <th className="p-2 text-left">Mobile No.</th>
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
                  <Input value={m.phone} onChange={(e) => updateRow(m.id, { phone: e.target.value })} />
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

function DepartmentManager({ setSavedMsg }: { setSavedMsg: (msg: string) => void }) {
  const [slug, setSlug] = useState<string>(DEPARTMENTS[0]?.slug ?? "");
  const [members, setMembers] = useState<FacultyMember[]>(() => {
    const department = DEPARTMENTS[0];
    if (!department) return [];
    return getDepartmentFaculties(department.slug, department.faculties);
  });
  const [isSaving, setIsSaving] = useState(false);

  const reload = (nextSlug: string) => {
    setSlug(nextSlug);
    const department = DEPARTMENTS.find((d) => d.slug === nextSlug);
    if (department) {
      setMembers(getDepartmentFaculties(nextSlug, department.faculties));
    }
  };

  const updateRow = (id: string, patch: Partial<FacultyMember>) =>
    setMembers(members.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  const removeRow = (id: string) => {
    if (!confirm("Remove this faculty member?")) return;
    setMembers(members.filter((m) => m.id !== id));
  };

  const addRow = () =>
    setMembers([...members, { id: newFacultyId(), name: "", designation: "", qualification: "" }]);

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

  return (
    <div className="border border-border rounded-md p-5 bg-card">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-semibold text-lg mb-1">Department Faculty Members</h2>
          <p className="text-xs text-muted-foreground">Edit faculty list. Click Save to apply changes.</p>
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
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Designation</th>
              <th className="p-2 text-left">Qualification</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, idx) => (
              <tr key={m.id} className="border-t border-border">
                <td className="p-2 text-muted-foreground">{idx + 1}</td>
                <td className="p-2">
                  <Input value={m.name} onChange={(e) => updateRow(m.id, { name: e.target.value })} />
                </td>
                <td className="p-2">
                  <Input value={m.designation} onChange={(e) => updateRow(m.id, { designation: e.target.value })} />
                </td>
                <td className="p-2">
                  <Input value={m.qualification} onChange={(e) => updateRow(m.id, { qualification: e.target.value })} />
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
        <Button size="sm" onClick={addRow}>+ Add Faculty Member</Button>
      </div>
    </div>
  );
}

function StaffManager({ setSavedMsg }: { setSavedMsg: (msg: string) => void }) {
  const [group, setGroup] = useState<StaffGroupKey>("hospital");
  const [members, setMembers] = useState<StaffMember[]>(() => getStaff("hospital"));
  const [isSaving, setIsSaving] = useState(false);

  const reload = (g: StaffGroupKey) => {
    setGroup(g);
    setMembers(getStaff(g));
  };

  const updateRow = (id: string, patch: Partial<StaffMember>) =>
    setMembers(members.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  const removeRow = (id: string) => {
    if (!confirm("Remove this staff member?")) return;
    setMembers(members.filter((m) => m.id !== id));
  };

  const addRow = () =>
    setMembers([...members, { id: newId(), name: "", designation: "", education: "", year: "", photo: "" }]);

  const resetAll = () => {
    if (!confirm(`Delete ALL ${members.length} staff members from this group? This cannot be undone.`)) return;
    setMembers([]);
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
    reader.onload = () => updateRow(id, { photo: reader.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div className="border border-border rounded-md p-5 bg-card">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-semibold text-lg mb-1">Staff Management</h2>
          <p className="text-xs text-muted-foreground">Edit staff entries. Click Save to apply changes.</p>
        </div>
        <Button onClick={saveChanges} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
          {isSaving ? "Saving..." : "💾 Save Changes"}
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex-1 mr-4">
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
        {members.length > 0 && (
          <Button size="sm" variant="destructive" className="mt-5" onClick={resetAll}>
            Delete All Staff
          </Button>
        )}
      </div>

      <div className="overflow-x-auto border border-border rounded-md">
        <table className="w-full text-xs">
          <thead className="bg-secondary">
            <tr>
              <th className="p-2 text-left">Photo</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Designation</th>
              <th className="p-2 text-left">Education</th>
              <th className="p-2 text-left">Year</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} className="border-t border-border align-top">
                <td className="p-2 w-24">
                  {m.photo && (
                    <img src={m.photo} alt="" className="h-12 w-12 rounded-full object-cover mb-1" />
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
                </td>
                <td className="p-2">
                  <Input value={m.name} onChange={(e) => updateRow(m.id, { name: e.target.value })} />
                </td>
                <td className="p-2">
                  <Input value={m.designation} onChange={(e) => updateRow(m.id, { designation: e.target.value })} />
                </td>
                <td className="p-2">
                  <Input value={m.education} onChange={(e) => updateRow(m.id, { education: e.target.value })} />
                </td>
                <td className="p-2">
                  <Input value={m.year} onChange={(e) => updateRow(m.id, { year: e.target.value })} />
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
        <Button size="sm" onClick={addRow}>+ Add Staff Member</Button>
      </div>
    </div>
  );
}

function GalleryManager({ setSavedMsg }: { setSavedMsg: (msg: string) => void }) {
  const [items, setItems] = useState(() => getAllForAdmin());
  const [caption, setCaption] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  
  const refresh = () => {
    setItems(getAllForAdmin());
  };

  const handleDeletePhoto = (photoId: string, photoCaption: string) => {
    if (confirm(`Delete "${photoCaption || 'this photo'}"? This cannot be undone.`)) {
      removePhoto(photoId);
      refresh();
      setSavedMsg("✓ Photo deleted successfully.");
      setTimeout(() => setSavedMsg(""), 2000);
    }
  };

  const onFile = (file: File) => {
    if (!file.type.startsWith("image/")) return alert("Please choose an image file.");
    if (file.size > 3 * 1024 * 1024) return alert("Image must be under 3MB.");
    const reader = new FileReader();
    reader.onload = () => {
      addPhoto(reader.result as string, caption || file.name.replace(/\.[^.]+$/, ""), date, place);
      setCaption("");
      setDate("");
      setPlace("");
      refresh();
      setSavedMsg("✓ Photo uploaded successfully.");
      setTimeout(() => setSavedMsg(""), 2000);
    };
    reader.readAsDataURL(file);
  };

  const deleteAllPhotos = () => {
    const uploadedPhotos = items.filter(i => !i.isDefault);
    if (uploadedPhotos.length === 0) {
      alert("No uploaded photos to delete.");
      return;
    }
    if (!confirm(`Delete ALL ${uploadedPhotos.length} uploaded photos? This cannot be undone.`)) return;
    uploadedPhotos.forEach(({ photo }) => {
      removePhoto(photo.id);
    });
    refresh();
    setSavedMsg("✓ All uploaded photos deleted.");
    setTimeout(() => setSavedMsg(""), 2000);
  };

  const handleUpdatePhoto = (photoId: string, patch: { caption?: string; date?: string; place?: string }) => {
    updatePhoto(photoId, patch);
    refresh();
  };

  return (
    <div className="border border-border rounded-md p-5 bg-card">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-semibold text-lg mb-1">Photo Gallery</h2>
          <p className="text-xs text-muted-foreground">Click Delete on any photo to remove it permanently. Photos are saved automatically when edited.</p>
        </div>
        {items.filter(i => !i.isDefault).length > 0 && (
          <Button size="sm" variant="destructive" onClick={deleteAllPhotos}>
            Delete All Uploaded
          </Button>
        )}
      </div>

      {/* Upload Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6 p-4 bg-secondary/30 rounded-lg">
        <Input
          placeholder="Caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Input
          placeholder="Date (optional)"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input
          placeholder="Place (optional)"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <Input
          type="file"
          accept="image/*"
          className="cursor-pointer"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
            e.target.value = "";
          }}
        />
      </div>

      {/* Gallery Grid System */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map(({ photo, isDefault, hidden }) => (
          <div
            key={photo.id}
            className={`group relative rounded-lg overflow-hidden border border-border bg-card transition-all hover:shadow-lg ${
              hidden ? "opacity-50" : ""
            }`}
          >
            {/* Image Container */}
            <div className="aspect-square overflow-hidden bg-secondary/20">
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            
            {/* Overlay with Info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                <p className="text-xs font-medium truncate">{photo.caption || "Untitled"}</p>
                {photo.date && <p className="text-[10px] opacity-75">{photo.date}</p>}
                {photo.place && <p className="text-[10px] opacity-75">📍 {photo.place}</p>}
                <div className="flex gap-1 mt-1">
                  {isDefault && (
                    <span className="text-[9px] px-1 py-0.5 bg-amber-500/80 rounded">Default</span>
                  )}
                  {hidden && (
                    <span className="text-[9px] px-1 py-0.5 bg-red-500/80 rounded">Hidden</span>
                  )}
                </div>
              </div>
            </div>

            {/* Delete Button - Always visible on hover */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="destructive"
                className="h-8 w-8 p-0 text-xs rounded-full"
                onClick={() => handleDeletePhoto(photo.id, photo.caption)}
                title="Delete photo"
              >
                🗑️
              </Button>
            </div>

            {/* Badge */}
            <div className="absolute top-2 left-2">
              {isDefault && (
                <span className="text-[9px] px-1.5 py-0.5 bg-amber-500/90 text-white rounded">Default</span>
              )}
              {hidden && (
                <span className="text-[9px] px-1.5 py-0.5 bg-red-500/90 text-white rounded">Hidden</span>
              )}
            </div>

            {/* Edit Fields - Auto-save on change */}
            <div className="p-2 border-t border-border bg-white dark:bg-gray-800">
              <Input
                value={photo.caption}
                onChange={(e) => handleUpdatePhoto(photo.id, { caption: e.target.value })}
                placeholder="Caption"
                className="text-xs h-7 mb-1"
              />
              <div className="flex gap-1">
                <Input
                  value={photo.date ?? ""}
                  onChange={(e) => handleUpdatePhoto(photo.id, { date: e.target.value || undefined })}
                  placeholder="Date"
                  className="text-xs h-7 w-1/2"
                />
                <Input
                  value={photo.place ?? ""}
                  onChange={(e) => handleUpdatePhoto(photo.id, { place: e.target.value || undefined })}
                  placeholder="Place"
                  className="text-xs h-7 w-1/2"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">📷 No photos in gallery</p>
          <p className="text-sm">Use the upload form above to add photos</p>
        </div>
      )}

      {/* Stats Footer */}
      <div className="mt-4 pt-3 border-t border-border text-xs text-muted-foreground flex justify-between">
        <span>Total Photos: {items.length}</span>
        <span>Default: {items.filter(i => i.isDefault).length} | Uploaded: {items.filter(i => !i.isDefault).length}</span>
      </div>
    </div>
  );
}