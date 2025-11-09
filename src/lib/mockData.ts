export interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  channel: 'sms' | 'whatsapp';
}

export interface Message {
  id: string;
  contactId: string;
  content: string;
  timestamp: string;
  direction: 'inbound' | 'outbound';
  channel: 'sms' | 'whatsapp';
  status: 'sent' | 'delivered' | 'read' | 'failed';
}

export interface Note {
  id: string;
  contactId: string;
  content: string;
  createdAt: string;
  createdBy: string;
}

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    lastMessage: 'Thanks for the quick response!',
    lastMessageTime: '2 min ago',
    unreadCount: 2,
    channel: 'whatsapp',
  },
  {
    id: '2',
    name: 'Michael Chen',
    phone: '+1 (555) 234-5678',
    lastMessage: 'Can we schedule a call for tomorrow?',
    lastMessageTime: '15 min ago',
    unreadCount: 0,
    channel: 'sms',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    phone: '+1 (555) 345-6789',
    lastMessage: 'Perfect, see you then!',
    lastMessageTime: '1 hour ago',
    unreadCount: 0,
    channel: 'whatsapp',
  },
  {
    id: '4',
    name: 'David Kim',
    phone: '+1 (555) 456-7890',
    lastMessage: 'What are your business hours?',
    lastMessageTime: '3 hours ago',
    unreadCount: 1,
    channel: 'sms',
  },
  {
    id: '5',
    name: 'Jessica Williams',
    phone: '+1 (555) 567-8901',
    lastMessage: 'Thank you for your help!',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    channel: 'whatsapp',
  },
  {
    id: '6',
    name: 'Robert Taylor',
    phone: '+1 (555) 678-9012',
    lastMessage: 'Do you have any availability next week?',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    channel: 'sms',
  },
];

export const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: 'm1',
      contactId: '1',
      content: 'Hi! I have a question about your services.',
      timestamp: '10:30 AM',
      direction: 'inbound',
      channel: 'whatsapp',
      status: 'read',
    },
    {
      id: 'm2',
      contactId: '1',
      content: 'Of course! How can I help you today?',
      timestamp: '10:32 AM',
      direction: 'outbound',
      channel: 'whatsapp',
      status: 'read',
    },
    {
      id: 'm3',
      contactId: '1',
      content: 'I wanted to know about your pricing plans and what features are included.',
      timestamp: '10:33 AM',
      direction: 'inbound',
      channel: 'whatsapp',
      status: 'read',
    },
    {
      id: 'm4',
      contactId: '1',
      content: 'We have three tiers: Basic ($29/mo), Pro ($79/mo), and Enterprise (custom pricing). Each includes SMS and WhatsApp support, unified inbox, and analytics.',
      timestamp: '10:35 AM',
      direction: 'outbound',
      channel: 'whatsapp',
      status: 'delivered',
    },
    {
      id: 'm5',
      contactId: '1',
      content: 'Thanks for the quick response!',
      timestamp: '10:36 AM',
      direction: 'inbound',
      channel: 'whatsapp',
      status: 'read',
    },
  ],
  '2': [
    {
      id: 'm6',
      contactId: '2',
      content: 'Hello, I need some assistance with my account.',
      timestamp: 'Yesterday, 3:45 PM',
      direction: 'inbound',
      channel: 'sms',
      status: 'read',
    },
    {
      id: 'm7',
      contactId: '2',
      content: 'Hi Michael! I\'d be happy to help. What seems to be the issue?',
      timestamp: 'Yesterday, 3:48 PM',
      direction: 'outbound',
      channel: 'sms',
      status: 'delivered',
    },
    {
      id: 'm8',
      contactId: '2',
      content: 'Can we schedule a call for tomorrow?',
      timestamp: '9:30 AM',
      direction: 'inbound',
      channel: 'sms',
      status: 'read',
    },
  ],
  '3': [
    {
      id: 'm9',
      contactId: '3',
      content: 'Hey! Are you free for a meeting this afternoon?',
      timestamp: 'Yesterday, 2:15 PM',
      direction: 'inbound',
      channel: 'whatsapp',
      status: 'read',
    },
    {
      id: 'm10',
      contactId: '3',
      content: 'Yes! I\'m available after 3 PM. Does that work for you?',
      timestamp: 'Yesterday, 2:20 PM',
      direction: 'outbound',
      channel: 'whatsapp',
      status: 'read',
    },
    {
      id: 'm11',
      contactId: '3',
      content: 'Perfect, see you then!',
      timestamp: 'Yesterday, 2:22 PM',
      direction: 'inbound',
      channel: 'whatsapp',
      status: 'read',
    },
  ],
  '4': [
    {
      id: 'm12',
      contactId: '4',
      content: 'What are your business hours?',
      timestamp: 'Today, 7:15 AM',
      direction: 'inbound',
      channel: 'sms',
      status: 'read',
    },
  ],
  '5': [
    {
      id: 'm13',
      contactId: '5',
      content: 'I just wanted to say thank you for all your help with setting up the integration!',
      timestamp: 'Yesterday, 11:30 AM',
      direction: 'inbound',
      channel: 'whatsapp',
      status: 'read',
    },
    {
      id: 'm14',
      contactId: '5',
      content: 'You\'re very welcome! I\'m glad everything is working smoothly now. Let me know if you need anything else!',
      timestamp: 'Yesterday, 11:35 AM',
      direction: 'outbound',
      channel: 'whatsapp',
      status: 'read',
    },
    {
      id: 'm15',
      contactId: '5',
      content: 'Thank you for your help!',
      timestamp: 'Yesterday, 11:37 AM',
      direction: 'inbound',
      channel: 'whatsapp',
      status: 'read',
    },
  ],
  '6': [
    {
      id: 'm16',
      contactId: '6',
      content: 'Do you have any availability next week?',
      timestamp: 'Yesterday, 4:00 PM',
      direction: 'inbound',
      channel: 'sms',
      status: 'read',
    },
  ],
};

export const mockNotes: Record<string, Note[]> = {
  '1': [
    {
      id: 'n1',
      contactId: '1',
      content: 'Interested in Pro plan. Follow up next week.',
      createdAt: 'Nov 8, 2025 10:40 AM',
      createdBy: 'You',
    },
    {
      id: 'n2',
      contactId: '1',
      content: 'Mentioned they have a team of 15 people.',
      createdAt: 'Nov 8, 2025 10:38 AM',
      createdBy: 'You',
    },
  ],
  '2': [
    {
      id: 'n3',
      contactId: '2',
      content: 'Schedule call for Nov 9 at 2 PM.',
      createdAt: 'Nov 8, 2025 9:35 AM',
      createdBy: 'You',
    },
  ],
  '3': [],
  '4': [
    {
      id: 'n4',
      contactId: '4',
      content: 'Send business hours: Mon-Fri 9AM-6PM EST',
      createdAt: 'Nov 8, 2025 7:20 AM',
      createdBy: 'You',
    },
  ],
  '5': [
    {
      id: 'n5',
      contactId: '5',
      content: 'VIP customer - very satisfied with service',
      createdAt: 'Nov 7, 2025 11:40 AM',
      createdBy: 'You',
    },
  ],
  '6': [],
};
