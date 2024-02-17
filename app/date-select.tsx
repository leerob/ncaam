'use client';

import { useRouter } from 'next/navigation';

export default function DateSelect({ currentDate }: { currentDate: string }) {
  const router = useRouter();

  function goToDate(date: string, days: number) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    router.push(`/scores/${newDate.toISOString().split('T')[0]}`);
  }

  return (
    <div className="flex items-center my-4 border border-gray-300 dark:border-gray-700 rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 max-w-[200px]">
      <button
        type="button"
        onClick={() => goToDate(currentDate, -1)}
        className="flex items-center justify-center rounded-l-md py-2 pl-3 pr-4 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 focus:relative md:w-9 md:px-2"
      >
        <span className="sr-only">Previous day</span>
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => goToDate(currentDate, 0)}
        className="hidden w-full px-3.5 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 focus:relative md:block"
      >
        Today
      </button>
      <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
      <button
        type="button"
        onClick={() => goToDate(currentDate, 1)}
        className="flex items-center justify-center rounded-r-md py-2 pl-4 pr-3 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 focus:relative md:w-9 md:px-2"
      >
        <span className="sr-only">Next day</span>
        <svg
          className="h-5 w-5"
          x-description="Heroicon name: mini/chevron-right"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
