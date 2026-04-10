import HeroSection from "@/components/home/HeroSection";
import AlphabetFilter from "@/components/home/AlphabetFilter";
import WordGrid from "@/components/home/WordGrid";
import FilterSection from "@/components/home/FilterSection";
import { getWords, getCategories, getProvinces } from "@/lib/directus";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; province?: string; letter?: string }>;
}) {
  const params = await searchParams;
  const activeCategory = params.category;
  const activeProvince = params.province;
  const activeLetter = params.letter;

  const [words, categories, provinces] = await Promise.all([
    getWords(),
    getCategories(),
    getProvinces(),
  ]);

  // Apply Filters
  let filteredWords = words;

  if (activeLetter) {
    filteredWords = filteredWords.filter((w) =>
      w.title.toUpperCase().startsWith(activeLetter.toUpperCase())
    );
  }

  if (activeCategory) {
    filteredWords = filteredWords.filter(
      (w) => w.category_id === parseInt(activeCategory)
    );
  }

  if (activeProvince) {
    filteredWords = filteredWords.filter(
      (w) => w.province_id === parseInt(activeProvince)
    );
  }

  return (
    <>
      <HeroSection words={words} />
      <AlphabetFilter words={words} activeLetter={activeLetter || "A"} />
      <div className="bg-surface">
        <WordGrid words={filteredWords} />
        <FilterSection 
          categories={categories} 
          provinces={provinces} 
          activeCategory={activeCategory}
          activeProvince={activeProvince}
        />
      </div>
    </>
  );
}
