import { createFileRoute, Link } from "@tanstack/react-router";
import { Sidebar } from "@/components/Sidebar";
import { HeroSlider } from "@/components/HeroSlider";
import gPreview1 from "@/assets/gallery-1.jpg";
import gPreview2 from "@/assets/gallery-2.jpg";
import gPreview5 from "@/assets/gallery-5.jpg";
import gPreview8 from "@/assets/gallery-8.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
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
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-brand">
                RAJASHRI AYURVEDIC MEDICAL COLLEGE & HOSPITAL
              </h3>
              <p className="text-sm text-foreground leading-relaxed text-justify">
                Rajashri Ayurvedic Medical College & Hospital was established in 2015 and successfully completed the
                milestone of 25 years. With huge college campus covering state-of-the-art college building, high-tech
                infrastructure, hospital with 220 beds capacity and 3 operation theaters, nursery of ayurvedic medicinal
                plants, first digital library, Teaching Pharmacy with Advance Research Laboratory etc. are the key features
                of the Institute. The hospital is also equipped with ICU unit, Sonography, X-Ray unit. Intake capacity of
                UG BAMS is 100. Post Graduation in Ayurveda for 9 programs (Samhita Siddhant, Kriya Sharir, Dravyaguna,
                Rasashastra & Bhaishajya Kalpana, Prasuti & Streerog, Kaumarbhritya, Kayachikitsa, Shalya tantra,
                Panchkarma) is also operational since recent times with intake capacity of 54 seats for PG.
              </p>
            </div>
          </section>

          <div className="grid md:grid-cols-3 gap-4">
            <PersonCard name="Dr. Balasaheb Aher" role="Founder Chairman" slug="founder-chairman" />
            <NewsCard />
            <PersonCard name="Smt. Himgauri Aher" role="Chairman" slug="chairman" />
          </div>

          <section className="rounded-md overflow-hidden border border-border">
            <header className="bg-vision text-white px-5 py-3">
              <h3 className="font-semibold text-lg">Vision</h3>
            </header>
            <div className="bg-vision/90 text-white p-5">
              <p className="text-sm">
                To be a pioneer Institute providing the health services to the community and also to be one of the best
                academic Institutes in the field of Health Sciences.
              </p>
            </div>
          </section>

          <section className="rounded-md overflow-hidden border border-border">
            <header className="bg-mission text-white px-5 py-3">
              <h3 className="font-semibold text-lg">Mission</h3>
            </header>
            <div className="bg-mission/90 text-white p-5">
              <ol className="text-sm space-y-1 list-decimal list-inside">
                <li>To provide State of the art infrastructure in the Institute.</li>
                <li>To produce Highly Reputed Ayurveda Professionals contributing for Global Health Developments.</li>
                <li>To strengthen the Research and Innovation in the field of Ayurveda.</li>
                <li>To provide Health facilities across the rural and urban areas.</li>
              </ol>
            </div>
          </section>

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

          <section className="space-y-3">
            <Link
              to="/$slug"
              params={{ slug: "covid-19" }}
              className="inline-block bg-destructive text-white px-4 py-2 rounded font-bold tracking-wider hover:scale-105 transition-transform"
            >
              COVID-19
            </Link>
            <Link
              to="/$slug"
              params={{ slug: "covid-19" }}
              className="block text-saffron font-semibold hover:underline"
            >
              Important Announcements and Information Related with Covid-19
            </Link>
            <Link
              to="/$slug"
              params={{ slug: "affiliated-university" }}
              className="block text-saffron font-semibold hover:underline"
            >
              Details of Affiliated University : MUHS
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

function PersonCard({ name, role, slug }: { name: string; role: string; slug: string }) {
  return (
    <Link
      to="/$slug"
      params={{ slug }}
      className="block border border-border rounded-md bg-card p-4 text-center hover:shadow-md transition-shadow"
    >
      <p className="text-sm text-muted-foreground mb-2">{role}</p>
      <div className="h-32 w-32 mx-auto rounded-full bg-secondary flex items-center justify-center mb-2">
        <span className="text-3xl font-bold text-brand">
          {name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
        </span>
      </div>
      <p className="font-semibold text-brand">{name}</p>
    </Link>
  );
}

function NewsCard() {
  const items = [
    { title: "Student's Summer Vacation 2026", slug: "muhs-mandate-circulars" },
    { title: "Hospital Data Monitoring & Administrative Committee", slug: "iqac" },
    { title: "Fresher's Party 2nd May", slug: "activities-cultural" },
  ];
  return (
    <div className="border border-border rounded-md bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">News & Events</h3>
        <span className="text-xs text-destructive font-semibold">Show More</span>
      </div>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.slug} className="flex items-center justify-between gap-2 text-sm bg-secondary/40 p-2 rounded">
            <span className="line-clamp-2">{i.title}</span>
            <Link
              to="/$slug"
              params={{ slug: i.slug }}
              className="bg-destructive text-white text-xs px-2 py-1 rounded shrink-0"
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
