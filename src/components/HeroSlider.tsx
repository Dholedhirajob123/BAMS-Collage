import { useEffect, useState } from "react";
import campus1 from "@/assets/campus-1.jpg";
import campus2 from "@/assets/campus-2.jpg";
import campus3 from "@/assets/campus-3.jpg";
import campus4 from "@/assets/campus-4.jpg";

const SLIDES = [
  {
    img: campus1,
    title: "Welcome to RAJASHRI AYURVEDIC MEDICAL COLLEGE & HOSPITAL",
    sub: "Academic excellence in Ayurveda — Mehkar, Dist. Buldhana, Maharashtra",
  },
  {
    img: campus2,
    title: "220-Bed Modern Ayurveda Hospital",
    sub: "3 Operation Theatres • ICU • Sonography • X-Ray • OPD & IPD Services",
  },
  {
    img: campus3,
    title: "Teaching Pharmacy & Herbal Research",
    sub: "First digital library with advanced research laboratory and medicinal plant nursery",
  },
  {
    img: campus4,
    title: "Shaping Future Ayurveda Professionals",
    sub: "UG BAMS (100 seats) • PG in 9 specialties (54 seats) — NAAC B++ Accredited",
  },
];

export function HeroSlider() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full overflow-hidden rounded-xl shadow-xl border border-border bg-brand-dark mb-6 group">
      <div className="relative aspect-[16/7] md:aspect-[16/6]">
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
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="px-6 md:px-12 max-w-3xl">
                <span className="inline-block bg-saffron text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded mb-3">
                  Rajashri Ayurvedic Mehkar
                </span>
                <h2 className="text-white font-bold text-2xl md:text-4xl lg:text-5xl leading-tight drop-shadow-lg">
                  {s.title}
                </h2>
                <p className="mt-3 text-white/90 text-sm md:text-lg max-w-2xl">
                  {s.sub}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        aria-label="Previous slide"
        onClick={() => setI((p) => (p - 1 + SLIDES.length) % SLIDES.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
      >
        ‹
      </button>
      <button
        aria-label="Next slide"
        onClick={() => setI((p) => (p + 1) % SLIDES.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === i ? "w-8 bg-saffron" : "w-2 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
