import React from 'react';
import useTaskStore from '../store/useTaskStore';
import TaskItem from './TaskItem';
import AddTask from './AddTask';

const TaskList = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const remaining = tasks.filter(task => !task.completed).length;

  return (
    <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-md flex flex-col gap-md transition-shadow hover:shadow-[0px_10px_30px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between mb-sm">
        <span className="font-headline-md text-headline-md text-on-surface">Active Tasks</span>
        <span className="text-label-md font-label-md text-primary bg-surface-container px-sm py-base rounded-full">
          {remaining} Remaining
        </span>
      </div>
      
      <ul className="flex flex-col">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <li className="py-md text-on-surface-variant italic">No tasks. You're all caught up!</li>
        )}
      </ul>
      
      <AddTask />
    </div>
  );
};

export default TaskList;
