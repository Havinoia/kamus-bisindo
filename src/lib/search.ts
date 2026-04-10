import Fuse from "fuse.js";
import type { Word } from "./types";

const fuseOptions = {
  keys: [
    { name: "title", weight: 0.7 },
    { name: "description", weight: 0.3 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
};

export function searchWords(query: string, words: Word[]): Word[] {
  if (!query || query.trim().length < 2) {
    return words;
  }

  const fuse = new Fuse(words, fuseOptions);
  const results = fuse.search(query.trim());
  return results.map((result) => result.item);
}
