'use client';

interface ChartControlsProps {
  selectAll: boolean;
  onSelectAll: () => void;
  selectedCount: number;
  onPlaySelected: () => void;
  onAddSelected: () => void;
  onDownloadSelected: () => void;
  onPlayAll: () => void;
  onShuffle: () => void;
}

export default function ChartControls({
  selectAll,
  onSelectAll,
  selectedCount,
  onPlaySelected,
  onAddSelected,
  onDownloadSelected,
  onPlayAll,
  onShuffle
}: ChartControlsProps) {
  return (
    <div className="flex items-center justify-between py-3 border-t border-b border-gray-200">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={onSelectAll}
            className="w-4 h-4"
          />
          <span className="text-sm">전체선택</span>
        </label>

        <button
          onClick={onPlaySelected}
          disabled={selectedCount === 0}
          className="flex items-center gap-1 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 4v12l8-6-8-6z" />
          </svg>
          선택재생
        </button>

        <button
          onClick={onAddSelected}
          disabled={selectedCount === 0}
          className="flex items-center gap-1 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          선택담기
        </button>

        <button
          onClick={onDownloadSelected}
          disabled={selectedCount === 0}
          className="flex items-center gap-1 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          선택다운
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onPlayAll}
          className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 4v12l8-6-8-6z" />
          </svg>
          전체재생
        </button>

        <button
          onClick={onShuffle}
          className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.59 12.83L4.4 15c-.58.58-1.59 1-2.4 1H0v-2h2c.29 0 .8-.2 1-.41l2.17-2.18 1.42 1.42zM16 4V1l4 4-4 4V6h-2c-.29 0-.8.2-1 .41l-2.17 2.18L9.4 7.17 11.6 5c.58-.58 1.59-1 2.4-1h2zm0 10v-3l4 4-4 4v-3h-2c-.82 0-1.83-.42-2.41-1l-8.6-8.59C2.8 6.21 2.3 6 2 6H0V4h2c.82 0 1.83.42 2.41 1l8.6 8.59c.2.2.7.41 1 .41h2z" />
          </svg>
          셔플
        </button>
      </div>
    </div>
  );
}