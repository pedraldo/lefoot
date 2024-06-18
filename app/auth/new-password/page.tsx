import NewPasswordForm from "@/components/auth/new-password-form";
import { Suspense } from "react";

const NewPasswordPage = () => {
  return (
    <Suspense fallback={null}>
      <NewPasswordForm />
    </Suspense>
  );
};

export default NewPasswordPage;
