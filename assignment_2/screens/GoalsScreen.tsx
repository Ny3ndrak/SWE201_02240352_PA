import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext';

const { width } = Dimensions.get('window');

interface Goal {
  id: string;
  title: string;
  category: string;
  icon: keyof typeof AntDesign.glyphMap;
  progress: number;
  target: number;
  color: string;
}

/**
 * GoalsScreen Component
 * Displays student goals with progress tracking
 * Implements: Progress bars, Visual indicators, Responsive layout
 */
const GoalsScreen: React.FC = () => {
  const { colors, fontSize } = useTheme();

  const goals: Goal[] = [
    {
      id: '1',
      title: 'Complete 50 Assignments',
      category: 'Academic',
      icon: 'file-text',
      progress: 35,
      target: 50,
      color: '#4A90E2',
    },
    {
      id: '2',
      title: 'Read 20 Books',
      category: 'Personal',
      icon: 'book',
      progress: 12,
      target: 20,
      color: '#FF6B6B',
    },
    {
      id: '3',
      title: 'Achieve GPA 3.5+',
      category: 'Academic',
      icon: 'trophy',
      progress: 3.2,
      target: 3.5,
      color: '#FFD93D',
    },
    {
      id: '4',
      title: 'Attend 40 Study Sessions',
      category: 'Study',
      icon: 'team',
      progress: 28,
      target: 40,
      color: '#7B68EE',
    },
    {
      id: '5',
      title: 'Complete 10 Projects',
      category: 'Projects',
      icon: 'code',
      progress: 6,
      target: 10,
      color: '#4ECDC4',
    },
    {
      id: '6',
      title: 'Practice 100 Hours',
      category: 'Skill Development',
      icon: 'clock-circle',
      progress: 67,
      target: 100,
      color: '#9B59B6',
    },
  ];

  const calculatePercentage = (progress: number, target: number) => {
    return Math.min((progress / target) * 100, 100);
  };

  const renderGoalCard = (goal: Goal) => {
    const percentage = calculatePercentage(goal.progress, goal.target);
    const isCompleted = percentage >= 100;

    return (
      <View
        key={goal.id}
        style={[styles.goalCard, { backgroundColor: colors.card, borderColor: colors.border }]}
      >
        <View style={styles.goalHeader}>
          <View style={[styles.iconContainer, { backgroundColor: goal.color + '20' }]}>
            <AntDesign name={goal.icon} size={24} color={goal.color} />
          </View>
          {isCompleted && (
            <View style={[styles.completedBadge, { backgroundColor: '#4ECDC4' }]}>
              <AntDesign name="check-circle" size={16} color="#FFFFFF" />
              <Text style={[styles.completedText, { fontSize: fontSize.xs }]}>
                Completed
              </Text>
            </View>
          )}
        </View>

        <Text style={[styles.goalTitle, { color: colors.textPrimary, fontSize: fontSize.lg }]}>
          {goal.title}
        </Text>

        <View style={[styles.categoryBadge, { backgroundColor: goal.color + '15' }]}>
          <Text style={[styles.categoryText, { color: goal.color, fontSize: fontSize.xs }]}>
            {goal.category}
          </Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressTextRow}>
            <Text style={[styles.progressText, { color: colors.textSecondary, fontSize: fontSize.sm }]}>
              Progress: {goal.progress}/{goal.target}
            </Text>
            <Text style={[styles.percentageText, { color: goal.color, fontSize: fontSize.sm }]}>
              {percentage.toFixed(0)}%
            </Text>
          </View>
          <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${percentage}%`,
                  backgroundColor: goal.color,
                },
              ]}
            />
          </View>
        </View>
      </View>
    );
  };

  const completedGoals = goals.filter(g => calculatePercentage(g.progress, g.target) >= 100).length;
  const totalGoals = goals.length;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Summary Header */}
      <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
        <View style={styles.summaryContent}>
          <AntDesign name="trophy" size={40} color={colors.accent} />
          <View style={styles.summaryText}>
            <Text style={[styles.summaryTitle, { color: colors.textPrimary, fontSize: fontSize.xxl }]}>
              Your Goals
            </Text>
            <Text style={[styles.summarySubtitle, { color: colors.textSecondary, fontSize: fontSize.md }]}>
              Track your progress and achieve more
            </Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.accent, fontSize: fontSize.xl }]}>
              {totalGoals}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary, fontSize: fontSize.sm }]}>
              Total Goals
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#4ECDC4', fontSize: fontSize.xl }]}>
              {completedGoals}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary, fontSize: fontSize.sm }]}>
              Completed
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#FFD93D', fontSize: fontSize.xl }]}>
              {totalGoals - completedGoals}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary, fontSize: fontSize.sm }]}>
              In Progress
            </Text>
          </View>
        </View>
      </View>

      {/* Goals List */}
      <View style={styles.goalsContainer}>
        {goals.map(goal => renderGoalCard(goal))}
      </View>

      {/* Motivational Footer */}
      <View style={[styles.motivationCard, { backgroundColor: colors.accent }]}>
        <AntDesign name="star" size={30} color="#FFFFFF" />
        <Text style={[styles.motivationText, { fontSize: fontSize.lg }]}>
          Keep going! You're doing great! 🎯
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  summaryCard: {
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryText: {
    flex: 1,
    marginLeft: 15,
  },
  summaryTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  summarySubtitle: {
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  statNumber: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
  },
  goalsContainer: {
    paddingHorizontal: 15,
  },
  goalCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  completedText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 5,
  },
  goalTitle: {
    fontWeight: '600',
    marginBottom: 10,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 15,
  },
  categoryText: {
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  progressContainer: {
    marginTop: 5,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontWeight: '500',
  },
  percentageText: {
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  motivationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  motivationText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 15,
  },
});

export default GoalsScreen;
