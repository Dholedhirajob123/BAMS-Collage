// components/pages/FounderChairman.tsx
import founderImage from "@/assets/President.jpg";

export function FounderChairman() {
  return (
    <div className="space-y-12">
      {/* About Content - Timeline Style */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side - Image (Scroll with content) */}
          <div className="md:w-1/3">
            <div className="relative mb-6 rounded-2xl overflow-hidden shadow-lg border-2 border-red-500 group">
              <div className="relative">
                <img
                  src={founderImage}
                  alt="M.P. Shri. Prataprao G. Jadhao"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-lg font-bold leading-tight">
                    M.P. Shri. Prataprao G. Jadhao<br />
                    <span className="text-red-400">Founder Chairman</span>
                  </h3>
                </div>
              </div>
            </div>

            <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-700 rounded-full mb-4"></div>
            <h2 className="text-2xl font-bold text-black mb-2">Our Founder Chairman</h2>
            <p className="text-black text-sm font-bold">
              <span className="text-red-600 font-bold">Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha</span>
              <br />
              <span className="text-xs text-black">Rajashri Ayurvedic Medical College, Mehkar</span>
            </p>
          </div>
          
          {/* Right Side Content */}
          <div className="md:w-2/3 space-y-6">
            {/* Quote Section */}
            <div className="group p-6 rounded-2xl bg-white border-2 border-red-300 hover:shadow-lg hover:border-red-500 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">💭</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-black mb-2">Founder's Vision</h3>
                  <p className="text-black font-bold mb-2 italic">
                    "Education is the strongest weapon to transform society. My dream is to see every child from rural Maharashtra become a successful professional."
                  </p>
                  <p className="text-red-600 font-bold">— M.P. Shri. Prataprao G. Jadhao</p>
                </div>
              </div>
            </div>

            {/* About Founder */}
            <div className="group p-6 rounded-2xl bg-white border-2 border-red-300 hover:shadow-lg hover:border-red-500 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-black mb-2">About the Founder</h3>
                  <p className="text-black font-bold mb-2">
                    The institute was established under the inspiration of <span className="text-red-600 font-bold">M.P. Shri. Prataprao G. Jadhao</span> — 
                    a respected social leader of Buldhana district whose lifelong commitment to education, 
                    health and rural upliftment shaped the foundation of the trust.
                  </p>
                </div>
              </div>
            </div>

            {/* Vision & Legacy */}
            <div className="group p-6 rounded-2xl bg-white border-2 border-red-300 hover:shadow-lg hover:border-red-500 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🌟</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-black mb-2">Vision & Legacy</h3>
                  <p className="text-black font-bold">
                    His vision was to create an institution that combines the timeless wisdom of Ayurveda 
                    with modern academic rigor, so that talented students from rural Maharashtra could become 
                    qualified Ayurvedic doctors without leaving the region.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Guiding Light */}
            <div className="group p-6 rounded-2xl bg-white border-2 border-red-300 hover:shadow-lg hover:border-red-500 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">✨</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-black mb-2">Guiding Light</h3>
                  <p className="text-black font-bold">
                    His legacy continues to guide every academic, clinical and social initiative undertaken 
                    by the college today. For over three decades, his principles have been the guiding light 
                    for thousands of students and faculty members.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Closing Quote Box */}
      <div className="bg-white rounded-2xl p-8 border-2 border-red-300 hover:shadow-lg transition-all">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <span className="text-4xl text-red-600">"</span>
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mt-2 rounded-full"></div>
        </div>
        <div className="space-y-4">
          <p className="text-black leading-relaxed text-center italic font-bold max-w-3xl mx-auto text-lg">
            The true purpose of education is to create responsible citizens who can serve humanity with knowledge, 
            compassion, and integrity.
          </p>
          <div className="text-center pt-4 border-t-2 border-red-200">
            <p className="font-bold text-red-600 text-lg">M.P. Shri. Prataprao G. Jadhao</p>
            <p className="text-sm text-black font-bold">Founder Chairman</p>
            <p className="text-xs text-black font-bold mt-1">Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha</p>
          </div>
        </div>
      </div>

      {/* Legacy Cards - Same grid style as AboutUs */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="group p-6 rounded-2xl bg-white border-2 border-red-300 hover:shadow-lg hover:border-red-500 transition-all text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <span className="text-3xl">🏫</span>
          </div>
          <h4 className="font-bold text-black text-lg mb-2">Educational Vision</h4>
          <p className="text-sm text-black font-bold">
            Committed to providing quality education to rural youth, empowering them to become successful professionals.
          </p>
        </div>
        
        <div className="group p-6 rounded-2xl bg-white border-2 border-red-300 hover:shadow-lg hover:border-red-500 transition-all text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <span className="text-3xl">❤️</span>
          </div>
          <h4 className="font-bold text-black text-lg mb-2">Social Service</h4>
          <p className="text-sm text-black font-bold">
            Dedicated to serving the community through education, healthcare, and rural development initiatives.
          </p>
        </div>
        
        <div className="group p-6 rounded-2xl bg-white border-2 border-red-300 hover:shadow-lg hover:border-red-500 transition-all text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <span className="text-3xl">🌱</span>
          </div>
          <h4 className="font-bold text-black text-lg mb-2">Rural Development</h4>
          <p className="text-sm text-black font-bold">
            Focused on uplifting rural communities through education, healthcare access, and sustainable development.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FounderChairman;