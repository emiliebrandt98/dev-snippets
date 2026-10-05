import { ArrowLeft, Pencil } from "lucide-react";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import CopyToClipboard from "@/components/ui/CopyToClipboard/CopyToClipboard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import FavoriteButton from "@/components/ui/FavoriteButton/FavoriteButton";
import Switch from "@/components/ui/Switch/Switch";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import InfoModal from "@/components/ui/InfoModal/InfoModal";
import { useState } from "react";

export default function SnippetPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { id } = router.query;

  const {
    data: snippet,
    error,
    isLoading,
    mutate,
  } = useSWR(id ? `/api/snippets/${id}` : null);
  const { mutate: mutateGlobal } = useSWRConfig();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  if (isLoading) {
    return <p className="p-4 text-gray-500">Just a second. Loading...</p>;
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="font-semibold">Oops! Someting did not go as planned...</p>
        <p className="text-gray-500">Please try again later</p>
      </div>
    );
  }

  if (!snippet) {
    return (
      <p className="p-4 text-gray-500">This snippet cound not be found.</p>
    );
  }

  const isOwner = snippet.userId === session?.user?.id;

  const { language, title, code, notes, installCommand, link } = snippet;
  const formattedDate = new Date(snippet.createdAt).toLocaleDateString("de-DE");

  const safeLanguage = language?.syntax || "text";

  async function updateIsPublic(newValue) {
    const response = await fetch(`/api/snippets/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublic: newValue }),
    });

    if (response.ok) {
      await mutate();
      await mutateGlobal("/api/snippets");
      await mutateGlobal("/api/snippets/public");
    } else {
      toast.error("Error switching to Public.");
    }
  }

  function handleTogglePublic() {
    if (snippet.isPublic) {
      updateIsPublic(false);
    } else {
      setIsModalOpen(true);
    }
  }

  async function handleConfirmPublish() {
    setIsConfirming(true);
    await updateIsPublic(true);
    setIsConfirming(false);
    setIsModalOpen(false);
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <header className="mb-4">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="back to previous page"
          className="inline-flex items-center justify-center w-10 h-10 aspect-square rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-start justify-between">
          <div>
            <p className="mb-4 text-sm text-gray-500">{`${formattedDate} · ${language?.name}`}</p>

            <h1 className="text-xl font-bold mt-1">{title}</h1>
          </div>

          <div className="flex items-center gap-2">
            <FavoriteButton snippetId={id} />
            {isOwner && (
              <Link
                href={`/snippet/${snippet?._id}/edit-snippet`}
                aria-label="edit snippet"
                className="inline-flex items-center justify-center w-8 h-8 aspect-square rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                <Pencil size={16} />
              </Link>
            )}
          </div>
        </div>
      </header>

      <main>
        <ul className="flex flex-wrap gap-2 mt-2 list-none pl-0">
          {snippet.tags?.map((tag) => (
            <li
              key={tag._id}
              className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-lg"
            >
              {tag.label}
            </li>
          ))}
        </ul>
        <div className="flex items-end justify-between gap-2 bg-gray-100 rounded-lg p-3">
          <SyntaxHighlighter
            language={safeLanguage}
            showLineNumbers
            style={oneLight}
            customStyle={{
              background: "transparent",
              fontSize: "0.8rem",
              overflowX: "auto",
              margin: "0",
            }}
            codeTagProps={{ style: { background: "transparent" } }}
          >
            {code}
          </SyntaxHighlighter>
          <CopyToClipboard textToCopy={code} />
        </div>

        {notes && (
          <>
            <h2 className="font-bold text-lg mt-6 mb-2">Notes:</h2>
            <p className="text-gray-700 whitespace-pre-line">{notes}</p>
          </>
        )}

        {installCommand && (
          <>
            <h2 className="font-bold text-lg mt-6 mb-2">Install Command:</h2>
            <div className="flex items-center justify-between gap-2 bg-gray-100 rounded-md p-3">
              <p className="text-sm font-mono">{installCommand}</p>
              <CopyToClipboard textToCopy={installCommand} />
            </div>
          </>
        )}

        {link && (
          <>
            <h2 className="font-bold text-lg mt-6 mb-2">Link:</h2>
            <div className="flex items-center justify-between gap-2 bg-gray-100 rounded-md p-3">
              <Link
                href={link}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-blue-600 hover:underline break-all"
              >
                {link}
              </Link>
              <CopyToClipboard textToCopy={link} />
            </div>
          </>
        )}

        <section>
          <h2 className="font-bold text-lg mt-6 mb-2">Public:</h2>
          <div className="flex flex-row gap-10">
            <p className="m4-4 text-sm text-gray-500">
              When &quot;Public&quot; is activated, this snippet will be
              displayed on the Public Page, allowing you to share snippets with
              other users.
            </p>
            {isOwner && (
              <Switch value={snippet.isPublic} onChange={handleTogglePublic} />
            )}
          </div>
        </section>

        {isModalOpen && (
          <InfoModal
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmPublish}
            isConfirming={isConfirming}
            title="Confirm publish snippet"
          >
            <p>
              When confirming, this snippet can be saved and seen by other
              users.
            </p>
          </InfoModal>
        )}
      </main>
    </div>
  );
}
