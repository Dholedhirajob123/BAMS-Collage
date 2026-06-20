// components/pages/Lab.tsx
import g4 from "@/assets/gallery-4.jpg";

export function Lab() {
  return (
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
}

export default Lab;