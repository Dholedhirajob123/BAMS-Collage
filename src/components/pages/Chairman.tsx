// components/pages/Chairman.tsx
import secretaryImage from "@/assets/secretary.jpg";

export function Chairman() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      
      
      {/* Secretary - Image Left, Text Right */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Image Section - Left Side */}
        <div className="md:w-1/2 md:sticky md:top-24">
          <div className="relative rounded-2xl overflow-hidden shadow-xl group">
            <img
              src={secretaryImage}
              alt="Secretary - Rajashri Ayurvedic Medical College"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-white text-lg font-bold">Mr. Rushikesh P. Jadhao</p>
              <p className="text-amber-300 text-sm">Secretary</p>
              <p className="text-white/70 text-xs">Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha</p>
            </div>
          </div>
        </div>
        
        {/* Content Section - Right Side */}
        <div className="md:w-1/2 space-y-6">
          <div className="relative pl-6 border-l-4 border-amber-500">
            <p className="text-foreground leading-relaxed text-lg italic">
              "Our vision is to create world-class Ayurvedic professionals who can serve humanity with 
              compassion, integrity, and excellence, while preserving the rich heritage of Indian medical science."
            </p>
            <p className="text-amber-600 dark:text-amber-400 font-semibold mt-3">— Mr. Rushikesh P. Jadhao, Secretary</p>
          </div>
          
          <p className="text-foreground leading-relaxed">
            Mr. Rushikesh P. Jadhao, the dynamic Secretary of Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha, 
            brings youthful energy, modern vision, and administrative excellence to Rajashri Ayurvedic Medical College & Hospital. 
            As a young leader with a forward-thinking approach, he is committed to transforming the institution into a 
            center of excellence in Ayurvedic education and healthcare.
          </p>
          
          <p className="text-foreground leading-relaxed">
            With a strong background in educational management and a deep understanding of the challenges facing 
            rural education, Mr. Rushikesh Jadhao has been instrumental in implementing innovative programs and 
            infrastructure upgrades at the college. Under his leadership, the institution has witnessed significant 
            growth in academic standards, research output, and student development initiatives.
          </p>
          
          <p className="text-foreground leading-relaxed">
            Under his visionary leadership, the college has achieved NAAC B++ accreditation, established PG programs 
            in 9 specializations, and developed state-of-the-art research facilities. His commitment to quality 
            education and affordable healthcare continues to drive the institution towards greater heights of excellence.
          </p>
        </div>
      </div>

      {/* Secretary's Message Box */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-2xl p-8 border border-amber-100 dark:border-amber-800">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900 mb-4">
            <span className="text-3xl">📜</span>
          </div>
          <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-400">Secretary's Message</h3>
        </div>
        <div className="space-y-4">
          <p className="text-foreground leading-relaxed text-center italic">
            "At Rajashri Ayurvedic Medical College, we are committed to nurturing the next generation of Ayurvedic 
            physicians who will carry forward India's ancient medical heritage with pride and scientific rigor. 
            Our institution is a perfect blend of tradition and modernity, where students learn classical texts 
            in state-of-the-art facilities."
          </p>
          <p className="text-foreground leading-relaxed text-center">
            I invite all aspiring medical students to join our family. Here, you will not only receive quality 
            education but also develop the compassion, integrity, and professional skills needed to serve society 
            as dedicated healthcare providers. Together, let us work towards making quality healthcare accessible 
            to all, especially in rural areas.
          </p>
          <div className="text-center mt-6 pt-4 border-t border-amber-200 dark:border-amber-800">
            <p className="font-bold text-amber-700 dark:text-amber-400">Mr. Rushikesh P. Jadhao</p>
            <p className="text-sm text-muted-foreground">Secretary</p>
            <p className="text-xs text-muted-foreground mt-1">Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha</p>
          </div>
        </div>
      </div>

      {/* Secretary's Vision Cards - Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-100 dark:border-blue-800 text-center">
          <div className="text-4xl mb-3">🎓</div>
          <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">Quality Education</h4>
          <p className="text-sm text-muted-foreground">
            Committed to providing world-class Ayurvedic education that meets global standards and prepares 
            students for successful careers in healthcare.
          </p>
        </div>
        
        <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20 border border-green-100 dark:border-green-800 text-center">
          <div className="text-4xl mb-3">🔬</div>
          <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">Research & Innovation</h4>
          <p className="text-sm text-muted-foreground">
            Promoting cutting-edge research in classical Ayurvedic formulations, drug standardization, and 
            evidence-based medicine for global recognition.
          </p>
        </div>
        
        <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-100 dark:border-purple-800 text-center">
          <div className="text-4xl mb-3">🤝</div>
          <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-2">Community Service</h4>
          <p className="text-sm text-muted-foreground">
            Dedicated to serving rural communities through affordable healthcare, health awareness camps, and 
            outreach programs that make a difference.
          </p>
        </div>
      </div>

      {/* About the Trust */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950/20 dark:to-gray-950/20 rounded-2xl p-8 border border-border">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 mb-4">
            <span className="text-3xl">🏛️</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-400">About the Trust</h3>
          <p className="text-muted-foreground">Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha</p>
        </div>
        <div className="space-y-4">
          <p className="text-foreground leading-relaxed">
            Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha is a renowned educational trust dedicated to 
            spreading quality education and healthcare services in the rural belts of Maharashtra. Established with 
            the noble vision of empowering rural youth through education, the trust has been instrumental in 
            establishing multiple educational institutions across the region.
          </p>
          <p className="text-foreground leading-relaxed">
            Under the able leadership of Mr. Rushikesh P. Jadhao as Secretary, the trust continues to expand its 
            footprint in the education sector, with a special focus on professional courses like Ayurveda, Engineering, 
            and Management. The trust's commitment to excellence, transparency, and social service has earned it a 
            stellar reputation among students and parents alike.
          </p>
          <p className="text-foreground leading-relaxed">
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