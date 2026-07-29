import { create } from 'zustand';

const useTaskStore = create((set) => ({
  tasks: [
    { id: 1, title: 'Finish homework', completed: false },
    { id: 2, title: 'Call John', completed: false },
    { id: 3, title: 'Buy groceries', completed: false },
  ],
  addTask: (title) => set((state) => ({
    tasks: [...state.tasks, { id: Date.now(), title, completed: false }]
  })),
  toggleTask: (id) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    )
  })),
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter(task => task.id !== id)
  }))
}));

export default useTaskStore;
