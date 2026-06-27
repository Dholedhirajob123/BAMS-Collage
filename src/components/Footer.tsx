import logoAsset from "@/assets/mainlogo.png";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white mt-12">
      <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-base">
          
          {/* College Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logoAsset} 
                alt="Rajashri Ayurvedic Medical College" 
                className="h-14 w-14 object-contain bg-white/10 rounded-lg p-1"
              />
              <div>
                <h3 className="font-bold text-xl text-white leading-tight">
                  RAJASHRI AYURVEDIC
                </h3>
                <p className="text-sm text-white/80">Medical College & Hospital</p>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Accredited Ayurveda college and hospital in Mehkar, 
              Dist. Buldhana, Maharashtra.
            </p>
          </div>
          
          {/* Contact & Address */}
          <div>
            <h3 className="font-semibold text-xl mb-4 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-yellow-300"></span>
              Contact & Address
            </h3>
            <div className="space-y-3 text-white/80">
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wider mb-1">📍 Address</p>
                <p className="text-sm leading-relaxed text-white">
                  Cotton Market Road, Mehkar,<br />
                  Tq. Mehkar, Dist. Buldhana,<br />
                  Maharashtra - 443301
                </p>
              </div>
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wider mb-1">📧 Email</p>
                <p className="text-sm text-white break-all">
                  rajshreeayurvedic@gmail.com
                </p>
                <p className="text-sm text-white break-all">
                  2024rajashriayu0870@gmail.com
                </p>
              </div>
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wider mb-1">📞 Phone</p>
                <p className="text-sm text-white">
                  +91-8087203870 <span className="text-white/40 mx-1">|</span> +91-8087303870
                </p>
              </div>
            </div>
          </div>
          
          {/* Institution Codes */}
          <div>
            <h3 className="font-semibold text-xl mb-4 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-yellow-300"></span>
              Institution Codes
            </h3>
            <div className="space-y-2">
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-white/60 text-xs uppercase tracking-wider">NCISM Code</p>
                <p className="font-semibold text-yellow-200 text-base">AYU-0870</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-white/60 text-xs uppercase tracking-wider">MUHS Code</p>
                <p className="font-semibold text-yellow-200 text-base">125131</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-white/60 text-xs uppercase tracking-wider">MH CET Code</p>
                <p className="font-semibold text-yellow-200 text-base">03292</p>
              </div>
            </div>
          </div>
          
          {/* Developed By - Separate Column on Right */}
          <div>
            <h3 className="font-semibold text-xl mb-4 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-yellow-300"></span>
              Developed By
            </h3>
            <div className="space-y-3">
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-white font-bold text-xl">DGD Created</p>
                <div className="mt-3 pt-3 border-t border-white/20">
                  <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Contact Developer</p>
                 <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=developerdgd@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="text-white text-sm hover:text-yellow-200 transition-colors block"
>
  developerdgd@gmail.com
</a>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 text-white/50 text-sm pt-1">
                <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                <span className="text-white/30">|</span>
                <span className="hover:text-white cursor-pointer transition-colors">Terms of Use</span>
                <span className="text-white/30">|</span>
                <span className="hover:text-white cursor-pointer transition-colors">Sitemap</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-white/20 py-4 md:py-5 text-center bg-black/20">
        <p className="text-white/70 text-sm md:text-base">
          © {new Date().getFullYear()} Rajashri Ayurvedic Medical College & Hospital, Mehkar. All rights reserved.
        </p>
        <p className="text-white/40 text-xs md:text-sm mt-1">
          Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha's
        </p>
      </div>
    </footer>
  );
}