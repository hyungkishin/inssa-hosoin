export type Topic = {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  summary: string;
  context: string;
  opener: string;
  followUp: string;
  caution: string;
  image: string;
  imageAlt: string;
  minutes: number;
  source: { label: string; url: string; note: string };
};
export type Filter = {
  category: string;
  query: string;
  unreadOnly: boolean;
  readIds: string[];
  savedOnly?: boolean;
  savedIds?: string[];
};
export type Progress = { saved: string[]; read: string[] };
export function filterTopics(topics: Topic[], filter: Filter): Topic[] {
  const query = filter.query.trim().toLocaleLowerCase("ko");
  return topics.filter(
    (topic) =>
      (filter.category === "전체" || topic.category === filter.category) &&
      (!filter.unreadOnly || !filter.readIds.includes(topic.id)) &&
      (!filter.savedOnly || filter.savedIds?.includes(topic.id)) &&
      (!query ||
        [topic.title, topic.subtitle, topic.summary, topic.opener]
          .join(" ")
          .toLocaleLowerCase("ko")
          .includes(query)),
  );
}
export function parseProgress(
  raw: string | null,
  validIds: string[],
): Progress {
  try {
    const data: unknown = raw ? JSON.parse(raw) : null;
    if (!data || typeof data !== "object" || Array.isArray(data))
      return { saved: [], read: [] };
    const value = data as Record<string, unknown>;
    const clean = (ids: unknown): string[] =>
      Array.isArray(ids)
        ? [
            ...new Set(
              ids.filter(
                (id): id is string =>
                  typeof id === "string" && validIds.includes(id),
              ),
            ),
          ]
        : [];
    return { saved: clean(value.saved), read: clean(value.read) };
  } catch {
    return { saved: [], read: [] };
  }
}
export function toggleId(ids: string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
}
export function scoreAnswers(answers: number[], correct: number[]): number {
  return correct.reduce(
    (score, answer, index) => score + (answers[index] === answer ? 1 : 0),
    0,
  );
}
