import React from "react";

export type DeptInfo = {
  slug: string;
  name: string;
  short: string;
  about: string[];
  aim: string[];
  faculties: { name: string; designation: string; qualification: string }[];
  image: string;
};

const img = (q: string) => `https://images.unsplash.com/${q}?auto=format&fit=crop&w=1200&q=70`;

export const DEPARTMENTS: DeptInfo[] = [
  {
    slug: "dept-sanskrit-samhita-siddhanta",
    name: "Sanskrit, Samhita and Siddhanta",
    short: "Foundation of Ayurvedic philosophy and classical texts.",
    about: [
      "The department of Sanskrit, Samhita & Siddhanta is the cornerstone of Ayurvedic education, dedicated to preserving and teaching the fundamental philosophical principles of Ayurveda. Established with the vision to impart authentic knowledge of classical Ayurvedic texts, the department serves as the intellectual heart of our institution.",
      "Students are trained in Sanskrit grammar and literature, enabling them to read and interpret original Ayurvedic manuscripts with precision. The department covers the three great Samhitas - Charaka Samhita, Sushruta Samhita, and Ashtanga Hridaya - which form the bedrock of Ayurvedic medicine.",
      "Through the study of Padartha Vigyan (Ayurvedic philosophy) and Siddhanta (fundamental principles), students develop a deep understanding of concepts like Dravya, Guna, Karma, Samanya, Vishesha, Samavaya, and Abhava. This philosophical foundation is essential for understanding the rationale behind Ayurvedic treatments.",
      "The department also focuses on research in classical texts, manuscript conservation, and bridging traditional wisdom with contemporary scientific understanding. Regular seminars and workshops are conducted to explore the practical applications of classical knowledge in modern healthcare scenarios."
    ],
    aim: [
      "To preserve and promote the authentic knowledge of classical Ayurvedic texts.",
      "To develop proficiency in Sanskrit language for understanding original manuscripts.",
      "To bridge traditional Ayurvedic wisdom with modern scientific research.",
      "To produce scholars who can interpret and apply classical knowledge in clinical practice."
    ],
    faculties: [
      { name: "Dr. R. S. Deshmukh", designation: "Professor & Head", qualification: "MD (Samhita), PhD" },
      { name: "Dr. S. M. Joshi", designation: "Associate Professor", qualification: "MD (Samhita)" },
      { name: "Dr. P. V. Kulkarni", designation: "Assistant Professor", qualification: "MD (Sanskrit)" },
      { name: "Dr. A. S. Bhalerao", designation: "Lecturer", qualification: "MD (Samhita)" },
    ],
    image: img("photo-1532619675605-1ede6c2ed2b0"),
  },
  {
    slug: "dept-sharir-rachana",
    name: "Sharir Rachana (Anatomy)",
    short: "Study of Ayurvedic and modern anatomy.",
    about: [
      "The Department of Sharir Rachana is dedicated to the comprehensive study of human anatomy from both Ayurvedic and modern perspectives. Our state-of-the-art dissection hall and anatomy museum provide students with hands-on learning experiences that are essential for future clinical practice.",
      "Students learn the detailed structure of the human body including Asthi Sharir (osteology), Sandhi Sharir (arthrology), Mamsa Sharir (myology), and Sira Dhamni Snayu Sharir (angiology and neurology). Special emphasis is placed on Garbha Sharir (embryology) and Marma Sharir (vital points), which are unique to Ayurvedic anatomy.",
      "The department maintains a well-preserved specimen collection, plastinated models, and advanced 3D visualization tools. Cadaveric dissection is conducted under expert supervision, allowing students to observe anatomical variations and develop surgical skills.",
      "Regular workshops on cadaveric dissection, Marma point identification, and anatomical model preparation are organized. The department also conducts body donation awareness programs and research projects on anatomical variations in relation to Prakriti."
    ],
    aim: [
      "To provide comprehensive knowledge of human anatomy from both Ayurvedic and modern perspectives.",
      "To develop practical dissection skills and understanding of anatomical structures.",
      "To integrate Marma point knowledge with clinical applications.",
      "To promote research in anatomical variations and their clinical correlations."
    ],
    faculties: [
      { name: "Dr. P. K. Joshi", designation: "Professor & Head", qualification: "MD (Sharir Rachana)" },
      { name: "Dr. N. M. Patil", designation: "Professor", qualification: "MD (Sharir Rachana), PhD" },
      { name: "Dr. S. R. Khedkar", designation: "Associate Professor", qualification: "MD (Sharir Rachana)" },
      { name: "Dr. A. B. More", designation: "Assistant Professor", qualification: "MS (Anatomy)" },
      { name: "Dr. V. S. Shinde", designation: "Tutor", qualification: "MD (Sharir Rachana)" },
    ],
    image: img("photo-1576091160550-2173dba999ef"),
  },
  {
    slug: "dept-sharir-kriya",
    name: "Sharir Kriya (Physiology)",
    short: "Physiology — Tridosha, Dhatu, Mala and modern physiology.",
    about: [
      "The Department of Sharir Kriya bridges the gap between Ayurvedic and modern physiological concepts. Students explore the functional aspects of the human body through the lens of Tridosha theory, Dhatu formation, and Mala excretion alongside contemporary physiological principles.",
      "The curriculum covers comprehensive understanding of Dosha (Vata, Pitta, Kapha) and their physiological roles, Dhatu (tissue) formation and metabolism, Agni (digestive fire) and its types, Srotas (channels of circulation), and Ojas (vital essence). Modern topics include cardiovascular, respiratory, nervous, and endocrine system physiology.",
      "Well-equipped laboratories allow students to perform experiments on hematology, clinical examination, and physiological parameter assessment. Students learn to correlate Prakriti (body constitution) with physiological variations and disease susceptibility.",
      "The department organizes Prakriti assessment camps, workshops on clinical examination techniques, and research projects on the physiological basis of Ayurvedic concepts. Students are trained to perform and interpret various clinical investigations."
    ],
    aim: [
      "To understand the functional aspects of the human body through Ayurvedic and modern physiology.",
      "To establish correlation between Tridosha theory and modern physiological concepts.",
      "To develop skills in clinical examination and physiological parameter assessment.",
      "To promote research on the physiological basis of Ayurvedic principles."
    ],
    faculties: [
      { name: "Dr. S. M. Patil", designation: "Professor & Head", qualification: "MD (Sharir Kriya)" },
      { name: "Dr. V. R. Pawar", designation: "Professor", qualification: "MD (Sharir Kriya), PhD" },
      { name: "Dr. K. S. Chavan", designation: "Associate Professor", qualification: "MD (Sharir Kriya)" },
      { name: "Dr. M. N. Jadhav", designation: "Assistant Professor", qualification: "MD (Physiology)" },
    ],
    image: img("photo-1559757148-5c350d0d3c56"),
  },
  {
    slug: "dept-dravyaguna-vidnyan",
    name: "Dravyaguna Vidnyan (Pharmacology)",
    short: "Identification and properties of medicinal plants.",
    about: [
      "The Department of Dravyaguna Vidnyan focuses on the scientific study of medicinal plants and their therapeutic applications. Students learn to identify, classify, and understand the pharmacological properties of hundreds of medicinal herbs used in Ayurvedic formulations.",
      "The curriculum covers Rasa Panchak (taste, quality, potency, post-digestive effect, and therapeutic action), Nighantu Adhyayan (classical text study), and modern pharmacognosy. Students learn to differentiate between similar-looking plants and understand their specific indications and contraindications.",
      "The department maintains a lush herbal garden with over 200 species of medicinal plants, a crude drug museum with preserved specimens, and a well-equipped pharmacognosy laboratory. Students participate in regular herbal walks and plant collection trips to nearby forest areas.",
      "Research activities include pharmacognostic standardization of herbal drugs, documentation of traditional knowledge, and development of new herbal formulations. The department also conducts drug identification competitions and awareness programs on medicinal plant conservation."
    ],
    aim: [
      "To provide in-depth knowledge of medicinal plants and their therapeutic properties.",
      "To develop skills in identification, classification, and pharmacognostic evaluation.",
      "To promote conservation and cultivation of medicinal plants.",
      "To conduct research on standardization and validation of herbal drugs."
    ],
    faculties: [
      { name: "Dr. A. V. Kale", designation: "Professor & Head", qualification: "MD (Dravyaguna)" },
      { name: "Dr. S. B. Gaikwad", designation: "Professor", qualification: "MD (Dravyaguna), PhD" },
      { name: "Dr. P. D. Mahajan", designation: "Associate Professor", qualification: "MD (Dravyaguna)" },
      { name: "Dr. R. M. Kulkarni", designation: "Assistant Professor", qualification: "M.Pharm (Pharmacognosy)" },
      { name: "Dr. S. V. Deshpande", designation: "Lecturer", qualification: "MD (Dravyaguna)" },
    ],
    image: img("photo-1466692476868-aef1dfb1e735"),
  },
  {
    slug: "dept-agad-tantra",
    name: "Agad Tantra & Vidhi Vaidyak",
    short: "Toxicology and forensic medicine.",
    about: [
      "The Department of Agad Tantra & Vidhi Vaidyak specializes in toxicology, forensic medicine, and medical jurisprudence. Students are trained to identify various poisons, understand their effects on the human body, and administer appropriate antidotes as per Ayurvedic principles.",
      "The curriculum covers Sthavar (plant and mineral poisons) and Jangam (animal poisons) Visha, their classifications, symptoms, and management. Students also learn about environmental toxins, food poisoning, and industrial hazards. Modern toxicology concepts including heavy metal poisoning and pesticide toxicity are also taught.",
      "In forensic medicine, students learn about medico-legal procedures, documentation of medicolegal cases, autopsy procedures, and legal responsibilities of medical practitioners. The department maintains a toxicology museum with preserved specimens and poison samples for demonstration.",
      "Practical training includes management of snake bite, scorpion sting, and other poisoning cases. The department conducts awareness camps on poison prevention and first aid measures for common poisonings in rural areas."
    ],
    aim: [
      "To train students in identification and management of various poisons.",
      "To develop understanding of forensic medicine and medico-legal procedures.",
      "To create awareness about poison prevention and first aid measures.",
      "To promote research in clinical toxicology and antidote development."
    ],
    faculties: [
      { name: "Dr. M. S. Bhosale", designation: "Professor & Head", qualification: "MD (Agad Tantra)" },
      { name: "Dr. S. R. Nimbalkar", designation: "Associate Professor", qualification: "MD (Agad Tantra)" },
      { name: "Dr. A. P. Khot", designation: "Assistant Professor", qualification: "MD (Toxicology)" },
    ],
    image: img("photo-1530026405186-ed1f139313f8"),
  },
  {
    slug: "dept-ras-shastra",
    name: "Ras Shastra & Bhaishajya Kalpana",
    short: "Pharmaceutics — preparation of Ayurvedic medicines.",
    about: [
      "The Department of Ras Shastra & Bhaishajya Kalpana is dedicated to the science of Ayurvedic pharmaceutics. Students learn the preparation of various classical Ayurvedic formulations including Bhasmas, Asavas, Arishtas, Churnas, Vatis, and Ghritas following traditional methods.",
      "The curriculum covers Parad Vigyan (science of mercury), Loha Vigyan (metallic preparations), and Ratna Vigyan (gemstone therapeutics). Students understand the purification (Shodhana) and incineration (Marana) processes of metals and minerals, making them safe for therapeutic use.",
      "The department maintains a fully functional Rasashala (pharmacy) with traditional equipment like Khalva Yantra, Dola Yantra, and Patana Yantra. Students get hands-on experience in preparing various dosage forms under expert guidance while maintaining quality standards.",
      "Research activities focus on standardization of Bhasma preparations, development of novel drug delivery systems, and quality control of Ayurvedic formulations. The department also conducts industry visits and workshops on Good Manufacturing Practices (GMP)."
    ],
    aim: [
      "To impart practical knowledge of Ayurvedic pharmaceutical preparations.",
      "To ensure quality and standardization of classical formulations.",
      "To develop research skills in pharmaceutical science and drug development.",
      "To promote understanding of safety protocols in metal and mineral preparations."
    ],
    faculties: [
      { name: "Dr. V. R. Sonawane", designation: "Professor & Head", qualification: "MD (Ras Shastra)" },
      { name: "Dr. K. P. More", designation: "Professor", qualification: "MD (Ras Shastra), PhD" },
      { name: "Dr. S. N. Desai", designation: "Associate Professor", qualification: "MD (Ras Shastra)" },
      { name: "Dr. A. V. Patwardhan", designation: "Assistant Professor", qualification: "M.Pharm" },
      { name: "Dr. M. R. Kulkarni", designation: "Lecturer", qualification: "MD (Ras Shastra)" },
    ],
    image: img("photo-1471864190281-a93a3070b6de"),
  },
  {
    slug: "dept-rog-nidan",
    name: "Rog Nidan Evum Vikruti Vidnyan",
    short: "Pathology and diagnostics.",
    about: [
      "The Department of Rog Nidan focuses on the science of diagnosis and disease pathology. Students are trained to identify diseases through Ayurvedic diagnostic methods (Ashtavidha and Dashavidha Pariksha) and correlate them with modern laboratory findings.",
      "The curriculum covers Nidan Panchak (five components of diagnosis), pathology of various diseases, clinical examination techniques, and interpretation of laboratory reports. Students learn to differentiate between similar-presenting diseases and understand the progression from pathogenesis to clinical manifestation.",
      "Well-equipped laboratories allow students to perform hematological, biochemical, and microbiological investigations. The department has advanced diagnostic equipment including microscopes, analyzers, and testing kits for various parameters.",
      "The department organizes diagnostic health camps where students get hands-on experience in patient examination and laboratory investigations. Research projects focus on establishing diagnostic markers for Ayurvedic disease concepts."
    ],
    aim: [
      "To develop expertise in Ayurvedic and modern diagnostic techniques.",
      "To establish correlation between clinical features and laboratory findings.",
      "To promote research on diagnostic markers for Ayurvedic disease concepts.",
      "To create awareness about preventive healthcare and early diagnosis."
    ],
    faculties: [
      { name: "Dr. N. B. Ahire", designation: "Professor & Head", qualification: "MD (Rog Nidan)" },
      { name: "Dr. S. V. Ingle", designation: "Professor", qualification: "MD (Pathology)" },
      { name: "Dr. P. R. Wagh", designation: "Associate Professor", qualification: "MD (Rog Nidan)" },
      { name: "Dr. A. S. Birajdar", designation: "Assistant Professor", qualification: "MD (Microbiology)" },
    ],
    image: img("photo-1576091160399-112ba8d25d1d"),
  },
  {
    slug: "dept-swasthavritta",
    name: "Swasthavritta (Preventive Medicine)",
    short: "Preventive & social medicine, Yoga and Naturopathy.",
    about: [
      "The Department of Swasthavritta focuses on preventive medicine, public health, and lifestyle management. Students learn the principles of disease prevention through Dincharya (daily regimen), Ritucharya (seasonal regimen), and Sadvritta (code of conduct).",
      "The curriculum covers concepts of personal hygiene, community health, epidemiology, and nutrition. Students understand the role of Yoga and Naturopathy in maintaining health and preventing diseases. Topics include immunization, family planning, and occupational health.",
      "The department has a dedicated Yoga hall and Naturopathy unit where students learn various asanas, pranayama, and meditation techniques. Field practice areas allow students to conduct community health surveys and implement health awareness programs.",
      "The department organizes International Yoga Day celebrations, health awareness rallies, village health surveys, and school health programs. Students are trained to plan and execute community health interventions in rural areas."
    ],
    aim: [
      "To promote preventive healthcare through lifestyle modifications and Yoga.",
      "To develop community health awareness and intervention programs.",
      "To integrate traditional health practices with modern public health approaches.",
      "To create healthcare professionals committed to community service."
    ],
    faculties: [
      { name: "Dr. K. T. Pawar", designation: "Professor & Head", qualification: "MD (Swasthavritta)" },
      { name: "Dr. S. G. Bansode", designation: "Professor", qualification: "MD (Swasthavritta), PhD" },
      { name: "Dr. V. S. Mohite", designation: "Associate Professor", qualification: "MD (Yoga)" },
      { name: "Dr. A. D. Shinde", designation: "Assistant Professor", qualification: "MD (Community Medicine)" },
      { name: "Dr. S. R. Chavan", designation: "Yoga Instructor", qualification: "PG Diploma in Yoga" },
    ],
    image: img("photo-1545205597-3d9d02c29597"),
  },
];

export const DEPT_MAP: Record<string, DeptInfo> = Object.fromEntries(
  DEPARTMENTS.map((d) => [d.slug, d]),
);

function FacultiesCard({ Faculties, index }: { Faculties: DeptInfo["faculties"][0]; index: number }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 border border-border hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
        {index + 1}
      </div>
      <div>
        <h4 className="font-semibold text-foreground">{Faculties.name}</h4>
        <p className="text-sm text-amber-600 dark:text-amber-400">{Faculties.designation}</p>
        <p className="text-xs text-muted-foreground">{Faculties.qualification}</p>
      </div>
    </div>
  );
}

export function DepartmentPage({ slug }: { slug: string }) {
  const d = DEPT_MAP[slug];
  if (!d) return null;
  
  return (
    <div className="space-y-8 animate-fade-in">


      {/* About Section - Left Info and Right Round Image */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Left Side - About Information Paragraphs */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-2xl p-6 border border-amber-100 dark:border-amber-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold">About the Department</h2>
          </div>
          <div className="space-y-4">
            {d.about.map((paragraph, idx) => (
              <p key={idx} className="text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Right Side - Round Image with Quick Info */}
        <div className="space-y-6">
          {/* Round Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl ring-4 ring-amber-500/30 group">
                <img
                  src={d.image}
                  alt={d.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
         
            </div>
          </div>
          
          {/* Quick Info Badges */}
       

          {/* AIM Section - Below Quick Info Badges */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-800 mt-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <span className="text-purple-600 text-lg">🎯</span>
              </div>
              <h2 className="text-xl font-bold">Aim & Objectives</h2>
            </div>
            <div className="space-y-3">
              {d.aim.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-600 dark:text-purple-400 text-xs">{idx + 1}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Faculties Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <span className="text-blue-600 text-lg">👨‍🏫</span>
          </div>
          <h2 className="text-xl font-bold">Faculties Members</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent"></div>
          <span className="text-sm text-muted-foreground">{d.faculties.length} Members</span>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {d.faculties.map((Faculties, idx) => (
            <FacultiesCard key={idx} Faculties={Faculties} index={idx} />
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-xl p-5 text-center border border-amber-100 dark:border-amber-800">
        <p className="text-sm text-muted-foreground">
          For more information about the {d.name} department, please contact the administrative office.
        </p>
      </div>
    </div>
  );
}

export const DEPT_PAGE_CONTENT: Record<string, React.FC> = Object.fromEntries(
  DEPARTMENTS.map((d) => [d.slug, () => <DepartmentPage slug={d.slug} />]),
);