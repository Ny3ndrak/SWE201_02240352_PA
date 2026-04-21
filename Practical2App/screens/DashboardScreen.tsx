import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';

export default function DashboardScreen({ navigation }: any) {
  const { width, height } = useWindowDimensions();
  const isWide = width >= 600;
  const isTablet = width >= 768;

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.screenContainer}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Hello!</Text>

        {/* Quick Info Cards */}
        <View style={[styles.infoCardsContainer, isWide && styles.infoCardsContainerWide]}>
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Welcome!</Text>
            <Text style={styles.cardText}>This is a responsive layout that adapts to different screen sizes. 
            Try rotating your device or resizing the window to see it in action.</Text>
          </View>
        </View>

        {/* Navigation Section */}
        <View style={styles.navigationSection}>
          <TouchableOpacity
            style={[styles.navButton, styles.navButtonPrimary]}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.navButtonText}>View Profile →</Text>
          </TouchableOpacity>
        </View>

        {/* Device Info */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Layout: {isTablet ? 'Tablet' : isWide ? 'Wide' : 'Mobile'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  screenContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
    paddingHorizontal: 16,
  },

  infoCardsContainer: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 20,
  },
  infoCardsContainerWide: {
    flexDirection: 'row',
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  cardText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  navigationSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  navButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonPrimary: {
    backgroundColor: '#4a90e2',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
    color: '#1565c0',
    marginVertical: 2,
  },
});
