// components/pages/Library.tsx
import { InfoPage } from "./InfoPage";
import g1 from "@/assets/gallery-1.jpg";

export function Library() {
  return (
    <InfoPage 
      hero={g1} 
      title="Digital Library"
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
}

export default Library;