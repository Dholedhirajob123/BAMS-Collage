// components/pages/FounderChairman.tsx
import founderImage from "@/assets/President.jpg";
import campus3 from "@/assets/campus-3.jpg";

export function FounderChairman() {
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="relative h-[300px] rounded-3xl overflow-hidden shadow-2xl">
        <img
          src={founderImage}
          alt="Founder Chairman"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-0.5 bg-amber-400 rounded-full"></div>
              <span className="text-sm text-amber-400 font-semibold tracking-wider">OUR FOUNDER</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Founder Chairman</h1>
            <p className="text-lg text-white/90">M.P. Shri. Prataprao G. Jadhao</p>
          </div>
        </div>
      </div>

      {/* Founder Section - Left Side Pic + Right Side Info */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Side - Founder Image */}
        <div className="md:w-1/3 sticky top-24">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
              src={campus3}
              alt="M.P. Shri. Prataprao G. Jadhao"
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-white text-sm font-semibold">M.P. Shri. Prataprao G. Jadhao</p>
            </div>
          </div>
        </div>

        {/* Right Side - Information */}
        <div className="md:w-2/3 space-y-6">
          {/* Quote */}
          <div className="relative pl-6 border-l-4 border-amber-500">
            <p className="text-lg italic text-foreground leading-relaxed">
              "Education is the strongest weapon to transform society. My dream is to see every child from rural Maharashtra become a successful professional."
            </p>
            <p className="text-amber-600 dark:text-amber-400 font-semibold mt-2">— M.P. Shri. Prataprao G. Jadhao</p>
          </div>

          {/* Bio */}
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">
              The institute was established under the inspiration of <span className="text-amber-600 dark:text-amber-400 font-semibold">M.P. Shri. Prataprao G. Jadhao</span> — 
              a respected social leader of Buldhana district whose lifelong commitment to education, 
              health and rural upliftment shaped the foundation of the trust.
            </p>
            <p className="text-foreground leading-relaxed">
              His vision was to create an institution that combines the timeless wisdom of Ayurveda 
              with modern academic rigor, so that talented students from rural Maharashtra could become 
              qualified Ayurvedic doctors without leaving the region.
            </p>
            <p className="text-foreground leading-relaxed">
              His legacy continues to guide every academic, clinical and social initiative undertaken 
              by the college today. For over three decades, his principles have been the guiding light 
              for thousands of students and faculty members.
            </p>
          </div>
        </div>
      </div>

      {/* Closing Quote */}
      <div className="relative py-8 px-6 text-center bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-2xl">
        <div className="text-4xl text-amber-400 mb-2">"</div>
        <p className="text-foreground italic max-w-2xl mx-auto leading-relaxed">
          The true purpose of education is to create responsible citizens who can serve humanity with knowledge, 
          compassion, and integrity.
        </p>
        <p className="text-amber-600 dark:text-amber-400 font-semibold mt-3">— M.P. Shri. Prataprao G. Jadhao</p>
      </div>
    </div>
  );
}

export default FounderChairman;