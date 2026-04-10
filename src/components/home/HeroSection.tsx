import { Word } from "@/lib/types";
import SearchBar from "@/components/SearchBar";

interface HeroSectionProps {
  words: Word[];
}

export default function HeroSection({ words }: HeroSectionProps) {
  const totalWords = words.length;

  return (
    <section className="relative overflow-hidden bg-surface py-20 lg:py-32">
      {/* Background decorative blobs */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full blur-3xl animate-float" />
        <div
          className="absolute top-1/2 -right-24 w-80 h-80 bg-secondary rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-64 h-64 bg-tertiary rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary-container text-on-secondary-container rounded-full mb-8 font-label font-bold text-sm shadow-sm">
          <span
            className="material-symbols-outlined text-sm"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            stars
          </span>
          {totalWords} Kosa Isyarat
        </div>

        {/* Headline */}
        <h1 className="text-5xl lg:text-7xl font-extrabold text-primary tracking-tighter leading-tight mb-6 font-headline">
          Kamus BISINDO
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base lg:text-lg text-on-surface-variant leading-relaxed mb-12">
          Pelajari Bahasa Isyarat Indonesia dengan cara yang lebih taktil dan
          bermakna. Akses ribuan kosa kata dalam format video berkualitas tinggi
          untuk menghubungkan gerakan dan makna.
        </p>

        {/* Search Bar */}
        <SearchBar words={words} />
      </div>
    </section>
  );
}
