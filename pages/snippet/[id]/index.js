import { ArrowLeft, Pencil } from "lucide-react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import CopyToClipboard from "@/components/ui/CopyToClipboard/CopyToClipboard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function SnippetPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: snippet,
    error,
    isLoading,
  } = useSWR(id ? `/api/snippets/${id}` : null);

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
    return <p className="p-4 textgray-500">This snippet cound not be found.</p>;
  }

  const { language, title, code, notes, installCommand, link } = snippet;
  const formattedDate = new Date(snippet.createdAt).toLocaleDateString("de-DE");

  const safeLanguage = language?.syntx || "text";

  return (
    <div className="max-w-md mx-auto p-4">
      <header className="mb-4">
        <Link
          href="/"
          aria-label="back to previous page"
          className="inline-flex items-center justify-center w-10 h-10 aspect-square rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <p className="m4-4 text-sm tex-gray 500">{`${formattedDate} · ${language?.name}`}</p>

            <h1 className="text-xl font-bold mt-1">{title}</h1>
          </div>

          <Link
            href={`/snippet/${snippet?._id}/edit-snippet`}
            aria-label="edit snippet"
            className="inline-flex items-center justify-center w-10 h-10 aspect-square rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            <Pencil size={24} className="w-5 h-5" />
          </Link>
        </div>
      </header>

      <main>
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
      </main>
    </div>
  );
}
