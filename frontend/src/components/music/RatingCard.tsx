'use client';

import { PlatformRating } from '@/app/music/types';

interface RatingCardProps {
  rating: PlatformRating;
}

export default function RatingCard({ rating }: RatingCardProps) {
  const percentage = (rating.score / rating.maxScore) * 100;

  const getColorClass = (color: string) => {
    switch(color) {
      case 'red': return 'bg-red-500';
      case 'blue': return 'bg-blue-500';
      case 'black': return 'bg-gray-900';
      case 'green': return 'bg-green-500';
      case 'purple': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrendIcon = () => {
    if (rating.trend === 'up') return '↑';
    if (rating.trend === 'down') return '↓';
    return '→';
  };

  const getTrendColor = () => {
    if (rating.trend === 'up') return 'text-green-600';
    if (rating.trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{rating.icon}</span>
          <h3 className="text-lg font-semibold text-gray-800">{rating.platform}</h3>
        </div>
        {rating.trendValue !== undefined && rating.trendValue !== 0 && (
          <div className={`flex items-center gap-1 ${getTrendColor()}`}>
            <span className="text-lg">{getTrendIcon()}</span>
            <span className="font-semibold">{Math.abs(rating.trendValue)}%</span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="flex items-end justify-between mb-2">
          <span className="text-3xl font-bold text-gray-900">{rating.score}</span>
          <span className="text-sm text-gray-500">/ {rating.maxScore}</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full ${getColorClass(rating.color)} transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">
        {rating.description}
      </p>
    </div>
  );
}