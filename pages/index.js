import SnippetsList from "@/components/features/SnippetsList/SnippetsList";

export default function Home({ snippets, isLoading, error }) {
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">DevSnippets</h1>
      </header>
      <main>
        <SnippetsList snippets={snippets} />
      </main>
    </div>
  );
}
