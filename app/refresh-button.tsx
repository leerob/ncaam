'use client';

import { RefreshCwIcon } from 'lucide-react';
import { useTransition } from 'react';

export function RefreshButton({ action }: { action: () => Promise<void> }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => action())}
      disabled={isPending}
      aria-label="Refresh data"
      className="p-1 rounded-md text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 disabled:opacity-50 transition-colors"
    >
      <RefreshCwIcon
        className={`h-4 w-4 ${isPending ? 'animate-spin' : ''}`}
      />
    </button>
  );
}
