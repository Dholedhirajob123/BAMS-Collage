import { Link } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { HeroSlider } from '@/components/HeroSlider';
import { useDocSection } from '@/lib/docsStore';
import gPreview1 from '@/assets/gallery-1.jpg';
import gPreview2 from '@/assets/gallery-2.jpg';
import gPreview5 from '@/assets/gallery-5.jpg';
import gPreview8 from '@/assets/gallery-8.jpg';
import { useState, useEffect, useRef } from 'react';

// Import person images
import founderImage from '@/assets/President.jpg';
import secretaryImage from '@/assets/secretary.jpg';

export function Index() {
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

  // Get all news and events for scrolling
  const allNewsAndEvents = [...newsEvents.files, ...notices.files]
    .sort((a, b) => b.addedAt - a.addedAt);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <HeroSlider />

      <div className="grid md:grid-cols-[260px_1fr] gap-6">
        <Sidebar />

        <div className="space-y-6">
          <section className="bg-white rounded-xl shadow-sm">
            <header className="bg-red-50 px-4 py-2 border-b border-red-300 rounded-t-xl">
              <h2 className="text-sm font-bold text-red-600">Welcome To</h2>
            </header>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-red-700">
                RAJASHRI AYURVEDIC MEDICAL COLLEGE & HOSPITAL
              </h3>
              <p className="text-sm text-black font-bold leading-relaxed text-justify">
                Rajashri Ayurvedic Medical College & Hospital is a premier institution dedicated to excellence in 
                Ayurvedic education, research, and patient care. Run by the esteemed Dharmveer Diliprao Rahate 
                Shikshan & Bahu-Uddeshiya Sanstha, the college is committed to producing skilled, compassionate, 
                and ethical Ayurvedic physicians who can serve society with dedication and integrity.
              </p>
              <p className="text-sm text-black font-bold leading-relaxed text-justify">
                The college is affiliated to Maharashtra University of Health Sciences (MUHS), Nashik and recognized 
                by the National Commission for Indian System of Medicine (NCISM), New Delhi. The institution maintains the highest standards of quality education and continuous 
                improvement in all its academic and clinical activities.
              </p>
              <p className="text-sm text-black font-bold leading-relaxed text-justify">
                The sprawling campus well-equipped laboratories for each pre-clinical and para-clinical department, departmental museums, 
                and a central seminar hall. The infrastructure is designed to facilitate immersive learning 
                experiences and practical training for BAMS students as per NCISM standards.
              </p>
              <p className="text-sm text-black font-bold leading-relaxed text-justify">
                The institution takes pride in its digital library, stocked with classical Ayurvedic Samhitas, 
                modern medical textbooks, reference journals, and research publications. The library offers access 
                to e-journals and online databases, all equipped with Wi-Fi connectivity throughout the campus.
              </p>
              <p className="text-sm text-black font-bold leading-relaxed text-justify">
                A lush medicinal plant nursery (herbal garden) cultivates numerous species of Ayurvedic herbs used 
                in Dravyaguna and Rasashastra teaching, giving students live exposure to the plants they study in 
                classical texts. The garden also supports the teaching pharmacy with raw materials for in-house 
                Ayurvedic formulations, promoting hands-on learning in pharmaceutical sciences.
              </p>
            </div>
          </section>

          <div className="grid md:grid-cols-3 gap-4">
            <PersonCard 
              name="M.P. Shri. Prataprao G. Jadhao" 
              role="Founder Chairman" 
              slug="founder-chairman"
              imageUrl={founderImage}
            />
            <NewsCard allNewsAndEvents={allNewsAndEvents} />
            <PersonCard 
              name="Mr. Rushikesh P. Jadhao" 
              role="Secretary" 
              slug="secretary"
              imageUrl={secretaryImage}
            />
          </div>

          <section className="rounded-xl overflow-hidden shadow-sm bg-white">
            <header className="bg-red-600 text-white px-5 py-3 border-b border-red-700">
              <h3 className="font-bold text-lg text-white">Vision</h3>
            </header>
            <div className="bg-white text-black p-5">
              <p className="text-sm text-black font-bold">
                To be a pioneer Institute providing the health services to the community and also to
                be one of the best academic Institutes in the field of Health Sciences.
              </p>
            </div>
          </section>

          <section className="rounded-xl overflow-hidden shadow-sm bg-white">
            <header className="bg-red-600 text-white px-5 py-3 border-b border-red-700">
              <h3 className="font-bold text-lg text-white">Mission</h3>
            </header>
            <div className="bg-white text-black p-5">
              <ol className="text-sm text-black font-bold space-y-1 list-decimal list-inside">
                <li>To produce Highly Reputed Ayurveda Professionals contributing for Global Health Developments.</li>
                <li>To strengthen the Research and Innovation in the field of Ayurveda.</li>
                <li>To provide Health facilities across the rural and urban areas.</li>
              </ol>
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
      to={`/${slug}`}
      className="block bg-white rounded-xl p-4 text-center hover:shadow-xl transition-all group"
    >
      <p className="text-sm text-red-600 font-bold mb-2">{role}</p>
      <div className="h-32 w-32 mx-auto rounded-full overflow-hidden bg-gray-100 flex items-center justify-center mb-2 ring-2 ring-red-500/20 group-hover:ring-red-500/50 transition-all">
        {imageUrl && !imgError ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-3xl font-bold text-red-600">
            {getInitials()}
          </span>
        )}
      </div>
      <p className="font-bold text-black mt-2">{name}</p>
    </Link>
  );
}

function NewsCard({ allNewsAndEvents }: { allNewsAndEvents: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const isNewItem = (addedAt: number) => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return addedAt > sevenDaysAgo;
  };

  useEffect(() => {
    if (allNewsAndEvents.length === 0) return;
    
    const startScrolling = () => {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
      
      scrollIntervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === allNewsAndEvents.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    };
    
    startScrolling();
    
    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [allNewsAndEvents.length]);

  useEffect(() => {
    if (isHovered && scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    } else if (!isHovered && allNewsAndEvents.length > 0) {
      scrollIntervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === allNewsAndEvents.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    }
    
    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [isHovered, allNewsAndEvents.length]);

  const displayedItems = allNewsAndEvents.slice(0, 10);
  const currentItem = displayedItems[currentIndex] || null;

  if (allNewsAndEvents.length === 0) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-red-600">News & Events</h3>
          <Link to="/news-events" className="text-xs text-red-600 hover:underline font-bold">
            View All →
          </Link>
        </div>
        <p className="text-xs text-black font-bold text-center py-4">No news yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-red-600">News & Events</h3>
        <Link to="/news-events" className="text-xs text-red-600 hover:underline font-bold">
          View All →
        </Link>
      </div>
      
      <div 
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {currentItem && (
          <div className="bg-red-50 rounded-xl p-3 transition-all duration-500">
            <div className="flex items-start gap-3">
              <span className="text-xl shrink-0 mt-0.5">📢</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-bold text-black truncate">{currentItem.name}</p>
                  {isNewItem(currentItem.addedAt) && (
                    <span className="bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase animate-pulse shrink-0">
                      NEW
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-black font-bold mt-1">
                  {new Date(currentItem.addedAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
                <a
                  href={currentItem.dataUrl}
                  download={currentItem.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-red-600 text-white text-xs px-3 py-1 rounded-full mt-2 hover:bg-red-700 transition-colors font-bold"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        )}
        
        {displayedItems.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-3">
            {displayedItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-4 bg-red-500' 
                    : 'w-1.5 bg-gray-300 hover:bg-red-300'
                }`}
                aria-label={`Go to item ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;