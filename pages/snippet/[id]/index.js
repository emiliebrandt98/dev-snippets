import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";

export default function SnippetPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: snippet,
    error,
    isLoading,
  } = useSWR(id ? `/api/snippets/${id}` : null);

  if (!snippet) {
    return <p className="p-4 textgray-500">This snippet cound not be found.</p>;
  }

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

  const { language, title, code, notes, installCommand, link } = snippet;
  const formattedDate = new Date(snippet.createdAt).toLocaleDateString("de-DE");

  return (
    <div className="max-w-md mx-auto p-4">
      <header className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center w-10 h-10 aspect-square rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <p className="m4-4 text-sm tex-gray 500">{`${formattedDate} · ${language?.name}`}</p>
        <h1 className="text-xl font-bold mt-1">{title}</h1>
      </header>

      <main>
        <pre
          aria-label="code block"
          className="bg-gray-100 rounded-lg p-4 text-sm font-mono whitespace-pre-wrap overflow-x-auto"
        >
          {code}
        </pre>

        <h2 className="font-bold text-lg mt-6 mb-2">Notes:</h2>
        <p className="text-gray-700 whitespace-pre-line">{notes}</p>

        {installCommand && (
          <>
            <h2 className="font-bold text-lg mt-6 mb-2">Install Command:</h2>
            <p className="bg-gray-100 rounded-md p-3 text-sm font-mono">
              {installCommand}
            </p>
          </>
        )}

        {link && (
          <>
            <h2 className="font-bold text-lg mt-6 mb-2">Link:</h2>
            <Link
              href={link}
              target="_blank"
              rel="noreferrer"
              className="block bg-gray-100 rounded-md p-3 text-sm text-blue-600 hover:underline break-all"
            >
              {link}
            </Link>
          </>
        )}
      </main>
    </div>
  );
}
