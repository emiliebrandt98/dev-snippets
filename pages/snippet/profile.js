import { LogOut } from "lucide-react";

export default function ProfilePage() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold">DevSnippets</h1>
        <button type="button">
          <LogOut size={16} />
        </button>
      </header>
      <main>
        <section className="flex flex-col mb-4 gap-2">Profile Page</section>
      </main>
    </div>
  );
}
