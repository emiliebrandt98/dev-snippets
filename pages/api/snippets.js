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

  response.status(405).json({ status: "Method not allowed." });
  return;
}
