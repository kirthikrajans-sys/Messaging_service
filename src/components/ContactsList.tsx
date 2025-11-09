import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { MessageSquare, Phone } from 'lucide-react';
import { type Contact } from '../lib/mockData';

interface ContactsListProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  onSelectContact: (contact: Contact) => void;
}

export function ContactsList({ contacts, selectedContact, onSelectContact }: ContactsListProps) {
  return (
    <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-gray-900">Contacts</h2>
        <p className="text-sm text-gray-500 mt-1">{contacts.length} conversations</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="divide-y divide-gray-100">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => onSelectContact(contact)}
              className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors text-left ${
                selectedContact?.id === contact.id ? 'bg-indigo-50 hover:bg-indigo-50' : ''
              }`}
            >
              <Avatar className="mt-1">
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                  {contact.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-900 truncate">{contact.name}</span>
                  {contact.unreadCount > 0 && (
                    <Badge variant="default" className="ml-2 bg-indigo-600">
                      {contact.unreadCount}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                  {contact.channel === 'whatsapp' ? (
                    <MessageSquare className="w-3 h-3" />
                  ) : (
                    <Phone className="w-3 h-3" />
                  )}
                  <span className="capitalize">{contact.channel}</span>
                  <span>•</span>
                  <span>{contact.phone}</span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-gray-600 truncate flex-1">{contact.lastMessage}</p>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{contact.lastMessageTime}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
