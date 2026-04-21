import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';

export default function ProfileScreen({ navigation }: any) {
  const { width } = useWindowDimensions();
  const isWide = width >= 600;
  const isTablet = width >= 768;

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.screenContainer}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>NYZ</Text>
            </View>
          </View>
          <Text style={styles.profileName}>Nyendrak Yoezer Zangmo</Text>
        </View>

        <View style={[styles.infoCardsContainer, isWide && styles.infoCardsContainerWide]}>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>User Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Full Name:</Text>
              <Text style={styles.infoValue}>Nyendrak Yoezer Zangmo</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>02240352.cst@rub.edu.bt</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone:</Text>
              <Text style={styles.infoValue}>+975 17676767</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Location:</Text>
              <Text style={styles.infoValue}>Thimphu, Bhutan</Text>
            </View>
          </View>
        </View>

        <View style={styles.navigationSection}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('Dashboard')}
          >
            <Text style={styles.navButtonText}>View Dashboard →</Text>
          </TouchableOpacity>
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
  profileHeader: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4a90e2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  infoCardsContainer: {
    flexDirection: 'column',
    gap: 16,
    marginBottom: 16,
  },
  infoCardsContainerWide: {
    flexDirection: 'row',
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
  },
  infoCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '400',
  },
  navigationSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  navButton: {
    backgroundColor: '#4a90e2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  navButtonText: {
    color: '#ebedf0',
    fontSize: 16,
    fontWeight: '600',
  },
});
