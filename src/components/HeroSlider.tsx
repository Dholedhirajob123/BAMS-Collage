// components/HeroSlider.tsx
import { useEffect, useState } from "react";
import campus1 from "@/assets/front view.jpg";
import campus2 from "@/assets/front view2.jpg";
import campus3 from "@/assets/campus-3.jpg";
import campus4 from "@/assets/campus-4.jpg";

const SLIDES = [
  {
    img: campus1,
    title: "Welcome to RAJASHRI AYURVEDIC MEDICAL COLLEGE & HOSPITAL",
    sub: "Premier BAMS College in Maharashtra — Mehkar, Dist. Buldhana",
  },
  {
    img: campus2,
    title: "Modern Ayurveda Hospital with 60 Beds",
    sub: "Operation Theatres • ICU • OPD & IPD Services • 24/7 Emergency Care",
  },
  {
    img: campus3,
    title: "Excellence in BAMS Education",
    sub: "Experienced Faculty • Modern Classrooms • Digital Library • Clinical Training",
  },
  {
    img: campus4,
    title: "Shape Your Career in Ayurveda",
    sub: "BAMS (60 Seats) • MUHS Affiliated • NCISM Approved • NAAC Accredited",
  },
];

export function HeroSlider() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full overflow-hidden rounded-xl shadow-xl border border-border bg-brand-dark mb-4 md:mb-6 group">
      <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[16/7] lg:aspect-[21/8]">
        {SLIDES.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === i ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={s.img}
              alt={s.title}
              width={1600}
              height={800}
              loading={idx === 0 ? "eager" : "lazy"}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            <div className="absolute inset-0 flex items-center">
              <div className="px-4 sm:px-6 md:px-10 lg:px-12 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl">
                <span className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[8px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider px-2 sm:px-3 py-0.5 sm:py-1 rounded-full mb-1.5 sm:mb-2 md:mb-3 shadow-lg">
                  BAMS College — Rajashri Ayurvedic Mehkar
                </span>
                <h2 className="text-white font-bold text-sm sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight drop-shadow-lg line-clamp-3 sm:line-clamp-2">
                  {s.title}
                </h2>
                <p className="mt-1 sm:mt-2 md:mt-3 text-white/95 text-[10px] sm:text-xs md:text-base lg:text-lg max-w-2xl drop-shadow line-clamp-2 sm:line-clamp-3">
                  {s.sub}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows - Hidden on mobile, visible on larger screens */}
      <button
        aria-label="Previous slide"
        onClick={() => setI((p) => (p - 1 + SLIDES.length) % SLIDES.length)}
        className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full bg-black/30 hover:bg-amber-500 text-white backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition focus:opacity-100 text-sm sm:text-base md:text-lg lg:text-xl"
      >
        ‹
      </button>
      <button
        aria-label="Next slide"
        onClick={() => setI((p) => (p + 1) % SLIDES.length)}
        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full bg-black/30 hover:bg-amber-500 text-white backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition focus:opacity-100 text-sm sm:text-base md:text-lg lg:text-xl"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-1.5 md:gap-2 z-10">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              idx === i 
                ? "w-4 sm:w-6 md:w-8 bg-gradient-to-r from-amber-500 to-orange-500" 
                : "w-1.5 sm:w-2 bg-white/60 hover:bg-white/90"
            }`}
          />
        ))}
      </div>

      {/* Slide Counter - Hide on mobile */}
      <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 bg-black/50 backdrop-blur rounded-full px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 text-[8px] sm:text-[10px] md:text-xs text-white">
        {i + 1} / {SLIDES.length}
      </div>
    </section>
  );
}