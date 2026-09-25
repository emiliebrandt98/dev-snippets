import SnippetsList from "@/components/features/SnippetsList/SnippetsList";

export default function FavoritesPage({ snippets, isLoading, error }) {
  if (isLoading) {
    return <p className="p-4 text-gray-500">Just a second. Loading...</p>;
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="font-semibold">Oops! Someting did not go as planned...</p>
        <p className="text-gray-500">Please try again later</p>
      </div>
    );
  }
  const favoriteSnippets =
    snippets.filter((snippet) => isFavorite.includes(snippet._id)) ?? [];

  if (favoriteSnippets.length === 0) {
    return (
      <p className="p-4 textgray-500">
        Your favorite snippets cound not be found.
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">DevSnippets</h1>
      </header>

      <main>
        <SnippetsList snippets={favoriteSnippets} />
      </main>
    </div>
  );
}
