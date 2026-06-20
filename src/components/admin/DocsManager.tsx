// components/admin/DocsManager.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DOC_SECTIONS,
  getSection,
  setSection,
  resetSection,
  newDocId,
  type DocSection as DocSectionT,
} from "@/lib/docsStore";

interface DocsManagerProps {
  setSavedMsg: (msg: string) => void;
}

export function DocsManager({ setSavedMsg }: DocsManagerProps) {
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

export default DocsManager;