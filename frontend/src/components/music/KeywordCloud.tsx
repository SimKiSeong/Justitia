'use client';

interface KeywordCloudProps {
  keywords: string[];
}

export default function KeywordCloud({ keywords }: KeywordCloudProps) {
  if (!keywords || keywords.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">주요 키워드</h3>
        <p className="text-gray-500">키워드가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">주요 키워드</h3>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => {
          // 인덱스에 따라 크기와 색상 다르게
          const sizes = ['text-2xl', 'text-xl', 'text-lg', 'text-base', 'text-sm'];
          const size = sizes[Math.min(index, sizes.length - 1)];
          
          return (
            <span
              key={index}
              className={`${size} font-medium px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 hover:scale-110 transition-transform cursor-default`}
            >
              {keyword}
            </span>
          );
        })}
      </div>
    </div>
  );
}
