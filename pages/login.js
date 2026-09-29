import FormField from "@/components/ui/FormField/FormField";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (result.error) {
      setErrorMessage("Invalid E-Mail or password.");
      return;
    }

    router.pus("/");
  }

  return (
    <main className="mx-auto max-w-md px-4 py-6">
      <h1 className="text-4xl font-bold">DevSnippets</h1>

      <h2 className="mt-24 text-3xl font-bold">Login</h2>
      <p className="mt-2 text-gray-600">
        Please enter your credentials to log in.
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        <FormField>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your E-Mail"
            className="mb-6 mt-3 w-full rounded-md border border-gray-600 px-4 py-3"
          />
        </FormField>
        <FormField>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Enter your Password"
            className="mb-6 mt-3 w-full rounded-md border border-gray-600 px-4 py-3"
          />
        </FormField>

        {errorMessage && (
          <p role="alert" className="mb-4 text-red-600">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-md bg-gray-600 py-3 text-xl font-semibold text-white"
        >
          Login
        </button>
      </form>

      <p className="mt-6 text-center">
        You don&apos;t have an Account?{" "}
        <Link href="/register" className="underline">
          Register
        </Link>
      </p>
    </main>
  );
}
