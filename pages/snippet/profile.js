import { ArrowLeft, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session) return null;

  const handleSignOut = () => {
    toast.info("You are being signed out...");
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <header className="mb-6">
        <Link
          href="/"
          aria-label="back to previous page"
          className="inline-flex items-center justify-center w-10 h-10 aspect-square rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <section className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Profile</h1>
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center justify-center cursor-pointer w-8 h-8 aspect-square rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            <LogOut size={16} />
          </button>
        </section>
      </header>

      <main>
        <section className="flex flex-col gap-6">
          <div>
            <p className="m4-4 text-sm text-gray-500">Name</p>
            <p>{session.user.name}</p>
          </div>

          <div>
            <p className="m4-4 text-sm text-gray-500">E-Mail</p>
            <p>{session.user.email}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
