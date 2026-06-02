import { useState } from "react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import g7 from "@/assets/gallery-7.jpg";
import g8 from "@/assets/gallery-8.jpg";
import aboutHero from "@/assets/about-hero.jpg";
import campus1 from "@/assets/campus-1.jpg";
import campus2 from "@/assets/campus-2.jpg";
import campus3 from "@/assets/campus-3.jpg";
import campus4 from "@/assets/campus-4.jpg";

const GALLERY = [
  { src: g1, caption: "Digital Library" },
  { src: g2, caption: "Medicinal Herbal Garden" },
  { src: g3, caption: "Panchakarma Therapy Room" },
  { src: g4, caption: "Research Laboratory" },
  { src: g5, caption: "Cultural Festival" },
  { src: g6, caption: "Annual Sports Day" },
  { src: g7, caption: "220-Bed Hospital Ward" },
  { src: g8, caption: "Convocation Ceremony" },
  { src: campus1, caption: "College Building" },
  { src: campus2, caption: "Hospital Block" },
  { src: campus3, caption: "Teaching Pharmacy" },
  { src: campus4, caption: "Graduating Batch" },
];

function PhotoGallery() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Glimpses of campus life, academics, hospital, sports and cultural events at SSAM Nashik.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {GALLERY.map((g, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="group relative overflow-hidden rounded-md border border-border bg-card animate-fade-in"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <img
              src={g.src}
              alt={g.caption}
              loading="lazy"
              width={1024}
              height={1024}
              className="aspect-square object-cover w-full transition-transform duration-500 group-hover:scale-110"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent text-white text-xs p-2 text-left translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
              {g.caption}
            </span>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActive(null)}
        >
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={GALLERY[active].src}
              alt={GALLERY[active].caption}
              className="w-full rounded-md"
            />
            <div className="flex items-center justify-between text-white mt-3">
              <button
                onClick={() => setActive((active - 1 + GALLERY.length) % GALLERY.length)}
                className="px-3 py-1 bg-white/10 rounded hover:bg-white/20"
              >
                ‹ Prev
              </button>
              <p className="text-sm">{GALLERY[active].caption}</p>
              <button
                onClick={() => setActive((active + 1) % GALLERY.length)}
                className="px-3 py-1 bg-white/10 rounded hover:bg-white/20"
              >
                Next ›
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AboutUs() {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-md group">
        <img
          src={aboutHero}
          alt="Shree Saptashrungi Ayurved Mahavidyalaya Campus"
          loading="lazy"
          width={1024}
          height={1024}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand/80 via-brand/20 to-transparent flex items-end p-5">
          <div className="text-white animate-fade-in">
            <h2 className="text-2xl font-bold">25+ Years of Ayurveda Excellence</h2>
            <p className="text-sm opacity-90">Established 1999 · Nashik, Maharashtra</p>
          </div>
        </div>
      </div>

      <p className="text-foreground leading-relaxed">
        Shree Saptashrungi Ayurved Mahavidyalaya and Hospital was established in 1999 and has
        successfully completed the milestone of 25 years of dedicated service to Ayurveda
        education and healthcare. With a vast campus housing a state-of-the-art college
        building, a 220-bed hospital, 3 operation theatres, an ICU, Sonography and X-Ray
        units, a nursery of Ayurvedic medicinal plants, a fully digital library, and a
        teaching pharmacy with an advanced research laboratory — the institute stands as a
        pillar of holistic medical learning.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[campus1, campus2, campus3, campus4].map((src, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-md border border-border animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <img
              src={src}
              alt={`Campus view ${i + 1}`}
              loading="lazy"
              width={1024}
              height={1024}
              className="aspect-[4/3] object-cover w-full hover:scale-110 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { n: "100", l: "UG BAMS Seats" },
          { n: "54", l: "PG Seats (9 Programs)" },
          { n: "220", l: "Hospital Beds" },
        ].map((s, i) => (
          <div
            key={i}
            className="border border-border rounded-md p-5 text-center bg-secondary/30 hover:bg-secondary/60 transition-colors animate-fade-in"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <div className="text-3xl font-bold text-brand">{s.n}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const PAGE_CONTENT: Record<string, React.FC> = {
  "photo-gallery": PhotoGallery,
  "about-us": AboutUs,
};
