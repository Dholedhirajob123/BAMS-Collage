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
  dataUrl: string;
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

  const buildPdfDataUrl = (base64: string): string => {
    if (!base64) return "";
    if (base64.startsWith("data:application/pdf")) return base64;
    return `data:application/pdf;base64,${base64}`;
  };

  const mapDocument = (doc: any): DocFile => {
    const pdfData = doc.pdfData || doc.url || "";
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
    <div className="border-2 border-red-300 rounded-xl p-3 sm:p-5 bg-white shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4">
        <div>
          <h2 className="font-bold text-base sm:text-lg text-black mb-0.5 sm:mb-1">
            Page Information & PDF Documents
          </h2>
          <p className="text-[10px] sm:text-xs text-black font-bold">
            Edit the description and stage PDFs. Click <strong className="text-red-600">Save Changes</strong> to apply everything.
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

      {/* Select Section */}
      <div className="mb-4">
        <Label className="text-xs text-black font-bold">Select Section</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between mt-1 text-sm border-2 border-red-200 rounded-xl text-black font-bold hover:bg-red-50 bg-white"
            >
              {selectedSectionDisplay}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full min-w-[280px] sm:min-w-[300px] p-0 border-2 border-red-300 rounded-xl bg-white">
            <Command className="bg-white">
              <CommandInput 
                placeholder="Search sections..." 
                className="border-b-2 border-red-200 text-black font-bold placeholder:text-black/50"
              />
              <CommandList className="bg-white">
                <CommandEmpty className="text-black font-bold">No section found.</CommandEmpty>
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
                      className="text-black font-bold hover:bg-red-50 cursor-pointer border-b border-red-100 last:border-b-0"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4 text-red-600",
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
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent" />
          <p className="mt-2 text-sm text-black font-bold">Loading section data...</p>
        </div>
      ) : (
        <>
          {/* Description */}
          <div className="mb-4">
            <Label className="text-xs text-black font-bold">Information / Description</Label>
            <textarea
              className="w-full mt-1 border-2 border-red-200 rounded-xl p-2 bg-white text-sm text-black font-bold focus:ring-2 focus:ring-red-500 focus:border-red-500 min-h-[100px]"
              value={localInfo}
              onChange={(e) => setLocalInfo(e.target.value)}
              placeholder="Enter information text shown above the PDF list..."
            />
          </div>

          {/* Upload Controls */}
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-black font-bold">Batch/Year (optional)</Label>
              <Input
                value={batch}
                placeholder="e.g. BAMS 2025-26"
                className="mt-1 text-sm border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold bg-white"
                onChange={(e) => setBatch(e.target.value)}
              />
            </div>
            <div>
              <Label className="text-xs text-black font-bold">Select PDF to Stage</Label>
              <Input
                type="file"
                accept="application/pdf"
                className="mt-1 text-sm border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold bg-white"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) stagePdf(f);
                  e.target.value = "";
                }}
              />
            </div>
          </div>

          {/* Pending Uploads */}
          {pendingFiles.length > 0 && (
            <div className="mb-4 border-2 border-red-300 bg-red-50 rounded-xl p-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                <span className="text-sm font-bold text-red-600">
                  ⏳ Pending Uploads ({pendingFiles.length})
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 text-xs w-full sm:w-auto border-2 border-red-300 text-red-600 font-bold hover:bg-red-100 rounded-full bg-white"
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
              <ul className="divide-y divide-red-200">
                {pendingFiles.map((p) => (
                  <li
                    key={p.name}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 text-sm gap-2"
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-red-600">📄</span>
                      <span className="text-black font-bold break-all">{p.name}</span>
                      <span className="text-xs text-black font-bold">
                        (batch: {p.batch})
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 text-xs text-red-600 hover:text-red-700 font-bold w-full sm:w-auto hover:bg-red-100 rounded-full bg-white"
                      onClick={() => removePending(p.name)}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Uploaded Documents */}
          <div className="border-2 border-red-200 rounded-xl bg-white">
            <div className="bg-red-50 px-3 py-2 border-b-2 border-red-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 rounded-t-xl">
              <span className="text-xs font-bold text-black">
                Uploaded Documents ({files.length})
              </span>
              {files.length > 0 && (
                <Button
                  size="sm"
                  variant="destructive"
                  className="h-6 text-xs w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold rounded-full"
                  onClick={resetAllFiles}
                >
                  Delete All
                </Button>
              )}
            </div>
            {files.length === 0 ? (
              <p className="p-3 text-xs text-black font-bold italic">
                No PDFs uploaded for this section.
              </p>
            ) : (
              <ul className="divide-y divide-red-200">
                {files.map((f) => (
                  <li
                    key={f.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 text-xs hover:bg-red-50 gap-2"
                  >
                    <div className="min-w-0 flex-1 w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-red-600 flex-shrink-0">📄</span>
                        <p className="font-bold text-black truncate">{f.name}</p>
                      </div>
                      <div className="flex flex-wrap gap-3 mt-1 text-[10px] text-black font-bold">
                        <span>{(f.size / 1024).toFixed(0)} KB</span>
                        <span>
                          Added {new Date(f.addedAt).toLocaleDateString()}
                        </span>
                        {f.batch && (
                          <span className="text-red-600">🏷️ {f.batch}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <a
                        href={f.dataUrl}
                        download={f.name}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:underline font-bold text-xs px-2 py-1 bg-red-50 rounded-full text-center flex-1 sm:flex-none hover:bg-red-100 transition-colors"
                      >
                        View
                      </a>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-7 text-xs flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white font-bold rounded-full"
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