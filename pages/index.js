import SnippetsList from "@/components/features/SnippetsList/SnippetsList";
import { Plus } from "lucide-react";
import Link from "next/link";

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
        <Link href={"/snippet/create-snippet"}>
          <button
            type="button"
            aria-label="create snippet"
            className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gray-400 hover:bg-gray-500 shadow-lg"
          >
            <Plus size={24} />
          </button>
        </Link>
      </main>
    </div>
  );
}
