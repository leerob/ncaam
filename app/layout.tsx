import { Suspense } from 'react';
import './globals.css';
import { BottomNav } from './navbar';

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
        <div className="flex-grow overflow-y-scroll h-[calc(100vh_-_80px)] border-b border-gray-200 dark:border-gray-800 pb-16 md:pb-0">
          {children}
        </div>
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[80px] bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
          <Suspense fallback={null}>
            <BottomNav />
          </Suspense>
        </nav>
      </body>
    </html>
  );
}
