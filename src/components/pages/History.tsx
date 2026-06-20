// components/pages/History.tsx
import campus1 from "@/assets/campus-1.jpg";
import campus4 from "@/assets/campus-4.jpg";

// Add named export
export function History() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative h-[300px] rounded-3xl overflow-hidden shadow-2xl group">
        <img
          src={campus1}
          alt="History"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-0.5 bg-amber-400 rounded-full"></div>
              <span className="text-sm text-amber-400 font-semibold tracking-wider">OUR JOURNEY</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">History of Excellence</h1>
            <p className="text-lg text-white/90">Tracing our roots from vision to reality</p>
          </div>
        </div>
      </div>

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
                  src={campus4}
                  alt="Growth"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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
                  src={campus1}
                  alt="Community Healthcare"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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
}

// Also export as default for compatibility
export default History;