import Link from "next/link";

export default function SnippetCard({ id, title, language, date }) {
  const formattedDate = new Date(date).toLocaleDateString("de-DE");
  return (
    <Link href={`/snippet/${id}`}>
      <small>{`${formattedDate} · ${language}`}</small>
      <h2>{title}</h2>
    </Link>
  );
}
