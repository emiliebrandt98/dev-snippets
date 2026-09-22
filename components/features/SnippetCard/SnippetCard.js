export default function SnippetCard({ title, language, date }) {
  return (
    <div>
      <small>{`${date} · ${language}`}</small>
      <h2>{title}</h2>
    </div>
  );
}
