import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TaskList from './components/TaskList';
import StatsCard from './components/StatsCard';
import DailyInsight from './components/DailyInsight';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="bg-background min-h-screen text-on-surface font-body-md">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* 
        Responsive fix: Changed ml-64 to lg:ml-64 so the content 
        doesn't have a huge left margin on mobile screens.
      */}
      <main className="lg:ml-64 p-xl max-w-[1200px] transition-all duration-300">
        <Header toggleSidebar={toggleSidebar} />
        
        {/* Bento Layout / Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
          {/* Main Tasks Card */}
          <TaskList />
          
          {/* Stats/Secondary Column */}
          <div className="lg:col-span-4 flex flex-col gap-lg">
            <StatsCard />
            <DailyInsight />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
