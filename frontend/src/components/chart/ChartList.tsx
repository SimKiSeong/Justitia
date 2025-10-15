'use client';

import ChartItem from './ChartItem';
import { ChartSong } from '@/components/chart/types';

interface ChartListProps {
  songs: ChartSong[];
  selectedSongs: number[];
  onSelectSong: (rank: number) => void;
}

export default function ChartList({ songs, selectedSongs, onSelectSong }: ChartListProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
        <div className="flex items-center py-4 px-6">
          <div className="flex items-center gap-4 flex-1">


            <div className="w-12 text-center">
              <span className="text-s font-bold text-gray-700 uppercase tracking-wider">순위</span>
            </div>

            <div className="w-[60px]"></div> {/* 앨범 커버 공간 */}

            <div className="flex-1">
              <span className="text-s font-bold text-gray-700 uppercase tracking-wider">곡 정보</span>
            </div>

            <div className="w-32 text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="text-s font-bold text-gray-700 uppercase tracking-wider">종합 평점</span>
              </div>
            </div>

            <div className="w-32 text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="text-s font-bold text-gray-700 uppercase tracking-wider">종합 등급</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 곡 목록 */}
      <div className="divide-y divide-gray-100">
        {songs.map((song) => (
          <ChartItem
            key={song.rank}
            song={song}
            isSelected={selectedSongs.includes(song.rank)}
            onSelect={onSelectSong}
          />
        ))}
      </div>
    </div>
  );
}