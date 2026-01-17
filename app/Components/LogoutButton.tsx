import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import { useTransition } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      router.replace("/admin/login");
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer p-2 rounded-lg rounded-lg bg-white text-black
        disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {isPending ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          Logging out...
        </>
      ) : (
        <>
          <LogOut size={18} />
          Log out
        </>
      )}
    </button>
  );
}
