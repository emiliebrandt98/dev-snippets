import bcrypt from "bcryptjs";
import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export default async function handler(request, response) {
  try {
    await dbConnect();
  } catch (error) {
    response.status(500).json({ error: "Database connection failed." });
    return;
  }

  if (request.method === "POST") {
    try {
      const { email, password, firstName, lastName } = request.body;

      if (!email || !password || !firstName || !lastName) {
        response.status(400).json({ message: "All fields are mandatory." });
        return;
      }

      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        response
          .status(409)
          .json({ message: "This E-Mail is already registered." });
        return;
      }

      const passwordHash = await bcrypt.hash(password, 10);
      await User.create({
        email: email,
        passwordHash: passwordHash,
        firstName: firstName,
        lastName: lastName,
      });

      response.status(201).json({ message: "Registration successful." });
      return;
    } catch (error) {
      console.error(error);

      response.status(500).json({ error: "Error creating a user." });
      return;
    }
  }

  response.status(405).json({ status: "Method not allowed." });
  return;
}
