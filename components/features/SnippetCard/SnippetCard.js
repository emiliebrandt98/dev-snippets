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
      className="flex flex-col rounded-lg content-between bg-gray-100 h-full p-4 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition"
    >
      <div>
        <div className="flex flex-row justify-between gap-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{`${formattedDate} · ${language}`}</p>

            <h2 className="flex flex-col  font-semibold text-lg/6 my-2  text-balance">
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

        <ul className="flex flex-wrap gap-2 my-2 list-none pl-0">
          {tags.map((tag) => (
            <li key={tag._id} className="tag">
              {tag.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-end gap-2 text-sm mt-auto text-gray-500 dark:text-gray-400">
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
