// routes/admin.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DocsManager,
  CouncilManager,
  DepartmentManager,
  StaffManager,
  GalleryManager,
} from "@/components/admin";
import {
  loadAdmins,
  addAdmin,
  updateAdmin,
  removeAdmin,
  verifyLogin,
  MAX_ADMINS,
  type Admin,
} from "@/lib/adminStore";

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

      <div className="mt-4">
        {activeTab === "pdf" && <DocsManager setSavedMsg={setSavedMsg} />}
        {activeTab === "council" && <CouncilManager setSavedMsg={setSavedMsg} />}
        {activeTab === "faculty" && <DepartmentManager setSavedMsg={setSavedMsg} />}
        {activeTab === "staff" && <StaffManager setSavedMsg={setSavedMsg} />}
        {activeTab === "gallery" && <GalleryManager setSavedMsg={setSavedMsg} />}
      </div>
    </div>
  );
}