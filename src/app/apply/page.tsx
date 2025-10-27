
'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Apply({ searchParams }: { searchParams?: { job?: string } }) {
  const router = useRouter();
  const [message, setMessage] = useState('');
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!loggedIn) router.push('/login?redirect=/apply');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    try {
      const res = await fetch('/api/application', { method: 'POST', body: fd });
      if (res.ok) {
        setMessage('Submitted');
        setTimeout(() => router.push('/'), 1000);
      } else {
        const data = await res.json();
        setMessage(data?.error || 'Failed');
      }
    } catch (err) {
      setMessage('Error');
    }
  };

  return (
    <div style={{padding:20}}>
      <h2>Apply for {decodeURIComponent(searchParams?.job || '')}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="jobTitle" defaultValue={decodeURIComponent(searchParams?.job || '')} hidden />
        <div><label>Name <input name="name" required/></label></div>
        <div><label>Email <input name="email" type="email" required/></label></div>
        <div><label>DOB <input name="dob" type="date" required/></label></div>
        <div><label>Mobile <input name="mobileNumber" required/></label></div>
        <div><label>Education <input name="education" required/></label></div>
        <div><label>Experience <input name="experience" /></label></div>
        <div><label>Address <textarea name="address" required/></label></div>
        <div><label>Resume <input name="resume" type="file" /></label></div>
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
