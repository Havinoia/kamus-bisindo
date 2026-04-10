"use client";

import { useState } from "react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AlphabetFilter() {
  const [activeLetter, setActiveLetter] = useState("A");

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
          {ALPHABET.map((letter) => (
            <button
              key={letter}
              onClick={() => setActiveLetter(letter)}
              className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl font-bold text-sm md:text-base transition-all duration-200 ${
                activeLetter === letter
                  ? "bg-primary text-on-primary shadow-md scale-105"
                  : "bg-surface-container-lowest text-primary hover:bg-primary-fixed hover:text-primary shadow-sm"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
