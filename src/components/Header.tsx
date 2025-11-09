import { Button } from './ui/button';
import { MessageSquare, LogOut, PanelRightOpen, PanelRightClose } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
  onToggleProfile: () => void;
  showProfile: boolean;
}

export function Header({ onLogout, onToggleProfile, showProfile }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-gray-900">Unified Inbox</h1>
          <p className="text-sm text-gray-500">SMS & WhatsApp Messages</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleProfile}
          title={showProfile ? "Hide contact profile" : "Show contact profile"}
        >
          {showProfile ? (
            <PanelRightClose className="w-5 h-5" />
          ) : (
            <PanelRightOpen className="w-5 h-5" />
          )}
        </Button>
        <Button variant="outline" size="sm" onClick={onLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  );
}
