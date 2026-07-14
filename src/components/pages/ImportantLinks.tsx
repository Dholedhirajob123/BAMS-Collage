// components/pages/ImportantLinks.tsx
import { Link } from "@tanstack/react-router";

const IMPORTANT_LINKS = [
  // Government & Regulatory Bodies
  {
    title: "Ministry of Ayush",
    url: "https://ayush.gov.in/",
    external: true,
    icon: "🏛️",
  },
  {
    title: "National Commission for Indian System of Medicine",
    url: "https://ncismindia.org/",
    external: true,
    icon: "📜",
  },
  {
    title: "Maharashtra University of Health Sciences",
    url: "https://www.muhs.ac.in/",
    external: true,
    icon: "🎓",
  },
  {
    title: "Directorate of Medical Education & Research",
    url: "https://www.mahafra.org/",
    external: true,
    icon: "📚",
  },
  {
    title: "Ministry of Education",
    url: "https://www.education.gov.in/",
    external: true,
    icon: "📖",
  },
  {
    title: "MCIM, Mumbai",
    url: "https://mcimindia.co.in/",
    external: true,
    icon: "⚕️",
  },
  {
    title: "Fees Regulating Authority",
    url: "https://www.mahafra.org/",
    external: true,
    icon: "💰",
  },
  {
    title: "Pravesh Niyantran Samiti",
    url: "https://www.mahafra.org/",
    external: true,
    icon: "📝",
  },
];

export function ImportantLinks() {
  const externalLinks = IMPORTANT_LINKS.filter(link => link.external);

  return (
    <div className="space-y-6">
      {/* External Links */}
      <div>
        <div className="grid md:grid-cols-2 gap-3">
          {externalLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl border-2 border-red-300 bg-white hover:border-red-500 hover:shadow-lg transition-all group"
            >
              <span className="text-lg">{link.icon}</span>
              <span className="font-bold text-sm text-black group-hover:text-red-600 transition-colors">{link.title}</span>
              <span className="text-xs text-red-600 font-bold ml-auto">↗</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImportantLinks;