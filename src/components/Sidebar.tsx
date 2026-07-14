import { Link } from "react-router-dom";
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
      <Link to={`/${slug}`} className={cls}>
        {label}
      </Link>
    );
  };

  return (
    <aside className="w-full">
      <ul className="border-2 border-red-300 rounded-xl overflow-hidden bg-white shadow-lg">
        {nav.map((item, i) => {
          const hasChildren = !!item.children?.length;
          const isOpen = openIndex === i;
          return (
            <li key={item.label} className="border-b-2 border-red-200 last:border-b-0">
              {hasChildren ? (
                <>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full text-left px-4 py-3 text-sm text-black hover:bg-red-50 flex items-center justify-between font-bold transition-colors"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-red-600 font-bold">{isOpen ? "▴" : "▾"}</span>
                  </button>
                  {isOpen && (
                    <ul className="bg-red-50 border-t-2 border-red-200">
                      {item.children!.map((c) => (
                        <li key={c.label}>
                          {renderLink(
                            c.label,
                            c.slug,
                            c.to,
                            "block pl-6 pr-4 py-2 text-sm text-black hover:bg-red-100 font-bold transition-colors border-b border-red-200 last:border-b-0",
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
                  "block px-4 py-3 text-sm text-black hover:bg-red-50 font-bold transition-colors",
                )
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}