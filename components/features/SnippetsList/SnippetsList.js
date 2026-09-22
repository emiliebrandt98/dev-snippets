import SnippetCard from "../SnippetCard/SnippetCard";

export default function SnippetsList({ snippets }) {
  if (!snippets || snippets.length === 0) {
    return (
      <>
        <p>No snippets found. Create snippets to display them in a list.</p>
        <snmall>{`You can create snippets with the "+" button.`}</snmall>
      </>
    );
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
