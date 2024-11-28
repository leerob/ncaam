import Link from 'next/link';
import './globals.css';
import { CalendarIcon, ListIcon, TableIcon } from 'lucide-react';

export const metadata = {
  title: {
    default: 'NCCAM Scores & Schedules',
    template: '%s | NCCAM Scores & Schedules',
  },
  description: 'Like ESPN, but streamlined.',
};

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="flex flex-col min-h-screen text-black dark:text-white bg-white dark:bg-black antialiased">
        <div className="flex-grow overflow-y-scroll h-[calc(100vh_-_70px)] border-b border-gray-200 dark:border-gray-800 pb-16 md:pb-0">
          {children}
        </div>
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[70px] bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
          <BottomNav />
        </nav>
      </body>
    </html>
  );
}

function BottomNav() {
  return (
    <div className="max-w-screen-md mx-auto h-full flex items-center justify-around px-6">
      <Link href="/" className="flex flex-col items-center space-y-1 mb-2">
        <CalendarIcon className="h-5 w-5" />
        <span className="text-xs">Schedule</span>
      </Link>
      <Link
        href="/scores"
        className="flex flex-col items-center space-y-1 mb-2"
      >
        <ListIcon className="h-5 w-5" />
        <span className="text-xs">Scores</span>
      </Link>
      <Link
        href="/conference"
        className="flex flex-col items-center space-y-1 mb-2"
      >
        <TableIcon className="h-5 w-5" />
        <span className="text-xs">Conference</span>
      </Link>
    </div>
  );
}
