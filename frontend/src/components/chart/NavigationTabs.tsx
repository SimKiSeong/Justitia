'use client';

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  const tabs = [
    { id: 'realtime', label: '실시간 차트', icon: '📊' },
    { id: 'artist', label: '아티스트 분석', icon: '🎤' },
    { id: 'album', label: '앨범 분석', icon: '💿' },
    { id: 'keyword', label: 'Hot 키워드', icon: '🔥' },
    { id: 'resource', label: '리소스 관리', icon: '⚙️' },
  ];

  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center gap-2 py-5 px-4 border-b-3 font-semibold text-lg transition-colors
              ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            <span className="text-2xl">{tab.icon}</span>
            <span className="text-xl font-semibold">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}