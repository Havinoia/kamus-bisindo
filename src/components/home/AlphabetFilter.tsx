import { Word } from "@/lib/types";
import Link from "next/link";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface AlphabetFilterProps {
  words: Word[];
  activeLetter: string;
}

export default function AlphabetFilter({ words, activeLetter }: AlphabetFilterProps) {
  return (
    <section className="bg-surface-container-low py-12">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-1 w-12 bg-secondary rounded-full" />
          <h2 className="text-xl font-headline font-bold text-primary">
            # Berdasarkan abjad
          </h2>
        </div>

        {/* Alphabet buttons */}
        <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
          <Link
            href="/"
            scroll={false}
            className={`px-4 h-10 md:h-12 flex items-center justify-center rounded-xl font-bold text-sm md:text-base border transition-all duration-200 ${
              !activeLetter || activeLetter === "all" || activeLetter === ""
                ? "bg-primary text-on-primary shadow-md scale-105 border-primary"
                : "bg-surface-container-lowest text-primary hover:bg-primary-fixed hover:text-primary shadow-sm border-outline-variant/10"
            }`}
          >
            Semua
          </Link>
          {ALPHABET.map((letter) => (
            <Link
              key={letter}
              href={`/?letter=${letter}`}
              scroll={false}
              className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl font-bold text-sm md:text-base border transition-all duration-200 ${
                activeLetter === letter
                  ? "bg-primary text-on-primary shadow-md scale-105 border-primary"
                  : "bg-surface-container-lowest text-primary hover:bg-primary-fixed hover:text-primary shadow-sm border-outline-variant/10"
              }`}
            >
              {letter}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
