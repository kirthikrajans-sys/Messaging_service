import React, { useEffect, useState } from 'react';
import { ContactsList } from './ContactsList';
import { ChatThread } from './ChatThread';
import { Header } from './Header';

interface Contact {
  id: number;
  name: string;
  phone: string;
  email?: string;
}
interface Message {
  id: string;
  contact_id: number;
  body: string;
  direction: 'inbound' | 'outbound';
  timestamp: string;
}

interface InboxLayoutProps {
  onLogout: () => void;
}

export function InboxLayout({ onLogout }: InboxLayoutProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/contacts')
      .then(res => res.json())
      .then(data => {
        setContacts(data);
        if (data.length && !selectedContact) setSelectedContact(data[0]);
      });
  }, [selectedContact]);

  // Load messages for selected contact
  useEffect(() => {
    if (!selectedContact) return;
    fetch(`http://localhost:3001/messages/${selectedContact.id}`)
      .then(res => res.json())
      .then(setMessages);
  }, [selectedContact]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName, phone: newPhone, email: newEmail }),
    });
    if (res.ok) {
      const updated = await fetch('http://localhost:3001/contacts').then(r => r.json());
      setContacts(updated);
      setNewName('');
      setNewPhone('');
      setNewEmail('');
    } else {
      alert('Failed to add contact');
    }
  };

  // Handle sending a chat message
  const handleSendMessage = async (content: string) => {
    if (!selectedContact) return;
    await fetch('http://localhost:3001/send-sms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: selectedContact.phone, body: content, contactId: selectedContact.id }),
    });
    // reload messages after sending
    fetch(`http://localhost:3001/messages/${selectedContact.id}`)
      .then(res => res.json())
      .then(setMessages);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onLogout={onLogout} onToggleProfile={() => {}} showProfile={true} />
      <div className="flex flex-row flex-1">
        <div className="w-80 border-r">
          {/* Add Contact Section */}
          <form onSubmit={handleSubmit} className="p-4 border-b space-y-2">
            <div>
              <input
                type="text"
                placeholder="Name"
                value={newName}
                required
                onChange={e => setNewName(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Phone"
                value={newPhone}
                required
                onChange={e => setNewPhone(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email (optional)"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded w-full">Add Contact</button>
          </form>
          <ContactsList
            contacts={contacts}
            selectedContact={selectedContact}
            onSelectContact={setSelectedContact}
          />
        </div>
        <div className="flex-1">
          {selectedContact && (
            <ChatThread
              contact={selectedContact}
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
