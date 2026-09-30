import LoginRegisterForm from "@/components/features/LoginRegisterForm/LoginRegisterForm";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

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

  async function handleRegisterSubmit(formValues) {
    onSetErrorMessage("");
    onIsLoadingSubmit(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      const data = await response.json();

      if (!response.ok) {
        onSetErrorMessage(data.message || data.error || "Registration failed.");
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

      router.push("/login");
    } catch (error) {
      console.error(error);
      onSetErrorMessage("Something went wrong. Please try again.");
    } finally {
      onIsLoadingSubmit(false);
    }
  }

  return (
    <LoginRegisterForm
      initialValues={initialValues}
      requiredFields={requiredFields}
      fieldRules={fieldRules}
      isRegister
      isLoadingSubmit={isLoadingSubmit}
      errorMessage={errorMessage}
      onSubmit={handleRegisterSubmit}
    />
  );
}
