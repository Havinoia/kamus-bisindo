import HeroSection from "@/components/home/HeroSection";
import AlphabetFilter from "@/components/home/AlphabetFilter";
import WordGrid from "@/components/home/WordGrid";
import FilterSection from "@/components/home/FilterSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AlphabetFilter />
      <WordGrid />
      <FilterSection />
    </>
  );
}
