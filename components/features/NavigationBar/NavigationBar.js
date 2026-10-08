import { House, Star, GlobeCode, Plus, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

const navigationsItems = [
  { href: "/", label: "Home", Icon: House },
  { href: "/snippet/public", label: "Discovery", Icon: GlobeCode },
  { href: "/snippet/create-snippet", label: "Create", Icon: Plus },
  { href: "/snippet/favorites", label: "Favorites", Icon: Star },
  { href: "/snippet/profile", label: "Profile", Icon: User },
];

export default function NavigationBar() {
  const router = useRouter();
  return (
    <nav
      className="fixed bottom-4 left-4 right-4 z-10 p-1.5 flex justify-around items-center rounded-full border-2 border-gray-100 dark:border-gray-600 shadow-xl shadow-gray-200/30 dark:shadow-purple-800/10 bg-white dark:bg-gray-700
      lg:top-0 lg:bottom-0 lg:left-0 lg:right-auto lg:w-64 lg:flex-col lg:items-stretch lg:justify-start lg:gap-2 lg:p-4 lg:rounded-none lg:border-0 lg:shadow-none"
    >
      <p className="hidden lg:block px-4 pt-8 pb-6 text-3xl font-bold text-gray-900 dark:text-white">
        DevSnippets
      </p>
      {navigationsItems.map(({ href, label, Icon }, index) => {
        const isActive = router.pathname === href;
        const isLast = index === navigationsItems.length - 1;

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            aria-label={label}
            className={`flex flex-col justify-center items-center rounded-full gap-2 w-20 h-16 py-2 px-2 text-xs
          lg:flex-row lg:justify-start lg:w-full lg:h-12 lg:gap-3 lg:rounded-xl lg:px-4 lg:text-sm ${
            isLast ? "lg:mt-auto" : ""
          } ${
            isActive
              ? "bg-purple-400/40 text-purple-700 dark:bg-purple-600/40 dark:text-purple-300 hover:bg-purple-500 hover:text-purple-100 dark:hover:bg-purple-600"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-200/40 dark:hover:bg-gray-500/40"
          }`}
          >
            <Icon size={24} />
            <span className="sr-only lg:not-sr-only">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
