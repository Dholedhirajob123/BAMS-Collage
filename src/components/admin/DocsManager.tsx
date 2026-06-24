// components/admin/DocsManager.tsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getDocuments,
  uploadDocument,
  deleteDocument,
  getSectionInfo,
  updateSectionInfo,
  getSections,
} from "@/lib/apis";
import { API_BASE_URL } from "@/lib/config";

// Shadcn combobox components
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

interface DocsManagerProps {
  setSavedMsg: (msg: string) => void;
}

interface DocFile {
  id: string;
  name: string;
  dataUrl: string;      // will be a full data:application/pdf;base64,...
  size: number;
  addedAt: number;
  batch?: string;
}

interface PendingFile {
  file: File;
  batch: string;
  name: string;
}

export function DocsManager({ setSavedMsg }: DocsManagerProps) {
  const [sections, setSections] = useState<any[]>([]);
  const [selectedKey, setSelectedKey] = useState("");
  const [localInfo, setLocalInfo] = useState("");
  const [files, setFiles] = useState<DocFile[]>([]);
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [batch, setBatch] = useState("");

  const [open, setOpen] = useState(false);

  // Helper to build a PDF data URL from a Base64 string
  const buildPdfDataUrl = (base64: string): string => {
    if (!base64) return "";
    // If it already starts with data:application/pdf, return as is
    if (base64.startsWith("data:application/pdf")) return base64;
    // If it's a raw Base64 string (no prefix), add the prefix
    return `data:application/pdf;base64,${base64}`;
  };

  // Transform the backend document object into our frontend DocFile
  const mapDocument = (doc: any): DocFile => {
    // The backend returns { id, name, pdfData, size, batch, addedAt, ... }
    // We need to build the dataUrl from pdfData
    const pdfData = doc.pdfData || doc.url || ""; // fallback
    return {
      id: String(doc.id),
      name: doc.name,
      dataUrl: buildPdfDataUrl(pdfData),
      size: doc.size,
      addedAt: doc.addedAt ? new Date(doc.addedAt).getTime() : Date.now(),
      batch: doc.batch,
    };
  };

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = async () => {
    try {
      const data = await getSections();
      setSections(data);
      if (data.length > 0) {
        setSelectedKey(data[0].sectionKey);
        await loadSectionData(data[0].sectionKey);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadSectionData = async (key: string) => {
    setIsLoading(true);
    setSelectedKey(key);
    setPendingFiles([]);
    setBatch("");
    try {
      const [docs, infoRes] = await Promise.all([
        getDocuments(key),
        getSectionInfo(key),
      ]);
      setLocalInfo(infoRes?.info || "");
      setFiles(docs.map(mapDocument));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshFiles = async (key: string) => {
    try {
      const docs = await getDocuments(key);
      setFiles(docs.map(mapDocument));
    } catch (e) {
      console.error(e);
    }
  };

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      await updateSectionInfo(selectedKey, { info: localInfo });

      for (const p of pendingFiles) {
        const formData = new FormData();
        formData.append("sectionKey", selectedKey);
        formData.append("name", p.name);
        formData.append("batch", p.batch);
        formData.append("file", p.file);
        await uploadDocument(formData);
      }

      setPendingFiles([]);
      setBatch("");

      await refreshFiles(selectedKey);

      const currentSection = sections.find((s) => s.sectionKey === selectedKey);
      setSavedMsg(
        `✓ "${currentSection?.sectionKey}" saved with ${pendingFiles.length} new PDF(s).`
      );
      setTimeout(() => setSavedMsg(""), 3000);
    } catch (e) {
      console.error(e);
      setSavedMsg("✗ Failed to save changes.");
      setTimeout(() => setSavedMsg(""), 2000);
    } finally {
      setIsSaving(false);
    }
  };

  const flash = (msg: string) => {
    setSavedMsg(msg);
    setTimeout(() => setSavedMsg(""), 2000);
  };

  const stagePdf = (file: File) => {
    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      alert("Please upload a PDF file.");
      return;
    }

    if (pendingFiles.some((p) => p.name === file.name)) {
      alert(`"${file.name}" is already in the pending upload list.`);
      return;
    }

    setPendingFiles((prev) => [
      ...prev,
      { file, batch: batch.trim() || "Uncategorized", name: file.name },
    ]);
    flash(`📎 "${file.name}" staged for upload.`);
  };

  const removePending = (name: string) => {
    setPendingFiles((prev) => prev.filter((p) => p.name !== name));
    flash(`⛔ Removed "${name}" from pending uploads.`);
  };

  const removeFile = async (id: string, fileName: string) => {
    if (!confirm(`Remove "${fileName}"?`)) return;
    try {
      await deleteDocument(Number(id));
      flash(`✓ "${fileName}" removed`);
      await refreshFiles(selectedKey);
    } catch (e) {
      console.error(e);
      flash(`✗ Failed to remove "${fileName}"`);
    }
  };

  const resetAllFiles = () => {
    if (
      !confirm(
        `Delete ALL ${files.length} PDFs from this section? This cannot be undone.`
      )
    )
      return;
    setFiles([]);
    flash("✓ All PDFs removed from view. Use individual delete to remove from server.");
  };

  const formatSectionKey = (key: string) => key.replaceAll("-", " ");

  const selectedSectionDisplay = selectedKey
    ? formatSectionKey(selectedKey)
    : "Select a section...";

  return (
    <div className="border border-border rounded-md p-5 bg-card">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-semibold text-lg mb-1">
            Page Information & PDF Documents
          </h2>
          <p className="text-xs text-muted-foreground">
            Edit the description and stage PDFs. Click <strong>Save Changes</strong> to apply everything.
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

      <div className="mb-4">
        <Label className="text-xs">Select Section</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between mt-1"
            >
              {selectedSectionDisplay}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full min-w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Search sections..." />
              <CommandList>
                <CommandEmpty>No section found.</CommandEmpty>
                <CommandGroup>
                  {sections.map((s) => (
                    <CommandItem
                      key={s.id}
                      value={s.sectionKey}
                      onSelect={(currentValue) => {
                        setSelectedKey(currentValue);
                        setOpen(false);
                        loadSectionData(currentValue);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedKey === s.sectionKey
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {formatSectionKey(s.sectionKey)}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
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
              value={localInfo}
              onChange={(e) => setLocalInfo(e.target.value)}
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
              <Label className="text-xs">Select PDF to Stage</Label>
              <Input
                type="file"
                accept="application/pdf"
                className="mt-1"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) stagePdf(f);
                  e.target.value = "";
                }}
              />
            </div>
          </div>

          {pendingFiles.length > 0 && (
            <div className="mb-4 border border-yellow-300 bg-yellow-50 dark:bg-yellow-950/20 rounded-md p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">
                  ⏳ Pending Uploads ({pendingFiles.length})
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 text-xs"
                  onClick={() => {
                    if (confirm("Clear all pending uploads?")) {
                      setPendingFiles([]);
                      flash("Pending uploads cleared.");
                    }
                  }}
                >
                  Clear All
                </Button>
              </div>
              <ul className="divide-y divide-yellow-200 dark:divide-yellow-800">
                {pendingFiles.map((p) => (
                  <li
                    key={p.name}
                    className="flex items-center justify-between py-2 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-600">📄</span>
                      <span>{p.name}</span>
                      <span className="text-xs text-muted-foreground">
                        (batch: {p.batch})
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 text-xs text-red-500 hover:text-red-700"
                      onClick={() => removePending(p.name)}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="border border-border rounded-md">
            <div className="bg-secondary px-3 py-2 border-b border-border flex justify-between items-center">
              <span className="text-xs font-semibold">
                Uploaded Documents ({files.length})
              </span>
              {files.length > 0 && (
                <Button
                  size="sm"
                  variant="destructive"
                  className="h-6 text-xs"
                  onClick={resetAllFiles}
                >
                  Delete All (UI only)
                </Button>
              )}
            </div>
            {files.length === 0 ? (
              <p className="p-3 text-xs text-muted-foreground italic">
                No PDFs uploaded for this section.
              </p>
            ) : (
              <ul className="divide-y divide-border">
                {files.map((f) => (
                  <li
                    key={f.id}
                    className="flex items-center justify-between p-3 text-xs hover:bg-secondary/30"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-red-500">📄</span>
                        <p className="font-medium truncate">{f.name}</p>
                      </div>
                      <div className="flex flex-wrap gap-3 mt-1 text-[10px] text-muted-foreground">
                        <span>{(f.size / 1024).toFixed(0)} KB</span>
                        <span>
                          Added {new Date(f.addedAt).toLocaleDateString()}
                        </span>
                        {f.batch && (
                          <span className="text-brand">🏷️ {f.batch}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-2">
                      <a
                        href={f.dataUrl} // direct data URL
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