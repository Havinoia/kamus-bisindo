"use client";

import { useState } from "react";
import { provinces, categories } from "@/lib/data";

export default function FilterSection() {
  const [activeProvince, setActiveProvince] = useState("di-yogyakarta");
  const [activeCategory, setActiveCategory] = useState("Kata Benda");

  return (
    <section className="py-20 bg-surface-container-low">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Wilayah Provinsi */}
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <span className="material-symbols-outlined text-secondary text-3xl">
                map
              </span>
              <h2 className="text-2xl font-headline font-bold text-primary">
                Wilayah Provinsi
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {provinces.map((province) => (
                <button
                  key={province.id}
                  onClick={() => setActiveProvince(province.slug)}
                  className={`text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                    activeProvince === province.slug
                      ? "bg-secondary/10 text-secondary font-bold"
                      : "hover:bg-primary-fixed/30 text-on-surface-variant"
                  }`}
                >
                  {province.name}
                </button>
              ))}
            </div>
          </div>

          {/* Kategori */}
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <span className="material-symbols-outlined text-secondary text-3xl">
                category
              </span>
              <h2 className="text-2xl font-headline font-bold text-primary">
                Kategori
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.name)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                    activeCategory === category.name
                      ? "bg-tertiary-container text-on-tertiary-container shadow-sm"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-primary-fixed cursor-pointer"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
