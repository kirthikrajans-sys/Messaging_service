import { useState } from 'react';
import { AuthPage } from './components/AuthPage';
import { InboxLayout } from './components/InboxLayout';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <AuthPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return <InboxLayout onLogout={() => setIsAuthenticated(false)} />;
}
