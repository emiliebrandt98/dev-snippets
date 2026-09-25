import dbConnect from "@/db/connect";
import Tag from "@/db/models/Tag";

export default async function handler(request, response) {
  try {
    await dbConnect();
  } catch (error) {
    response.status(500).json({ error: "Database connection failed." });
    return;
  }

  if (request.method === "GET") {
    try {
      const tags = await Tag.find().sort({ createdAt: -1 });
      response.status(200).json(tags);
      return;
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Error retrieving the tags." });
      return;
    }
  }

  if (request.method === "POST") {
    try {
      const tagsData = request.body;
      const newTag = await Tag.create(tagsData);

      response.status(201).json(newTag);
      return;
    } catch (error) {
      console.error(error);

      if (error.name === "ValidationError") {
        response.status(400).json({ error: error.message });
        return;
      }
      response.status(500).json({ error: "Error creating a tag." });
      return;
    }
  }

  if (request.method === "DELETE") {
    try {
      const { tagIds } = request.body;

      const deletedTag = await Tag.findByIdAndDelete(tagIds);
      response.status(200).json(deletedTag);
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
