import SnippetForm from "@/components/features/SnippetForm/SnippetForm";
import { useRouter } from "next/router";
import { mutate } from "swr";

export default function CreateSnippetPage({ snippets }) {
  const router = useRouter();

  async function handleCreateSubmit(data) {
    const response = await fetch("/api/snippets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Failed to create snippet");
      return;
    }

    mutate("/api/snippets");
    router.push("/");
  }

  return (
    <>
      <header>
        <h1>DevSnippet</h1>
        <p>Create Snippet</p>
      </header>

      <main>
        <SnippetForm snippets={snippets} onSubmit={handleCreateSubmit} />
      </main>
    </>
  );
}
