import SnippetsList from "@/components/features/SnippetsList/SnippetsList";
import { Trash, X } from "lucide-react";
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

  function matchesSearch(searchTerm, snippet) {
    if (!search) return true;

    const normalizedSearchTerm = searchTerm.toLowerCase();

    const matchesTitle = snippet.title
      .toLowerCase()
      .includes(normalizedSearchTerm);
    const matchesCode = snippet.code
      .toLowerCase()
      .includes(normalizedSearchTerm);
    const matchesTags = (snippet.tags ?? []).some((tag) =>
      tag.label.toLowerCase().includes(normalizedSearchTerm)
    );

    return matchesTitle || matchesCode || matchesTags;
  }

  const searchedSnippets = snippets.filter((snippet) =>
    matchesSearch(search, snippet)
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">DevSnippets</h1>
      </header>

      <main>
        <section className="flex flex-row items-center gap-2 mb-4">
          <div className="flex-1">
            <SearchBar onSearch={onSearch} search={search} />
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
