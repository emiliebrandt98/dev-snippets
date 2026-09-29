import NextAuth from "next-auth";

export const authOptions = {
  providers: [],
  session: { strategy: "jwt" },
};

export default NextAuth(authOptions);
