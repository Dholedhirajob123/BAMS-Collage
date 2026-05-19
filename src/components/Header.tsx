import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { TOP_NAV, type NavItem } from "@/lib/pages";

function linkFor(item: NavItem) {
  if (item.to) return item.to;
  if (item.slug) return `/${item.slug}`;
  return "#";
}

export function Header() {
  const [openMobile, setOpenMobile] = useState(false);

  return (
    <header className="bg-white border-b border-border">
      {/* Top info bar */}
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="flex items-center gap-3">
            <div className="h-16 w-16 rounded-full border-2 border-saffron flex items-center justify-center bg-saffron-soft shrink-0">
              <span className="text-saffron font-bold text-xs text-center leading-tight">
                SSAM<br />Nashik
              </span>
            </div>
            <div>
              <h1 className="text-brand font-bold text-lg leading-tight">
                Shree Saptashrungi Ayurved Mahavidyalaya & Hospital
              </h1>
              <p className="text-brand font-semibold text-sm">
                श्री सप्तश्रृंगी आयुर्वेद महाविद्यालय व हॉस्पिटल
              </p>
              <p className="text-xs text-muted-foreground">
                Kamal Nagar, Hirawadi, Panchavati, Nashik - 422003
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-naac flex flex-col items-center justify-center text-white shadow">
              <span className="text-[8px] font-semibold">ACCREDITED</span>
              <span className="text-xl font-bold leading-none">B++</span>
              <span className="text-[8px] font-semibold">NAAC</span>
            </div>
          </div>

          <ul className="text-xs text-foreground space-y-1">
            <li><strong>Institution Code :</strong> NCISM- AYU 0181</li>
            <li><strong>College Code :</strong> MUHS - 123302</li>
            <li><strong>Admission Process :</strong> MH CET CELL College Code : 3126</li>
            <li><strong>Email :</strong> ssamnsk@gmail.com</li>
            <li><strong>Landline :</strong> +91 253 2621565</li>
            <li><strong>No. Of Visitor(s) :</strong> 672405</li>
          </ul>
        </div>
      </div>

      {/* Nav bar */}
      <nav className="bg-brand text-white">
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-between">
          <button
            className="md:hidden py-3 text-sm font-medium"
            onClick={() => setOpenMobile((v) => !v)}
          >
            Menu ▾
          </button>

          <ul className={`${openMobile ? "flex" : "hidden"} md:flex flex-col md:flex-row w-full md:w-auto`}>
            {TOP_NAV.map((item) => (
              <li key={item.label} className="relative group">
                {item.children ? (
                  <>
                    <button className="px-4 py-3 text-sm font-medium hover:bg-brand-dark w-full text-left flex items-center gap-1">
                      {item.label} <span className="text-xs">▾</span>
                    </button>
                    <ul className="md:absolute md:left-0 md:top-full md:min-w-[240px] bg-white text-foreground shadow-lg border border-border z-40 hidden group-hover:block md:group-hover:block">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            to="/$slug"
                            params={{ slug: child.slug! }}
                            onClick={() => setOpenMobile(false)}
                            className="block px-4 py-2 text-sm hover:bg-secondary border-b border-border last:border-b-0"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : item.to ? (
                  <Link
                    to={item.to}
                    onClick={() => setOpenMobile(false)}
                    className="block px-4 py-3 text-sm font-medium hover:bg-brand-dark"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    to="/$slug"
                    params={{ slug: item.slug! }}
                    onClick={() => setOpenMobile(false)}
                    className="block px-4 py-3 text-sm font-medium hover:bg-brand-dark"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
