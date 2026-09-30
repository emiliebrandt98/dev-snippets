import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const handleSignOut = () => {
    toast.info("You are being signed out...");
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold">DevSnippets</h1>
        <button type="button" onClick={handleSignOut}>
          <LogOut size={16} />
        </button>
      </header>
      <main>
        <section className="flex flex-col mb-4 gap-2">Profile Page</section>
      </main>
    </div>
  );
}
