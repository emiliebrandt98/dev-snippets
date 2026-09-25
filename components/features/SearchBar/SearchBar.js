import { Search } from "lucide-react";

export default function SearchBar({ search, onSearch, matchedField = [] }) {
  return (
    <>
      <div className="flex flex-row h-10 w-full items-center gap-2 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 focus-within:ring-1 focus-within:ring-black">
        <Search size={16} className="text-gray-500 shrink-0" />
        <input
          id="search"
          name="search"
          value={search}
          aria-label="searchbar"
          onChange={(event) => onSearch(event.target.value)}
          className="bg-transparent outline-none text-sm w-full"
          placeholder="Search"
        />
      </div>

      {matchedField.length > 0 && (
        <p className="mt-1 text-xs text-gray-400">
          Found in: {matchedField.join(", ")}
        </p>
      )}
    </>
  );
}
