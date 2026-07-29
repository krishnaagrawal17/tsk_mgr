import React, { useEffect } from 'react';
import useTaskStore from '../store/useTaskStore';
import useAuthStore from '../store/useAuthStore';
import TaskItem from './TaskItem';
import AddTask from './AddTask';

const TaskList = () => {
  const { tasks, isLoading, fetchTasks, fetchSubtasks } = useTaskStore();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user?.id) {
      fetchTasks(user.id);
      fetchSubtasks(user.id);
    }
  }, [user?.id, fetchTasks, fetchSubtasks]);

  const remaining = tasks.filter(task => task.status !== 'done').length;

  return (
    <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-md flex flex-col gap-md transition-shadow hover:shadow-[0px_10px_30px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between mb-sm">
        <span className="font-headline-md text-headline-md text-on-surface">Active Tasks</span>
        <span className="text-label-md font-label-md text-primary bg-surface-container px-sm py-base rounded-full">
          {remaining} Remaining
        </span>
      </div>
      
      {isLoading ? (
        <div className="py-md text-center text-on-surface-variant">Loading tasks...</div>
      ) : (
        <ul className="flex flex-col">
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
          {tasks.length === 0 && (
            <li className="py-md text-on-surface-variant italic">No tasks yet. Add one below!</li>
          )}
        </ul>
      )}
      
      <AddTask />
    </div>
  );
};

export default TaskList;
