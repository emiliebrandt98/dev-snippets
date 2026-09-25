export default function useSearchMatch(snippets, search) {
  function getSearchMatch(searchTerm, snippet) {
    const trimmedTerm = searchTerm.trim();
    if (!trimmedTerm) return { isMatch: true, matchedFields: [] };

    const normalizedTerm = trimmedTerm.toLowerCase();
    const matchedFields = [];

    if (snippet.title.toLowerCase().includes(normalizedTerm))
      matchedFields.push("title");
    if (snippet.code.toLowerCase().includes(normalizedTerm))
      matchedFields.push("code");
    if (
      (snippet.tags ?? []).some((tag) =>
        tag.label.toLowerCase().includes(normalizedTerm)
      )
    ) {
      matchedFields.push("tag");
    }

    return { isMatch: matchedFields.length > 0, matchedFields };
  }

  const searchResults = (snippets ?? []).map((snippet) => ({
    snippet,
    match: getSearchMatch(search, snippet),
  }));

  const searchedSnippets = searchResults
    .filter(({ match }) => match.isMatch)
    .map(({ snippet, match }) => ({
      ...snippet,
      matchedFields: match.matchedFields,
    }));

  return { searchedSnippets };
}
