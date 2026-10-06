import Link from "next/link";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import FormField from "@/components/ui/FormField/FormField";
import { useRequiredFieldsValidation } from "@/hooks/useRequiredFieldsValidation/useRequiredFieldsValidation";
import MultiSelect from "../MultiSelect/MultiSelect";
import { toast } from "react-toastify";
import { ChevronDown } from "lucide-react";

const requiredFields = ["title", "language", "code"];

export default function SnippetForm({
  onSubmit,
  isEditing,
  snippetId,
  initialValues,
}) {
  const { data: languages } = useSWR("/api/language");
  const { data: tags, mutate: mutateTags } = useSWR("/api/tag");
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [isCreatingTag, setIsCreatingTag] = useState(false);
  const [deletingTagId, setDeletingTagId] = useState(null);

  const {
    formValues,
    setFormValues,
    handleChange,
    handleBlurValidation,
    touchAllFields,
    isFieldInvalid,
    isFieldValid,
    isFormValid,
  } = useRequiredFieldsValidation(
    initialValues || {
      title: "",
      language: "",
      code: "",
      notes: "",
      installCommand: "",
      link: "",
      tagsIds: [],
    },
    requiredFields,
    { title: (value) => value && value.trim().length >= 3 }
  );

  async function handleCreateTag(label) {
    setIsCreatingTag(true);

    try {
      const response = await fetch("/api/tag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label }),
      });

      if (!response.ok) {
        toast.error("Error creating tag.");
        return;
      }

      const createdTag = await response.json();
      await mutateTags();
      setFormValues((prev) => ({
        ...prev,
        tagIds: [...(prev.tagIds ?? []), createdTag._id],
      }));
    } catch (error) {
      console.error(error);
      toast.error("Error creating tag.");
    } finally {
      setIsCreatingTag(false);
    }
  }

  async function handleDeleteTag(tagId) {
    setDeletingTagId(tagId);
    try {
      const response = await fetch("/api/tag", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tagIds: [tagId] }),
      });

      if (!response.ok) {
        toast.error("Error deleting tag.");
        return;
      }

      await mutateTags();
      await mutate(
        (key) => typeof key === "string" && key.startsWith("/api/snippets")
      );
      setFormValues((prev) => ({
        ...prev,
        tagIds: (prev.tagIds ?? []).filter((id) => id !== tagId),
      }));
    } catch (error) {
      console.error(error);
      toast.error("Error deleting tag.");
    } finally {
      setDeletingTagId(null);
    }
  }

  async function handleSubmitSnippet(event) {
    event.preventDefault();
    touchAllFields();

    if (!isFormValid) return;

    setIsLoadingSubmit(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    data.tags = formValues.tagIds ?? [];

    try {
      await onSubmit(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingSubmit(false);
    }
  }

  return (
    <form onSubmit={handleSubmitSnippet} className="flex flex-col gap-10">
      <fieldset className="flex flex-col gap-4">
        <legend className="font-medium mb-2">The essentials</legend>

        <FormField
          label="Title (required)"
          htmlFor="title"
          errorId="title-error"
          error={
            isFieldInvalid("title") &&
            "Please enter a title with a min length of 3 characters.."
          }
        >
          <input
            type="text"
            id="title"
            name="title"
            placeholder="e.g Flexbox"
            required
            minLength={3}
            aria-invalid={isFieldInvalid("title")}
            aria-describedby={
              isFieldInvalid("title") ? "title-error" : undefined
            }
            value={formValues.title}
            onChange={handleChange}
            onBlur={() => handleBlurValidation("title")}
            className={`input ${
              isFieldInvalid("title")
                ? "border-red-500 bg-red-50 dark:bg-red-500/20"
                : isFieldValid("title")
                  ? "border-green-600 bg-green-50 dark:bg-green-600/20"
                  : "border-gray-300"
            }`}
          />
        </FormField>

        <FormField
          label="Language (required)"
          htmlFor="language"
          errorId="language-error"
          error={isFieldInvalid("language") && "Please select a language."}
        >
          <div className="relative">
            <select
              id="language"
              name="language"
              value={formValues.language}
              required
              aria-invalid={isFieldInvalid("language")}
              aria-describedby={
                isFieldInvalid("language") ? "language-error" : undefined
              }
              onChange={handleChange}
              onBlur={() => handleBlurValidation("language")}
              className={`input w-full appearance-none pr-10 ${formValues.language === "" ? "text-gray-400 dark:text-gray-500" : "text-gray-900 dark:text-white"} ${
                isFieldInvalid("language")
                  ? "border-red-500 bg-red-50 dark:bg-red-500/20"
                  : isFieldValid("language")
                    ? "border-green-600 bg-green-50 dark:bg-green-600/20"
                    : "border-gray-300"
              }`}
            >
              <option value="" disabled>
                Please select a language
              </option>

              {languages?.map((language) => {
                return (
                  <option key={language._id} value={language._id}>
                    {language.name}
                  </option>
                );
              })}
            </select>

            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500 dark:text-gray-400">
              <ChevronDown size={16} />
            </div>
          </div>
        </FormField>

        <FormField
          label="Code (required)"
          htmlFor="codeSnippet"
          errorId="code-error"
          error={
            isFieldInvalid("code") && "Add some code to save your snippet."
          }
        >
          <textarea
            id="codeSnippet"
            name="code"
            rows={8}
            placeholder="e.g. const total = 0;"
            required
            aria-invalid={isFieldInvalid("code")}
            aria-describedby={isFieldInvalid("code") ? "code-error" : undefined}
            value={formValues.code}
            onChange={handleChange}
            onBlur={() => handleBlurValidation("code")}
            className={`input ${
              isFieldInvalid("code")
                ? "border-red-500 bg-red-50 dark:bg-red-500/20"
                : isFieldValid("code")
                  ? "border-green-600 bg-green-50 dark:bg-green-600/20"
                  : "border-gray-300"
            } `}
          />
        </FormField>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className="font-medium mb-2">Add context</legend>

        <FormField label="Notes (optional)" htmlFor="notes">
          <textarea
            id="notes"
            name="notes"
            rows={8}
            value={formValues.notes}
            onChange={handleChange}
            placeholder="e.g. Use this to debounce a search input."
            className="input"
          />
        </FormField>

        <FormField label="Tags (optional)" htmlFor="tags">
          <MultiSelect
            availableTags={
              tags?.map((tag) => ({ id: tag._id, label: tag.label })) ?? []
            }
            selectedTagIds={formValues.tagIds ?? []}
            onSelectionChange={(newIds) =>
              setFormValues((prev) => ({ ...prev, tagIds: newIds }))
            }
            onCreateTag={handleCreateTag}
            onDeleteTag={handleDeleteTag}
            isCreatingTag={isCreatingTag}
            deletingTagId={deletingTagId}
            maxTags={4}
          />
        </FormField>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className="font-medium mb-2">Related resources</legend>

        <FormField label="Install Command (optional)" htmlFor="installCommand">
          <input
            type="text"
            id="installCommand"
            name="installCommand"
            value={formValues.installCommand}
            onChange={handleChange}
            placeholder="e.g. npm install lodash"
            className="input"
          />
        </FormField>

        <FormField label="Link to docs or source (optional)" htmlFor="link">
          <input
            type="url"
            id="link"
            name="link"
            value={formValues.link}
            onChange={handleChange}
            placeholder="https://..."
            className="input"
          />
        </FormField>
      </fieldset>

      <div className="flex flex-col gap-3 mt-4">
        {!isFormValid && !isEditing && (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Add a title, language, and code to continue.
          </p>
        )}

        <button
          type="submit"
          disabled={isLoadingSubmit || !isFormValid}
          className="button button-primary"
        >
          {isLoadingSubmit
            ? "Loading..."
            : isEditing
              ? "Save changes"
              : "Create snippet"}
        </button>

        <Link
          href={isEditing ? `/snippet/${snippetId}` : "/"}
          className="button button-secondary"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
