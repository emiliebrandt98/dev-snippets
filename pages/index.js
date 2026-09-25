import SnippetsList from "@/components/features/SnippetsList/SnippetsList";
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal/DeleteConfirmationModal";
import useSnippetSelection from "@/hooks/useSnippetSelection/useSnippetSelection";
import DeleteButton from "@/components/ui/DeleteButton/DeleteButton";
import SearchBar from "@/components/features/SearchBar/SearchBar";

export default function Home({ snippets, isLoading, error, onSearch, search }) {
  const {
    isDeleteMode,
    onToggleDeleteMode,
    selectedIds,
    setIsModalOpen,
    onSelectSnippet,
    onDeleteConfirmed,
    isModalOpen,
    isDeleting,
    selectedSnippets,
  } = useSnippetSelection(snippets);

  const FIELD_ORDER = ["title", "code", "tag"];

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

      return { isMatch: matchedFields.length > 0, matchedFields };
    }
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data.</p>;

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

  const matchedFieldsSummary = FIELD_ORDER.filter((field) =>
    searchedSnippets.some((snippet) => snippet.matchedFields.includes(field))
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">DevSnippets</h1>
      </header>

      <main>
        <section className="flex flex-row items-center gap-2 mb-4">
          <div className="flex-1">
            <SearchBar
              onSearch={onSearch}
              search={search}
              matchedFields={matchedFieldsSummary}
            />
          </div>
          <DeleteButton
            isDeleteMode={isDeleteMode}
            onToggleDeleteMode={onToggleDeleteMode}
            selectedIds={selectedIds}
            setIsModalOpen={setIsModalOpen}
          />
        </section>

        {!snippets || snippets.length === 0 ? (
          <>
            <p className="font-semibold">
              No snippets found. Create snippets to display them in a list.
            </p>
            <p className="text-gray-500">{`You can create snippets with the "+" button.`}</p>
          </>
        ) : null}

        <SnippetsList
          snippets={searchedSnippets}
          isDeleteMode={isDeleteMode}
          selectedIds={selectedIds}
          onSelectSnippet={onSelectSnippet}
        />
      </main>

      {isModalOpen && (
        <DeleteConfirmationModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={onDeleteConfirmed}
          selectedSnippets={selectedSnippets}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}
