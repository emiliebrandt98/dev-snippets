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
    return <p>This snippet cound not be found.</p>;
  }

  if (isLoading) {
    return <p>Just a second. Loading...</p>;
  }

  if (error) {
    return (
      <>
        <p>Oops! Someting did not go as planned...</p>
        <p>Please try again later</p>
      </>
    );
  }

  const { language, title, code, notes, installCommand, link } = snippet;
  const formattedDate = new Date(snippet.createdAt).toLocaleDateString("de-DE");

  return (
    <>
      <header>
        <Link href={"/"}>
          <ArrowLeft />
        </Link>
        <small>{`${formattedDate} · ${language?.name}`}</small>
        <h1>{title}</h1>
      </header>

      <main>
        <h2>Code:</h2>
        <p>{code}</p>

        <h2>Notes:</h2>
        <p>{notes}</p>

        {installCommand && (
          <>
            <h2>Install Command:</h2>
            <p>{installCommand}</p>
          </>
        )}

        {link && (
          <>
            <h2>Link:</h2>
            <p>{link}</p>
          </>
        )}
      </main>
    </>
  );
}
