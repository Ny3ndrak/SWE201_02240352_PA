import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type TasksScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  navigation: TasksScreenNavigationProp;
}

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  category: string;
  dueDate: string;
}

/**
 * TasksScreen Component
 * Displays a searchable list of tasks with completion tracking
 * Implements: List rendering, Search functionality, Task completion toggle
 */
const TasksScreen: React.FC<Props> = ({ navigation }) => {
  const { colors, fontSize } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock task data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'SWE201 Assignment 2',
      description: 'Complete cross-platform mobile app with animations and gestures',
      completed: false,
      priority: 'high',
      category: 'Assignment',
      dueDate: 'Today',
    },
    {
      id: '2',
      title: 'DIS303 Cryptology Homework',
      description: 'RSA encryption and digital signatures problems',
      completed: false,
      priority: 'high',
      category: 'Homework',
      dueDate: 'Tomorrow',
    },
    {
      id: '3',
      title: 'SDA202 Architecture Assignment 2',
      description: 'System and administration architecture design document',
      completed: false,
      priority: 'high',
      category: 'Assignment',
      dueDate: 'Friday',
    },
    {
      id: '4',
      title: 'CTE205 Operating Systems Notes',
      description: 'Take notes on process scheduling and memory management',
      completed: true,
      priority: 'medium',
      category: 'Study',
      dueDate: 'Completed',
    },
    {
      id: '5',
      title: 'DIS303 Exam Preparation',
      description: 'Review cryptographic algorithms and protocols',
      completed: false,
      priority: 'high',
      category: 'Exam Prep',
      dueDate: 'Next Week',
    },
    {
      id: '6',
      title: 'SWE201 Project Documentation',
      description: 'Write report and prepare screenshots',
      completed: false,
      priority: 'medium',
      category: 'Documentation',
      dueDate: 'This Week',
    },
    {
      id: '7',
      title: 'CTE205 Lab Exercise',
      description: 'Complete shell scripting and system calls lab',
      completed: true,
      priority: 'medium',
      category: 'Lab Work',
      dueDate: 'Completed',
    },
    {
      id: '8',
      title: 'SDA202 Research Paper',
      description: 'Read papers on cloud architecture patterns',
      completed: false,
      priority: 'low',
      category: 'Reading',
      dueDate: 'Next Week',
    },
  ]);

  // Filter tasks based on search query
  const filteredTasks = tasks.filter(
    task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTaskComplete = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#FF6B6B';
      case 'medium':
        return '#FFD93D';
      case 'low':
        return '#4ECDC4';
      default:
        return colors.textSecondary;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'exclamation-circle' as const;
      case 'medium':
        return 'info-circle' as const;
      case 'low':
        return 'minus-circle' as const;
      default:
        return 'info-circle' as const;
    }
  };

  const renderTaskItem = ({ item }: { item: Task }) => (
    <TouchableOpacity
      style={[
        styles.taskCard,
        { backgroundColor: colors.card, borderColor: colors.border },
        item.completed && styles.completedTask,
      ]}
      onPress={() =>
        navigation.navigate('TaskDetail', {
          title: item.title,
          description: item.description,
          completed: item.completed,
          priority: item.priority,
          category: item.category,
          dueDate: item.dueDate,
        })
      }
      activeOpacity={0.7}
    >
      <TouchableOpacity
        style={[
          styles.checkbox,
          { borderColor: colors.border },
          item.completed && { backgroundColor: colors.accent },
        ]}
        onPress={() => toggleTaskComplete(item.id)}
      >
        {item.completed && <AntDesign name="check" size={18} color="#FFFFFF" />}
      </TouchableOpacity>

      <View style={styles.taskContent}>
        <View style={styles.taskHeader}>
          <Text
            style={[
              styles.taskTitle,
              { color: colors.textPrimary, fontSize: fontSize.md },
              item.completed && { textDecorationLine: 'line-through', color: colors.textSecondary },
            ]}
          >
            {item.title}
          </Text>
          <AntDesign
            name={getPriorityIcon(item.priority)}
            size={16}
            color={getPriorityColor(item.priority)}
          />
        </View>
        <Text
          style={[
            styles.taskDescription,
            { color: colors.textSecondary, fontSize: fontSize.sm },
            item.completed && { textDecorationLine: 'line-through' },
          ]}
          numberOfLines={1}
        >
          {item.description}
        </Text>
        <View style={styles.taskFooter}>
          <View style={[styles.categoryBadge, { backgroundColor: colors.accent + '20' }]}>
            <Text style={[styles.categoryText, { color: colors.accent, fontSize: fontSize.xs }]}>
              {item.category}
            </Text>
          </View>
          <Text style={[styles.dueDateText, { color: colors.textSecondary, fontSize: fontSize.xs }]}>
            {item.dueDate}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <AntDesign name="search" size={20} color={colors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: colors.textPrimary, fontSize: fontSize.md }]}
          placeholder="Search tasks..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <AntDesign name="close-circle" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Task Stats */}
      <View style={styles.statsContainer}>
        <View style={[styles.statBox, { backgroundColor: colors.card }]}>
          <Text style={[styles.statNumber, { color: colors.accent, fontSize: fontSize.xl }]}>
            {tasks.filter(t => !t.completed).length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary, fontSize: fontSize.xs }]}>
            Active
          </Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: colors.card }]}>
          <Text style={[styles.statNumber, { color: '#4ECDC4', fontSize: fontSize.xl }]}>
            {tasks.filter(t => t.completed).length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary, fontSize: fontSize.xs }]}>
            Completed
          </Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: colors.card }]}>
          <Text style={[styles.statNumber, { color: '#FF6B6B', fontSize: fontSize.xl }]}>
            {tasks.filter(t => t.priority === 'high' && !t.completed).length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary, fontSize: fontSize.xs }]}>
            Urgent
          </Text>
        </View>
      </View>

      {/* Task List */}
      <FlatList
        data={filteredTasks}
        renderItem={renderTaskItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <AntDesign name="check-circle" size={50} color={colors.textSecondary} />
            <Text style={[styles.emptyText, { color: colors.textSecondary, fontSize: fontSize.md }]}>
              No tasks found
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statNumber: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    textTransform: 'uppercase',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  completedTask: {
    opacity: 0.6,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  taskContent: {
    flex: 1,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  taskTitle: {
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  taskDescription: {
    marginBottom: 8,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    fontWeight: '500',
  },
  dueDateText: {
    fontStyle: 'italic',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 15,
  },
});

export default TasksScreen;
