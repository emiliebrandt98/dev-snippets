import FormField from "@/components/ui/FormField/FormField";
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
    <main className="max-w-2xl mx-auto mt-24 p-4">
      <h1 className="text-4xl font-bold">
        {isRegister ? "Register" : "Login"}
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
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
              label="First Name (required)"
              htmlFor="firstName"
              errorId="firstName-error"
              error={
                isFieldInvalid("firstName") ? "First name is required." : ""
              }
            >
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formValues.firstName}
                aria-invalid={isFieldInvalid("firstName")}
                aria-describedby={
                  isFieldInvalid("firstName") ? "firstName-error" : undefined
                }
                onChange={handleChange}
                onBlur={() => handleBlurValidation("firstName")}
                placeholder="e.g. Max"
                className={`input ${
                  isFieldInvalid("firstName")
                    ? "border-red-500 bg-red-50 dark:bg-red-500/20"
                    : isFieldValid("firstName")
                      ? "border-green-600 bg-green-50 dark:bg-green-600/20"
                      : "border-gray-300"
                }`}
              />
            </FormField>

            <FormField
              label="Last Name (required)"
              htmlFor="lastName"
              errorId="lastName-error"
              error={isFieldInvalid("lastName") ? "Last name is required." : ""}
            >
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formValues.lastName}
                aria-invalid={isFieldInvalid("title")}
                aria-describedby={
                  isFieldInvalid("lastName") ? "lastName-error" : undefined
                }
                onChange={handleChange}
                onBlur={() => handleBlurValidation("lastName")}
                placeholder="Meier"
                className={`input ${
                  isFieldInvalid("lastName")
                    ? "border-red-500 bg-red-50 dark:bg-red-500/20"
                    : isFieldValid("lastName")
                      ? "border-green-600 bg-green-50 dark:bg-green-600/20"
                      : "border-gray-300"
                }`}
              />
            </FormField>
          </>
        ) : null}

        <FormField
          label="E-Mail (required)"
          htmlFor="email"
          errorId="email-error"
          error={isFieldInvalid("email") ? "Please enter a valid E-Mail." : ""}
        >
          <input
            type="email"
            id="email"
            name="email"
            placeholder="e.g. max.meier@gmx.com"
            required
            value={formValues.email}
            aria-invalid={isFieldInvalid("email")}
            aria-describedby={
              isFieldInvalid("email") ? "email-error" : undefined
            }
            onChange={handleChange}
            onBlur={() => handleBlurValidation("email")}
            className={`input ${
              isFieldInvalid("email")
                ? "border-red-500 bg-red-50 dark:bg-red-500/20"
                : isFieldValid("email")
                  ? "border-green-600 bg-green-50 dark:bg-green-600/20"
                  : "border-gray-300"
            }`}
          />
        </FormField>

        <FormField
          label="Password (required)"
          htmlFor="password"
          errorId="password-error"
          error={isFieldInvalid("password") ? passwordError : ""}
        >
          {isRegister && (
            <p className="text-gray-500 text-sm mb-2">
              Your password must be at least 8 characters long.
            </p>
          )}
          <input
            type="password"
            id="password"
            name="password"
            placeholder="········"
            value={formValues.password}
            aria-invalid={isFieldInvalid("password")}
            aria-describedby={
              isFieldInvalid("password") ? "password-error" : undefined
            }
            onChange={handleChange}
            onBlur={() => handleBlurValidation("password")}
            className={`input placeholder:text-xl placeholder: font-bold ${
              isFieldInvalid("password")
                ? "border-red-500 bg-red-50 dark:bg-red-500/20"
                : isFieldValid("password")
                  ? "border-green-600 bg-green-50 dark:bg-green-600/20"
                  : "border-gray-300"
            }`}
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
          className="button button-primary"
        >
          {isLoadingSubmit ? "Loading..." : isRegister ? "Register" : "Login"}
        </button>
      </form>

      {isRegister ? (
        <p className="mt-6 text-center text-gray-500 dark:text-gray-400">
          You already have an Account?{" "}
          <Link
            href="/login"
            className="underline text-gray-500 dark:text-gray-400"
          >
            Log in
          </Link>
        </p>
      ) : (
        <p className="mt-6 text-center text-gray-500 dark:text-gray-400">
          You don&apos;t have an Account?{" "}
          <Link
            href="/register"
            className="underline text-gray-500 dark:text-gray-400"
          >
            Register
          </Link>
        </p>
      )}
    </main>
  );
}
