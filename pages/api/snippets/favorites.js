import dbConnect from "@/db/connect";
import Snippet from "@/db/models/Snippet";
import "@/db/models/Tag";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import User from "@/db/models/User";

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
      const user = await User.findById(session.user.id).select("favorites");
      const favoriteIds = user?.favorites ?? [];

      const snippets = await Snippet.find({
        _id: { $in: favoriteIds },
        $or: [{ userId: session.user.id }, { isPublic: true }],
      })
        .populate("language")
        .populate("tags")
        .populate("userId", "firstName lastName")
        .sort({ createdAt: -1 });

      response.status(200).json(snippets);
      return;
    } catch (error) {
      console.error(error);

      response.status(500).json({ error: "Error retrieving the favorites." });
      return;
    }
  }

  response.status(405).json({ status: "Method not allowed." });
  return;
}
