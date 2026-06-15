import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getSideNav } from "@/lib/navOverrides";
import type { NavItem } from "@/lib/pages";

export function Sidebar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [nav, setNav] = useState<NavItem[]>(() => getSideNav());

  useEffect(() => {
    const update = () => setNav(getSideNav());
    update();
    window.addEventListener("nav-overrides-changed", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("nav-overrides-changed", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  const renderLink = (label: string, slug?: string, to?: string, cls = "") => {
    if (to) {
      const external = /^https?:\/\//.test(to);
      if (external)
        return (
          <a href={to} target="_blank" rel="noreferrer" className={cls}>
            {label}
          </a>
        );
      return (
        <Link to={to} className={cls}>
          {label}
        </Link>
      );
    }
    return (
      <Link to="/$slug" params={{ slug: slug! }} className={cls}>
        {label}
      </Link>
    );
  };

  return (
    <aside className="w-full">
      <ul className="border border-border rounded-md overflow-hidden bg-card">
        {nav.map((item, i) => {
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
                          {renderLink(
                            c.label,
                            c.slug,
                            c.to,
                            "block pl-6 pr-4 py-2 text-sm text-brand hover:underline",
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                renderLink(
                  item.label,
                  item.slug,
                  item.to,
                  "block px-4 py-3 text-sm text-muted-foreground hover:bg-secondary",
                )
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
