import { House, Star, GlobeCode, CodeXml, User } from "lucide-react";
import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav className="flex">
      <Link href="/" aria-label="Home">
        <House size={16} />
        <span>Home</span>
      </Link>
      <Link href="/" aria-label="Code Groups">
        <CodeXml size={16} />
        <span>Code Groups</span>
      </Link>
      <Link href="/" aria-label="Public">
        <GlobeCode size={16} />
        <span>Public</span>
      </Link>
      <Link href="/" aria-label="Favorite">
        <Star size={16} />
        <span>Favorite</span>
      </Link>
      <Link href="/" aria-label="Profil">
        <User size={16} />
        <span>Profil</span>
      </Link>
    </nav>
  );
}
