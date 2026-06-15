import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SIDE_NAV } from "@/lib/pages";
import { loadOverrides, saveOverrides, keyFor, type OverridesMap } from "@/lib/navOverrides";
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
  const [overrides, setOverrides] = useState<OverridesMap>(() => loadOverrides());
  const [savedMsg, setSavedMsg] = useState("");
  const [selectedOverride, setSelectedOverride] = useState<string>("");

  const flatItems = useMemo(() => {
    const rows: {
      group: string | null;
      slug: string;
      defaultLabel: string;
      defaultUrl?: string;
    }[] = [];
    SIDE_NAV.forEach((item) => {
      if (item.children?.length) {
        item.children.forEach((c) => {
          if (c.slug) rows.push({ group: item.label, slug: c.slug, defaultLabel: c.label });
          else if (c.to)
            rows.push({ group: item.label, slug: c.to, defaultLabel: c.label, defaultUrl: c.to });
        });
      } else if (item.slug) {
        rows.push({ group: null, slug: item.slug, defaultLabel: item.label });
      }
    });
    return rows;
  }, []);

  useEffect(() => {
    if (!selectedOverride && flatItems.length > 0) {
      setSelectedOverride(keyFor(flatItems[0].group, flatItems[0].slug));
    }
  }, [flatItems, selectedOverride]);

  const selectedNavItem = flatItems.find(
    (item) => keyFor(item.group, item.slug) === selectedOverride,
  );
  const currentOverride = overrides[selectedOverride] || {};

  const update = (k: string, patch: Partial<{ label: string; url: string }>) => {
    setOverrides((prev) => {
      const cur = prev[k] || {};
      const next = { ...cur, ...patch };
      if (!next.label && !next.url) {
        const { [k]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [k]: next };
    });
  };

  const save = () => {
    saveOverrides(overrides);
    setSavedMsg("✓ Saved. Changes are live across the site.");
    setTimeout(() => setSavedMsg(""), 2500);
  };

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Edit sidebar link names and target URLs.</p>
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

      <div className="flex gap-2 mb-6">
        <Button onClick={save}>Save Changes</Button>
      </div>

      <div className="mt-8 border border-border rounded-md p-5 bg-card">
        <h2 className="font-semibold text-lg mb-1">Sidebar Link Editor</h2>
        <p className="text-xs text-muted-foreground mb-4">
          Choose a sidebar item and update its label or URL. Admin changes apply immediately after
          saving.
        </p>

        <div className="grid gap-4 md:grid-cols-[1fr_1.6fr]">
          <div>
            <Label className="text-xs">Select Sidebar Item</Label>
            <select
              className="w-full mt-1 border border-border rounded-md p-2 bg-background text-sm"
              value={selectedOverride}
              onChange={(e) => setSelectedOverride(e.target.value)}
            >
              {flatItems.map((item) => (
                <option key={keyFor(item.group, item.slug)} value={keyFor(item.group, item.slug)}>
                  {item.group ? `${item.group} › ${item.defaultLabel}` : item.defaultLabel}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <div>
              <Label className="text-xs">Current Label</Label>
              <Input
                value={currentOverride.label ?? selectedNavItem?.defaultLabel ?? ""}
                onChange={(e) => update(selectedOverride, { label: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs">URL / Target</Label>
              <Input
                value={currentOverride.url ?? selectedNavItem?.defaultUrl ?? ""}
                onChange={(e) => update(selectedOverride, { url: e.target.value })}
                className="mt-1"
                placeholder="Leave blank to keep default slug"
              />
            </div>
          </div>
        </div>
      </div>

      <DocsManager />
      <CouncilManager />
      <GalleryManager />
      <StaffManager />
    </div>
  );
}

function DocsManager() {
  const [key, setKey] = useState<string>(DOC_SECTIONS[0].key);
  const [section, setSectionState] = useState<DocSectionT>(() => getSection(DOC_SECTIONS[0].key));
  const [msg, setMsg] = useState("");

  const reload = (k: string) => {
    setKey(k);
    setSectionState(getSection(k));
  };

  const commit = (next: DocSectionT) => {
    setSectionState(next);
    setSection(key, next);
  };

  const flash = (t: string) => {
    setMsg(t);
    setTimeout(() => setMsg(""), 2000);
  };

  const [batch, setBatch] = useState<string>("");

  const onPdf = (file: File) => {
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf"))
      return alert("Please upload a PDF file.");
    if (file.size > 4 * 1024 * 1024) return alert("PDF must be under 4MB.");
    const reader = new FileReader();
    reader.onload = () => {
      commit({
        ...section,
        files: [
          ...section.files,
          {
            id: newDocId(),
            name: file.name,
            dataUrl: reader.result as string,
            size: file.size,
            addedAt: Date.now(),
            batch: batch.trim() || undefined,
          },
        ],
      });
      flash("✓ PDF uploaded.");
      setBatch("");
    };
    reader.readAsDataURL(file);
  };

  const removeFile = (id: string) => {
    if (!confirm("Remove this PDF?")) return;
    commit({ ...section, files: section.files.filter((f) => f.id !== id) });
  };

  return (
    <div className="mt-8 border border-border rounded-md p-5 bg-card">
      <h2 className="font-semibold text-lg mb-1">Page Information & PDF Documents</h2>
      <p className="text-xs text-muted-foreground mb-4">
        Edit the information shown on each page and upload PDFs that visitors can download. Max 4MB
        per PDF.
      </p>

      {msg && <div className="mb-3 p-2 bg-green-100 text-green-800 rounded text-sm">{msg}</div>}

      <div className="mb-4">
        <Label className="text-xs">Select Section</Label>
        <select
          className="w-full mt-1 border border-border rounded-md p-2 bg-background text-sm"
          value={key}
          onChange={(e) => reload(e.target.value)}
        >
          {DOC_SECTIONS.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <Label className="text-xs">Information / Description</Label>
        <textarea
          className="w-full mt-1 border border-border rounded-md p-2 bg-background text-sm min-h-[100px]"
          value={section.info}
          onChange={(e) => commit({ ...section, info: e.target.value })}
          placeholder="Enter information text shown above the PDF list..."
        />
      </div>

      <div className="mb-4 grid gap-3">
        <div>
          <Label className="text-xs">Batch (optional)</Label>
          <Input
            value={batch}
            placeholder="e.g. BAMS 2025-26"
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
        {section.files.length === 0 ? (
          <p className="p-3 text-xs text-muted-foreground italic">No PDFs uploaded.</p>
        ) : (
          <ul className="divide-y divide-border">
            {section.files.map((f) => (
              <li key={f.id} className="flex items-center justify-between p-2 text-xs">
                <div className="min-w-0">
                  <p className="font-medium truncate">{f.name}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {(f.size / 1024).toFixed(0)} KB
                  </p>
                </div>
                <div className="flex gap-1 ml-2">
                  <a
                    href={f.dataUrl}
                    download={f.name}
                    className="text-brand hover:underline text-xs px-2 py-1"
                  >
                    View
                  </a>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-7 text-xs"
                    onClick={() => removeFile(f.id)}
                  >
                    ×
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function CouncilManager() {
  const [group, setGroup] = useState<CouncilKey>("iqac");
  const [members, setMembers] = useState<CouncilMember[]>(() => getCouncil("iqac"));

  const reload = (g: CouncilKey) => {
    setGroup(g);
    setMembers(getCouncil(g));
  };

  const commit = (next: CouncilMember[]) => {
    setMembers(next);
    setCouncil(group, next);
  };

  const updateRow = (id: string, patch: Partial<CouncilMember>) =>
    commit(members.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  const removeRow = (id: string) => {
    if (!confirm("Remove this member?")) return;
    commit(members.filter((m) => m.id !== id));
  };

  const addRow = () =>
    commit([
      ...members,
      { id: newCouncilId(), name: "", designation: "", position: "", phone: "", email: "" },
    ]);

  return (
    <div className="mt-8 border border-border rounded-md p-5 bg-card">
      <h2 className="font-semibold text-lg mb-1">Council / Committee Members</h2>
      <p className="text-xs text-muted-foreground mb-4">
        Choose a committee and edit its member list. Columns: Name, Designation, Position, Mobile
        No., Email ID.
      </p>

      <div className="mb-4">
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
                  <Input
                    value={m.name}
                    onChange={(e) => updateRow(m.id, { name: e.target.value })}
                  />
                </td>
                <td className="p-2">
                  <Input
                    value={m.designation}
                    onChange={(e) => updateRow(m.id, { designation: e.target.value })}
                  />
                </td>
                <td className="p-2">
                  <Input
                    value={m.position ?? ""}
                    onChange={(e) => updateRow(m.id, { position: e.target.value })}
                  />
                </td>
                <td className="p-2">
                  <Input
                    value={m.phone}
                    inputMode="tel"
                    onChange={(e) => updateRow(m.id, { phone: e.target.value })}
                  />
                </td>
                <td className="p-2">
                  <Input
                    value={m.email}
                    type="email"
                    onChange={(e) => updateRow(m.id, { email: e.target.value })}
                  />
                </td>
                <td className="p-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-7 text-xs"
                    onClick={() => removeRow(m.id)}
                  >
                    ×
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button className="mt-3" size="sm" onClick={addRow}>
        + Add Member
      </Button>
    </div>
  );
}

function StaffManager() {
  const [group, setGroup] = useState<StaffGroupKey>("hospital");
  const [members, setMembers] = useState<StaffMember[]>(() => getStaff("hospital"));

  const reload = (g: StaffGroupKey) => {
    setGroup(g);
    setMembers(getStaff(g));
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
  };

  const addRow = () =>
    commit([
      ...members,
      { id: newId(), name: "", designation: "", education: "", year: "", photo: "" },
    ]);

  const onPhoto = (id: string, file: File) => {
    if (!file.type.startsWith("image/")) return alert("Please choose an image file.");
    if (file.size > 2 * 1024 * 1024) return alert("Image must be under 2MB.");
    const reader = new FileReader();
    reader.onload = () => updateRow(id, { photo: reader.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div className="mt-8 border border-border rounded-md p-5 bg-card">
      <h2 className="font-semibold text-lg mb-1">Staff Management</h2>
      <p className="text-xs text-muted-foreground mb-4">
        Choose a staff group and edit faculty, hospital, or support staff entries.
      </p>

      <div className="mb-4">
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
                    <img
                      src={m.photo}
                      alt=""
                      className="h-12 w-12 rounded-full object-cover mb-1"
                    />
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
                  <Input
                    value={m.name}
                    onChange={(e) => updateRow(m.id, { name: e.target.value })}
                  />
                </td>
                <td className="p-2">
                  <Input
                    value={m.designation}
                    onChange={(e) => updateRow(m.id, { designation: e.target.value })}
                  />
                </td>
                <td className="p-2">
                  <Input
                    value={m.education}
                    onChange={(e) => updateRow(m.id, { education: e.target.value })}
                  />
                </td>
                <td className="p-2">
                  <Input
                    value={m.year}
                    onChange={(e) => updateRow(m.id, { year: e.target.value })}
                  />
                </td>
                <td className="p-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-7 text-xs"
                    onClick={() => removeRow(m.id)}
                  >
                    ×
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button className="mt-3" size="sm" onClick={addRow}>
        + Add Staff Member
      </Button>
    </div>
  );
}

function GalleryManager() {
  const [items, setItems] = useState(() => getAllForAdmin());
  const [caption, setCaption] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const refresh = () => setItems(getAllForAdmin());

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
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mt-8 border border-border rounded-md p-5 bg-card">
      <h2 className="font-semibold text-lg mb-1">Photo Gallery</h2>
      <p className="text-xs text-muted-foreground mb-4">
        Add or remove photos shown on the Photo Gallery page.
      </p>

      <div className="grid gap-3 mb-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Input
          placeholder="Caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="md:max-w-xs"
        />
        <Input
          placeholder="Date (optional)"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="md:max-w-xs"
        />
        <Input
          placeholder="Place (optional)"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          className="md:max-w-xs"
        />
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
            e.target.value = "";
          }}
        />
      </div>

      <div className="space-y-3">
        {items.map(({ photo, isDefault, hidden }) => (
          <div
            key={photo.id}
            className={`border border-border rounded-md overflow-hidden bg-card ${hidden ? "opacity-40" : ""}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 p-3">
              <img
                src={photo.src}
                alt={photo.caption}
                className="h-40 w-full rounded-md object-cover md:h-full"
              />
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-xs font-semibold">
                    {isDefault ? "Default" : "Uploaded"}
                  </span>
                  {hidden && <span className="text-[10px] text-muted-foreground">Hidden</span>}
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <Input
                    value={photo.caption}
                    onChange={(e) => {
                      const next = e.target.value;
                      updatePhoto(photo.id, { caption: next });
                      refresh();
                    }}
                    placeholder="Caption"
                  />
                  <Input
                    value={photo.date ?? ""}
                    onChange={(e) => {
                      const next = e.target.value;
                      updatePhoto(photo.id, { date: next || undefined });
                      refresh();
                    }}
                    placeholder="Date"
                  />
                  <Input
                    value={photo.place ?? ""}
                    onChange={(e) => {
                      const next = e.target.value;
                      updatePhoto(photo.id, { place: next || undefined });
                      refresh();
                    }}
                    placeholder="Place"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {hidden ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7"
                      onClick={() => {
                        restorePhoto(photo.id);
                        refresh();
                      }}
                    >
                      Restore
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="text-xs h-7"
                      onClick={() => {
                        removePhoto(photo.id);
                        refresh();
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
