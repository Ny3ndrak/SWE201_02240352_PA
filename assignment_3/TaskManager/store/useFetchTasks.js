import { useEffect, useState } from 'react';
import { getTasks } from '../api/tasks';
import { getCategories } from '../api/categories';
import useTaskStore from '../store/useTaskStore';

// Custom hook — fetches tasks and categories, puts them in global store
export function useFetchTasks() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setTasks = useTaskStore((s) => s.setTasks);
  const setCategories = useTaskStore((s) => s.setCategories);

  const fetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const [tasksRes, catsRes] = await Promise.all([
        getTasks(),
        getCategories(),
      ]);
      setTasks(tasksRes.data);
      setCategories(catsRes.data);
    } catch (e) {
      if (!e.response) {
        setError('Network error. Check your connection.');
      } else if (e.response.status >= 500) {
        setError('Server error. Try again later.');
      } else {
        setError(e.response.data?.message || 'Something went wrong.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { loading, error, refetch: fetch };
}