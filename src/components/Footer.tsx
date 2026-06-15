export function Footer() {
  return (
    <footer className="bg-brand text-white mt-12">
      <div className="mx-auto max-w-7xl px-4 py-8 grid md:grid-cols-3 gap-6 text-sm">
        <div>
          <h3 className="font-semibold mb-2">RAJASHRI AYURVEDIC MEDICAL COLLEGE & HOSPITAL</h3>
          <p>Mehkar, Dist. Buldhana, Maharashtra</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p>Email: <a href="mailto:rajshreeayurvedic@gmail.com" className="text-brand hover:underline">rajshreeayurvedic@gmail.com</a></p>
          <p>Phone: 91 - 8087203870 | 8087303870</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Codes</h3>
          <p>Institution: NCISM-AYU 0181</p>
          <p>MUHS: 123302 · MH CET: 3126</p>
        </div>
      </div>
      <div className="border-t border-white/20 py-3 text-center text-xs">
        © {new Date().getFullYear()} Rajashri Ayurvedic Mehkar. All rights reserved.
      </div>
    </footer>
  );
}
