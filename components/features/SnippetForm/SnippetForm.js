import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

export default function SnippetForm({ onSubmit }) {
  const { data: languages } = useSWR("/api/language");
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [touchedValidation, setTouchedValidation] = useState({
    title: false,
    language: false,
    code: false,
  });
  const [formValues, setFormValues] = useState({
    title: "",
    language: "",
    code: "",
  });

  function handleBlurValidation(field) {
    setTouchedValidation((prev) => ({ ...prev, [field]: true }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  const isTitleInvalid =
    touchedValidation.title && formValues.title.trim() === "";
  const isLanguageInvalid =
    touchedValidation.language && formValues.language === "";
  const isCodeInvalid = touchedValidation.code && formValues.code.trim() === "";

  const isFormVaild =
    formValues.title.trim() !== "" &&
    formValues.language !== "" &&
    formValues.code.trim() !== "";

  async function handleSubmitSnippet(event) {
    event.preventDefault();

    setTouchedValidation({ title: true, language: true, code: true });
    if (!isFormVaild) {
      return;
    }

    setIsLoadingSubmit(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    await onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmitSnippet} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium text-gray-700">
          Title (required)
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="e.g Flexbox"
          required
          onChange={handleChange}
          onBlur={() => handleBlurValidation("title")}
          className={`border rounded-md p-2 focus:outline-none focus:ring-1 ${
            isTitleInvalid
              ? "border-red-500 bg-red-50"
              : touchedValidation.title && formValues.title !== ""
                ? "border-green-600 bg-green-50"
                : "border-gray-300"
          }`}
        />
        {isTitleInvalid && (
          <p className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
            <span>⚠️</span> Please enter a title.
          </p>
        )}

        <div className="flex flex-col gap-1">
          <label
            htmlFor="codeSnippet"
            className="text-sm font-medium text-gray-700"
          >
            Code (required)
          </label>

          <select
            id="language"
            name="language"
            defaultValue=""
            required
            onChange={handleChange}
            onBlur={() => handleBlurValidation("language")}
            className={`border rounded-md p-2 bg-white focus:outline-none focus:ring-1 focus:ring-black ${
              isLanguageInvalid
                ? "border-red-500 bg-red-50"
                : touchedValidation.language && formValues.language !== ""
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

          {isLanguageInvalid && (
            <p className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
              <span>⚠️</span> Please select a language.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <textarea
            id="codeSnippet"
            name="code"
            rows={8}
            placeholder="Code snippet"
            required
            onChange={handleChange}
            onBlur={() => handleBlurValidation("code")}
            className={`border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-black font-mono text-sm${
              isCodeInvalid
                ? "border-red-500 bg-red-50"
                : touchedValidation.code && formValues.code !== ""
                  ? "border-green-600 bg-green-50"
                  : "border-gray-300"
            }`}
          />

          {isCodeInvalid && (
            <p className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
              <span>⚠️</span> Please enter a code snippet.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="notes" className="text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={8}
            placeholder="I use thin snippets ..."
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="installCommand"
            className="text-sm font-medium text-gray-700"
          >
            Install Command
          </label>
          <input
            type="text"
            id="installCommand"
            name="installCommand"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="link" className="text-sm font-medium text-gray-700">
            Link
          </label>
          <input
            type="url"
            id="link"
            name="link"
            placeholder="https://..."
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <button
          type="submit"
          disabled={isLoadingSubmit || !isFormVaild}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 rounded-md transition-colors shadow-md disabled:opacity-50"
        >
          {isLoadingSubmit ? "Creating..." : "Create Snippet"}
        </button>
        <Link href="/" className="w-full">
          <button
            type="button"
            className="w-full border border-gray-300 hover:bg-gray-100 font-medium py-2 rounded-md transition-colors text-gray-700"
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
}
