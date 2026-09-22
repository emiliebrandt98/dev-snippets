import dbConnect from "@/db/connect";
import Snippet from "@/db/models/Snippet";

export default async function handler(request, response) {
  try {
    await dbConnect();
  } catch (error) {
    response.status(500).json({ error: "Database connection failed." });
    return;
  }

  const { id } = request.query;

  try {
    if (request.method === "GET") {
      const snippet = await Snippet.findById(id).populate("language");

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
