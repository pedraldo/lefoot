import LoginForm from "@/components/auth/login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<p>Chargement de la page de connexion ...</p>}>
      <LoginForm />
    </Suspense>
  );
}
