// src/routes/$slug.tsx
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Sidebar } from "@/components/Sidebar";
import { PAGE_MAP } from "@/lib/pages";
import { COUNCIL_CONTENT } from "@/components/CouncilTables";
import { PAGE_CONTENT } from "@/components/PageContent";
import { DEPARTMENTS, DepartmentPage } from "@/components/DepartmentContent";

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const { slug } = params;

    // ---- Check if it's a department slug ----
    if (slug.startsWith("dept-")) {
      const dept = DEPARTMENTS.find((d) => d.slug === slug);
      if (!dept) throw notFound();
      return {
        page: {
          title: dept.name,
          category: "Academics",
          body: dept.short,
          slug: dept.slug,
        },
        isDepartment: true,
      };
    }

    // ---- Regular page ----
    const page = PAGE_MAP[slug];
    if (!page) throw notFound();
    return { page, isDepartment: false };
  },

  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.page.title} — Rajashri Ayurvedic Mehkar` },
          {
            name: "description",
            content:
              loaderData.page.body ??
              `${loaderData.page.title} at RAJASHRI AYURVEDIC MEDICAL COLLEGE & HOSPITAL, Mehkar.`,
          },
        ]
      : [],
  }),

  component: SlugPage,

  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl p-10 text-center">
      <h1 className="text-3xl font-bold mb-2">Page not found</h1>
      <p className="text-muted-foreground mb-6">This section is not available.</p>
      <Link to="/" className="text-brand hover:underline">
        Back to Home
      </Link>
    </div>
  ),
});

function SlugPage() {
  const { page, isDepartment } = Route.useLoaderData();
  const { slug } = Route.useParams();

  if (isDepartment) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-6">
        <nav className="text-xs text-muted-foreground mb-4">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-2">›</span>
          <span>Academics</span>
          <span className="mx-2">›</span>
          <span className="text-foreground">{page.title}</span>
        </nav>
        <div className="grid md:grid-cols-[260px_1fr] gap-6">
          <Sidebar />
          <article className="border border-border rounded-md bg-card">
            <header className="bg-brand text-white px-5 py-4 rounded-t-md">
              <h1 className="text-xl font-semibold">{page.title}</h1>
              <p className="text-xs text-white/80 mt-1">Academics</p>
            </header>
            <div className="p-6">
              {/* 🔑 Add key to force re‑mount when slug changes */}
              <DepartmentPage key={slug} slug={slug} />
            </div>
          </article>
        </div>
      </div>
    );
  }

  // ---- Render regular pages ----
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">›</span>
        <span>{page.category}</span>
        <span className="mx-2">›</span>
        <span className="text-foreground">{page.title}</span>
      </nav>

      <div className="grid md:grid-cols-[260px_1fr] gap-6">
        <Sidebar />

        <article className="border border-border rounded-md bg-card">
          <header className="bg-brand text-white px-5 py-4 rounded-t-md">
            <h1 className="text-xl font-semibold">{page.title}</h1>
            <p className="text-xs text-white/80 mt-1">{page.category}</p>
          </header>
          <div className="p-6 space-y-4">
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
              <p className="text-foreground leading-relaxed">{page.body}</p>
            ) : (
              <p className="text-muted-foreground leading-relaxed">
                Content for <strong className="text-foreground">{page.title}</strong> will be
                updated soon. This page is part of the <em>{page.category}</em> section of RAJASHRI
                AYURVEDIC MEDICAL COLLEGE & HOSPITAL.
              </p>
            )}

            {/* Contact Information Card */}
            <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-100 dark:border-amber-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-amber-700 dark:text-amber-400">For more information</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <span className="text-xl">📞</span>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone Numbers</p>
                    <p className="font-semibold text-foreground">+91 - 8087203870 | 8087303870</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <span className="text-xl">✉️</span>
                  <div>
                    <p className="text-xs text-muted-foreground">Email Address</p>
                    <a 
                      className="font-semibold text-brand hover:underline break-all" 
                      href="mailto:rajshreeayurvedic@gmail.com"
                    >
                      rajshreeayurvedic@gmail.com   <br/>
                       2024rajashriayu0870@gmail.com
                    </a>
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