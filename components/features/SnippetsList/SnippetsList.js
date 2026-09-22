import SnippetCard from "../SnippetCard/SnippetCard";

export default function SnippetsList({ snippets }) {
  if (!snippets || snippets.length === 0) {
    return (
      <>
        <p className="font-semibold">
          No snippets found. Create snippets to display them in a list.
        </p>
        <p className="text-gray-500">{`You can create snippets with the "+" button.`}</p>
      </>
    );
  }

  return (
    <ul className="grid gap-4">
      {snippets.map((snippet) => {
        return (
          <li key={snippet._id}>
            <SnippetCard
              title={snippet.title}
              id={snippet._id}
              language={snippet.language?.name}
              date={snippet.createdAt}
            />
          </li>
        );
      })}
    </ul>
  );
}
