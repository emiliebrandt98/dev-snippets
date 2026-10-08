import { ArrowLeft, Pencil } from "lucide-react";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import CopyToClipboard from "@/components/ui/CopyToClipboard/CopyToClipboard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneLight,
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import FavoriteButton from "@/components/ui/FavoriteButton/FavoriteButton";
import Switch from "@/components/ui/Switch/Switch";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import InfoModal from "@/components/ui/InfoModal/InfoModal";
import { useState } from "react";

export default function SnippetPage({ isDarkMode }) {
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
  const syntaxTheme = isDarkMode ? oneDark : oneLight;

  if (isLoading) {
    return <p className="p-4 text-gray-500">Just a second. Loading...</p>;
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="font-semibold">Oops! Someting did not go as planned...</p>
        <p className="text-gray-500 dark:text-gray-400">
          Please try again later
        </p>
      </div>
    );
  }

  if (!snippet) {
    return (
      <p className="p-4 text-gray-500 dark:text-gray-400">
        This snippet cound not be found.
      </p>
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

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <div className="max-w-2xl lg:max-w-none mx-auto lg:mt-8 p-4">
      <header>
        <button
          type="button"
          onClick={handleBack}
          aria-label="back to previous page"
          className="button-icon button-icon-primary mb-4 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{`${formattedDate} · ${language?.name}`}</p>

            <h1 className="text-2xl font-bold text-pretty">{title}</h1>
          </div>

          <div className="flex items-center gap-4">
            <FavoriteButton snippetId={id} />
            {isOwner && (
              <Link
                href={`/snippet/${snippet?._id}/edit-snippet`}
                aria-label="edit snippet"
                className="button-icon button-icon-primary rounded-lg"
              >
                <Pencil size={16} />
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex flex-col gap-6 mt-4">
        <ul className="flex flex-wrap gap-2 list-none pl-0">
          {snippet.tags?.map((tag) => (
            <li key={tag._id} className="tag">
              {tag.label}
            </li>
          ))}
        </ul>

        <hr className="border-gray-200 dark:border-gray-700 mb-4" />

        <div className="flex items-end justify-between gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-4">
          <SyntaxHighlighter
            language={safeLanguage}
            showLineNumbers
            className="code-block"
            style={syntaxTheme}
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
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-lg">Notes:</h2>
            <p className="text-gray-700 dark:text-gray-400 whitespace-pre-line text-pretty">
              {notes}
            </p>
          </div>
        )}

        {installCommand && (
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-lg">Install Command:</h2>
            <div className="flex items-center justify-between gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
              <p className="text-sm font-mono text-gray-500 dark:text-gray-400">
                {installCommand}
              </p>
              <CopyToClipboard textToCopy={installCommand} />
            </div>
          </div>
        )}

        {link && (
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-lg">Link:</h2>
            <div className="flex items-center justify-between gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
              <Link
                href={link}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-purple-600 dark:text-purple-400 hover:underline break-all"
              >
                {link}
              </Link>
              <CopyToClipboard textToCopy={link} />
            </div>
          </div>
        )}

        {isOwner && (
          <section className="flex flex-row justify-between lg:items-end items-center gap-10">
            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-lg">Public:</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                When &quot;Public&quot; is activated, this snippet will be
                displayed on the Public Page, allowing you to share snippets
                with other users.
              </p>
            </div>
            <Switch value={snippet.isPublic} onChange={handleTogglePublic} />
          </section>
        )}

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
