import logoAsset from "@/assets/main logo.png";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-brand-dark to-brand text-white mt-12">
      <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-4 gap-8 text-sm">
         
          
          <div>
            <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-amber-400"></span>
              Contact
            </h3>
            <div className="space-y-2 text-white/80">
              <p className="flex items-start gap-2 text-sm">
                <span>📧</span>
                <a href="mailto:rajshreeayurvedic@gmail.com" className="hover:text-amber-300 transition-colors break-all">
                  rajshreeayurvedic@gmail.com
                </a>
              </p>
              <p className="flex items-start gap-2 text-sm">
                <span>📞</span>
                <span>+91 - 8087203870 | 8087303870</span>
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-amber-400"></span>
              Codes
            </h3>
            <div className="space-y-2 text-white/80 text-sm">
              <p>🏛️ Institution: NCISM-AYU0870</p>
              <p>📚 MUHS: 125131 · MH CET: 03292</p>
            </div>
          </div>
          
          {/* Created By Section */}
          <div>
            <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-amber-400"></span>
              Developed By
            </h3>
            <div className="space-y-2">
              <p className="text-white/80 text-sm">A & D Company</p>
              <div className="flex gap-3 pt-2">
                <a href="#" className="text-white/60 hover:text-amber-300 transition-colors text-xs">
                  Privacy Policy
                </a>
                <span className="text-white/30">|</span>
          
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/20 py-4 text-center">
        <p className="text-white/70 text-xs md:text-sm">
          © {new Date().getFullYear()} Rajashri Ayurvedic Mehkar. All rights reserved.
        </p>
      </div>
    </footer>
  );
}