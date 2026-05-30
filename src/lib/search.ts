import { UseCase, useCases } from "@/data/usecases";

export function searchUseCases(query: string): UseCase[] {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return useCases.slice(0, 4);
  }

  const ranked = useCases
    .map((item) => {
      const haystack = [item.title, item.prompt, item.description, ...item.tags].join(" ").toLowerCase();
      const words = normalized.split(/\s+/).filter(Boolean);
      const score = words.reduce((total, word) => total + (haystack.includes(word) ? 1 : 0), 0);
      const direct = haystack.includes(normalized) ? 4 : 0;

      return { item, score: score + direct };
    })
    .sort((a, b) => b.score - a.score);

  const matches = ranked.filter(({ score }) => score > 0).map(({ item }) => item);

  return matches.length > 0 ? matches.slice(0, 4) : useCases.slice(0, 4);
}

export function getBestUseCase(query: string): UseCase {
  return searchUseCases(query)[0] ?? useCases[0];
}
