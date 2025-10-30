'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) router.push('/login');
  }, [router]);

  const openForm = (job: string) => {
    setSelectedJob(job);
    setShowForm(true);
  };
  const closeForm = () => setShowForm(false);

  return (
    <>
      {/* Custom Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-yellow-200 via-yellow-100 to-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            <span className="text-black">Dri</span>
            <span className="text-purple-600">WE</span>
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen bg-neutral-950 text-gray-100 p-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-white-400">Available Jobs</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Card 1 */}
            <div className="bg-zinc-900 p-6 rounded-lg shadow hover:shadow-lg hover:bg-zinc-800 transition">
              <h3 className="text-xl font-semibold text-white-400">Sales & Marketing Executive</h3>
              <p><strong>Education:</strong> MBA / BBA</p>
              <p><strong>Description:</strong> Develop and maintain client relationships while executing effective marketing campaigns.</p>
              <p className="flex items-center gap-1 text-sm mt-3 text-white-400">
                <strong>Location:</strong> <span>Pune</span>
              </p>
              <button
                onClick={() => openForm('Sales & Marketing Executive')}
                className="mt-4 bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded transition"
              >
                Apply Now
              </button>
            </div>

            {/* Job Card 2 */}
            <div className="bg-zinc-900 p-6 rounded-lg shadow hover:shadow-lg hover:bg-zinc-800 transition">
              <h3 className="text-xl font-semibold text-white-400">Document Verification Specialist</h3>
              <p><strong>Education:</strong> 12th Pass or Any Graduation</p>
              <p><strong>Description:</strong> Responsible for verifying and validating documents.</p>
              <p className="flex items-center gap-1 text-sm mt-3 text-white-400">
                <strong>Location:</strong> <span>Pune</span>
              </p>
              <button
                onClick={() => openForm('Document Verification Specialist')}
                className="mt-4 bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded transition"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>

        {/* Application Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget as HTMLFormElement);
                const res = await fetch('/api/application', { method: 'POST', body: fd });
                if (res.ok) {
                  alert('Application submitted successfully');
                  setShowForm(false);
                } else {
                  const err = await res.json().catch(() => ({ error: 'Failed' }));
                  alert('Submission failed: ' + (err?.error || 'Unknown error'));
                }
              }}
              encType="multipart/form-data"
              className="bg-zinc-900 p-6 rounded-lg w-full max-w-lg space-y-4 shadow-xl border border-zinc-800"
            >
              <h2 className="text-xl font-semibold text-teal-400">Apply for: {selectedJob}</h2>
              <input type="hidden" name="jobTitle" value={selectedJob} />

              <input name="name" className="border border-zinc-700 bg-zinc-950 w-full p-2 rounded text-gray-100" placeholder="Full Name" required />
              <input name="email" className="border border-zinc-700 bg-zinc-950 w-full p-2 rounded text-gray-100" placeholder="Email" type="email" required />
              <input name="dob" className="border border-zinc-700 bg-zinc-950 w-full p-2 rounded text-gray-100" placeholder="DOB" type="date" />
              <input name="mobileNumber" className="border border-zinc-700 bg-zinc-950 w-full p-2 rounded text-gray-100" placeholder="Mobile Number" />
              <input name="education" className="border border-zinc-700 bg-zinc-950 w-full p-2 rounded text-gray-100" placeholder="Education" />
              <input name="experience" className="border border-zinc-700 bg-zinc-950 w-full p-2 rounded text-gray-100" placeholder="Experience" />
              <textarea name="address" className="border border-zinc-700 bg-zinc-950 w-full p-2 rounded text-gray-100" placeholder="Address"></textarea>
              <input name="resume" type="file" className="border border-zinc-700 bg-zinc-950 w-full p-2 rounded text-gray-100" />

              <div className="flex justify-between pt-2">
                <button type="submit" className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded transition">
                  Submit Application
                </button>
                <button type="button" onClick={closeForm} className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded transition">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </>
  );
}