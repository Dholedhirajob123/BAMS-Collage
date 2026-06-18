// routes/index.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { Sidebar } from "@/components/Sidebar";
import { HeroSlider } from "@/components/HeroSlider";
import { useDocSection } from "@/lib/docsStore";
import gPreview1 from "@/assets/gallery-1.jpg";
import gPreview2 from "@/assets/gallery-2.jpg";
import gPreview5 from "@/assets/gallery-5.jpg";
import gPreview8 from "@/assets/gallery-8.jpg";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Import person images
import founderImage from "@/assets/President.jpg";
import secretaryImage from "@/assets/secretary.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const homeDocs = useDocSection("home-page-documents");
  const homeNotices = useDocSection("home-page-notices");
  const homeLinks = useDocSection("home-page-important-links");
  const newsEvents = useDocSection("news-events");
  const notices = useDocSection("notices");
  
  const [showAllDocs, setShowAllDocs] = useState(false);
  const [showAllNotices, setShowAllNotices] = useState(false);
  const [showAllNews, setShowAllNews] = useState(false);

  const displayedDocs = showAllDocs ? homeDocs.files : homeDocs.files.slice(0, 3);
  const displayedNotices = showAllNotices ? homeNotices.files : homeNotices.files.slice(0, 3);
  const displayedNews = showAllNews ? newsEvents.files : newsEvents.files.slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <HeroSlider />

      <div className="grid md:grid-cols-[260px_1fr] gap-6">
        <Sidebar />

        <div className="space-y-6">

          <section className="border border-border rounded-md bg-card">
            <header className="bg-secondary px-4 py-2 border-b border-border">
              <h2 className="text-sm font-medium text-muted-foreground">Welcome To</h2>
            </header>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-brand">
                RAJASHRI AYURVEDIC MEDICAL COLLEGE & HOSPITAL
              </h3>
              
              <p className="text-sm text-foreground leading-relaxed text-justify">
                Rajashri Ayurvedic Medical College & Hospital is a premier institution dedicated to excellence in 
                Ayurvedic education, research, and patient care. Run by the esteemed Dharmveer Diliprao Rahate 
                Shikshan & Bahu-Uddeshiya Sanstha, the college is committed to producing skilled, compassionate, 
                and ethical Ayurvedic physicians who can serve society with dedication and integrity.
              </p>
              
              <p className="text-sm text-foreground leading-relaxed text-justify">
                The college is affiliated to Maharashtra University of Health Sciences (MUHS), Nashik and recognized 
                by the National Commission for Indian System of Medicine (NCISM), New Delhi. The institution maintains the highest standards of quality education and continuous 
                improvement in all its academic and clinical activities.
              </p>
              
              <p className="text-sm text-foreground leading-relaxed text-justify">
                The sprawling campus well-equipped laboratories for each pre-clinical and para-clinical department, departmental museums, 
                and a central seminar hall. The infrastructure is designed to facilitate immersive learning 
                experiences and practical training for BAMS students as per NCISM standards.
              </p>

              <p className="text-sm text-foreground leading-relaxed text-justify">
                The institution takes pride in its digital library, stocked with classical Ayurvedic Samhitas, 
                modern medical textbooks, reference journals, and research publications. The library offers access 
                to e-journals and online databases, all equipped with Wi-Fi connectivity throughout the campus.
              </p>
              
              <p className="text-sm text-foreground leading-relaxed text-justify">
                A lush medicinal plant nursery (herbal garden) cultivates numerous species of Ayurvedic herbs used 
                in Dravyaguna and Rasashastra teaching, giving students live exposure to the plants they study in 
                classical texts. The garden also supports the teaching pharmacy with raw materials for in-house 
                Ayurvedic formulations, promoting hands-on learning in pharmaceutical sciences.
              </p>
            </div>
          </section>

          {/* Person Cards with Images */}
          <div className="grid md:grid-cols-3 gap-4">
            <PersonCard 
              name="M.P. Shri. Prataprao G. Jadhao" 
              role="Founder Chairman" 
              slug="founder-chairman"
              imageUrl={founderImage}
            />
            <NewsCard />
            <PersonCard 
              name="Mr. Rushikesh P. Jadhao" 
              role="Secretary" 
              slug="secretary"
              imageUrl={secretaryImage}
            />
          </div>

          {/* Vision Section */}
          <section className="rounded-md overflow-hidden border border-border">
            <header className="bg-vision text-white px-5 py-3">
              <h3 className="font-semibold text-lg">Vision</h3>
            </header>
            <div className="bg-vision/90 text-white p-5">
              <p className="text-sm">
                To be a pioneer Institute providing the health services to the community and also to
                be one of the best academic Institutes in the field of Health Sciences.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="rounded-md overflow-hidden border border-border">
            <header className="bg-mission text-white px-5 py-3">
              <h3 className="font-semibold text-lg">Mission</h3>
            </header>
            <div className="bg-mission/90 text-white p-5">
              <ol className="text-sm space-y-1 list-decimal list-inside">
                <li>
                  To produce Highly Reputed Ayurveda Professionals contributing for Global Health
                  Developments.
                </li>
                <li>To strengthen the Research and Innovation in the field of Ayurveda.</li>
                <li>To provide Health facilities across the rural and urban areas.</li>
              </ol>
            </div>
          </section>

          {/* Campus Glimpses */}
          <section className="rounded-md overflow-hidden border border-border bg-gradient-to-br from-saffron-soft via-card to-secondary p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-xl text-brand">Campus Glimpses</h3>
                <p className="text-xs text-muted-foreground">Life at Rajashri Ayurvedic Mehkar</p>
              </div>
              <Link
                to="/$slug"
                params={{ slug: "photo-gallery" }}
                className="text-xs font-semibold text-saffron hover:underline"
              >
                View Full Gallery →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { src: gPreview1, label: "Library" },
                { src: gPreview2, label: "Herbal Garden" },
                { src: gPreview5, label: "Cultural" },
                { src: gPreview8, label: "Convocation" },
              ].map((p, i) => (
                <Link
                  key={i}
                  to="/$slug"
                  params={{ slug: "photo-gallery" }}
                  className="group relative overflow-hidden rounded-md aspect-square animate-scale-in"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <img
                    src={p.src}
                    alt={p.label}
                    loading="lazy"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                    <span className="text-white text-xs font-semibold">{p.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function PersonCard({ 
  name, 
  role, 
  slug, 
  imageUrl 
}: { 
  name: string; 
  role: string; 
  slug: string;
  imageUrl?: string;
}) {
  const [imgError, setImgError] = useState(false);
  
  const getInitials = () => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("");
  };

  return (
    <Link
      to="/$slug"
      params={{ slug }}
      className="block border border-border rounded-md bg-card p-4 text-center hover:shadow-md transition-shadow group"
    >
      <p className="text-sm text-muted-foreground mb-2">{role}</p>
      <div className="h-32 w-32 mx-auto rounded-full overflow-hidden bg-secondary flex items-center justify-center mb-2 ring-2 ring-brand/20 group-hover:ring-brand/50 transition-all">
        {imageUrl && !imgError ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-3xl font-bold text-brand">
            {getInitials()}
          </span>
        )}
      </div>
      <p className="font-semibold text-brand mt-2">{name}</p>
    </Link>
  );
}

function NewsCard() {
  const newsEvents = useDocSection("news-events");
  const notices = useDocSection("notices");
  
  // Get latest items for display
  const latestNews = [...newsEvents.files, ...notices.files]
    .sort((a, b) => b.addedAt - a.addedAt)
    .slice(0, 5);

  return (
    <div className="border border-border rounded-md bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">News & Events</h3>
        <Link
          to="/$slug"
          params={{ slug: "news-events" }}
          className="text-xs text-brand hover:underline font-semibold"
        >
          View All →
        </Link>
      </div>
      {latestNews.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-4">No news yet. Check back soon!</p>
      ) : (
        <div className="max-h-[320px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <ul className="space-y-2">
            {latestNews.map((item, index) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-2 text-sm bg-secondary/40 p-2 rounded hover:bg-secondary/60 transition-all duration-200 animate-slide-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-lg shrink-0">📢</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {new Date(item.addedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <a
                  href={item.dataUrl}
                  download={item.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand text-white text-xs px-2 py-1 rounded shrink-0 hover:bg-brand/80 transition-colors"
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}