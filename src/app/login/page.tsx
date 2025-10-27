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
    // You might be using "username" or "email" field — we expect "email"
    const email = fd.get('email')?.toString() || '';
    const password = fd.get('password')?.toString() || '';

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        // successful login
        localStorage.setItem('isLoggedIn', 'true');
        router.push('/'); // go to home page (src/app/page.tsx)
      } else {
        if (msg.current) msg.current.textContent = data?.error || 'Login failed';
      }
    } catch (err) {
      if (msg.current) msg.current.textContent = 'Server error';
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input name="email" type="email" required className="mt-1 w-full p-2 border rounded-lg" />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input name="password" type="password" required className="mt-1 w-full p-2 border rounded-lg" />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p ref={msg} className="text-center text-sm text-red-600 mt-4"></p>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account? <a href="/register" className="text-blue-600 hover:underline">Create one</a>
        </p>
      </div>
    </div>
  );
}
