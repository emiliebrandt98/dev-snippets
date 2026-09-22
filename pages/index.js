import SnippetsList from "@/components/features/SnippetsList/SnippetsList";

export default function Home({ snippets, isLoading, error }) {
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data.</p>;

  return (
    <>
      <header>
        <h1>DevSnippets</h1>
      </header>
      <main>
        <SnippetsList snippets={snippets} />
      </main>
    </>
  );
}
