import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-Mail", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        await dbConnect();

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          return null;
        }

        const passwordIsValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );
        if (!passwordIsValid) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.firstName + " " + user.lastName,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
};

export default NextAuth(authOptions);
