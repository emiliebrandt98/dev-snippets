import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

export default function SnippetForm({ snippets, onSubmit }) {
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
    <form onSubmit={handleSubmitSnippet}>
      <fieldset>
        <legend>Basic information</legend>

        <label htmlFor="titel">Titel</label>
        <input
          type="text"
          id="titel"
          name="titel"
          placeholder="e.g Flexbox"
          required
        />

        <label htmlFor="language">Language</label>
        <select id="language" name="code" defaultValue="" required>
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

        <label htmlFor="codeSnippet">Code</label>
        <textarea
          id="codeSnippet"
          name="code"
          rows={8}
          placeholder="Code snippet"
          required
        />
      </fieldset>

      <fieldset>
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          rows={8}
          placeholder="I use thin snippets ..."
        />

        <label htmlFor="installCommand">Install Command</label>
        <input type="text" id="installCommand" name="installCommand" />

        <label htmlFor="link">Link</label>
        <input type="url" id="link" name="link" placeholder="https://..." />
      </fieldset>

      <fieldset>
        <button type="submit" disabled={isLoadingSubmit}>
          {isLoadingSubmit ? "Creating..." : "Create Snippet"}
        </button>
        <Link href="/">
          <button type="button">Cancel</button>
        </Link>
      </fieldset>
    </form>
  );
}
