import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { TOP_NAV, type NavItem } from "@/lib/pages";
import logoAsset from "@/assets/college-logo.png.asset.json";

function linkFor(item: NavItem) {
  if (item.to) return item.to;
  if (item.slug) return `/${item.slug}`;
  return "#";
}

export function Header() {
  const [openMobile, setOpenMobile] = useState(false);
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animated counter for students/patients


  return (
    <header className="sticky top-0 z-50">
      {/* Top info bar with animated counter */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 text-white">
        <div className="mx-auto max-w-7xl px- py-3">
          <div className="flex justify-between items-center">
  {/* Left side - Quick Links */}
  <div className="hidden md:flex items-center gap-6 text-xs">
           <span className="text-sm font-bold text-white">AFFILIATED TO MUHS (NASHIK)</span>

   
  </div>

  {/* Right side - Simple Emergency Badge */}
  <div className="flex items-center gap-3">
    {/* Emergency Badge */}
    <div className="flex items-center gap-1.5 px-3 py-1">

      <span className="text-xs font-bold text-white">rajshreeayurvedic@gmail.com</span>
    </div>

    {/* Simple Counter */}
    <div className="px-3 py-1">
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-bold text-white"> +91 - 8087203870 | 8087303870 </span>
      </div>
    </div>
  </div>
</div>
        </div>
      </div>

      {/* Main Header with Logo and Title */}
      <div className="bg-white shadow-md">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and College Name */}
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 flex items-center justify-center shrink-0">
                <img
                  src={logoAsset.url}
                  alt="Rajashri Ayurvedic Medical College"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <p className="text-brand font-semibold text-xs">
                  Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha's
                </p>
                <h1 className="text-brand font-bold text-lg md:text-xl leading-tight">
                  RAJASHRI AYURVEDIC MEDICAL COLLEGE & HOSPITAL
                </h1>
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <span>📍 Mehkar, Dist. Buldhana</span>
                  <span>•</span>
                  <span>🎓 Est. 2005</span>
                  <span>•</span>
                  <span>✅ NCISM Approved</span>
                </p>
              </div>
            </div>

        
          </div>
        </div>
      </div>

      {/* Navigation Bar - UNCHANGED */}
      <nav className="bg-brand text-white">
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-between">
          <button
            className="md:hidden py-3 text-sm font-medium"
            onClick={() => setOpenMobile((v) => !v)}
          >
            Menu ▾
          </button>

          <ul
            className={`${openMobile ? "flex" : "hidden"} md:flex flex-col md:flex-row w-full md:w-auto`}
          >
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