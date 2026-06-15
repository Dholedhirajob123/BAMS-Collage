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
import { useGallery } from "@/lib/galleryStore";



function PhotoGallery() {
  const GALLERY = useGallery();
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Glimpses of campus life, academics, hospital, sports and cultural events.
      </p>
      
      {GALLERY.length === 0 ? (
        <p className="text-sm text-muted-foreground italic">No photos yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {GALLERY.map((g, i) => (
            <button
              key={g.id}
              onClick={() => setActive(i)}
              className="group relative overflow-hidden rounded-md border border-border bg-card animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <img
                src={g.src}
                alt={g.caption}
                loading="lazy"
                className="aspect-square object-cover w-full transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent text-white text-xs p-2 text-left translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                {g.caption}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox with Hero + 5 Thumbnails - NO SCROLL */}
      {active !== null && GALLERY[active] && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActive(null)}
        >
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* Hero Image */}
            <div className="relative">
              <img
                src={GALLERY[active].src}
                alt={GALLERY[active].caption}
                className="w-full rounded-lg max-h-[55vh] object-contain"
              />
              
              {/* Close button */}
              <button
                onClick={() => setActive(null)}
                className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full text-white text-xl hover:bg-black/70"
              >
                ×
              </button>
            </div>

            {/* Caption and Navigation */}
            <div className="flex items-center justify-between text-white mt-3 bg-black/50 rounded-lg p-2">
              <button
                onClick={() => setActive((active - 1 + GALLERY.length) % GALLERY.length)}
                className="px-3 py-1 bg-white/10 rounded hover:bg-white/20 text-sm"
              >
                ‹ Prev
              </button>
              
              <p className="text-sm font-medium truncate max-w-[200px]">{GALLERY[active].caption}</p>
              
              <button
                onClick={() => setActive((active + 1) % GALLERY.length)}
                className="px-3 py-1 bg-white/10 rounded hover:bg-white/20 text-sm"
              >
                Next ›
              </button>
            </div>

            {/* Thumbnail Strip - Exactly 5 pictures, no scroll */}
            <div className="grid grid-cols-5 gap-2 mt-3">
              {GALLERY.slice(0, 5).map((g, idx) => (
                <button
                  key={g.id}
                  onClick={() => setActive(idx)}
                  className={`relative rounded-lg overflow-hidden transition-all ${
                    idx === active 
                      ? 'ring-2 ring-white ring-offset-2' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={g.src}
                    alt={g.caption}
                    className="aspect-square w-full object-cover"
                  />
                </button>
              ))}
            </div>
            
            {/* Photo counter */}
            <p className="text-white/50 text-xs text-center mt-2">
              {active + 1} of {GALLERY.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}


function AboutUs() {
  return (
    <div className="space-y-12">
      {/* About Content - Timeline Style */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side - Image with Circle/Overlay Content */}
          <div className="md:w-1/3">
            <div className="sticky top-24">
              {/* Image Card with Circle Design */}
              <div className="relative mb-6 rounded-2xl overflow-hidden shadow-lg group">
                <div className="relative">
                  <img
                    src={aboutHero}
                    alt="Rajashri Ayurvedic Medical College"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
               
                  
                  {/* College Name Overlay on Image */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-xs font-medium opacity-80">⚕️ Ayurvedic Campus</p>
                    <h3 className="text-white text-lg font-bold leading-tight">
                      Rajashri Ayurvedic<br />
                      <span className="text-amber-300">Medical College</span>
                    </h3>
                  </div>
                </div>
              </div>

              {/* Decorative Line */}
              <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-4"></div>
              
              {/* Title */}
              <h2 className="text-2xl font-bold mb-2">Our Journey</h2>
              
              {/* College Name Highlight */}
              <p className="text-muted-foreground text-sm">
                <span className="text-amber-600 dark:text-amber-400 font-semibold">Rajashri Ayurvedic Medical College</span>
                <br />
                <span className="text-xs">Mehkar, Dist. Buldhana, Maharashtra</span>
              </p>
            </div>
          </div>
          
          {/* Right Side Content */}
          <div className="md:w-2/3 space-y-6">
            {/* About the College - New Section */}
            <div className="group p-6 rounded-2xl bg-gradient-to-r from-indigo-50/50 to-blue-50/50 dark:from-indigo-950/20 dark:to-blue-950/20 border border-indigo-100 dark:border-indigo-800 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">📚</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">About Rajashri Ayurvedic Medical College</h3>
                  <p className="text-muted-foreground mb-2">
                    Established with a vision to promote traditional Indian medicine, <span className="font-semibold">Rajashri Ayurvedic Medical College & Hospital</span> 
                    is a premier institution offering <span className="font-semibold">Bachelor of Ayurvedic Medicine and Surgery (BAMS)</span> degree.
                  </p>
                  <p className="text-muted-foreground">
                    The college is spread over <span className="font-semibold">10+ acres</span> of lush green campus with state-of-the-art infrastructure, 
                    providing students with the perfect environment to learn ancient healing sciences. The institution has produced 
                    over <span className="font-semibold">500+ skilled Vaidyas</span> serving across Maharashtra and India.
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-indigo-600">✓</span> Established: 2014
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-indigo-600">✓</span> Intake Capacity: 60 Students
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-indigo-600">✓</span> Course Duration: 5.5 Years
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-indigo-600">✓</span> Hospital Beds: 100+
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Institute Background */}
            <div className="group p-6 rounded-2xl bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-100 dark:border-amber-800 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🏛️</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Institute Background</h3>
                  <p className="text-muted-foreground">
                    Run by <span className="text-amber-600 dark:text-amber-400 font-semibold">Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha</span>, 
                    dedicated to spreading authentic Ayurvedic medical education and affordable healthcare in the Buldhana region.
                  </p>
                </div>
              </div>
            </div>

      
            {/* Affiliations & Recognition */}
            <div className="group p-6 rounded-2xl bg-gradient-to-r from-green-50/50 to-teal-50/50 dark:from-green-950/20 dark:to-teal-950/20 border border-green-100 dark:border-green-800 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🎓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Affiliations & Recognition</h3>
                  <p className="text-muted-foreground">
                    Affiliated to <span className="text-green-600 dark:text-green-400 font-semibold">Maharashtra University of Health Sciences (MUHS), Nashik</span> 
                    and recognized by <span className="text-green-600 dark:text-green-400 font-semibold">NCISM</span>, New Delhi.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Campus Facilities */}
            <div className="group p-6 rounded-2xl bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-100 dark:border-purple-800 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🏥</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Campus Facilities</h3>
                  <p className="text-muted-foreground">
                    Modern college building, well-equipped teaching hospital, separate hostels, digital library, 
                    herbal garden, teaching pharmacy and research laboratory.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {["Modern Hospital", "Digital Library", "Herbal Garden", "Research Lab", "Hostels", "Teaching Pharmacy"].map((f, i) => (
                      <span key={i} className="px-2 py-1 bg-white/50 dark:bg-gray-800/50 rounded-md text-xs">✓ {f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery - Polaroid Style */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Campus Gallery</h2>
          <p className="text-muted-foreground">Glimpses of our beautiful campus and facilities</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[campus1, campus2, campus3, campus4].map((src, i) => (
            <div
              key={i}
              className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 rotate-0 hover:rotate-1 transition-all duration-300"
              style={{ transform: `rotate(${i % 2 === 0 ? '-1deg' : '1deg'})` }}
            >
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img
                  src={src}
                  alt={`Campus view ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="text-center py-2 text-xs text-muted-foreground">
                📸 Campus Tour
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 p-8 text-center">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Join Our Ayurvedic Journey</h3>
          <p className="text-white/90 mb-6">Admissions open for BAMS course 2024-25 batch</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button className="px-6 py-3 bg-white text-amber-600 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105">
              Apply Now →
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all">
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoPage({
  hero, title, subtitle, paragraphs, highlights,
}: {
  hero: string; title: string; subtitle?: string;
  paragraphs: string[]; highlights?: { label: string; value: string }[];
}) {
  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-md">
        <img src={hero} alt={title} loading="lazy" className="w-full h-56 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand/85 via-brand/30 to-transparent flex items-end p-5">
          <div className="text-white">
            <h2 className="text-2xl font-bold">{title}</h2>
            {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}
          </div>
        </div>
      </div>
      {paragraphs.map((p, i) => (
        <p key={i} className="text-foreground leading-relaxed">{p}</p>
      ))}
      {highlights && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {highlights.map((h, i) => (
            <div key={i} className="border border-border rounded-md p-4 text-center bg-secondary/30">
              <div className="text-xl font-bold text-brand">{h.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{h.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const History = () => (
  <div className="space-y-12">

    {/* Journey Timeline with Zigzag Layout */}
    <div className="relative py-8">

      <div className="space-y-16">
        {/* Milestone 1 - Left */}
        <div className="relative flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-xl group">
              <img
                src={campus1}
                alt="Foundation"
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-2xl p-6 border border-amber-100 dark:border-amber-800 hover:shadow-lg transition-all">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 dark:bg-amber-900/50 rounded-full mb-3">
                <span className="text-amber-600 text-xs font-bold">FOUNDATION</span>
              </div>
              <h3 className="text-xl font-bold mb-2">The Beginning</h3>
              <p className="text-muted-foreground leading-relaxed">
                Rajashri Ayurvedic Medical College & Hospital, Mehkar was founded by the visionary leaders of{" "}
                <span className="text-amber-600 dark:text-amber-400 font-semibold">
                  Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha
                </span>{" "}
                with the mission of bringing quality Ayurvedic medical education to the rural belt of Buldhana district.
              </p>
            </div>
          </div>
        </div>

        {/* Milestone 2 - Right (Zigzag) */}
        <div className="relative flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-1/2 md:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-xl group">
              <img
                src={campus2}
                alt="Growth"
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-sm font-semibold bg-orange-500/80 px-3 py-1 rounded-full">EXPANSION</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 md:order-1">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-2xl p-6 border border-orange-100 dark:border-orange-800 hover:shadow-lg transition-all">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 dark:bg-orange-900/50 rounded-full mb-3">
                <span className="text-orange-600 text-xs font-bold">GROWTH</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Expansion & Excellence</h3>
              <p className="text-muted-foreground leading-relaxed">
                Starting with a modest first batch of BAMS students, the college has steadily grown into a full-fledged 
                Ayurvedic teaching institution with its own attached hospital, separate hostels, library, pharmacy and herbal garden.
              </p>
            </div>
          </div>
        </div>

        {/* Milestone 3 - Left */}
        <div className="relative flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-xl group">
              <img
                src={campus3}
                alt="Community Healthcare"
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-sm font-semibold bg-green-500/80 px-3 py-1 rounded-full">IMPACT</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20 rounded-2xl p-6 border border-green-100 dark:border-green-800 hover:shadow-lg transition-all">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/50 rounded-full mb-3">
                <span className="text-green-600 text-xs font-bold">IMPACT</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Community Healthcare</h3>
              <p className="text-muted-foreground leading-relaxed">
                Over the years thousands of patients from Mehkar and surrounding talukas have benefited from the OPD and IPD services 
                of the attached hospital — making the institute a trusted healthcare destination of the region.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Legacy Card */}
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 p-8 text-center">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10">
        <div className="text-5xl mb-4">📜</div>
        <h3 className="text-2xl font-bold text-white mb-2">Continuing the Legacy</h3>
        <p className="text-white/90 text-sm max-w-2xl mx-auto">
          Today, Rajashri Ayurvedic Medical College stands as a beacon of quality Ayurvedic education and affordable healthcare, 
          serving thousands of students and patients across the Buldhana region of Vidarbha, Maharashtra.
        </p>
        
       
      </div>
    </div>
  </div>
);

const VisionMission = () => (
  <div className="space-y-12">


    {/* Vision & Mission Cards - Side by Side */}
    <div className="grid md:grid-cols-2 gap-8">
      {/* Vision Card */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-100 dark:border-amber-800 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-200/50 to-transparent rounded-bl-full" />
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-amber-700 to-orange-700 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
            Our Vision
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            To become a centre of excellence in Ayurvedic medical education, research and patient care, producing competent, ethical and compassionate Ayurvedic physicians who serve society with dedication.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
            <span>✦ Vision 2025</span>
          </div>
        </div>
      </div>

      {/* Mission Card */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20 border border-green-100 dark:border-green-800 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-green-200/50 to-transparent rounded-bl-full" />
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-green-700 to-teal-700 dark:from-green-400 dark:to-teal-400 bg-clip-text text-transparent">
            Our Mission
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            To impart high quality theoretical and clinical training in Ayurveda as per MUHS and NCISM standards; to promote research in classical Ayurvedic concepts and herbal formulations; and to deliver affordable, evidence-informed Ayurvedic healthcare through the attached teaching hospital.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
            <span>✓ Mission Driven</span>
          </div>
        </div>
      </div>
    </div>

    {/* Additional Information Paragraphs */}
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <span className="text-blue-600 text-sm">🎯</span>
            </div>
            <h3 className="font-bold text-blue-700 dark:text-blue-400">Strategic Objectives</h3>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">• To develop skilled Ayurvedic professionals through quality education</li>
            <li className="flex items-start gap-2">• To establish advanced research facilities for Ayurvedic studies</li>
            <li className="flex items-start gap-2">• To provide affordable healthcare to rural communities</li>
            <li className="flex items-start gap-2">• To preserve and promote traditional Ayurvedic knowledge</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <span className="text-purple-600 text-sm">📊</span>
            </div>
            <h3 className="font-bold text-purple-700 dark:text-purple-400">Key Focus Areas</h3>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">• Academic excellence and curriculum development</li>
            <li className="flex items-start gap-2">• Clinical training and patient care services</li>
            <li className="flex items-start gap-2">• Research in classical formulations and herbal medicine</li>
            <li className="flex items-start gap-2">• Community outreach and health awareness programs</li>
          </ul>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
            <span className="text-amber-600 text-sm">💡</span>
          </div>
          <h3 className="font-bold text-amber-700 dark:text-amber-400">Our Commitment</h3>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Rajashri Ayurvedic Medical College is committed to maintaining the highest standards of Ayurvedic education 
          and healthcare. We strive to create an environment where traditional wisdom meets modern scientific approaches, 
          ensuring our students become competent practitioners who can serve society with dedication and compassion. 
          Our institution continuously works towards making quality Ayurvedic healthcare accessible to all, especially 
          the underserved rural populations of Vidarbha region.
        </p>
      </div>
    </div>

   

    {/* Additional Paragraph Section */}
    <div className="grid md:grid-cols-3 gap-6">
      <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 border border-cyan-100 dark:border-cyan-800">
        <div className="text-2xl mb-2">📖</div>
        <h3 className="font-bold mb-2">Academic Excellence</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Our curriculum is designed to provide comprehensive knowledge of Ashtanga Ayurveda 
          while integrating modern medical sciences, ensuring students are well-prepared for 
          contemporary healthcare challenges.
        </p>
      </div>
      <div className="p-5 rounded-xl bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20 border border-rose-100 dark:border-rose-800">
        <div className="text-2xl mb-2">🔬</div>
        <h3 className="font-bold mb-2">Research & Innovation</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          We actively promote research in classical Ayurvedic concepts, herbal formulations, 
          and evidence-based medicine, contributing to the global acceptance of Ayurveda.
        </p>
      </div>
      <div className="p-5 rounded-xl bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-950/20 dark:to-green-950/20 border border-teal-100 dark:border-teal-800">
        <div className="text-2xl mb-2">🤝</div>
        <h3 className="font-bold mb-2">Community Service</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Through our attached teaching hospital and outreach programs, we provide affordable 
          healthcare services to thousands of patients annually, fulfilling our social responsibility.
        </p>
      </div>
    </div>

    {/* Call to Action Banner */}
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 p-8 text-center">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <div className="text-4xl mb-3">🎯</div>
        <h3 className="text-2xl font-bold text-white mb-2">Join Our Visionary Journey</h3>
        <p className="text-white/90 text-sm max-w-md mx-auto">
          Be a part of an institution that's shaping the future of Ayurveda
        </p>
        <button className="mt-4 px-6 py-2 bg-white text-amber-600 rounded-full font-semibold text-sm hover:shadow-lg transition-all hover:scale-105">
          Explore Admissions →
        </button>
      </div>
    </div>
  </div>
);

const FounderChairman = () => (
  <div className="space-y-10">


    {/* Founder Section - Left Side Pic + Right Side Info */}
    <div className="flex flex-col md:flex-row gap-8 items-start">
      {/* Left Side - Founder Image */}
      <div className="md:w-1/3 sticky top-24">
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <img
            src={campus3}
            alt="M.P. Shri. Prataprao G. Jadhao"
            className="w-full h-auto object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-white text-sm font-semibold">M.P. Shri. Prataprao G. Jadhao</p>
          </div>
        </div>
      </div>

      {/* Right Side - Information */}
      <div className="md:w-2/3 space-y-6">
        {/* Quote */}
        <div className="relative pl-6 border-l-4 border-amber-500">
          <p className="text-lg italic text-foreground leading-relaxed">
            "Education is the strongest weapon to transform society. My dream is to see every child from rural Maharashtra become a successful professional."
          </p>
          <p className="text-amber-600 dark:text-amber-400 font-semibold mt-2">— M.P. Shri. Prataprao G. Jadhao</p>
        </div>

        {/* Bio */}
        <div className="space-y-4">
          <p className="text-foreground leading-relaxed">
            The institute was established under the inspiration of <span className="text-amber-600 dark:text-amber-400 font-semibold">M.P. Shri. Prataprao G. Jadhao</span> — 
            a respected social leader of Buldhana district whose lifelong commitment to education, 
            health and rural upliftment shaped the foundation of the trust.
          </p>
          <p className="text-foreground leading-relaxed">
            His vision was to create an institution that combines the timeless wisdom of Ayurveda 
            with modern academic rigor, so that talented students from rural Maharashtra could become 
            qualified Ayurvedic doctors without leaving the region.
          </p>
          <p className="text-foreground leading-relaxed">
            His legacy continues to guide every academic, clinical and social initiative undertaken 
            by the college today. For over three decades, his principles have been the guiding light 
            for thousands of students and faculty members.
          </p>
        </div>

     
      </div>
    </div>

     
      
   

    {/* Closing Quote */}
    <div className="relative py-8 px-6 text-center bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-2xl">
      <div className="text-4xl text-amber-400 mb-2">"</div>
      <p className="text-foreground italic max-w-2xl mx-auto leading-relaxed">
        The true purpose of education is to create responsible citizens who can serve humanity with knowledge, 
        compassion, and integrity.
      </p>
      <p className="text-amber-600 dark:text-amber-400 font-semibold mt-3">— M.P. Shri. Prataprao G. Jadhao</p>
    </div>
  </div>
);

const Chairman = () => (
  <div className="space-y-12">
    {/* Section Header - No Hero */}
   

    {/* First Row - Image Left, Text Right (Chairman) */}
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <div className="md:w-1/2">
        <div className="relative rounded-2xl overflow-hidden shadow-xl group">
          <img
            src={campus4}
            alt="Chairman - Rajashri Ayurvedic Medical College"
            className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <p className="text-white text-lg font-bold">Shri. Rajendra Rahate</p>
            <p className="text-amber-300 text-sm">Chairman</p>
            <p className="text-white/70 text-xs">Dharmveer Diliprao Rahate Shikshan Sanstha</p>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 space-y-4">
        <p className="text-foreground leading-relaxed text-lg">
          On behalf of <span className="text-amber-600 dark:text-amber-400 font-semibold">Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha</span>, 
          I warmly welcome you to Rajashri Ayurvedic Medical College & Hospital, Mehkar.
        </p>
        <p className="text-foreground leading-relaxed">
          It brings me immense pride to see our institution growing into a centre of excellence in Ayurvedic education 
          and healthcare. Our commitment has always been to provide quality education that transforms students into 
          skilled, compassionate, and ethical Ayurvedic physicians.
        </p>
        <p className="text-foreground leading-relaxed">
          We believe that every student who walks through our doors has the potential to become a healer who can 
          serve society with dedication. Our mission is to nurture this potential with the best infrastructure, 
          experienced faculty, and a curriculum that balances ancient wisdom with modern science.
        </p>
      </div>
    </div>

    {/* Second Row - Text Left, Image Right (Secretary) - Zigzag */}
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <div className="md:w-1/2 md:order-2">
        <div className="relative rounded-2xl overflow-hidden shadow-xl group">
          <img
            src={campus2}
            alt="Secretary - Rajashri Ayurvedic Medical College"
            className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <p className="text-white text-lg font-bold">Shri. Anand Rahate</p>
            <p className="text-amber-300 text-sm">Secretary</p>
            <p className="text-white/70 text-xs">Dharmveer Diliprao Rahate Shikshan Sanstha</p>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 md:order-1 space-y-4">
        <div className="relative pl-6 border-l-4 border-amber-500">
          <p className="text-foreground leading-relaxed text-lg italic">
            "Our institution stands as a testament to the visionary dream of M.P. Shri. Prataprao G. Jadhao. 
            We are dedicated to creating an environment where traditional Ayurvedic knowledge meets contemporary 
            scientific advancements, producing world-class Ayurvedic professionals."
          </p>
          <p className="text-amber-600 dark:text-amber-400 font-semibold mt-3">— Shri. Anand Rahate, Secretary</p>
        </div>
        <p className="text-foreground leading-relaxed">
          The Secretary of our trust has been instrumental in shaping the institution's vision and ensuring that 
          we stay true to our founding principles. Under his guidance, the college has achieved numerous milestones 
          in academics, research, and patient care.
        </p>
        <p className="text-foreground leading-relaxed">
          His dedication to expanding quality education in rural Maharashtra has helped establish multiple institutions 
          that serve thousands of students and patients across the region.
        </p>
      </div>
    </div>

    {/* Third Row - Image Left, Text Right (Treasurer/Management) */}
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <div className="md:w-1/2">
        <div className="relative rounded-2xl overflow-hidden shadow-xl group">
          <img
            src={campus3}
            alt="Management Team - Rajashri Ayurvedic Medical College"
            className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <p className="text-white text-lg font-bold">Management Team</p>
            <p className="text-amber-300 text-sm">Governing Body</p>
            <p className="text-white/70 text-xs">Rajashri Ayurvedic Medical College</p>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 space-y-4">
        <p className="text-foreground leading-relaxed text-lg">
          Ayurveda is India's living medical heritage. Our endeavour at <span className="text-amber-600 dark:text-amber-400 font-semibold">Rajashri Ayurvedic</span> 
          is to nurture young minds who can carry this heritage forward with both classical depth and contemporary scientific outlook.
        </p>
        <p className="text-foreground leading-relaxed">
          The management team works tirelessly to ensure that our students receive the best possible education, 
          our patients get quality healthcare, and our institution continues to grow and serve the community.
        </p>
        <div className="relative pl-6 border-l-4 border-amber-500 mt-4">
          <p className="text-foreground leading-relaxed italic">
            "We invite aspiring students, patients and well-wishers to be part of this growing institution that places 
            knowledge, integrity and service above everything else."
          </p>
          <p className="text-amber-600 dark:text-amber-400 font-semibold mt-2">— Chairman, Rajashri Ayurvedic Medical College</p>
        </div>
      </div>
    </div>

   




  </div>
);

const Hospital = () => (
  <InfoPage hero={g7} title="Attached Teaching Hospital" subtitle="OPD · IPD · Panchakarma · Emergency"
    paragraphs={[
      "The attached teaching hospital of Rajashri Ayurvedic Medical College serves as the primary clinical training ground for BAMS students and a trusted healthcare facility for the people of Mehkar and surrounding villages.",
      "Specialty OPDs are run daily by qualified Ayurvedic consultants covering Kayachikitsa, Panchakarma, Shalya Tantra, Shalakya Tantra, Prasuti Tantra & Streerog, Kaumarbhritya, and Swasthavritta.",
      "Indoor admission, dedicated Panchakarma therapy block, minor operation theatre, labour room, dispensary, basic pathology lab and emergency services are available within the hospital premises.",
    ]}
    highlights={[
      { label: "IPD Beds", value: "60+" },
      { label: "OPD Daily", value: "150+" },
      { label: "OT", value: "Yes" },
      { label: "Panchakarma", value: "Full Block" },
    ]}
  />
);

const Library = () => (
  <InfoPage hero={g1} title="Digital Library"
    paragraphs={[
      "The college library is stocked with classical Ayurvedic Samhitas, modern medical textbooks, reference journals and research publications, along with a fully digital section offering access to e-journals and online databases.",
      "Separate reading halls for UG students, faculty and visitors, with Wi-Fi connectivity throughout.",
    ]}
    highlights={[
      { label: "Total Books", value: "8000+" },
      { label: "Journals", value: "40+" },
      { label: "Digital Access", value: "Yes" },
      { label: "Seating", value: "120" },
    ]}
  />
);

const HerbalGarden = () => (
  <InfoPage hero={g2} title="Herbal Garden"
    paragraphs={[
      "A dedicated medicinal-plant garden cultivates over 200 species of Ayurvedic herbs used in Dravyaguna and Rasashastra teaching — giving students live exposure to the plants they study in classical texts.",
      "The garden also supports the teaching pharmacy with raw materials for in-house Ayurvedic formulations.",
    ]}
  />
);

const Infrastructure = () => (
  <div className="space-y-12">
    {/* Hero Section */}
    <div className="relative h-[350px] rounded-3xl overflow-hidden shadow-2xl group">
      <img
        src={campus2}
        alt="Infrastructure"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-0.5 bg-amber-400 rounded-full"></div>
            <span className="text-sm text-amber-400 font-semibold tracking-wider">CAMPUS FACILITIES</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">World-Class Infrastructure</h1>
          <p className="text-lg text-white/90">Modern facilities designed for holistic learning</p>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="grid lg:grid-cols-2 gap-10">
      {/* Left Side - Description */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-2xl p-6 border border-amber-100 dark:border-amber-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">Academic Infrastructure</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Modern college building with spacious lecture halls, demonstration rooms, departmental museums, 
            a central seminar hall and well-equipped laboratories for each pre-clinical and para-clinical department.
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">Student Amenities</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Separate, secure hostels for boys and girls, mess facility, sports ground, and reliable 
            transport connectivity to Mehkar town.
          </p>
        </div>
      </div>

      {/* Right Side - Highlights Grid */}
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: "🏫", label: "Classrooms", value: "12", color: "from-amber-500 to-orange-500" },
            { icon: "🔬", label: "Laboratories", value: "10", color: "from-blue-500 to-cyan-500" },
            { icon: "🏠", label: "Hostels", value: "2", color: "from-green-500 to-emerald-500" },
            { icon: "🎭", label: "Auditorium", value: "1", color: "from-purple-500 to-pink-500" },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card to-secondary/30 p-6 text-center border border-border hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full" />
              <div className="relative z-10">
                <div className="text-4xl mb-2">{item.icon}</div>
                <div className={`text-3xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                  {item.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">{item.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Card */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-6 text-center text-white">
          <div className="text-3xl mb-2">🏆</div>
          <h3 className="font-bold text-lg">NCISM Compliant</h3>
          <p className="text-sm text-white/80 mt-1">All facilities meet NCISM minimum standards</p>
        </div>
      </div>
    </div>

    {/* Features Section */}
    <div className="grid md:grid-cols-3 gap-5 mt-8">
      {[
        { icon: "📚", title: "Digital Library", desc: "Access to e-journals and online databases" },
        { icon: "🌿", title: "Herbal Garden", desc: "200+ medicinal plant species" },
        { icon: "💊", title: "Teaching Pharmacy", desc: "In-house formulation facility" },
      ].map((feature, i) => (
        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-border">
          <div className="text-3xl">{feature.icon}</div>
          <div>
            <h4 className="font-semibold text-sm">{feature.title}</h4>
            <p className="text-xs text-muted-foreground">{feature.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Lab = () => (
  <div className="space-y-12">
    {/* Hero Section */}
    <div className="relative h-[350px] rounded-3xl overflow-hidden shadow-2xl group">
      <img
        src={g4}
        alt="Laboratories"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-0.5 bg-amber-400 rounded-full"></div>
            <span className="text-sm text-amber-400 font-semibold tracking-wider">RESEARCH & LEARNING</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">State-of-the-Art Laboratories</h1>
          <p className="text-lg text-white/90">Advanced facilities for practical training and research</p>
        </div>
      </div>
    </div>

    {/* Labs Grid */}
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left - Department Labs */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <span className="text-2xl">🔬</span>
            </div>
            <h2 className="text-2xl font-bold">Departmental Laboratories</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Dedicated laboratories for each department equipped as per NCISM minimum standards:
          </p>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {[
              "Sharir Rachana",
              "Sharir Kriya", 
              "Dravyaguna",
              "Rasashastra & Bhaishajya Kalpana",
              "Rog Nidan",
              "Agad Tantra"
            ].map((lab, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                {lab}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Research Lab */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20 rounded-2xl p-6 border border-green-100 dark:border-green-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <span className="text-2xl">🧪</span>
            </div>
            <h2 className="text-2xl font-bold">Central Research Laboratory</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Central research laboratory supports faculty and PG-level research projects on classical Ayurvedic formulations.
          </p>
          
          <div className="mt-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-amber-500">🔬</span>
              <span className="font-semibold text-sm">Research Focus Areas</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Classical Formulations", "Herbal Medicine", "Drug Standardization", "Clinical Research"].map((area, i) => (
                <span key={i} className="px-2 py-1 bg-amber-100 dark:bg-amber-900/50 rounded-md text-xs">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Equipment Highlights */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-2xl p-6 border border-amber-100 dark:border-amber-800">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <span>⚙️</span> Equipment & Facilities
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              "Modern Microscopes",
              "Centrifuge Machines",
              "Spectrophotometer",
              "PH Meters",
              "Distillation Units",
              "Hot Air Ovens"
            ].map((eq, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="text-green-500">✓</span>
                {eq}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Stats Section */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { icon: "🔬", label: "Department Labs", value: "6" },
        { icon: "🧪", label: "Research Labs", value: "1" },
        { icon: "📊", label: "Samples/Year", value: "5000+" },
        { icon: "👨‍🔬", label: "Research Faculty", value: "10+" },
      ].map((stat, i) => (
        <div key={i} className="text-center p-4 rounded-xl bg-secondary/30 border border-border">
          <div className="text-2xl mb-1">{stat.icon}</div>
          <div className="text-xl font-bold text-amber-600">{stat.value}</div>
          <div className="text-xs text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
);

const Contact = () => (
  <div className="space-y-6">
    <div className="relative overflow-hidden rounded-md">
      <img src={campus1} alt="Campus" loading="lazy" className="w-full h-52 object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand/85 via-brand/30 to-transparent flex items-end p-5">
        <h2 className="text-2xl font-bold text-white">Contact Us</h2>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <div className="border border-border rounded-md p-5 bg-card space-y-3">
        <h3 className="font-semibold text-brand">College Address</h3>
        <p className="text-sm leading-relaxed">
          Rajashri Ayurvedic Medical College & Hospital<br />
          Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha<br />
          Mehkar, Dist. Buldhana – 443301<br />
          Maharashtra, India
        </p>
      </div>
      <div className="border border-border rounded-md p-5 bg-card space-y-3">
        <h3 className="font-semibold text-brand">Reach Us</h3>
        <ul className="text-sm space-y-2">
          <li><strong>Office:</strong> 91 - 8087203870 | 8087303870</li>
         
          <li><strong>Email:</strong> <a className="text-brand hover:underline" href="mailto:rajashriayurved@gmail.com">rajashriayurved@gmail.com</a></li>
        </ul>
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-3">
      {[
        { t: "Office Hours", d: "Mon–Sat · 9:00 AM – 5:00 PM" },
        { t: "OPD Timings", d: "Mon–Sat · 9 AM – 1 PM & 4 PM – 7 PM" },
        { t: "Emergency", d: "24 × 7 Hospital Services" },
      ].map((x, i) => (
        <div key={i} className="border border-border rounded-md p-4 bg-secondary/30">
          <div className="text-sm font-semibold text-brand">{x.t}</div>
          <div className="text-xs text-muted-foreground mt-1">{x.d}</div>
        </div>
      ))}
    </div>

    <div className="rounded-md overflow-hidden border border-border">
      <iframe
        title="Mehkar location"
        src="https://www.google.com/maps?q=Mehkar,Buldhana,Maharashtra&output=embed"
        className="w-full h-72"
        loading="lazy"
      />
    </div>
  </div>
);

import { useStaff, type StaffGroupKey } from "@/lib/staffStore";

function StaffSection({ title, group, slug }: { title: string; group: StaffGroupKey; slug: string }) {
  const members = useStaff(group);
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-brand border-l-4 border-amber-500 pl-3">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground mt-1 ml-3">Academic Year 2025-26</p>
        </div>
        <div className="bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-amber-700 dark:text-amber-400">
            Total Members: {members.length}
          </span>
        </div>
      </div>

      {members.length === 0 ? (
        <div className="text-center py-12 bg-secondary/30 rounded-lg">
          <p className="text-sm text-muted-foreground italic">No staff members listed yet.</p>
        </div>
      ) : (
        <>
          {/* Mobile View - Card Layout */}
          <div className="block md:hidden space-y-3">
            {members.map((m, i) => (
              <div
                key={m.id}
                className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <button onClick={() => setActive(i)} className="flex-shrink-0">
                    <img
                      src={m.photo}
                      alt={m.name}
                      loading="lazy"
                      className="h-16 w-16 rounded-full object-cover border-2 border-brand hover:scale-110 transition-transform"
                    />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-brand">{m.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">#{i + 1}</p>
                      </div>
                    </div>
                    <p className="text-sm mt-1">{m.designation}</p>
                    {m.mobile && (
                      <a
                        href={`tel:${m.mobile}`}
                        className="text-xs text-brand hover:underline inline-flex items-center gap-1 mt-2"
                      >
                        📞 {m.mobile}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View - Table */}
          <div className="hidden md:block overflow-x-auto border border-border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-brand w-16">Sr.No</th>
                  <th className="px-4 py-3 text-left font-semibold text-brand">PHOTO</th>
                  <th className="px-4 py-3 text-left font-semibold text-brand">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-brand">Position</th>
                  <th className="px-4 py-3 text-left font-semibold text-brand">Mobile No.</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m, i) => (
                  <tr key={m.id} className="border-t border-border hover:bg-secondary/40 transition-colors">
                    <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => setActive(i)} className="block">
                        <img
                          src={m.photo}
                          alt={m.name}
                          loading="lazy"
                          className="h-12 w-12 rounded-full object-cover border-2 border-brand hover:scale-110 transition-transform"
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3 font-semibold text-brand">{m.name}</td>
                    <td className="px-4 py-3">{m.designation}</td>
                    <td className="px-4 py-3">
                      {m.mobile ? (
                        <a href={`tel:${m.mobile}`} className="text-brand hover:underline">
                          {m.mobile}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <DocSection slug={slug} />

      {/* Lightbox Modal */}
      {active !== null && members[active] && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActive(null)}
        >
          <div className="max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            {/* Image Container */}
            <div className="relative rounded-xl overflow-hidden bg-black/50">
              <img
                src={members[active].photo}
                alt={members[active].name}
                className="w-full aspect-square object-cover"
              />
              <button
                onClick={() => setActive(null)}
                className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full text-white text-xl hover:bg-black/70 transition-colors"
              >
                ×
              </button>
            </div>
            
            {/* Info Bar */}
            <div className="bg-white/10 backdrop-blur rounded-lg mt-3 p-3">
              <div className="text-center mb-3">
                <p className="text-white font-semibold text-lg">{members[active].name}</p>
                <p className="text-white/70 text-sm">{members[active].designation}</p>
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => setActive((active - 1 + members.length) % members.length)}
                  className="px-4 py-2 bg-white/20 rounded-lg text-white text-sm hover:bg-white/30 transition-colors flex items-center gap-1"
                >
                  ‹ Prev
                </button>
                <div className="text-white/60 text-xs">
                  {active + 1} of {members.length}
                </div>
                <button
                  onClick={() => setActive((active + 1) % members.length)}
                  className="px-4 py-2 bg-white/20 rounded-lg text-white text-sm hover:bg-white/30 transition-colors flex items-center gap-1"
                >
                  Next ›
                </button>
              </div>
            </div>

            {/* Contact Info (if available) */}
            {members[active].mobile && (
              <div className="mt-3 text-center">
                <a
                  href={`tel:${members[active].mobile}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600 transition-colors"
                >
                  📞 Call {members[active].mobile}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const HospitalStaff = () => <StaffSection title="Hospital Staff" group="hospital" />;
const CollegeStaff = () => <StaffSection title="College Staff" group="college" />;
const NonTeachingStaff = () => <StaffSection title="Non-Teaching Staff" group="non-teaching" />;
const TeachingStaff = () => <StaffSection title="Teaching Staff" group="teaching" />;


import { DEPT_PAGE_CONTENT } from "./DepartmentContent";
import { DocSection } from "./DocSection";
import { DOC_SECTIONS } from "@/lib/docsStore";

const DOC_PAGES: Record<string, React.FC> = Object.fromEntries(
  DOC_SECTIONS.map((s) => [s.key, () => <DocSection slug={s.key} />]),
);

export const PAGE_CONTENT: Record<string, React.FC> = {
  "photo-gallery": PhotoGallery,
  "about-us": AboutUs,
  "history": History,
  "vision-mission": VisionMission,
  "founder-chairman": FounderChairman,
  "chairman": Chairman,
  "hospital": Hospital,
  "facility-library": Library,
  "facility-herbal-garden": HerbalGarden,
  "facility-infrastructure": Infrastructure,
  "facility-laboratory": Lab,
  "contact": Contact,
  "staff-hospital": HospitalStaff,
  "staff-college": CollegeStaff,
  "staff-non-teaching": NonTeachingStaff,
  "faculty-teaching-staff": TeachingStaff,
  ...DEPT_PAGE_CONTENT,
  ...DOC_PAGES,
    "staff-college": CollegeStaff,
    "staff-non-teaching": NonTeachingStaff,
    "staff-hospital": HospitalStaff,
    "faculty-teaching-staff": TeachingStaff,
};


