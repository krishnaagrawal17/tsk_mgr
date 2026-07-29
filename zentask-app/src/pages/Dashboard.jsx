import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import TaskList from '../components/TaskList';
import StatsCard from '../components/StatsCard';
import DailyInsight from '../components/DailyInsight';
import { supabase } from '../lib/supabase';
import useAuthStore from '../store/useAuthStore';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  const user = useAuthStore(state => state.user);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || !user) return;
    
    setIsSearching(true);
    setSearchResults([]);
    
    try {
      const { data, error } = await supabase.functions.invoke('smart-search', {
        body: { query: searchQuery, user_id: user.id }
      });
      
      if (error) throw error;
      
      if (data && data.results) {
        setSearchResults(data.results);
      }
    } catch (err) {
      console.error("Search failed:", err);
      alert("Failed to perform smart search");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className="lg:ml-64 p-xl max-w-[1200px] transition-all duration-300">
        <Header toggleSidebar={toggleSidebar} />
        
        {/* Smart Search Section */}
        <div className="mb-lg">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-sm">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">search</span>
              <input 
                type="text" 
                placeholder="Smart Search (e.g., 'things I need to buy')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-secondary-container text-on-surface rounded-xl outline-none focus:ring-2 focus:ring-primary transition-all font-body-md placeholder:text-on-surface-variant shadow-sm"
              />
            </div>
            <button 
              type="submit" 
              disabled={isSearching || !searchQuery.trim()}
              className="bg-primary text-on-primary px-6 py-3 rounded-xl font-label-lg shadow-sm hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {isSearching ? (
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
              ) : (
                <span className="material-symbols-outlined">auto_awesome</span>
              )}
              Search
            </button>
          </form>
          
          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mt-4 bg-surface-container-lowest border border-primary/20 rounded-xl p-md shadow-sm">
              <h3 className="text-sm font-bold text-primary mb-3 flex items-center gap-1">
                <span className="material-symbols-outlined text-base">manage_search</span> 
                Top Matches
              </h3>
              <ul className="flex flex-col gap-2">
                {searchResults.map((task) => (
                  <li key={task.id} className="flex items-center justify-between p-3 bg-secondary-container/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary/70">task_alt</span>
                      <span className="font-body-md text-on-surface">{task.title}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[10px] uppercase font-bold bg-surface-container text-on-surface-variant px-2 py-1 rounded">
                        {task.priority}
                      </span>
                      <span className="text-[10px] uppercase font-bold bg-surface-container text-on-surface-variant px-2 py-1 rounded">
                        {task.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
          <TaskList />
          
          <div className="lg:col-span-4 flex flex-col gap-lg">
            <StatsCard />
            <DailyInsight />
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
