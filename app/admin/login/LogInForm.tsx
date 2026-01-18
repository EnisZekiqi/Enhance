"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2,EyeClosed,Eye  } from "lucide-react";
export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPw,setShowPw]=useState(false)
  const isFormFilled = email.trim() !== "" && password.trim() !== "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isFormFilled || loading) return;

    setLoading(true);
    setError("");

   const res = await fetch("/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
  credentials: "include", // crucial
});

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid email or password");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full">
      
      {/* LEFT IMAGE */}
      <div className="hidden lg:block w-1/2 p-4">
        <img
          src="https://images.unsplash.com/photo-1481253127861-534498168948?w=800"
          alt="Building"
          className="h-full w-full object-cover rounded-xl"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-[#000]">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6 p-8"
        >
          <div>
            <h1 className="text-2xl font-semibold text-white">Admin Login</h1>
            <p className="text-sm text-white/50">
              Administrator access only
            </p>
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-400/10 p-2 rounded">
              {error}
            </p>
          )}

          <div className="space-y-2">
            <label className="text-sm text-white/60">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-lg border border-[#343434] bg-transparent p-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/60">Password</label>
            <div className="relative w-full">
              <input
                type={showPw ? 'text':'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-lg border border-[#343434] bg-transparent p-2 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />

              <button
                type="button"
                onClick={()=>setShowPw(prev => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showPw ? <Eye/>:<EyeClosed />}
              </button>
            </div>

          </div>

          <button
          type="submit"
            disabled={!isFormFilled || loading}
            className="w-full rounded-lg bg-yellow-300 text-center cursor-pointer py-2 font-medium text-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ?  
            <span className="flex items-center justify-center gap-1">
          <Loader2 size={18} className="animate-spin" />
          Logging in...
        </span>
        : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
