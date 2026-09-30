import FormField from "@/components/ui/FormField/FormField";
import { getInputStateClasses } from "@/components/ui/getInputStateClasses/getInputStateClasses";
import { useRequiredFieldsValidation } from "@/hooks/useRequiredFieldsValidation/useRequiredFieldsValidation";
import Link from "next/link";

export default function LoginRegisterForm({
  initialValues,
  requiredFields,
  fieldRules,
  isRegister = false,
  isLoadingSubmit,
  errorMessage,
  onSubmit,
}) {
  const {
    formValues,
    handleChange,
    handleBlurValidation,
    touchAllFields,
    isFieldInvalid,
    isFieldValid,
    isFormValid,
  } = useRequiredFieldsValidation(initialValues, requiredFields, fieldRules);

  const passwordError = isRegister
    ? "Password must be at least 8 characters."
    : "Password is required.";

  async function handleSubmit(event) {
    event.preventDefault();
    touchAllFields();

    if (!isFormValid) return;

    await onSubmit(formValues);
  }

  return (
    <main className="mx-auto max-w-md px-4 py-6">
      <h1 className="text-4xl font-bold">DevSnippets</h1>
      <h2 className="mt-24 text-3xl font-bold">
        {isRegister ? "Register" : "Login"}
      </h2>
      <p className="mt-2 text-gray-600">
        {isRegister
          ? "Please enter your credentials to create an account."
          : "Please enter your credentials to log in."}
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-8 flex flex-col gap-6"
      >
        {isRegister ? (
          <>
            <FormField
              label="First Name"
              htmlFor="firstName"
              error={
                isFieldInvalid("firstName") ? "First name is required." : ""
              }
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
          </>
        ) : null}

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
              isRegister && isFieldValid("email")
            )}`}
          />
        </FormField>

        <FormField
          label="Password"
          htmlFor="password"
          error={isFieldInvalid("password") ? passwordError : ""}
        >
          {isRegister && (
            <p className="text-gray-500 text-sm">
              Your password must be at least 8 characters long.
            </p>
          )}
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
              isRegister && isFieldValid("password")
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
          {isLoadingSubmit ? "Loading..." : isRegister ? "Register" : "Login"}
        </button>
      </form>

      {isRegister ? (
        <p className="mt-6 text-center">
          You already have an Account?{" "}
          <Link href="/login" className="underline">
            Log in
          </Link>
        </p>
      ) : (
        <p className="mt-6 text-center">
          You don&apos;t have an Account?{" "}
          <Link href="/register" className="underline">
            Register
          </Link>
        </p>
      )}
    </main>
  );
}
