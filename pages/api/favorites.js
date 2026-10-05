import mongoose from "mongoose";
import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import Snippet from "@/db/models/Snippet";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

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

  const userId = session.user.id;

  if (request.method === "GET") {
    try {
      const user = await User.findById(userId);
      response.status(200).json({ favoriteIds: user?.favorites ?? [] });
      return;
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Error retrieving favorites." });
      return;
    }
  }

  if (request.method === "POST") {
    try {
      const { snippetId } = request.body;

      if (!mongoose.isValidObjectId(snippetId)) {
        response.status(400).json({ error: "Invalid snippet id." });
        return;
      }

      const snippet = await Snippet.findOne({
        _id: snippetId,
        $or: [{ userId: userId }, { isPublic: true }],
      });

      if (!snippet) {
        response.status(404).json({ error: "Snippet not found." });
        return;
      }

      await User.findByIdAndUpdate(userId, {
        $addToSet: { favorites: snippetId },
      });

      response.status(200).json({ message: "Favorite added." });
      return;
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Error adding favorite." });
      return;
    }
  }

  if (request.method === "DELETE") {
    try {
      const { snippetId } = request.body;

      if (!mongoose.isValidObjectId(snippetId)) {
        response.status(400).json({ error: "Invalid snippet id." });
        return;
      }

      await User.findByIdAndUpdate(userId, {
        $pull: { favorites: snippetId },
      });

      response.status(200).json({ message: "Favorite removed." });
      return;
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Error removing favorite." });
      return;
    }
  }

  response.status(405).json({ status: "Method not allowed." });
}
