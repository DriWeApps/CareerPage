'use client';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const msg = useRef<HTMLParagraphElement>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const email = fd.get('email')?.toString() || '';
    const password = fd.get('password')?.toString() || '';

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      // ✅ Admin direct login check (bypasses API auth)
      if (email === 'admin@gmail.com' && password === 'admin@123') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        router.push('/dashboard');
        return;
      }

      // ✅ Normal user login (if API validates)
      if (res.ok && data.success) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        router.push('/');
        return;
      }

      // ❌ Invalid credentials
      if (msg.current) msg.current.textContent = data?.error || 'Invalid login';
    } catch (err) {
      console.error(err);
      if (msg.current) msg.current.textContent = 'Server error';
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 px-4">
      <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-md border border-gray-700 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-300">Email</label>
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-100 placeholder-gray-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-300">Password</label>
            <input
              name="password"
              type="password"
              required
              className="mt-1 w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-100 placeholder-gray-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <p ref={msg} className="text-center text-sm text-red-500 mt-4"></p>
        <p className="text-center text-sm text-gray-400 mt-4">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-400 hover:underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
