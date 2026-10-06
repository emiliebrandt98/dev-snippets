import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import FilterSection from "../FilterSection/FilterSection";

export default function FilterSnippetList({
  onActiveFilterItems,
  activeFilterItems,
  openFilter,
  onOpenFilter,
  draftFilterItems,
  ondraftFilterItems,
  languageItems,
  tagItems,
  yearItems,
  isLoadingLanguages,
  isLoadingTags,
  errorLanguages,
  errorTags,
}) {
  const filterDialogRef = useRef(null);

  useEffect(() => {
    if (!filterDialogRef.current) return;
    if (openFilter) {
      filterDialogRef.current.showModal();
    } else {
      filterDialogRef.current.close();
    }
  }, [openFilter]);

  function handleCancelFilter() {
    ondraftFilterItems(activeFilterItems);
    onOpenFilter(false);
  }

  function handleApplyFilter() {
    onActiveFilterItems(draftFilterItems);
    onOpenFilter(false);
  }

  function handleToggleItem(category, id) {
    const selectedIds = draftFilterItems[category];
    let newSelectedIds;

    if (selectedIds.includes(id)) {
      newSelectedIds = selectedIds.filter((selectedId) => selectedId !== id);
    } else {
      newSelectedIds = [...selectedIds, id];
    }

    ondraftFilterItems({ ...draftFilterItems, [category]: newSelectedIds });
  }

  function handleClearCategory(category) {
    ondraftFilterItems({ ...draftFilterItems, [category]: [] });
  }

  return (
    <dialog
      ref={filterDialogRef}
      onClose={() => onOpenFilter(false)}
      className="m-0 mt-auto w-full max-w-full rounded-t-3xl p-6 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white backdrop:bg-black/40"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Filter</h2>
        <button
          type="button"
          aria-label="Close dialog"
          onClick={handleCancelFilter}
          className="button-icon button-icon-primary"
        >
          <X />
        </button>
      </div>

      <FilterSection
        title="Language"
        items={languageItems}
        selectedIds={draftFilterItems?.languages}
        isLoading={isLoadingLanguages}
        error={errorLanguages}
        onToggle={(id) => handleToggleItem("languages", id)}
        onClear={() => handleClearCategory("languages")}
      />
      <FilterSection
        title="Tags"
        items={tagItems}
        selectedIds={draftFilterItems?.tags}
        isLoading={isLoadingTags}
        error={errorTags}
        onToggle={(id) => handleToggleItem("tags", id)}
        onClear={() => handleClearCategory("tags")}
      />
      <FilterSection
        title="Year"
        items={yearItems}
        selectedIds={draftFilterItems?.years}
        isLoading={false}
        error={null}
        onToggle={(id) => handleToggleItem("years", id)}
        onClear={() => handleClearCategory("years")}
      />

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={handleApplyFilter}
          className="button button-primary"
        >
          Apply
        </button>
        <button
          type="button"
          onClick={handleCancelFilter}
          className="button button-secondary"
        >
          Cancel
        </button>
      </div>
    </dialog>
  );
}
