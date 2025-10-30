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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 px-4">
      <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-md border border-gray-700 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Create Account ✨
        </h2>

        <form className="space-y-5" onSubmit={handleRegister}>
          <div>
            <label className="text-sm font-medium text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              required
              className="mt-1 w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-100 placeholder-gray-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-100 placeholder-gray-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              required
              className="mt-1 w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-100 placeholder-gray-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg font-medium transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-5">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-purple-400 hover:underline font-medium"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
