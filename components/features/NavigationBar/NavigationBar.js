import { House, Star, GlobeCode, CodeXml, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

const navigationsItems = [
  { href: "/", label: "Home", Icon: House },
  { href: "/public", label: "Public", Icon: GlobeCode },
  { href: "/favorites", label: "Favorites", Icon: Star },
  { href: "/profile", label: "Profile", Icon: User },
];

export default function NavigationBar() {
  const router = useRouter();
  return (
    <nav
      className="
  fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center bg-white border-t border-gray-200 
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
            className={`flex flex-col items-center gap-2 w-full h-full py-3 px-3 text-xs  ${
              isActive ? "bg-purple-100 text-purple-600" : "text-gray-600"
            }`}
          >
            <Icon size={24} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
