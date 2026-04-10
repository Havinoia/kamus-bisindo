"use client";

import { useState } from "react";
import WordCard from "@/components/WordCard";
import { getPublishedWords } from "@/lib/data";

export default function WordGrid() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const publishedWords = getPublishedWords();

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl lg:text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-2">
              Daftar Kosa Isyarat
            </h2>
            <p className="text-on-surface-variant">
              Menampilkan hasil pencarian terpopuler minggu ini
            </p>
          </div>

          {/* View toggles */}
          <div className="flex gap-3">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                viewMode === "grid"
                  ? "bg-secondary-container text-on-secondary-container shadow-sm"
                  : "border border-outline-variant text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              <span className="material-symbols-outlined text-xl">
                grid_view
              </span>
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                viewMode === "list"
                  ? "bg-secondary-container text-on-secondary-container shadow-sm"
                  : "border border-outline-variant text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              <span className="material-symbols-outlined text-xl">
                view_list
              </span>
              List
            </button>
          </div>
        </div>

        {/* Word Cards Grid */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "grid grid-cols-1 gap-6"
          }
        >
          {publishedWords.map((word, index) => (
            <WordCard key={word.id} word={word} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-3 bg-surface-container-low text-primary px-10 py-4 rounded-full font-bold hover:bg-primary-fixed transition-all border border-outline-variant/30 hover:shadow-ambient">
            Lihat Semua Isyarat
            <span className="material-symbols-outlined">expand_more</span>
          </button>
        </div>
      </div>
    </section>
  );
}
