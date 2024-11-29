'use client';

import Link from 'next/link';
import { CalendarIcon, RadioIcon, TrophyIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="max-w-screen-md mx-auto h-full flex items-center justify-around px-6">
      <Link
        href="/"
        className={`flex flex-col items-center space-y-1 mb-4 ${
          pathname === '/' ? 'text-black' : 'text-gray-400'
        }`}
      >
        <CalendarIcon className="h-5 w-5" />
        <span className="text-xs">Schedule</span>
      </Link>
      <Link
        href="/scores"
        className={`flex flex-col items-center space-y-1 mb-4 ${
          pathname === '/scores' ? 'text-black' : 'text-gray-400'
        }`}
      >
        <RadioIcon className="h-5 w-5" />
        <span className="text-xs">Scores</span>
      </Link>
      <Link
        href="/conference"
        className={`flex flex-col items-center space-y-1 mb-4 ${
          pathname === '/conference' ? 'text-black' : 'text-gray-400'
        }`}
      >
        <TrophyIcon className="h-5 w-5" />
        <span className="text-xs">Conference</span>
      </Link>
    </div>
  );
}
