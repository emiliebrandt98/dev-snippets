import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const publicRoutes = ["/login", "/register"];

export default function AuthGuard({ children }) {
  const router = useRouter();
  const { status } = useSession();
  const isPublicRoute = publicRoutes.includes(router.pathname);

  if (status === "unauthenticated" && !isPublicRoute) {
    router.replace("/login");
    return null;
  }

  if (isPublicRoute) {
    return children;
  }

  if (status !== "authenticated") {
    return null;
  }

  return children;
}
