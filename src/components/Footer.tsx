export function Footer() {
  return (
    <footer className="bg-brand text-white mt-12">
      <div className="mx-auto max-w-7xl px-4 py-8 grid md:grid-cols-3 gap-6 text-sm">
        <div>
          <h3 className="font-semibold mb-2">Shree Saptashrungi Ayurved Mahavidyalaya & Hospital</h3>
          <p>Kamal Nagar, Hirawadi, Panchavati, Nashik - 422003</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p>Email: ssamnsk@gmail.com</p>
          <p>Landline: +91 253 2621565</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Codes</h3>
          <p>Institution: NCISM-AYU 0181</p>
          <p>MUHS: 123302 · MH CET: 3126</p>
        </div>
      </div>
      <div className="border-t border-white/20 py-3 text-center text-xs">
        © {new Date().getFullYear()} SSAM Nashik. All rights reserved.
      </div>
    </footer>
  );
}
