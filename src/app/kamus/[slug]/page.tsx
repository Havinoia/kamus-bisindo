import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWordBySlug, getWords } from "@/lib/directus";
import WordCard from "@/components/WordCard";

// Generate static params for all published words (SEO)
export async function generateStaticParams() {
  const words = await getWords();
  return words.map((word) => ({
    slug: word.slug,
  }));
}

// Dynamic SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const word = await getWordBySlug(slug);
  
  if (!word) {
    return { title: "Tidak Ditemukan" };
  }
  
  return {
    title: `${word.title} — Isyarat BISINDO`,
    description: word.description,
    openGraph: {
      title: `${word.title} — Kamus BISINDO`,
      description: word.description,
      type: "article",
    },
  };
}

export default async function WordDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const word = await getWordBySlug(slug);

  if (!word) {
    notFound();
  }

  const category = word.category;
  const province = word.province;

  // Get related words (same category, excluding current)
  // For now, we fetch all words and filter. In production, consider a specific API call.
  const allWords = await getWords();
  const relatedWords = allWords
    .filter((w) => w.category_id === word.category_id && w.id !== word.id && w.status === "published")
    .slice(0, 3);

  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-surface-container-low py-4">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-on-surface-variant">
            <Link href="/" className="hover:text-primary transition-colors">
              Beranda
            </Link>
            <span className="material-symbols-outlined text-xs">
              chevron_right
            </span>
            <Link href="/" className="hover:text-primary transition-colors">
              Kamus
            </Link>
            <span className="material-symbols-outlined text-xs">
              chevron_right
            </span>
            <span className="text-primary font-bold">{word.title}</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-20 bg-surface">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Video Player Area — 3 columns */}
            <div className="lg:col-span-3">
              <div className="relative aspect-video bg-surface-container-highest rounded-xl overflow-hidden shadow-ambient">
                {word.video_url ? (
                  <video
                    className="w-full h-full object-contain"
                    controls
                    preload="metadata"
                  >
                    <source src={word.video_url} type="video/mp4" />
                    Browser Anda tidak mendukung video tag.
                  </video>
                ) : (
                  /* Placeholder when no video */
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-primary-container/20">
                    <span
                      className="material-symbols-outlined text-primary/30 mb-4"
                      style={{
                        fontSize: "96px",
                        fontVariationSettings: "'FILL' 1, 'wght' 200",
                      }}
                    >
                      sign_language
                    </span>
                    <p className="text-on-surface-variant text-sm">
                      Video isyarat akan segera tersedia
                    </p>
                  </div>
                )}
              </div>

              {/* Video Controls Info */}
              <div className="flex items-center gap-4 mt-6">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-low text-on-surface-variant text-sm font-bold hover:bg-primary-fixed transition-colors">
                  <span className="material-symbols-outlined text-lg">
                    replay
                  </span>
                  Putar Ulang
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-low text-on-surface-variant text-sm font-bold hover:bg-primary-fixed transition-colors">
                  <span className="material-symbols-outlined text-lg">
                    slow_motion_video
                  </span>
                  Perlambat
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-low text-on-surface-variant text-sm font-bold hover:bg-primary-fixed transition-colors">
                  <span className="material-symbols-outlined text-lg">
                    share
                  </span>
                  Bagikan
                </button>
              </div>
            </div>

            {/* Word Details — 2 columns */}
            <div className="lg:col-span-2">
              {/* Category badge */}
              {category && (
                <span className="inline-flex items-center gap-2 bg-tertiary-container text-on-tertiary-container px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-widest shadow-sm mb-6">
                  <span className="material-symbols-outlined text-sm">
                    {category.icon}
                  </span>
                  {category.name}
                </span>
              )}

              {/* Title */}
              <h1 className="text-4xl lg:text-5xl font-headline font-extrabold text-on-surface tracking-tight mb-4">
                {word.title}
              </h1>

              {/* Description */}
              <p className="text-on-surface-variant text-base lg:text-lg leading-relaxed mb-8">
                {word.description}
              </p>

              {/* Meta info cards */}
              <div className="space-y-4 mb-8">
                {/* Province */}
                <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-xl">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-2xl">
                      location_on
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant uppercase tracking-wider font-bold">
                      Wilayah
                    </p>
                    <p className="text-on-surface font-headline font-bold">
                      {province?.name ?? "Nasional"}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-xl">
                  <div className="w-12 h-12 bg-tertiary/10 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-tertiary text-2xl">
                      verified
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant uppercase tracking-wider font-bold">
                      Status
                    </p>
                    <p className="text-on-surface font-headline font-bold capitalize">
                      {word.status}
                    </p>
                  </div>
                </div>
              </div>

              {/* Back button */}
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-3.5 rounded-full font-bold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Kembali ke Kamus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Words */}
      {relatedWords.length > 0 && (
        <section className="py-16 bg-surface-container-low">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-1 w-12 bg-secondary rounded-full" />
              <h2 className="text-2xl font-headline font-bold text-primary">
                Isyarat Terkait
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedWords.map((w, i) => (
                <WordCard key={w.id} word={w} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
