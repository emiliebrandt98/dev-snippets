import useSWR from "swr";

export default function Statistics({ snippets, favoriteSnippets }) {
  const { data: publicSnippets } = useSWR("/api/snippets/public");

  return (
    <section className="flex flex-row px-3 py-4 bg-gray-100 rounded-md justify-around">
      <div className="flex flex-col items-center basis-1/3">
        <p className="text-3xl font-bold">{favoriteSnippets.length}</p>
        <p className="m4-4 text-gray-500">Favorites</p>
      </div>

      <div className="flex flex-col items-center basis-1/3">
        <p className="text-3xl font-bold">{snippets.length}</p>
        <p className="m4-4 text-gray-500">Create</p>
      </div>

      <div className="flex flex-col items-center basis-1/3">
        <p className="text-3xl font-bold">{publicSnippets?.length ?? 0}</p>
        <p className="m4-4 text-gray-500">Public</p>
      </div>
    </section>
  );
}
