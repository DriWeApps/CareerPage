"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔒 Check if admin is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userEmail = localStorage.getItem("userEmail");

    // ✅ Only allow admin
    if (!isLoggedIn || userEmail !== "admin@gmail.com") {
      router.push("/login");
    } else {
      fetchApplications();
    }
  }, [router]);

  // ✅ Fetch applications
  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/application");
      if (!res.ok) throw new Error("Failed to fetch applications");
      const data = await res.json();
      setApplications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-yellow-50">
      {/* HEADER */}
      <header className="w-full py-4 px-8 flex justify-between items-center border-b bg-yellow-100 shadow-sm">
        <h1
          className="text-3xl font-bold cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          <span className="text-black">Dri</span>
          <span className="text-purple-600">WE</span>
        </h1>

        <button
          onClick={logout}
          className="bg-purple-600 text-white px-4 py-1.5 rounded-lg hover:bg-purple-700 transition"
        >
          Logout
        </button>
      </header>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto mt-10 bg-white p-8 shadow-xl rounded-xl border">
        <h2 className="text-2xl font-semibold mb-6">Received Applications</h2>

        {applications.length === 0 ? (
          <p className="text-gray-500 text-center">No applications yet.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-yellow-100 text-left">
                <th className="border p-3">ID</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">Job Title</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Resume</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((item) => (
                <tr key={item.id} className="hover:bg-yellow-50 transition">
                  <td className="border p-3">{item.id}</td>
                  <td className="border p-3">{item.name}</td>
                  <td className="border p-3">{item.jobTitle}</td>
                  <td className="border p-3">{item.email}</td>
                  <td className="border p-3">
                    <a
                      href={item.resumeUrl}
                      className="text-purple-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
