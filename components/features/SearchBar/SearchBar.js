import { Search, X } from "lucide-react";

export default function SearchBar({ search, onSearch }) {
  function handleRemoveSearchValue() {
    return onSearch("");
  }
  return (
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
      <button
        onClick={handleRemoveSearchValue}
        type="button"
        className="cursor-pointer"
      >
        <X size={16} />
      </button>
    </div>
  );
}
