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

  const { id } = request.query;

  try {
    if (request.method === "GET") {
      const snippet = await Snippet.findOne({
        _id: id,
        userId: session.user.id,
      })
        .populate("language")
        .populate("tags");

      if (!snippet) {
        response.status(404).json({ status: "Snippet not found." });
        return;
      }

      response.status(200).json(snippet);
      return;
    }

    if (request.method === "PUT") {
      const snippetData = request.body;

      snippetData.userId = session.user.id;

      const tagsAreValid = await areTagsOwnedByUser(
        snippetData.tags || [],
        session.user.id
      );

      if (!tagsAreValid) {
        response.status(400).json({ error: "Invalid tags." });
        return;
      }

      const snippet = await Snippet.findOneAndUpdate(
        { _id: id, userId: session.user.id },
        snippetData,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!snippet) {
        response.status(404).json({ status: "Error editing Snippet." });
        return;
      }

      response.status(200).json(snippet);
      return;
    }

    if (request.method === "PATCH") {
      const { isPublic } = request.body;

      if (typeof isPublic !== "boolean") {
        response.status(400).json({ error: "isPublic must be true or false." });
        return;
      }

      const snippet = await snippet.findOneAndUpdate(
        { _id: id, userId: session.user.id },
        { isPublic: isPublic },
        { new: true }
      );

      if (!snippet) {
        response.status(404).json({ status: "Snippet not found." });
        return;
      }

      response.status(200).json(snippet);
      return;
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      response.status(400).json({ error: error.message });
      return;
    }
    response.status(500).json({ status: "Internal Server Error." });
    return;
  }

  response.status(405).json({ status: "Method not allowed." });
  return;
}
