import { Trash } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function MultiSelect({
  availableTags,
  selectedTagIds,
  onSelectionChange,
  onCreateTag,
  onDeleteTag,
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
  const isMaxTagsReached = selectedTagIds.length <= maxTags;

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
      return;
    }

    onSelectionChange([...selectedTagIds, tagId]);
    setSearchTerm("");
    setErrorMessage("");
  }

  function handleRemoveTag(tagId, event) {
    event.stopPropagation();
    onSelectionChange(selectedTagIds.filter((id) => id !== tagId));
  }

  function handleCreateTag() {
    if (!normalizedSearchTerm) return;

    if (isMaxTagsReached) {
      setErrorMessage(`Max of ${maxTags} are reached.`);
      return;
    }

    const newTag = { id: crypto.randomUUID(), label: normalizedSearchTerm };
    onCreateTag(newTag);
    onSelectionChange([...selectedTagIds, newTag.id]);
    (setSearchTerm(""), setErrorMessage(""));
  }

  function handleDeleteTag(tagId, event) {
    event.stopPropagation();
    onDeleteTag(tagId);
    onSelectionChange(selectedTagIds.filter((id) => id !== tagId));
  }

  function handleKeyDown(event) {
    if (event.key !== "Enter") return;
    event.preventDefault();

    if (!normalizedSearchTerm) return;

    const matchingTag = availableTags.find(
      (tag) => tag.label.toLowerCase() === normalizedSearchTerm.toLowerCase()
    );

    if (!matchingTag) {
      handleCreateTag();
      return;
    }

    if (selectedTagIds.includes(matchingTag.id)) {
      setErrorMessage(`You already selected "${normalizedSearchTerm}"`);
    } else {
      handleSelectTag(matchingTag.id);
    }
  }

  return (
    <div className="relative">
      <label htmlFor="tag-serach" className="sr-only">
        Select or create a tag.
      </label>

      <div
        ref={containerRef}
        onClick={() => inputRef.current?.focus()}
        className="flex flex-wrap items-center gap-1 p-2 border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-black"
      >
        {selectedTagIds.map((tag) => (
          <span
            key={tag.id}
            className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded"
          >
            {tag.label}
            <button
              type="button"
              onClick={(event) => handleRemoveTag(tag.id, event)}
              aria-label={`Remove ${tag.label}`}
            >
              x
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
          onKeyDown={handleKeyDown}
          disabled={isMaxTagsReached}
          placeholder={
            selectedTags.length === 0 ? "Search or create a tag" : ""
          }
          className="flex-1 min-w-32 outline-none disabled:cursor-not-allowed"
        />
      </div>

      {errorMessage && (
        <p role="alert" className="mt-1 text-sm text-red-600">
          {errorMessage}
        </p>
      )}
      {!errorMessage && isMaxTagsReached && (
        <p className="mt-1 text-sm text-gray-500">
          Max of {maxTags} are reached.
        </p>
      )}

      {isDropdownOpen && (
        <ul
          role="listbox"
          aria-label="Available tags"
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto"
        >
          {filteredTags.map((tag) => (
            <li
              key={tag.id}
              role="option"
              aria-selected={selectedTagIds.includes(tag.id)}
              className="flex items-center justify-between px-2 py-1 hover:bg-gray-50"
            >
              <button
                type="button"
                onClick={() => handleSelectTag(tag.id)}
                className="flex-1 text-left"
              >
                {tag.label}
              </button>
              <button
                type="button"
                onClick={(event) => handleDeleteTag(tag.id, event)}
                title="Remove tag completly."
                aria-label={`${tag.label} löschen`}
              >
                <Trash size={16} />
              </button>
            </li>
          ))}

          {canCreateNewTag && !isMaxTagsReached && (
            <li>
              <button
                type="button"
                onClick={handleCreateTag}
                className="w-full px-2 py-1 text-left hover:bg-gray-50"
              >
                <span className="font-medium">Erstellen: </span>
                {normalizedSearchTerm}
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
