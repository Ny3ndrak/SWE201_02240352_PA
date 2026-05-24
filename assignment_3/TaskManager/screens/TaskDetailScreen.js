import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ActivityIndicator, Alert, ScrollView
} from 'react-native';
import { useTaskStore } from '../store/useTaskStore';
import { deleteTask } from '../api/tasks';

export default function TaskDetailScreen({ route, navigation }) {
  const { taskId } = route.params;
  const [loading, setLoading] = useState(false);

  const tasks = useTaskStore((s) => s.tasks);
  const categories = useTaskStore((s) => s.categories);
  const removeTask = useTaskStore((s) => s.removeTask);

  const task = tasks.find((t) => String(t.id) === String(taskId));
  const category = categories.find((c) => String(c.id) === String(task?.category_id));

  if (!task) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Task not found.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backLink}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getStatusColor = (status) => {
    const colors = { pending: '#F59E0B', 'in-progress': '#3B82F6', done: '#10B981' };
    return colors[status] || '#6B7280';
  };

  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          setLoading(true);
          try {
            await deleteTask(taskId);
            removeTask(taskId);
            navigation.goBack();
          } catch (e) {
            Alert.alert('Error', 'Failed to delete. Try again.');
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(task.status) }]}>
          <Text style={styles.statusText}>{task.status}</Text>
        </View>

        <Text style={styles.title}>{task.title}</Text>

        {category && (
          <View style={[styles.categoryBadge, { backgroundColor: category.color + '20' }]}>
            <View style={[styles.categoryDot, { backgroundColor: category.color }]} />
            <Text style={[styles.categoryText, { color: category.color }]}>{category.name}</Text>
          </View>
        )}

        <Text style={styles.sectionLabel}>Description</Text>
        <Text style={styles.description}>{task.description || 'No description provided.'}</Text>

        <Text style={styles.sectionLabel}>Created</Text>
        <Text style={styles.meta}>{task.created_at?.split('T')[0]}</Text>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditTask', { taskId: task.id })}
      >
        <Text style={styles.editButtonText}>Edit Task</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.deleteButtonText}>Delete Task</Text>
        }
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 16 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: '#EF4444', fontSize: 16 },
  backLink: { color: '#4F46E5', marginTop: 12 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 16, elevation: 2 },
  statusBadge: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginBottom: 12 },
  statusText: { color: '#fff', fontWeight: '600', textTransform: 'capitalize' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
  categoryBadge: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginBottom: 16 },
  categoryDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  categoryText: { fontWeight: '600', fontSize: 13 },
  sectionLabel: { fontSize: 12, fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 6, marginTop: 12 },
  description: { fontSize: 16, color: '#374151', lineHeight: 24 },
  meta: { fontSize: 14, color: '#6B7280' },
  editButton: { backgroundColor: '#4F46E5', padding: 14, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  editButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  deleteButton: { backgroundColor: '#EF4444', padding: 14, borderRadius: 12, alignItems: 'center', marginBottom: 32 },
  deleteButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});