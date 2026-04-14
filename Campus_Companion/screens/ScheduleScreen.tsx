import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  Dimensions, 
  Platform,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext';

// Class data structure
interface ClassPeriod {
  time: string;
  subject: string;
  room: string;
  instructor: string;
}

interface DaySchedule {
  day: string;
  classes: (ClassPeriod | null)[];
}

/**
 * ScheduleScreen Component
 * Displays weekly class timetable in a responsive grid layout
 * Uses ScrollView for content that may overflow on smaller screens
 * Implements responsive design with Dimensions API and Flexbox
 */
const ScheduleScreen: React.FC = () => {
  const { colors, fontSize, shadows, spacing } = useTheme();
  const { width, height } = Dimensions.get('window');
  
  // Determine if device is in landscape or has large screen
  const isLargeScreen = width > 600;
  
  // Time slots for the day
  const timeSlots = [
    '9:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 1:00',
    '1:00 - 2:00',
    '2:00 - 3:00',
    '3:00 - 4:00',
  ];

  // Sample weekly schedule data
  const weekSchedule: DaySchedule[] = [
    {
      day: 'Monday',
      classes: [
        { time: '9:00 - 10:00', subject: 'SWE201 - Cross Platform', room: 'Lab 1', instructor: 'Dr. Tashi D.' },
        { time: '10:00 - 11:00', subject: 'SWE201 - Cross Platform', room: 'Lab 1', instructor: 'Dr. Tashi D.' },
        null, // Break
        { time: '12:00 - 1:00', subject: 'Database Systems', room: 'Room 302', instructor: 'Ms. Pema L.' },
        null, // Lunch
        { time: '2:00 - 3:00', subject: 'Software Testing', room: 'Lab 2', instructor: 'Mr. Karma W.' },
        { time: '3:00 - 4:00', subject: 'Software Testing', room: 'Lab 2', instructor: 'Mr. Karma W.' },
      ],
    },
    {
      day: 'Tuesday',
      classes: [
        { time: '9:00 - 10:00', subject: 'Web Technologies', room: 'Lab 3', instructor: 'Dr. Sonam C.' },
        { time: '10:00 - 11:00', subject: 'Web Technologies', room: 'Lab 3', instructor: 'Dr. Sonam C.' },
        { time: '11:00 - 12:00', subject: 'Data Structures', room: 'Room 201', instructor: 'Mr. Ugyen T.' },
        null, // Lunch
        null,
        { time: '2:00 - 3:00', subject: 'Computer Networks', room: 'Room 305', instructor: 'Ms. Deki Y.' },
        null,
      ],
    },
    {
      day: 'Wednesday',
      classes: [
        { time: '9:00 - 10:00', subject: 'Mobile Development', room: 'Lab 1', instructor: 'Dr. Tashi D.' },
        { time: '10:00 - 11:00', subject: 'Mobile Development', room: 'Lab 1', instructor: 'Dr. Tashi D.' },
        { time: '11:00 - 12:00', subject: 'Algorithm Design', room: 'Room 204', instructor: 'Mr. Tshering D.' },
        null,
        null,
        { time: '2:00 - 3:00', subject: 'Project Work', room: 'Lab 2', instructor: 'Ms. Sangay C.' },
        { time: '3:00 - 4:00', subject: 'Project Work', room: 'Lab 2', instructor: 'Ms. Sangay C.' },
      ],
    },
    {
      day: 'Thursday',
      classes: [
        { time: '9:00 - 10:00', subject: 'Database Systems', room: 'Room 302', instructor: 'Ms. Pema L.' },
        { time: '10:00 - 11:00', subject: 'Database Systems', room: 'Room 302', instructor: 'Ms. Pema L.' },
        null,
        { time: '12:00 - 1:00', subject: 'Software Engineering', room: 'Room 201', instructor: 'Dr. Sonam C.' },
        null,
        { time: '2:00 - 3:00', subject: 'Computer Networks', room: 'Room 305', instructor: 'Ms. Deki Y.' },
        null,
      ],
    },
    {
      day: 'Friday',
      classes: [
        { time: '9:00 - 10:00', subject: 'SWE201 Lab', room: 'Lab 1', instructor: 'Dr. Tashi D.' },
        { time: '10:00 - 11:00', subject: 'SWE201 Lab', room: 'Lab 1', instructor: 'Dr. Tashi D.' },
        { time: '11:00 - 12:00', subject: 'Free Period', room: 'Library', instructor: 'Self Study' },
        null,
        null,
        null,
        null,
      ],
    },
  ];

  /**
   * Render individual class period
   */
  const renderClassPeriod = (classInfo: ClassPeriod | null, index: number) => {
    if (!classInfo) {
      return (
        <View
          key={index}
          style={[
            styles.classSlot,
            styles.emptySlot,
            { 
              backgroundColor: colors.backgroundSecondary,
              borderColor: colors.borderLight,
            },
          ]}
        >
          <Text style={[styles.breakText, { color: colors.textSecondary, fontSize: fontSize.xs }]}>
            {index === 2 ? 'Break' : index === 4 ? 'Lunch' : 'Free'}
          </Text>
        </View>
      );
    }

    return (
      <View
        key={index}
        style={[
          styles.classSlot,
          {
            backgroundColor: colors.card,
            borderColor: colors.accent,
            ...shadows.small,
          },
        ]}
      >
        <Text 
          style={[
            styles.subjectText, 
            { color: colors.primary, fontSize: isLargeScreen ? fontSize.sm : fontSize.xs }
          ]}
          numberOfLines={2}
        >
          {classInfo.subject}
        </Text>
        <Text 
          style={[
            styles.roomText, 
            { color: colors.textSecondary, fontSize: isLargeScreen ? fontSize.xs : fontSize.xxs }
          ]}
          numberOfLines={1}
        >
          <AntDesign name="enviromento" size={isLargeScreen ? fontSize.xs : fontSize.xxs} /> {classInfo.room}
        </Text>
        <Text 
          style={[
            styles.instructorText, 
            { color: colors.textSecondary, fontSize: isLargeScreen ? fontSize.xs : fontSize.xxs }
          ]}
          numberOfLines={1}
        >
          <AntDesign name="user" size={isLargeScreen ? fontSize.xs : fontSize.xxs} /> {classInfo.instructor}
        </Text>
      </View>
    );
  };

  /**
   * Render day schedule
   */
  const renderDaySchedule = (daySchedule: DaySchedule, index: number) => {
    const today = new Date().getDay();
    const isToday = (today === 1 && index === 0) || // Monday
                    (today === 2 && index === 1) || // Tuesday
                    (today === 3 && index === 2) || // Wednesday
                    (today === 4 && index === 3) || // Thursday
                    (today === 5 && index === 4);   // Friday

    return (
      <View key={daySchedule.day} style={styles.dayContainer}>
        <View 
          style={[
            styles.dayHeader,
            {
              backgroundColor: isToday ? colors.accent : colors.primary,
            },
          ]}
        >
          <Text style={[styles.dayText, { fontSize: fontSize.md }]}>
            {daySchedule.day} {isToday && '(Today)'}
          </Text>
        </View>
        <View style={styles.classesContainer}>
          {daySchedule.classes.map((classInfo, idx) => renderClassPeriod(classInfo, idx))}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with info */}
      <View style={[styles.header, { backgroundColor: colors.backgroundSecondary }]}>
        <Text style={[styles.headerTitle, { color: colors.textPrimary, fontSize: fontSize.lg }]}>
          Weekly Class Schedule
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary, fontSize: fontSize.sm }]}>
          Software Engineering - Year 3, Semester 2
        </Text>
      </View>

      {/* Time slots legend */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={[styles.timeSlotsContainer, { backgroundColor: colors.card }]}
        contentContainerStyle={styles.timeSlotsContent}
      >
        <Text style={[styles.legendLabel, { color: colors.textSecondary, fontSize: fontSize.xs }]}>
          Time Slots:
        </Text>
        {timeSlots.map((slot, index) => (
          <View 
            key={index} 
            style={[
              styles.timeSlot, 
              { backgroundColor: colors.backgroundSecondary }
            ]}
          >
            <Text style={[styles.timeSlotText, { color: colors.textPrimary, fontSize: fontSize.xxs }]}>
              {slot}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Weekly schedule - scrollable */}
      <ScrollView
        style={styles.scheduleContainer}
        contentContainerStyle={[styles.scheduleContent, { paddingBottom: spacing.xl }]}
        showsVerticalScrollIndicator={true}
      >
        {weekSchedule.map((daySchedule, index) => renderDaySchedule(daySchedule, index))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontStyle: 'italic',
  },
  timeSlotsContainer: {
    maxHeight: 50,
  },
  timeSlotsContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  legendLabel: {
    fontWeight: 'bold',
    marginRight: 12,
  },
  timeSlot: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  timeSlotText: {
    fontWeight: '600',
  },
  scheduleContainer: {
    flex: 1,
  },
  scheduleContent: {
    padding: 16,
  },
  dayContainer: {
    marginBottom: 20,
  },
  dayHeader: {
    padding: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  dayText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  classesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#E0E0E0',
    padding: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  classSlot: {
    width: '48%',
    minHeight: 70,
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
  },
  emptySlot: {
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  breakText: {
    fontStyle: 'italic',
    fontWeight: '600',
  },
  subjectText: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  roomText: {
    marginBottom: 2,
  },
  instructorText: {
    fontStyle: 'italic',
  },
});

export default ScheduleScreen;
