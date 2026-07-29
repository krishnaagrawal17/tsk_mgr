import React from 'react';
import useTaskStore from '../store/useTaskStore';

const TaskItem = ({ task }) => {
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  return (
    <li 
      className="task-item group flex items-center justify-between py-md px-sm border-b border-surface-container-low last:border-0 hover:bg-surface-container-low transition-colors rounded-lg cursor-pointer"
      onClick={() => toggleTask(task.id)}
    >
      <div className="flex items-center gap-md">
        <div className={`checkbox-custom w-6 h-6 rounded-full border-2 border-outline-variant flex items-center justify-center transition-colors group-hover:border-primary ${task.completed ? 'border-primary' : ''}`}>
          <div className={`w-3 h-3 bg-primary rounded-full transition-opacity ${task.completed ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>
        <span className={`font-body-lg text-body-lg text-on-surface transition-all ${task.completed ? 'line-through opacity-40' : ''}`}>
          {task.title}
        </span>
      </div>
      <button 
        className="material-symbols-outlined text-outline-variant opacity-0 group-hover:opacity-100 transition-opacity hover:text-error"
        onClick={(e) => {
          e.stopPropagation();
          deleteTask(task.id);
        }}
      >
        delete
      </button>
    </li>
  );
};

export default TaskItem;
