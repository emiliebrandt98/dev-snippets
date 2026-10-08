import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useState } from "react";
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal/DeleteConfirmationModal";
import Statistics from "@/components/ui/Statistics/Statistics";
import DarkLightMode from "@/components/features/DarkLightMode/DarkLightMode";

export default function ProfilePage({
  snippets = [],
  favoriteSnippets,
  mode,
  onToggleColorMode,
}) {
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
      toast.error("Error deleting account.");
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
    <div className="max-w-2xl mx-auto p-4 text-gray-900 dark:text-white">
      <header className="mb-6">
        <section className="flex justify-end">
          <button
            type="button"
            onClick={handleSignOut}
            className="button-icon button-icon-primary"
          >
            <LogOut size={16} />
          </button>
        </section>
      </header>

      <main className="flex flex-col gap-8">
        <Statistics snippets={snippets} favoriteSnippets={favoriteSnippets} />

        <section className="flex flex-col gap-6">
          <div>
            <p className="mb-1 text-sm text-gray-600 dark:text-gray-300">
              Name
            </p>
            <p className="font-medium">{session.user.name}</p>
          </div>

          <div>
            <p className="mb-1 text-sm text-gray-600 dark:text-gray-300">
              E-Mail
            </p>
            <p className="font-medium">{session.user.email}</p>
          </div>
        </section>

        <hr className="border-gray-200 dark:border-gray-700" />

        <section>
          <h2 className="text-xl font-bold">Apperance</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Choose a design for DevSnippets.{" "}
          </p>
          <DarkLightMode onToggleColorMode={onToggleColorMode} mode={mode} />
        </section>

        <hr className="border-gray-200 dark:border-gray-700" />

        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Danger Zone</h2>

            <div className="flex flex-col gap-1">
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-pretty">
                Permanently delete the account, including all snippets.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="button button-delete"
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
            <p className="text-pretty">
              <strong>Are you sure you want to delete your account?</strong>
              <br />
              This action is irreversible and will delete all your data,
              including your snippets.
            </p>
          </DeleteConfirmationModal>
        )}
      </main>
    </div>
  );
}
