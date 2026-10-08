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
  fixed max-w-2xl mx-auto bottom-4 left-4 right-4 z-10 p-1.5 flex justify-around items-center rounded-full border-2 border-gray-100 dark:border-gray-600 shadow-xl shadow-gray-200/30 dark:shadow-purple-800/10 bg-white dark:bg-gray-700"
    >
      {navigationsItems.map(({ href, label, Icon }) => {
        const isActive = router.pathname === href;

        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            className={`flex flex-col justify-center items-center rounded-full gap-2 w-20 h-16 py-2 px-2 text-xs  ${
              isActive
                ? "bg-purple-400/40 text-purple-700 dark:bg-purple-600/40 dark:text-purple-300 hover:bg-purple-400 dark:hover:bg-purple-600"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-200/40 dark:hover:bg-gray-500/40"
            }`}
          >
            <Icon size={24} />
          </Link>
        );
      })}
    </nav>
  );
}
