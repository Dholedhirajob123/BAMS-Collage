import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { SIDE_NAV } from "@/lib/pages";

export function Sidebar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <aside className="w-full">
      <ul className="border border-border rounded-md overflow-hidden bg-card">
        {SIDE_NAV.map((item, i) => {
          const hasChildren = !!item.children?.length;
          const isOpen = openIndex === i;
          return (
            <li key={item.label} className="border-b border-border last:border-b-0">
              {hasChildren ? (
                <>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full text-left px-4 py-3 text-sm text-muted-foreground hover:bg-secondary flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs">{isOpen ? "▴" : "▾"}</span>
                  </button>
                  {isOpen && (
                    <ul className="bg-secondary/50">
                      {item.children!.map((c) => (
                        <li key={c.label}>
                          <Link
                            to="/$slug"
                            params={{ slug: c.slug! }}
                            className="block pl-6 pr-4 py-2 text-sm text-brand hover:underline"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to="/$slug"
                  params={{ slug: item.slug! }}
                  className="block px-4 py-3 text-sm text-muted-foreground hover:bg-secondary"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
