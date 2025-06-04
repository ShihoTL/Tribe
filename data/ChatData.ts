interface Tribe {
  id: string;
  name: string;
  imageUrl: string;
  hasUnread: boolean;
  unreadCount: number;
}

interface Message {
  id: string;
  text: string;
  sender: string;
  time: string;
  tribeId: string;
  isCommand: boolean;
  commandType?: string;
  target?: string;
  amount?: number;
  result?: string;
  replyTo?: { id: string; text: string; sender: string } | null;
}

export const activeTribes: Tribe[] = [
  {
    id: '1',
    name: 'SolanaDevs',
    imageUrl:
      'https://images.pexels.com/photos/2570059/pexels-photo-2570059.jpeg',
    hasUnread: true,
    unreadCount: 3,
  },
  {
    id: '2',
    name: 'NFT Creators',
    imageUrl:
      'https://images.pexels.com/photos/3631430/pexels-photo-3631430.jpeg',
    hasUnread: false,
    unreadCount: 0,
  },
  {
    id: '3',
    name: 'DAO Masters',
    imageUrl:
      'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg',
    hasUnread: true,
    unreadCount: 5,
  },
];

export const messages: Message[] = [
  {
    id: '1',
    text: 'Hey Vibers! Just completed the logo design quest!',
    sender: 'SolanaWizard',
    time: '10:45 AM',
    tribeId: '1',
    isCommand: false,
  },
  {
    id: '2',
    text: '/cheer @SolanaWizard',
    sender: 'CryptoQueen',
    time: '10:47 AM',
    tribeId: '1',
    isCommand: true,
    commandType: 'cheer',
    target: 'SolanaWizard',
  },
  {
    id: '3',
    text: 'Amazing work! The community loves it.',
    sender: 'DAOmaster',
    time: '10:50 AM',
    tribeId: '1',
    isCommand: false,
  },
  {
    id: '4',
    text: 'Anyone working on the codebase quest?',
    sender: 'DevNinja',
    time: '10:55 AM',
    tribeId: '1',
    isCommand: false,
  },
  {
    id: '5',
    text: "I'm on it! Need any help?",
    sender: 'You',
    time: '11:02 AM',
    tribeId: '1',
    isCommand: false,
  },
  {
    id: '6',
    text: '/roll for good luck',
    sender: 'SolanaWizard',
    time: '11:05 AM',
    tribeId: '1',
    isCommand: true,
    commandType: 'roll',
    result: '4',
  },
  {
    id: '7',
    text: '/tip @You 5 $VIBE for helping with the code',
    sender: 'DevNinja',
    time: '11:10 AM',
    tribeId: '1',
    isCommand: true,
    commandType: 'tip',
    target: 'You',
    amount: 5,
  },
  {
    id: '8',
    text: 'Thanks for the tip! Working on the PR now.',
    sender: 'You',
    time: '11:15 AM',
    tribeId: '1',
    isCommand: false,
  },
];
