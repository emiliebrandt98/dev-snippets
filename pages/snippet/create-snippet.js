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
    <div className="max-w-2xl mx-auto p-4 lg:mt-8">
      <header className="flex flex-col gap-2 mb-6">
        <h1 className="text-2xl font-bold">Create snippet</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Save code you want to reuse. Add a title, language, and tags so you
          can find it again quickly. You can choose on the detail page whether
          it stays private or is visible to others.
        </p>
      </header>

      <main>
        <SnippetForm snippets={snippets} onSubmit={handleCreateSubmit} />
      </main>
    </div>
  );
}
