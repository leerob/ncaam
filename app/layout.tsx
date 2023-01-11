import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="text-black dark:text-white bg-white dark:bg-black">
        {children}
      </body>
      <footer className="text-gray-600 dark:text-gray-400 text-xs mx-auto text-center mt-2 mb-4">
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
    </html>
  );
}
