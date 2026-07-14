// components/pages/VisionMission.tsx

export function VisionMission() {
  return (
    <div className="space-y-12">
      {/* Vision & Mission Cards - Side by Side */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Vision Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-white border-2 border-red-300 p-8 hover:shadow-2xl hover:border-red-500 transition-all duration-500 hover:-translate-y-2">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-red-100/50 to-transparent rounded-bl-full" />
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">Our Vision</h2>
            <p className="text-black font-bold leading-relaxed">
              To become a centre of excellence in Ayurvedic medical education, research and patient care, producing competent, ethical and compassionate Ayurvedic physicians who serve society with dedication.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-red-600 font-bold">
              <span>✦ Vision 2025</span>
            </div>
          </div>
        </div>

        {/* Mission Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-white border-2 border-red-300 p-8 hover:shadow-2xl hover:border-red-500 transition-all duration-500 hover:-translate-y-2">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-red-100/50 to-transparent rounded-bl-full" />
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">Our Mission</h2>
            <p className="text-black font-bold leading-relaxed">
              To impart high quality theoretical and clinical training in Ayurveda as per MUHS and NCISM standards; to promote research in classical Ayurvedic concepts and herbal formulations; and to deliver affordable, evidence-informed Ayurvedic healthcare through the attached teaching hospital.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-red-600 font-bold">
              <span>✓ Mission Driven</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Paragraph Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl bg-white border-2 border-red-300 hover:border-red-500 transition-all hover:shadow-lg">
          <div className="text-2xl mb-2">📖</div>
          <h3 className="font-bold text-black mb-2">Academic Excellence</h3>
          <p className="text-xs text-black font-bold leading-relaxed">
            Our curriculum is designed to provide comprehensive knowledge of Ashtanga Ayurveda 
            while integrating modern medical sciences, ensuring students are well-prepared for 
            contemporary healthcare challenges.
          </p>
        </div>
        <div className="p-5 rounded-xl bg-white border-2 border-red-300 hover:border-red-500 transition-all hover:shadow-lg">
          <div className="text-2xl mb-2">🔬</div>
          <h3 className="font-bold text-black mb-2">Research & Innovation</h3>
          <p className="text-xs text-black font-bold leading-relaxed">
            We actively promote research in classical Ayurvedic concepts, herbal formulations, 
            and evidence-based medicine, contributing to the global acceptance of Ayurveda.
          </p>
        </div>
        <div className="p-5 rounded-xl bg-white border-2 border-red-300 hover:border-red-500 transition-all hover:shadow-lg">
          <div className="text-2xl mb-2">🤝</div>
          <h3 className="font-bold text-black mb-2">Community Service</h3>
          <p className="text-xs text-black font-bold leading-relaxed">
            Through our attached teaching hospital and outreach programs, we provide affordable 
            healthcare services to thousands of patients annually, fulfilling our social responsibility.
          </p>
        </div>
      </div>

      {/* Call to Action Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-red-600 p-8 text-center border-2 border-red-700">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="text-4xl mb-3">🎯</div>
          <h3 className="text-2xl font-bold text-white mb-2">Join Our Visionary Journey</h3>
          <p className="text-white/90 text-sm font-bold max-w-md mx-auto">Be a part of an institution that's shaping the future of Ayurveda</p>
          <button className="mt-4 px-6 py-2 bg-white text-red-600 rounded-full font-bold text-sm hover:shadow-lg transition-all hover:scale-105 hover:bg-red-50">
            Explore Admissions →
          </button>
        </div>
      </div>
    </div>
  );
}

export default VisionMission;