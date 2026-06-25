// components/DocSection.tsx
import { useDocSection } from "@/lib/docsStore";
import { useState } from "react";

interface DocSectionProps {
  slug: string;
  showUpload?: boolean; // optionally enable upload for admin
}

export function DocSection({ slug, showUpload = false }: DocSectionProps) {
  const { info, files, isLoading, error, refetch, addDocument, deleteDocument } =
    useDocSection(slug);
  const [selectedFile, setSelectedFile] = useState<{ name: string; dataUrl: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleView = (dataUrl: string, name: string) => {
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(`
        <html>
          <head>
            <title>${name}</title>
            <style>
              body { margin:0; padding:0; height:100vh; overflow:hidden; background:#f5f5f5; display:flex; justify-content:center; align-items:center; flex-direction:column; }
              .container { width:100%; height:100vh; display:flex; flex-direction:column; }
              .header { padding:10px 20px; background:#fff; border-bottom:1px solid #ddd; display:flex; justify-content:space-between; align-items:center; }
              .header h3 { margin:0; font-size:14px; color:#333; }
              .header a { background:#8B4513; color:white; padding:6px 12px; text-decoration:none; border-radius:4px; font-size:12px; }
              .header a:hover { opacity:0.8; }
              .pdf-container { flex:1; width:100%; }
              .pdf-container embed { width:100%; height:100%; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h3>📄 ${name}</h3>
                <div>
                  <a href="${dataUrl}" download="${name}">⬇️ Download</a>
                  <button onclick="window.close()" style="margin-left:10px;padding:6px 12px;border:none;background:#dc3545;color:white;border-radius:4px;cursor:pointer;font-size:12px;">✕ Close</button>
                </div>
              </div>
              <div class="pdf-container">
                <embed src="${dataUrl}" type="application/pdf" width="100%" height="100%" />
              </div>
            </div>
          </body>
        </html>
      `);
      win.document.close();
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    try {
      // Optional: ask for batch
      const batch = prompt("Enter batch (e.g., 2022) or leave empty:", "");
      await addDocument(file, batch || undefined);
      e.target.value = ""; // reset input
    } catch (err: any) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this document?")) return;
    try {
      await deleteDocument(id);
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (isLoading) {
    return <div className="p-4 text-sm text-muted-foreground">Loading documents...</div>;
  }

  if (error) {
    return <div className="p-4 text-sm text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-5">
      {info && (
        <div className="border-l-4 border-brand bg-secondary/40 p-4 rounded-r-md">
          <p className="text-foreground leading-relaxed whitespace-pre-line">{info}</p>
        </div>
      )}

      {showUpload && (
        <div className="flex items-center gap-4">
          <label className="cursor-pointer bg-brand text-white px-4 py-2 rounded-md text-sm hover:bg-brand/80 transition-colors">
            {uploading ? "Uploading..." : "Upload Document"}
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
          {uploadError && <span className="text-sm text-red-500">{uploadError}</span>}
        </div>
      )}

      <div>
        <h3 className="text-sm font-semibold text-brand mb-2">Available Documents</h3>
        {files.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">
            No documents uploaded yet. Please check back soon.
          </p>
        ) : (
          <ul className="divide-y divide-border border border-border rounded-md bg-card">
            {files.map((f) => (
              <li
                key={f.id}
                className="flex flex-col gap-3 p-3 hover:bg-secondary/40 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className="text-red-600 text-lg shrink-0">📄</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{f.name}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {(f.size / 1024).toFixed(0)} KB · Added{" "}
                      {new Date(f.addedAt).toLocaleDateString()}
                    </p>
                    {f.batch && (
                      <p className="text-[11px] text-muted-foreground mt-1">Batch: {f.batch}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleView(f.dataUrl, f.name)}
                    className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition-colors flex items-center gap-1"
                  >
                    <span>👁️</span> View
                  </button>
                  <a
                    href={f.dataUrl}
                    download={f.name}
                    className="text-xs bg-brand text-white px-3 py-1.5 rounded hover:opacity-90 transition-colors flex items-center gap-1"
                  >
                    <span>⬇️</span> Download
                  </a>
                  {showUpload && (
                    <button
                      onClick={() => handleDelete(Number(f.id))}
                      className="text-xs bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}