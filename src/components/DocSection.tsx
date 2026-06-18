// components/DocSection.tsx
import { useDocSection } from "@/lib/docsStore";
import { useState } from "react";

export function DocSection({ slug }: { slug: string }) {
  const { info, files } = useDocSection(slug);
  const [selectedFile, setSelectedFile] = useState<{ name: string; dataUrl: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleView = (dataUrl: string, name: string) => {
    setIsLoading(true);
    // Open in new tab
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(`
        <html>
          <head>
            <title>${name}</title>
            <style>
              body { margin: 0; padding: 0; height: 100vh; overflow: hidden; background: #f5f5f5; display: flex; justify-content: center; align-items: center; flex-direction: column; }
              .container { width: 100%; height: 100vh; display: flex; flex-direction: column; }
              .header { padding: 10px 20px; background: #fff; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; }
              .header h3 { margin: 0; font-size: 14px; color: #333; }
              .header a { background: #8B4513; color: white; padding: 6px 12px; text-decoration: none; border-radius: 4px; font-size: 12px; }
              .header a:hover { opacity: 0.8; }
              .pdf-container { flex: 1; width: 100%; }
              .pdf-container embed { width: 100%; height: 100%; }
              .error-msg { text-align: center; padding: 40px; color: #666; }
              .error-msg a { color: #8B4513; text-decoration: underline; }
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
    setIsLoading(false);
  };

  const closeViewer = () => {
    setSelectedFile(null);
  };

  return (
    <div className="space-y-5">
      {info && (
        <div className="border-l-4 border-brand bg-secondary/40 p-4 rounded-r-md">
          <p className="text-foreground leading-relaxed whitespace-pre-line">{info}</p>
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
                    disabled={isLoading}
                    className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition-colors flex items-center gap-1 disabled:opacity-50"
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
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}