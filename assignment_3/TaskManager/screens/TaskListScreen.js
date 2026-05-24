import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, ActivityIndicator, TextInput, Alert
} from 'react-native';
import { useTaskStore } from '../store/useTaskStore';
import { useFetchTasks } from '../hooks/useFetchTasks';
import { deleteTask } from '../api/tasks';

const STATUS_FILTERS = ['all', 'pending', 'in-progress', 'done'];

export default function TaskListScreen({ navigation }) {
  const { loading, error, refetch } = useFetchTasks();
  const getFilteredTasks = useTaskStore((s) => s.getFilteredTasks);
  const filterStatus = useTaskStore((s) => s.filterStatus);
  const searchQuery = useTaskStore((s) => s.searchQuery);
  const setFilter = useTaskStore((s) => s.setFilter);
  const setSearch = useTaskStore((s) => s.setSearch);
  const removeTask = useTaskStore((s) => s.removeTask);
  const logout = useTaskStore((s) => s.logout);

  const tasks = getFilteredTasks();

  const handleDelete = (id) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteTask(id);
            removeTask(id);
          } catch (e) {
            Alert.alert('Error', 'Failed to delete task. Try again.');
          }
        },
      },
    ]);
  };

  const getStatusColor = (status) => {
    const colors = { pending: '#F59E0B', 'in-progress': '#3B82F6', done: '#10B981' };
    return colors[status] || '#6B7280';
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Loading tasks...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refetch}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tasks</Text>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search tasks..."
        value={searchQuery}
        onChangeText={setSearch}
      />

      {/* Filter buttons */}
      <View style={styles.filters}>
        {STATUS_FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filterStatus === f && styles.filterBtnActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filterStatus === f && styles.filterTextActive]}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Empty state */}
      {tasks.length === 0 && (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No tasks found.</Text>
          <Text style={styles.emptySubText}>Tap + to add your first task.</Text>
        </View>
      )}

      {/* Task list */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
          >
            <View style={styles.cardTop}>
              <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
            <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
            <View style={styles.cardActions}>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => navigation.navigate('EditTask', { taskId: item.id })}
              >
                <Text style={styles.editBtnText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.deleteBtnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* FAB - add button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateTask')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  loadingText: { marginTop: 12, color: '#6B7280' },
  errorText: { color: '#EF4444', textAlign: 'center', marginBottom: 16 },
  retryButton: { backgroundColor: '#4F46E5', padding: 12, borderRadius: 8 },
  retryText: { color: '#fff', fontWeight: '600' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#111827' },
  logoutText: { color: '#EF4444', fontWeight: '600' },
  searchInput: { margin: 12, padding: 10, borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, backgroundColor: '#fff', fontSize: 15 },
  filters: { flexDirection: 'row', paddingHorizontal: 12, marginBottom: 8, gap: 8 },
  filterBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#D1D5DB', backgroundColor: '#fff' },
  filterBtnActive: { backgroundColor: '#4F46E5', borderColor: '#4F46E5' },
  filterText: { fontSize: 12, color: '#6B7280', textTransform: 'capitalize' },
  filterTextActive: { color: '#fff' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyText: { fontSize: 18, fontWeight: '600', color: '#6B7280' },
  emptySubText: { color: '#9CA3AF', marginTop: 8 },
  card: { backgroundColor: '#fff', marginHorizontal: 12, marginVertical: 6, padding: 16, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#111827', flex: 1, marginRight: 8 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
  statusText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  cardDesc: { color: '#6B7280', fontSize: 14, marginBottom: 12 },
  cardActions: { flexDirection: 'row', gap: 8 },
  editBtn: { paddingHorizontal: 16, paddingVertical: 6, backgroundColor: '#EEF2FF', borderRadius: 6 },
  editBtnText: { color: '#4F46E5', fontWeight: '600', fontSize: 13 },
  deleteBtn: { paddingHorizontal: 16, paddingVertical: 6, backgroundColor: '#FEF2F2', borderRadius: 6 },
  deleteBtnText: { color: '#EF4444', fontWeight: '600', fontSize: 13 },
  fab: { position: 'absolute', bottom: 24, right: 24, backgroundColor: '#4F46E5', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 4 },
  fabText: { color: '#fff', fontSize: 28, lineHeight: 32 },
});