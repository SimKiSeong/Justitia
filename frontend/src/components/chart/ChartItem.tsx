'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChartSong } from '@/components/chart/types';

interface ChartItemProps {
  song: ChartSong;
  isSelected: boolean;
  onSelect: (rank: number) => void;
}

export default function ChartItem({ song, isSelected, onSelect }: ChartItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getGrade = (score: number) => {
    if (score >= 95) return 'S+';
    if (score >= 90) return 'S';
    if (score >= 85) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 75) return 'B+';
    if (score >= 70) return 'B';
    if (score >= 65) return 'C+';
    if (score >= 60) return 'C';
    return 'D';
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('S')) return 'text-purple-600';
    if (grade.startsWith('A')) return 'text-blue-600';
    if (grade.startsWith('B')) return 'text-green-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRankChange = () => {
    if (song.isNew) {
      return <span className="text-red-500 font-bold text-sm">NEW</span>;
    }
    if (song.previousRank === 0) {
      return <span className="text-red-500 font-bold text-sm">NEW</span>;
    }
    if (song.previousRank > song.rank) {
      const diff = song.previousRank - song.rank;
      return <span className="text-red-500 text-sm font-semibold">▲ {diff}</span>;
    }
    if (song.previousRank < song.rank) {
      const diff = song.rank - song.previousRank;
      return <span className="text-blue-500 text-sm font-semibold">▼ {diff}</span>;
    }
    return <span className="text-gray-400 text-sm">-</span>;
  };

  // Use deterministic score based on rank to avoid hydration issues
  const overallScore = song.overallScore || (100 - Math.floor(song.rank * 0.5));
  const overallGrade = song.overallGrade || getGrade(overallScore);

  return (
    <div
      className={`flex items-center py-4 px-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 ${isHovered ? 'bg-gradient-to-r from-blue-50 to-purple-50' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-4 flex-1">

        <div className="flex flex-col items-center w-12">
          <span className="text-2xl font-bold">{song.rank}</span>
          <div className="mt-1">{getRankChange()}</div>
        </div>

        <a href={`/music/${song.rank}`} className="relative w-[60px] h-[60px] bg-gray-200 rounded overflow-hidden block">
          <Image
            src={song.albumCover}
            alt={song.album}
            width={60}
            height={60}
            className="object-cover"
          />
          <div className={`absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity cursor-pointer`}>
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4v12l8-6-8-6z" />
            </svg>
          </div>
        </a>

        <div className="flex-1">
          <a href={`/music/${song.rank}`} className="font-semibold text-lg text-gray-900 mb-1 cursor-pointer hover:underline inline-block">
            {song.title}
          </a>
          <div className="text-base text-gray-600">
            <a href={`/music/${song.rank}`} className="cursor-pointer hover:underline">{song.artist}</a>
            <span className="mx-2">|</span>
            <a href={`/music/${song.rank}`} className="cursor-pointer hover:underline">{song.album}</a>
          </div>
        </div>


        <div className="w-32 text-center">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-blue-600">{overallScore}</span>
            <span className="text-sm text-gray-500">점</span>
          </div>
        </div>

        <div className="w-32 text-center">
          <span className={`text-2xl font-bold ${getGradeColor(overallGrade)}`}>
            {overallGrade}
          </span>
        </div>
      </div>
    </div>
  );
}