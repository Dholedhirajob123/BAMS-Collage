// components/pages/AboutUs.tsx
import aboutHero from "@/assets/Dr. Rathi Sonal Mohanlal.jpg";
import campus1 from "@/assets/campus-1.jpg";
import campus2 from "@/assets/Secretary.jpg";
import campus3 from "@/assets/President.jpg";
import campus4 from "@/assets/campus-4.jpg";

export function AboutUs() {
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white text-lg font-bold leading-tight">
                      Dr. Rathi Sonal Mohanlal<br />
                      <span className="text-amber-300">Principal</span>
                    </h3>
                  </div>
                </div>
              </div>

              <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-4"></div>
              <h2 className="text-2xl font-bold mb-2">Our Journey</h2>
              <p className="text-muted-foreground text-sm">
                <span className="text-amber-600 dark:text-amber-400 font-semibold">Rajashri Ayurvedic Medical College</span>
                <br />
                <span className="text-xs">Mehkar, Dist. Buldhana, Maharashtra</span>
              </p>
            </div>
          </div>
          
          {/* Right Side Content */}
          <div className="md:w-2/3 space-y-6">
            {/* About the College */}
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

// Also export as default for compatibility
export default AboutUs;