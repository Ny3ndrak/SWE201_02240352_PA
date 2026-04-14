import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  Dimensions, 
  Platform,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext';

// Notice data structure
interface Notice {
  id: string;
  title: string;
  description: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

/**
 * NoticeScreen Component
 * Displays campus notices and announcements using FlatList
 * Implements responsive design and dynamic styling based on priority
 * Uses Flexbox layout and Dimensions API for different screen sizes
 */
const NoticeScreen: React.FC = () => {
  const { colors, fontSize, shadows, spacing } = useTheme();
  const { width } = Dimensions.get('window');
  
  // Determine if device has large screen
  const isLargeScreen = width > 600;

  // Sample notices data
  const notices: Notice[] = [
    {
      id: '1',
      title: 'Mid-Semester Examinations',
      description: 'Mid-semester examinations for all year 3 students will be conducted from May 15-22, 2026. Please check the detailed schedule on the notice board.',
      date: 'April 12, 2026',
      priority: 'high',
      category: 'Academic',
    },
    {
      id: '2',
      title: 'Library Extended Hours',
      description: 'The library will remain open until 10:00 PM during the examination period to accommodate students who need study space.',
      date: 'April 10, 2026',
      priority: 'medium',
      category: 'Facility',
    },
    {
      id: '3',
      title: 'Coding Competition Registration',
      description: 'Annual inter-college coding competition will be held on May 5, 2026. Register at the IT department office by April 30.',
      date: 'April 8, 2026',
      priority: 'medium',
      category: 'Event',
    },
    {
      id: '4',
      title: 'Campus Network Maintenance',
      description: 'Campus Wi-Fi and internet services will be unavailable on April 18 from 12:00 AM to 6:00 AM due to scheduled maintenance.',
      date: 'April 7, 2026',
      priority: 'high',
      category: 'IT Services',
    },
    {
      id: '5',
      title: 'Cultural Night Event',
      description: 'Join us for the annual cultural night on April 25, 2026. Students are encouraged to participate in various cultural performances.',
      date: 'April 5, 2026',
      priority: 'low',
      category: 'Event',
    },
    {
      id: '6',
      title: 'Health Checkup Camp',
      description: 'Free health checkup camp for all students will be conducted on April 20-21, 2026 at the campus health center.',
      date: 'April 4, 2026',
      priority: 'medium',
      category: 'Health',
    },
    {
      id: '7',
      title: 'Shuttle Bus Schedule Update',
      description: 'New shuttle bus timings effective from April 15: Morning - 7:00 AM, 8:00 AM, 9:00 AM. Evening - 5:00 PM, 6:00 PM, 7:00 PM.',
      date: 'April 2, 2026',
      priority: 'medium',
      category: 'Transport',
    },
    {
      id: '8',
      title: 'New Cafeteria Menu',
      description: 'The cafeteria has introduced new menu items including healthy breakfast options and international cuisine. Check out the menu board for details.',
      date: 'March 30, 2026',
      priority: 'low',
      category: 'Food Services',
    },
  ];

  /**
   * Get priority-based styling
   * Demonstrates dynamic styling based on data
   */
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#DC2626'; // Red
      case 'medium':
        return '#F59E0B'; // Orange
      case 'low':
        return '#10B981'; // Green
      default:
        return colors.textSecondary;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'High Priority';
      case 'medium':
        return 'Medium Priority';
      case 'low':
        return 'Low Priority';
      default:
        return '';
    }
  };

  /**
   * Render individual notice item
   */
  const renderNoticeItem = ({ item }: { item: Notice }) => (
    <View
      style={[
        styles.noticeCard,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderLeftColor: getPriorityColor(item.priority),
          borderLeftWidth: 4,
          ...shadows.medium,
          // Responsive width for larger screens
          width: isLargeScreen ? '48%' : '100%',
          marginRight: isLargeScreen ? '2%' : 0,
        },
      ]}
    >
      {/* Notice Header */}
      <View style={styles.noticeHeader}>
        <Text 
          style={[
            styles.noticeTitle, 
            { color: colors.textPrimary, fontSize: fontSize.md }
          ]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <View 
          style={[
            styles.categoryBadge, 
            { backgroundColor: colors.backgroundSecondary }
          ]}
        >
          <Text 
            style={[
              styles.categoryText, 
              { color: colors.textSecondary, fontSize: fontSize.xxs }
            ]}
          >
            {item.category}
          </Text>
        </View>
      </View>

      {/* Notice Description */}
      <Text 
        style={[
          styles.noticeDescription, 
          { color: colors.textSecondary, fontSize: fontSize.sm }
        ]}
        numberOfLines={3}
      >
        {item.description}
      </Text>

      {/* Notice Footer */}
      <View style={styles.noticeFooter}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AntDesign name="calendar" size={fontSize.sm} color={colors.textSecondary} />
          <Text 
            style={[
              styles.noticeDate, 
              { color: colors.textSecondary, fontSize: fontSize.xs, marginLeft: 6 }
            ]}
          >
            {item.date}
          </Text>
        </View>
      </View>
    </View>
  );

  /**
   * Render header component
   */
  const renderHeader = () => (
    <View style={[styles.header, { backgroundColor: colors.backgroundSecondary }]}>
      <Text style={[styles.headerTitle, { color: colors.textPrimary, fontSize: fontSize.lg }]}>
        Campus Notice Board
      </Text>
      <Text style={[styles.headerSubtitle, { color: colors.textSecondary, fontSize: fontSize.sm }]}>
        Stay updated with latest announcements
      </Text>
    </View>
  );

  /**
   * Render empty list component
   */
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <AntDesign name="inbox" size={48} color={colors.textSecondary} />
      <Text style={[styles.emptyText, { color: colors.textSecondary, fontSize: fontSize.md }]}>
        No notices at the moment
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={notices}
        renderItem={renderNoticeItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={[
          styles.listContainer,
          { paddingBottom: spacing.xl },
          isLargeScreen && styles.gridContainer,
        ]}
        showsVerticalScrollIndicator={true}
        // Performance optimizations
        removeClippedSubviews={Platform.OS === 'android'}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={10}
        // For grid layout on large screens
        numColumns={isLargeScreen ? 2 : 1}
        key={isLargeScreen ? 'two-columns' : 'one-column'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 20,
  },
  gridContainer: {
    justifyContent: 'space-between',
  },
  header: {
    padding: 20,
    marginBottom: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontStyle: 'italic',
  },
  noticeCard: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  noticeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  noticeTitle: {
    fontWeight: 'bold',
    flex: 1,
    marginRight: 12,
    lineHeight: 22,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  categoryText: {
    fontWeight: '600',
  },
  noticeDescription: {
    marginBottom: 16,
    lineHeight: 22,
  },
  noticeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  noticeDate: {
    fontStyle: 'italic',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: 12,
  },
});

export default NoticeScreen;
