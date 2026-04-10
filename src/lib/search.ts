import Fuse from "fuse.js";
import type { Word } from "./types";
import { getPublishedWords } from "./data";

const fuseOptions = {
  keys: [
    { name: "title", weight: 0.7 },
    { name: "description", weight: 0.3 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
};

let fuseInstance: Fuse<Word> | null = null;

function getFuseInstance(): Fuse<Word> {
  if (!fuseInstance) {
    fuseInstance = new Fuse(getPublishedWords(), fuseOptions);
  }
  return fuseInstance;
}

export function searchWords(query: string): Word[] {
  if (!query || query.trim().length < 2) {
    return getPublishedWords();
  }

  const fuse = getFuseInstance();
  const results = fuse.search(query.trim());
  return results.map((result) => result.item);
}
