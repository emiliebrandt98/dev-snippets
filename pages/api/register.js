import bcrypt from "bcryptjs";
import dbConnect from "@/db/connect";
import User from "@/db/models/User";

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

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

      if (
        typeof email !== "string" ||
        typeof password !== "string" ||
        typeof firstName !== "string" ||
        typeof lastName !== "string"
      ) {
        response.status(400).json({ message: "All fields are mandatory." });
        return;
      }

      const cleanEmail = email.trim().toLowerCase();
      const cleanFirstName = firstName.trim();
      const cleanLastName = lastName.trim();

      if (!cleanEmail || !password || !cleanFirstName || !cleanLastName) {
        response.status(400).json({ message: "All fields are mandatory." });
        return;
      }

      if (!EMAIL_PATTERN.test(cleanEmail)) {
        response.status(400).json({ message: "Please enter a valid E-Mail." });
        return;
      }

      if (password.length < 8 || password.length > 72) {
        response
          .status(400)
          .json({ message: "Password must be between 8 and 72 characters." });
        return;
      }

      if (cleanFirstName.length > 50 || cleanLastName.length > 50) {
        response
          .status(400)
          .json({ message: "Names must not be longer than 50 characters." });
        return;
      }

      const existingUser = await User.findOne({ email: cleanEmail });
      if (existingUser) {
        response
          .status(409)
          .json({ message: "This E-Mail is already registered." });
        return;
      }

      const passwordHash = await bcrypt.hash(password, 10);
      await User.create({
        email: cleanEmail,
        passwordHash: passwordHash,
        firstName: cleanFirstName,
        lastName: cleanLastName,
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
