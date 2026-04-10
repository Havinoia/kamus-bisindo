import Link from "next/link";
import type { Word } from "@/lib/types";

// Placeholder colors for card thumbnails when video is missing
const PLACEHOLDER_GRADIENTS = [
  "from-primary/20 to-primary-container/30",
  "from-secondary/20 to-secondary-fixed/30",
  "from-tertiary/20 to-tertiary-container/30",
];

interface WordCardProps {
  word: Word;
  index?: number;
}

export default function WordCard({ word, index = 0 }: WordCardProps) {
  const category = word.category;
  const province = word.province;
  const gradient = PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length];

  return (
    <Link href={`/kamus/${word.slug}`} className="group block h-full">
      <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-ambient-lg transition-all duration-500 border border-outline-variant/10 flex flex-col h-full">
        {/* Thumbnail Area */}
        <div className="relative aspect-video overflow-hidden bg-surface-container-highest">
          {word.video_url ? (
            /* Video Thumbnail (Showing first frame) */
            <div className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out">
              <video
                src={`${word.video_url}#t=0.1`}
                className="w-full h-full object-contain"
                muted
                preload="metadata"
                playsInline
              />
            </div>
          ) : (
            /* Gradient placeholder with icon */
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
          )}

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
              <span className="bg-tertiary-container/90 backdrop-blur-md text-on-tertiary-container px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-sm">
                {category.name}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-headline font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
            {word.title}
          </h3>
          <p className="text-sm text-on-surface-variant line-clamp-2 mb-6 flex-1 italic leading-relaxed">
            &quot;{word.description}&quot;
          </p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/5">
            <div className="flex items-center gap-2 text-on-surface-variant font-medium text-xs">
              <span className="material-symbols-outlined text-primary text-lg">
                location_on
              </span>
              {province?.name ?? "Nasional"}
            </div>
            <span className="text-primary font-bold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
              Detail Isyarat
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
