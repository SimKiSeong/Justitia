'use client';

import Image from 'next/image';

interface ChartHeaderProps {
  selectedTime: string;
  onTimeChange: (time: string) => void;
  onRefresh: () => void;
}

export default function ChartHeader({ selectedTime, onTimeChange, onRefresh }: ChartHeaderProps) {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const times = ['00:00', '01:00', '07:00', '12:00', '13:00', '18:00', '19:00'];

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="object-contain"
        />
        <h1 className="text-4xl font-bold text-gray-800">차트를 차트답게 Justitia</h1>
      </div>
      <div className="flex items-center gap-2 text-base text-gray-600">
        <span>{formattedDate}</span>
        <select
          value={selectedTime}
          onChange={(e) => onTimeChange(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-base"
        >
          {times.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
        <button
          onClick={onRefresh}
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>
  );
}