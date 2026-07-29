import React, { useState } from 'react';
import useTaskStore from '../store/useTaskStore';
import useAuthStore from '../store/useAuthStore';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const addTask = useTaskStore((state) => state.addTask);
  const user = useAuthStore((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && user?.id) {
      addTask(title.trim(), priority, user.id);
      setTitle('');
      setPriority('medium');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-lg pt-lg border-t border-surface-container-low">
      <label className="font-label-md text-label-md text-on-surface-variant block mb-xs" htmlFor="newTaskInput">
        New Task
      </label>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-md">
        <div className="relative flex-1">
          <input 
            id="newTaskInput" 
            type="text"
            className="w-full h-12 px-md bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-outline" 
            placeholder="What needs to be done?" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <select 
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="h-12 px-md bg-surface-container-lowest border border-outline-variant rounded-lg outline-none cursor-pointer focus:border-primary"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <button 
          type="submit"
          className="h-12 px-lg bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-xs"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add Task
        </button>
      </div>
    </form>
  );
};

export default AddTask;
