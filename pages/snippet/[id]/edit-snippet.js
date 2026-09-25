import SnippetForm from "@/components/features/SnippetForm/SnippetForm";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { mutate } from "swr";
import useSWR from "swr";

export default function EditSnippetPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: snippet, isLoading, error } = useSWR(`/api/snippets/${id}`);

  async function handleEditSubmit(updateData) {
    const response = await fetch(`/api/snippets/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      toast.error("Error editing snippet.");
      return;
    }

    await mutate(`/api/snippets/${id}`);
    await mutate("/api/snippets");
    await router.push(`/snippet/${id}`);
    toast.success("Your snippet was successfully edited!");
  }

  if (isLoading) return <p className="p-4 text-gray-500">Loading...</p>;
  if (error || !snippet)
    return (
      <div className="p-4">
        <p className="font-semibold">
          Oops! Someting did not go as planned while loading the snippet...
        </p>
        <p className="text-gray-500">Please try again later</p>
      </div>
    );

  const initialValues = {
    title: snippet.title ?? "",
    language:
      snippet.language && typeof snippet.language === "object"
        ? (snippet.language._id ?? "")
        : (snippet.language ?? ""),
    code: snippet.code ?? "",
    notes: snippet.notes ?? "",
    installCommand: snippet.installCommand ?? "",
    link: snippet.link ?? "",
    tagIds: (snippet.tags ?? []).map((tag) =>
      typeof tag === "object" ? tag._id : tag
    ),
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">DevSnippet</h1>
        <p className="text-gray-500 text-sm">Edit Snippet</p>
      </header>

      <main>
        <SnippetForm
          initialValues={initialValues}
          onSubmit={handleEditSubmit}
          snippetId={id}
          isEditing={true}
        />
      </main>
    </div>
  );
}
