import { useState } from 'react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { MessageSquare, Phone, StickyNote, Plus, Trash2 } from 'lucide-react';
import { type Contact, type Note } from '../lib/mockData';

interface ContactProfileProps {
  contact: Contact;
  notes: Note[];
  onAddNote: (content: string) => void;
  onDeleteNote: (noteId: string) => void;
}

export function ContactProfile({ contact, notes, onAddNote, onDeleteNote }: ContactProfileProps) {
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(newNote.trim());
      setNewNote('');
      setIsAddingNote(false);
    }
  };

  return (
    <div className="w-80 border-l border-gray-200 bg-white flex flex-col">
      <ScrollArea className="flex-1">
        {/* Contact Info */}
        <div className="p-6 text-center">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl">
              {contact.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-gray-900 mb-1">{contact.name}</h2>
          <p className="text-sm text-gray-500 mb-4">{contact.phone}</p>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm">
            {contact.channel === 'whatsapp' ? (
              <MessageSquare className="w-4 h-4 text-gray-600" />
            ) : (
              <Phone className="w-4 h-4 text-gray-600" />
            )}
            <span className="text-gray-700 capitalize">{contact.channel}</span>
          </div>
        </div>

        <Separator />

        {/* Notes Section */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <StickyNote className="w-4 h-4 text-gray-600" />
              <h3 className="text-gray-900">Internal Notes</h3>
            </div>
            {!isAddingNote && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsAddingNote(true)}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            )}
          </div>

          {isAddingNote && (
            <Card className="mb-4">
              <CardContent className="pt-4">
                <Textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Enter note..."
                  className="mb-3"
                  rows={3}
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleAddNote} disabled={!newNote.trim()}>
                    Save Note
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setNewNote('');
                      setIsAddingNote(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-3">
            {notes.length === 0 ? (
              <div className="text-center py-8">
                <StickyNote className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                <p className="text-sm text-gray-500">No notes yet</p>
                <p className="text-xs text-gray-400 mt-1">Add internal notes about this contact</p>
              </div>
            ) : (
              notes.map((note) => (
                <Card key={note.id} className="group">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">{note.createdBy}</p>
                        <p className="text-xs text-gray-400">{note.createdAt}</p>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                        onClick={() => onDeleteNote(note.id)}
                      >
                        <Trash2 className="w-4 h-4 text-gray-500" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-900">{note.content}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
