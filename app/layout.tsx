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
    </html>
  );
}
