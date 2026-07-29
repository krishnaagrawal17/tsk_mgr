import { create } from 'zustand';
import { supabase } from '../lib/supabase';

const useTaskStore = create((set, get) => ({
  tasks: [],
  isLoading: false,

  fetchTasks: async (userId) => {
    if (!userId) return;
    set({ isLoading: true });
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      set({ tasks: data });
    }
    set({ isLoading: false });
  },

  addTask: async (title, priority, userId) => {
    if (!userId) return;
    
    // Optimistic UI can be complex with UUIDs generated on the server,
    // so we'll wait for the server response to ensure we have the real ID.
    const newTask = {
      title,
      priority: priority || 'medium',
      status: 'pending',
      user_id: userId
    };

    const { data, error } = await supabase
      .from('tasks')
      .insert([newTask])
      .select()
      .single();

    if (!error && data) {
      set((state) => ({
        tasks: [data, ...state.tasks]
      }));
    }
  },

  updateTaskStatus: async (id, status) => {
    // Optimistic update
    set((state) => ({
      tasks: state.tasks.map(task => 
        task.id === id ? { ...task, status } : task
      )
    }));

    await supabase
      .from('tasks')
      .update({ status })
      .eq('id', id);
  },

  updateTaskPriority: async (id, priority) => {
    // Optimistic update
    set((state) => ({
      tasks: state.tasks.map(task => 
        task.id === id ? { ...task, priority } : task
      )
    }));

    await supabase
      .from('tasks')
      .update({ priority })
      .eq('id', id);
  },

  deleteTask: async (id) => {
    // Optimistic update
    set((state) => ({
      tasks: state.tasks.filter(task => task.id !== id)
    }));

    await supabase
      .from('tasks')
      .delete()
      .eq('id', id);
  },

  subtasks: [],

  fetchSubtasks: async (userId) => {
    if (!userId) return;
    const { data, error } = await supabase
      .from('subtasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      set({ subtasks: data });
    }
  },

  addSubtask: async (title, taskId, userId) => {
    if (!userId) return;
    
    const newSubtask = {
      title,
      task_id: taskId,
      user_id: userId,
      status: 'pending'
    };

    const { data, error } = await supabase
      .from('subtasks')
      .insert([newSubtask])
      .select()
      .single();

    if (!error && data) {
      set((state) => ({
        subtasks: [...state.subtasks, data]
      }));
    }
  },

  updateSubtaskStatus: async (id, status) => {
    set((state) => ({
      subtasks: state.subtasks.map(st => 
        st.id === id ? { ...st, status } : st
      )
    }));

    await supabase
      .from('subtasks')
      .update({ status })
      .eq('id', id);
  },

  deleteSubtask: async (id) => {
    set((state) => ({
      subtasks: state.subtasks.filter(st => st.id !== id)
    }));

    await supabase
      .from('subtasks')
      .delete()
      .eq('id', id);
  }
}));

export default useTaskStore;
