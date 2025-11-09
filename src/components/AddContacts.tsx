import React, { useState } from 'react';

export function AddContact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email }),
    });
    if (res.ok) {
      alert('Contact added!');
      setName('');
      setPhone('');
      setEmail('');
    } else {
      alert('Failed to add contact');
    }
  };

  return (
    <form onSubmit={handleAddContact} className="space-y-4 p-4 border-b">
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required className="block border rounded p-2 w-full" />
      </div>
      <div>
        <label>Phone:</label>
        <input type="text" value={phone} onChange={e => setPhone(e.target.value)} required className="block border rounded p-2 w-full" />
      </div>
      <div>
        <label>Email (optional):</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="block border rounded p-2 w-full" />
      </div>
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Add Contact</button>
    </form>
  );
}
