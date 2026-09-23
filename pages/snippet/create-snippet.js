import SnippetForm from "@/components/features/SnippetForm/SnippetForm";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
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
      toast.error("Failed to create snippet");
      return;
    }

    await mutate("/api/snippets");
    await router.push("/");
    toast.success("Your snippet was successfully created!");
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">DevSnippet</h1>
        <p className="text-gray-500 text-sm">Create Snippet</p>
      </header>

      <main>
        <SnippetForm snippets={snippets} onSubmit={handleCreateSubmit} />
      </main>
    </div>
  );
}
