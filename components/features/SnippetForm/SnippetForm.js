import Link from "next/link";
import useSWR from "swr";

export default function SnippetForm({ snippets }) {
  const { data: languages, error, isLoading } = useSWR("/api/language");

  return (
    <form>
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

        <label htmlFor="code">Language</label>
        <select id="code" name="code" defaultValue="" required>
          <option value="" disabled>
            Select a language
          </option>

          {isLoading && <option disabled>Loading languages...</option>}
          {error && <option disabled>Failed to load languages</option>}

          {languages?.map((language) => {
            return (
              <option key={language._id} value={language.name}>
                {language.name}
              </option>
            );
          })}
        </select>

        <label htmlFor="code">Code</label>
        <textarea
          id="code"
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
        <button type="submit">Create Snippet</button>
        <Link href="/">
          <button type="button">Cancel</button>
        </Link>
      </fieldset>
    </form>
  );
}
