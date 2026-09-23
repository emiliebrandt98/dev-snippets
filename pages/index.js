import SnippetsList from "@/components/features/SnippetsList/SnippetsList";
import { Plus, Trash, X } from "lucide-react";
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
        <div className="flex items-center justify-end gap-2 mb-4">
          <button
            type="button"
            className="inline-flex items-center justify-center w-10 h-10 aspect-square rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            <Trash size={16} />
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center w-10 h-10 aspect-square rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            <X size={16} />
          </button>
        </div>

        <SnippetsList snippets={snippets} />

        <Link
          href={"/snippet/create-snippet"}
          aria-label="create snippet"
          className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gray-400 hover:bg-gray-500 shadow-lg"
        >
          <Plus size={24} />
        </Link>
      </main>
    </div>
  );
}
