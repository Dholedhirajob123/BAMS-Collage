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
      <div className="border-b border-border bg-saffron-soft/40">
        <div className="mx-auto max-w-7xl px-4 py-4 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 items-center">
          <div className="h-20 w-20 rounded-full border-4 border-saffron flex items-center justify-center bg-white shrink-0 shadow mx-auto md:mx-0">
            <span className="text-saffron font-bold text-[10px] text-center leading-tight">
              RAJASHRI<br />AYURVEDIC<br />MEHKAR
            </span>
          </div>

          <div className="text-center">
            <p className="text-brand font-semibold text-sm">
              Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha's
            </p>
            <h1 className="text-brand font-bold text-xl md:text-2xl leading-tight tracking-wide">
              RAJASHRI AYURVEDIC MEDICAL COLLEGE & HOSPITAL,
              <br />MEHKAR, DIST. BULDHANA
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Affiliated to MUHS Nashik · Recognized by NCISM, New Delhi
            </p>
          </div>

          <div className="flex md:flex-col items-center gap-3">
            <div className="h-16 w-16 rounded-full bg-naac flex flex-col items-center justify-center text-white shadow shrink-0">
              <span className="text-[7px] font-semibold">ACCREDITED</span>
              <span className="text-lg font-bold leading-none">B++</span>
              <span className="text-[7px] font-semibold">NAAC</span>
            </div>
            <ul className="text-[11px] text-foreground space-y-0.5 md:text-right">
              <li><strong>Email:</strong> rajashriayurved@gmail.com</li>
              <li><strong>Phone:</strong> +91 7264 222333</li>
              <li><strong>College Code:</strong> MUHS-123302</li>
            </ul>
          </div>
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
