import { Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { TOP_NAV, type NavItem } from "@/lib/pages";
import logoAsset from "@/assets/main logo.png";
import Drlogo from "@/assets/Dr  logo.png";

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
  <div className="mx-auto max-w-7xl px-4 py-1.5">
    <div className="flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-0">
      {/* Left side - Quick Links */}
      <div className="hidden md:flex items-center gap-3">
        <span className="text-xs font-semibold text-white tracking-wide">
          AFFILIATED TO MUHS (NASHIK)
        </span>
      </div>

      {/* Right side - Contact Info */}
      <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-center">
        {/* Email */}
        <a 
          href="mailto:rajshreeayurvedic@gmail.com"
          className="flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-xs font-medium text-white">
            rajshreeayurvedic@gmail.com
          </span>
        </a>

        {/* Separator */}
        <div className="hidden sm:block w-px h-3 bg-white/30"></div>

        {/* Phone */}
        <div className="flex items-center gap-1">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <a href="tel:+918087203870" className="text-xs font-medium text-white hover:underline">
            +91-8087203870
          </a>
          <span className="text-white/40 text-xs hidden sm:inline">|</span>
          <a href="tel:+918087303870" className="text-xs font-medium text-white hover:underline hidden sm:inline">
            +91-8087303870
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Main Header */}
  <div className="bg-white shadow-md">
  <div className="mx-auto max-w-7xl px-4 py-2">
    <div className="flex items-center justify-between gap-2 md:gap-4">
      <div className="hidden md:flex flex-shrink-0">
        <div className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 flex items-center justify-center">
          <img
            src={logoAsset}
            alt="Rajashri Ayurvedic Medical College"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <div className="flex-1 text-center">
        <p className="text-brand font-semibold text-[10px] md:text-xs lg:text-sm mb-0.5 tracking-wide">
          Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha's
        </p>
        <h1 className="text-brand font-extrabold text-xs md:text-2xl lg:text-3xl xl:text-4xl leading-tight tracking-tight">
          RAJASHRI AYURVEDIC <br className="hidden sm:block" />
          MEDICAL COLLEGE & HOSPITAL
        </h1>
        <div className="flex items-center justify-center gap-1 mt-0.5">
          <div className="w-4 h-px bg-gradient-to-r from-amber-400 to-transparent hidden md:block"></div>
          <p className="text-[10px] md:text-xs text-muted-foreground flex items-center gap-0.5">
            <span>MEHKAR, DIST. BULDHANA, MAHARASHTRA</span>
          </p>
          <div className="w-4 h-px bg-gradient-to-l from-amber-400 to-transparent hidden md:block"></div>
        </div>
      </div>

      <div className="hidden md:flex flex-shrink-0">
        <div className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 flex items-center justify-center">
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
  <div className="mx-auto max-w-7xl px-4">
    <div className="flex items-center justify-between">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden py-2 text-sm font-medium flex items-center gap-2"
        onClick={() => setOpenMobile(!openMobile)}
      >
        <span className="text-lg">{openMobile ? "✕" : "☰"}</span>
        <span>{openMobile ? "Close" : "Menu"}</span>
      </button>

      {/* Desktop Navigation - Single line, no vertical padding */}
      <ul className="hidden md:flex md:flex-row md:items-center md:gap-0">
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

      {/* Mobile Navigation Overlay */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 top-[108px] bg-brand z-50 transform transition-transform duration-300 ease-in-out ${
          openMobile ? "translate-x-0" : "translate-x-full"
        } md:hidden overflow-y-auto`}
        style={{ height: "calc(100vh - 108px)" }}
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

      {/* Spacer for desktop - keeps nav centered */}
      <div className="hidden md:block w-8"></div>
    </div>
  </div>
</nav>
    </header>
  );
}