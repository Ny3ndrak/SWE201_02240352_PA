import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';

type TaskDetailRouteProp = RouteProp<RootStackParamList, 'TaskDetail'>;

interface Props {
  route: TaskDetailRouteProp;
}

/**
 * TaskDetailScreen Component
 * Displays detailed information about a specific task
 * Implements: Parameter receiving, Styled layout, Action buttons
 */
const TaskDetailScreen: React.FC<Props> = ({ route }) => {
  const { colors, fontSize } = useTheme();
  const { title, description, completed, priority, category, dueDate } = route.params;

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

  const getPriorityLabel = (priority: string) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1) + ' Priority';
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Status Banner */}
      <View
        style={[
          styles.statusBanner,
          { backgroundColor: completed ? '#4ECDC4' : colors.accent },
        ]}
      >
        <AntDesign
          name={completed ? 'check-circle' : 'clock-circle'}
          size={24}
          color="#FFFFFF"
        />
        <Text style={[styles.statusText, { fontSize: fontSize.md }]}>
          {completed ? 'Task Completed' : 'In Progress'}
        </Text>
      </View>

      {/* Task Title */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <View style={styles.iconHeader}>
          <AntDesign name="file-text" size={24} color={colors.accent} />
          <Text style={[styles.sectionLabel, { color: colors.textSecondary, fontSize: fontSize.sm }]}>
            TASK TITLE
          </Text>
        </View>
        <Text style={[styles.title, { color: colors.textPrimary, fontSize: fontSize.xl }]}>
          {title}
        </Text>
      </View>

      {/* Task Description */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <View style={styles.iconHeader}>
          <AntDesign name="info-circle" size={24} color={colors.accent} />
          <Text style={[styles.sectionLabel, { color: colors.textSecondary, fontSize: fontSize.sm }]}>
            DESCRIPTION
          </Text>
        </View>
        <Text style={[styles.description, { color: colors.textPrimary, fontSize: fontSize.md }]}>
          {description}
        </Text>
      </View>

      {/* Task Details Grid */}
      <View style={styles.detailsGrid}>
        {/* Priority */}
        <View style={[styles.detailCard, { backgroundColor: colors.card }]}>
          <AntDesign name="flag" size={24} color={getPriorityColor(priority)} />
          <Text style={[styles.detailLabel, { color: colors.textSecondary, fontSize: fontSize.xs }]}>
            PRIORITY
          </Text>
          <Text style={[styles.detailValue, { color: getPriorityColor(priority), fontSize: fontSize.md }]}>
            {getPriorityLabel(priority)}
          </Text>
        </View>

        {/* Category */}
        <View style={[styles.detailCard, { backgroundColor: colors.card }]}>
          <AntDesign name="tags" size={24} color={colors.accent} />
          <Text style={[styles.detailLabel, { color: colors.textSecondary, fontSize: fontSize.xs }]}>
            CATEGORY
          </Text>
          <Text style={[styles.detailValue, { color: colors.textPrimary, fontSize: fontSize.md }]}>
            {category}
          </Text>
        </View>

        {/* Due Date */}
        <View style={[styles.detailCard, { backgroundColor: colors.card }]}>
          <AntDesign name="calendar" size={24} color={colors.accent} />
          <Text style={[styles.detailLabel, { color: colors.textSecondary, fontSize: fontSize.xs }]}>
            DUE DATE
          </Text>
          <Text style={[styles.detailValue, { color: colors.textPrimary, fontSize: fontSize.md }]}>
            {dueDate}
          </Text>
        </View>

        {/* Status */}
        <View style={[styles.detailCard, { backgroundColor: colors.card }]}>
          <AntDesign
            name={completed ? 'check-circle' : 'clock-circle'}
            size={24}
            color={completed ? '#4ECDC4' : colors.accent}
          />
          <Text style={[styles.detailLabel, { color: colors.textSecondary, fontSize: fontSize.xs }]}>
            STATUS
          </Text>
          <Text style={[styles.detailValue, { color: colors.textPrimary, fontSize: fontSize.md }]}>
            {completed ? 'Completed' : 'Active'}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.accent }]}
          activeOpacity={0.8}
        >
          <AntDesign name="edit" size={20} color="#FFFFFF" />
          <Text style={[styles.actionButtonText, { fontSize: fontSize.md }]}>
            Edit Task
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: completed ? '#FF6B6B' : '#4ECDC4' }]}
          activeOpacity={0.8}
        >
          <AntDesign name={completed ? 'close-circle' : 'check-circle'} size={20} color="#FFFFFF" />
          <Text style={[styles.actionButtonText, { fontSize: fontSize.md }]}>
            {completed ? 'Mark Incomplete' : 'Mark Complete'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.deleteButton, { borderColor: '#FF6B6B' }]}
          activeOpacity={0.8}
        >
          <AntDesign name="delete" size={20} color="#FF6B6B" />
          <Text style={[styles.deleteButtonText, { fontSize: fontSize.md }]}>
            Delete Task
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notes Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <View style={styles.iconHeader}>
          <AntDesign name="form" size={24} color={colors.accent} />
          <Text style={[styles.sectionLabel, { color: colors.textSecondary, fontSize: fontSize.sm }]}>
            NOTES
          </Text>
        </View>
        <Text style={[styles.notesPlaceholder, { color: colors.textSecondary, fontSize: fontSize.sm }]}>
          No additional notes for this task
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginBottom: 20,
  },
  statusText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 10,
  },
  section: {
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionLabel: {
    fontWeight: '600',
    marginLeft: 10,
    letterSpacing: 1,
  },
  title: {
    fontWeight: 'bold',
    lineHeight: 28,
  },
  description: {
    lineHeight: 22,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  detailCard: {
    width: '48%',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  detailLabel: {
    fontWeight: '600',
    marginTop: 8,
    letterSpacing: 0.5,
  },
  detailValue: {
    fontWeight: '600',
    marginTop: 5,
    textAlign: 'center',
  },
  actionContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  deleteButtonText: {
    color: '#FF6B6B',
    fontWeight: '600',
    marginLeft: 8,
  },
  notesPlaceholder: {
    fontStyle: 'italic',
  },
});

export default TaskDetailScreen;
