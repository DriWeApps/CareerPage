'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget as HTMLFormElement);

    const res = await fetch("/api/register", {
      method: "POST",
      body: form
    });

    setLoading(false);

    if (res.ok) {
      alert("✅ Registration Successful!");
      router.push("/login");
    } else {
      alert("❌ Registration Failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Create Account ✨</h2>

        <form className="space-y-5" onSubmit={handleRegister}>
          <div>
            <label className="text-sm font-medium">Name</label>
            <input type="text" name="name" required className="mt-1 w-full p-2 border rounded-lg" />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input type="email" name="email" required className="mt-1 w-full p-2 border rounded-lg" />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input type="password" name="password" required className="mt-1 w-full p-2 border rounded-lg" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 hover:underline font-medium">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
