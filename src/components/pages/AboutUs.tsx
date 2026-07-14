// components/pages/AboutUs.tsx
import aboutHero from "@/assets/Dr. Rathi Sonal Mohanlal.jpg";
import campus1 from "@/assets/mainbuilding.png";
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
              <div className="relative mb-6 rounded-2xl overflow-hidden shadow-lg border-2 border-red-500 group">
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
                      <span className="text-red-400">Principal</span>
                    </h3>
                  </div>
                </div>
              </div>

              <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-700 rounded-full mb-4"></div>
              <h2 className="text-2xl font-bold text-black mb-2">Our Journey</h2>
              <p className="text-black text-sm font-bold">
                <span className="text-red-600 font-bold">Rajashri Ayurvedic Medical College</span>
                <br />
                <span className="text-xs text-black">Mehkar, Dist. Buldhana, Maharashtra</span>
              </p>
            </div>
          </div>
          
          {/* Right Side Content */}
          <div className="md:w-2/3 space-y-6">
            {/* About the College */}
            <div className="group p-6 rounded-2xl bg-white border-2 border-red-300 hover:shadow-lg hover:border-red-500 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">📚</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-black mb-2">About Rajashri Ayurvedic Medical College</h3>
                  <p className="text-black font-bold mb-2">
                    Established with a vision to promote traditional Indian medicine, <span className="text-red-600 font-bold">Rajashri Ayurvedic Medical College & Hospital</span> 
                    is a premier institution offering <span className="text-red-600 font-bold">Bachelor of Ayurvedic Medicine and Surgery (BAMS)</span> degree.
                  </p>
                  <p className="text-black font-bold">
                    The college is spread over <span className="text-red-600 font-bold">10+ acres</span> of lush green campus with state-of-the-art infrastructure, 
                    providing students with the perfect environment to learn ancient healing sciences. The institution has produced 
                    over <span className="text-red-600 font-bold">500+ skilled Vaidyas</span> serving across Maharashtra and India.
                  </p>
                </div>
              </div>
            </div>

            {/* Institute Background */}
            <div className="group p-6 rounded-2xl bg-white border-2 border-red-300 hover:shadow-lg hover:border-red-500 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🏛️</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-black mb-2">Institute Background</h3>
                  <p className="text-black font-bold">
                    Run by <span className="text-red-600 font-bold">Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha</span>, 
                    dedicated to spreading authentic Ayurvedic medical education and affordable healthcare in the Buldhana region.
                  </p>
                </div>
              </div>
            </div>

            {/* Affiliations & Recognition */}
            <div className="group p-6 rounded-2xl bg-white border-2 border-red-300 hover:shadow-lg hover:border-red-500 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🎓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-black mb-2">Affiliations & Recognition</h3>
                  <p className="text-black font-bold">
                    Affiliated to <span className="text-red-600 font-bold">Maharashtra University of Health Sciences (MUHS), Nashik</span> 
                    and recognized by <span className="text-red-600 font-bold">NCISM</span>, New Delhi.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Campus Facilities */}
            <div className="group p-6 rounded-2xl bg-white border-2 border-red-300 hover:shadow-lg hover:border-red-500 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🏥</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-black mb-2">Campus Facilities</h3>
                  <p className="text-black font-bold">
                    Modern college building, well-equipped teaching hospital, separate hostels, digital library, 
                    herbal garden, teaching pharmacy and research laboratory.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {["Modern Hospital", "Digital Library", "Herbal Garden", "Research Lab", "Hostels", "Teaching Pharmacy"].map((f, i) => (
                      <span key={i} className="px-2 py-1 bg-red-50 border border-red-200 rounded-md text-xs text-black font-bold">
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery - Polaroid Style */}
      {/* <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black mb-2">Campus Gallery</h2>
          <p className="text-black font-bold">Glimpses of our beautiful campus and facilities</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[campus1, campus2, campus3, campus4].map((src, i) => (
            <div
              key={i}
              className="group relative bg-white border-2 border-red-300 rounded-lg shadow-lg p-2 rotate-0 hover:rotate-1 hover:border-red-500 transition-all duration-300"
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
              <div className="text-center py-2 text-xs text-black font-bold">
                📸 Campus Tour
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* CTA Section */}
      <div className="relative overflow-hidden rounded-2xl bg-red-600 p-8 text-center border-2 border-red-700">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Join Our Ayurvedic Journey</h3>
          <p className="text-white/90 font-bold mb-6">Admissions open for BAMS course 2024-25 batch</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button className="px-6 py-3 bg-white text-red-600 rounded-full font-bold hover:shadow-lg transition-all hover:scale-105 hover:bg-red-50">
              Apply Now →
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all">
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