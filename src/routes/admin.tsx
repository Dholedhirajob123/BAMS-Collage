import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SIDE_NAV } from "@/lib/pages";
import {
  getAdminPassword,
  setAdminPassword,
  loadOverrides,
  saveOverrides,
  keyFor,
  type OverridesMap,
} from "@/lib/navOverrides";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addPhoto, getAllForAdmin, removePhoto, restorePhoto } from "@/lib/galleryStore";


export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Panel" }] }),
  component: AdminPage,
});

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [err, setErr] = useState("");

  if (!authed) {
    return (
      <div className="mx-auto max-w-sm p-8 mt-10 border border-border rounded-md bg-card">
        <h1 className="text-2xl font-semibold text-brand mb-1">Admin Login</h1>
        <p className="text-xs text-muted-foreground mb-4">
          Default password: <code className="bg-secondary px-1 rounded">admin123</code>
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (pwInput === getAdminPassword()) {
              setAuthed(true);
              setErr("");
            } else {
              setErr("Incorrect password");
            }
          }}
          className="space-y-3"
        >
          <Label htmlFor="pw">Password</Label>
          <Input id="pw" type="password" value={pwInput} onChange={(e) => setPwInput(e.target.value)} autoFocus />
          {err && <p className="text-sm text-destructive">{err}</p>}
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          <Link to="/" className="hover:underline">← Back to site</Link>
        </p>
      </div>
    );
  }

  return <Editor onLogout={() => setAuthed(false)} />;
}

function Editor({ onLogout }: { onLogout: () => void }) {
  const [overrides, setOverrides] = useState<OverridesMap>(() => loadOverrides());
  const [savedMsg, setSavedMsg] = useState("");
  const [newPass, setNewPass] = useState("");

  const flatItems = useMemo(() => {
    const rows: { group: string | null; slug: string; defaultLabel: string; defaultUrl?: string }[] = [];
    SIDE_NAV.forEach((item) => {
      if (item.children?.length) {
        item.children.forEach((c) => {
          if (c.slug) rows.push({ group: item.label, slug: c.slug, defaultLabel: c.label });
          else if (c.to) rows.push({ group: item.label, slug: c.to, defaultLabel: c.label, defaultUrl: c.to });
        });
      } else if (item.slug) {
        rows.push({ group: null, slug: item.slug, defaultLabel: item.label });
      }
    });
    return rows;
  }, []);

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

  const reset = () => {
    if (!confirm("Reset all link customizations?")) return;
    setOverrides({});
    saveOverrides({});
  };

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Edit sidebar link names and target URLs.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/" className="text-sm text-brand hover:underline self-center">View Site</Link>
          <Button variant="outline" onClick={onLogout}>Logout</Button>
        </div>
      </div>

      {savedMsg && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md text-sm">{savedMsg}</div>
      )}

      <div className="flex gap-2 mb-6">
        <Button onClick={save}>Save Changes</Button>
        <Button variant="outline" onClick={reset}>Reset All</Button>
      </div>

      <div className="border border-border rounded-md overflow-hidden bg-card mb-8">
        <table className="w-full text-sm">
          <thead className="bg-secondary">
            <tr>
              <th className="text-left p-2">Section</th>
              <th className="text-left p-2">Original Label</th>
              <th className="text-left p-2">Custom Label</th>
              <th className="text-left p-2">Custom URL (optional)</th>
            </tr>
          </thead>
          <tbody>
            {flatItems.map((row) => {
              const k = keyFor(row.group, row.slug);
              const ov = overrides[k] || {};
              return (
                <tr key={k} className="border-t border-border">
                  <td className="p-2 text-muted-foreground text-xs">{row.group ?? "—"}</td>
                  <td className="p-2">{row.defaultLabel}</td>
                  <td className="p-2">
                    <Input
                      value={ov.label ?? ""}
                      placeholder={row.defaultLabel}
                      onChange={(e) => update(k, { label: e.target.value })}
                    />
                  </td>
                  <td className="p-2">
                    <Input
                      value={ov.url ?? ""}
                      placeholder={row.defaultUrl || `/${row.slug}`}
                      onChange={(e) => update(k, { url: e.target.value })}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="border border-border rounded-md p-5 bg-card max-w-md">
        <h2 className="font-semibold mb-2">Change Admin Password</h2>
        <div className="flex gap-2">
          <Input
            type="text"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            placeholder="New password"
          />
          <Button
            onClick={() => {
              if (newPass.length < 4) return alert("Min 4 characters");
              setAdminPassword(newPass);
              setNewPass("");
              alert("Password updated.");
            }}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}
