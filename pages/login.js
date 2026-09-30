import LoginRegisterForm from "@/components/features/LoginRegisterForm/LoginRegisterForm";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

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

  async function handleLoginSubmit(formValues) {
    onSetErrorMessage("");
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
    onIsLoadingSubmit(false);
  }
  return (
    <LoginRegisterForm
      initialValues={initialValues}
      requiredFields={requiredFields}
      fieldRules={fieldRules}
      isLoadingSubmit={isLoadingSubmit}
      errorMessage={errorMessage}
      onSubmit={handleLoginSubmit}
    />
  );
}
