import LoginForm from "@/components/auth/login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<p>Login not working</p>}>
      <LoginForm />
    </Suspense>
  );
}
