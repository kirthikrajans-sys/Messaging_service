import React, { useRef, useEffect } from 'react';
import { MessageInput } from './MessageInput';

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

interface ChatThreadProps {
  contact: Contact;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export function ChatThread({ contact, messages, onSendMessage }: ChatThreadProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 border-b font-medium">{contact.name}</div>
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`p-2 rounded ${msg.direction === 'outbound' ? 'bg-indigo-100 text-right' : 'bg-gray-100 text-left'}`}>
            <div>{msg.body}</div>
            <div className="text-xs text-gray-400">{msg.timestamp}</div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <MessageInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
}
