import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import FormField from "@/components/ui/FormField/FormField";
import { getInputStateClasses } from "@/components/ui/getInputStateClasses/getInputStateClasses";
import { useRequiredFieldsValidation } from "@/hooks/useRequiredFieldsValidation/useRequiredFieldsValidation";

const initialValues = { email: "", password: "" };
const requiredFields = ["email", "password"];
const fieldRules = {
  email: (value) => /^\S+@\S+\.\S+$/.test(value),
};

export default function LoginPage({
  isLoadingSubmit,
  onIsLoadingSubmit,
  errorMessage,
  onSetErrorMessage,
}) {
  const router = useRouter();

  const {
    formValues,
    handleChange,
    handleBlurValidation,
    touchAllFields,
    isFieldInvalid,
    isFormValid,
  } = useRequiredFieldsValidation(initialValues, requiredFields, fieldRules);

  async function handleSubmit(event) {
    event.preventDefault();
    onSetErrorMessage("");
    touchAllFields();

    if (!isFormValid) return;

    onIsLoadingSubmit(true);

    const result = await signIn("credentials", {
      email: formValues.email,
      password: formValues.password,
      redirect: false,
    });

    if (result.error) {
      onSetErrorMessage("Invalid E-Mail or password.");
      onIsLoadingSubmit(false);
      return;
    }

    router.push("/");
  }

  return (
    <main className="mx-auto max-w-md px-4 py-6">
      <h1 className="text-4xl font-bold">DevSnippets</h1>

      <h2 className="mt-24 text-3xl font-bold">Login</h2>
      <p className="mt-2 text-gray-600">
        Please enter your credentials to log in.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-8 flex flex-col gap-6"
      >
        <FormField
          label="E-Mail"
          htmlFor="email"
          error={isFieldInvalid("email") ? "Please enter a valid E-Mail." : ""}
        >
          <input
            id="email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            onBlur={() => handleBlurValidation("email")}
            placeholder="Enter your E-Mail"
            className={`w-full rounded-md border px-4 py-3 ${getInputStateClasses(
              isFieldInvalid("email"),
              false
            )}`}
          />
        </FormField>

        <FormField
          label="Password"
          htmlFor="password"
          error={isFieldInvalid("password") ? "Password is required." : ""}
        >
          <input
            id="password"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            onBlur={() => handleBlurValidation("password")}
            placeholder="Enter your Password"
            className={`w-full rounded-md border px-4 py-3 ${getInputStateClasses(
              isFieldInvalid("password"),
              false
            )}`}
          />
        </FormField>

        {errorMessage && (
          <p role="alert" className="text-red-600">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoadingSubmit}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 rounded-md transition-colors shadow-md disabled:opacity-50"
        >
          {isLoadingSubmit ? "Loading..." : "Login"}
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
