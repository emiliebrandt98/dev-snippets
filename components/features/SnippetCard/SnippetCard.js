export default function SnippetCard({ title, language, date }) {
  const formattedDate = new Date(date).toLocaleDateString("de-DE");
  return (
    <div>
      <small>{`${formattedDate} · ${language}`}</small>
      <h2>{title}</h2>
    </div>
  );
}
