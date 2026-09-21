import dbConnect from "@/db/connect";
import Language from "@/db/models/Language";

export default async function handler(request, response) {
  try {
    await dbConnect();
  } catch (error) {
    response.status(500).json({ error: "Database connection failed." });
    return;
  }

  if (request.method === "GET") {
    try {
      const languages = await Language.find();
      response.status(200).json(languages);
    } catch (error) {
      response.status(500).json({ error: "Error retrieving the languages." });
      return;
    }
  }
}
