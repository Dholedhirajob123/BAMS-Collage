import { useParams, Link, Navigate } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { PAGE_MAP } from '@/lib/pages';
import { COUNCIL_CONTENT } from '@/components/CouncilTables';
import { PAGE_CONTENT } from '@/components/PageContent';
import { DEPARTMENTS, DepartmentPage } from '@/components/DepartmentContent';

export function SlugPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/" replace />;
  }

  // ---- Check if it's a department slug ----
  if (slug.startsWith('dept-')) {
    const dept = DEPARTMENTS.find((d) => d.slug === slug);
    if (!dept) {
      return <Navigate to="/" replace />;
    }
    const page = {
      title: dept.name,
      category: 'Academics',
      body: dept.short,
      slug: dept.slug,
    };

    return (
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-6">
        {/* Breadcrumb - Responsive */}
        <nav className="text-[10px] sm:text-xs text-black mb-3 sm:mb-4 overflow-x-auto whitespace-nowrap pb-1">
          <Link to="/" className="hover:underline text-black font-bold">Home</Link>
          <span className="mx-1 sm:mx-2 text-black">›</span>
          <span className="text-black font-bold">Academics</span>
          <span className="mx-1 sm:mx-2 text-black">›</span>
          <span className="text-black font-bold">{page.title}</span>
        </nav>
        
        {/* Grid - Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr] gap-4 sm:gap-6">
          <div className="hidden md:block">
            <Sidebar />
          </div>
          
          <article className="rounded-xl bg-white shadow-sm overflow-hidden border-2 border-red-300">
            <header className="bg-red-600 text-white px-4 sm:px-5 py-3 sm:py-4 rounded-t-xl">
              <h1 className="text-base sm:text-xl font-bold leading-tight text-white">{page.title}</h1>
              <p className="text-[10px] sm:text-xs text-white/80 mt-0.5 sm:mt-1 font-bold">Academics</p>
            </header>
            <div className="p-4 sm:p-6 bg-white">
              <DepartmentPage key={slug} slug={slug} />
            </div>
          </article>
        </div>
      </div>
    );
  }

  // ---- Regular page ----
  const page = PAGE_MAP[slug];
  if (!page) {
    return <Navigate to="/" replace />;
  }

  // ---- Render regular pages ----
  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-6">
      {/* Breadcrumb - Responsive */}
      <nav className="text-[10px] sm:text-xs text-black mb-3 sm:mb-4 overflow-x-auto whitespace-nowrap pb-1">
        <Link to="/" className="hover:underline text-black font-bold">
          Home
        </Link>
        <span className="mx-1 sm:mx-2 text-black">›</span>
        <span className="text-black font-bold">{page.category}</span>
        <span className="mx-1 sm:mx-2 text-black">›</span>
        <span className="text-red-600 font-bold">{page.title}</span>
      </nav>

      {/* Grid - Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr] gap-4 sm:gap-6">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <article className="rounded-xl bg-white shadow-sm overflow-hidden border-2 border-red-300">
          <header className="bg-red-600 text-white px-4 sm:px-5 py-3 sm:py-4 rounded-t-xl">
            <h1 className="text-base sm:text-xl font-bold leading-tight text-white">{page.title}</h1>
            <p className="text-[10px] sm:text-xs text-white/80 mt-0.5 sm:mt-1 font-bold">{page.category}</p>
          </header>
          <div className="p-4 sm:p-6 bg-white">
            {/* Content */}
            {COUNCIL_CONTENT[page.slug] ? (
              (() => {
                const C = COUNCIL_CONTENT[page.slug];
                return <C />;
              })()
            ) : PAGE_CONTENT[page.slug] ? (
              (() => {
                const C = PAGE_CONTENT[page.slug];
                return <C />;
              })()
            ) : page.body ? (
              <p className="text-sm sm:text-base text-black font-bold leading-relaxed">{page.body}</p>
            ) : (
              <p className="text-sm sm:text-base text-black font-bold leading-relaxed">
                Content for <strong className="text-red-600">{page.title}</strong> will be
                updated soon. This page is part of the <em className="text-red-600">{page.category}</em> section of RAJASHRI
                AYURVEDIC MEDICAL COLLEGE & HOSPITAL.
              </p>
            )}

            {/* Contact Information Card - Clean white background */}
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl bg-white border-2 border-red-300 shadow-sm">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-black">For more information</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Phone */}
                <div className="flex items-start sm:items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-xl border-2 border-red-200">
                  <span className="text-lg sm:text-xl flex-shrink-0">📞</span>
                  <div>
                    <p className="text-[10px] sm:text-xs text-black font-bold">Phone Numbers</p>
                    <p className="text-xs sm:text-sm font-bold text-black break-words">
                      +91 - 8087203870
                      <br className="sm:hidden" />
                      <span className="hidden sm:inline"> | </span>
                      <span className="sm:whitespace-nowrap">8087303870</span>
                    </p>
                  </div>
                </div>
                
                {/* Email */}
                <div className="flex items-start sm:items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-xl border-2 border-red-200">
                  <span className="text-lg sm:text-xl flex-shrink-0">✉️</span>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs text-black font-bold">Email Address</p>
                    <div className="space-y-0.5 sm:space-y-1">
                      <a 
                        className="text-xs sm:text-sm font-bold text-red-600 hover:underline break-all block" 
                        href="mailto:rajshreeayurvedic@gmail.com"
                      >
                        rajshreeayurvedic@gmail.com
                      </a>
                      <a 
                        className="text-xs sm:text-sm font-bold text-red-600 hover:underline break-all block" 
                        href="mailto:2024rajashriayu0870@gmail.com"
                      >
                        2024rajashriayu0870@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default SlugPage;