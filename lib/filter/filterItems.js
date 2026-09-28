export const EMPTY_FILTER = { languages: [], tags: [], years: [] };

export function getYears(snippets) {
  const years = [];

  snippets.forEach((snippet) => {
    const year = new Date(snippet.createdAt).getFullYear();

    if (!years.includes(year)) {
      years.push(year);
    }
  });

  return years.sort((a, b) => a - b);
}
