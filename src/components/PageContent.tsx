import { useState } from "react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import g7 from "@/assets/gallery-7.jpg";
import g8 from "@/assets/gallery-8.jpg";
import aboutHero from "@/assets/about-hero.jpg";
import campus1 from "@/assets/campus-1.jpg";
import campus2 from "@/assets/campus-2.jpg";
import campus3 from "@/assets/campus-3.jpg";
import campus4 from "@/assets/campus-4.jpg";
import { useGallery } from "@/lib/galleryStore";



function PhotoGallery() {
  const GALLERY = useGallery();
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Glimpses of campus life, academics, hospital, sports and cultural events.
      </p>
      {GALLERY.length === 0 ? (
        <p className="text-sm text-muted-foreground italic">No photos yet.</p>
      ) : (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {GALLERY.map((g, i) => (
          <button
            key={g.id}
            onClick={() => setActive(i)}
            className="group relative overflow-hidden rounded-md border border-border bg-card animate-fade-in"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <img
              src={g.src}
              alt={g.caption}
              loading="lazy"
              className="aspect-square object-cover w-full transition-transform duration-500 group-hover:scale-110"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent text-white text-xs p-2 text-left translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
              {g.caption}
            </span>
          </button>
        ))}
      </div>
      )}

      {active !== null && GALLERY[active] && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActive(null)}
        >
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={GALLERY[active].src}
              alt={GALLERY[active].caption}
              className="w-full rounded-md"
            />
            <div className="flex items-center justify-between text-white mt-3">
              <button
                onClick={() => setActive((active - 1 + GALLERY.length) % GALLERY.length)}
                className="px-3 py-1 bg-white/10 rounded hover:bg-white/20"
              >
                ‹ Prev
              </button>
              <p className="text-sm">{GALLERY[active].caption}</p>
              <button
                onClick={() => setActive((active + 1) % GALLERY.length)}
                className="px-3 py-1 bg-white/10 rounded hover:bg-white/20"
              >
                Next ›
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function AboutUs() {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-md group">
        <img
          src={aboutHero}
          alt="Rajashri Ayurvedic Medical College & Hospital, Mehkar"
          loading="lazy"
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand/80 via-brand/20 to-transparent flex items-end p-5">
          <div className="text-white animate-fade-in">
            <h2 className="text-2xl font-bold">Rajashri Ayurvedic Medical College & Hospital</h2>
            <p className="text-sm opacity-90">Mehkar, Dist. Buldhana, Maharashtra</p>
          </div>
        </div>
      </div>

      <p className="text-foreground leading-relaxed">
        Rajashri Ayurvedic Medical College & Hospital, Mehkar is run by{" "}
        <strong>Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha</strong>. The
        institute is dedicated to spreading authentic Ayurvedic medical education and
        affordable healthcare in the Buldhana region of Vidarbha, Maharashtra. The college
        is affiliated to Maharashtra University of Health Sciences (MUHS), Nashik and
        recognized by the National Commission for Indian System of Medicine (NCISM), New Delhi.
      </p>

      <p className="text-foreground leading-relaxed">
        The campus houses a modern college building, a well-equipped attached teaching
        hospital, separate hostels for boys and girls, a digital library, herbal garden,
        teaching pharmacy and research laboratory — providing students an ideal environment
        for the study and practice of Ashtanga Ayurveda.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[campus1, campus2, campus3, campus4].map((src, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-md border border-border animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <img
              src={src}
              alt={`Campus view ${i + 1}`}
              loading="lazy"
              className="aspect-[4/3] object-cover w-full hover:scale-110 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { n: "100", l: "UG BAMS Seats" },
          { n: "60+", l: "Hospital Beds" },
          { n: "15", l: "Academic Departments" },
        ].map((s, i) => (
          <div
            key={i}
            className="border border-border rounded-md p-5 text-center bg-secondary/30 hover:bg-secondary/60 transition-colors animate-fade-in"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <div className="text-3xl font-bold text-brand">{s.n}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoPage({
  hero, title, subtitle, paragraphs, highlights,
}: {
  hero: string; title: string; subtitle?: string;
  paragraphs: string[]; highlights?: { label: string; value: string }[];
}) {
  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-md">
        <img src={hero} alt={title} loading="lazy" className="w-full h-56 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand/85 via-brand/30 to-transparent flex items-end p-5">
          <div className="text-white">
            <h2 className="text-2xl font-bold">{title}</h2>
            {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}
          </div>
        </div>
      </div>
      {paragraphs.map((p, i) => (
        <p key={i} className="text-foreground leading-relaxed">{p}</p>
      ))}
      {highlights && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {highlights.map((h, i) => (
            <div key={i} className="border border-border rounded-md p-4 text-center bg-secondary/30">
              <div className="text-xl font-bold text-brand">{h.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{h.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const History = () => (
  <InfoPage hero={campus1} title="Our History" subtitle="Decades of Ayurveda Education in Vidarbha"
    paragraphs={[
      "Rajashri Ayurvedic Medical College & Hospital, Mehkar was founded by the visionary leaders of Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha with the mission of bringing quality Ayurvedic medical education to the rural belt of Buldhana district.",
      "Starting with a modest first batch of BAMS students, the college has steadily grown into a full-fledged Ayurvedic teaching institution with its own attached hospital, separate hostels, library, pharmacy and herbal garden.",
      "Over the years thousands of patients from Mehkar and surrounding talukas have benefited from the OPD and IPD services of the attached hospital — making the institute a trusted healthcare destination of the region.",
    ]}
    highlights={[
      { label: "Founded by", value: "DDRSBUS" },
      { label: "Location", value: "Mehkar" },
      { label: "District", value: "Buldhana" },
      { label: "Affiliation", value: "MUHS Nashik" },
    ]}
  />
);

const VisionMission = () => (
  <InfoPage hero={campus2} title="Vision & Mission"
    paragraphs={[
      "VISION — To become a centre of excellence in Ayurvedic medical education, research and patient care, producing competent, ethical and compassionate Ayurvedic physicians who serve society with dedication.",
      "MISSION — To impart high quality theoretical and clinical training in Ayurveda as per MUHS and NCISM standards; to promote research in classical Ayurvedic concepts and herbal formulations; and to deliver affordable, evidence-informed Ayurvedic healthcare through the attached teaching hospital.",
      "Core values: Authenticity of Ashtanga Ayurveda, scientific temperament, ethical practice, service to rural communities, and continuous learning.",
    ]}
  />
);

const FounderChairman = () => (
  <InfoPage hero={campus3} title="Founder Chairman" subtitle="Late Dharmveer Diliprao Rahate"
    paragraphs={[
      "The institute was established under the inspiration of Late Dharmveer Diliprao Rahate — a respected social leader of Buldhana district whose lifelong commitment to education, health and rural upliftment shaped the foundation of the trust.",
      "His vision was to create an institution that combines the timeless wisdom of Ayurveda with modern academic rigor, so that talented students from rural Maharashtra could become qualified Ayurvedic doctors without leaving the region.",
      "His legacy continues to guide every academic, clinical and social initiative undertaken by the college today.",
    ]}
  />
);

const Chairman = () => (
  <InfoPage hero={campus4} title="Chairman's Message"
    paragraphs={[
      "On behalf of Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha, I warmly welcome you to Rajashri Ayurvedic Medical College & Hospital, Mehkar.",
      "Ayurveda is India's living medical heritage. Our endeavour at Rajashri Ayurvedic is to nurture young minds who can carry this heritage forward with both classical depth and contemporary scientific outlook.",
      "We invite aspiring students, patients and well-wishers to be part of this growing institution that places knowledge, integrity and service above everything else.",
    ]}
  />
);

const Hospital = () => (
  <InfoPage hero={g7} title="Attached Teaching Hospital" subtitle="OPD · IPD · Panchakarma · Emergency"
    paragraphs={[
      "The attached teaching hospital of Rajashri Ayurvedic Medical College serves as the primary clinical training ground for BAMS students and a trusted healthcare facility for the people of Mehkar and surrounding villages.",
      "Specialty OPDs are run daily by qualified Ayurvedic consultants covering Kayachikitsa, Panchakarma, Shalya Tantra, Shalakya Tantra, Prasuti Tantra & Streerog, Kaumarbhritya, and Swasthavritta.",
      "Indoor admission, dedicated Panchakarma therapy block, minor operation theatre, labour room, dispensary, basic pathology lab and emergency services are available within the hospital premises.",
    ]}
    highlights={[
      { label: "IPD Beds", value: "60+" },
      { label: "OPD Daily", value: "150+" },
      { label: "OT", value: "Yes" },
      { label: "Panchakarma", value: "Full Block" },
    ]}
  />
);

const Library = () => (
  <InfoPage hero={g1} title="Digital Library"
    paragraphs={[
      "The college library is stocked with classical Ayurvedic Samhitas, modern medical textbooks, reference journals and research publications, along with a fully digital section offering access to e-journals and online databases.",
      "Separate reading halls for UG students, faculty and visitors, with Wi-Fi connectivity throughout.",
    ]}
    highlights={[
      { label: "Total Books", value: "8000+" },
      { label: "Journals", value: "40+" },
      { label: "Digital Access", value: "Yes" },
      { label: "Seating", value: "120" },
    ]}
  />
);

const HerbalGarden = () => (
  <InfoPage hero={g2} title="Herbal Garden"
    paragraphs={[
      "A dedicated medicinal-plant garden cultivates over 200 species of Ayurvedic herbs used in Dravyaguna and Rasashastra teaching — giving students live exposure to the plants they study in classical texts.",
      "The garden also supports the teaching pharmacy with raw materials for in-house Ayurvedic formulations.",
    ]}
  />
);

const Infrastructure = () => (
  <InfoPage hero={campus2} title="Infrastructure"
    paragraphs={[
      "Modern college building with spacious lecture halls, demonstration rooms, departmental museums, a central seminar hall and well-equipped laboratories for each pre-clinical and para-clinical department.",
      "Separate, secure hostels for boys and girls, mess facility, sports ground, and reliable transport connectivity to Mehkar town.",
    ]}
    highlights={[
      { label: "Classrooms", value: "12" },
      { label: "Labs", value: "10" },
      { label: "Hostels", value: "2" },
      { label: "Auditorium", value: "1" },
    ]}
  />
);

const Lab = () => (
  <InfoPage hero={g4} title="Laboratories"
    paragraphs={[
      "Dedicated laboratories for Sharir Rachana, Sharir Kriya, Dravyaguna, Rasashastra & Bhaishajya Kalpana, Rog Nidan and Agad Tantra — each equipped as per NCISM minimum standards.",
      "Central research laboratory supports faculty and PG-level research projects on classical Ayurvedic formulations.",
    ]}
  />
);

const Contact = () => (
  <div className="space-y-6">
    <div className="relative overflow-hidden rounded-md">
      <img src={campus1} alt="Campus" loading="lazy" className="w-full h-52 object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand/85 via-brand/30 to-transparent flex items-end p-5">
        <h2 className="text-2xl font-bold text-white">Contact Us</h2>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <div className="border border-border rounded-md p-5 bg-card space-y-3">
        <h3 className="font-semibold text-brand">College Address</h3>
        <p className="text-sm leading-relaxed">
          Rajashri Ayurvedic Medical College & Hospital<br />
          Dharmveer Diliprao Rahate Shikshan & Bahu-Uddeshiya Sanstha<br />
          Mehkar, Dist. Buldhana – 443301<br />
          Maharashtra, India
        </p>
      </div>
      <div className="border border-border rounded-md p-5 bg-card space-y-3">
        <h3 className="font-semibold text-brand">Reach Us</h3>
        <ul className="text-sm space-y-2">
          <li><strong>Office:</strong> +91 7264 222333</li>
          <li><strong>Principal:</strong> +91 9404 000000</li>
          <li><strong>Admissions:</strong> +91 9420 000000</li>
          <li><strong>Email:</strong> <a className="text-brand hover:underline" href="mailto:rajashriayurved@gmail.com">rajashriayurved@gmail.com</a></li>
        </ul>
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-3">
      {[
        { t: "Office Hours", d: "Mon–Sat · 9:00 AM – 5:00 PM" },
        { t: "OPD Timings", d: "Mon–Sat · 9 AM – 1 PM & 4 PM – 7 PM" },
        { t: "Emergency", d: "24 × 7 Hospital Services" },
      ].map((x, i) => (
        <div key={i} className="border border-border rounded-md p-4 bg-secondary/30">
          <div className="text-sm font-semibold text-brand">{x.t}</div>
          <div className="text-xs text-muted-foreground mt-1">{x.d}</div>
        </div>
      ))}
    </div>

    <div className="rounded-md overflow-hidden border border-border">
      <iframe
        title="Mehkar location"
        src="https://www.google.com/maps?q=Mehkar,Buldhana,Maharashtra&output=embed"
        className="w-full h-72"
        loading="lazy"
      />
    </div>
  </div>
);

import { useStaff, type StaffGroupKey } from "@/lib/staffStore";

function StaffSection({ title, group }: { title: string; group: StaffGroupKey }) {
  const members = useStaff(group);
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-brand">{title} — Academic Year 2025-26</h2>
      {members.length === 0 ? (
        <p className="text-sm text-muted-foreground italic">No staff members listed yet.</p>
      ) : (
      <div className="overflow-x-auto border border-border rounded-md">
        <table className="w-full text-sm">
          <thead className="bg-secondary">
            <tr>
              <th className="px-3 py-2 text-left">Sr.</th>
              <th className="px-3 py-2 text-left">Photo</th>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Designation</th>
              <th className="px-3 py-2 text-left">Education</th>
              <th className="px-3 py-2 text-left">Year</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, i) => (
              <tr key={m.id} className="border-t border-border hover:bg-secondary/40">
                <td className="px-3 py-2">{i + 1}</td>
                <td className="px-3 py-2">
                  <button onClick={() => setActive(i)} className="block">
                    <img
                      src={m.photo}
                      alt={m.name}
                      loading="lazy"
                      className="h-14 w-14 rounded-full object-cover border-2 border-brand hover:scale-110 transition-transform"
                    />
                  </button>
                </td>
                <td className="px-3 py-2 font-medium">{m.name}</td>
                <td className="px-3 py-2">{m.designation}</td>
                <td className="px-3 py-2 text-muted-foreground">{m.education}</td>
                <td className="px-3 py-2 text-muted-foreground">{m.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

      {active !== null && members[active] && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActive(null)}
        >
          <div className="max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <img src={members[active].photo} alt={members[active].name} className="w-full rounded-md" />
            <div className="flex items-center justify-between text-white mt-3">
              <button
                onClick={() => setActive((active - 1 + members.length) % members.length)}
                className="px-3 py-1 bg-white/10 rounded hover:bg-white/20"
              >
                ‹ Prev
              </button>
              <div className="text-center">
                <p className="font-semibold">{members[active].name}</p>
                <p className="text-xs opacity-80">{members[active].designation}</p>
              </div>
              <button
                onClick={() => setActive((active + 1) % members.length)}
                className="px-3 py-1 bg-white/10 rounded hover:bg-white/20"
              >
                Next ›
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const HospitalStaff = () => <StaffSection title="Hospital Staff" group="hospital" />;
const CollegeStaff = () => <StaffSection title="College Staff" group="college" />;
const NonTeachingStaff = () => <StaffSection title="Non-Teaching Staff" group="non-teaching" />;
const TeachingStaff = () => <StaffSection title="Teaching Staff" group="teaching" />;


import { DEPT_PAGE_CONTENT } from "./DepartmentContent";

export const PAGE_CONTENT: Record<string, React.FC> = {
  "photo-gallery": PhotoGallery,
  "about-us": AboutUs,
  "history": History,
  "vision-mission": VisionMission,
  "founder-chairman": FounderChairman,
  "chairman": Chairman,
  "hospital": Hospital,
  "facility-library": Library,
  "facility-herbal-garden": HerbalGarden,
  "facility-infrastructure": Infrastructure,
  "facility-laboratory": Lab,
  "contact": Contact,
  "staff-hospital": HospitalStaff,
  "staff-college": CollegeStaff,
  "staff-non-teaching": NonTeachingStaff,
  "faculty-teaching-staff": TeachingStaff,
  ...DEPT_PAGE_CONTENT,
};

