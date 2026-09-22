import Link from "next/link";

export default function SnippetCard({ id, title, language, date }) {
  const formattedDate = new Date(date).toLocaleDateString("de-DE");
  return (
    <Link
      href={`/snippet/${id}`}
      className="block rounded-lg bg-gray-50 p-4 hover:bg-gray-100 transition"
    >
      <p className="text-sm text-gray-500">{`${formattedDate} · ${language}`}</p>
      <h2 className="font-semibold text-lg mt-1">{title}</h2>
    </Link>
  );
}
