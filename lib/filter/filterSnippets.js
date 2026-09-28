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

export default function filterSnippets(snippets, activeFilterItems) {
  return snippets.filter((snippet) => {
    const snippetYear = new Date(snippet.createdAt).getFullYear();
    const snippetTagIds = (snippet.tags ?? []).map((tag) => tag._id);

    const matchesLanguage =
      activeFilterItems.languages.length === 0 ||
      activeFilterItems.languages.includes(snippet.language._id);

    const matchesTags =
      activeFilterItems.tags.length === 0 ||
      snippetTagIds.some((id) => activeFilterItems.tags.includes(id));

    const matchesYear =
      activeFilterItems.years.length === 0 ||
      activeFilterItems.years.includes(snippetYear);

    return matchesLanguage && matchesTags && matchesYear;
  });
}
