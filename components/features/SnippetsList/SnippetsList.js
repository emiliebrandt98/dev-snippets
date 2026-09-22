import SnippetCard from "../SnippetCard/SnippetCard";

export default function SnippetsList({ snippets }) {
  if (!snippets || snippets.length === 0) {
    return <p>This snippet does not exist. Please try again.</p>;
  }

  return (
    <>
      {snippets.map((snippet) => {
        return (
          <SnippetCard
            key={snippet._id}
            title={snippet.title}
            language={snippet.language?.name}
            date={snippet.createdAt}
          />
        );
      })}
    </>
  );
}
