import Link from "next/link";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import FormField from "@/components/ui/FormField/FormField";
import { useRequiredFieldsValidation } from "@/hooks/useRequiredFieldsValidation/useRequiredFieldsValidation";
import MultiSelect from "../MultiSelect/MultiSelect";
import { toast } from "react-toastify";

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
    requiredFields
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
    <form onSubmit={handleSubmitSnippet} className="flex flex-col gap-4">
      <FormField
        label="Title (required)"
        htmlFor="title"
        error={isFieldInvalid("title") && "Please enter a title."}
      >
        <input
          type="text"
          id="title"
          name="title"
          placeholder="e.g Flexbox"
          required
          value={formValues.title}
          onChange={handleChange}
          onBlur={() => handleBlurValidation("title")}
          className={`border rounded-md p-2 focus:outline-none focus:ring-1 ${
            isFieldInvalid("title")
              ? "border-red-500 bg-red-50"
              : isFieldValid("title")
                ? "border-green-600 bg-green-50"
                : "border-gray-300"
          }`}
        />
      </FormField>

      <FormField
        label="Language (required)"
        htmlFor="language"
        error={isFieldInvalid("language") && "Please select a language."}
      >
        <select
          id="language"
          name="language"
          value={formValues.language}
          required
          onChange={handleChange}
          onBlur={() => handleBlurValidation("language")}
          className={`border rounded-md p-2 focus:outline-none focus:ring-1 ${
            isFieldInvalid("language")
              ? "border-red-500 bg-red-50"
              : isFieldValid("language")
                ? "border-green-600 bg-green-50"
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
      </FormField>

      <FormField
        label="Code (required)"
        htmlFor="codeSnippet"
        error={isFieldInvalid("code") && "Please enter a code snippet."}
      >
        <textarea
          id="codeSnippet"
          name="code"
          rows={8}
          placeholder="e.g const ..."
          required
          value={formValues.code}
          onChange={handleChange}
          onBlur={() => handleBlurValidation("code")}
          className={`border rounded-md p-2 focus:outline-none focus:ring-1 ${
            isFieldInvalid("code")
              ? "border-red-500 bg-red-50"
              : isFieldValid("code")
                ? "border-green-600 bg-green-50"
                : "border-gray-300"
          } `}
        />
      </FormField>

      <FormField label="Notes" htmlFor="notes">
        <textarea
          id="notes"
          name="notes"
          rows={8}
          value={formValues.notes}
          onChange={handleChange}
          placeholder="I use this snippets ..."
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-black"
        />
      </FormField>

      <FormField label="Tags" htmlFor="tags">
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

      <FormField label="Install Command" htmlFor="installCommand">
        <input
          type="text"
          id="installCommand"
          name="installCommand"
          value={formValues.installCommand}
          onChange={handleChange}
          placeholder="npm install ..."
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-black"
        />
      </FormField>

      <FormField label="Link" htmlFor="link">
        <input
          type="url"
          id="link"
          name="link"
          value={formValues.link}
          onChange={handleChange}
          placeholder="https://..."
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-black"
        />
      </FormField>

      <div className="flex flex-col gap-3 mt-4">
        <button
          type="submit"
          disabled={isLoadingSubmit || !isFormValid}
          className="button button-primary"
        >
          {isLoadingSubmit
            ? "Loading..."
            : isEditing
              ? "Save changes"
              : "Create Snippet"}
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
