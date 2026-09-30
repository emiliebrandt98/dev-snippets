import dbConnect from "@/db/connect";
import Snippet from "@/db/models/Snippet";
import "@/db/models/Tag";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { areTagsOwnedByUser } from "@/lib/tags/areTagsOwnedByUser";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);

  if (!session) {
    response.status(401).json({ message: "Not authenticated." });
    return;
  }

  try {
    await dbConnect();
  } catch (error) {
    response.status(500).json({ error: "Database connection failed." });
    return;
  }

  if (request.method === "GET") {
    try {
      const snippets = await Snippet.find({ userId: session.user.id })
        .populate("language")
        .populate("tags")
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

      snippetsData.userId = session.user.id;

      const tagsAreValid = await areTagsOwnedByUser(
        snippetsData.tags || [],
        session.user.id
      );

      if (!tagsAreValid) {
        response.status(400).json({ error: "Invalid tags." });
        return;
      }

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
        userId: session.user.id,
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
