import dbConnect from "@/db/connect";
import Snippet from "@/db/models/Snippet";

export default async function handler(request, response) {
  try {
    await dbConnect();
  } catch (error) {
    response.status(500).json({ error: "Database connection failed." });
    return;
  }

  if (request.method === "GET") {
    try {
      const snippets = await Snippet.find()
        .populate("language")
        .sort({ createdAt: -1 });
      response.status(200).json(snippets);
      return;
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Error retrieving the snippets." });
      return;
    }
  }

  if (request.method === "POST") {
    try {
      const snippetsData = request.body;

      //Dummy-User
      snippetsData.userId = "60c72b2f9b1d8b2d88f12345";

      const newSnippet = await Snippet.create(snippetsData);

      response.status(201).json(newSnippet);
      return;
    } catch (error) {
      console.error(error);

      if (error.name === "ValidationError") {
        response.status(400).json({ error: error.message });
        return;
      }
      response.status(500).json({ error: "Error creating a snippet." });
      return;
    }
  }

  if (request.method === "DELETE") {
    try {
      const { snippetIds } = request.body;

      if (
        !snippetIds ||
        !Array.isArray(snippetIds) ||
        snippetIds.length === 0
      ) {
        response.status(400).json({ error: "No snippet ids provided." });
        return;
      }

      const deletedSnippet = await Snippet.deleteMany({
        _id: { $in: snippetIds },
      });

      response.status(200).json(deletedSnippet);
      return;
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
      return;
    }
  }

  response.status(405).json({ status: "Method not allowed." });
  return;
}
