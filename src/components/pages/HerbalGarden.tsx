// components/pages/HerbalGarden.tsx
import { InfoPage } from "./InfoPage";
import g2 from "@/assets/gallery-2.jpg";

export function HerbalGarden() {
  return (
    <InfoPage 
      hero={g2} 
      title="Herbal Garden"
      paragraphs={[
        "A dedicated medicinal-plant garden cultivates over 200 species of Ayurvedic herbs used in Dravyaguna and Rasashastra teaching — giving students live exposure to the plants they study in classical texts.",
        "The garden also supports the teaching pharmacy with raw materials for in-house Ayurvedic formulations.",
      ]}
    />
  );
}

export default HerbalGarden;