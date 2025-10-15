'use client';

import { useState } from 'react';
import ChartHeader from '@/components/chart/ChartHeader';
import NavigationTabs from '@/components/chart/NavigationTabs';
import { usePathname } from 'next/navigation';

export default function GlobalHeader() {
  const [selectedTime, setSelectedTime] = useState('13:00');
  const [activeTab, setActiveTab] = useState('realtime');
  const pathname = usePathname();

  const handleRefresh = () => {
    console.log('Refreshing data...');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    console.log('Tab changed to:', tab);
    // 나중에 실제 라우팅 추가 가능
    // router.push(`/${tab}`);
  };

  return (
    <header className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <ChartHeader
          selectedTime={selectedTime}
          onTimeChange={setSelectedTime}
          onRefresh={handleRefresh}
        />
        <NavigationTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
    </header>
  );
}