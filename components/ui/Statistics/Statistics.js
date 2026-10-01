export default function Statistics({ snippets, favoriteSnippets }) {
  return (
    <section className="flex flex-row px-3 py-4 bg-gray-100 rounded-md justify-around">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-bold">{favoriteSnippets.length}</p>
        <p className="m4-4 text-gray-500">Favorites</p>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-3xl font-bold">{snippets.length}</p>
        <p className="m4-4 text-gray-500">My Snippets</p>
      </div>

      {/* Will be changed as soon I build the public page. */}
      <div className="flex flex-col items-center">
        <p className="text-3xl font-bold">{snippets.length}</p>
        <p className="m4-4 text-gray-500">All Snippets</p>
      </div>
    </section>
  );
}
