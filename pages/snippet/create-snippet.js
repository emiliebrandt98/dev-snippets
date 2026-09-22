import SnippetForm from "@/components/features/SnippetForm/SnippetForm";

export default function CreateSnippetPage({ snippets }) {
  return (
    <>
      <header>
        <h1>DevSnippet</h1>
        <p>Create Snippet</p>
      </header>

      <main>
        <SnippetForm snippets={snippets} />
      </main>
    </>
  );
}
