import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="my-8 max-w-md mx-auto">{children}</body>
    </html>
  );
}
