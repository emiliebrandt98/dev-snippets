import FavoriteButton from "@/components/ui/FavoriteButton/FavoriteButton";
import Link from "next/link";

export default function SnippetCard({
  id,
  title,
  language,
  date,
  tags,
  matchedFields,
  isPublic,
  userName,
}) {
  const otherMatches = matchedFields ?? [].filter((field) => field !== "title");
  const formattedDate = new Date(date).toLocaleDateString("de-DE");

  return (
    <Link
      href={`/snippet/${id}`}
      className="block rounded-lg bg-gray-50 p-4 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition"
    >
      <div className="flex flex-row justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{`${formattedDate} · ${language}`}</p>

          <h2 className="flex flex-col font-semibold text-lg mt-1">
            {title}
            {otherMatches.length > 0 && (
              <span className=" text-xs text-gray-500 dark:text-gray-400">
                (found in {otherMatches.join(", ")})
              </span>
            )}
          </h2>
        </div>

        <FavoriteButton snippetId={id} />
      </div>

      <ul className="flex flex-wrap gap-2 mt-2 list-none pl-0">
        {tags.map((tag) => (
          <li key={tag._id} className="tag">
            {tag.label}
          </li>
        ))}
      </ul>

      <div className="flex justify-end gap-2 text-sm text-gray-500 dark:text-gray-400">
        <p>{isPublic ? "Public" : "Private"}</p>
        {userName && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            · by {userName}
          </p>
        )}
      </div>
    </Link>
  );
}
