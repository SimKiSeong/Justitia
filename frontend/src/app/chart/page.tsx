'use client';

import { useState } from 'react';
import ChartList from '@/components/chart/ChartList';
import ChartPagination from '@/components/chart/ChartPagination';
import { mockChartData } from './mockData';

export default function ChartPage() {
  const [selectedSongs, setSelectedSongs] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const songsPerPage = 50;
  const totalPages = Math.ceil(mockChartData.length / songsPerPage);

  const handleSelectSong = (rank: number) => {
    setSelectedSongs(prev => {
      if (prev.includes(rank)) {
        return prev.filter(r => r !== rank);
      }
      return [...prev, rank];
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getCurrentPageSongs = () => {
    const startIndex = (currentPage - 1) * songsPerPage;
    const endIndex = startIndex + songsPerPage;
    return mockChartData.slice(startIndex, endIndex);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ChartList
          songs={getCurrentPageSongs()}
          selectedSongs={selectedSongs}
          onSelectSong={handleSelectSong}
        />

        <ChartPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}