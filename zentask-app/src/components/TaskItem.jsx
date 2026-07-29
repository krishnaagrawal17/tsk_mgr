import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import useTaskStore from '../store/useTaskStore';
import useAuthStore from '../store/useAuthStore';

// Subtask Item Component to render saved subtasks
const SubtaskItem = ({ subtask }) => {
  const updateSubtaskStatus = useTaskStore((state) => state.updateSubtaskStatus);
  const deleteSubtask = useTaskStore((state) => state.deleteSubtask);

  const isDone = subtask.status === 'done';

  const toggleStatus = () => {
    updateSubtaskStatus(subtask.id, isDone ? 'pending' : 'done');
  };

  return (
    <div className="group flex items-center justify-between py-xs px-sm border-b border-surface-container-low last:border-0 hover:bg-surface-container-low transition-colors rounded-lg ml-xl border-l-4 border-l-surface-container-high bg-surface-container-lowest/50">
      <div className="flex items-center gap-sm flex-1">
        <div 
          onClick={toggleStatus}
          className={`cursor-pointer checkbox-custom min-w-[20px] w-5 h-5 rounded-full border-2 border-outline-variant flex items-center justify-center transition-colors hover:border-primary ${isDone ? 'border-primary' : ''}`}
        >
          <div className={`w-2.5 h-2.5 bg-primary rounded-full transition-opacity ${isDone ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>
        <span className={`font-body-md text-body-md text-on-surface transition-all ${isDone ? 'line-through opacity-40' : ''}`}>
          {subtask.title}
        </span>
      </div>
      
      <button 
        className="material-symbols-outlined text-[18px] text-outline-variant opacity-0 group-hover:opacity-100 transition-opacity hover:text-error ml-2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-surface-container"
        onClick={() => deleteSubtask(subtask.id)}
        title="Delete Subtask"
      >
        delete
      </button>
    </div>
  );
};

const TaskItem = ({ task }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
  const updateTaskPriority = useTaskStore((state) => state.updateTaskPriority);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const addSubtask = useTaskStore((state) => state.addSubtask);
  const subtasks = useTaskStore((state) => state.subtasks).filter(st => st.task_id === task.id);
  
  const user = useAuthStore((state) => state.user);
  const isDone = task.status === 'done';

  const toggleStatus = () => {
    updateTaskStatus(task.id, isDone ? 'pending' : 'done');
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-subtasks', {
        body: { title: task.title }
      });
      
      if (error) throw new Error(error.message);
      if (data && data.subtasks) {
        setSuggestions(data.subtasks);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to generate subtasks: ' + err.message);
    }
    setIsGenerating(false);
  };

  const handleSaveSuggestion = async (suggestionText, index) => {
    if (!user) return;
    await addSubtask(suggestionText, task.id, user.id);
    
    // Remove from suggestions array
    setSuggestions(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col mb-1">
      <li className="task-item group flex items-center justify-between py-md px-sm border-b border-surface-container-low hover:bg-surface-container-low transition-colors rounded-lg">
        <div className="flex items-center gap-md flex-1">
          <div 
            onClick={toggleStatus}
            className={`cursor-pointer checkbox-custom min-w-[24px] w-6 h-6 rounded-full border-2 border-outline-variant flex items-center justify-center transition-colors hover:border-primary ${isDone ? 'border-primary' : ''}`}
          >
            <div className={`w-3 h-3 bg-primary rounded-full transition-opacity ${isDone ? 'opacity-100' : 'opacity-0'}`}></div>
          </div>
          <div className="flex flex-col">
            <span className={`font-body-lg text-body-lg text-on-surface transition-all ${isDone ? 'line-through opacity-40' : ''}`}>
              {task.title}
            </span>
            <div className="flex gap-2 mt-1">
              <select 
                value={task.priority} 
                onChange={(e) => updateTaskPriority(task.id, e.target.value)}
                className="text-[10px] uppercase font-bold bg-surface-container text-on-surface-variant rounded px-2 py-0.5 outline-none cursor-pointer border border-transparent hover:border-outline-variant transition-colors"
              >
                <option value="low">Low</option>
                <option value="medium">Med</option>
                <option value="high">High</option>
              </select>
              
              <select 
                value={task.status} 
                onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                className="text-[10px] uppercase font-bold bg-surface-container text-on-surface-variant rounded px-2 py-0.5 outline-none cursor-pointer border border-transparent hover:border-outline-variant transition-colors"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-sm">
          <button 
            className="material-symbols-outlined text-outline-variant opacity-0 group-hover:opacity-100 transition-opacity hover:text-error w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center"
            onClick={() => deleteTask(task.id)}
            title="Delete Task"
          >
            delete
          </button>
        </div>
      </li>
      
      {/* Button to Generate Subtasks */}
      <div className="ml-xl mt-1 mb-2">
        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 transition-colors bg-primary/10 px-2 py-1 rounded-md"
        >
          <span className={`material-symbols-outlined text-[14px] ${isGenerating ? 'animate-spin' : ''}`}>
            {isGenerating ? 'progress_activity' : 'temp_preferences_custom'}
          </span>
          {isGenerating ? 'Generating...' : 'Generate Subtasks with AI'}
        </button>
      </div>

      {/* Render AI Suggestions */}
      {suggestions.length > 0 && (
        <div className="flex flex-col mb-2 ml-xl bg-primary/5 border border-primary/20 rounded-lg p-sm">
          <span className="text-xs font-bold text-primary mb-2">AI Suggestions:</span>
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-center justify-between py-1 px-2 border-b border-primary/10 last:border-0 hover:bg-primary/10 rounded transition-colors">
              <span className="text-sm text-on-surface-variant flex-1 pr-2">{suggestion}</span>
              <button 
                onClick={() => handleSaveSuggestion(suggestion, index)}
                className="text-xs bg-primary text-on-primary px-2 py-1 rounded-md hover:brightness-110 active:scale-95 transition-all shadow-sm flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[12px]">add</span> Save
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Render Saved Subtasks */}
      {subtasks.length > 0 && (
        <div className="flex flex-col mb-4 gap-1">
          {subtasks.map(subtask => (
            <SubtaskItem key={subtask.id} subtask={subtask} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskItem;
