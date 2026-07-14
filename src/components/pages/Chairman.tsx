// components/pages/Chairman.tsx
import secretaryImage from "@/assets/secretary.jpg";

export function Chairman() {
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
                    src={secretaryImage}
                    alt="Secretary - Rajashri Ayurvedic Medical College"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white text-lg font-bold leading-tight">
                      Mr. Rushikesh P. Jadhao<br />
                      <span className="text-red-400">Secretary</span>
                    </h3>
                  </div>
                </div>
              </div>

              <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-700 rounded-full mb-4"></div>
              <h2 className="text-2xl font-bold text-black mb-2">Our Secretary</h2>
              <p className="text-black text-sm font-bold">
                <span className="text-red-600 font-bold">Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha</span>
                <br />
                <span className="text-xs text-black">Rajashri Ayurvedic Medical College, Mehkar</span>
              </p>
            </div>
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
                  <h3 className="font-bold text-lg text-black mb-2">Secretary's Vision</h3>
                  <p className="text-black font-bold mb-2 italic">
                    "Our vision is to create world-class Ayurvedic professionals who can serve humanity with 
                    compassion, integrity, and excellence, while preserving the rich heritage of Indian medical science."
                  </p>
                  <p className="text-red-600 font-bold">— Mr. Rushikesh P. Jadhao, Secretary</p>
                </div>
              </div>
            </div>

            {/* About Secretary */}
            <div className="group p-6 rounded-2xl bg-white border-2 border-red-300 hover:shadow-lg hover:border-red-500 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">👨‍💼</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-black mb-2">About the Secretary</h3>
                  <p className="text-black font-bold mb-2">
                    <span className="text-red-600 font-bold">Mr. Rushikesh P. Jadhao</span>, the dynamic Secretary of Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha, 
                    brings youthful energy, modern vision, and administrative excellence to <span className="font-bold">Rajashri Ayurvedic Medical College & Hospital</span>. 
                    As a young leader with a forward-thinking approach, he is committed to transforming the institution into a 
                    center of excellence in Ayurvedic education and healthcare.
                  </p>
                </div>
              </div>
            </div>

            {/* Leadership & Achievements */}
            <div className="group p-6 rounded-2xl bg-white border-2 border-red-300 hover:shadow-lg hover:border-red-500 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-black mb-2">Leadership & Achievements</h3>
                  <p className="text-black font-bold">
                    With a strong background in educational management and a deep understanding of the challenges facing 
                    rural education, <span className="text-red-600 font-bold">Mr. Rushikesh Jadhao</span> has been instrumental in implementing innovative programs and 
                    infrastructure upgrades at the college. Under his leadership, the institution has witnessed significant 
                    growth in academic standards, research output, and student development initiatives.
                  </p>
                </div>
              </div>
            </div>
            
            {/* NAAC & PG Programs */}
            <div className="group p-6 rounded-2xl bg-white border-2 border-red-300 hover:shadow-lg hover:border-red-500 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-black mb-2">NAAC Accreditation & PG Programs</h3>
                  <p className="text-black font-bold">
                    Under his visionary leadership, the college has achieved <span className="text-red-600 font-bold">NAAC B++ accreditation</span>, established PG programs 
                    in <span className="text-red-600 font-bold">9 specializations</span>, and developed state-of-the-art research facilities. His commitment to quality 
                    education and affordable healthcare continues to drive the institution towards greater heights of excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secretary's Message Box - Same style as AboutUs */}
      <div className="bg-white rounded-2xl p-8 border-2 border-red-300 hover:shadow-lg transition-all">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <span className="text-3xl">📜</span>
          </div>
          <h3 className="text-2xl font-bold text-black">Secretary's Message</h3>
          <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mt-2 rounded-full"></div>
        </div>
        <div className="space-y-4">
          <p className="text-black leading-relaxed text-center italic font-bold">
            "At Rajashri Ayurvedic Medical College, we are committed to nurturing the next generation of Ayurvedic 
            physicians who will carry forward India's ancient medical heritage with pride and scientific rigor. 
            Our institution is a perfect blend of tradition and modernity, where students learn classical texts 
            in state-of-the-art facilities."
          </p>
          <p className="text-black leading-relaxed text-center font-bold">
            I invite all aspiring medical students to join our family. Here, you will not only receive quality 
            education but also develop the compassion, integrity, and professional skills needed to serve society 
            as dedicated healthcare providers. Together, let us work towards making quality healthcare accessible 
            to all, especially in rural areas.
          </p>
          <div className="text-center mt-6 pt-4 border-t-2 border-red-200">
            <p className="font-bold text-red-600">Mr. Rushikesh P. Jadhao</p>
            <p className="text-sm text-black font-bold">Secretary</p>
            <p className="text-xs text-black font-bold mt-1">Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha</p>
          </div>
        </div>
      </div>

      {/* Vision Cards - Same grid style as AboutUs */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="group p-6 rounded-2xl bg-white border-2 border-red-300 hover:shadow-lg hover:border-red-500 transition-all text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <span className="text-3xl">🎓</span>
          </div>
          <h4 className="font-bold text-black text-lg mb-2">Quality Education</h4>
          <p className="text-sm text-black font-bold">
            Committed to providing world-class Ayurvedic education that meets global standards and prepares 
            students for successful careers in healthcare.
          </p>
        </div>
        
        <div className="group p-6 rounded-2xl bg-white border-2 border-red-300 hover:shadow-lg hover:border-red-500 transition-all text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <span className="text-3xl">🔬</span>
          </div>
          <h4 className="font-bold text-black text-lg mb-2">Research & Innovation</h4>
          <p className="text-sm text-black font-bold">
            Promoting cutting-edge research in classical Ayurvedic formulations, drug standardization, and 
            evidence-based medicine for global recognition.
          </p>
        </div>
        
        <div className="group p-6 rounded-2xl bg-white border-2 border-red-300 hover:shadow-lg hover:border-red-500 transition-all text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <span className="text-3xl">🤝</span>
          </div>
          <h4 className="font-bold text-black text-lg mb-2">Community Service</h4>
          <p className="text-sm text-black font-bold">
            Dedicated to serving rural communities through affordable healthcare, health awareness camps, and 
            outreach programs that make a difference.
          </p>
        </div>
      </div>

      {/* About the Trust - Same style as AboutUs */}
      <div className="bg-white rounded-2xl p-8 border-2 border-red-300 hover:shadow-lg transition-all">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <span className="text-3xl">🏛️</span>
          </div>
          <h3 className="text-2xl font-bold text-black">About the Trust</h3>
          <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mt-2 rounded-full"></div>
          <p className="text-black font-bold mt-2">Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha</p>
        </div>
        <div className="space-y-4">
          <p className="text-black leading-relaxed font-bold">
            Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha is a renowned educational trust dedicated to 
            spreading quality education and healthcare services in the rural belts of Maharashtra. Established with 
            the noble vision of empowering rural youth through education, the trust has been instrumental in 
            establishing multiple educational institutions across the region.
          </p>
          <p className="text-black leading-relaxed font-bold">
            Under the able leadership of <span className="text-red-600 font-bold">Mr. Rushikesh P. Jadhao</span> as Secretary, the trust continues to expand its 
            footprint in the education sector, with a special focus on professional courses like Ayurveda, Engineering, 
            and Management. The trust's commitment to excellence, transparency, and social service has earned it a 
            stellar reputation among students and parents alike.
          </p>
          <p className="text-black leading-relaxed font-bold">
            Rajashri Ayurvedic Medical College & Hospital stands as a shining example of the trust's dedication to 
            healthcare education. With state-of-the-art infrastructure, experienced faculty, and a strong focus on 
            research and innovation, the college is poised to become a leading institution in Ayurvedic education 
            in Maharashtra.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Chairman;