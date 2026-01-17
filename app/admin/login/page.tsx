import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "./LogInForm";

export default async function LoginPage() {
  const cookieStore = await cookies(); 
 const auth = cookieStore.get("auth");

if (auth?.value === "true") {
  redirect("/admin/dashboard");
}
  return (
    <main>
      <LoginForm />
    </main>
  );
}
