import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import Snippet from "@/db/models/Snippet";

export default async function handler(request, response) {
  try {
    await dbConnect();
  } catch (error) {
    response.status(401).json({ message: "Not authorized." });
    return;
  }

  if (request.method === "DELETE") {
    try {
      const session = await getServerSession(request, response, authOptions);

      if (!session) {
        response.status(401).json({ message: "Not authorized." });
        return;
      }

      const userId = session.user.id;
      const userEmail = session.user.email;

      await Snippet.deleteMany({ userId: userId });

      const deletedUser = await User.findOneAndDelete({ email: userEmail });

      if (!deletedUser) {
        response.status(404).json({ message: "User not found." });
        return;
      }

      response.status(200).json({ message: "Account successfully deleted." });
      return;
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.Message });
      return;
    }
  }

  response.status(405).json({ status: "Method not allowed." });
  return;
}
