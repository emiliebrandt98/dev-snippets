import { useRouter } from "next/router";
import Link from "next/link";
import FormField from "@/components/ui/FormField/FormField";
import { getInputStateClasses } from "@/components/ui/getInputStateClasses/getInputStateClasses";
import { useRequiredFieldsValidation } from "@/hooks/useRequiredFieldsValidation/useRequiredFieldsValidation";

const initialValues = { firstName: "", lastName: "", email: "", password: "" };
const requiredFields = ["firstName", "lastName", "email", "password"];
const fieldRules = {
  email: (value) => /^\S+@\S+\.\S+$/.test(value),
  password: (value) => value.length >= 8,
};

export default function RegisterPage({
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
    isFieldValid,
    isFormValid,
  } = useRequiredFieldsValidation(initialValues, requiredFields, fieldRules);

  async function handleSubmit(event) {
    event.preventDefault();
    (onSetErrorMessage(""), touchAllFields());

    if (!isFormValid) return;

    onIsLoadingSubmit(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      const data = await response.json();

      if (!response.ok) {
        (onSetErrorMessage(
          data.message || data.error || "Registration failed."
        ),
          onIsLoadingSubmit(false));
        return;
      }

      const result = await signIn("credentials", {
        email: formValues.email,
        password: formValues.password,
        redirect: false,
      });

      if (result.error) {
        router.push("/login");
        return;
      }

      router.push("/");
    } catch (error) {
      onSetErrorMessage("Something went wrong. Please try again.");
      onIsLoadingSubmit(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-6">
      <h1 className="text-4xl font-bold">DevSnippets</h1>

      <h2 className="mt-24 text-3xl font-bold">Register</h2>
      <p className="mt-2 text-gray-600">
        Please enter your credentials to create an account.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-8 flex flex-col gap-6"
      >
        <FormField
          label="First Name"
          htmlFor="firstName"
          error={isFieldInvalid("firstName") ? "First name is required." : ""}
        >
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formValues.firstName}
            onChange={handleChange}
            onBlur={() => handleBlurValidation("firstName")}
            placeholder="e.g. Max"
            className={`w-full rounded-md border px-4 py-3 ${getInputStateClasses(
              isFieldInvalid("firstName"),
              isFieldValid("firstName")
            )}`}
          />
        </FormField>

        <FormField
          label="Last Name"
          htmlFor="lastName"
          error={isFieldInvalid("lastName") ? "Last name is required." : ""}
        >
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formValues.lastName}
            onChange={handleChange}
            onBlur={() => handleBlurValidation("lastName")}
            placeholder="e.g. Meier"
            className={`w-full rounded-md border px-4 py-3 ${getInputStateClasses(
              isFieldInvalid("lastName"),
              isFieldValid("lastName")
            )}`}
          />
        </FormField>

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
              isFieldValid("email")
            )}`}
          />
        </FormField>

        <FormField
          label="Password"
          htmlFor="password"
          error={
            isFieldInvalid("password")
              ? "Password must be at least 8 characters."
              : ""
          }
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
              isFieldValid("password")
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
          className="w-full rounded-md bg-gray-600 py-2 font-medium text-white shadow-md transition-colors hover:bg-gray-700 disabled:opacity-50"
        >
          {isLoadingSubmit ? "Loading..." : "Register"}
        </button>
      </form>

      <p className="mt-6 text-center">
        You already have an Account?{" "}
        <Link href="/login" className="underline">
          Log in
        </Link>
      </p>
    </main>
  );
}
