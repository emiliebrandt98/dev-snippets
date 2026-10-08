import { Trash, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function MultiSelect({
  availableTags,
  selectedTagIds,
  onSelectionChange,
  onCreateTag,
  onDeleteTag,
  isCreatingTag = false,
  deletingTagId = null,
  maxTags,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setErrorMessage("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const normalizedSearchTerm = searchTerm.trim();
  const isMaxTagsReached = selectedTagIds.length >= maxTags;

  const selectedTags = availableTags.filter((tags) =>
    selectedTagIds.includes(tags.id)
  );

  const filteredTags = availableTags.filter((tag) =>
    tag.label.toLowerCase().includes(normalizedSearchTerm.toLowerCase())
  );

  const canCreateNewTag =
    normalizedSearchTerm !== "" &&
    !availableTags.some(
      (tag) => tag.label.toLowerCase() === normalizedSearchTerm.toLowerCase()
    );

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
    setIsDropdownOpen(true);
    if (errorMessage) setErrorMessage("");
  }

  function handleSelectTag(tagId) {
    if (selectedTagIds.includes(tagId)) return;

    if (isMaxTagsReached) {
      setErrorMessage(`Max of ${maxTags} are reached.`);
      setIsDropdownOpen(false);
      return;
    }

    onSelectionChange([...selectedTagIds, tagId]);
    setSearchTerm("");
    setErrorMessage("");
  }

  function handleRemoveTag(tagId, event) {
    event.stopPropagation();
    onSelectionChange(selectedTagIds.filter((id) => id !== tagId));
    setErrorMessage("");
  }

  function handleCreateTag() {
    if (isCreatingTag) return;
    if (!normalizedSearchTerm) return;

    if (isMaxTagsReached) {
      setErrorMessage(`Max of ${maxTags} tags reached.`);
      return;
    }

    onCreateTag(normalizedSearchTerm);
    setSearchTerm("");
    setErrorMessage("");
  }

  function handleDeleteTag(tagId, event) {
    if (deletingTagId) return;
    event.stopPropagation();
    onDeleteTag(tagId);
  }

  return (
    <div ref={containerRef} className="relative">
      <label htmlFor="tag-serach" className="sr-only">
        Select or create a tag.
      </label>

      <div
        onClick={() => inputRef.current?.focus()}
        className="flex flex-wrap items-center gap-2 p-2 input"
      >
        {selectedTags.map((tag) => (
          <span
            key={tag.id}
            className="flex items-center gap-1 px-2 py-1 text-sm text-gray-700 bg-gray-700/10 dark:text-gray-400 dark:bg-gray-700 rounded-lg"
          >
            {tag.label}
            <button
              type="button"
              onClick={(event) => handleRemoveTag(tag.id, event)}
              aria-label={`Remove ${tag.label}`}
              className="cursor-pointer"
            >
              <X size={16} />
            </button>
          </span>
        ))}

        <input
          id="tag-serach"
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
          onFocus={() => setIsDropdownOpen(true)}
          placeholder={
            selectedTags.length === 0 ? "Search or create a tag" : ""
          }
          className="flex-1 m-full outline-none"
        />
      </div>

      {errorMessage && (
        <p
          role="alert"
          className="text-sm text-red-500 flex items-center gap-2 mt-0.5"
        >
          <span>⚠️</span>
          {errorMessage}
        </p>
      )}
      {!errorMessage && isMaxTagsReached && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Max of {maxTags} are reached.
        </p>
      )}

      {isDropdownOpen && (
        <ul
          role="listbox"
          aria-label="Available tags"
          className="absolute z-10 flex flex-col top-full left-0 w-full mt-1 bg-gray-50 dark:bg-gray-800 border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto"
        >
          {filteredTags.map((tag) => {
            const isSelected = selectedTagIds.includes(tag.id);
            return (
              <li
                key={tag.id}
                role="option"
                aria-selected={isSelected}
                className="flex items-center cursor-pointer justify-between p-2 bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <button
                  type="button"
                  onClick={() => handleSelectTag(tag.id)}
                  disabled={isSelected}
                  className="flex-1 text-left cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {tag.label}
                  {isSelected && (
                    <span className="text-xs text-gray-400">(selected)</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={(event) => handleDeleteTag(tag.id, event)}
                  disabled={deletingTagId === tag.id}
                  title="Remove tag completly."
                  aria-label={`${tag.label} löschen`}
                  className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash size={16} />
                </button>
              </li>
            );
          })}

          {canCreateNewTag && !isMaxTagsReached && (
            <li>
              <button
                type="button"
                onClick={handleCreateTag}
                disabled={isCreatingTag}
                className="w-full p-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              >
                <span className="font-medium">
                  {isCreatingTag ? "Creating..." : "Create: "}
                </span>
                {normalizedSearchTerm}
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
