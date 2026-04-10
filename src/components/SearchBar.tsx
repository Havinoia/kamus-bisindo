"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { searchWords } from "@/lib/search";
import type { Word } from "@/lib/types";
import Link from "next/link";

interface SearchBarProps {
  words: Word[];
}

export default function SearchBar({ words }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Word[]>([]);
  const [showResults, setShowResults] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    if (value.trim().length >= 2) {
      const found = searchWords(value, words);
      setResults(found.slice(0, 6));
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [words]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="max-w-3xl mx-auto relative" ref={containerRef}>
      {/* Search Input */}
      <div className="flex items-center bg-surface-container-lowest p-2 rounded-full shadow-xl shadow-primary/5 border border-outline-variant/20 focus-within:ring-2 focus-within:ring-secondary transition-all">
        <span className="material-symbols-outlined ml-5 text-outline text-2xl">
          search
        </span>
        <input
          className="w-full bg-transparent border-none focus:outline-none px-4 py-3 lg:py-4 text-base lg:text-lg text-on-surface placeholder:text-outline"
          placeholder="Cari kosa isyarat (misal: Halo, Makan, Terima Kasih)..."
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setShowResults(true);
          }}
        />
        <button className="bg-primary text-on-primary px-8 lg:px-10 py-3 lg:py-4 rounded-full font-bold text-base lg:text-lg hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 whitespace-nowrap">
          Cari
        </button>
      </div>

      {/* Search Results Dropdown */}
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-surface-container-lowest/95 glass-nav rounded-xl shadow-ambient-lg z-50 overflow-hidden animate-fade-in-up">
          {results.map((word, i) => (
            <Link
              key={word.id}
              href={`/kamus/${word.slug}`}
              onClick={() => setShowResults(false)}
              className={`flex items-center gap-4 px-6 py-4 hover:bg-primary-fixed/30 transition-colors ${
                i !== results.length - 1
                  ? "border-b border-outline-variant/10"
                  : ""
              }`}
            >
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                sign_language
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-headline font-bold text-on-surface text-sm">
                  {word.title}
                </p>
                <p className="text-xs text-on-surface-variant truncate">
                  {word.description}
                </p>
              </div>
              <span className="material-symbols-outlined text-outline text-sm">
                arrow_forward
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* No results */}
      {showResults && query.trim().length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-surface-container-lowest/95 glass-nav rounded-xl shadow-ambient-lg z-50 overflow-hidden animate-fade-in-up">
          <div className="px-6 py-8 text-center">
            <span className="material-symbols-outlined text-outline text-4xl mb-2 block">
              search_off
            </span>
            <p className="text-on-surface-variant text-sm">
              Tidak ada hasil untuk &quot;{query}&quot;
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
