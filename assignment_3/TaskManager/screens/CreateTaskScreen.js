import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, ScrollView, Alert
} from 'react-native';
import { createTask } from '../api/tasks';
import { useTaskStore } from '../store/useTaskStore';
import { useForm } from '../hooks/useForm';

const STATUS_OPTIONS = ['pending', 'in-progress', 'done'];

export default function CreateTaskScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const { values, errors, setValue, validate } = useForm({
    title: '',
    description: '',
    status: 'pending',
    category_id: '',
  });

  const addTask = useTaskStore((s) => s.addTask);
  const categories = useTaskStore((s) => s.categories);

  const handleCreate = async () => {
    const valid = validate({
      title: { required: true, min: 3, max: 100 },
      description: { required: true, min: 5 },
    });
    if (!valid) return;

    setLoading(true);
    try {
      const res = await createTask({
        title: values.title,
        description: values.description,
        status: values.status,
        category_id: values.category_id || null,
      });
      addTask(res.data);
      Alert.alert('Success', 'Task created successfully!');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', e.message || 'Failed to create task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>New Task</Text>

      <Text style={styles.label}>Title *</Text>
      <TextInput
        style={[styles.input, errors.title && styles.inputError]}
        placeholder="Enter task title"
        value={values.title}
        onChangeText={(v) => setValue('title', v)}
      />
      {errors.title && <Text style={styles.error}>{errors.title}</Text>}

      <Text style={styles.label}>Description *</Text>
      <TextInput
        style={[styles.input, styles.textArea, errors.description && styles.inputError]}
        placeholder="Enter task description"
        value={values.description}
        onChangeText={(v) => setValue('description', v)}
        multiline
        numberOfLines={4}
      />
      {errors.description && <Text style={styles.error}>{errors.description}</Text>}

      <Text style={styles.label}>Status</Text>
      <View style={styles.optionRow}>
        {STATUS_OPTIONS.map((s) => (
          <TouchableOpacity
            key={s}
            style={[styles.optionBtn, values.status === s && styles.optionBtnActive]}
            onPress={() => setValue('status', s)}
          >
            <Text style={[styles.optionText, values.status === s && styles.optionTextActive]}>
              {s}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Category</Text>
      <View style={styles.optionRow}>
        {categories.map((c) => (
          <TouchableOpacity
            key={c.id}
            style={[
              styles.optionBtn,
              values.category_id === String(c.id) && { backgroundColor: c.color, borderColor: c.color }
            ]}
            onPress={() => setValue('category_id', String(c.id))}
          >
            <Text style={[
              styles.optionText,
              values.category_id === String(c.id) && styles.optionTextActive
            ]}>
              {c.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleCreate}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>Create Task</Text>
        }
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 24 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 6, marginTop: 16 },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 12, fontSize: 16 },
  textArea: { height: 100, textAlignVertical: 'top' },
  inputError: { borderColor: '#EF4444' },
  error: { color: '#EF4444', fontSize: 12, marginTop: 4 },
  optionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#D1D5DB' },
  optionBtnActive: { backgroundColor: '#4F46E5', borderColor: '#4F46E5' },
  optionText: { fontSize: 13, color: '#6B7280', textTransform: 'capitalize' },
  optionTextActive: { color: '#fff' },
  button: { backgroundColor: '#4F46E5', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 32, marginBottom: 40 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});