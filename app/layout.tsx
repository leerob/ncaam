import './globals.css';

export const metadata = {
  title: {
    default: 'NCCAM Scores & Schedules',
    template: '%s | NCCAM Scores & Schedules',
  },
  description: 'Like ESPN, but streamlined.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="flex flex-col min-h-screen text-black dark:text-white bg-white dark:bg-black">
        <div className="flex-grow overflow-y-scroll h-[calc(100vh_-_48px)] border-b border-gray-200 dark:border-gray-800">
          {children}
        </div>
        <footer className="text-gray-600 dark:text-gray-400 text-xs mx-auto text-center pt-4 h-[48px]">
          {'Built using the '}
          <a
            href="https://espn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-gray-400 dark:border-gray-600 hover:border-gray-600 hover:dark:border-gray-400 hover:text-gray-800 hover:dark:text-gray-200 transition-all"
          >
            ESPN API
          </a>
          {', Next.js, and Vercel. '}
          <a
            href="https://github.com/leerob/ncaam"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-gray-400 dark:border-gray-600 hover:border-gray-600 hover:dark:border-gray-400 hover:text-gray-800 hover:dark:text-gray-200 transition-all"
          >
            View the code.
          </a>
        </footer>
      </body>
    </html>
  );
}
