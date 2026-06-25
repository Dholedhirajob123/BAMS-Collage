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
import { API_BASE_URL } from "@/lib/config";

// Remove adminStore imports that are not needed for login
// We'll keep the rest if they are used elsewhere
// import { loadAdmins, addAdmin, updateAdmin, removeAdmin, verifyLogin, MAX_ADMINS, type Admin } from "@/lib/adminStore";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Panel" }] }),
  component: AdminPage,
});

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [phone, setPhone] = useState("");
  const [pwInput, setPwInput] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password: pwInput }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const errorMsg = data.error || "Login failed. Please check your credentials.";
        throw new Error(errorMsg);
      }

      const data = await res.json();
      if (data.role === "ADMIN") {
        setAuthed(true);
        setErr("");
      } else {
        setErr("Access denied. Only administrators can log in.");
      }
    } catch (error) {
      setErr(error instanceof Error ? error.message : "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  if (!authed) {
    return (
      <div className="mx-auto max-w-sm p-8 mt-10 border border-border rounded-md bg-card">
        <h1 className="text-2xl font-semibold text-brand mb-1">Admin Login</h1>
        <p className="text-xs text-muted-foreground mb-4">
          Enter your admin credentials.
        </p>
        <form onSubmit={handleLogin} className="space-y-3">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            inputMode="numeric"
            maxLength={10}
            value={phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // allow only digits
              if (value.length <= 10) {
                setPhone(value);
              }
            }}
            autoFocus
            disabled={loading}
          />
          <Label htmlFor="pw">Password</Label>
          <Input
            id="pw"
            type="password"
            value={pwInput}
            onChange={(e) => setPwInput(e.target.value)}
            disabled={loading}
          />
          {err && <p className="text-sm text-destructive">{err}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Sign In"}
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
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeTab === tab.id
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