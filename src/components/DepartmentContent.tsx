import React from "react";

export type DeptInfo = {
  slug: string;
  name: string;
  short: string;
  hod: string;
  faculty: number;
  established: string;
  about: string;
  subjects: string[];
  facilities: string[];
  activities: string[];
  image: string;
};

const img = (q: string) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=1200&q=70`;

export const DEPARTMENTS: DeptInfo[] = [
  {
    slug: "dept-sanskrit-samhita-siddhanta",
    name: "Sanskrit, Samhita and Siddhanta",
    short: "Foundation of Ayurvedic philosophy and classical texts.",
    hod: "Dr. R. S. Deshmukh",
    faculty: 4,
    established: "1999",
    about:
      "The department teaches Sanskrit grammar, classical Ayurvedic Samhitas (Charaka, Sushruta, Vagbhata) and the Siddhanta principles that form the philosophical base of Ayurveda.",
    subjects: ["Sanskrit Vyakarana", "Padartha Vigyan", "Astanga Hridaya", "Charaka Samhita"],
    facilities: ["Departmental library", "Manuscript collection", "Audio-visual aids"],
    activities: ["Shloka recitation contests", "Sanskrit Diwas", "Seminars on classical texts"],
    image: img("photo-1532619675605-1ede6c2ed2b0"),
  },
  {
    slug: "dept-sharir-rachana",
    name: "Sharir Rachana (Anatomy)",
    short: "Study of Ayurvedic and modern anatomy.",
    hod: "Dr. P. K. Joshi",
    faculty: 3,
    established: "1999",
    about:
      "Sharir Rachana integrates classical Ayurvedic anatomy with modern dissection-based learning, supported by a fully equipped cadaver lab and a museum.",
    subjects: ["Garbha Sharir", "Asthi Sharir", "Marma Sharir", "Embryology"],
    facilities: ["Dissection Hall", "Anatomy Museum", "Histology Lab"],
    activities: ["Body donation awareness", "Anatomy quizzes", "Model competitions"],
    image: img("photo-1576091160550-2173dba999ef"),
  },
  {
    slug: "dept-sharir-kriya",
    name: "Sharir Kriya (Physiology)",
    short: "Physiology — Tridosha, Dhatu, Mala and modern physiology.",
    hod: "Dr. S. M. Patil",
    faculty: 3,
    established: "1999",
    about:
      "Department of Sharir Kriya focuses on functional aspects of the human body from both Ayurvedic and modern perspectives.",
    subjects: ["Dosha-Dhatu-Mala", "Agni & Srotas", "Modern Physiology"],
    facilities: ["Physiology Lab", "Hemoglobin & BP units", "Charts and models"],
    activities: ["Prakriti assessment camps", "Workshops on Agni Pariksha"],
    image: img("photo-1559757148-5c350d0d3c56"),
  },
  {
    slug: "dept-dravyaguna-vidnyan",
    name: "Dravyaguna Vidnyan (Pharmacology)",
    short: "Identification and properties of medicinal plants.",
    hod: "Dr. A. V. Kale",
    faculty: 3,
    established: "1999",
    about:
      "Dravyaguna deals with classification, identification, properties (Rasa, Guna, Virya, Vipaka, Prabhava) and therapeutic uses of medicinal herbs.",
    subjects: ["Rasa Panchak", "Nighantu Adhyayan", "Pharmacognosy"],
    facilities: ["Herbal garden (200+ species)", "Crude drug museum", "Pharmacognosy lab"],
    activities: ["Herbal walks", "Drug identification competitions", "Field visits"],
    image: img("photo-1466692476868-aef1dfb1e735"),
  },
  {
    slug: "dept-agad-tantra",
    name: "Agad Tantra & Vidhi Vaidyak",
    short: "Toxicology and forensic medicine.",
    hod: "Dr. M. S. Bhosale",
    faculty: 2,
    established: "2001",
    about:
      "Covers Ayurvedic toxicology (Visha Vigyan), management of poisoning, medical jurisprudence and forensic medicine.",
    subjects: ["Sthavar & Jangam Visha", "Forensic Medicine", "Medical Law"],
    facilities: ["Toxicology museum", "Specimen collection"],
    activities: ["Snake bite awareness camps", "Mock court sessions"],
    image: img("photo-1530026405186-ed1f139313f8"),
  },
  {
    slug: "dept-ras-shastra",
    name: "Ras Shastra & Bhaishajya Kalpana",
    short: "Pharmaceutics — preparation of Ayurvedic medicines.",
    hod: "Dr. V. R. Sonawane",
    faculty: 3,
    established: "1999",
    about:
      "Teaches preparation of classical Ayurvedic formulations including Bhasmas, Asavas, Arishtas, Churnas and Vatis with hands-on training.",
    subjects: ["Parad Vigyan", "Bhasma Kalpana", "Sneha Kalpana"],
    facilities: ["Rasashala (pharmacy)", "Bhasma preparation unit", "Quality testing lab"],
    activities: ["Aushadhi Nirman demonstrations", "Industry visits"],
    image: img("photo-1471864190281-a93a3070b6de"),
  },
  {
    slug: "dept-rog-nidan",
    name: "Rog Nidan Evum Vikruti Vidnyan",
    short: "Pathology and diagnostics.",
    hod: "Dr. N. B. Ahire",
    faculty: 3,
    established: "1999",
    about:
      "Focuses on diagnosis of disease using both Ayurvedic (Ashtavidha, Dashavidha Pariksha) and modern laboratory methods.",
    subjects: ["Nidan Panchak", "Pathology", "Microbiology"],
    facilities: ["Clinical pathology lab", "Microscopy unit", "Diagnostic charts"],
    activities: ["Diagnostic camps", "Lab skill workshops"],
    image: img("photo-1576091160399-112ba8d25d1d"),
  },
  {
    slug: "dept-swasthavritta",
    name: "Swasthavritta (Preventive Medicine)",
    short: "Preventive & social medicine, Yoga and Naturopathy.",
    hod: "Dr. K. T. Pawar",
    faculty: 2,
    established: "1999",
    about:
      "Deals with maintenance of health through Dincharya, Ritucharya, Yoga, and community medicine programmes.",
    subjects: ["Dincharya & Ritucharya", "Yoga", "Community Medicine", "Epidemiology"],
    facilities: ["Yoga Hall", "Naturopathy unit", "Field practice area"],
    activities: ["International Yoga Day", "Health awareness rallies", "Village surveys"],
    image: img("photo-1545205597-3d9d02c29597"),
  },
  {
    slug: "dept-prasuti-streerog",
    name: "Prasuti Tantra Evum Streerog Tantra",
    short: "Obstetrics & Gynecology in Ayurveda.",
    hod: "Dr. Mrs. S. R. Patil",
    faculty: 3,
    established: "1999",
    about:
      "Comprehensive care for women's health, antenatal and postnatal care, gynecological disorders managed through Ayurvedic principles.",
    subjects: ["Garbhini Paricharya", "Streerog", "Obstetrics"],
    facilities: ["Labour Room", "ANC OPD", "Garbha Sanskar centre"],
    activities: ["Garbha Sanskar workshops", "Women's health camps"],
    image: img("photo-1559839734-2b71ea197ec2"),
  },
  {
    slug: "dept-kaumarbhritya",
    name: "Kaumarbhritya (Paediatrics)",
    short: "Care of children and adolescents.",
    hod: "Dr. R. D. Shinde",
    faculty: 2,
    established: "2000",
    about:
      "Ayurvedic paediatrics including Suvarnaprashan, Lehana, immunisation and management of paediatric disorders.",
    subjects: ["Bala Roga", "Suvarnaprashan", "Neonatology"],
    facilities: ["Paediatric OPD", "Suvarnaprashan unit", "Play area"],
    activities: ["Monthly Suvarnaprashan camp", "School health checks"],
    image: img("photo-1503454537195-1dcabb73ffb9"),
  },
  {
    slug: "dept-kayachikitsa",
    name: "Kayachikitsa (Internal Medicine)",
    short: "General medicine — the largest clinical branch.",
    hod: "Dr. H. G. Wagh",
    faculty: 5,
    established: "1999",
    about:
      "Manages chronic disorders like diabetes, arthritis, skin diseases, and neurological conditions through Shamana and Shodhana therapies.",
    subjects: ["Jwara Chikitsa", "Vatavyadhi", "Madhumeha", "Twak Roga"],
    facilities: ["Kayachikitsa OPD & IPD", "Panchakarma backup", "Clinical research unit"],
    activities: ["Free Madhumeha camps", "Arthritis awareness drives"],
    image: img("photo-1582719478250-c89cae4dc85b"),
  },
  {
    slug: "dept-shalya-tantra",
    name: "Shalya Tantra (Surgery)",
    short: "Ayurvedic surgery including Ksharasutra and para-surgical procedures.",
    hod: "Dr. U. S. Gangurde",
    faculty: 3,
    established: "1999",
    about:
      "Focuses on surgical and para-surgical procedures — Ksharasutra for fistula-in-ano, Agnikarma, Raktamokshan and modern surgical skills.",
    subjects: ["Shastra Karma", "Ksharasutra", "Anushastra Karma"],
    facilities: ["Modular OT", "Ksharasutra unit", "Minor OT"],
    activities: ["Ksharasutra camps", "Anorectal screening"],
    image: img("photo-1551601651-2a8555f1a136"),
  },
  {
    slug: "dept-shalakya-tantra",
    name: "Shalakya Tantra (ENT & Ophthalmology)",
    short: "Diseases of eye, ear, nose, throat and head.",
    hod: "Dr. A. S. Kulkarni",
    faculty: 2,
    established: "1999",
    about:
      "Manages Netra Roga, Karna Roga, Nasa Roga, Mukha Roga with Ayurvedic procedures like Tarpana, Anjana, Karnapurana and Nasya.",
    subjects: ["Netra Roga", "Karna-Nasa Roga", "Mukha Roga"],
    facilities: ["Netra Kriyakalpa Unit", "ENT OPD", "Refraction unit"],
    activities: ["Free eye check-up camps", "Hearing screening"],
    image: img("photo-1559757175-5700dde675bc"),
  },
  {
    slug: "dept-panchkarma",
    name: "Panchkarma",
    short: "Detoxification and rejuvenation therapies.",
    hod: "Dr. M. R. Borse",
    faculty: 3,
    established: "1999",
    about:
      "Specialised wing for Vaman, Virechan, Basti, Nasya and Raktamokshan along with Keraliya therapies like Shirodhara and Pizhichil.",
    subjects: ["Poorva Karma", "Pradhana Karma", "Paschat Karma"],
    facilities: ["Male & Female therapy rooms", "Steam chambers", "Shirodhara unit"],
    activities: ["Seasonal Panchakarma camps", "Wellness packages"],
    image: img("photo-1540555700478-4be289fbecef"),
  },
  {
    slug: "dept-research-methodology",
    name: "Research Methodology",
    short: "Research design, biostatistics and publications.",
    hod: "Dr. P. R. Gaikwad",
    faculty: 2,
    established: "2010",
    about:
      "Guides PG scholars and faculty in research protocol design, ethics, biostatistics and scientific writing.",
    subjects: ["Research Design", "Biostatistics", "Medical Ethics"],
    facilities: ["Research cell", "Statistical software", "Online journal access"],
    activities: ["Research methodology workshops", "Publication clinics"],
    image: img("photo-1532094349884-543bc11b234d"),
  },
];

export const DEPT_MAP: Record<string, DeptInfo> = Object.fromEntries(
  DEPARTMENTS.map((d) => [d.slug, d]),
);

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-brand mb-2">{title}</h3>
      <ul className="list-disc pl-5 space-y-1 text-sm text-foreground">
        {items.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </div>
  );
}

export function DepartmentPage({ slug }: { slug: string }) {
  const d = DEPT_MAP[slug];
  if (!d) return null;
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid md:grid-cols-[1fr_300px] gap-5 items-start">
        <div>
          <h2 className="text-lg font-semibold mb-2">{d.name}</h2>
          <p className="text-sm text-muted-foreground mb-3">{d.short}</p>
          <p className="text-sm leading-relaxed text-foreground">{d.about}</p>
        </div>
        <img
          src={d.image}
          alt={d.name}
          className="rounded-md border border-border w-full aspect-[4/3] object-cover"
          loading="lazy"
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-md border border-border p-3 bg-muted/30">
          <p className="text-xs text-muted-foreground">Head of Department</p>
          <p className="text-sm font-semibold">{d.hod}</p>
        </div>
        <div className="rounded-md border border-border p-3 bg-muted/30">
          <p className="text-xs text-muted-foreground">Faculty Members</p>
          <p className="text-sm font-semibold">{d.faculty}</p>
        </div>
        <div className="rounded-md border border-border p-3 bg-muted/30">
          <p className="text-xs text-muted-foreground">Established</p>
          <p className="text-sm font-semibold">{d.established}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <Section title="Subjects Taught" items={d.subjects} />
        <Section title="Facilities" items={d.facilities} />
        <Section title="Activities" items={d.activities} />
      </div>
    </div>
  );
}

export const DEPT_PAGE_CONTENT: Record<string, React.FC> = Object.fromEntries(
  DEPARTMENTS.map((d) => [d.slug, () => <DepartmentPage slug={d.slug} />]),
);
