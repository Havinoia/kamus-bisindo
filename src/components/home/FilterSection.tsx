import { Category, Province } from "@/lib/types";
import Link from "next/link";

interface FilterSectionProps {
  categories: Category[];
  provinces: Province[];
  activeCategory?: string;
  activeProvince?: string;
}

export default function FilterSection({ 
  categories, 
  provinces,
  activeCategory,
  activeProvince 
}: FilterSectionProps) {
  return (
    <section className="py-20 bg-surface-container-low border-y border-outline-variant/10">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Wilayah Provinsi */}
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-secondary text-3xl">
                  map
                </span>
                <h2 className="text-2xl font-headline font-bold text-primary">
                  Wilayah Provinsi
                </h2>
              </div>
              {activeProvince && (
                <Link href="/" className="text-xs font-bold text-outline hover:text-primary transition-colors">
                  Reset
                </Link>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {provinces.map((province) => (
                <Link
                  key={province.id}
                  href={`/?province=${province.id}`}
                  scroll={false}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                    activeProvince === String(province.id)
                      ? "bg-secondary/10 text-secondary font-bold ring-1 ring-secondary/20"
                      : "hover:bg-primary-fixed/30 text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {province.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Kategori */}
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-secondary text-3xl">
                  category
                </span>
                <h2 className="text-2xl font-headline font-bold text-primary">
                  Kategori
                </h2>
              </div>
              {activeCategory && (
                <Link href="/" className="text-xs font-bold text-outline hover:text-primary transition-colors">
                  Reset
                </Link>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/?category=${category.id}`}
                  scroll={false}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                    activeCategory === String(category.id)
                      ? "bg-tertiary-container text-on-tertiary-container shadow-md"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-primary-fixed hover:text-primary cursor-pointer"
                  }`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
