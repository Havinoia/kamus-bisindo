import Link from "next/link";
import { getCategoryById, getProvinceById } from "@/lib/data";
import type { Word } from "@/lib/types";

// Placeholder colors for card thumbnails (no external images needed)
const PLACEHOLDER_GRADIENTS = [
  "from-primary/20 to-primary-container/30",
  "from-secondary/20 to-secondary-fixed/30",
  "from-tertiary/20 to-tertiary-container/30",
  "from-primary-fixed/40 to-primary/15",
  "from-secondary-fixed/40 to-secondary/15",
  "from-tertiary-fixed/40 to-tertiary/15",
];

interface WordCardProps {
  word: Word;
  index?: number;
}

export default function WordCard({ word, index = 0 }: WordCardProps) {
  const category = getCategoryById(word.category_id);
  const province = getProvinceById(word.province_id);
  const gradient =
    PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length];

  return (
    <Link href={`/kamus/${word.slug}`} className="group block">
      <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-ambient-lg transition-all duration-500 flex flex-col h-full">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-surface-container-highest">
          {/* Gradient placeholder with icon */}
          <div
            className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-700`}
          >
            <span
              className="material-symbols-outlined text-primary/30 select-none"
              style={{
                fontSize: "64px",
                fontVariationSettings: "'FILL' 1, 'wght' 300",
              }}
            >
              sign_language
            </span>
          </div>

          {/* Hover overlay with play button */}
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
              <span
                className="material-symbols-outlined text-primary text-4xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
            </div>
          </div>

          {/* Category badge */}
          {category && (
            <div className="absolute top-4 left-4">
              <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest shadow-sm">
                {category.name}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-2xl font-headline font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
            {word.title}
          </h3>
          <p className="text-sm text-on-surface-variant line-clamp-2 mb-4 flex-1">
            {word.description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <span className="material-symbols-outlined text-lg">
                location_on
              </span>
              {province?.name ?? "Nasional"}
            </div>
            <span className="text-secondary hover:underline font-bold text-sm flex items-center gap-1">
              Detail{" "}
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
