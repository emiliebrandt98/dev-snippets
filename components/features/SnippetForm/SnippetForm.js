import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

export default function SnippetForm({ onSubmit }) {
  const { data: languages } = useSWR("/api/language");
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  async function handleSubmitSnippet(event) {
    event.preventDefault();

    setIsLoadingSubmit(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    await onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmitSnippet} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="titel" className="text-sm font-medium text-gray-700">
          Titel
        </label>
        <input
          type="text"
          id="titel"
          name="titel"
          placeholder="e.g Flexbox"
          required
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <div className="flex flex-col gap-1">
          <label
            htmlFor="codeSnippet"
            className="text-sm font-medium text-gray-700"
          >
            Code
          </label>

          <select
            id="language"
            name="code"
            defaultValue=""
            required
            className="border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="" disabled>
              Select a language
            </option>

            {languages?.map((language) => {
              return (
                <option key={language._id} value={language.name}>
                  {language.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <textarea
            id="codeSnippet"
            name="code"
            rows={8}
            placeholder="Code snippet"
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black font-mono text-sm"
          />
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
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
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
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
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
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <button
          type="submit"
          disabled={isLoadingSubmit}
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
