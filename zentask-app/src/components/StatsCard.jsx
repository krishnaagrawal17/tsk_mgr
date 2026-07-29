import React from 'react';
import useTaskStore from '../store/useTaskStore';

const StatsCard = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  // If no tasks, we can say 0% or 100% depending on semantics. Let's say 100% if empty, or just 0%.
  // In the original, it was hardcoded to 84%. I'll calculate it, but if 0 tasks, 0%.
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="bg-primary-container p-md rounded-xl text-on-primary-container shadow-sm overflow-hidden relative group">
      <div className="relative z-10">
        <p className="font-label-md text-label-md opacity-80 uppercase tracking-widest mb-base">Weekly Completion</p>
        <h3 className="font-headline-lg text-headline-lg mb-sm">{percentage}%</h3>
        <div className="w-full bg-on-primary-container/20 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-on-primary-container h-full rounded-full transition-all duration-500" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
        <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
      </div>
    </div>
  );
};

export default StatsCard;
