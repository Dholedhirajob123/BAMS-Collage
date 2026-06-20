// components/pages/Infrastructure.tsx
import campus2 from "@/assets/Secretary.jpg";

export function Infrastructure() {
  return (
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
}

export default Infrastructure;