'use client';

interface SentimentSummaryProps {
  positive: number;
  neutral: number;
  negative: number;
  total: number;
}

export default function SentimentSummary({ positive, neutral, negative, total }: SentimentSummaryProps) {
  // 퍼센트 계산 함수
  const calculatePercentage = (value: number): string => {
    if (total === 0) return '0.0';
    return ((value / total) * 100).toFixed(1);
  };

  // 숫자 포맷팅 함수 (천 단위 콤마)
  const formatNumber = (num: number): string => {
    return num.toLocaleString('ko-KR');
  };

  // 감성 데이터 배열
  const sentiments = [
    {
      type: 'positive',
      label: '긍정',
      icon: '😊',
      count: positive,
      percentage: calculatePercentage(positive),
      borderColor: 'border-green-400',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      iconBg: 'bg-green-100',
      progressColor: 'bg-green-400'
    },
    {
      type: 'neutral',
      label: '중립',
      icon: '😐',
      count: neutral,
      percentage: calculatePercentage(neutral),
      borderColor: 'border-yellow-400',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      iconBg: 'bg-yellow-100',
      progressColor: 'bg-yellow-400'
    },
    {
      type: 'negative',
      label: '부정',
      icon: '😞',
      count: negative,
      percentage: calculatePercentage(negative),
      borderColor: 'border-red-400',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      iconBg: 'bg-red-100',
      progressColor: 'bg-red-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {sentiments.map((sentiment) => (
        <div
          key={sentiment.type}
          className={`${sentiment.bgColor} rounded-xl shadow-md p-6 
                     hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer`}
        >
          {/* 아이콘 */}
          <div className={`${sentiment.iconBg} w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto`}>
            <span className="text-4xl">{sentiment.icon}</span>
          </div>

          {/* 제목 */}
          <h3 className={`text-lg font-semibold text-center mb-3 ${sentiment.textColor}`}>
            {sentiment.label}
          </h3>

          {/* 개수 */}
          <div className="text-center mb-2">
            <span className="text-3xl font-bold text-gray-900">
              {formatNumber(sentiment.count)}
            </span>
            <span className="text-lg text-gray-500 ml-1">개</span>
          </div>

          {/* 비율 */}
          <div className="text-center">
            <span className={`text-xl font-semibold ${sentiment.textColor}`}>
              {sentiment.percentage}%
            </span>
          </div>

          {/* 프로그레스 바 */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${sentiment.progressColor}`}
                style={{ width: `${sentiment.percentage}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
