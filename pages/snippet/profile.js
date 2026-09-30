import { ArrowLeft, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useSession } from "next-auth/react";
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal/DeleteConfirmationModal";
import { useState } from "react";

export default function ProfilePage() {
  const { data: session } = useSession();

  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (!session) return null;

  async function handleDeleteAccountConfirm() {
    setIsDeletingAccount(true);
    try {
      const response = await fetch("/api/user", { method: "DELETE" });

      if (!response.ok) throw new Error("Failed to delete account");

      await signOut({ callbackUrl: "/login" });
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeletingAccount(false);
      setIsDeleteModalOpen(false);
    }
  }

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

      <main className="flex flex-col gap-8">
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

        <hr className="text-gray-300" />

        <section className="flex flex-col items-start gap-4">
          <h2 className="text-xl font-bold">Danger Zone</h2>

          <div className="flex flex-col gap-1">
            <p>Delete Account</p>
            <p className="text-sm text-gray-500">
              Permanently delete the account, including all snippets.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="px-4 rounded-md py-2 font-medium border border-red-500 bg-red-50 hover:bg-red-500 hover:text-white"
          >
            Delete Account
          </button>
        </section>

        {isDeleteModalOpen && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDeleteAccountConfirm}
            isDeleting={isDeletingAccount}
            title="Delete Account"
          >
            <p>
              Are you sure you want to delete your account? This action is
              irreversible and will delete all your data, including your
              snippets.
            </p>
          </DeleteConfirmationModal>
        )}
      </main>
    </div>
  );
}
