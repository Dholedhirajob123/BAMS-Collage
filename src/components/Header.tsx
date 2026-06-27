// components/Header.tsx
import { Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { TOP_NAV, type NavItem } from "@/lib/pages";
import logoAsset from "@/assets/mainlogo.png";
import Drlogo from "@/assets/drlogo.png";

function linkFor(item: NavItem) {
  if (item.to) return item.to;
  if (item.slug) return `/${item.slug}`;
  return "#";
}

export function Header() {
  const [openMobile, setOpenMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setOpenMobile(false);
        setOpenDropdown(null);
      }
    };
    
    if (openMobile) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [openMobile]);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const closeMenu = () => {
    setOpenMobile(false);
    setOpenDropdown(null);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top info bar */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 text-white">
        <div className="mx-auto max-w-7xl px-2 sm:px-4 py-1.5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-0">
            <div className="hidden md:flex items-center gap-3">
              <span className="text-xs font-semibold text-white tracking-wide">
                AFFILIATED TO MUHS (NASHIK)
              </span>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-wrap justify-center">
              <a 
                href="mailto:rajshreeayurvedic@gmail.com"
                className="flex items-center gap-1 hover:opacity-80 transition-opacity"
              >
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-[9px] sm:text-xs font-medium text-white truncate max-w-[120px] sm:max-w-none">
                  rajshreeayurvedic@gmail.com
                </span>
              </a>

              <div className="hidden sm:block w-px h-3 bg-white/30"></div>

              <div className="flex items-center gap-1">
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+918087203870" className="text-[9px] sm:text-xs font-medium text-white hover:underline">
                  +91-8087203870
                </a>
                <span className="text-white/40 text-[9px] hidden sm:inline">|</span>
                <a href="tel:+918087303870" className="text-[9px] sm:text-xs font-medium text-white hover:underline hidden sm:inline">
                  +91-8087303870
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - All content visible on all devices */}
      <div className="bg-white shadow-md">
        <div className="mx-auto max-w-7xl px-2 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-1 sm:gap-2 md:gap-4 lg:gap-6">
            {/* Left Logo */}
            <div className="flex-shrink-0">
              <div className="h-14 w-14 sm:h-20 sm:w-20 md:h-28 md:w-28 lg:h-36 lg:w-36 flex items-center justify-center">
                <img
                  src={logoAsset}
                  alt="Rajashri Ayurvedic Medical College"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            {/* Center - Full College Name - Everything visible */}
            <div className="flex-1 text-center px-1 sm:px-2">
              <p className="text-brand font-semibold text-[7px] sm:text-[11px] md:text-xs lg:text-sm mb-0.5 tracking-wide leading-tight">
                Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha's
              </p>
              <h1 className="text-brand font-extrabold text-[11px] sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl leading-tight tracking-tight">
                RAJASHRI AYURVEDIC
                <br className="hidden sm:block md:hidden" />
                <span> </span>
                MEDICAL COLLEGE & HOSPITAL
              </h1>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                <div className="w-1.5 sm:w-3 h-px bg-gradient-to-r from-amber-400 to-transparent"></div>
                <p className="text-[6px] sm:text-[10px] md:text-xs text-muted-foreground text-center leading-tight">
                  COTTON MARKET ROAD, MEHKAR, TQ. MEHKAR, DIST. BULDHANA, MAHARASHTRA
                </p>
                <div className="w-1.5 sm:w-3 h-px bg-gradient-to-l from-amber-400 to-transparent"></div>
              </div>
            </div>

            {/* Right Logo */}
            <div className="flex-shrink-0">
              <div className="h-14 w-14 sm:h-20 sm:w-20 md:h-28 md:w-28 lg:h-36 lg:w-36 flex items-center justify-center">
                <img
                  src={Drlogo}
                  alt="Doctor Logo"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-brand text-white relative">
        <div className="mx-auto max-w-7xl px-2 sm:px-4">
          <div className="flex items-center justify-between">
            {/* Menu Button - Shows on mobile AND tablet */}
            <button
              className="lg:hidden py-2 text-sm font-medium flex items-center gap-1.5"
              onClick={() => setOpenMobile(!openMobile)}
            >
              <span className="text-lg">{openMobile ? "✕" : "☰"}</span>
              <span className="text-xs">{openMobile ? "Close" : "Menu"}</span>
            </button>

            {/* Desktop Navigation - Only shows on desktop */}
            <ul className="hidden lg:flex lg:flex-row lg:items-center lg:gap-0">
              {TOP_NAV.map((item) => (
                <li key={item.label} className="relative group">
                  {item.children ? (
                    <>
                      <button className="px-3 py-2 text-sm font-medium hover:bg-brand-dark inline-flex items-center gap-1 whitespace-nowrap">
                        {item.label} <span className="text-xs">▾</span>
                      </button>
                      <ul className="absolute left-0 top-full min-w-[200px] bg-white text-foreground shadow-lg border border-border z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 rounded-md overflow-hidden">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              to="/$slug"
                              params={{ slug: child.slug! }}
                              className="block px-4 py-2 text-sm hover:bg-secondary border-b border-border last:border-b-0 whitespace-nowrap"
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
                      className="block px-3 py-2 text-sm font-medium hover:bg-brand-dark whitespace-nowrap"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <Link
                      to="/$slug"
                      params={{ slug: item.slug! }}
                      className="block px-3 py-2 text-sm font-medium hover:bg-brand-dark whitespace-nowrap"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile & Tablet Navigation Overlay */}
            <div
              ref={mobileMenuRef}
              className={`fixed inset-0 top-[100px] sm:top-[108px] bg-brand z-50 transform transition-transform duration-300 ease-in-out ${
                openMobile ? "translate-x-0" : "translate-x-full"
              } lg:hidden overflow-y-auto`}
              style={{ height: "calc(100vh - 100px)" }}
            >
              <div className="flex flex-col py-2">
                {TOP_NAV.map((item) => (
                  <div key={item.label} className="border-b border-white/20">
                    {item.children ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.label)}
                          className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-white/10 transition-colors"
                        >
                          <span className="text-sm font-medium">{item.label}</span>
                          <span className={`transform transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`}>
                            ▾
                          </span>
                        </button>
                        {openDropdown === item.label && (
                          <div className="bg-white/5 pl-4">
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                to="/$slug"
                                params={{ slug: child.slug! }}
                                onClick={closeMenu}
                                className="block px-4 py-2.5 text-sm hover:bg-white/10 transition-colors border-t border-white/10"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : item.to ? (
                      <Link
                        to={item.to}
                        onClick={closeMenu}
                        className="block px-4 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <Link
                        to="/$slug"
                        params={{ slug: item.slug! }}
                        onClick={closeMenu}
                        className="block px-4 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Spacer for desktop */}
            <div className="hidden lg:block w-8"></div>
          </div>
        </div>
      </nav>
    </header>
  );
}