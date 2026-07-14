// components/pages/History.tsx
import campus1 from "@/assets/mainbuilding.png";
import campus4 from "@/assets/mainbuilding.png";

// Add named export
export function History() {
  return (
    <div className="space-y-12">

      {/* Journey Timeline with Zigzag Layout */}
      <div className="relative py-8">
        <div className="space-y-16">
          {/* Milestone 1 - Left */}
          <div className="relative flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-red-300 group hover:border-red-500 transition-all">
                <img
                  src={campus1}
                  alt="Foundation"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white rounded-2xl p-6 border-2 border-red-300 hover:shadow-lg hover:border-red-500 transition-all">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 rounded-full mb-3">
                  <span className="text-red-600 text-xs font-bold">FOUNDATION</span>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">The Beginning</h3>
                <p className="text-black font-bold leading-relaxed">
                  Rajashri Ayurvedic Medical College & Hospital, Mehkar was founded by the visionary leaders of{" "}
                  <span className="text-red-600 font-bold">
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
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-red-300 group hover:border-red-500 transition-all">
                <img
                  src={campus4}
                  alt="Growth"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
            <div className="md:w-1/2 md:order-1">
              <div className="bg-white rounded-2xl p-6 border-2 border-red-300 hover:shadow-lg hover:border-red-500 transition-all">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 rounded-full mb-3">
                  <span className="text-red-600 text-xs font-bold">GROWTH</span>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Expansion & Excellence</h3>
                <p className="text-black font-bold leading-relaxed">
                  Starting with a modest first batch of BAMS students, the college has steadily grown into a full-fledged 
                  Ayurvedic teaching institution with its own attached hospital, separate hostels, library, pharmacy and herbal garden.
                </p>
              </div>
            </div>
          </div>

          {/* Milestone 3 - Left */}
          <div className="relative flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-red-300 group hover:border-red-500 transition-all">
                <img
                  src={campus1}
                  alt="Community Healthcare"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white rounded-2xl p-6 border-2 border-red-300 hover:shadow-lg hover:border-red-500 transition-all">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 rounded-full mb-3">
                  <span className="text-red-600 text-xs font-bold">IMPACT</span>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Community Healthcare</h3>
                <p className="text-black font-bold leading-relaxed">
                  Over the years thousands of patients from Mehkar and surrounding talukas have benefited from the OPD and IPD services 
                  of the attached hospital — making the institute a trusted healthcare destination of the region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legacy Card */}
      <div className="relative overflow-hidden rounded-2xl bg-red-600 p-8 text-center border-2 border-red-700">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        <div className="relative z-10">
          <div className="text-5xl mb-4">📜</div>
          <h3 className="text-2xl font-bold text-white mb-2">Continuing the Legacy</h3>
          <p className="text-white/90 text-sm font-bold max-w-2xl mx-auto">
            Today, Rajashri Ayurvedic Medical College stands as a beacon of quality Ayurvedic education and affordable healthcare, 
            serving thousands of students and patients across the Buldhana region of Vidarbha, Maharashtra.
          </p>
        </div>
      </div>
    </div>
  );
}

// Also export as default for compatibility
export default History;