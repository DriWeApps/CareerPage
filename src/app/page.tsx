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
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-teal-600">Sales & Marketing Executive</h3>
          <p className="text-sm mt-2 text-gray-600">Location: Pune</p>
          <button onClick={() => openForm('Sales & Marketing Executive')} className="mt-4 bg-black text-white px-4 py-2 rounded">
            Apply Now
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-teal-600">Document Verification Specialist</h3>
          <p className="text-sm mt-2 text-gray-600">Location: Pune</p>
          <button onClick={() => openForm('Document Verification Specialist')} className="mt-4 bg-black text-white px-4 py-2 rounded">
            Apply Now
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget as HTMLFormElement);
              const res = await fetch('/api/application', { method: 'POST', body: fd });
              if (res.ok) {
                // show a friendly popup and close
                alert('✅ Application submitted successfully');
                setShowForm(false);
              } else {
                const err = await res.json().catch(() => ({ error: 'Failed' }));
                alert('❌ ' + (err?.error || 'Submission failed'));
              }
            }}
            encType="multipart/form-data"
            className="bg-white p-6 rounded-lg w-full max-w-lg space-y-4"
          >
            <h2 className="text-xl font-semibold">Apply for: {selectedJob}</h2>
            <input type="hidden" name="jobTitle" value={selectedJob} />
            <input name="name" className="border w-full p-2" placeholder="Full Name" required />
            <input name="email" className="border w-full p-2" placeholder="Email" type="email" required />
            <input name="dob" className="border w-full p-2" placeholder="DOB" type="date" />
            <input name="mobileNumber" className="border w-full p-2" placeholder="Mobile Number" />
            <input name="education" className="border w-full p-2" placeholder="Education" />
            <input name="experience" className="border w-full p-2" placeholder="Experience" />
            <textarea name="address" className="border w-full p-2" placeholder="Address"></textarea>
            <input name="resume" type="file" className="border w-full p-2" />
            <div className="flex justify-between">
              <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded">Submit Application</button>
              <button type="button" onClick={closeForm} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
