import { Search, X } from "lucide-react";

export default function SearchBar({ search, onSearch }) {
  function handleRemoveSearchValue() {
    return onSearch("");
  }
  return (
    <div className="button-icon bg-gray-100 border border-gray-300 dark:bg-gray-800 dark:border-gray-700 px-3 w-full rounded-full gap-2 cursor-auto">
      <Search size={16} className="shrink-0" />
      <input
        id="search"
        name="search"
        value={search}
        aria-label="searchbar"
        onChange={(event) => onSearch(event.target.value)}
        className="bg-transparent outline-none text-sm w-full"
        placeholder="Search"
      />
      {search.length > 0 ? (
        <button
          onClick={handleRemoveSearchValue}
          type="button"
          className="cursor-pointer"
        >
          <X size={16} />
        </button>
      ) : null}
    </div>
  );
}
