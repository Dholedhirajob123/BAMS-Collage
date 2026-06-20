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
    url: "https://www.dmer.org/",
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
    url: "https://www.mcim.org.in/",
    external: true,
    icon: "⚕️",
  },
  {
    title: "Fees Regulating Authority",
    url: "https://www.fra.org.in/",
    external: true,
    icon: "💰",
  },
  {
    title: "Pravesh Niyantran Samiti",
    url: "https://www.pns.org.in/",
    external: true,
    icon: "📝",
  },

 
];

export function ImportantLinks() {
  const externalLinks = IMPORTANT_LINKS.filter(link => link.external);
  const internalLinks = IMPORTANT_LINKS.filter(link => !link.external);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
        <div>
          <h2 className="text-xl font-bold text-brand">Important Links</h2>
          <p className="text-xs text-muted-foreground">
            Quick access to important government bodies, regulatory authorities, and internal resources.
          </p>
        </div>
      </div>

      {/* External Links */}
      <div>
        <div className="grid md:grid-cols-2 gap-3">
          {externalLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:shadow-md hover:border-amber-300 transition-all group"
            >
              <span className="text-lg">{link.icon}</span>
              <span className="font-medium text-sm group-hover:text-brand">{link.title}</span>
              <span className="text-xs text-muted-foreground ml-auto">↗</span>
            </a>
          ))}
        </div>
      </div>

     

    
    </div>
  );
}

export default ImportantLinks;