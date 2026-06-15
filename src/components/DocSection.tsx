import { useDocSection } from "@/lib/docsStore";

export function DocSection({ slug }: { slug: string }) {
  const { info, files } = useDocSection(slug);
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
                <a
                  href={f.dataUrl}
                  download={f.name}
                  className="text-xs bg-brand text-white px-3 py-1.5 rounded hover:opacity-90 shrink-0 ml-3"
                >
                  Download PDF
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
