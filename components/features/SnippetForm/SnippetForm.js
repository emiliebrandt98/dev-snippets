import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
import FormField from "@/components/ui/FormField/FormField";
import { getInputStateClasses } from "@/components/ui/getInputStateClasses/getInputStateClasses";
import { useRequiredFieldsValidation } from "@/hooks/useRequiredFieldsValidation/useRequiredFieldsValidation";

const requiredFields = ["title", "language", "code"];

export default function SnippetForm({
  onSubmit,
  isEditing,
  snippetId,
  snippets,
}) {
  const { data: languages } = useSWR("/api/language");
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const currentSnippet = snippets?.find((snippet) => snippet._id === snippetId);

  const {
    formValues,
    setFormValues,
    handleChange,
    handleBlurValidation,
    touchAllFields,
    isFieldInvalid,
    isFieldValid,
    isFormVaild,
  } = useRequiredFieldsValidation(
    {
      title: "",
      language: "",
      code: "",
      notes: "",
      installCommand: "",
      link: "",
    },
    requiredFields
  );

  useEffect(() => {
    if (isEditing && currentSnippet) {
      setFormValues({
        title: currentSnippet.title ?? "",
        language: currentSnippet.language?._id ?? "",
        code: currentSnippet.code ?? "",
        notes: currentSnippet.notes ?? "",
        installCommand: currentSnippet.installCommand ?? "",
        link: currentSnippet.link ?? "",
      });
    }
  }, [isEditing, currentSnippet, setFormValues]);

  async function handleSubmitSnippet(event) {
    event.preventDefault();

    touchAllFields();

    if (!isFormVaild) {
      return;
    }

    setIsLoadingSubmit(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

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
          className={`border rounded-md p-2 focus:outline-none focus:ring-1 ${getInputStateClasses(
            isFieldInvalid("title"),
            isFieldValid("title")
          )}`}
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
          className={`border rounded-md p-2 bg-white focus:outline-none focus:ring-1 focus:ring-black ${getInputStateClasses(
            isFieldInvalid("language"),
            isFieldValid("language")
          )}`}
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
          className={`border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-black font-mono text-sm ${getInputStateClasses(
            isFieldInvalid("code"),
            isFieldValid("code")
          )}`}
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
          disabled={isLoadingSubmit || !isFormVaild}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 rounded-md transition-colors shadow-md disabled:opacity-50"
        >
          {isLoadingSubmit
            ? "Loading..."
            : isEditing
              ? "Save changes"
              : "Create Snippet"}
        </button>
        <Link
          href={isEditing ? `/snippet/${snippetId}` : "/"}
          className="flex justify-center align-center w-full border border-gray-300 hover:bg-gray-100 font-medium py-2 rounded-md transition-colors text-gray-700"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
