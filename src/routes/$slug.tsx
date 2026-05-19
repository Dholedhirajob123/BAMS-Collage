import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Sidebar } from "@/components/Sidebar";
import { PAGE_MAP } from "@/lib/pages";

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const page = PAGE_MAP[params.slug];
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.page.title} — SSAM Nashik` },
          {
            name: "description",
            content:
              loaderData.page.body ??
              `${loaderData.page.title} at Shree Saptashrungi Ayurved Mahavidyalaya & Hospital, Nashik.`,
          },
        ]
      : [],
  }),
  component: SlugPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl p-10 text-center">
      <h1 className="text-3xl font-bold mb-2">Page not found</h1>
      <p className="text-muted-foreground mb-6">This section is not available.</p>
      <Link to="/" className="text-brand hover:underline">Back to Home</Link>
    </div>
  ),
});

function SlugPage() {
  const { page } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/" className="hover:underline">Home</Link>
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
            {page.body ? (
              <p className="text-foreground leading-relaxed">{page.body}</p>
            ) : (
              <p className="text-muted-foreground leading-relaxed">
                Content for <strong className="text-foreground">{page.title}</strong> will be updated soon. This page
                is part of the <em>{page.category}</em> section of Shree Saptashrungi Ayurved Mahavidyalaya & Hospital.
              </p>
            )}

            <div className="border-t border-border pt-4">
              <h2 className="text-sm font-semibold mb-2">For more information</h2>
              <p className="text-sm text-muted-foreground">
                Contact the office at <strong>+91 253 2621565</strong> or email{" "}
                <a className="text-brand hover:underline" href="mailto:ssamnsk@gmail.com">
                  ssamnsk@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
