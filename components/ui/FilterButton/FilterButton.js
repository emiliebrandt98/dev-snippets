import { Filter, X } from "lucide-react";

export default function FilterButton({
  onHandleOpenFilter,
  activeFilterCount,
  onClearFilter,
}) {
  return (
    <div className="flex flex-row items-center justify-end py-2 gap-2">
      <div className="flex items-center justify-end gap-2 relative">
        <button
          type="button"
          onClick={onHandleOpenFilter}
          className="button-icon button-icon-primary"
        >
          <Filter size={16} />
        </button>

        {activeFilterCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-gray-50 border border-gray-400 text-gray-900 inline-flex items-center justify-center cursor-pointer w-5 h-5 aspect-square rounded-full transition-colors text-sm">
            {activeFilterCount}
          </span>
        )}
      </div>

      {activeFilterCount > 0 ? (
        <button
          type="button"
          onClick={onClearFilter}
          className="button-icon button-icon-primary"
        >
          <X size={16} />
        </button>
      ) : null}
    </div>
  );
}
