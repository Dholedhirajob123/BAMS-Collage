// components/pages/Hospital.tsx
import { InfoPage } from "./InfoPage";
import g7 from "@/assets/gallery-7.jpg";

export function Hospital() {
  return (
    <InfoPage 
      hero={g7} 
      title="Attached Teaching Hospital" 
      subtitle="OPD · IPD · Panchakarma · Emergency"
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
}

export default Hospital;