import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

export default function SnippetPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: snippet, error, isLoading } = useSWR(`/api/${id}`);
  const { date, language, title, code, notes, installcommand, link } = snippet;
  const formattedDate = new Date(date).toLocaleDateString("de-DE");

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

  return (
    <>
      <header>
        <ArrowLeft />
        <small>{`${formattedDate} · ${language}`}</small>
        <h1>{title}</h1>
      </header>

      <main>
        <section>{code}</section>
        <h2>Notes:</h2>
        <p>{notes}</p>
        <h2>Install command:</h2>
        <p>{installcommand}</p>
        <h2>Link:</h2>
        <p>{link}</p>
      </main>
    </>
  );
}
