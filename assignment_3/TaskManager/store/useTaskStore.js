import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useTaskStore = create(
  persist(
    (set, get) => ({
      // State
      tasks: [],
      categories: [],
      user: null,
      token: null,
      filterStatus: 'all',
      searchQuery: '',

      // Task actions
      setTasks: (tasks) => set({ tasks }),
      addTask: (task) => set((s) => ({ tasks: [task, ...s.tasks] })),
      updateTask: (id, data) =>
        set((s) => ({
          tasks: s.tasks.map((t) =>
            String(t.id) === String(id) ? { ...t, ...data } : t
          ),
        })),
      removeTask: (id) =>
        set((s) => ({
          tasks: s.tasks.filter((t) => String(t.id) !== String(id)),
        })),

      // Category actions
      setCategories: (categories) => set({ categories }),

      // Auth actions
      setUser: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),

      // Filter actions
      setFilter: (filterStatus) => set({ filterStatus }),
      setSearch: (searchQuery) => set({ searchQuery }),

      // Selector
      getFilteredTasks: () => {
        const { tasks, filterStatus, searchQuery } = get();
        return tasks
          .filter((t) =>
            filterStatus === 'all' ? true : t.status === filterStatus
          )
          .filter((t) =>
            t.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
      },
    }),
    {
      name: 'task-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        token: s.token,
        user: s.user,
        filterStatus: s.filterStatus,
      }),
    }
  )
);

export { useTaskStore };
export default useTaskStore;