import useSWR from "swr";

export default function Statistics({ snippets, favoriteSnippets }) {
  const { data: publicSnippets } = useSWR("/api/snippets/public");

  return (
    <section className="flex flex-row px-3 py-4 bg-gray-100 dark:bg-gray-800 rounded-2xl justify-around">
      <div className="flex flex-col items-center basis-1/3">
        <p className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          {favoriteSnippets?.length ?? 0}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
          Favorites
        </p>
      </div>

      <div className="flex flex-col items-center basis-1/3">
        <p className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          {snippets.length}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">Create</p>
      </div>

      <div className="flex flex-col items-center basis-1/3">
        <p className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          {publicSnippets?.length ?? 0}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">Public</p>
      </div>
    </section>
  );
}
