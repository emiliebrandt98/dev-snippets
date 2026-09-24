import { House, Star, GlobeCode, Plus, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

const navigationsItems = [
  { href: "/", label: "Home", Icon: House },
  { href: "/snippet/public", label: "Public", Icon: GlobeCode },
  { href: "/snippet/create-snippet", label: "Create", Icon: Plus },
  { href: "/snippet/favorites", label: "Favorites", Icon: Star },
  { href: "/snippet/profile", label: "Profile", Icon: User },
];

export default function NavigationBar() {
  const router = useRouter();
  return (
    <nav
      className="
  fixed bottom-4 left-4 right-4 z-10 p-1.5 flex justify-around items-center bg-white rounded-full drop-shadow-xl border-gray-200 
  md:sticky md:top-0 md:border-t-0 md:border-b
"
    >
      {navigationsItems.map(({ href, label, Icon }) => {
        const isActive = router.pathname === href;

        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            className={`flex flex-col justify-center items-center rounded-full gap-2 w-20 h-16 py-2 px-2 text-xs  ${
              isActive ? "bg-purple-100 text-purple-600" : "text-gray-600"
            }`}
          >
            <Icon size={24} />
          </Link>
        );
      })}
    </nav>
  );
}
